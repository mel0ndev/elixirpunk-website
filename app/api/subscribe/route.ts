import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!API_KEY) {
      console.error("MAILERLITE_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: GROUP_ID ? [GROUP_ID] : [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle already subscribed case
      if (response.status === 409 || data.message?.includes("already")) {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
      console.error("MailerLite error:", data);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
