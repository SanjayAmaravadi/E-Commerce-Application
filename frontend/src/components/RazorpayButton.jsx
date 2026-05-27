import { useState } from "react";
import toast from "react-hot-toast";
import { createPaymentOrder, verifyPayment } from "../services/paymentService";

const RazorpayButton = ({ createOrder, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  // LOAD RAZORPAY SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
              
      // ALREADY LOADED
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);

      // LOAD SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed To Load Razorpay");
        return;
      }

      // CREATE PAYMENT ORDER
      const order = await createOrder();
      if (!order) {
        return;
      }
      const response = await createPaymentOrder(order.id);
      const paymentData = response.data.data;

      // OPTIONS
      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,

        name: "Product Catalog",
        description: "Order Payment",

        order_id: paymentData.razorpayOrderId,

        method: {
          card: true,
          upi: true,
          netbanking: true,
          wallet: true,
          paylater: true,
        },

        handler: async function (response) {
          try {
            await verifyPayment({
              orderId: order.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: "ONLINE",
            });

            toast.success("Payment Successful");

            if (onSuccess) {
              onSuccess();
            }
          } catch (error) {
            console.log(error);

            toast.error("Payment Verification Failed");
          }
        },

        prefill: {
          name: order.user?.name || "",
          email: order.user?.email || "",
          contact: order.user?.phone || "",
        },

        theme: {
          color: "#111827",
        },
      };

      // CREATE INSTANCE
      const razorpay = new window.Razorpay(options);

      // PAYMENT FAILED
      razorpay.on("payment.failed", function (response) {
        console.log(response);
        toast.error("Payment Failed");
      });

      // OPEN CHECKOUT
      razorpay.open();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Start Payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-dark w-100 py-3 fw-semibold"
      onClick={handlePayment}
      disabled={loading}
      style={{
        borderRadius: "14px",
      }}
    >
      {loading ? "Loading..." : "Pay Now"}
    </button>
  );
};

export default RazorpayButton;
