"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta, datetime
from sqlalchemy import func
from api.utils import APIException, generate_sitemap
from api.models import db, WorkType, User, RoleEnum, Appointment, AppointmentList 
from api.admin import setup_admin
from api.commands import setup_commands


# Inicialización de la app
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

# Configuración
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración DB
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

# Inicializar extensiones
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
setup_admin(app)
setup_commands(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ------------------- Administrador -------------------

@app.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    total_appointments = Appointment.query.count()

    by_status = db.session.query(
        Appointment.status,
        func.count(Appointment.id)
    ).group_by(Appointment.status).all()

    by_stylist = db.session.query(
        Appointments.stylist_id,
        func.count(Appointments.id)
    ).group_by(Appointments.stylist_id).all()

    summary = {
        "total_appointments": total_appointments,
        "by_status": {status: count for status, count in by_status},
        "by_stylist": {stylist_id: count for stylist_id, count in by_stylist}
    }

    return jsonify(summary), 200

@app.route('/admin/services', methods=['GET'])
@jwt_required()
def get_services():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    services = WorkType.query.all()
    services_list = [{
        "id": s.id,
        "description": s.description,
        "cost": s.cost,
        "duration": s.duration
    } for s in services]

    return jsonify(services_list), 200

@app.route('/admin/services', methods=['POST'])
@jwt_required()
def create_service():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    body = request.get_json()
    for field in ['description', 'cost', 'duration']:
        if field not in body:
            return jsonify({"msg": f"Falta el campo {field}"}), 400

    new_service = WorkType(description=body['description'], cost=body['cost'], duration=body['duration'])
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"msg": "Servicio creado correctamente"}), 201

