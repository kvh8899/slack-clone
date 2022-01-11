from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Organization
from app.forms.organization_form import OrganizationForm
from .auth_routes import validation_errors_to_error_messages


organization_routes = Blueprint('organizations', __name__)


# delete organizations
@organization_routes.route('/api/organizations/<int:organizationId>/delete', methods=['DELETE'])
def deleteWorkspace(organizationId):
    org = Organization.query.filter_by(
        id=organizationId).first()
    print(org, 'orgggggggg')

    db.session.delete(org)
    db.session.commit()
    return org.to_dict()

# create organization
@organization_routes.route('/api/users/${userId}/organizations', methods=['POST'])
@login_required
def newWorkspace():
    form = OrganizationForm()
    if form.data["name"]:
        org = Organization(
            name = form.data['name']
        )
        db.session.add(org)
        db.session.commit()
        return org.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
