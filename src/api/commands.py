"""""
import click
from api.models import db, User
"""
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
""""""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    """"""
   # @app.cli.command("insert-test-users") # name of our command
    #@click.argument("count") # argument of out command
    #def insert_test_users(count):
     #   print("Creating test users")
      #  for x in range(1, int(count) + 1):
       #     user = User()
        #    user.email = "test_user" + str(x) + "@test.com"
         #   user.password = "123456"
          #  user.is_active = True
           # db.session.add(user)
            #db.session.commit()
           # print("User: ", user.email, " created.")

        #print("All test users created")

    #@app.cli.command("insert-test-data")
    #def insert_test_data():
     #   pass
    """"""

import click
from api.models import db, User, RoleEnum
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def setup_commands(app):
    
    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users(count):
        print("Creando usuarios de prueba...")
        for x in range(1, int(count) + 1):
            email = f"test_user{x}@test.com"
            password = bcrypt.generate_password_hash("123456").decode('utf-8')

            user = User(
                email=email,
                password=password,
                nombre=f"Usuario {x}",
                telefono=f"8888000{x}",
                rol=RoleEnum.user  # puedes cambiar a RoleEnum.admin o stylist
            )
            db.session.add(user)
            db.session.commit()
            print(f"Usuario creado: {email}")

        print("✔ Todos los usuarios de prueba fueron creados.")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass 