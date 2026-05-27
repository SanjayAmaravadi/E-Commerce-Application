import { useState } from "react";

import { addToWishlist } from "../services/wishlistService";

import { addToCart } from "../services/cartService";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  /*
      LOCAL STATE
  */

  const [addedToCart, setAddedToCart] =
    useState(false);

  /*
      HANDLE WISHLIST
  */

  const handleWishlist = async () => {

    try {

      await addToWishlist(product.id);

      window.dispatchEvent(
        new Event("update-navbar")
      );

      toast.success(
        "Added to wishlist"
      );

    } catch (error) {

      toast.error(
        "Login Required"
      );
    }
  };

  /*
      HANDLE CART
  */

  const handleCart = async () => {

    /*
        IF ALREADY ADDED
    */

    if (addedToCart) {

      navigate("/cart");

      return;
    }

    try {

      await addToCart({

        productId:
          product.id,

        quantity: 1,
      });

      setAddedToCart(true);

      /*
          RESET BUTTON
      */

      setTimeout(() => {

        setAddedToCart(false);

      }, 3000);

      window.dispatchEvent(
        new Event("update-navbar")
      );

      toast.success(
        "Added to cart"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data ||
        "Failed To Add Cart"
      );
    }
  };

  /*
      RATING
  */

  const averageRating =
    product.averageRating || 0;

  const reviewCount =
    product.reviewCount || 0;

  return (

    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >

      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
      >

        {/* IMAGE CONTAINER */}

        <div
          style={{
            width: "100%",
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
            src={product.imageUrl}
            alt={product.name}

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

        {/* BODY */}

        <div className="card-body d-flex flex-column">

          {/* PRODUCT NAME */}

          <h5
            className="fw-bold mb-2"
            style={{
              minHeight: "48px",
            }}
          >
            {product.name}
          </h5>

          {/* DESCRIPTION */}

          <p
            className="text-muted mb-3"
            style={{
              minHeight: "48px",
              fontSize: "14px",
            }}
          >
            {product.description}
          </p>

          {/* PRICE */}

          <h4 className="text-success fw-bold mb-3">
            ₹ {product.price}
          </h4>

          {/* STOCK */}

          <div className="mb-3">

            {product.quantity > 0 ? (

              <span className="badge bg-success">

                In Stock ({product.quantity})

              </span>

            ) : (

              <span className="badge bg-danger">

                Out Of Stock

              </span>

            )}

          </div>

          {/* RATING */}

          <div className="mt-auto">

            <div className="d-flex align-items-center gap-2">

              <div>

                {[...Array(5)].map((_, index) => (

                  <span
                    key={index}
                    style={{
                      color:
                        index <
                        Math.round(averageRating)
                          ? "gold"
                          : "#ccc",

                      fontSize: "1rem",
                    }}
                  >
                    ★
                  </span>

                ))}

              </div>

              <div className="fw-bold">

                {averageRating.toFixed(1)}

              </div>

              <div className="text-muted">

                ({reviewCount} Reviews)

              </div>

            </div>

          </div>

        </div>

      </Link>

      {/* FOOTER */}

      <div className="card-footer bg-white border-0 d-flex gap-2 pt-0">

        <button
          className={`btn w-50 ${
            addedToCart
              ? "btn-success"
              : "btn-dark"
          }`}

          onClick={handleCart}

          disabled={product.quantity <= 0}
        >

          {product.quantity <= 0
            ? "Out Of Stock"
            : addedToCart
              ? "Go To Cart"
              : "Add To Cart"}

        </button>

        <button
          className="btn btn-outline-danger w-50"
          onClick={handleWishlist}
        >
          Wishlist
        </button>

      </div>

    </div>
  );
};

export default ProductCard;