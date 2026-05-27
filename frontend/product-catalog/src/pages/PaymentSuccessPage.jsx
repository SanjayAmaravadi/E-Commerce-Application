import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const orderId = params.get("orderId");
        await API.post(`/payments/confirm/${orderId}`);
        toast.success("Payment Successful");
        navigate("/orders");
      } catch (error) {
        console.log(error);
        toast.error("Verification Failed");
      }
    };

    verify();
  }, []);

  return <div>Processing Payment...</div>;
};

export default PaymentSuccessPage;