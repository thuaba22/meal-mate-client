/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";

const CheckOutForm = ({ packageInfo }) => {
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  console.log(packageInfo);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const response = await fetch(
      "https://meal-mate-server.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(packageInfo.package_price * 100), // Convert to cents
          currency: "usd", // Change to your preferred currency
          userEmail: user.email,
          packageType: packageInfo.package_name,
        }),
      }
    );

    const { clientSecret } = await response.json();

    // Confirm the PaymentIntent with the card details
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error);
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      toast.success("You have successfully made the payment");
      setError(""); // Clear any previous errors
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm mt-2 bg-[#45D62D] hover:bg-[#45D62D] text-white"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-700">{error}</p>
    </form>
  );
};

export default CheckOutForm;
