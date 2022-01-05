"""empty message

Revision ID: 78e164109519
Revises: 373ed8e94070
Create Date: 2022-01-05 09:08:50.898972

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78e164109519'
down_revision = '373ed8e94070'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dmchannels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstUser_id', sa.Integer(), nullable=False),
    sa.Column('secondUser_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['firstUser_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['secondUser_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('directmessages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=500), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('dm_channel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dm_channel_id'], ['dmchannels.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('directmessages')
    op.drop_table('dmchannels')
    # ### end Alembic commands ###