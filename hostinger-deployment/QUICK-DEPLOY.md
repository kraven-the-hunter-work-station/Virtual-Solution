# 🚀 Quick Deployment Guide (Existing Database)

Since you already have a database, here's a streamlined deployment process:

## ✅ What You Have
- ✅ Existing database with schema
- ✅ Gmail SMTP configuration working
- ✅ Built application ready for deployment

## 🎯 Quick Setup Steps

### 1. Database Setup (5 minutes)
Since you have an existing database:

**Option A: Use your existing contact table**
- If you already have a contact/submissions table, update `contact.php` to match your table structure

**Option B: Add the contact_submissions table**
- Run the SQL from `database-setup.sql` in your Hostinger phpMyAdmin
- This will add only the contact form table without affecting existing data

### 2. Upload Files (10 minutes)
1. **Upload to Hostinger:**
   - Upload all contents of `public_html/` to your domain's public_html directory
   - Make sure `.htaccess` is uploaded

2. **Find Your Database Credentials:**
   - Upload `test-db-connection.php` to test different credential combinations
   - Visit `yourdomain.com/test-db-connection.php` to find working credentials
   - Or check Hostinger control panel → Databases → MySQL Databases

3. **Update Database Credentials in ALL PHP files:**
   - Edit `contact.php`, `signup.php`, `login.php` with the working credentials:
   ```php
   $host = 'localhost';                    // Usually 'localhost'
   $username = 'your_working_db_user';     // From test or control panel
   $password = 'your_working_db_password'; // From test or control panel
   $database = 'your_working_db_name';     // From test or control panel
   ```

### 3. Test Everything (5 minutes)
1. Visit your website: `https://yourdomain.com`
2. Test the contact form
3. Check if emails arrive at `mradvision.cop@gmail.com`
4. Verify data is saved in your database

## 🔧 Your Current Configuration

**Email Setup:** ✅ Ready (Gmail SMTP)
- From: noreply@adsvisionmarketing.com  
- To: mradvision.cop@gmail.com
- SMTP: Gmail (already configured)

**Database:** ✅ Existing
- PostgreSQL (development)
- MySQL (production/Hostinger)
- Schema already defined

## 📁 Files to Upload

**Required files in your `public_html/`:**
- `index.html` - Your React app
- `assets/` - CSS and JS files  
- `contact.php` - Contact form handler
- `signup.php` - User registration handler (NEW!)
- `login.php` - User authentication handler (NEW!)
- `test-db-connection.php` - Database credential tester (DELETE after use!)
- `.htaccess` - URL routing (handles /api/* calls)
- Favicon files

**❌ DO NOT upload the `server/` folder to Hostinger shared hosting**
- The server folder is for Node.js hosting only
- Hostinger shared hosting uses PHP instead
- All API endpoints are handled by PHP files

## 🛠️ Customization Options

### If you have a different contact table structure:
Update the `contact.php` file around line 45:
```php
$stmt = $pdo->prepare("
    INSERT INTO your_table_name 
    (your_column_names) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
");
```

### If you want to use a different email:
Update in `contact.php`:
```php
$to_email = 'your_preferred_email@domain.com';
```

## 🚀 You're Almost Done!

Since you have:
- ✅ Working database
- ✅ Working email configuration  
- ✅ Built application

You just need to:
1. Upload the files
2. Update database credentials in `contact.php`
3. Test the contact form

**Total deployment time: ~20 minutes**

---

Need help? Check the main README.md for detailed troubleshooting steps.
