import datetime
import traceback
from Model import db
from Model import Tag, TagSchema
from flask import request
from flask_restful import Resource

class TagResource(Resource):

    @jwt_required
    def post(self):

        try:
            data = request.get_json()
            now = datetime.datetime.now()
            current_user = get_jwt_identity()

            tag = Tag(
                tag=data['tag'],
                monthly_value=data['monthly_value'],
                is_calculate_suggest=data['is_calculate_suggest'],
                user_id=data['user_id']
                created_at=now,
                updated_at=now
            )

            db.session.add(tag)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return None, 500

    def get(self):
        try:
            res = Tag.query.order_by(Tag.id).with_entities(
                Tag.id, Tag.name, Tag.url, Tag.token, Tag.version).all()

            schema = TagSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return None, 500

    def put(self):
        try:
            payload = request.get_json()
            now = datetime.datetime.now()

            tag = Tag.query.filter_by(id=payload['id']).first()

            if 'url' in payload:
                tag.url = payload['url']

            if 'token' in payload:
                tag.token = payload['token']

            if 'version' in payload:
                tag.version = payload['version']

            tag.updated_at = now

            db.session.add(tag)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return None, 500
