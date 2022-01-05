
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

## Through tables go here (groups,members) 
## for many to many relationships

class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False)
    username = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(50),nullable=False)
    hashedPassword = db.Column(db.String(300),nullable=False)
    profilePicture = db.Column(db.Text)
    status = db.Column(db.String(200))

    messages = db.relationship("Messages",back_populates="user")

##todo
class Organizations(db.Model):
    __tablename__ = "organizations"

##todo
class Channels(db.Model):
    __tablename__ = "channels"

##todo
class DirectMessages(db.Model):
    __tablename__ = "directmessages"

class Messages(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer,primary_key=True)
    content = db.Column(db.Text,nullable=False)
    owner_id = db.Column(db.Integer,ForeignKey("users.id"),nullable=False)
    channel_id = db.Column(db.Integer,ForeignKey("channels.id"),nullable=False)

    user = db.relationship("Users",back_populates="messages")