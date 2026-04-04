
import { PASSWORD_RESET_TEMPLATE } from "./email.template.js";
import { transport } from "./nodemailer.config.js";

export const sendPasswordResetLink = async (
  email: string,
  username: string,
  verificationToken: string,
  passwordResetLink: string
) => {
  try {
    const htmlTemplate = PASSWORD_RESET_TEMPLATE
      .replace("{username}", username)
      .replace(/{resetURL}/g, passwordResetLink)
      .replace("{resetToken}", verificationToken); 

    const info = await transport.sendMail({
      from: `"Your App" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Reset Your Password 🔐",
      html: htmlTemplate,
    });

    console.log(`Password reset email sent: ${info.response}`);

    return {
      success: true,
      message: "Password reset email sent successfully",
      emailResponse: info.response,
    };

  } catch (error: any) {
    console.error("Error sending password reset email:", error);

    return {
      success: false,
      message: "Failed to send password reset email",
    };
  }
};