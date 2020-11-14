import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

from models import User, Locations, db

# Load dotenv
load_dotenv()

# Local Postgres environment
POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
# Production POstgres environment
AZURE_POSTGRES_USERNAME = os.getenv('AZURE_POSTGRES_USERNAME')
AZURE_POSTGRES_PASSWORD = os.getenv('AZURE_POSTGRES_PASSWORD')
AZURE_POSTGRES_HOST = os.getenv('AZURE_POSTGRES_HOST')
AZURE_POSTGRES_PORT = os.getenv('AZURE_POSTGRES_PORT')
AZURE_POSTGRES_DATABASE = os.getenv('AZURE_POSTGRES_DATABASE')

app = Flask(__name__)
cors = CORS(app)

# Local connection string
local_conn_str = f"postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"
# Production connection string
prod_conn_str = f"postgresql://{AZURE_POSTGRES_USERNAME}:{AZURE_POSTGRES_PASSWORD}@{AZURE_POSTGRES_HOST}:{AZURE_POSTGRES_PORT}/{AZURE_POSTGRES_DATABASE}"

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = prod_conn_str
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def home():
    return jsonify({ "message": "Traffic Visualizer API"})

@app.route("/api/user/<user_email>")
@cross_origin()
def check_if_user_exists(user_email):
    user = User.query.filter_by(username=user_email).first()
    if str(user_email) == str(user):
        user_info_object = {
            "id": user.id,
            "nickname": user.nickname,
            "username": user.username,
            "email": user.email
        }
        return jsonify({ "user": user_info_object })
    else:
        return jsonify({ "user_not_found": True })


@app.route("/api/check_location/<location>/<user_id>")
@cross_origin()
def check_location(location, user_id):
    check_if_location_saved = Locations.query.filter_by(location=location, user_id=user_id).first()
    if str(location) == str(check_if_location_saved):
        return jsonify({ "error": "Location is already saved", "location_id": check_if_location_saved.id  })
    else:
        return jsonify({ "message": "Location is not saved" })



@app.route("/api/add_user", methods=["POST"])
@cross_origin()
def add_user():
    user_object = request.json["user"]
    authenticated_user_email = user_object["name"]
    authenticated_user_nickname = user_object["nickname"]
    does_user_exist = User.query.filter_by(username=authenticated_user_email).first()
    if str(does_user_exist) == str(authenticated_user_email):
        return jsonify({ "error": "User already exists" })
    else:
        new_user = User(
            username=authenticated_user_email,
            nickname=authenticated_user_nickname,
            email=authenticated_user_email
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({ "message": "User added" })


@app.route("/api/save_location", methods=["POST"])
@cross_origin()
def save_location():
    saved_user_location = request.json["address"]
    user_id = request.json["userId"]
    does_location_exist = Locations.query.filter_by(location=saved_user_location, user_id=user_id).first()
    if str(saved_user_location) == str(does_location_exist):
        return jsonify({ "error": "Location is already saved", "error_location": str(does_location_exist) })
    else:
        new_saved_location_request = Locations(
            location=saved_user_location,
            user_id=user_id
        )
        db.session.add(new_saved_location_request)
        db.session.commit()
        return jsonify({ "message": "Location added" })


@app.route("/api/delete_location", methods=["POST"])
@cross_origin()
def delete_location():
    location_id=request.json["location_id"]
    user_id=request.json["userId"]
    delete_selected_location=Locations.query.filter_by(id=location_id, user_id=user_id).first()
    if delete_selected_location == None:
        return jsonify({ "error": "Something went wrong while deleting the location" })
    else:
        db.session.delete(delete_selected_location)
        db.session.commit()
        return jsonify({ "message": "Location deleted "})