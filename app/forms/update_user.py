from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class Update_user_form(FlaskForm):
    profile_picture = StringField("profile_picture",validators=[DataRequired()])
