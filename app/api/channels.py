from app.forms.channel_form import ChannelForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Organization, Member, Channel, Message
from app.forms.organization_form import OrganizationForm
from app.forms.message_form import MessageForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)

# delete channel


@channel_routes.route('/<int:channelId>/delete', methods=['DELETE'])
@ login_required
def deleteChannel(channelId):
    channel = Channel.query.filter_by(
        id=channelId).first()

    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()


# edit channel
@channel_routes.route('/<int:channelId>/edit', methods=['PUT'])
@ login_required
def edit_channel(channelId):
    channel = Channel.query.get(channelId)
    form = ChannelForm()
    if form.name.data:
        channel.name = form.name.data
        db.session.commit()
        return channel.to_dict()

# get messages of a channel
@channel_routes.route('/<int:channelId>/messages')
@ login_required
def get_messages(channelId):
    messages = Message.query.join(User).filter(channelId == Message.channel_id).order_by(Message.id.asc()).all()
    msgDict = []
    for i in messages:
        msg = i.to_dict()
        msg['owner'] = i.owners.to_dict()
        msgDict.append(msg)
    return {'messages': msgDict}

# send messages in a channel (create route)
@channel_routes.route('/<int:channelId>/messages', methods=['POST'])
@ login_required
def createMsg(channelId):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        new = Message(content=form.content.data,
                      channel_id=channelId, owner_id=current_user.id)
        db.session.add(new)
        db.session.commit()
        return new.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
