import datetime
import traceback
from Model import db
from flask import request
from Model import Tag, TagSchema
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

class Tags(Resource):

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
                user_id=current_user['id'],
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
            res = Tag.query.order_by(Tag.tag).with_entities(
                Tag.id, Tag.tag, Tag.monthly_value, Tag.is_calculate_suggest).all()
            
            schema = TagSchema(many=True)
            data = schema.dump(res)
            items = []

            header = [
                {'value': 'tag', 'label': 'Tag'},
                {'value': 'monthly_value', 'label': 'Valor Mensal', 'align': 'right', 'type': 'TYPE_CURRENCY'},
                {'value': 'is_calculate_suggest', 'label': 'Calcular Sugestão?'},
                {'value': 'id', 'label': 'Ações', 'type': 'TYPE_ACTIONS'}
            ]

            if len(data) > 0:
                for item in data[0]:
                    new_item = item
                    
                    if new_item['is_calculate_suggest'] == True:
                        new_item['is_calculate_suggest'] = 'Sim'
                    else:
                        new_item['is_calculate_suggest'] = 'Não'
                    
                    items.append(new_item)

            data = {
                'header': header,
                'items': items
            }

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
