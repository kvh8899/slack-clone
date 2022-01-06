from app.models import db, Organization

def seed_organizations():
    demo_org1 = Organization(
        name='frogstar-world-b',
        owner_id = 1
        )

    demo_org2 = Organization(
        name='August Cohort',
        owner_id = 1
        )
    demo_org3 = Organization(
        name='App Academy',
        owner_id = 1
        )
    demo_org4 = Organization(
        name='Betelgeuse V',
        owner_id = 1
        )

    db.session.add(demo_org1)
    db.session.add(demo_org2)
    db.session.add(demo_org3)
    db.session.add(demo_org4)
    db.session.commit()

def undo_organizations():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()
