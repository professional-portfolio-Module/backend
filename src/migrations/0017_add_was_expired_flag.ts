export const name = '0017_add_was_expired_flag';

export const up = `
ALTER TABLE scheduled_tasks
ADD COLUMN IF NOT EXISTS was_expired BOOLEAN DEFAULT false;

ALTER TABLE manual_task
ADD COLUMN IF NOT EXISTS was_expired BOOLEAN DEFAULT false;
`;

export const down = `
ALTER TABLE scheduled_tasks
DROP COLUMN IF EXISTS was_expired;

ALTER TABLE manual_task
DROP COLUMN IF EXISTS was_expired;
`;

