from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

def tester(form,field):
    print(field,"FIRE")

class OrganizationForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(),tester])

