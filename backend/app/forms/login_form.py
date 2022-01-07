from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    print(password,field)
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('User does not exists.')
    if not user.check_password(password):
        raise ValidationError('Password is incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[user_exists])
    password = StringField('password', validators=[password_matches])
