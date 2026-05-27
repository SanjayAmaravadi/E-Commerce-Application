import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { createStripeSession } from "../services/paymentService";

const stripePromise = loadStripe("pk_test_your_publishable_key");

const StripeButton = ({ createOrder }) => {
  const handlePayment = async () => {
    try {
      /*
          CREATE ORDER
      */

      const order = await createOrder();

      if (!order) return;

      /*
          CREATE STRIPE SESSION
      */

      const response = await createStripeSession(order.id);

      const sessionId = response.data.data.sessionId;

      /*
          LOAD STRIPE
      */

      const stripe = await stripePromise;

      /*
          REDIRECT
      */

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.log(error);

      toast.error("Payment Failed");
    }
  };

  return (
    <button
      className="btn btn-dark w-100 py-3 fw-bold"
      style={{
        borderRadius: "14px",
      }}
      onClick={handlePayment}
    >
      Pay With Stripe
    </button>
  );
};

export default StripeButton;