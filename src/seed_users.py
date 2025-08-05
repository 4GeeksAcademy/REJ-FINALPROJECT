from app import app
from api.models import db, User
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt(app)

demo_users = [
    {
        "email": "admin@test.com",
        "password": "123456",
        "role": "admin",
        "nombre": "Admin Demo"
    },
    {
        "email": "stylist@test.com",
        "password": "123456",
        "role": "stylist",
        "nombre": "Stylist Demo"
    },
    {
        "email": "user@test.com",
        "password": "123456",
        "role": "user",
        "nombre": "User Demo"
    },
]

with app.app_context():
    db.create_all()

    for u in demo_users:
        existing_user = User.query.filter_by(email=u["email"]).first()
        if not existing_user:
            hashed_password = bcrypt.generate_password_hash(u["password"]).decode('utf-8')
            new_user = User(
                email=u["email"],
                password=hashed_password,
                role=u["role"],
                nombre=u["nombre"],
                telefono="00000000",
                sexo="N/A",
                fecha_nacimiento=datetime(1990,1,1),
                picture=None
            )
            db.session.add(new_user)
            print(f"✅ Usuario creado: {u['email']} ({u['role']})")
        else:
            print(f"ℹ️ Usuario ya existía: {u['email']}")

    db.session.commit()
    print("🎉 Usuarios de prueba creados correctamente")
