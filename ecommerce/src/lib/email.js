import { Resend } from 'resend';
import User from '@/models/user.model';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <h1>${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h1>
        <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verifyUrl}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};