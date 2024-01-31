import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const data = await req.json();
  const { amount } = data;
  console.log("amount:", amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // the amount is in cents!
      currency: "USD",
    });

    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 400 });
  }
}
