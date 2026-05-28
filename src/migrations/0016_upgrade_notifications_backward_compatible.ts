export const name = '0016_upgrade_notifications_backward_compatible';

export const up = `
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS entity_id UUID NULL;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS entity_type VARCHAR(50) NULL;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ NULL;

-- Sync existing read = true notifications with a read_at timestamp
UPDATE notifications SET read_at = created_at WHERE read = true AND read_at IS NULL;

-- Create an index to support faster querying on user unread notifications using the new read_at timestamp
CREATE INDEX IF NOT EXISTS idx_notifications_user_read_at ON notifications(user_id, read_at);
`;

export const down = `
DROP INDEX IF EXISTS idx_notifications_user_read_at;
ALTER TABLE notifications DROP COLUMN IF EXISTS entity_id;
ALTER TABLE notifications DROP COLUMN IF EXISTS entity_type;
ALTER TABLE notifications DROP COLUMN IF EXISTS read_at;
`;
