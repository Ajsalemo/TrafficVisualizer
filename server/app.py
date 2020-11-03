from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/users_general")
@cross_origin()
def hello():
    return jsonify({ "user": "Hello, World!" })