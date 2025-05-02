import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe("sk_test_51RIXjnRWC1z3txxJC8f6xJq7hTIlxI7SFUSMXSEkXqSdc3auzwfU9tifAp1JMZBCI286A4wD7rMbRaxShmQxLoF900IkRwnXkB"); // Replace with your Stripe Secret Key

// Middleware
app.use(cors());
app.use(express.json());

// Create Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in cents (e.g., $10 = 1000)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd", // Change currency if needed
      payment_method_types: ["card"], // Accept card payments
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));