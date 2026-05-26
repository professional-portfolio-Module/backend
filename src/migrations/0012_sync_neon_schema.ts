export const name = '0012_sync_neon_schema';

export const up = `
-- Drop legacy plural tables if they exist (clean up from initial migration on fresh DB)
DROP TABLE IF EXISTS maintenance_tasks CASCADE;
DROP TABLE IF EXISTS maintenance_schedules CASCADE;

-- 1. Create maintenance_schedule (singular)
CREATE TABLE IF NOT EXISTS maintenance_schedule (
  schedule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE SET NULL,
  card_no VARCHAR(100) REFERENCES assets(card_no),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  month VARCHAR(20),
  week_no INTEGER,
  start_date DATE,
  end_date DATE,
  title VARCHAR(255),
  default_description_manager VARCHAR(500),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- 2. Create assignments (technician assignments to schedules)
CREATE TABLE IF NOT EXISTS assignments (
  assignment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scheduled_id UUID REFERENCES maintenance_schedule(schedule_id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Create manual_task (singular)
CREATE TABLE IF NOT EXISTS manual_task (
  manual_task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  checked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  card_no VARCHAR(20) REFERENCES assets(card_no),
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'normal',
  attachment_url VARCHAR(500),
  created_at DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  completed_at DATE,
  tech_remarks VARCHAR(500),
  eng_remarks VARCHAR(500),
  CONSTRAINT manual_task_status_check CHECK (status IN ('pending', 'in-progress', 'under_review', 'completed', 'rejected', 'expired')),
  CONSTRAINT manual_task_priority_check CHECK (priority IN ('normal', 'emergency'))
);

-- 4. Create scheduled_tasks (singular plan instances)
CREATE TABLE IF NOT EXISTS scheduled_tasks (
  task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_id UUID REFERENCES maintenance_schedule(schedule_id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  done_by UUID REFERENCES users(id) ON DELETE SET NULL,
  checked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  additional_details VARCHAR(500),
  status VARCHAR(50),
  priority VARCHAR(50),
  attachment_url VARCHAR(500),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITHOUT TIME ZONE,
  technician_remarks VARCHAR(500),
  engineer_remarks VARCHAR(500),
  CONSTRAINT scheduled_tasks_status_check CHECK (status IN ('pending', 'in-progress', 'under_review', 'completed', 'rejected', 'expired')),
  CONSTRAINT scheduled_tasks_priority_check CHECK (priority IN ('normal', 'emergency'))
);

-- 5. Create report tables referencing maintenance_schedule
CREATE TABLE IF NOT EXISTS wtd_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES maintenance_schedule(schedule_id) ON DELETE CASCADE,
  equipment_type VARCHAR(255) NOT NULL,
  budgeted NUMERIC DEFAULT 0,
  actual NUMERIC DEFAULT 0,
  actual_rate NUMERIC DEFAULT 0,
  variance NUMERIC,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mtd_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES maintenance_schedule(schedule_id) ON DELETE CASCADE,
  equipment_type VARCHAR(255) NOT NULL,
  budgeted NUMERIC DEFAULT 0,
  actual NUMERIC DEFAULT 0,
  actual_rate NUMERIC DEFAULT 0,
  variance NUMERIC,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ytd_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES maintenance_schedule(schedule_id) ON DELETE CASCADE,
  equipment_type VARCHAR(255) NOT NULL,
  budgeted NUMERIC DEFAULT 0,
  actual NUMERIC DEFAULT 0,
  actual_rate NUMERIC DEFAULT 0,
  variance NUMERIC,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export const down = `
DROP TABLE IF EXISTS ytd_reports CASCADE;
DROP TABLE IF EXISTS mtd_reports CASCADE;
DROP TABLE IF EXISTS wtd_reports CASCADE;
DROP TABLE IF EXISTS scheduled_tasks CASCADE;
DROP TABLE IF EXISTS manual_task CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS maintenance_schedule CASCADE;
`;
