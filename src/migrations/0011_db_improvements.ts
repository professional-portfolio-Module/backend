export const name = '0011_db_improvements';

export const up = `
-- 1. Align timezone handling to TIMESTAMPTZ for consistency in users table
ALTER TABLE users ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC';
ALTER TABLE users ALTER COLUMN otp_expiry TYPE TIMESTAMPTZ USING otp_expiry AT TIME ZONE 'UTC';

-- 2. Add metadata JSONB column to notifications table
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT NULL;

-- 3. Add CHECK constraints for asset statuses
ALTER TABLE assets DROP CONSTRAINT IF EXISTS check_asset_status;
ALTER TABLE assets ADD CONSTRAINT check_asset_status 
  CHECK (status IN ('active', 'under_maintainace', 'breakdown', 'retired', 'inactive'));

-- 4. Re-target foreign keys from users_old to users table
-- Drop the old constraints referencing users_old
ALTER TABLE maintenance_schedules DROP CONSTRAINT IF EXISTS maintenance_schedules_created_by_fkey;
ALTER TABLE maintenance_schedules DROP CONSTRAINT IF EXISTS maintenance_schedules_updated_by_fkey;
ALTER TABLE maintenance_tasks DROP CONSTRAINT IF EXISTS maintenance_tasks_assigned_to_fkey;
ALTER TABLE maintenance_tasks DROP CONSTRAINT IF EXISTS maintenance_tasks_assigned_by_fkey;

-- Clean up any orphaned references that might fail constraint validation (set to NULL if they don't exist in users)
UPDATE maintenance_schedules SET created_by = NULL WHERE created_by NOT IN (SELECT id FROM users);
UPDATE maintenance_schedules SET updated_by = NULL WHERE updated_by NOT IN (SELECT id FROM users);
UPDATE maintenance_tasks SET assigned_to = NULL WHERE assigned_to NOT IN (SELECT id FROM users);
UPDATE maintenance_tasks SET assigned_by = NULL WHERE assigned_by NOT IN (SELECT id FROM users);

-- Add new constraints referencing the active users table
ALTER TABLE maintenance_schedules 
  ADD CONSTRAINT maintenance_schedules_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE maintenance_schedules 
  ADD CONSTRAINT maintenance_schedules_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE maintenance_tasks 
  ADD CONSTRAINT maintenance_tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE maintenance_tasks 
  ADD CONSTRAINT maintenance_tasks_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL;

-- 5. Set auto-increment sequence on refresh_tokens.id if not already present
CREATE SEQUENCE IF NOT EXISTS refresh_tokens_id_seq;
ALTER TABLE refresh_tokens ALTER COLUMN id SET DEFAULT nextval('refresh_tokens_id_seq');
SELECT setval('refresh_tokens_id_seq', COALESCE((SELECT MAX(id)+1 FROM refresh_tokens), 1), false);

-- 6. Drop legacy users_old table
DROP TABLE IF EXISTS users_old CASCADE;
`;

export const down = `
-- Recreate legacy users_old table structure
CREATE TABLE IF NOT EXISTS users_old (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Drop new constraints referencing users
ALTER TABLE maintenance_schedules DROP CONSTRAINT IF EXISTS maintenance_schedules_created_by_fkey;
ALTER TABLE maintenance_schedules DROP CONSTRAINT IF EXISTS maintenance_schedules_updated_by_fkey;
ALTER TABLE maintenance_tasks DROP CONSTRAINT IF EXISTS maintenance_tasks_assigned_to_fkey;
ALTER TABLE maintenance_tasks DROP CONSTRAINT IF EXISTS maintenance_tasks_assigned_by_fkey;

-- Restore old constraints referencing users_old
ALTER TABLE maintenance_schedules 
  ADD CONSTRAINT maintenance_schedules_created_by_fkey FOREIGN KEY (created_by) REFERENCES users_old(id) ON DELETE SET NULL;
ALTER TABLE maintenance_schedules 
  ADD CONSTRAINT maintenance_schedules_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users_old(id) ON DELETE SET NULL;

ALTER TABLE maintenance_tasks 
  ADD CONSTRAINT maintenance_tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES users_old(id) ON DELETE SET NULL;
ALTER TABLE maintenance_tasks 
  ADD CONSTRAINT maintenance_tasks_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES users_old(id) ON DELETE SET NULL;

-- Remove metadata from notifications
ALTER TABLE notifications DROP COLUMN IF EXISTS metadata;

-- Drop check constraint on assets
ALTER TABLE assets DROP CONSTRAINT IF EXISTS check_asset_status;

-- Revert columns type back to timestamp without time zone
ALTER TABLE users ALTER COLUMN created_at TYPE TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE users ALTER COLUMN otp_expiry TYPE TIMESTAMP WITHOUT TIME ZONE;
`;
