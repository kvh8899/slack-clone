from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(300), nullable=False)
    profilePicture = db.Column(db.String)
    status = db.Column(db.String(200))

    messages = db.relationship(
        "Message", back_populates="owners", cascade='all, delete')
    organization = db.relationship(
        "Organization", back_populates="owner", cascade='all, delete')
    direct_messages = db.relationship(
        'DirectMessage', back_populates='owner', cascade='all, delete')
    members = db.relationship('Organization', secondary='members',
                              back_populates='members', cascade='all, delete')
    channels = db.relationship(
        'Channel', secondary='groups', back_populates='users', cascade='all, delete')

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePicture': self.profilePicture,
            'status': self.status
        }


class Organization(db.Model):
    __tablename__ = "organizations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship(
        "User", back_populates="organization")
    channels = db.relationship(
        "Channel", back_populates="organizations", cascade='all, delete-orphan')
    members = db.relationship('User', secondary='members',
                              back_populates='organization')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
        }


class Channel(db.Model):
    __tablename__ = "channels"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey(
        'organizations.id', ondelete='SET NULL'), nullable=False)

    organizations = db.relationship("Organization", back_populates="channels")
    channel_messages = db.relationship(
        'Message', back_populates='user_channels', cascade='all, delete-orphan')
    users = db.relationship('User', secondary='groups',
                            back_populates="channels")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'org_id': self.org_id,
        }


class DmChannel(db.Model):
    __tablename__ = "dmchannels"
    id = db.Column(db.Integer, primary_key=True)
    firstUser_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    secondUser_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    direct_messages = db.relationship(
        'DirectMessage', back_populates="dm_channels")


class DirectMessage(db.Model):
    __tablename__ = "directmessages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    dm_channel_id = db.Column(db.Integer, db.ForeignKey(
        'dmchannels.id'), nullable=False)

    owner = db.relationship("User", back_populates="direct_messages")
    dm_channels = db.relationship(
        "DmChannel", back_populates="direct_messages")


class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)

    owners = db.relationship("User", back_populates="messages")
    user_channels = db.relationship(
        "Channel", back_populates="channel_messages")


class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    org_id = db.Column(db.Integer, db.ForeignKey(
        'organizations.id'), nullable=False)


class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False)
