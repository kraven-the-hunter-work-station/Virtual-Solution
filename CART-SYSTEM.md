# Cart and Course Purchase System

This document explains the cart and course purchase system implemented for Virtual Solutions Path.

## Overview

The system allows users to:
- Add courses to their shopping cart
- View items in their cart
- Complete purchases
- View their purchased courses
- Track course completion progress

## Database Structure

The following tables are used for the cart and course system:

### 1. Courses Table
Stores all available courses in the system.

```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2) NULL,
    thumbnail VARCHAR(255) NULL,
    instructor_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NULL,
    level ENUM('beginner', 'intermediate', 'advanced', 'all-levels') DEFAULT 'all-levels',
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
)
```

### 2. User Cart Table
Tracks courses that users have added to their cart.

```sql
CREATE TABLE user_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_course (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
)
```

### 3. User Purchases Table
Records completed purchases.

```sql
CREATE TABLE user_purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    purchase_price DECIMAL(10, 2) NOT NULL,
    transaction_id VARCHAR(100) NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_course_purchase (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
)
```

### 4. Course Progress Table
Tracks user progress through courses.

```sql
CREATE TABLE user_course_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    progress_percentage INT DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,
    UNIQUE KEY user_course_progress (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
)
```

## Components

The system includes the following React components:

1. **ProfileMenu** - Dropdown menu shown when a user is logged in, with cart count indicator
2. **CartPage** - Page to display and manage cart items
3. **MyCoursesPage** - Page to display purchased courses with progress
4. **AddToCartButton** - Button component to add courses to cart

## API Endpoints

All cart and purchase operations are handled by `auth-handler.php` with the following actions:

- `add_to_cart` - Add a course to the user's cart
- `remove_from_cart` - Remove a course from cart
- `get_cart` - Get all items in the user's cart
- `purchase` - Purchase all items in cart
- `get_purchases` - Get all user's purchased courses

## User Interface

The system includes:

1. A dropdown menu from the profile icon with:
   - User information
   - My Courses link
   - Cart link with item count indicator
   - Settings link
   - Sign out option

2. Dashboard with stats for:
   - Total courses owned
   - Courses in progress
   - Completed courses
   - Cart item count

## Implementation Notes

- The cart badge shows the current number of items in cart
- The dashboard tracks course completion progress
- All purchases are recorded with transaction IDs
- Course progress is automatically tracked as users navigate through course content

## Adding To Existing Pages

To add the cart functionality to course listings, use the AddToCartButton component:

```jsx
import AddToCartButton from '../components/AddToCartButton';

// In your course listing component:
<AddToCartButton 
  course={course} 
  userId={user?.id} 
  onSuccess={() => console.log('Added to cart!')} 
/>
```

To display the profile menu with cart indicator:

```jsx
import ProfileMenu from '../components/ProfileMenu';

// In your header/navbar component:
<ProfileMenu 
  user={user} 
  onSignOut={handleLogout} 
/>
```
