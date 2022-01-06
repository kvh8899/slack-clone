from flask import Flask
from app.models import db
from app.config import Configuration
from flask_migrate import Migrate
from flask_socketio import SocketIO, send
from app.seeds import seed_commands
app = Flask(__name__)


@app.route("/")
def index():
    return ""

app.config.from_object(Configuration)
app.cli.add_command(seed_commands)

db.init_app(app)
Migrate(app,db)
socketIo = SocketIO(app=app,cors_allowed_origins='*')

@socketIo.on("message")
def handleMessage(msg):
    send(msg,broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app)
