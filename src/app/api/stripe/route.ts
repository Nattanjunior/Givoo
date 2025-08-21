// src/app/api/stripe/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const loginLink = await stripe.accounts.createLoginLink(
      "acct_1RnQPPw3RD2ry7F"
    );

    return new Response(
      JSON.stringify({ url: loginLink.url }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao criar link" }),
      { status: 500 }
    );
  }
}
