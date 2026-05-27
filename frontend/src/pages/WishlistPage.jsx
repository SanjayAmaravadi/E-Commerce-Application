import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getWishlist, removeWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  /*
      LOAD WISHLIST
  */

  const loadWishlist = async () => {
    try {
      const response = await getWishlist();

      setWishlist(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      REMOVE ITEM
  */

  const handleRemove = async (id) => {
    try {
      await removeWishlist(id);

      toast.success("Removed From Wishlist");

      window.dispatchEvent(new Event("update-navbar"));

      loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  /*
      MOVE TO CART
  */

  const handleMoveToCart = async (item) => {
    try {
      await addToCart({
        productId: item.product.id,
        quantity: 1,
      });

      await removeWishlist(item.id);

      toast.success("Moved To Cart");

      window.dispatchEvent(new Event("update-navbar"));

      loadWishlist();
    } catch (error) {
      console.log(error);

      toast.error("Failed To Move Item");
    }
  };

  /*
      CLEAR WISHLIST
  */

  const handleClearWishlist = async () => {
    try {
      await Promise.all(wishlist.map((item) => removeWishlist(item.id)));

      toast.success("Wishlist Cleared");

      window.dispatchEvent(new Event("update-navbar"));

      loadWishlist();
    } catch (error) {
      console.log(error);

      toast.error("Failed To Clear Wishlist");
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

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">My Wishlist</h2>

            <p className="text-muted mb-0">
              Save your favorite products for later
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              className="btn btn-outline-danger"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {/* EMPTY STATE */}

        {wishlist.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center">
            <h4 className="fw-bold">Your Wishlist is Empty</h4>

            <p className="text-muted mb-0">Save products to view them later</p>
          </div>
        ) : (
          <div className="row">
            {wishlist.map((item, index) => (
              <div className="col-lg-6 mb-4" key={item.id}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  <div className="card-body p-4">
                    {/* TOP */}
                    {/* PRODUCT IMAGE + DETAILS */}

                    <div className="d-flex gap-3 mb-3">
                      {/* IMAGE */}
                      <div
                        style={{
                          width: "40%",
                          height: "260px",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          padding: "16px",
                        }}
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/600x600?text=No+Image";
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </div>

                      {/* DETAILS */}

                      <div className="flex-grow-1">
                        <div className="text-muted small mb-1">
                          Wishlist Item #{index + 1}
                        </div>

                        <h4 className="fw-bold mb-2">{item.product.name}</h4>

                        <p className="text-muted small mb-3">
                          {item.product.description}
                        </p>

                        <h5 className="fw-bold text-success mb-0">
                          ₹ {item.product.price}
                        </h5>
                      </div>
                    </div>

                    {/* DELIVERY */}

                    <div className="alert alert-light border small mb-4">
                      Estimated Delivery:
                      <strong> 2-4 Business Days</strong>
                    </div>

                    {/* ACTIONS */}

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-dark w-100"
                        style={{
                          borderRadius: "12px",
                        }}
                        onClick={() => handleMoveToCart(item)}
                      >
                        Move To Cart
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        style={{
                          borderRadius: "12px",
                          minWidth: "110px",
                        }}
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
