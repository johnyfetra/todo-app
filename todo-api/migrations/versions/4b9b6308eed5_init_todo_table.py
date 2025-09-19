"""init todo table

Revision ID: 4b9b6308eed5
Revises: 
Create Date: 2025-09-15 15:09:18.018648

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4b9b6308eed5'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Crée la table user
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
    )

    # Crée la table todo (sans description, ajoutée par la migration suivante)
    op.create_table(
        'todo',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('done', sa.Boolean(), nullable=False, server_default=sa.sql.expression.false()),
        sa.Column('owner_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['owner_id'], ['user.id']),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('todo')
    op.drop_table('user')
