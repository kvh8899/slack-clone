
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Through tables go here (groups,members)
# for many to many relationships


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    hashedPassword = db.Column(db.String(300), nullable=False)
    profilePicture = db.Column(db.Text)
    status = db.Column(db.String(200))

    messages = db.relationship("Messages", back_populates="user")
    organization = db.relationship("Organizations", back_populates="owner")
    direct_messages = db.relationship('DirectMessages', back_populates='owner')


class Organizations(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship("User", back_populates="organization")
    channels = db.relationship("Channels", back_populates="organizations")
    direct_messages = db.relationship(
        'DirectMessages', back_populates='organizations')


class Channels(db.Model):
    __tablename__ = "channels"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey(
        'organizations.id'), nullable=False)

    organizations = db.relationship(
        "Organizations", back_populates="channels")
    channel_messages = db.relationship(
        'Messages', back_populates='user_channels')


class DirectMessages(db.Model):
    __tablename__ = "directmessages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey(
        'organizations.id'), nullable=False)

    owner = db.relationship("User", back_populates="direct_messages")
    organizations = db.relationship(
        "Organizations", back_populates="direct_messages")


class Messages(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)

    owners = db.relationship("Users", back_populates="messages")
    user_channels = db.relationship(
        "Channels", back_populates="channel_messages")
