import os
from flask_admin import Admin
from .models import db, User, Appointment, WorkType, AppointmentList
from flask_admin.contrib.sqla import ModelView

class AppointmentsListModelView (ModelView):
    column_auto_selected_related =True
    column_list =['id', 'appointment_id','appointment', 'work_type_id', 'work_type', 'picture']

class AppointmentsModelView (ModelView):
    column_auto_selected_related =True
    column_list =['id', 'user_id', 'stylist_id','date', 'status', 'review', 'review_description', 'items']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))
    admin.add_view(AppointmentsModelView(Appointment, db.session))
    admin.add_view(ModelView(WorkType, db.session))
    admin.add_view(AppointmentsListModelView(AppointmentList, db.session))