import datetime
import traceback
from Model import db
from Model import User
from run import bcrypt
from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token


class Login(Resource):
    def post(self):
        try:
            email = request.get_json()['email']
            password = request.get_json()['password']

            user = User.query \
                .with_entities(User.id, User.flash_id, User.password) \
                .filter_by(email=email).first()
            
            if user is None:
                return {"error": "User not found"}, 401

            if bcrypt.check_password_hash(user.password, password):
                access_token = create_access_token(
                    identity={'id': user.id, 'flash_id': user.flash_id})
                result = { "token": f"Bearer {access_token}"}
            else:
                result = {"error": "Invalid username and password"}, 401

            return result

        except:
            traceback.print_exc()
            result = {"error": "Something Wrong"}, 500