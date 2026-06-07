export const name = '0020_add_scheduled_tasks_indexes';

export const up = `
-- Create indexes on scheduled_tasks to optimize joins, filters, and sort operations
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_sched_id ON scheduled_tasks(scheduled_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_status ON scheduled_tasks(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_priority ON scheduled_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_done_by ON scheduled_tasks(done_by);
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_created_at ON scheduled_tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_due_date ON scheduled_tasks(due_date);
`;

export const down = `
DROP INDEX IF EXISTS idx_scheduled_tasks_due_date;
DROP INDEX IF EXISTS idx_scheduled_tasks_created_at;
DROP INDEX IF EXISTS idx_scheduled_tasks_done_by;
DROP INDEX IF EXISTS idx_scheduled_tasks_priority;
DROP INDEX IF EXISTS idx_scheduled_tasks_status;
DROP INDEX IF EXISTS idx_scheduled_tasks_sched_id;
`;
