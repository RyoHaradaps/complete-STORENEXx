import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51RIXjnRWC1z3txxJNEAbPdUfKI4lPIPn4623LLjJwdPKN8BHOkAGccUWsr1c2uuBh0YO06EaEVJVKmeRuVvma7l900lVSgszgw");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("US"); // Default to United States (ISO code)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card Element not found. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }), // Replace with the actual amount in cents
      });

      const { clientSecret } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email,
            name,
            address: {
              country, // Pass the 2-character ISO country code
            },
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "Payment failed.");
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        alert("Payment successful!");
        navigate("/thank-you"); // Redirect to Thank You page
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name on card"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country/Region</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Information</label>
        <div className="p-4 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Pay with Card</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default Payment;