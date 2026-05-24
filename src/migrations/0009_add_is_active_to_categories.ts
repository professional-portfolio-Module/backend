export const name = '0009_add_is_active_to_categories';

export const up = `
ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
`;

export const down = `
ALTER TABLE categories DROP COLUMN IF EXISTS is_active;
`;
