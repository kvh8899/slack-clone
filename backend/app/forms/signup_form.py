from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    email = EmailField('email', validators=[
        user_exists, DataRequired()])
    username = StringField('username', validators=[
                           username_exists, Length(min=7), DataRequired()])
    password = StringField('password', validators=[
                           Length(min=7), DataRequired()])
