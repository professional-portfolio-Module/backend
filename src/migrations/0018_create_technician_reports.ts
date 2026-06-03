export const name = '0018_create_technician_reports';

export const up = `
CREATE TABLE IF NOT EXISTS technician_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    technician_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_text TEXT NOT NULL,
    is_critical BOOLEAN NOT NULL DEFAULT FALSE,
    recipient_role VARCHAR(50) NOT NULL CHECK (recipient_role IN ('engineer', 'manager')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tech_reports_hotel ON technician_reports(hotel_id);
CREATE INDEX IF NOT EXISTS idx_tech_reports_tech ON technician_reports(technician_id);
`;

export const down = `
DROP TABLE IF EXISTS technician_reports CASCADE;
`;
