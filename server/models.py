from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    nickname = db.Column(db.String)
    email = db.Column(db.String)
    locations = db.relationship("Locations")


    def __init__(
        self, 
        username, 
        nickname, 
        email
    ): 
        self.username = username
        self.nickname = nickname
        self.email = email


    def __repr__(self):
        return f"{self.username}"


class Locations(db.Model):
    __tablename__ = "Locations"

    id = db.Column("location_id", db.Integer, primary_key=True)
    location = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    user = db.relationship("User")
 
    def __init__(
        self, 
        location,
        user_id
    ): 
        self.location = location
        self.user_id = user_id


    def __repr__(self):
        return f"{self.location}"
