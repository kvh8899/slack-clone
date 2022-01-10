from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import OrganizationForm
from app.models import db, Organization, Member


org_routes = Blueprint('organizations', __name__)

@org_routes.route('/', methods=['POST'])
@login_required
def new_org():
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['name']:
        print('request files', form.data)
        org = Organization(
            name = form.data['name'],
            owner_id = current_user.id
        )
        db.session.add(org)
        db.session.commit()

        member = Member(
            user_id = current_user.id,
            org_id = org.to_dict()['id']
        )
        db.session.add(member)
        db.session.commit()


