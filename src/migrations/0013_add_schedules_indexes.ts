export const name = '0013_add_schedules_indexes';

export const up = `
-- Create indexes on maintenance_schedule to optimize filtering and pagination query performance
CREATE INDEX IF NOT EXISTS idx_m_sched_hotel_id ON maintenance_schedule(hotel_id);
CREATE INDEX IF NOT EXISTS idx_m_sched_created_at ON maintenance_schedule(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_m_sched_month ON maintenance_schedule(month);
CREATE INDEX IF NOT EXISTS idx_m_sched_card_no ON maintenance_schedule(card_no);

-- Create index on assignments to speed up mapping queries
CREATE INDEX IF NOT EXISTS idx_assignments_scheduled_id ON assignments(scheduled_id);
`;

export const down = `
DROP INDEX IF EXISTS idx_assignments_scheduled_id;
DROP INDEX IF EXISTS idx_m_sched_card_no;
DROP INDEX IF EXISTS idx_m_sched_month;
DROP INDEX IF EXISTS idx_m_sched_created_at;
DROP INDEX IF EXISTS idx_m_sched_hotel_id;
`;
