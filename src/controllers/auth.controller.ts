import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.client.js";

import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from "../validation/auth.validation.js";
import { generateToken } from "../utils/token.js";
import { sendingSuccessRegEmail } from "../nodemailer/sending.reg.email.js";
import { sendingSuccessVerificationEmail } from "../nodemailer/success.email.verification.js";
import { sendPasswordResetLink } from "../nodemailer/password.reset.link.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const value = await signupSchema.validateAsync(req.body);
    const { name, email, password } = value;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = generateToken();
    const verificationTokenExpAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hr

    const regUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        verificationToken,
        verificationTokenExpAt,
      },
    });

    const response = await sendingSuccessRegEmail(
      regUser.email,
      regUser.name,
      regUser.verificationToken as string,
      `http:localhost:5173/verify-email`,
    );

    res.status(201).json({
      success: true,
      message:
        "user register successfully please check your email for verify your email.",
      emailResponse: response.emailResponse.response,
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;


    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpAt: {
          gt: new Date(), // expiry check
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Your token is expired or incorrect, please retry or register again.",
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpAt: null,
      },
    });

    await sendingSuccessVerificationEmail(
      user.email,
      "Email Verified 🎉",
      `<h2>Hello ${user.name}</h2>
       <p>Your email has been successfully verified.</p>
       <a href="http://localhost:5173/login-user">Login Now</a>`,
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. Please check your mail.",
    });
  } catch (error: any) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const value = await loginSchema.validateAsync(req.body);
    const { email, password } = value;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before login",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: `${user.role} login successfully.`,
      data: { token },
    });
  } catch (error: any) {
    console.error("Login Error:", error);

    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const value = await forgotPasswordSchema.validateAsync(req.body);

    const { email } = value;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this email exists, a reset link has been sent",
      });
    }

    const resetToken = generateToken();
    const resetTokenExpAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExpAt: resetTokenExpAt,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

const response = await sendPasswordResetLink(
  user.email,
  user.name,
   resetToken,
  resetLink
);

if (!response.success) {
  return res.status(500).json({
    success: false,
    message: "Failed to send reset email",
  });
}
    return res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent",
    });
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const value = await resetPasswordSchema.validateAsync(req.body);

    const { token, newPassword } = value;

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpAt: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const verificationToken = generateToken();
    const verificationTokenExpAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpAt,
      },
    });

    const verifyLink = `http://localhost:5173/verify-email/${verificationToken}`;

    await sendingSuccessRegEmail(
      user.email,
      user.name,
      verificationToken,
      verifyLink
    );

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });

  } catch (error) {
    console.error("Resend Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resend verification email",
    });
  }
};