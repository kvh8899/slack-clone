import os
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask import Flask, render_template, request, session, redirect
from flask_login import LoginManager


from flask import Flask
from app.models import db, User
from app.config import Config
from flask_migrate import Migrate
from flask_socketio import SocketIO, send, join_room, leave_room, emit

from app.seeds import seed_commands

from flask_cors import CORS


from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.organizations import organization_routes
from .api.channels import channel_routes

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.config.from_object(Config)
app.cli.add_command(seed_commands)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(organization_routes,url_prefix='/api/organizations')
app.register_blueprint(channel_routes,url_prefix='/api/channels')
db.init_app(app)
Migrate(app, db)
CORS(app)
socketIo = SocketIO(app=app, cors_allowed_origins='*')

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@socketIo.on("message")
def handleMessage(msg):
    if(msg):
        room = f"channel {msg['channelId']}"
        socketIo.emit("message",{'allMessages':msg['allMessages'],'channelId':msg['channelId'],'session':msg['session']},to=room)

@socketIo.on("updateChannel")
def handleUpdateC(data):
    if(data):
        room = f"org {data['organization']}"
        socketIo.emit("updateChannel",{'channelId':data['channelId'],'channelName':data['channelName']},to=room)

@socketIo.on("deleteChannel")
def handleDelete(data):
    room = f"org {data['organization']}"
    socketIo.emit("deleteChannel",{'channelId':data['channelId'],'id':data['organization']},to=room)

@socketIo.on("addChannel")
def handleAdd(data):
    room = f"org {data['organization']}"
    socketIo.emit('addChannel',{'channel':data['channel'],'id':data['organization']},to=room)

@socketIo.on("joinserver")
def handleChannels(data):
    if(data):
        room = f"org {data['organization']}"
        join_room(room)

@socketIo.on("leaveserver")
def leaveServer(data):
    if(data):
        room = f"org {data['organization']}"
        leave_room(room)

@socketIo.on('joinroom')
def on_join(data):
    if(data):
        room = f"channel {data['channelId']}"
        join_room(room)

@socketIo.on('leaveroom')
def on_leave(data):
    if(data):
        room = f"channel {data['channelId']}"
        leave_room(room)

if __name__ == '__main__':
    socketIo.run(app)