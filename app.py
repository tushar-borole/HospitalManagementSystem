from flask import Flask,send_from_directory,render_template
from flask_restful import Resource, Api
from package.patient import Patients, Patient
from package.doctor import Doctors, Doctor


app = Flask(__name__, static_url_path='')
api = Api(app)

api.add_resource(Patients, '/patient')
api.add_resource(Patient, '/patient/<int:id>')
api.add_resource(Doctors, '/doctor')
api.add_resource(Doctor, '/doctor/<int:id>')

# Routes

@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)