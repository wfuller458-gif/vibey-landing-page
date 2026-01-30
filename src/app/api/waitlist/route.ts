import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, platform } = await request.json();

    // Log to Vercel logs for now - can integrate with email service later
    console.log(`Waitlist signup: ${email} (${platform})`);

    // You can later integrate with:
    // - Mailchimp
    // - ConvertKit
    // - A database
    // - Google Sheets API
    // For now, we just accept the submission

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
