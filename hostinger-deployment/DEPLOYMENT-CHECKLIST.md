# 🚀 Hostinger Deployment Checklist

## Pre-Deployment
- [ ] Build completed successfully (`npm run build`)
- [ ] All files copied to `hostinger-deployment` folder
- [ ] Database credentials ready
- [ ] Email credentials ready
- [ ] Domain/subdomain configured

## Database Setup
- [ ] MySQL database created in Hostinger
- [ ] Database user and password noted
- [ ] SQL schema imported (`database-setup.sql`)
- [ ] Test connection via phpMyAdmin

## File Upload
- [ ] All `public_html/` contents uploaded to domain root
- [ ] `.htaccess` file uploaded (check hidden files)
- [ ] File permissions set correctly (755 for directories, 644 for files)
- [ ] `contact.php` uploaded and configured

## Configuration
- [ ] Database credentials updated in `contact.php`
- [ ] Email settings configured in `contact.php`
- [ ] Domain-specific settings updated
- [ ] SSL certificate enabled (if available)

## Testing
- [ ] Website loads at your domain
- [ ] Navigation works correctly
- [ ] Contact form submits successfully
- [ ] Email notifications received
- [ ] Database records created
- [ ] Mobile responsiveness verified

## Security
- [ ] SSL enabled and redirects working
- [ ] Database credentials secured
- [ ] Email credentials secured
- [ ] File permissions checked
- [ ] Error reporting disabled in production

## Performance
- [ ] Gzip compression enabled
- [ ] Static file caching configured
- [ ] Image optimization checked
- [ ] Loading speed tested

## Final Checks
- [ ] All links working
- [ ] Contact form working
- [ ] Cross-browser testing done
- [ ] Mobile testing done
- [ ] SEO elements in place

---

## Quick Test Commands

After deployment, test these URLs:
- `https://yourdomain.com` - Main website
- `https://yourdomain.com/api/contact` - Contact form endpoint (should show method not allowed for GET)

## Emergency Rollback
If something goes wrong:
1. Backup current files before deployment
2. Keep previous working version
3. Document all changes made
4. Have Hostinger support contact ready

---

**Next Steps After Successful Deployment:**
1. Set up Google Analytics
2. Configure SEO tools
3. Set up monitoring
4. Plan regular backups
5. Update DNS if needed
