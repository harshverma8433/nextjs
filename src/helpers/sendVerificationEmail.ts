import { resend } from "@/lib/resend";
import verificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifiyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "harshverma8433@gmail.com",
      to: email,
      subject: "Mystry Message Verification code",
      react: verificationEmail({ username, otp: verifiyCode }),
    });
    return {
      success: true,
      message: "verification email send successfully",
    };
  } catch (emailerror) {
    console.error("Error Sendig Verification Email", emailerror);
    return { success: false, message: "Failed to send verification emmail" };
  }
}
