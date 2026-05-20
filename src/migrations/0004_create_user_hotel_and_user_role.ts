export const name = '0004_create_user_hotel_and_user_role';

export const up = `
DO $$
BEGIN
  -- Table to link users to multiple hotels
  CREATE TABLE IF NOT EXISTS user_hotel (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, hotel_id)
  );

  -- Table to link users to multiple roles
  CREATE TABLE IF NOT EXISTS user_role (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
  );

  -- Populate user_hotel for existing users (use the hotel_id already stored in users)
  INSERT INTO user_hotel (user_id, hotel_id)
  SELECT id, hotel_id FROM users
  ON CONFLICT DO NOTHING;

  -- Populate user_role for existing users based on the role string column
  INSERT INTO user_role (user_id, role_id)
  SELECT u.id, r.id
  FROM users u
  JOIN roles r ON LOWER(u.role) = LOWER(r.name)
  ON CONFLICT DO NOTHING;
END $$;
`;

export const down = `
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS user_hotel CASCADE;
`;
