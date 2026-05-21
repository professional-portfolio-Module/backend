export const name = '0006_seed_missing_equipment';

export const up = `
DO \$\$
DECLARE
    v_hotel_id       UUID := (SELECT id FROM hotels WHERE name = 'Club Hotel Dolphin' LIMIT 1);
    v_cat_pa_id      UUID := (SELECT id FROM equipment_categories WHERE code = 'PA' LIMIT 1);
    v_cat_gr_id      UUID := (SELECT id FROM equipment_categories WHERE code = 'GR' LIMIT 1);
BEGIN

    -- PUBLIC AREAS (49 records)
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA001', v_cat_pa_id, 'Car Porch', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA002', v_cat_pa_id, 'Reception and  looby', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA003', v_cat_pa_id, 'Aqua Lounge', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA004', v_cat_pa_id, 'Dock - Toilet', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA005', v_cat_pa_id, 'Executive Offices', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA006', v_cat_pa_id, 'Sand Restaurant', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA007', v_cat_pa_id, 'Sand Toilets', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA008', v_cat_pa_id, 'Waves Restaurant', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA009', v_cat_pa_id, 'Cove Bar', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA010', v_cat_pa_id, 'Cove Changing rooms', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA011', v_cat_pa_id, 'Spa', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA012', v_cat_pa_id, 'Gym', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA013', v_cat_pa_id, 'Guest Room Corridor -  North Wing G-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA014', v_cat_pa_id, 'Guest Room Corridor -  North Wing 1st-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA015', v_cat_pa_id, 'Guest Room Corridor -  North Wing 2nd-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA016', v_cat_pa_id, 'Guest Room Corridor -  CenterWing G-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA017', v_cat_pa_id, 'Guest Room Corridor -  CenterWing 1st-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA018', v_cat_pa_id, 'Guest Room Corridor -  Center Wing 2nd-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA019', v_cat_pa_id, 'Guest Room Corridor -  New Wing G-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA020', v_cat_pa_id, 'Guest Room Corridor -  New Wing 1st-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA021', v_cat_pa_id, 'Guest Room Corridor -  New Wing 2nd-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA022', v_cat_pa_id, 'Guest Room Corridor -  South Wing G-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA023', v_cat_pa_id, 'Guest Room Corridor -  South Wing 1st-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA024', v_cat_pa_id, 'Guest Room Corridor -  South Wing 2nd-Floor', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA025', v_cat_pa_id, 'Flippers Bar', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA026', v_cat_pa_id, 'Pool Changing Room', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA027', v_cat_pa_id, 'Free funtion area', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA028', v_cat_pa_id, 'Snack & Nibble and area', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA029', v_cat_pa_id, 'Sundeck and High tied entrance', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA030', v_cat_pa_id, 'Kids Club', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA031', v_cat_pa_id, 'Anchor Theater and area', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA032', v_cat_pa_id, 'General Offices', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA033', v_cat_pa_id, 'HOD Quarters / GM / RM Quaters', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA034', v_cat_pa_id, 'JSQ Quarters', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA035', v_cat_pa_id, 'Main Kitchen', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA036', v_cat_pa_id, 'Waves Kitchen', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA037', v_cat_pa_id, 'Snack Kitchen', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA038', v_cat_pa_id, 'Dolphin Kitchen', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA039', v_cat_pa_id, 'Cove Kitchen', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA040', v_cat_pa_id, 'Stores Area', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA041', v_cat_pa_id, 'Receving Area', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA042', v_cat_pa_id, 'Staff Cafeteria', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA043', v_cat_pa_id, 'Linen Room and area', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA044', v_cat_pa_id, 'Staff Changing room', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA045', v_cat_pa_id, 'Car Paking Area - Miami and Dolphin', 'Back Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA046', v_cat_pa_id, 'The Pearl Hall', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA047', v_cat_pa_id, 'SeaShell Area', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA048', v_cat_pa_id, 'Admiral Court & Mini Conference Hall', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'PA049', v_cat_pa_id, 'Admiral Court Toilet Area', 'Front Of the House', 'active') ON CONFLICT (equipment_no) DO NOTHING;

    -- GUEST ROOMS (154 records)
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR001', v_cat_gr_id, 'Guest Room No - 50', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR002', v_cat_gr_id, 'Guest Room No - 51', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR003', v_cat_gr_id, 'Guest Room No - 52', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR004', v_cat_gr_id, 'Guest Room No - 53', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR005', v_cat_gr_id, 'Guest Room No - 54', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR006', v_cat_gr_id, 'Guest Room No - 55', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR007', v_cat_gr_id, 'Guest Room No - 56', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR008', v_cat_gr_id, 'Guest Room No - 57', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR009', v_cat_gr_id, 'Guest Room No - 58', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR010', v_cat_gr_id, 'Guest Room No - 59', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR011', v_cat_gr_id, 'Guest Room No - 60', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR012', v_cat_gr_id, 'Guest Room No - 61', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR013', v_cat_gr_id, 'Guest Room No - 62', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR014', v_cat_gr_id, 'Guest Room No - 63', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR015', v_cat_gr_id, 'Guest Room No - 64', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR016', v_cat_gr_id, 'Guest Room No - 65', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR017', v_cat_gr_id, 'Guest Room No - 66', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR018', v_cat_gr_id, 'Guest Room No - 67', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR019', v_cat_gr_id, 'Guest Room No - 68', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR020', v_cat_gr_id, 'Guest Room No - 69', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR021', v_cat_gr_id, 'Guest Room No - 70', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR022', v_cat_gr_id, 'Guest Room No - 71', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR023', v_cat_gr_id, 'Guest Room No - 72', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR024', v_cat_gr_id, 'Guest Room No - 73', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR025', v_cat_gr_id, 'Guest Room No - 74', 'Miami A', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR026', v_cat_gr_id, 'Guest Room No - 75', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR027', v_cat_gr_id, 'Guest Room No - 76', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR028', v_cat_gr_id, 'Guest Room No - 77', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR029', v_cat_gr_id, 'Guest Room No - 78', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR030', v_cat_gr_id, 'Guest Room No - 79', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR031', v_cat_gr_id, 'Guest Room No - 80', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR032', v_cat_gr_id, 'Guest Room No - 81', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR033', v_cat_gr_id, 'Guest Room No - 82', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR034', v_cat_gr_id, 'Guest Room No - 83', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR035', v_cat_gr_id, 'Guest Room No - 84', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR036', v_cat_gr_id, 'Guest Room No - 85', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR037', v_cat_gr_id, 'Guest Room No - 86', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR038', v_cat_gr_id, 'Guest Room No - 87', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR039', v_cat_gr_id, 'Guest Room No - 88', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR040', v_cat_gr_id, 'Guest Room No - 89', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR041', v_cat_gr_id, 'Guest Room No - 90', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR042', v_cat_gr_id, 'Guest Room No - 91', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR043', v_cat_gr_id, 'Guest Room No - 92', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR044', v_cat_gr_id, 'Guest Room No - 93', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR045', v_cat_gr_id, 'Guest Room No - 94', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR046', v_cat_gr_id, 'Guest Room No - 95', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR047', v_cat_gr_id, 'Guest Room No - 96', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR048', v_cat_gr_id, 'Guest Room No - 97', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR049', v_cat_gr_id, 'Guest Room No - 98', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR050', v_cat_gr_id, 'Guest Room No - 99', 'Miami B', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR051', v_cat_gr_id, 'Guest Room No - 100', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR052', v_cat_gr_id, 'Guest Room No - 101', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR053', v_cat_gr_id, 'Guest Room No - 102', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR054', v_cat_gr_id, 'Guest Room No - 103', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR055', v_cat_gr_id, 'Guest Room No - 104', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR056', v_cat_gr_id, 'Guest Room No - 105', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR057', v_cat_gr_id, 'Guest Room No - 106', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR058', v_cat_gr_id, 'Guest Room No - 107', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR059', v_cat_gr_id, 'Guest Room No - 108', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR060', v_cat_gr_id, 'Guest Room No - 109', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR061', v_cat_gr_id, 'Guest Room No - 110', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR062', v_cat_gr_id, 'Guest Room No - 111', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR063', v_cat_gr_id, 'Guest Room No - 116', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR064', v_cat_gr_id, 'Guest Room No - 117', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR065', v_cat_gr_id, 'Guest Room No - 120', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR066', v_cat_gr_id, 'Guest Room No - 121', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR067', v_cat_gr_id, 'Guest Room No - 122', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR068', v_cat_gr_id, 'Guest Room No - 123', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR069', v_cat_gr_id, 'Guest Room No - 124', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR070', v_cat_gr_id, 'Guest Room No - 125', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR071', v_cat_gr_id, 'Guest Room No - 126', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR072', v_cat_gr_id, 'Guest Room No - 127', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR073', v_cat_gr_id, 'Guest Room No - 128', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR074', v_cat_gr_id, 'Guest Room No - 129', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR075', v_cat_gr_id, 'Guest Room No - 130', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR076', v_cat_gr_id, 'Guest Room No - 131', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR077', v_cat_gr_id, 'Guest Room No - 132', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR078', v_cat_gr_id, 'Guest Room No - 133', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR079', v_cat_gr_id, 'Guest Room No - 134', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR080', v_cat_gr_id, 'Guest Room No - 135', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR081', v_cat_gr_id, 'Guest Room No - 136', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR082', v_cat_gr_id, 'Guest Room No - 137', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR083', v_cat_gr_id, 'Guest Room No - 138', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR084', v_cat_gr_id, 'Guest Room No - 139', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR085', v_cat_gr_id, 'Guest Room No - 140', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR086', v_cat_gr_id, 'Guest Room No - 141', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR087', v_cat_gr_id, 'Guest Room No - 142', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR088', v_cat_gr_id, 'Guest Room No - 143', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR089', v_cat_gr_id, 'Guest Room No - 203', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR090', v_cat_gr_id, 'Guest Room No - 204', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR091', v_cat_gr_id, 'Guest Room No - 205', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR092', v_cat_gr_id, 'Guest Room No - 206', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR093', v_cat_gr_id, 'Guest Room No - 207', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR094', v_cat_gr_id, 'Guest Room No - 208', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR095', v_cat_gr_id, 'Guest Room No - 209', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR096', v_cat_gr_id, 'Guest Room No - 210', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR097', v_cat_gr_id, 'Guest Room No - 211', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR098', v_cat_gr_id, 'Guest Room No - 212', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR099', v_cat_gr_id, 'Guest Room No - 214', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR100', v_cat_gr_id, 'Guest Room No - 215', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR101', v_cat_gr_id, 'Guest Room No - 216', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR102', v_cat_gr_id, 'Guest Room No - 217', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR103', v_cat_gr_id, 'Guest Room No - 218', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR104', v_cat_gr_id, 'Guest Room No - 219', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR105', v_cat_gr_id, 'Guest Room No - 220', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR106', v_cat_gr_id, 'Guest Room No - 221', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR107', v_cat_gr_id, 'Guest Room No - 222', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR108', v_cat_gr_id, 'Guest Room No - 223', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR109', v_cat_gr_id, 'Guest Room No - 224', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR110', v_cat_gr_id, 'Guest Room No - 225', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR111', v_cat_gr_id, 'Guest Room No - 226', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR112', v_cat_gr_id, 'Guest Room No - 227', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR113', v_cat_gr_id, 'Guest Room No - 228', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR114', v_cat_gr_id, 'Guest Room No - 229', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR115', v_cat_gr_id, 'Guest Room No - 230', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR116', v_cat_gr_id, 'Guest Room No - 231', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR117', v_cat_gr_id, 'Guest Room No - 232', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR118', v_cat_gr_id, 'Guest Room No - 233', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR119', v_cat_gr_id, 'Guest Room No - 234', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR120', v_cat_gr_id, 'Guest Room No - 235', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR121', v_cat_gr_id, 'Guest Room No - 236', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR122', v_cat_gr_id, 'Guest Room No - 237', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR123', v_cat_gr_id, 'Guest Room No - 238', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR124', v_cat_gr_id, 'Guest Room No - 239', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR125', v_cat_gr_id, 'Guest Room No - 240', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR126', v_cat_gr_id, 'Guest Room No - 306', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR127', v_cat_gr_id, 'Guest Room No - 307', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR128', v_cat_gr_id, 'Guest Room No - 308', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR129', v_cat_gr_id, 'Guest Room No - 309', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR130', v_cat_gr_id, 'Guest Room No - 310', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR131', v_cat_gr_id, 'Guest Room No - 311', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR132', v_cat_gr_id, 'Guest Room No - 312', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR133', v_cat_gr_id, 'Guest Room No - 314', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR134', v_cat_gr_id, 'Guest Room No - 315', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR135', v_cat_gr_id, 'Guest Room No - 316', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR136', v_cat_gr_id, 'Guest Room No - 317', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR137', v_cat_gr_id, 'Guest Room No - 318', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR138', v_cat_gr_id, 'Guest Room No - 319', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR139', v_cat_gr_id, 'Guest Room No - 320', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR140', v_cat_gr_id, 'Guest Room No - 321', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR141', v_cat_gr_id, 'Guest Room No - 322', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR142', v_cat_gr_id, 'Guest Room No - 323', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR143', v_cat_gr_id, 'Guest Room No - 324', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR144', v_cat_gr_id, 'Guest Room No - 325', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR145', v_cat_gr_id, 'Guest Room No - 326', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR146', v_cat_gr_id, 'Guest Room No - 327', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR147', v_cat_gr_id, 'Guest Room No - 329', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR148', v_cat_gr_id, 'Guest Room No - 330', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR149', v_cat_gr_id, 'Guest Room No - 332', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR150', v_cat_gr_id, 'Guest Room No - 333', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR151', v_cat_gr_id, 'Guest Room No - 334', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR152', v_cat_gr_id, 'Guest Room No - 335', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR153', v_cat_gr_id, 'Guest Room No - 336', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;
    INSERT INTO equipment (hotel_id, equipment_no, category_id, description, location, status) VALUES (v_hotel_id, 'GR154', v_cat_gr_id, 'Guest Room No - 337', 'Dolphin', 'active') ON CONFLICT (equipment_no) DO NOTHING;

END \$\$;

-- Now re-run the schedule insertions, skipping existing schedules
DO \$\$
DECLARE
    v_hotel_id UUID := (SELECT id FROM hotels WHERE name = 'Club Hotel Dolphin' LIMIT 1);
BEGIN

    -- Batch 1: rows 1-80
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('AC001', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('AC002', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('AC003', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('AC004', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC005', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('AC006', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('AC007', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('AC008', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('AC009', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC010', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('AC011', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('AC012', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('AC013', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC014', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('AC015', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC016', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('AC017', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('AC018', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('AC019', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC020', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC021', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC022', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC023', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC024', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC025', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC026', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC027', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC029', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC030', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC032', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC033', 'bi-annual', 180, 'APR-04,FEB-04', 2),
        ('AC034', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC035', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC036', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC037', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC038', 'quarterly', 90, 'JUN-02,APR-03,FEB-03', 3),
        ('AC040', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC041', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC042', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC043', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC044', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC045', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC046', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC048', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC049', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC050', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC052', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC054', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC055', 'quarterly', 90, 'APR-02,FEB-03,FEB-02', 3),
        ('AC056', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC057', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC058', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC059', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC060', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC061', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC062', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC063', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC064', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC065', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC066', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC067', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC068', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC069', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC070', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC071', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC072', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC073', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC074', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC075', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC076', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC077', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC078', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC079', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC080', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC081', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC082', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC083', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC084', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC085', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC086', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 2: rows 81-160
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('AC087', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC088', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC089', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC090', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC091', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC092', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC093', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC094', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC095', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC096', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC097', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC098', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC099', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC100', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC101', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC102', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC103', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC104', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC105', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC106', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC107', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC108', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC109', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('AC110', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC111', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC113', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC114', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC115', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC116', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC117', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC118', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC119', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC120', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC121', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC122', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC123', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC124', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC126', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC127', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC128', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC129', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC130', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC132', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC133', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC134', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC135', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC136', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC137', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC138', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC139', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC140', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC141', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC142', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC143', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC144', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC145', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC146', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC147', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC148', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC149', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC150', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC151', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC152', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC153', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC154', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC155', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC156', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC157', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC158', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC159', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC160', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC161', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC162', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC163', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC164', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC165', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC166', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC167', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC168', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC169', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 3: rows 161-240
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('AC170', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC171', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC172', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC173', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC174', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC175', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC176', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC177', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC178', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC179', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC180', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC181', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC182', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC183', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC184', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC185', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC186', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC187', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC188', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('AC189', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC190', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC191', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC192', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC193', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC194', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC195', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC196', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC197', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC198', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC199', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC200', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC201', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC202', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC203', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC204', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC205', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC206', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC207', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC208', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC209', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC210', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC211', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC212', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC213', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC214', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC215', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC216', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC217', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC218', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC219', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC220', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC221', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC222', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC223', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC224', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC225', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC226', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC227', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC228', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC229', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC230', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC231', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC232', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC233', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC234', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC235', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC236', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC237', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC238', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC239', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC240', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('AC241', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC242', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC243', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC244', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC245', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC246', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC247', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC248', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC249', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 4: rows 241-320
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('AC250', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC251', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC252', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC253', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC254', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC255', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC256', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC257', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC258', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC259', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC260', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC261', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC262', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC263', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC264', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC265', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC266', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC267', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC268', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC269', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('AC270', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('AC271', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC272', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC273', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC274', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC275', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC276', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC277', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC278', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC279', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC280', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC281', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC282', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC283', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC284', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC285', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC286', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC288', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC289', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC290', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC291', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC292', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('AC293', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC294', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('AC295', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('AC296', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AC297', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('AV006', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV007', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV008', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV009', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV010', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV011', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV012', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV013', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV014', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV015', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV016', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV017', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV018', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV019', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV020', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV022', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV023', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV025', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV026', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV027', 'quarterly', 90, 'MAY-03,APR-01,FEB-03', 3),
        ('AV028', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV029', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV030', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV031', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV032', 'quarterly', 90, 'MAY-03,APR-01,FEB-03', 3),
        ('AV033', 'quarterly', 90, 'MAY-03,APR-01,FEB-03', 3),
        ('AV034', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV035', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV036', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV037', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV039', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV040', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV041', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 5: rows 321-400
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('AV043', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV045', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV046', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV047', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV049', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV051', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV052', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV053', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV054', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV055', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV057', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV058', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV059', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV062', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV064', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV066', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV067', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV068', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV069', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV071', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('AV072', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('AV073', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('AV074', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('AV075', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('AV076', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('AV080', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV081', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV082', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV083', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV085', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV086', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV087', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV089', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV092', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV093', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV094', 'yearly', 365, 'MAR-03', 1),
        ('AV095', 'yearly', 365, 'MAR-03', 1),
        ('AV098', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV099', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('AV100', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('AV101', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV105', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV106', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV107', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV108', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV110', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV111', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV113', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV114', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV115', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV116', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV117', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('AV118', 'bi-monthly', 60, 'AUG-02,JUN-04,MAY-03,APR-01,FEB-03,JAN-02', 6),
        ('AV119', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV120', 'bi-monthly', 45, 'MAR-01-20,NOV-02,AUG-04,JULY-02,MAY-05,APR-03,MAR-01,JAN-04', 8),
        ('AV121', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV122', 'bi-monthly', 45, 'SEP-04,AUG-03,JULY-01,MAY-04,APR-02,FEB-04,JAN-03', 7),
        ('AV123', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('AV124', 'bi-monthly', 45, 'OCT-04,SEP-02,AUG-01,JUN-03,MAY-02,MAR-04,FEB-02,JAN-01', 8),
        ('EL01', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('EN 01', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 02', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 03', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('EN 04', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('EN 05', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('EN 06', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('EN 07', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('EN 08', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('EN 09', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 10', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 11', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 12', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 13', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 14', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 15', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('EN 16', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 17', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 18', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('EN 22', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('EN 23', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 6: rows 401-480
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('EN 24', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('EN 25', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('EN 26', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 27', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('EN 28', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('EN 29', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('EN 30', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 31', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 32', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 33', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 34', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 35', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('EN 36', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('EN 37', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 38', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 39', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 40', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 41', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('EN 42', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('EN 43', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('EN 44', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('EN 45', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 01', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 02', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 03', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 04', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 05', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 06', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 09', 'bi-monthly', 60, 'JULY-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 6),
        ('F&B 10', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 100', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 101', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 102', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 103', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 104', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 105', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 106', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 107', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 108', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 109', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 11', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 110', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 111', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 12', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 13', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 14', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 15', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 16', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 17', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 18', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 19', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 20', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 21', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 22', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 23', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 24', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 25', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 26', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 27', 'bi-monthly', 45, 'AUG-02,JULY-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 7),
        ('F&B 28', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 29', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 30', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 31', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 32', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 33', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 34', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 35', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 36', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 37', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 38', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 39', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 40', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 41', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 42', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 45', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 46', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 47', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 48', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 49', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 50', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 7: rows 481-560
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('F&B 51', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 52', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 53', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 54', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 55', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 58', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 59', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 60', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 61', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 62', 'bi-monthly', 45, 'JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 7),
        ('F&B 64', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 65', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 66', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 67', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 68', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 69', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 70', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 71', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 72', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 73', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 74', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 75', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 76', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 77', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 78', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 79', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 80', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 81', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('F&B 82', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 83', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('F&B 84', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 85', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 86', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 87', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('F&B 88', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 89', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 90', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 91', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 92', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 93', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 94', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 95', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 96', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 97', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 98', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('F&B 99', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('FS001', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('FS002', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('FS003', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('FS004', 'bi-monthly', 60, 'SEP-02,JULY-04,JULY-03,MAY-04,MAR-04,JAN-05', 6),
        ('FS005', 'bi-monthly', 60, 'SEP-02,JULY-04,JULY-03,MAY-04,MAR-04,JAN-05', 6),
        ('FS006', 'bi-monthly', 60, 'SEP-02,JULY-04,JULY-03,MAY-04,MAR-04,JAN-05', 6),
        ('FS007', 'bi-monthly', 60, 'SEP-02,JULY-04,JULY-03,MAY-04,MAR-04,JAN-05', 6),
        ('FS008', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('FS009', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('FS010', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('FS011', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('FS012', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('FS013', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('FS014', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('GR001', 'yearly', 365, 'JAN-01', 1),
        ('GR002', 'yearly', 365, 'JAN-02', 1),
        ('GR003', 'yearly', 365, 'JAN-03', 1),
        ('GR004', 'yearly', 365, 'JAN-04', 1),
        ('GR005', 'yearly', 365, 'JAN-01', 1),
        ('GR006', 'yearly', 365, 'JAN-02', 1),
        ('GR007', 'yearly', 365, 'JAN-03', 1),
        ('GR008', 'yearly', 365, 'JAN-04', 1),
        ('GR009', 'yearly', 365, 'JAN-01', 1),
        ('GR010', 'yearly', 365, 'JAN-02', 1),
        ('GR011', 'yearly', 365, 'JAN-03', 1),
        ('GR012', 'yearly', 365, 'JAN-04', 1),
        ('GR013', 'yearly', 365, 'JAN-05', 1),
        ('GR014', 'yearly', 365, 'FEB-01', 1),
        ('GR015', 'yearly', 365, 'FEB-02', 1),
        ('GR016', 'yearly', 365, 'FEB-03', 1),
        ('GR017', 'yearly', 365, 'JAN-05', 1),
        ('GR018', 'yearly', 365, 'FEB-01', 1),
        ('GR019', 'yearly', 365, 'FEB-02', 1),
        ('GR020', 'yearly', 365, 'FEB-03', 1)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 8: rows 561-640
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('GR021', 'yearly', 365, 'JAN-05', 1),
        ('GR022', 'yearly', 365, 'FEB-01', 1),
        ('GR023', 'yearly', 365, 'FEB-02', 1),
        ('GR024', 'yearly', 365, 'FEB-03', 1),
        ('GR025', 'yearly', 365, 'FEB-04', 1),
        ('GR026', 'bi-annual', 180, 'MAR-01-20,MAR-01', 2),
        ('GR027', 'yearly', 365, 'MAR-02', 1),
        ('GR028', 'yearly', 365, 'MAR-03', 1),
        ('GR029', 'yearly', 365, 'FEB-04', 1),
        ('GR030', 'bi-annual', 180, 'MAR-01-20,MAR-01', 2),
        ('GR031', 'yearly', 365, 'MAR-02', 1),
        ('GR032', 'yearly', 365, 'MAR-03', 1),
        ('GR033', 'yearly', 365, 'FEB-04', 1),
        ('GR034', 'bi-annual', 180, 'MAR-01-20,MAR-01', 2),
        ('GR035', 'yearly', 365, 'MAR-02', 1),
        ('GR036', 'yearly', 365, 'MAR-03', 1),
        ('GR037', 'yearly', 365, 'MAR-04', 1),
        ('GR038', 'yearly', 365, 'APR-01', 1),
        ('GR039', 'yearly', 365, 'APR-02', 1),
        ('GR040', 'yearly', 365, 'APR-03', 1),
        ('GR041', 'yearly', 365, 'MAR-04', 1),
        ('GR042', 'yearly', 365, 'APR-01', 1),
        ('GR043', 'yearly', 365, 'APR-02', 1),
        ('GR044', 'yearly', 365, 'APR-03', 1),
        ('GR045', 'yearly', 365, 'MAR-04', 1),
        ('GR046', 'yearly', 365, 'APR-01', 1),
        ('GR047', 'yearly', 365, 'APR-02', 1),
        ('GR048', 'yearly', 365, 'APR-03', 1),
        ('GR049', 'yearly', 365, 'APR-04', 1),
        ('GR050', 'yearly', 365, 'MAY-01', 1),
        ('GR051', 'yearly', 365, 'MAY-02', 1),
        ('GR052', 'yearly', 365, 'MAY-03', 1),
        ('GR053', 'yearly', 365, 'APR-04', 1),
        ('GR054', 'yearly', 365, 'MAY-01', 1),
        ('GR055', 'yearly', 365, 'MAY-02', 1),
        ('GR056', 'yearly', 365, 'MAY-03', 1),
        ('GR057', 'yearly', 365, 'APR-04', 1),
        ('GR058', 'yearly', 365, 'MAY-01', 1),
        ('GR059', 'yearly', 365, 'MAY-02', 1),
        ('GR060', 'yearly', 365, 'MAY-03', 1),
        ('GR061', 'yearly', 365, 'MAY-04', 1),
        ('GR062', 'yearly', 365, 'MAY-05', 1),
        ('GR063', 'yearly', 365, 'JUN-01', 1),
        ('GR064', 'yearly', 365, 'JUN-02', 1),
        ('GR065', 'yearly', 365, 'MAY-04', 1),
        ('GR066', 'yearly', 365, 'MAY-05', 1),
        ('GR067', 'yearly', 365, 'JUN-01', 1),
        ('GR068', 'yearly', 365, 'JUN-02', 1),
        ('GR069', 'yearly', 365, 'MAY-04', 1),
        ('GR070', 'yearly', 365, 'MAY-05', 1),
        ('GR071', 'yearly', 365, 'JUN-01', 1),
        ('GR072', 'yearly', 365, 'JUN-02', 1),
        ('GR073', 'yearly', 365, 'JUN-03', 1),
        ('GR074', 'yearly', 365, 'JUN-04', 1),
        ('GR075', 'yearly', 365, 'JULY-01', 1),
        ('GR076', 'yearly', 365, 'JULY-02', 1),
        ('GR077', 'yearly', 365, 'JUN-03', 1),
        ('GR078', 'yearly', 365, 'JUN-04', 1),
        ('GR079', 'yearly', 365, 'JULY-01', 1),
        ('GR080', 'yearly', 365, 'JULY-02', 1),
        ('GR081', 'yearly', 365, 'JUN-03', 1),
        ('GR082', 'yearly', 365, 'JUN-04', 1),
        ('GR083', 'yearly', 365, 'JULY-01', 1),
        ('GR084', 'yearly', 365, 'JULY-02', 1),
        ('GR085', 'yearly', 365, 'JULY-03', 1),
        ('GR086', 'yearly', 365, 'JULY-04', 1),
        ('GR087', 'yearly', 365, 'AUG-01', 1),
        ('GR088', 'yearly', 365, 'AUG-02', 1),
        ('GR089', 'yearly', 365, 'JULY-03', 1),
        ('GR090', 'yearly', 365, 'JULY-04', 1),
        ('GR091', 'yearly', 365, 'AUG-01', 1),
        ('GR092', 'yearly', 365, 'AUG-02', 1),
        ('GR093', 'yearly', 365, 'JULY-03', 1),
        ('GR094', 'yearly', 365, 'JULY-04', 1),
        ('GR095', 'yearly', 365, 'AUG-01', 1),
        ('GR096', 'yearly', 365, 'AUG-02', 1),
        ('GR097', 'yearly', 365, 'AUG-03', 1),
        ('GR098', 'yearly', 365, 'AUG-04', 1),
        ('GR099', 'yearly', 365, 'AUG-05', 1),
        ('GR100', 'yearly', 365, 'SEP-01', 1)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 9: rows 641-720
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('GR101', 'yearly', 365, 'AUG-03', 1),
        ('GR102', 'yearly', 365, 'AUG-04', 1),
        ('GR103', 'yearly', 365, 'AUG-05', 1),
        ('GR104', 'yearly', 365, 'SEP-01', 1),
        ('GR105', 'yearly', 365, 'AUG-03', 1),
        ('GR106', 'yearly', 365, 'AUG-04', 1),
        ('GR107', 'yearly', 365, 'AUG-05', 1),
        ('GR108', 'yearly', 365, 'SEP-01', 1),
        ('GR109', 'yearly', 365, 'SEP-02', 1),
        ('GR111', 'yearly', 365, 'SEP-04', 1),
        ('GR113', 'yearly', 365, 'SEP-02', 1),
        ('GR115', 'yearly', 365, 'SEP-04', 1),
        ('GR117', 'yearly', 365, 'SEP-02', 1),
        ('GR119', 'yearly', 365, 'SEP-04', 1),
        ('GR121', 'yearly', 365, 'OCT-02', 1),
        ('GR123', 'yearly', 365, 'OCT-04', 1),
        ('GR125', 'yearly', 365, 'OCT-02', 1),
        ('GR127', 'yearly', 365, 'OCT-04', 1),
        ('GR129', 'yearly', 365, 'OCT-02', 1),
        ('GR131', 'yearly', 365, 'OCT-04', 1),
        ('GR134', 'yearly', 365, 'NOV-02', 1),
        ('GR136', 'yearly', 365, 'NOV-04', 1),
        ('GR138', 'yearly', 365, 'NOV-02', 1),
        ('GR140', 'yearly', 365, 'NOV-04', 1),
        ('GR142', 'yearly', 365, 'NOV-02', 1),
        ('GR144', 'yearly', 365, 'NOV-04', 1),
        ('HK003', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('HK004', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('HK005', 'bi-monthly', 45, 'JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01', 7),
        ('HK008', 'bi-monthly', 45, 'JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05', 7),
        ('HK009', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('HK010', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('HK011', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,FEB-01,JAN-02', 10),
        ('HK012', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,FEB-01,JAN-02', 10),
        ('HK013', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('HK014', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('HK015', 'bi-monthly', 45, 'JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 7),
        ('HK016', 'bi-monthly', 45, 'JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 7),
        ('HK017', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('HK018', 'bi-monthly', 45, 'JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05', 7),
        ('HK019', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('HK020', 'bi-monthly', 45, 'JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01', 7),
        ('HK021', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('HK022', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('HK023', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('HK024', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('HW001', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('HW002', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('HW003', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('HW004', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('HW005', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('HW006', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('HW007', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('HW008', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('HW009', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('HW010', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('HW011', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('HW012', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('HW013', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('HW014', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('HW015', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW016', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW017', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW018', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW019', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW020', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW021', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('HW022', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW023', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW024', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW025', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW026', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW027', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('HW028', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW029', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW030', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW031', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW032', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW033', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW034', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 10: rows 721-800
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('HW035', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('HW036', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('HW037', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('HW038', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('HW039', 'quarterly', 90, 'JUN-01,APR-02,FEB-02', 3),
        ('HW040', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('HW041', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('HW042', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT001', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT002', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT003', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT004', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT005', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT006', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT007', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT008', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT009', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT010', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT011', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT012', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT013', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT014', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT015', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT016', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT017', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT018', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT019', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT020', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT021', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT022', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT023', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT024', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT025', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT026', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT027', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT028', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT029', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT030', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT031', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT033', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT034', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT035', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT036', 'bi-annual', 180, 'APR-04,FEB-04', 2),
        ('KT037', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT038', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT039', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT040', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT041', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT042', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT044', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT045', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT046', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT048', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT049', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT050', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT051', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT052', 'bi-monthly', 60, 'AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 5),
        ('KT053', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT054', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT055', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT056', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT057', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT058', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT059', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT060', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT061', 'bi-monthly', 60, 'OCT-04,JULY-01,MAY-02,MAR-02,JAN-03', 5),
        ('KT063', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT064', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT065', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT066', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT067', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT068', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT069', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT070', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT071', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT075', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT076', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT077', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT081', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT082', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 11: rows 801-880
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('KT083', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT085', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT086', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT087', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT088', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT089', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT090', 'bi-monthly', 60, 'AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 5),
        ('KT091', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT092', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT093', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT094', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT095', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT096', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT097', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT098', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT099', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT100', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT101', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT102', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT105', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT106', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT107', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT108', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT109', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT110', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT111', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT114', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT115', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT117', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT118', 'bi-annual', 180, 'APR-04,FEB-04', 2),
        ('KT119', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT120', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT121', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT122', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT123', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT125', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT126', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT127', 'quarterly', 90, 'JUN-01,APR-02,FEB-02', 3),
        ('KT128', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT129', 'quarterly', 90, 'JUN-01,APR-02,FEB-02', 3),
        ('KT130', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT131', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT132', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT133', 'quarterly', 90, 'JUN-04,MAY-01,MAR-01', 3),
        ('KT134', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT135', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT137', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT138', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT139', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT140', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT141', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT144', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT145', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT146', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT147', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT149', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT150', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT151', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT152', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT153', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT154', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT155', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT156', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT157', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT158', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT159', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT160', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT161', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT162', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT163', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT165', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT166', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT168', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT169', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('KT171', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT172', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT173', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT174', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT175', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT176', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 12: rows 881-960
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('KT177', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT178', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT180', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT181', 'bi-monthly', 60, 'MAR-01-20,JUN-04,MAY-01,MAR-01,JAN-02', 5),
        ('KT182', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT183', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT184', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT185', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT186', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT187', 'quarterly', 90, 'JULY-02,MAY-03,MAR-03,JAN-04', 4),
        ('KT188', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT189', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT190', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT191', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT192', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT193', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT194', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT195', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT196', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT197', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT198', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT199', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT200', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT201', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT202', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT203', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT204', 'quarterly', 90, 'JUN-04,MAY-01,MAR-01,JAN-02', 4),
        ('KT205', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT206', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT207', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT208', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT209', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT210', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT211', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT212', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT213', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT214', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT215', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT216', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT217', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT218', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT219', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT220', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT221', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT222', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT223', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT224', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('KT225', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT226', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT227', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT228', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT229', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('KT230', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('KT231', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT232', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT233', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT234', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT235', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT236', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT237', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT238', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT239', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT240', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT241', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT242', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT243', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT244', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT245', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT246', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT247', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT248', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT249', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT250', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT251', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT252', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT253', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT254', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT255', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT256', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT257', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 13: rows 961-1040
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('KT258', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT259', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT260', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT261', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT262', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT263', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('KT264', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT265', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT266', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT267', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('KT268', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT269', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('KT270', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PA001', 'yearly', 365, 'JAN-01', 1),
        ('PA002', 'yearly', 365, 'JAN-02', 1),
        ('PA003', 'yearly', 365, 'JAN-03', 1),
        ('PA004', 'yearly', 365, 'JAN-04', 1),
        ('PA005', 'yearly', 365, 'JAN-05', 1),
        ('PA006', 'yearly', 365, 'FEB-01', 1),
        ('PA007', 'yearly', 365, 'FEB-02', 1),
        ('PA008', 'yearly', 365, 'FEB-03', 1),
        ('PA009', 'yearly', 365, 'FEB-04', 1),
        ('PA010', 'bi-annual', 180, 'MAR-01-20,MAR-01', 2),
        ('PA011', 'yearly', 365, 'MAR-02', 1),
        ('PA012', 'yearly', 365, 'MAR-03', 1),
        ('PA013', 'yearly', 365, 'MAR-04', 1),
        ('PA014', 'yearly', 365, 'APR-01', 1),
        ('PA015', 'yearly', 365, 'APR-02', 1),
        ('PA016', 'yearly', 365, 'APR-03', 1),
        ('PA017', 'yearly', 365, 'APR-04', 1),
        ('PA018', 'yearly', 365, 'MAY-01', 1),
        ('PA019', 'yearly', 365, 'MAY-02', 1),
        ('PA020', 'yearly', 365, 'MAY-03', 1),
        ('PA021', 'yearly', 365, 'MAY-04', 1),
        ('PA022', 'yearly', 365, 'MAY-05', 1),
        ('PA023', 'yearly', 365, 'JUN-01', 1),
        ('PA024', 'yearly', 365, 'JUN-02', 1),
        ('PA025', 'yearly', 365, 'JUN-03', 1),
        ('PA026', 'yearly', 365, 'JUN-04', 1),
        ('PA027', 'yearly', 365, 'JULY-01', 1),
        ('PA028', 'yearly', 365, 'JULY-02', 1),
        ('PA029', 'yearly', 365, 'JULY-03', 1),
        ('PA030', 'yearly', 365, 'JULY-04', 1),
        ('PA031', 'yearly', 365, 'AUG-01', 1),
        ('PA032', 'yearly', 365, 'AUG-02', 1),
        ('PA033', 'yearly', 365, 'AUG-03', 1),
        ('PA034', 'yearly', 365, 'AUG-04', 1),
        ('PA035', 'yearly', 365, 'AUG-05', 1),
        ('PA036', 'yearly', 365, 'SEP-01', 1),
        ('PA037', 'yearly', 365, 'SEP-02', 1),
        ('PA039', 'yearly', 365, 'SEP-04', 1),
        ('PA041', 'yearly', 365, 'OCT-02', 1),
        ('PA043', 'yearly', 365, 'OCT-04', 1),
        ('PA046', 'yearly', 365, 'NOV-02', 1),
        ('PA048', 'yearly', 365, 'NOV-04', 1),
        ('PG001', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG002', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG003', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG004', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG005', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG006', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG007', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('PG008', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG009', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG010', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG011', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG012', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG013', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('PG014', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG015', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG016', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG017', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG018', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG019', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG020', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('PG021', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('PG022', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('PG023', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('PG024', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('PG025', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 14: rows 1041-1120
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('PG026', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('PG027', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG028', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG029', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG030', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG031', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG032', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG033', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,APR-01,JAN-05', 5),
        ('PG034', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG035', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG036', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG037', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG038', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG039', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-02,FEB-01', 5),
        ('PG040', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG041', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG042', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG043', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG044', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG045', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG046', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-03,FEB-02', 5),
        ('PG047', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('PG048', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('PG049', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('PG050', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('PG051', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('PG052', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-04,FEB-03', 5),
        ('RF001', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF002', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF003', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF004', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF005', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF006', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF007', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF008', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF009', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF010', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF011', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF012', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF013', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('RF014', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF015', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF016', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF017', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF018', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF019', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF020', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF021', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF022', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF023', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF024', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF025', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('RF026', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF027', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF028', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF029', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF030', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF031', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF032', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF033', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF034', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF035', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF036', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF037', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF038', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('RF039', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF040', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF041', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF042', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF043', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF044', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF045', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF046', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF047', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF048', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF049', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF050', 'quarterly', 90, 'JULY-02,APR-03,JAN-04', 3),
        ('RF051', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF052', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF053', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 15: rows 1121-1200
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('RF054', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF055', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF056', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF057', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF058', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF059', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF060', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF061', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF062', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF063', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('RF064', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF065', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF066', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF067', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF068', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF069', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF070', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF071', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF072', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF073', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF074', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF075', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF076', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('RF077', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF078', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF079', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF080', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF081', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF082', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF083', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF084', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF085', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF086', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF087', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF088', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF089', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('RF090', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF091', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF092', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF093', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF094', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF095', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF096', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF097', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF098', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF099', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF100', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF101', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF102', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('RF103', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF104', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF105', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF106', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF107', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF108', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF109', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF110', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF111', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF112', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF113', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF114', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF115', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('RF116', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF117', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF118', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF119', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF120', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF121', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF122', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF123', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF124', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF125', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF126', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF127', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF128', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('RF129', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF130', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF131', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF132', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF133', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 16: rows 1201-1280
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('RF134', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF135', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF136', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF137', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF138', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF139', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF140', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF141', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('RF142', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF143', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF144', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF145', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF146', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF147', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF148', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF149', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF150', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF151', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF152', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF153', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF154', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('RF159', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('RF160', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF161', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF162', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF163', 'quarterly', 90, 'MAY-02,MAR-02,JAN-03', 3),
        ('RF164', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('RF165', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF167', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('RF168', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('RF169', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF170', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('RF171', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF174', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('RF175', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('RF176', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('RF177', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('RF178', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('RF179', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('RF180', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('RF183', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF184', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF185', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('RF186', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('RF187', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('RF188', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('RF189', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF190', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF193', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('RF194', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('RF195', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('RF196', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('RF197', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('RF198', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('RF199', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('RF200', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('RF201', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('RF202', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('RF203', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF204', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF205', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('RF206', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF207', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF208', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF209', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF210', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF211', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('RF212', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('RF213', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('SP001', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('SP002', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('SP003', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('SP004', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('SP005', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('SP006', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('SP007', 'bi-monthly', 60, 'OCT-04,AUG-05,JULY-01,MAY-02,MAR-02,JAN-03', 6),
        ('SP008', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('SP009', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('SP010', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('SP011', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 17: rows 1281-1360
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('SP012', 'bi-monthly', 60, 'SEP-02,JULY-03,MAY-04,MAR-04,JAN-05', 5),
        ('SP013', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('SP014', 'bi-monthly', 60, 'NOV-02,JULY-04,MAY-05,APR-01,FEB-01', 5),
        ('SP015', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('SP016', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('SP017', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('SP018', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('SP019', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('SP020', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('SP021', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('SP022', 'bi-monthly', 60, 'SEP-04,AUG-01,JUN-01,APR-02,FEB-02', 5),
        ('SP023', 'bi-monthly', 60, 'NOV-04,AUG-02,JUN-02,APR-03,FEB-03', 5),
        ('ST001', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('ST002', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('ST003', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('ST004', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('ST005', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST006', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST007', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST008', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST009', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST010', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST011', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST012', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST013', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST014', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST015', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST016', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST017', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST018', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST019', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST020', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST021', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST022', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST023', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST024', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST025', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST026', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST027', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST028', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('ST029', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('ST030', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('ST031', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('ST032', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('TP001', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP002', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP003', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP004', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP005', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP006', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP007', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP008', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP009', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP010', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP011', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP012', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP013', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP014', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP015', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP016', 'bi-monthly', 60, 'MAR-01-20,AUG-04,JUN-04,MAY-01,MAR-01,JAN-02', 6),
        ('TP017', 'bi-annual', 180, 'MAY-01,MAR-01', 2),
        ('TP019', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('TP020', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('TP029', 'quarterly', 90, 'JUN-03,APR-04,FEB-04', 3),
        ('TP030', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('TP031', 'bi-monthly', 60, 'OCT-02,AUG-03,JUN-03,APR-04,FEB-04,JAN-01', 6),
        ('TP032', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('TP033', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('TP034', 'bi-monthly', 60, 'SEP-01,JULY-02,MAY-03,MAR-03,JAN-04', 5),
        ('VE001', 'quarterly', 90, 'SEP-02,JUN-03,MAR-04,JAN-01', 4),
        ('VE002', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('VE003', 'quarterly', 90, 'OCT-02,JULY-03,APR-04,JAN-05', 4),
        ('VE004', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('VE005', 'quarterly', 90, 'AUG-03,MAY-04,FEB-04', 3),
        ('VE006', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('VE007', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('VE008', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('VE009', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE010', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE011', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

    -- Batch 18: rows 1361-1431
    INSERT INTO maintenance_schedules
        (hotel_id, equipment_id, frequency, interval_days, week_labels, occurrence_count, is_active)
    SELECT
        v_hotel_id,
        e.id,
        v.frequency,
        v.interval_days,
        v.week_labels,
        v.occurrence_count,
        TRUE
    FROM (VALUES
        ('VE012', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE013', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('VE014', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('VE017', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE019', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE021', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE022', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE023', 'quarterly', 90, 'MAY-03,FEB-03,FEB-02', 3),
        ('VE024', 'bi-annual', 180, 'MAY-03,FEB-03', 2),
        ('VE025', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('VE027', 'quarterly', 90, 'JULY-04,MAY-01,FEB-01', 3),
        ('VE028', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE032', 'quarterly', 90, 'JUN-04,APR-01,JAN-02', 3),
        ('VE033', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE034', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE035', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE036', 'bi-monthly', 60, 'MAR-01-20,NOV-02,AUG-04,MAY-05,MAR-01', 5),
        ('VE037', 'quarterly', 90, 'AUG-05,JUN-01,MAR-02', 3),
        ('VE038', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE041', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE042', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE043', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE044', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE045', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE046', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE047', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE048', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE049', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE050', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE051', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE052', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE053', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE054', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('VE055', 'quarterly', 90, 'SEP-04,JULY-01,APR-02,JAN-03', 4),
        ('VE057', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE058', 'quarterly', 90, 'OCT-04,AUG-01,MAY-02,FEB-02', 4),
        ('VE059', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE060', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VE061', 'quarterly', 90, 'AUG-02,MAY-03,FEB-03', 3),
        ('VE062', 'quarterly', 90, 'NOV-04,SEP-01,JUN-02,MAR-03', 4),
        ('VH001', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('VH002', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT001', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT002', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT003', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT004', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT005', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT006', 'monthly', 30, 'OCT-02,SEP-02,AUG-03,JULY-03,JUN-03,MAY-04,APR-04,MAR-04,FEB-04,JAN-05,JAN-01', 11),
        ('WT007', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT008', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT009', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT010', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT011', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT012', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT013', 'monthly', 30, 'NOV-04,SEP-01,AUG-02,JULY-02,JUN-02,MAY-03,APR-03,MAR-03,FEB-03,JAN-04', 10),
        ('WT014', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT015', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT016', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT017', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT018', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT019', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT020', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT021', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT022', 'monthly', 30, 'OCT-04,SEP-04,AUG-05,AUG-01,JULY-01,JUN-01,MAY-02,APR-02,MAR-02,FEB-02,JAN-03', 11),
        ('WT023', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT024', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT025', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT026', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT027', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT028', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11),
        ('WT029', 'monthly', 30, 'MAR-01-20,NOV-02,AUG-04,JULY-04,JUN-04,MAY-05,MAY-01,APR-01,MAR-01,FEB-01,JAN-02', 11)
    ) AS v(equipment_no, frequency, interval_days, week_labels, occurrence_count)
    JOIN equipment e ON e.equipment_no = v.equipment_no
    WHERE NOT EXISTS (SELECT 1 FROM maintenance_schedules ms WHERE ms.equipment_id = e.id AND ms.frequency = v.frequency);

END \$\$;
`;
