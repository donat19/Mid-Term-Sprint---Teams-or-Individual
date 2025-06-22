-- Sample data for Conference Management System

-- Insert Conferences
INSERT INTO conferences (name, description, start_date, end_date, location, max_attendees) VALUES
('Tech Conference 2025', 'Annual technology conference featuring latest innovations', '2025-07-15', '2025-07-17', 'Convention Center Downtown', 500),
('Data Science Summit', 'Leading conference for data scientists and analysts', '2025-08-10', '2025-08-12', 'University Campus', 300),
('Web Development Workshop', 'Hands-on workshop for web developers', '2025-09-05', '2025-09-06', 'Tech Hub Building', 150);

-- Insert Speakers
INSERT INTO speakers (first_name, last_name, email, bio, company, title) VALUES
('John', 'Smith', 'john.smith@techcorp.com', 'Senior Software Engineer with 10+ years experience in full-stack development', 'TechCorp Inc.', 'Senior Software Engineer'),
('Sarah', 'Johnson', 'sarah.j@dataanalytics.com', 'Data Science expert specializing in machine learning and AI', 'Data Analytics Solutions', 'Lead Data Scientist'),
('Michael', 'Brown', 'michael.brown@webdev.io', 'Frontend specialist and UI/UX designer', 'WebDev Solutions', 'Frontend Architect'),
('Emily', 'Davis', 'emily.davis@cloudtech.com', 'Cloud infrastructure and DevOps specialist', 'CloudTech Systems', 'DevOps Engineer'),
('Robert', 'Wilson', 'robert.wilson@airesearch.org', 'AI researcher and machine learning engineer', 'AI Research Institute', 'Research Director');

-- Insert Sessions
INSERT INTO sessions (conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity) VALUES
-- Tech Conference 2025 sessions
(1, 1, 'Modern JavaScript Frameworks', 'Overview of React, Vue, and Angular in 2025', '2025-07-15', '09:00', '10:30', 'Room A', 100),
(1, 3, 'UI/UX Best Practices', 'Creating user-friendly interfaces', '2025-07-15', '11:00', '12:30', 'Room B', 80),
(1, 4, 'Cloud Native Applications', 'Building scalable apps in the cloud', '2025-07-16', '14:00', '15:30', 'Room A', 120),
-- Data Science Summit sessions
(2, 2, 'Machine Learning Fundamentals', 'Introduction to ML algorithms and applications', '2025-08-10', '09:00', '10:30', 'Auditorium', 150),
(2, 5, 'AI Ethics and Responsibility', 'Ethical considerations in AI development', '2025-08-11', '11:00', '12:30', 'Room C', 100),
-- Web Development Workshop sessions
(3, 1, 'Full-Stack Development with Node.js', 'Building complete web applications', '2025-09-05', '09:00', '12:00', 'Lab 1', 50),
(3, 3, 'Responsive Web Design', 'Mobile-first design principles', '2025-09-05', '14:00', '17:00', 'Lab 2', 40);

-- Insert Attendees
INSERT INTO attendees (first_name, last_name, email, phone, company) VALUES
('Alice', 'Anderson', 'alice.anderson@email.com', '555-0101', 'StartupTech'),
('Bob', 'Baker', 'bob.baker@email.com', '555-0102', 'Innovation Labs'),
('Carol', 'Carter', 'carol.carter@email.com', '555-0103', 'Digital Solutions'),
('David', 'Davis', 'david.davis@email.com', '555-0104', 'Tech Enterprises'),
('Eva', 'Evans', 'eva.evans@email.com', '555-0105', 'Future Systems'),
('Frank', 'Fisher', 'frank.fisher@email.com', '555-0106', 'Code Masters'),
('Grace', 'Green', 'grace.green@email.com', '555-0107', 'Web Innovators'),
('Henry', 'Harris', 'henry.harris@email.com', '555-0108', 'Data Dynamics'),
('Iris', 'Jackson', 'iris.jackson@email.com', '555-0109', 'AI Solutions'),
('Jack', 'Jones', 'jack.jones@email.com', '555-0110', 'Cloud Systems');

-- Insert Conference Registrations
INSERT INTO conference_registrations (conference_id, attendee_id, status) VALUES
(1, 1, 'registered'),
(1, 2, 'registered'),
(1, 3, 'confirmed'),
(1, 4, 'registered'),
(2, 5, 'confirmed'),
(2, 6, 'registered'),
(2, 7, 'confirmed'),
(2, 8, 'registered'),
(3, 9, 'confirmed'),
(3, 10, 'registered'),
(3, 1, 'registered'),
(3, 3, 'confirmed');

-- Insert Session Attendance
INSERT INTO session_attendance (session_id, attendee_id, attended) VALUES
-- Tech Conference attendees
(1, 1, TRUE),
(1, 2, FALSE),
(1, 3, TRUE),
(2, 1, TRUE),
(2, 3, TRUE),
(3, 2, FALSE),
(3, 4, TRUE),
-- Data Science Summit attendees
(4, 5, TRUE),
(4, 6, TRUE),
(4, 7, FALSE),
(5, 5, TRUE),
(5, 8, TRUE),
-- Web Development Workshop attendees
(6, 9, TRUE),
(6, 10, FALSE),
(6, 1, TRUE),
(7, 9, TRUE),
(7, 3, TRUE);