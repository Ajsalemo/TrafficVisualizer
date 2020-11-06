import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from models import User, db
from flask_migrate import Migrate

# Load dotenv
load_dotenv()


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Local Postgres environment
POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')

# Local connection string
local_conn_str = f"postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"

app.config['SQLALCHEMY_DATABASE_URI'] = local_conn_str
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def home():
    return jsonify({ "message": "Traffic Visualizer API"})

@app.route("/api/user/<user_email>")
@cross_origin()
def check_if_user_exists(user_email):
    print(user_email)
    if user_email == "ajssalemo@gmail.com":
        return jsonify({ "user": "Hello, World!" })
    else:
        return jsonify({ "error": "Email does not exist"})