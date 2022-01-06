from app.models import db, Message

def seed_messages():
    message_1 = Message(
        content = 'Simple dummy message',
        owner_id = 1,
        channel_id = 1
    )
    message_2 = Message(
        content = 'Another message from owner #1',
        owner_id = 1,
        channel_id = 1
    )
    message_3 = Message(
        content = 'Hello from first user',
        owner_id = 1,
        channel_id = 1
    )

    db.session.add(message_1)
    db.session.add(message_2)
    db.session.add(message_3)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE')
    db.session.commit()
