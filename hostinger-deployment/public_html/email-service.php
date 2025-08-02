<?php
// Email Configuration for Hostinger
// This file contains email settings and helper functions

class EmailService {
    private $from_email = 'noreply@adsvisionmarketing.com';
    private $from_name = 'AdsVision Marketing';
    private $reply_to = 'mradvision.cop@gmail.com';
    
    public function sendWelcomeEmail($to_email, $user_name) {
        $subject = "Welcome to AdsVision Marketing!";
        
        $message = $this->getWelcomeEmailTemplate($user_name);
        
        $headers = $this->getEmailHeaders();
        
        try {
            $sent = mail($to_email, $subject, $message, $headers);
            
            if ($sent) {
                error_log("Welcome email sent successfully to: " . $to_email);
                return true;
            } else {
                error_log("Failed to send welcome email to: " . $to_email);
                return false;
            }
            
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    private function getWelcomeEmailTemplate($user_name) {
        return "
        <html>
        <head>
            <title>Welcome to AdsVision Marketing</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;'>
                <!-- Header -->
                <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;'>
                    <h1 style='margin: 0; font-size: 28px; font-weight: bold;'>Welcome to AdsVision Marketing!</h1>
                    <p style='margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;'>Your Digital Marketing Journey Starts Here</p>
                </div>
                
                <!-- Main Content -->
                <div style='background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
                    <h2 style='color: #667eea; margin-top: 0; font-size: 24px;'>Hello " . htmlspecialchars($user_name) . "!</h2>
                    
                    <p style='font-size: 16px; margin-bottom: 20px;'>Thank you for joining AdsVision Marketing! We're thrilled to have you as part of our growing community of successful businesses.</p>
                    
                    <!-- Features Box -->
                    <div style='background: #f8f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;'>
                        <h3 style='color: #667eea; margin-top: 0; font-size: 20px;'>🚀 What's Next?</h3>
                        <ul style='padding-left: 20px; margin: 15px 0;'>
                            <li style='margin-bottom: 8px;'><strong>Explore our premium marketing services</strong> - Tailored solutions for your business</li>
                            <li style='margin-bottom: 8px;'><strong>Connect with our expert team</strong> - Get personalized consultation</li>
                            <li style='margin-bottom: 8px;'><strong>Start your digital transformation</strong> - Begin your growth journey today</li>
                        </ul>
                    </div>
                    
                    <!-- Services Preview -->
                    <div style='background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 25px 0;'>
                        <h3 style='color: #333; margin-top: 0; text-align: center;'>Our Premium Services</h3>
                        <div style='display: flex; justify-content: space-around; flex-wrap: wrap;'>
                            <div style='text-align: center; margin: 10px;'>
                                <div style='background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 10px;'>📱</div>
                                <p style='margin: 0; font-size: 14px; font-weight: bold;'>Digital Marketing</p>
                            </div>
                            <div style='text-align: center; margin: 10px;'>
                                <div style='background: #764ba2; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 10px;'>🎨</div>
                                <p style='margin: 0; font-size: 14px; font-weight: bold;'>Brand Design</p>
                            </div>
                            <div style='text-align: center; margin: 10px;'>
                                <div style='background: #667eea; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 10px;'>📊</div>
                                <p style='margin: 0; font-size: 14px; font-weight: bold;'>Analytics</p>
                            </div>
                        </div>
                    </div>
                    
                    <p style='font-size: 16px; margin: 20px 0;'>Need help getting started? Our team is here to assist you every step of the way.</p>
                    
                    <p style='font-size: 16px;'>📧 <strong>Contact us:</strong> <a href='mailto:mradvision.cop@gmail.com' style='color: #667eea; text-decoration: none;'>mradvision.cop@gmail.com</a></p>
                    
                    <!-- CTA Button -->
                    <div style='text-align: center; margin: 35px 0;'>
                        <a href='https://adsvisionmarketing.com' style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;'>Explore Our Services</a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style='text-align: center; padding: 25px 20px; color: #666; font-size: 14px; background: #f9f9f9; border-radius: 0 0 10px 10px;'>
                    <p style='margin: 0 0 10px 0; font-weight: bold;'>© 2025 AdsVision Marketing. All rights reserved.</p>
                    <p style='margin: 0; font-style: italic;'>Transforming businesses through innovative digital marketing solutions.</p>
                    
                    <div style='margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;'>
                        <p style='margin: 0; font-size: 12px; color: #999;'>
                            This email was sent because you created an account with AdsVision Marketing.<br>
                            If you did not create this account, please contact us immediately.
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function getEmailHeaders() {
        return implode("\r\n", [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $this->from_name . ' <' . $this->from_email . '>',
            'Reply-To: ' . $this->reply_to,
            'X-Mailer: PHP/' . phpversion(),
            'X-Priority: 3',
            'X-MSMail-Priority: Normal'
        ]);
    }
}
?>
