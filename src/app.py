"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db#, Service
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, User, Appointment, AppointmentList, WorkType

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# El administrador puede obtener un resumen general de las citas 
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

# Obtener todos los servicios
@app.route('/admin/services', methods=['GET'])
@jwt_required()
def get_services():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    services = Service.query.all()
    services_list = [{
        "id": s.id,
        "name": s.name,
        "price": s.price,
        "duration": s.duration
    } for s in services]

    return jsonify(services_list), 200


# Crear un nuevo servicio
@app.route('/admin/services', methods=['POST'])
@jwt_required()
def create_service():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if not data.get("name") or not data.get("price") or not data.get("duration"):
        return jsonify({"msg": "Faltan datos del servicio"}), 400

    service = Service(
        name=data["name"],
        price=data["price"],
        duration=data["duration"]
    )
    db.session.add(service)
    db.session.commit()

    return jsonify({"msg": "Servicio creado correctamente"}), 201


# Actualizar un servicio existente
@app.route('/admin/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    service.name = data.get("name", service.name)
    service.price = data.get("price", service.price)
    service.duration = data.get("duration", service.duration)

    db.session.commit()

    return jsonify({"msg": "Servicio actualizado correctamente"}), 200


# Eliminar un servicio
@app.route('/admin/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({"msg": "Servicio eliminado correctamente"}), 200

#Aqui el Administrador puede ver la lista de usuarios (clientes y estilistas) sin info confidencial
@app.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    users = User.query.all()
    users_list = [{
        "id": u.id,
        "email": u.email,
        "role": u.role
    } for u in users]

    return jsonify(users_list), 200

#Permite al Administrador modificar el estado de una cita
@app.route('/admin/appointments/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment_status(appointment_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    data = request.get_json()
    if not data.get("status"):
        return jsonify({"msg": "Falta el campo 'status'"}), 400

    appointment = Appointments.query.get(appointment_id)
    if not appointment:
        return jsonify({"msg": "Cita no encontrada"}), 404

    appointment.status = data["status"]
    db.session.commit()

    return jsonify({"msg": "Estado de la cita actualizado correctamente"}), 200


#El Administrador puede filtrar las citas por estilista y/o rango de fecha
@app.route('/admin/reports', methods=['GET'])
@jwt_required()
def get_reports():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso no autorizado"}), 403

    stylist_id = request.args.get('stylist_id', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    query = Appointments.query

    if stylist_id:
        query = query.filter_by(stylist_id=stylist_id)

    if start_date and end_date:
        query = query.filter(Appointments.date.between(start_date, end_date))

    results = query.all()

    appointments_list = [{
        "id": a.id,
        "date": a.date.strftime('%Y-%m-%d'),
        "status": a.status,
        "stylist_id": a.stylist_id
    } for a in results]

    return jsonify(appointments_list), 200


#-----------------------------END POINTS PARA EL BARBERO------------------------------------

# Obtener todos los servicios pendientes ok
@app.route('/stylist/pending_appoitments', methods=['GET'])
#@jwt_required()
def get_pending_appoitments():
    #current_user = get_jwt_identity()
    current_user = "fonseca@gmail"
    user = User.query.filter_by(email=current_user).first()

    if user is None:
        return jsonify({"msg": "Acceso no autorizado"}), 403

    appointments=Appointment.query.filter_by(stylist_id=user.id, status='pendiente')
    appointments_serialized=[]
    
    for appointments_aux in appointments:
        appointments_serialized.append( appointments_aux.serialize())
    
    return appointments_serialized

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
    
    return appointments_serialized


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
    current_user = "fonseca@gmail"
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



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
