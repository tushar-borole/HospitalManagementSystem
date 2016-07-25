from flask_restful import Resource, Api, request
from package.model import conn


class Common(Resource):
    def get(self):
        getPatientCount=conn.execute("SELECT COUNT(*) AS patient FROM patient").fetchone()
        getDoctorCount = conn.execute("SELECT COUNT(*) AS doctor FROM doctor").fetchone()
        getAppointmentCount = conn.execute("SELECT COUNT(*) AS appointment FROM appointment").fetchone()
        getPatientCount.update(getDoctorCount)
        getPatientCount.update(getAppointmentCount)
        return getPatientCount