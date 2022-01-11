from app.models import db, Group


def seed_groups():
    group_1 = Group(
        user_id=1,
        channel_id=1
    )

    group_2 = Group(
        user_id=1,
        channel_id=2
    )

    group_3 = Group(
        user_id=1,
        channel_id=3
    )

    group_4 = Group(
        user_id=1,
        channel_id=4
    )

    db.session.add(group_1)
    db.session.add(group_2)
    db.session.add(group_3)
    db.session.add(group_4)
    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
