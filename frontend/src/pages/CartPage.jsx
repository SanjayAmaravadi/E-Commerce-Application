import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {getCart,removeCartItem,addToCart,decreaseCartQuantity,} from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import { checkout } from "../services/orderService";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showAllPreview, setShowAllPreview] = useState(false);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  // LOAD CART
  const loadCart = async () => {
    try {
      const response = await getCart();
      const cartData = response.data.data;

      setCartItems(cartData.items || []);

      setSummary({
        subtotal: cartData.subtotal || 0,
        gst: cartData.gst || 0,
        deliveryFee: cartData.deliveryFee || 0,
        platformFee: cartData.platformFee || 0,
        totalAmount: cartData.totalAmount || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //REMOVE ITEM
  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);

      toast.success("Removed");

      window.dispatchEvent(new Event("update-navbar"));

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  //MOVE SINGLE PRODUCT TO WISHLIST
  const moveToWishlist = async (item) => {
    try {
      // TRY ADDING TO WISHLIST
      try {
        await addToWishlist(item.product.id);

        toast.success("Added To Wishlist");
      } catch (wishlistError) {
        
        // ALREADY EXISTS
        if (wishlistError?.response?.status === 400) {
          toast("Product already in wishlist");
        } else {
          throw wishlistError;
        }
      }

      //REMOVE FROM CART ANYWAY
      await removeCartItem(item.id);
      window.dispatchEvent(new Event("update-navbar"));
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Move Product");
    }
  };

  // CLEAR CART
  const handleClearCart = async () => {
    try {
      await Promise.all(cartItems.map((item) => removeCartItem(item.id)));

      toast.success("Cart Cleared");

      window.dispatchEvent(new Event("update-navbar"));

      loadCart();
    } catch (error) {
      console.log(error);

      toast.error("Failed To Clear Cart");
    }
  };

  // SAVE FOR LATER
  const handleSaveLater = async () => {
    try {
      // ADD ALL PRODUCTS TO WISHLIST
      for (const item of cartItems) {
        try {
          await addToWishlist(item.product.id);
        } catch (error) {
          console.log("Already exists in wishlist");
        }
      }

      // REMOVE ALL PRODUCTS FROM CART
      await Promise.all(cartItems.map((item) => removeCartItem(item.id)));
      toast.success("All Products Saved To Wishlist");
      window.dispatchEvent(new Event("update-navbar"));
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Save Products");
    }
  };

  // INCREASE QUANTITY
  const increaseQuantity = async (productId) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      window.dispatchEvent(new Event("update-navbar"));

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  // DECREASE QUANTITY
  const decreaseQuantity = async (item) => {
    try {
      await decreaseCartQuantity(item.id);

      window.dispatchEvent(new Event("update-navbar"));

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL ITEMS
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // CHECKOUT
  const handleCheckout = async () => {
    try {
      await checkout();
      toast.success("Order Placed Successfully");
      window.dispatchEvent(new Event("update-navbar"));
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Checkout Failed");
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
          <h2 className="fw-bold mb-1">Shopping Cart</h2>
          <p className="text-muted mb-0">Manage your selected products</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center">
            <h4 className="fw-bold">Your Cart is Empty</h4>
            <p className="text-muted">Add products to continue shopping</p>
          </div>
        ) : (
          <div className="row">
            {/* LEFT SECTION */}

            <div className="col-lg-8">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm mb-3"
                  style={{
                    borderRadius: "18px",
                  }}
                >
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      {/* PRODUCT INFO */}

                      <div className="col-md-5">
                        <div className="text-muted small mb-1">
                          Item #{index + 1}
                        </div>

                        <h5 className="fw-bold mb-2">{item.product.name}</h5>

                        <p className="text-muted small mb-2">
                          {item.product.description}
                        </p>

                        <div className="small text-muted">
                          ₹ {item.product.price} per unit
                        </div>
                      </div>

                      {/* QUANTITY */}

                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </button>

                          <span className="fw-bold">{item.quantity}</span>

                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => increaseQuantity(item.product.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* TOTAL */}

                      <div className="col-md-2">
                        <div className="fw-bold text-success">
                          ₹ {item.product.price * item.quantity}
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="col-md-2 text-end">
                        <div className="d-flex flex-column gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => moveToWishlist(item)}
                          >
                            Wishlist
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SECTION */}

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

                  {/* ITEM COUNT */}

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Total Items</span>

                    <span className="fw-semibold">{totalItems}</span>
                  </div>

                  {/* MINI PREVIEW */}

                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Cart Preview</h6>

                    {(showAllPreview ? cartItems : cartItems.slice(0, 3)).map(
                      (item) => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between small mb-2"
                        >
                          <span>{item.product.name}</span>

                          <span>x{item.quantity}</span>
                        </div>
                      ),
                    )}

                    {cartItems.length > 3 && (
                      <button
                        className="btn btn-link p-0 small text-decoration-none"
                        onClick={() => setShowAllPreview(!showAllPreview)}
                      >
                        {showAllPreview
                          ? "Show Less"
                          : `Show More (${cartItems.length - 3} more items)`}
                      </button>
                    )}
                  </div>

                  <hr />

                  {/* PRICE DETAILS */}

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Subtotal</span>

                    <span>₹ {summary?.subtotal?.toFixed(2) || "0.00"}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">GST</span>

                    <span>₹ {summary?.gst?.toFixed(2) || "0.00"}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Delivery Fee</span>

                    <span>
                      {summary?.deliveryFee === 0
                        ? "FREE"
                        : `₹ ${summary?.deliveryFee?.toFixed(2) || "0.00"}`}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Platform Fee</span>

                    <span>₹ {summary?.platformFee?.toFixed(2) || "0.00"}</span>
                  </div>

                  <hr />

                  {/* FINAL TOTAL */}

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold">Total Amount</h5>

                    <h4 className="fw-bold text-success">
                      ₹ {summary?.totalAmount?.toFixed(2) || "0.00"}
                    </h4>
                  </div>

                  {/* DELIVERY */}

                  <div className="alert alert-light border small">
                    Estimated Delivery:
                    <strong> 2-4 Business Days</strong>
                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="d-flex gap-2 mb-3">
                    <button
                      className="btn btn-outline-dark w-50"
                      onClick={handleSaveLater}
                    >
                      Save Later
                    </button>

                    <button
                      className="btn btn-outline-danger w-50"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>

                  {/* CHECKOUT */}

                  <button
                    className="btn btn-dark w-100 py-3 fw-bold"
                    style={{
                      borderRadius: "14px",
                    }}
                    // onClick={handleCheckout}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
