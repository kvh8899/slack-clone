from app.forms.channel_form import ChannelForm
from flask import Blueprint, jsonify,request
from flask_login import login_required,current_user
from app.models import db, User, Organization, Member, Channel
from app.forms.organization_form import OrganizationForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)

# delete organizations
@channel_routes.route('/<int:channelId>/delete', methods=['DELETE'])
def deleteChannel(channelId):
    channel = Channel.query.filter_by(
        id=channelId).first()

    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()
