import Stripe from "stripe"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { cart } = await req.json()

    if (!cart?.length) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      )
    }

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error(err)

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}