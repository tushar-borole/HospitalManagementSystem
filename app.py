from flask import Flask,send_from_directory,render_template
from flask_restful import Resource, Api
from package.patient import Patient
from package.doctor import Doctor


app = Flask(__name__, static_url_path='')
api = Api(app)

api.add_resource(Patient, '/patient')
api.add_resource(Doctor, '/doctor')

# Routes

@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)