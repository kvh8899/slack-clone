from app.models import db, DmChannel
def seed_dmChannels():
    dM1 = DmChannel(
        firstUser_id = 1,
        secondUser_id = 2,
    )
    dM2 = DmChannel(
        firstUser_id = 2,
        secondUser_id = 3,
    )

    db.session.add(dM1)
    db.session.add(dM2)
    db.session.commit()

def undo_dmChannels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
    db.session.commit()

