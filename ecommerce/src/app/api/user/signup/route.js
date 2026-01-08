import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbConfig/dbConfig";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(request) {
  try {
    await connectDB(); // ✅ connect inside handler

    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
