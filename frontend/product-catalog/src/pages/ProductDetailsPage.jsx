import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProducts } from "../services/productService";
import { addReview, getReviews } from "../services/reviewService";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    loadProduct();

    loadReviews();
  }, []);

  /*
      LOAD PRODUCT
  */

  const loadProduct = async () => {
    try {
      const response = await getProducts();
      const products = response.data.data.content;
      const foundProduct = products.find((p) => p.id === Number(id));
      setProduct(foundProduct);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      LOAD REVIEWS
  */

  const loadReviews = async () => {
    try {
      const response = await getReviews(id);
      setReviews(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      HANDLE INPUT
  */

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  /*
      ADD REVIEW
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        ...reviewData,
        productId: id,
      });

      toast.success("Review Added");
      setReviewData({
        rating: 5,
        comment: "",
      });

      loadReviews();
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  /*
      AVERAGE RATING
  */

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          {/* <div className="col-md-5">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
            />
          </div> */}
          <div className="col-md-5">
            <div
              className="border rounded shadow-sm p-3 bg-white"
              style={{
                width: "100%",
                maxWidth: "420px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>

          <div className="col-md-7">
            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3 className="text-success">₹ {product.price}</h3>

            <div className="mt-3">
              <div className="d-flex align-items-center gap-2">
                <div>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color:
                          index < Math.round(averageRating) ? "gold" : "#ccc",

                        fontSize: "1.4rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="fw-bold">{averageRating}</div>

                <div className="text-muted">({reviews.length} Reviews)</div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEW FORM */}

        <div className="card shadow-sm mt-5 p-4">
          <h4 className="mb-3">Add Review</h4>

          <form onSubmit={handleSubmit}>
            <select
              name="rating"
              className="form-select mb-3"
              value={reviewData.rating}
              onChange={handleChange}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <textarea
              name="comment"
              placeholder="Write your review..."
              className="form-control mb-3"
              value={reviewData.comment}
              onChange={handleChange}
            />

            <button className="btn btn-dark">Submit Review</button>
          </form>
        </div>

        {/* REVIEWS */}

        <div className="mt-5">
          <h4 className="mb-4">Customer Reviews</h4>

          {reviews.length === 0 ? (
            <div className="alert alert-info">No Reviews Yet</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>{review.user.name}</h5>

                    <span className="badge bg-warning text-dark">
                      ⭐ {review.rating}
                    </span>
                  </div>

                  <p className="mt-3">{review.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
