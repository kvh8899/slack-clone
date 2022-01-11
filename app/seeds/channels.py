from app.models import db, Channel, Organization
from sqlalchemy.sql.expression import func

def seed_channels():
    for i in range(1, 5):
        seed_channel = Channel(
            name = f'Channel {i}',
            org_id = db.session.query(Organization.id).order_by(func.random()).first()[0]
        )

        db.session.add(seed_channel)
        db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
    db.session.commit()

