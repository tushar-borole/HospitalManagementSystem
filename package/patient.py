from flask_restful import Resource, Api, request
from package.model import conn
class Patient(Resource):
    def get(self):
        patients = conn.execute("SELECT * FROM patient").fetchall()
        return patients

    def put(self):
        return {'hello': 'put'}

    def delete(self):
        return {'hello': 'delete'}

    def post(self):
        patientInput = request.get_json(force=True)
        pat_first_name=patientInput['pat_first_name']
        pat_last_name = patientInput['pat_last_name']
        pat_insurance_no = patientInput['pat_insurance_no']
        pat_ph_no = patientInput['pat_ph_no']
        pat_address = patientInput['pat_address']
        patientInput['pat_id']=conn.execute('''INSERT INTO patient(pat_first_name,pat_last_name,pat_insurance_no,pat_ph_no,pat_address)
            VALUES(?,?,?,?,?)''', (pat_first_name, pat_last_name, pat_insurance_no,pat_ph_no,pat_address)).lastrowid
        conn.commit()
        return patientInput