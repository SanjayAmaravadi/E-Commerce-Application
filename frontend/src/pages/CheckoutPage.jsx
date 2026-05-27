import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RazorpayButton from "../components/RazorpayButton";
// import StripeButton from "../components/StripeButton";
import { getCart } from "../services/cartService";
import { checkout } from "../services/orderService";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [cartSummary, setCartSummary] = useState(null);

  //LOAD CART
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data.data.items || []);
      setCartSummary(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE ORDER
  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await checkout("ONLINE");
      const orderData = response.data.data;
      return orderData;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Checkout Failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // CASH ON DELIVERY
  const handleCOD = async () => {
    try {
      setLoading(true);
      //   await checkout({ paymentMethod: "COD"});
      await checkout("COD");
      toast.success("Order Placed Successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Place Order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <Navbar />

      <div className="container py-4">
        {/* HEADER */}

        <div className="mb-4">
          <h2 className="fw-bold mb-1">Checkout</h2>

          <p className="text-muted mb-0">Complete your purchase</p>
        </div>

        <div className="row">
          {/* LEFT */}

          <div className="col-lg-8">
            {/* DELIVERY */}

            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Delivery Address</h5>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter delivery address"
                  style={{
                    borderRadius: "14px",
                    resize: "none",
                  }}
                />
              </div>
            </div>

            {/* PAYMENT */}

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Payment Method</h5>

                {/* ONLINE */}

                <div
                  className={`border rounded p-3 mb-3 ${
                    paymentMethod === "ONLINE" ? "border-dark" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setPaymentMethod("ONLINE")}
                >
                  <div className="fw-semibold">Razorpay</div>

                  <div className="small text-muted">
                    UPI, Card, NetBanking, Wallet
                  </div>
                </div>

                {/* COD */}

                <div
                  className={`border rounded p-3 ${
                    paymentMethod === "COD" ? "border-dark" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="fw-semibold">Cash On Delivery</div>

                  <div className="small text-muted">Pay after delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "20px",

                position: "sticky",

                top: "90px",
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                {/* PRODUCTS */}

                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between small mb-2"
                    >
                      <span>{item.product.name}</span>

                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr />

                {/* TOTALS */}

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>

                  <span>₹{cartSummary?.subtotal?.toFixed(2) || "0.00"}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">GST</span>

                  <span>₹{cartSummary?.gst?.toFixed(2) || "0.00"}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Delivery</span>

                  <span>
                    {cartSummary?.deliveryFee === 0
                      ? "FREE"
                      : `₹ ${cartSummary?.deliveryFee?.toFixed(2) || 0}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">Platform Fee</span>

                  <span>₹{cartSummary?.platformFee?.toFixed(2) || "0.00"}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold">Total</h5>

                  <h4 className="fw-bold text-success">
                    ₹{cartSummary?.totalAmount?.toFixed(2) || "0.00"}
                  </h4>
                </div>

                {/* PAYMENT BUTTON */}
                {paymentMethod === "ONLINE" ? (
                  <RazorpayButton
                    createOrder={createOrder}
                    onSuccess={() => {
                      navigate("/orders");
                    }}
                  />
                  // <StripeButton createOrder={createOrder} />
                ) : (
                  <button
                    className="btn btn-dark w-100 py-3 fw-bold"
                    style={{
                      borderRadius: "14px",
                    }}
                    onClick={handleCOD}
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
