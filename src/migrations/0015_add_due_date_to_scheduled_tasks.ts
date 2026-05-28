export const name = '0015_add_due_date_to_scheduled_tasks';

export const up = `
-- Add due_date column to scheduled_tasks table to store the schedule's end_date
ALTER TABLE scheduled_tasks ADD COLUMN IF NOT EXISTS due_date DATE DEFAULT NULL;
`;

export const down = `
-- Drop due_date column from scheduled_tasks table
ALTER TABLE scheduled_tasks DROP COLUMN IF EXISTS due_date;
`;
