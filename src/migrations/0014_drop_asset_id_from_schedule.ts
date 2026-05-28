export const name = '0014_drop_asset_id_from_schedule';

export const up = `
-- Remove redundant asset_id column from maintenance_schedule.
-- The card_no column already references assets(card_no) and is the primary link.
ALTER TABLE maintenance_schedule DROP COLUMN IF EXISTS asset_id;
`;

export const down = `
-- Re-add asset_id column (will be NULL for all existing rows)
ALTER TABLE maintenance_schedule ADD COLUMN IF NOT EXISTS asset_id UUID REFERENCES assets(id) ON DELETE SET NULL;
`;
