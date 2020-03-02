import json
import requests
import traceback
from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required


class Transaction(Resource):
    @jwt_required
    def post(self):
        try:
          current_user = get_jwt_identity()
          url = "https://v1.api.qr-transaction.com/p/person/graphql"

          if current_user is None:
            return {"msg": "Something Wrong!"}, 500
          
          payload = {"query":"query ($personId: ID!, $limit: Int, $skip: Int, $sortBy: StatementSort) {\n  getStatement(personId: $personId, limit: $limit, skip: $skip, sortBy: $sortBy) {\n    name\n    transactions {\n      _id\n      benefitType\n      description\n      partnerPin\n      swapTransactionDate\n      totalValue\n    }\n    transactionsCount\n    type\n  }\n}\n","variables":{"limit":10,"personId":current_user['person_id'],"skip":0}}

          response = requests.request("POST", url, headers={}, data=json.dumps(payload))

          return json.loads(response.text), 200
        except:
          traceback.print_exc()