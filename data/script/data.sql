INSERT INTO "sabha" ("sabhaName", "district", "address", "sabhaMail", "contactNo")
VALUES 
('Sri Lanka Sabha', 'All Island', 'National Secretariat, Colombo', 'srilanka.sabha@example.com', '+94100000000'),
('Colombo Municipal Council', 'Colombo', '123 Main Street, Colombo', 'colombo.mc@example.com', '+94111234567'),
('Dehiwala - Mt. Lavinia Municipal Council', 'Colombo', '45 Beach Road, Dehiwala', 'dehiwala.mc@example.com', '+94112345678'),
('Sri Jayawardenepura Kotte Municipal Council', 'Colombo', '78 Parliament Road, Kotte', 'kotte.mc@example.com', '+94123456789'),
('Kaduwela Municipal Council', 'Colombo', '67 Temple Road, Kaduwela', 'kaduwela.mc@example.com', '+94134567890'),
('Moratuwa Municipal Council', 'Colombo', '89 Lakeside Road, Moratuwa', 'moratuwa.mc@example.com', '+94145678901'),
('Kollonnawa Urban Council', 'Colombo', '32 Hilltop Avenue, Kollonnawa', 'kollonnawa.uc@example.com', '+94156789012'),
('Seethawakapura Urban Council', 'Colombo', '56 Riverside Street, Seethawakapura', 'seethawakapura.uc@example.com', '+94167890123'),
('Maharagama Urban Council', 'Colombo', '21 Market Road, Maharagama', 'maharagama.uc@example.com', '+94178901234'),
('Kesbewa Urban Council', 'Colombo', '14 Garden Lane, Kesbewa', 'kesbewa.uc@example.com', '+94189012345'),
('Boralesgamuwa Urban Council', 'Colombo', '9 Lakeview Drive, Boralesgamuwa', 'boralesgamuwa.uc@example.com', '+94190123456'),
('Kotikawatta Mulleriyawa Pradeshiya Sabha', 'Colombo', '88 New Street, Kotikawatta', 'kotikawatta.ps@example.com', '+94201234567'),
('Seethawaka Pradeshiya Sabha', 'Colombo', '77 Old Town Road, Seethawaka', 'seethawaka.ps@example.com', '+94212345678'),
('Homagama Pradeshiya Sabha', 'Colombo', '100 Forest Lane, Homagama', 'homagama.ps@example.com', '+94223456789');


INSERT INTO department ("departmentName")
VALUES 
('Super Administration Division'),
('Administration Division'),
('Health Division'),
('Account Division'),
('Work and Plan Division'),
('Development Division');

-- employee
INSERT INTO "employee" ("email", "address", "nic", "district", "sabhaId", "name", "password", "role", "departmentId")
VALUES
('super@sl', 'No. 1, National Road, SL', '000000000V', 'SL', 1, 'Super Admin', '12345678', 'admin', 1);

INSERT INTO "employee" ("email", "address", "nic", "district", "sabhaId", "name", "password", "role", "departmentId")
VALUES
-- sabhaId = 2, district = Colombo
('admin@colombo', '123 Elm Street, Colombo', '123456789V', 'Colombo', 2, 'John Doe', '12345678', 'employee', 2),
('health@colombo', '456 Oak Avenue, Colombo', '987654321V', 'Colombo', 2, 'Jane Doe', '12345678', 'employee', 3),
('account@colombo', '789 Pine Street, Colombo', '111223344V', 'Colombo', 2, 'Mary Jane', '12345678', 'employee', 4),
('workplan@colombo', '101 Maple Road, Colombo', '222334455V', 'Colombo', 2, 'Mark Smith', '12345678', 'employee', 5),
('development@colombo', '202 Birch Street, Colombo', '333445566V', 'Colombo', 2, 'Lucy White', '12345678', 'employee', 6),

-- sabhaId = 3, district = Dehiwala
('admin@dehiwala', '303 Cedar Lane, Colombo', '444556677V', 'Colombo', 3, 'Susan Green', '12345678', 'employee', 2),
('health@dehiwala', '404 Cherry Avenue, Colombo', '555667788V', 'Colombo', 3, 'Michael Brown', '12345678', 'employee', 3),
('account@dehiwala', '505 Ash Road, Colombo', '666778899V', 'Colombo', 3, 'Emily Jones', '12345678', 'employee', 4),
('workplan@dehiwala', '606 Palm Street, Colombo', '777889900V', 'Colombo', 3, 'Oliver Martin', '12345678', 'employee', 5),
('development@dehiwala', '707 Willow Road, Colombo', '888990011V', 'Colombo', 3, 'Amelia Clark', '12345678', 'employee', 6);




INSERT INTO "complaintCategory" ("name", "departmentId")
VALUES
    ('Road hazards', 5),              -- Category 1
    ('Unsafe trees in roadside', 5),  -- Category 2
    ('Garbage disposal on roadside', 5), -- Category 3
    ('Mosquito breeding grounds', 5), -- Category 4
    ('Street lamp malfunction', 3),   -- Category 5
    ('Stray animals', 3),             -- Category 6
    ('Unauthorized constructions', 3), -- Category 7
    ('Damages to the street drains', 3), -- Category 8
    ('Issues related to public toilets', 4), -- Category 9
    ('Unauthorized street sellers', 4), -- Category 10
    ('Dangerous Walls or buildings', 5), -- Category 11
    ('Others', 2);                    -- Category 12

INSERT INTO public."reservationCategory" ("reservationCategoryId", "name", "departmentId") VALUES
(1, 'Playground Reservation', 4),
(2, 'Communityhall Reservation', 4),
(3, 'Advertisement Reservation', 4),
(4, 'Crematorium Reservation', 3),
(5, 'Gully Bowser Service Reservation', 3);

INSERT INTO public.ground ("sabhaId", name, area, terms, note, "pricePerDay", "isDeleted", "createdAt")
VALUES 
(1, 'Central Park Ground', 'Central Park', 'Open for community events', 'Reserved for weekends only', 500, false, NOW()),
(1, 'Riverside Sports Ground', 'Riverside Ground', 'Available for sports activities', 'Booking required in advance', 300, false, NOW());

INSERT INTO public."groundReservation" 
("userId", "event", description, "groundId", "reservationDate", payment, note, status, "createdAt", "updatedAt")
VALUES 
(1, 'Community Gathering', 'Annual community meetup', 1, '2025-01-20 10:00:00', 1000, 'Includes refreshments', 0, NOW(), NOW()),
(1, 'Sports Tournament', 'Local football championship', 1, '2025-01-25 14:00:00', 1500, 'Requires setup of goalposts', 0, NOW(), NOW()),
(1, 'Community Gathering', 'Annual community meetup', 1, '2025-01-24 10:00:00', 1000, 'Includes refreshments', 1, NOW(), NOW())
;