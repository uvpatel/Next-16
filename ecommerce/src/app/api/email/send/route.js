import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, emailType, userId } = body;

    await sendEmail({ email, emailType, userId });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
