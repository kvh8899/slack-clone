from app.forms.channel_form import ChannelForm

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Organization, Member, Channel
from app.forms.organization_form import OrganizationForm
from .auth_routes import validation_errors_to_error_messages


organization_routes = Blueprint('organizations', __name__)

# edit org route


@organization_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_org(id):
    org = Organization.query.get(id)
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        org.name = form.name.data
        db.session.commit()
        return org.to_dict()
    return {}

# get one org route


@organization_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_org(id):
    org = Organization.query.get(id)
    users = User.query.all()
    dictOrg = org.to_dict()
    members = []
    for member in org.members:
        members.append(member.to_dict())
    available_users = []
    for user in users:
        available_users.append(user.to_dict())
    dictOrg['members'] = members
    dictOrg['available_users'] = available_users
    return dictOrg
# delete organizations


@ organization_routes.route('/<int:organizationId>/delete', methods=['DELETE'])
@login_required
def deleteWorkspace(organizationId):
    org = Organization.query.filter_by(
        id=organizationId).first()

    db.session.delete(org)
    db.session.commit()
    return org.to_dict()

# create organization


@ organization_routes.route('/', methods=['POST'])
@login_required
def newWorkspace():
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.name.data:
        org = Organization(
            name=form.name.data,
            owner_id=current_user.id
        )
        db.session.add(org)
        db.session.commit()

        member = Member(
            user_id=current_user.id,
            org_id=org.to_dict()['id']
        )
        db.session.add(member)
        db.session.commit()

        return org.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET channels of an organization
@ organization_routes.route('/<int:orgId>/channels')
@ login_required
def getChannel(orgId):
    allChannels = Channel.query.filter_by(
        org_id=orgId).join(Organization).all()
    channels = []
    if(allChannels):
        for i in range(len(allChannels)):
            channels.append(allChannels[i].to_dict())
    return {'channels': channels}


# ADD A CHANNEL TO AN ORGANIZATION
@ organization_routes.route('/<int:orgId>/channels', methods=['POST'])
@ login_required
def newChannel(orgId):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.name.data:
        channel = Channel(
            name=form.name.data,
            org_id=orgId
        )
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ADD Member to Organization
@ organization_routes.route('/<int:orgId>/members/<int:userId>', methods=['POST'])
@ login_required
def addMember(orgId, userId):
    print('testbackend')
    user = User.query.get(int(userId))
    org = Organization.query.get(int(orgId))
    if user and user not in org.members:
        member = Member(
            user_id=userId,
            org_id=orgId
        )
        db.session.add(member)
        db.session.commit()
        return user.to_dict()

    return {'error': "Cannot add member"}

# Delete Member
@ organization_routes.route('/<int:orgId>/<int:userId>', methods=['DELETE'])
@ login_required
def deleteMember(orgId, userId):
    
    member = Member.query.filter(Member.user_id == userId).filter(Member.org_id == orgId).first()

    db.session.delete(member)
    db.session.commit()
    return member.to_dict()
