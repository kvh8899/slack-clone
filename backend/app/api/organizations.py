from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Organization, db

organization_routes = Blueprint('organizations', __name__)


# delete organizations
@organization_routes.route('/api/organizations/<int:organizationId>/delete', methods=['DELETE'])
def getWorkspace(organizationId):
    org = Organization.query.filter_by(
        id=organizationId).first()
    print(org, 'orgggggggg')

    db.session.delete(org)
    db.session.commit()
    return org.to_dict()
