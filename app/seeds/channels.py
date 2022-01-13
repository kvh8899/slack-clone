from app.models import db, Channel, Organization
from sqlalchemy.sql.expression import func

def seed_channels():
    # for i in range(1, 5):
    #     seed_channel = Channel(
    #         name = f'Channel {i}',
    #         org_id = db.session.query(Organization.id).order_by(func.random()).first()[0]
    #     )

        # db.session.add(seed_channel)
        # db.session.commit()

    test_channel = Channel(
        name = 'Channel',
        org_id = 4
    )
    test_channel1 = Channel(
        name = 'Channel 2',
        org_id = 4
    )
    test_channel2 = Channel(
        name = 'Channel3',
        org_id = 3
    )
    test_channel3 = Channel(
        name = 'Channel2',
        org_id = 1
    )
    test_channel4 = Channel(
        name = 'Channel3',
        org_id = 4
    )
    test_channel5 = Channel(
        name = 'General Chat',
        org_id = 1
    )
    test_channel6 = Channel(
        name = 'Soccer team',
        org_id = 2
    )
    test_channel7 = Channel(
        name = 'Tennis team',
        org_id = 2
    )
    db.session.add(test_channel)
    db.session.add(test_channel1)
    db.session.add(test_channel2)
    db.session.add(test_channel3)
    db.session.add(test_channel4)
    db.session.add(test_channel5)
    db.session.add(test_channel6)
    db.session.add(test_channel7)
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
    db.session.commit()

