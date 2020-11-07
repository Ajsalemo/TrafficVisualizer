from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    nickname = db.Column(db.String)
    email = db.Column(db.String)


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
