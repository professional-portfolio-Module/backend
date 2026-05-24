export const name = '0008_refactor_assets_and_categories';

export const up = `
DO $$
BEGIN
  -- Rename equipment_categories to categories
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'equipment_categories') THEN
    ALTER TABLE equipment_categories RENAME TO categories;
  END IF;

  -- Rename equipment to assets
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'equipment') THEN
    ALTER TABLE equipment RENAME TO assets;
  END IF;

  -- Rename equipment_no to card_no in assets
  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'assets' AND column_name = 'equipment_no') THEN
    ALTER TABLE assets RENAME COLUMN equipment_no TO card_no;
  END IF;

  -- Rename warranty_expiry to warranty_expiery in assets
  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'assets' AND column_name = 'warranty_expiry') THEN
    ALTER TABLE assets RENAME COLUMN warranty_expiry TO warranty_expiery;
  END IF;

  -- Add qr_code_url to assets
  IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'assets' AND column_name = 'qr_code_url') THEN
    ALTER TABLE assets ADD COLUMN qr_code_url VARCHAR(255);
  END IF;

  -- Update status check constraint in assets
  ALTER TABLE assets DROP CONSTRAINT IF EXISTS equipment_status_check;
  ALTER TABLE assets DROP CONSTRAINT IF EXISTS assets_status_check;
  ALTER TABLE assets ADD CONSTRAINT assets_status_check CHECK (status IN ('active', 'under_maintainace', 'breakdown', 'retired', 'inactive'));

END $$;
`;

export const down = `
DO $$
BEGIN
  -- Rename tables back
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'categories') THEN
    ALTER TABLE categories RENAME TO equipment_categories;
  END IF;

  -- Rename equipment back
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'assets') THEN
    ALTER TABLE assets RENAME TO equipment;
  END IF;

  -- Rename columns back
  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'equipment' AND column_name = 'card_no') THEN
    ALTER TABLE equipment RENAME COLUMN card_no TO equipment_no;
  END IF;

  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'equipment' AND column_name = 'warranty_expiery') THEN
    ALTER TABLE equipment RENAME COLUMN warranty_expiery TO warranty_expiry;
  END IF;

  -- Drop added columns
  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'equipment' AND column_name = 'qr_code_url') THEN
    ALTER TABLE equipment DROP COLUMN qr_code_url;
  END IF;

  -- Re-add check constraint
  ALTER TABLE equipment DROP CONSTRAINT IF EXISTS assets_status_check;
  ALTER TABLE equipment DROP CONSTRAINT IF EXISTS equipment_status_check;
  ALTER TABLE equipment ADD CONSTRAINT equipment_status_check CHECK (status IN ('active', 'inactive', 'retired'));
END $$;
`;
