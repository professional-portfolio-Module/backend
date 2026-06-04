export const name = '0019_add_hotel_coordinates';

export const up = `
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS latitude DECIMAL(9,6);
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS longitude DECIMAL(9,6);

-- Seed coordinates for Club Hotel Dolphin
UPDATE hotels 
SET latitude = 7.293047, longitude = 79.840444 
WHERE name = 'Club Hotel Dolphin';
`;

export const down = `
ALTER TABLE hotels DROP COLUMN IF EXISTS latitude;
ALTER TABLE hotels DROP COLUMN IF EXISTS longitude;
`;
