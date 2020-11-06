import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

from models import User, db

# Load dotenv
load_dotenv()

# Local Postgres environment
POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')

app = Flask(__name__)
cors = CORS(app)

# Local connection string
local_conn_str = f"postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"

app.config['CORS_HEADERS'] = 'Content-Type'
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
    user = User.query.filter_by(username=user_email)
    print(user)
    if user_email == user:
        return jsonify({ "user": "Hello, World!" })
    else:
        return jsonify({ "user_not_found": True })


@app.route("/api/add_user", methods=["POST"])
@cross_origin()
def add_user():
    print(request)
    return jsonify({ "user": "placeholder" })
