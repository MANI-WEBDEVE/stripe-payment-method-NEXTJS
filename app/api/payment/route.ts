import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe instance with secret key
const stripe = new Stripe(process.env.SECRET_KEY as string);

// Interface for request body data
interface BodyData {
  name: string;
  price: number;
}

export const POST = async (request: NextRequest) => {
  try {
    // Parse the request body to get product data
    const data: BodyData = await request.json();

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      name: "Muhammad",
      address: {
        city: "Karachi",
        state: "Sindh",
        postal_code: "74900",
        line1: "Local path not correct",
        country: "PK", // Optional: adding a country code
      },
      email: "admin@gmail.com", // Email of the customer
    });

    // Create a checkout session for the customer
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id, // Associate customer with checkout session
      mode: "payment",
      success_url: `http://localhost:3000/success/?token=${customer.id}`, // Correct query string format
      cancel_url: `http://localhost:3000/cancel/?token=${customer.id}`,   // Correct query string format
      line_items: [
        {
          price_data: {
            currency: "usd", // Specify the currency
            product_data: {
              name: data.name, // Use the product name from request data
            },
            unit_amount: data.price * 100, // Convert price to cents
          },
          quantity: 1, // Set quantity of items
        },
      ],
    });

    // Return the checkout session details as the response
    return NextResponse.json({ message: "Checkout created", url: checkOutSession.url }, { status: 200 });
  } catch (error: any) {
    // Handle errors and return a response with error details
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
