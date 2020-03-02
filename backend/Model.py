from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


ma = Marshmallow()
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    person_id = db.Column(db.String(64), unique=True)
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    def __init__(self, person_id, email, password, created_at, updated_at):
        self.person_id = person_id
        self.email = email
        self.password = password
        self.created_at = created_at
        self.updated_at = updated_at


class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    person_id = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)