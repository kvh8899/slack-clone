from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Organization

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
def getWorkspace(userId):
    allWorkspaces = User.query.filter_by(id=userId).join(Organization).first()
    organizations = []
    if(allWorkspaces):
        for i in range(len(allWorkspaces.organization)):
            organizations.append(allWorkspaces.organization[i].to_dict())
            members = []
            # inefficient, better to have a column in table that has
            # number of users
            for x in allWorkspaces.organization[i].members:
                members.append(x.to_dict())
            organizations[i]['members'] = members

    return {'workspaces': organizations}
