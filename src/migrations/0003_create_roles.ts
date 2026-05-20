export const name = '0003_create_roles';

export const up = `
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES
  ('Super Admin'),
  ('Admin'),
  ('Manager'),
  ('Engineer'),
  ('Staff'),
  ('Technician')
ON CONFLICT (name) DO NOTHING;
`;

export const down = `
DROP TABLE IF EXISTS roles CASCADE;
`;
