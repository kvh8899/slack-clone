from flask import Blueprint, jsonify,request
from flask_login import login_required,current_user
from app.models import db, User, Organization
from app.forms.organization_form import OrganizationForm
from .auth_routes import validation_errors_to_error_messages

organization_routes = Blueprint('organizations', __name__)


# delete organizations
@organization_routes.route('/<int:organizationId>/delete', methods=['DELETE'])
def deleteWorkspace(organizationId):
    org = Organization.query.filter_by(
        id=organizationId).first()

    db.session.delete(org)
    db.session.commit()
    return org.to_dict()

# create organization
@organization_routes.route('/', methods=['POST'])
@login_required
def newWorkspace():
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.name.data["name"]:
        org = Organization(
            name = form.name.data["name"],
            owner_id = current_user.id
        )
        db.session.add(org)
        db.session.commit()
        return org.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
