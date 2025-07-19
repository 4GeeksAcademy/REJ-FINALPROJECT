from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import enum


db = SQLAlchemy()

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
    __tablename__='users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str]=mapped_column(String(200), nullable=False)
    nombre: Mapped[str]=mapped_column(String(120), nullable=False)
    telefono: Mapped[str] = mapped_column(db.String(20))
    sexo: Mapped[str] = mapped_column(db.String(10), nullable=False)
    fecha_nacimiento: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    role: Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), nullable=False)
    picture: Mapped[str] = mapped_column(db.String(255), nullable=True)
    
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
    def __str__(self):
        return f'{self.nombre}'

class Appointment (db.Model):
    __tablename__='appointments'
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped[User]=relationship(foreign_keys=[user_id])
    stylist_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    stylist: Mapped[User]=relationship(foreign_keys=[stylist_id])

    date: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    status: Mapped[AppointmentStatusEnum] = mapped_column(Enum(AppointmentStatusEnum), nullable=False)
    review: Mapped[int] = mapped_column(nullable=True)
    review_description: Mapped[str] = mapped_column(Text, nullable=True)
    
    items:Mapped[list['AppointmentList']]=relationship(back_populates='appointment')

    def serialize (self):
        return{
            "id": self.id,
            "date": self.date.strftime("%Y-%m-%d %H:%M"),
            "status": self.status.value,
            "user_id": self.user_id,
            "stylist_id": self.stylist_id,
            "review": self.review,
            "review_description": self.review_description
        }
    
    def __str__(self):
        return f' Cita para {self.user.name } el {self.date}'

class AppointmentList (db.Model):
    __tablename__='appointment_list'
    id: Mapped[int] = mapped_column(primary_key=True)
    appointment_id: Mapped [int] = mapped_column(ForeignKey('appointments.id'))
    appointment: Mapped['Appointment']= relationship(back_populates='items')
    work_type_id: Mapped [int] = mapped_column(ForeignKey('work_types.id'))
    work_type: Mapped['WorkType'] =  relationship(back_populates='appointment_items')
    picture: Mapped[str] = mapped_column(db.String(255), nullable=True)

    def __str__(self):
        return f'{self.id}'
    
    # WorkType (Servicios)
class WorkType(db.Model):
    __tablename__ = "work_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(db.String(120), nullable=False)
    duration: Mapped[int] = mapped_column(nullable=False)  # minutos
    cost: Mapped[int] = mapped_column(nullable=False)

    appointment_items: Mapped[list[AppointmentList]] = relationship(back_populates='work_type')

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "cost": self.cost
        }
    
    def __str__(self):
        return f'{self.description}'
