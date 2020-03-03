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
    flash_id = db.Column(db.String(64), unique=True)
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    def __init__(self, flash_id, email, password, created_at, updated_at):
        self.flash_id = flash_id
        self.email = email
        self.password = password
        self.created_at = created_at
        self.updated_at = updated_at


class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    flash_id = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(), index=True)
    monthly_value = db.Column(db.Float())
    is_calculate_suggest = db.Column(db.Boolean())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    def __init__(self, tag, monthly_value, is_calculate_suggest, user_id, created_at, updated_at):
        self.tag = tag
        self.monthly_value = monthly_value
        self.is_calculate_suggest = is_calculate_suggest
        self.user_id = user_id
        self.created_at = created_at
        self.updated_at = updated_at


class TagSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    tag = fields.String(required=True)
    monthly_value = fields.Float(required=True)
    is_calculate_suggest = fields.Boolean(required=False)
    user_id = fields.Integer(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)