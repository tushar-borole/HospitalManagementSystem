from flask_restful import Resource, Api
class Doctor(Resource):
    def get(self):
        return {'hello': 'get'}

    def put(self):
        return {'hello': 'put'}

    def delete(self):
        return {'hello': 'delete'}

    def post(self):
        return {'hello': 'post'}