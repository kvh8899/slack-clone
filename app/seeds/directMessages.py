from app.models import db, DirectMessage

def seed_directMessages():
    dM1 = DirectMessage(
        content = 'some dummy message',
        owner_id = '1',
        dm_channel_id = '1'
    )
    dM2 = DirectMessage(
        content = 'some dummy messages for owner # 2',
        owner_id = '2',
        dm_channel_id = '1'
    )

    db.session.add(dM1)
    db.session.add(dM2)
    db.session.commit()

def undo_directMessages():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
    db.session.commit()

