from flask.cli import AppGroup
from .users import seed_users, undo_users
from .organizations import seed_organizations, undo_organizations
from .channels import seed_channels, undo_channels
from .dmChannels import seed_dmChannels, undo_dmChannels
from .messages import seed_messages, undo_messages
from .directMessages import seed_directMessages, undo_directMessages
from .members import seed_members, undo_members
from .groups import seed_groups, undo_groups

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_organizations()
    seed_channels()
    seed_dmChannels()
    seed_messages()
    seed_directMessages()
    seed_members()
    seed_groups()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_organizations()
    undo_channels()
    undo_dmChannels
    undo_messages()
    undo_directMessages()
    undo_members()
    undo_groups()
    # Add other undo functions here
