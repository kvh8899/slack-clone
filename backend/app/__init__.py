from flask import Flask
from app.models import db ,User,DmChannel
from app.config import Configuration
from flask_migrate import Migrate
from flask_socketio import SocketIO, send
import os

app = Flask(__name__)


@app.route("/")
def index():
    return ""

app.config.from_object(Configuration)
app.config.update({"SECRET_KEY": os.environ.get("SECRET_KEY")})
app.config.update({"SQLALCHEMY_DATABASE_URI": os.environ.get("SQLALCHEMY_DATABASE_URI")})
app.config.update({"SQLALCHEMY_TRACK_MODIFICATIONS": False})
db.init_app(app)
Migrate(app,db)
socketIo = SocketIO(app=app,cors_allowed_origins='*')

@socketIo.on("message")
def handleMessage(msg):
    send(msg,broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app)
