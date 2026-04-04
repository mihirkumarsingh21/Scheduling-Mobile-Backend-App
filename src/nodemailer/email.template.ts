export const REGISTRATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #fd9800ff, #fd9800ff); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome</h1>
  </div>
  <div style="background-color: #000; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>🎉 Your registration was successful! But before you can log in, please verify your email address.</p>

    <p>Thank you for registering! To complete your registration, please enter the following verification code on the verification page:</p>
    <div style="margin: 30px 0; font-size: 24px; font-weight: bold; color: #fff; letter-spacing: 3px;">
      {verificationCode}

    <div style="text-align: center; margin: 30px 0;">
      <a href="{verifyURL}" style="background-color: #333; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
    </div>
    <p>Once your email is verified, you’ll be able to log in and start using your account.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;



export const EMAIL_VERIFIED_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #ff9800, #e68900); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Email Verified 🎉</h1>
  </div>
  <div style="background-color: #fff7e6; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
    <p>Hello <strong>{username}</strong>,</p>
    <p>✅ Congratulations! Your email has been <strong>successfully verified</strong>.</p>
    <p>You can now log in to your account and enjoy full access to all features.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #ff9800; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login Now</a>
    </div>
    <p>If you face any issues while logging in, feel free to contact our support team.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const LOGIN_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Login Successful ✅</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>You have successfully logged into your account on <strong>{loginTime}</strong>.</p>
    <p>If this wasn’t you, please reset your password immediately to secure your account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #f44336; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Secure Account</a>
    </div>
    <p>We’re glad to have you back!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;



export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0; padding:0; background:#f6f6f6; font-family:Arial, sans-serif;">

  <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#ff7a18,#ffb347); padding:25px; text-align:center;">
      <h1 style="color:#fff; margin:0;">🔐 Reset Your Password</h1>
    </div>

    <!-- Content -->
    <div style="padding:30px; color:#333;">
      
      <p style="font-size:16px;">Hello <strong>{username}</strong>,</p>

      <p style="font-size:15px;">
        We received a request to reset your password. Click the button below to continue:
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="{resetURL}" 
           style="background:linear-gradient(135deg,#ff7a18,#ff512f); 
                  color:#fff; 
                  padding:14px 30px; 
                  border-radius:8px; 
                  text-decoration:none; 
                  font-weight:bold; 
                  font-size:16px;
                  display:inline-block;
                  box-shadow:0 4px 10px rgba(255,122,24,0.4);">
          Reset Password
        </a>
      </div>

      <!-- Divider -->
      <div style="text-align:center; margin:20px 0; color:#999;">
        <span>OR</span>
      </div>

      <!-- OTP Box -->
      <div style="background:#fff3e6; border:2px dashed #ff7a18; padding:20px; text-align:center; border-radius:10px;">
        <p style="margin:0; font-size:14px;">Use this OTP:</p>
        <h2 style="margin:10px 0; color:#ff7a18; letter-spacing:3px;">{resetToken}</h2>
      </div>

      <!-- Expiry -->
      <p style="margin-top:20px; font-size:14px; color:#ff7a18;">
        ⚠️ This link & OTP will expire in <strong>15 minutes</strong>.
      </p>

      <!-- Fallback -->
      <p style="font-size:13px; margin-top:20px;">
        If the button doesn’t work, copy this link:
      </p>
      <p style="word-break:break-all; color:#ff7a18; font-size:13px;">
        {resetURL}
      </p>

      <p style="margin-top:25px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background:#fafafa; text-align:center; padding:15px; font-size:12px; color:#999;">
      This is an automated email. Please do not reply.
    </div>

  </div>

</body>
</html>
`;