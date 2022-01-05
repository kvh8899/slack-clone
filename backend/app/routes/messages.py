from flask import Blueprint, render_template
from app.models import Messages
bp = Blueprint("messages",__name__,url_prefix="/messages")

@bp.route("/<int:channelid>")
def messages(channelid):
    msgs = Messages.query.filter(channel_id == channelid).all()
    ## turn msgs into json and return
    return {}