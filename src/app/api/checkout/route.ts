import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe lazily to avoid build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { email } = await request.json();

    const priceId = process.env.STRIPE_LIFETIME_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Lifetime price ID is not configured" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Create Stripe checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Pre-fill email if provided
      ...(email && { customer_email: email }),
      // Create a Stripe customer so webhook can retrieve email
      customer_creation: "always",
      // Redirect URLs
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
      // Allow promotion codes
      allow_promotion_codes: true,
      // Collect billing address for tax
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
