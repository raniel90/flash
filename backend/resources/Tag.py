import datetime
import traceback
from Model import db
from Model import Lms, LmsSchema
from flask import request
from flask_restful import Resource


class TagResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            now = datetime.datetime.now()

            lms = Lms(
                name=data['name'],
                url=data['url'],
                token=data['token'],
                version=data['version'],
                created_at=now,
                updated_at=now
            )

            db.session.add(lms)
            db.session.commit()

            schema = LmsSchema(only=("name", "created_at"))
            result = schema.dump(lms)

            return result

        except:
            traceback.print_exc()
            return None, 500

    def get(self):
        try:
            res = Lms.query.order_by(Lms.id).with_entities(
                Lms.id, Lms.name, Lms.url, Lms.token, Lms.version).all()

            schema = LmsSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return None, 500

    def put(self):
        try:
            payload = request.get_json()
            now = datetime.datetime.now()

            lms = Lms.query.filter_by(id=payload['id']).first()

            if 'url' in payload:
                lms.url = payload['url']

            if 'token' in payload:
                lms.token = payload['token']

            if 'version' in payload:
                lms.version = payload['version']

            lms.updated_at = now

            db.session.add(lms)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return None, 500
