from flask import Blueprint
from flask_restful import Api
from resources.Login import Login
from resources.Register import Register
from resources.Transaction import Transaction

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes
api.add_resource(Login, '/auth/login')
api.add_resource(Register, '/auth/register')
api.add_resource(Transaction, '/transaction')
