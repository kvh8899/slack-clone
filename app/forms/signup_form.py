from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
import re


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


def username_length(form, field):
    # Checking if username is already in use
    username = field.data
    if len(username) < 5:
        raise ValidationError('Username must be at least 5 Characters.')


def password_length(form, field):
    # Checking if username is already in use
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be at least 7 Characters.')


def password_capital(form, field):
    # Checking if username is already in use
    password = field.data
    count = 0
    for letter in password:
        if letter.isupper():
            count += 1
    if count == 0:
        raise ValidationError('Password must have at least 1 capital letter.')


def password_number(form, field):
    # Checking if username is already in use
    password = field.data
    count = 0
    for char in password:
        if char.isdigit():
            count += 1
    if count == 0:
        raise ValidationError('Password must have at least 1 number.')


def is_email(form, field):
    # Checking if username is already in use
    email = field.data
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not re.fullmatch(regex, email):
        print('ITS IN')
        raise ValidationError('Must be a valid email.')


class SignUpForm(FlaskForm):
    email = EmailField('email', validators=[is_email,
                                            user_exists, DataRequired()])
    username = StringField('username', validators=[
                           username_exists, username_length, DataRequired()])
    password = StringField('password', validators=[
                           password_length, password_capital, password_number, DataRequired()])
