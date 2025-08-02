-- Test User Creation Script
-- Use this script to create test users for development purposes only
-- The password for the test user is 'Test1234!' (hashed with password_hash in PHP)

-- Add test user 
INSERT INTO users (first_name, last_name, email, password, role, status, email_verified)
VALUES (
    'Test', 
    'User', 
    'test@example.com',
    '$2y$10$Nar7dF6HfGXmGDX9yN3Zau.CFcQOZZP2nXRwQH4K4iprRjCCGPyx.',  -- Hashed password for 'Test1234!'
    'user',
    'active',
    1
)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    password = VALUES(password),
    status = VALUES(status),
    email_verified = VALUES(email_verified);

-- Add test admin user
INSERT INTO users (first_name, last_name, email, password, role, status, email_verified)
VALUES (
    'Admin', 
    'User', 
    'admin@example.com',
    '$2y$10$Nar7dF6HfGXmGDX9yN3Zau.CFcQOZZP2nXRwQH4K4iprRjCCGPyx.',  -- Hashed password for 'Test1234!'
    'admin',
    'active',
    1
)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    password = VALUES(password),
    status = VALUES(status),
    email_verified = VALUES(email_verified);

-- Add test instructor
INSERT INTO users (first_name, last_name, email, password, role, status, email_verified)
VALUES (
    'Test', 
    'Instructor', 
    'instructor@example.com',
    '$2y$10$Nar7dF6HfGXmGDX9yN3Zau.CFcQOZZP2nXRwQH4K4iprRjCCGPyx.',  -- Hashed password for 'Test1234!'
    'instructor',
    'active',
    1
)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    password = VALUES(password),
    status = VALUES(status),
    email_verified = VALUES(email_verified);

-- Add profile data for test user
INSERT INTO user_profiles (user_id, bio, phone, country)
SELECT id, 'This is a test user account for development purposes.', '+1234567890', 'Test Country'
FROM users WHERE email = 'test@example.com'
ON DUPLICATE KEY UPDATE
    bio = VALUES(bio),
    phone = VALUES(phone),
    country = VALUES(country);

-- Add sample courses (if instructor exists)
INSERT INTO courses (title, description, price, discount_price, category, duration, level, instructor_id, status)
SELECT 
    'Introduction to Web Development',
    'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    99.99,
    79.99,
    'web-development',
    '10 hours',
    'beginner',
    id,
    'published'
FROM users 
WHERE email = 'instructor@example.com'
LIMIT 1;

INSERT INTO courses (title, description, price, discount_price, category, duration, level, instructor_id, status)
SELECT 
    'Advanced React Techniques',
    'Master advanced React patterns, hooks, and state management.',
    149.99,
    129.99,
    'react',
    '15 hours',
    'advanced',
    id,
    'published'
FROM users 
WHERE email = 'instructor@example.com'
LIMIT 1;

-- Add a sample course to the test user's cart
INSERT INTO user_cart (user_id, course_id)
SELECT u.id, c.id
FROM users u, courses c
WHERE u.email = 'test@example.com' AND c.title = 'Introduction to Web Development'
LIMIT 1;

-- Add a completed purchase for the test user
INSERT INTO user_purchases (user_id, course_id, purchase_price, transaction_id)
SELECT u.id, c.id, c.discount_price, CONCAT('TEST-TRX-', FLOOR(RAND() * 1000000))
FROM users u, courses c
WHERE u.email = 'test@example.com' AND c.title = 'Advanced React Techniques'
LIMIT 1;

-- Add course progress for the purchased course
INSERT INTO user_course_progress (user_id, course_id, progress_percentage)
SELECT u.id, c.id, 35
FROM users u, courses c
WHERE u.email = 'test@example.com' AND c.title = 'Advanced React Techniques'
LIMIT 1;

-- Output test credentials for reference
SELECT 'TEST USER CREDENTIALS' as 'INFO';
SELECT 'Email: test@example.com' as 'Login Details';
SELECT 'Password: Test1234!' as 'Login Details';
SELECT 'Admin Email: admin@example.com' as 'Admin Login';
SELECT 'Admin Password: Test1234!' as 'Admin Login';
