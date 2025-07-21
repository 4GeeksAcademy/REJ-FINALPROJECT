from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from flask_bcrypt import Bcrypt
import enum


db = SQLAlchemy()
bcrypt = Bcrypt()


# Enums
class RoleEnum(enum.Enum):
    admin = "admin"
    stylist = "stylist"
    user = "user"

class AppointmentStatusEnum(enum.Enum):
    pendiente = "pendiente"
    aprobada = "aprobada"
    cancelada = "cancelada"
    completada = "completada"

# Users
class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(db.String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(db.String(200), nullable=False)
    nombre: Mapped[str] = mapped_column(db.String(120), nullable=False)
    telefono: Mapped[str] = mapped_column(db.String(20), nullable=False)
    sexo: Mapped[str] = mapped_column(db.String(10), nullable=False)
    fecha_nacimiento: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    role: Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), nullable=False)
    picture: Mapped[str] = mapped_column(db.String(255), nullable=True)

    # Relaciones
    appointments = relationship("Appointment", back_populates="user", foreign_keys="Appointment.user_id")
    assigned_appointments = relationship("Appointment", back_populates="stylist", foreign_keys="Appointment.stylist_id")

    # Método para establecer contraseña hasheada
    def set_password(self, password_plaintext):
        self.password = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

    # Método para verificar contraseña
    def check_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password, password_plaintext)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "sexo": self.sexo,
            "fecha_nacimiento": self.fecha_nacimiento.strftime("%Y-%m-%d"),
            "role": self.role.value,
            "picture": self.picture
        }

# WorkType (Servicios)
class WorkType(db.Model):
    __tablename__ = "work_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(db.String(120), nullable=False)
    duration: Mapped[int] = mapped_column(nullable=False)  # minutos
    cost: Mapped[int] = mapped_column(nullable=False)

    appointment_items = relationship("AppointmentList", back_populates="work_type")

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "cost": self.cost
        }

# Appointments (Citas)
class Appointment(db.Model):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    stylist_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    date: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    status: Mapped[AppointmentStatusEnum] = mapped_column(Enum(AppointmentStatusEnum), nullable=False)
    review: Mapped[int] = mapped_column(nullable=True)
    review_description: Mapped[str] = mapped_column(Text, nullable=True)

    user = relationship("User", back_populates="appointments", foreign_keys=[user_id])
    stylist = relationship("User", back_populates="assigned_appointments", foreign_keys=[stylist_id])
    items = relationship("AppointmentList", back_populates="appointment")

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date.strftime("%Y-%m-%d %H:%M"),
            "status": self.status.value,
            "user_id": self.user_id,
            "stylist_id": self.stylist_id,
            "review": self.review,
            "review_description": self.review_description
        }

# AppointmentList (Detalle de servicios en una cita)
class AppointmentList(db.Model):
    __tablename__ = "appointment_list"
    id: Mapped[int] = mapped_column(primary_key=True)
    appointment_id: Mapped[int] = mapped_column(ForeignKey("appointments.id"), nullable=False)
    work_type_id: Mapped[int] = mapped_column(ForeignKey("work_types.id"), nullable=False)
    picture: Mapped[str] = mapped_column(db.String(255), nullable=True)

    appointment = relationship("Appointment", back_populates="items")
    work_type = relationship("WorkType", back_populates="appointment_items")

    def serialize(self):
        return {
            "id": self.id,
            "appointment_id": self.appointment_id,
            "work_type_id": self.work_type_id,
            "picture": self.picture
        }