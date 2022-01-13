from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', hashedPassword='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', hashedPassword='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', hashedPassword='password')
    elen = User(
        username='elen', email='elen@aa.io', hashedPassword='password')
    mars = User(
        username='mars', email='mars@aa.io', hashedPassword='password')
    lauren = User(
        username='lau', email='lau@aa.io', hashedPassword='password')
    kim = User(
        username='kim', email='kim@aa.io', hashedPassword='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(elen)
    db.session.add(mars)
    db.session.add(lauren)
    db.session.add(kim)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
