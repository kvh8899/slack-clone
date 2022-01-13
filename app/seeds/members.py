from app.models import db, Member

def seed_members():
    member_1 = Member(
        user_id = 1,
        org_id = 1
    )

    member_2 = Member(
        user_id = 1,
        org_id = 2
    )

    member_3 = Member(
        user_id = 1,
        org_id = 3
    )

    member_4 = Member(
        user_id = 1,
        org_id = 4
    )

    member_5 = Member(
        user_id = 2,
        org_id = 1
    )

    member_6 = Member(
        user_id = 3,
        org_id = 1
    )

    member_7 = Member(
        user_id = 4,
        org_id = 4
    )

    member_8 = Member(
        user_id = 4,
        org_id = 1
    )

    member_9 = Member(
        user_id = 2,
        org_id = 2
    )

    member_10 = Member(
        user_id = 2,
        org_id = 3
    )

    member_11 = Member(
        user_id = 3,
        org_id = 2
    )

    member_12 = Member(
        user_id = 4,
        org_id = 2
    )



    db.session.add(member_1)
    db.session.add(member_2)
    db.session.add(member_3)
    db.session.add(member_4)
    db.session.add(member_5)
    db.session.add(member_6)
    db.session.add(member_7)
    db.session.add(member_8)
    db.session.add(member_9)
    db.session.add(member_10)
    db.session.add(member_11)
    db.session.add(member_12)
    db.session.commit()

def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
