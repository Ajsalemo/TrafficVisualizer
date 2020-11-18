from flask_cors import CORS, cross_origin
from flask import jsonify, request

from manage import app
from models import User, Locations, db


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
        return jsonify({ "message": "Location deleted"})


@app.route("/api/get_all_locations/<user_id>")
@cross_origin()
def get_all_locations(user_id):
    print(user_id)
    get_all_saved_locations=Locations.query.filter_by(user_id=user_id).all()
    print(get_all_saved_locations)
    results = [
        {
            "id": result.id,
            "location": result.location,
            "user_id": result.user_id
        } 
    for result in get_all_saved_locations]
    return jsonify({ "message": results })
