from flask_restful import Resource, Api, request
from package.model import conn
class Doctors(Resource):
    def get(self):
        doctors = conn.execute("SELECT * FROM doctor").fetchall()
        return doctors

    def put(self):
        return {'hello': 'put'}

    def delete(self):
        return {'hello': 'delete'}

    def post(self):
        doctorInput = request.get_json(force=True)
        doc_first_name=doctorInput['doc_first_name']
        doc_last_name = doctorInput['doc_last_name']
        doc_ph_no = doctorInput['doc_ph_no']
        doc_address = doctorInput['doc_address']
        doctorInput['doc_id']=conn.execute('''INSERT INTO doctor(doc_first_name,doc_last_name,doc_ph_no,doc_address)
            VALUES(?,?,?,?)''', (doc_first_name, doc_last_name,doc_ph_no,doc_address)).lastrowid
        conn.commit()
        return doctorInput

class Doctor(Resource):
    def delete(self, id):
        conn.execute("DELETE FROM doctor WHERE doc_id=?", (id,))
        conn.commit()
        return {'msg': 'sucessfully deleted'}

    def put(self,id):
        doctorInput = request.get_json(force=True)
        doc_first_name=doctorInput['doc_first_name']
        doc_last_name = doctorInput['doc_last_name']
        doc_ph_no = doctorInput['doc_ph_no']
        doc_address = doctorInput['doc_address']
        conn.execute(
            "UPDATE doctor SET doc_first_name=?,doc_last_name=?,doc_ph_no=?,doc_address=? WHERE doc_id=?",
            (doc_first_name, doc_last_name, doc_ph_no, doc_address, id))
        conn.commit()
        return doctorInput