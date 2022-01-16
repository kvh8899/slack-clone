from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Organization, Member

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# get all organizations of a user


@user_routes.route('/<int:userId>/organizations')
@login_required
def getWorkspace(userId):
    allWorkSpaces = Organization.query.join(Member).filter_by(user_id=userId).join(User).all()
    organizations = []
    if(allWorkSpaces):
        for i in allWorkSpaces:
            message = i.to_dict();
            members = []
            for c in i.members:
                members.append(c.to_dict())
            message['members'] = members;

            organizations.append(message)

    return {'workspaces': organizations}
