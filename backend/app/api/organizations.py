from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Organization, db
from app.forms.organization_form import OrganizationForm

organization_routes = Blueprint('organizations', __name__)

# edit org route
@organization_routes.route('/organizations/edit/<int:id>', methods=['PUT'])
def edit_org(id):
    org = Organization.query.get(id)
    form = OrganizationForm()
    if form.validate_on_submit():
        org.name = form.name.data

        db.session.add(org)
        db.session.commit()
        return org.to_dict()

    form.org.name = org.name
    return {}

# get one org route
@organization_routes.route('/organizations/<int:id>', methods=['GET'])
def get_one_org(id):
    org = Organization.query.get(id)
    return org.to_dict()

# delete organizations
@organization_routes.route('/api/organizations/<int:organizationId>/delete', methods=['DELETE'])
def getWorkspace(organizationId):
    org = Organization.query.filter_by(
        id=organizationId).first()
    print(org, 'orgggggggg')

    db.session.delete(org)
    db.session.commit()
    return org.to_dict()