@app.route('/admin/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    body = request.get_json()
    service = WorkType.query.get(service_id)

    if not service:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    service.description = body.get('description', service.description)
    service.cost = body.get('cost', service.cost)
    service.duration = body.get('duration', service.duration)
    db.session.commit()

    return jsonify({"msg": "Servicio actualizado"}), 200

@app.route('/admin/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    service = WorkType.query.get(service_id)

    if not service:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({"msg": "Servicio eliminado correctamente"}), 200

@app.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    users = User.query.all()
    users_list = [{"id": u.id, "email": u.email, "role": u.role} for u in users]

    return jsonify(users_list), 200

@app.route('/admin/appointments/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment_status(appointment_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if not data.get("status"):
        return jsonify({"msg": "Falta el campo 'status'"}), 400

    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({"msg": "Cita no encontrada"}), 404

    appointment.status = data["status"]
    db.session.commit()

    return jsonify({"msg": "Estado de la cita actualizado correctamente"}), 200

@app.route('/admin/reports', methods=['GET'])
@jwt_required()
def get_reports():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    stylist_id = request.args.get('stylist_id', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    query = Appointment.query

    if stylist_id:
        query = query.filter_by(stylist_id=stylist_id)
    if start_date and end_date:
        query = query.filter(Appointment.date.between(start_date, end_date))

    results = query.all()

    appointments_list = [
        {"id": a.id, "date": a.date.strftime('%Y-%m-%d'), "status": a.status, "stylist_id": a.stylist_id}
        for a in results
    ]

    return jsonify(appointments_list), 200

# ------------------- Usuario -------------------

#1. Registro 
@app.route('/register', methods=['POST'])
def register():
    body = request.get_json()

    if body is None:
        return jsonify({'msg': 'Debe enviar informacion al body'}), 400

    if 'email' not in body:
        return jsonify({'msg': "El campo 'email' es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo 'password' es obligatorio"}), 400
    if 'nombre' not in body:
        return jsonify({'msg': "El campo 'nombre' es obligatorio"}), 400
    if 'telefono' not in body:
        return jsonify({'msg': "El campo 'telefono' es obligatorio"}), 400
    if 'sexo' not in body:
        return jsonify({'msg': "El campo 'sexo' es obligatorio"}), 400
    if 'fecha_nacimiento' not in body:
        return jsonify({'msg': "El campo 'fecha_nacimiento' es obligatorio"}), 400
    if 'role' not in body:
        return jsonify({'msg': "El campo 'role' es obligatorio"}), 400

    if User.query.filter_by(email=body['email']).first():
        return jsonify({'msg': 'El usuario ya existe'}), 409

    hashed_pw = bcrypt.generate_password_hash(body['password']).decode('utf-8')

    try:
        user = User(
            email=body['email'],
            password=hashed_pw,
            nombre=body['nombre'],
            telefono=body['telefono'],
            sexo=body['sexo'],
            fecha_nacimiento=datetime.strptime(body['fecha_nacimiento'], "%Y-%m-%d"),
            role=RoleEnum(body['role']),
            picture=body.get('picture')
        )
        db.session.add(user)
        db.session.commit()

        return jsonify({'msg': 'Usuario registrado correctamente'}), 201
    except Exception as e:
        print("Error al registrar usuario:", e)
        return jsonify({'msg': 'Error al registrar usuario'}), 500
    
# 2. Login
@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body:
        return jsonify({'msg': 'Se requiere un cuerpo JSON'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400

    user = User.query.filter_by(email=body['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'Credenciales incorrectas'}), 401

    token = create_access_token(identity=user.id)
    return jsonify({'token': token}), 200

# 3. Obtener perfil
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    return jsonify({
        'email': user.email,
        'nombre': user.nombre,
        'telefono': user.telefono,
        'sexo': user.sexo,
        'fecha_nacimiento': user.fecha_nacimiento.strftime("%Y-%m-%d"),
        'role': user.role.value,
        'picture': user.picture
    }), 200

# 4. Actualizar perfil
@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    body = request.get_json()
    if not body:
        return jsonify({'msg': 'Se requiere un cuerpo JSON'}), 400

    user.nombre = body.get('nombre', user.nombre)
    user.telefono = body.get('telefono', user.telefono)
    user.picture = body.get('picture', user.picture)
    db.session.commit()
    return jsonify({'msg': 'Perfil actualizado correctamente'}), 200

# 5. Ver citas del usuario
@app.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    user_id = get_jwt_identity()
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    results = []
    for a in appointments:
        results.append({
            'id': a.id,
            'stylist_id': a.stylist_id,
            'date': a.date.strftime("%Y-%m-%d %H:%M"),
            'status': a.status.value,
            'review': a.review,
            'review_description': a.review_description
        })
    return jsonify(results), 200

# 6. Agendar cita
@app.route('/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    body = request.get_json()
    if not body:
        return jsonify({'msg': 'Se requiere un cuerpo JSON'}), 400

    if 'stylist_id' not in body:
        return jsonify({'msg': 'El campo stylist_id es obligatorio'}), 400
    if 'date' not in body:
        return jsonify({'msg': 'El campo date es obligatorio'}), 400

    try:
        appointment = Appointment(
            user_id=get_jwt_identity(),
            stylist_id=body['stylist_id'],
            date=datetime.strptime(body['date'], "%Y-%m-%d %H:%M"),
            status=StatusEnum.pendiente
        )
        db.session.add(appointment)
        db.session.commit()
        return jsonify({'msg': 'Cita agendada correctamente'}), 201
    except Exception as e:
        print('Error al agendar cita:', e)
        return jsonify({'msg': 'Error al agendar cita'}), 500

# 7. Modificar cita
@app.route('/appointments/<int:id>', methods=['PUT'])
@jwt_required()
def update_appointment(id):
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({'msg': 'Cita no encontrada'}), 404

    if appointment.user_id != get_jwt_identity():
        return jsonify({'msg': 'No autorizado'}), 403

    body = request.get_json()
    if 'date' in body:
        appointment.date = datetime.strptime(body['date'], "%Y-%m-%d %H:%M")
    if 'status' in body:
        appointment.status = StatusEnum(body['status'])
    db.session.commit()
    return jsonify({'msg': 'Cita actualizada'}), 200

# 8. Cancelar cita
@app.route('/appointments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({'msg': 'Cita no encontrada'}), 404

    if appointment.user_id != get_jwt_identity():
        return jsonify({'msg': 'No autorizado'}), 403

    db.session.delete(appointment)
    db.session.commit()
    return jsonify({'msg': 'Cita cancelada correctamente'}), 200

# 9. Ver catálogo de servicios
@app.route('/catalog', methods=['GET'])
def get_catalog():
    services = WorkType.query.all()
    result = []
    for s in services:
        result.append({
            'id': s.id,
            'description': s.description,
            'duration': s.duration,
            'cost': s.cost
        })
    return jsonify(result), 200

# 10. Dejar reseña
@app.route('/review', methods=['POST'])
@jwt_required()
def leave_review():
    body = request.get_json()
    if 'appointment_id' not in body:
        return jsonify({'msg': 'El campo appointment_id es obligatorio'}), 400
    if 'review' not in body:
        return jsonify({'msg': 'El campo review es obligatorio'}), 400
    if 'review_description' not in body:
        return jsonify({'msg': 'El campo review_description es obligatorio'}), 400

    appointment = Appointment.query.get(body['appointment_id'])
    if not appointment or appointment.user_id != get_jwt_identity():
        return jsonify({'msg': 'No autorizado o cita no válida'}), 403

    appointment.review = body['review']
    appointment.review_description = body['review_description']
    db.session.commit()
    return jsonify({'msg': 'Reseña guardada correctamente'}), 200    
    


#-----------------------------END POINTS PARA EL BARBERO------------------------------------

# Obtener todos los servicios pendientes ok
@app.route('/stylist/pending_appoitments', methods=['GET'])
#@jwt_required()
def get_pending_appoitments():
    #current_user = get_jwt_identity()
    current_user = "fonseca.karen28@gmail.com"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    appointments=Appointment.query.filter_by(stylist_id=user.id, status='pendiente')
    appointments_serialized=[]
    
    for appointments_aux in appointments:
        appointments_serialized.append( appointments_aux.serialize())
    
    return jsonify({"msg": "Citas Listadas correctamente",
                   "appointments": appointments_serialized}), 200

# Obtener todos los servicios completados ok
@app.route('/stylist/done_appoitments', methods=['GET'])
#@jwt_required()
def get_done_appoitments():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    appointments=Appointment.query.filter_by(stylist_id=user.id, status='completada')
    appointments_serialized=[]
    
    for appointments_aux in appointments:
        appointments_serialized.append( appointments_aux.serialize())
    
    return jsonify({"msg": "Citas Listadas correctamente",
                   "appointments": appointments_serialized}), 200



#------------Actualizar estado de cita---------------------------------------ok

@app.route('/stylist/appointments/<int:appointment_id>', methods=['PUT'])
#@jwt_required()
def update_stylist_appointment_status(appointment_id):
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user.role == 'stylist':
        return jsonify({"msg": "Acceso no autorizado",
                        "role":user.serialize()}), 403

    data = request.get_json()

    if "status" not in data:
        return jsonify({"msg": "Falta el campo 'status'"}), 400

    appointment = Appointment.query.get(appointment_id)

    if appointment is None:
        return jsonify({"msg": "Cita no encontrada"}), 404

    appointment.status = data["status"]
    db.session.commit()

    return jsonify({"msg": "Estado de la cita actualizado correctamente",
                   "role":appointment.serialize()}), 200


#-----------------------Crear una cita--------------------------------------- ok
@app.route('/stylist/appointment', methods=['POST'])
#@jwt_required()
def create_appointment():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if "date" not in data:
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400 
    
    if "status" not in  data:
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400 
    
    if "user_id" not in data: 
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400 
    
    if "stylist_id" not in data:
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400

    appointment = Appointment(
        date=data["date"],
        status=data["status"],
        user_id=data["user_id"],
        stylist_id=data["stylist_id"]
    )

    db.session.add(appointment)
    db.session.commit()

    return jsonify({"msg": "Cita creada correctamente",
                    "apointment":appointment.serialize()}), 201

#--------------------Crear Trabajo de Cita-------------------------------ok
@app.route('/stylist/appointment_item', methods=['POST'])
#@jwt_required()
def create_appointment_item():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if data is None:
        return jsonify({"msg": "Debe enviar datos"}), 400

    if "appointment_id" not in data:
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400
    
    if "work_type_id" not in data:
        return jsonify({"msg": "Faltan datos para crear la cita"}), 400

    appointment_item = AppointmentList(
        appointment_id=data["appointment_id"],
        work_type_id=data["work_type_id"]
    )

    db.session.add(appointment_item)
    db.session.commit()

    return jsonify({"msg": "Item creado correctamente",
                    "work_type":appointment_item.serialize()}), 200

#----------------------Obtener trabajos de una cita-------------------------------- ok
@app.route('/stylist/appoitment_detail/<int:appointment_id>', methods=['GET'])
#@jwt_required()
def get_appoitment_detail(appointment_id):
    #current_user = get_jwt_identity()
    current_user = "fonseca.karen28@gmail.com"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    appointment_items=AppointmentList.query.filter_by(appointment_id=appointment_id)
    appointment_items_serialized=[]
  
    for appointment_items_aux in appointment_items:
        appointment_items_serialized.append( appointment_items_aux.work_type.serialize())
    
    return (jsonify({'msg':'Favoritos listados con exito', 
                     'items': appointment_items_serialized
                     }
                    )
            )

#-----------------------------obtener info de barbero--------------------------------------ok 
@app.route('/stylist/info', methods=['GET'])
#@jwt_required()
def get_stylist_info():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403
    
    return (jsonify({'msg':'Barbero listado con exito', 
                     'items': user.serialize()
                     }
                    )
            )

#------------Actualizar Info Barbero---------------------------------------ok

@app.route('/stylist/update_info', methods=['PUT'])
#@jwt_required()
def update_stylist_update_info():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    
    if "email" not in data:
            return jsonify({"msg": "El Campo e-mail es obligatorio"}), 400
    else:
        user.email=data["email"]
    if "nombre" in data: 
        user.nombre=data["nombre"]
    if "telefono" in data: 
        user.telefono=data["telefono"]
    if "sexo" in data: 
        user.sexo=data["sexo"]
    if "fecha_nacimiento" in data: 
        user.fecha_nacimiento=data["fecha_nacimiento"]
    if "role" in data:
        user.role=data["role"]
    if "picture" in data:
        user.picture=data["picture"]

    db.session.commit()

    return jsonify({"msg": "Estado de la cita actualizado correctamente",
                   "user":user.serialize()}), 200

#-----------------------Crear una cita con items-------------------------------------- ok
@app.route('/stylist/appointment_items', methods=['POST'])
#@jwt_required()
def create_appointment_items():
    #current_user = get_jwt_identity()
    current_user = "fonseca.karen28@gmail.com"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if "date" not in data:
        return jsonify({"msg": "la fecha es necesaria para crear la cita"}), 400 
    
    if "status" not in  data:
        return jsonify({"msg": "El estado es necesario para crear la cita"}), 400 
    
    if "user_id" not in data: 
        return jsonify({"msg": "El Usuario es necesari0 para crear la cita"}), 400 
    
    if "stylist_id" not in data:
        return jsonify({"msg": "El estilista es necesario para crear la cita"}), 400
    if "items" not in data:
        return jsonify({"msg": "Se deben ingresar los trabajos"}), 400

    appointment = Appointment(
        date=data["date"],
        status=data["status"],
        user_id=data["user_id"],
        stylist_id=data["stylist_id"]
    )

    db.session.add(appointment)
    db.session.commit()

    appointment_id= appointment.id
    appointment_items_serialized=[]

    for appointment_items_aux in data["items"]:
        appointment_item = AppointmentList(appointment_id=appointment_id, 
                                           work_type_id=appointment_items_aux
                                           )
        db.session.add(appointment_item)
        db.session.commit()
        appointment_items_serialized.append( appointment_item.work_type.serialize())
    
    return jsonify({"msg": "Item creado correctamente",
                    "apointment":appointment.serialize(),
                    "works":appointment_items_serialized}), 200

# this only runs if `$ python src/main.py` is executed

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
