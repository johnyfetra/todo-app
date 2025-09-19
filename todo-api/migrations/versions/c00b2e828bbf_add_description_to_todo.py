"""add description to todo

Revision ID: c00b2e828bbf
Revises: 4b9b6308eed5
Create Date: 2025-09-19 14:47:30.609349

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c00b2e828bbf'
down_revision: Union[str, Sequence[str], None] = '4b9b6308eed5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Ajouter la colonne description à la table todo
    op.add_column('todo', sa.Column('description', sa.String(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    # Supprimer la colonne description de la table todo
    op.drop_column('todo', 'description')
