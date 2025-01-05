INSERT INTO "sabha" ("sabhaName", "district", "address", "sabhaMail", "contactNo")
VALUES 
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

INSERT INTO "employee" ("email", "address", "nic", "district", "sabhaId", "name", "password", "role", "departmentId")
VALUES
('john.doe@example.com', '123 Elm Street, Colombo', '123456789V', 'Colombo', 1, 'John Doe', 'password123', 'employee', 1),
('jane.doe@example.com', '456 Oak Avenue, Colombo', '987654321V', 'Colombo', 1, 'Jane Doe', 'password123', 'employee', 2),
('mary.jane@example.com', '789 Pine Street, Kandy', '111223344V', 'Kandy', 2, 'Mary Jane', 'password123', 'employee', 3),
('mark.smith@example.com', '101 Maple Road, Galle', '222334455V', 'Galle', 1, 'Mark Smith', 'password123', 'employee', 4),
('lucy.white@example.com', '202 Birch Street, Jaffna', '333445566V', 'Jaffna', 2, 'Lucy White', 'password123', 'employee', 5),
('susan.green@example.com', '303 Cedar Lane, Colombo', '444556677V', 'Colombo', 1, 'Susan Green', 'password123', 'employee', 1),
('michael.brown@example.com', '404 Cherry Avenue, Kandy', '555667788V', 'Kandy', 1, 'Michael Brown', 'password123', 'employee', 2),
('emily.jones@example.com', '505 Ash Road, Galle', '666778899V', 'Galle', 2, 'Emily Jones', 'password123', 'employee', 3),
('oliver.martin@example.com', '606 Palm Street, Jaffna', '777889900V', 'Jaffna', 2, 'Oliver Martin', 'password123', 'employee', 4),
('amelia.clark@example.com', '707 Willow Road, Colombo', '888990011V', 'Colombo', 1, 'Amelia Clark', 'password123', 'employee', 5);


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