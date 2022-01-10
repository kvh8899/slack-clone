from flask import Blueprint, jsonify, redirect, url_for
from flask_login import login_required
from app.models import Organization
from app.forms.organization_form import OrganizationForm

org_routes = Blueprint('org', __name__)


@org_routes.route('/organizations/edit/<int:id>', methods=['GET', 'POST'])
def edit_org(id):
    org = Organization.query.get(id)
    form = OrganizationForm()
    if form.validate_on_submit():
        org.name = form.name.data

        db.session.add(org)
        db.session.commit()
        return redirect(url_for('organizations', id=org.id))

    form.org.name = org.name
    return 
