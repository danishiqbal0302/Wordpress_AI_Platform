import nodemailer from "nodemailer";

interface SendPasswordResetParams {
  to: string;
  resetToken: string;
}

export async function sendPasswordResetEmail({ to, resetToken }: SendPasswordResetParams) {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_FROM || '"WordPress AI Platform" <noreply@wordpress-ai-platform.com>';

    let transporter: nodemailer.Transporter;

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[MAILER] Using Production SMTP Transporter (${smtpHost}:${smtpPort})...`);
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } else {
      console.log("[MAILER] SMTP credentials missing in .env — Initializing Ethereal Test Email Transporter...");
      const testAccount = await nodemailer.createTestAccount();
      console.log("[MAILER] Generated Ethereal Test Account:", testAccount.user);

      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #38bdf8; font-size: 24px; font-weight: 800; margin: 0;">WordPress AI Platform</h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Password Reset Request</p>
        </div>
        
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">Hello,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">We received a request to reset your password. Use the 6-digit verification code below to complete your password reset. This code expires in <strong>15 minutes</strong>.</p>
        
        <div style="text-align: center; margin: 32px 0;">
          <div style="display: inline-block; background-color: #1e293b; border: 1px solid #38bdf8; color: #38bdf8; font-size: 32px; font-weight: 900; letter-spacing: 8px; padding: 16px 32px; border-radius: 12px;">
            ${resetToken}
          </div>
        </div>
        
        <p style="font-size: 12px; color: #64748b; line-height: 1.5; border-top: 1px solid #1e293b; pt-16px; margin-top: 24px;">
          If you did not request a password reset, please ignore this message or contact your agency administrator.
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `[${resetToken}] WordPress AI Platform - Password Reset Verification Code`,
      text: `Your password reset verification code is: ${resetToken}. This code expires in 15 minutes.`,
      html: htmlContent,
    });

    console.log("--------------------------------------------------");
    console.log(`[MAILER] Reset Email Sent Successfully to: ${to}`);
    console.log(`[MAILER] Message ID: ${info.messageId}`);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[MAILER] Ethereal Email Preview URL: ${previewUrl}`);
    }
    console.log("--------------------------------------------------");

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl || null,
    };
  } catch (error: any) {
    console.error("[MAILER ERROR]: Failed to send password reset email:", error);
    throw error;
  }
}
