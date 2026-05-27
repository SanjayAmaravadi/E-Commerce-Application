const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
          <div className="card h-100 shadow-sm border-0">
            <img
              src={product.imageUrl || "https://placehold.co/300x300"}
              className="card-img-top"
              alt={product.name}
              style={{
                height: "260px",
                objectFit: "cover",
              }}
            />

            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">{product.name}</h5>

              <p className="text-muted small">{product.category?.name}</p>

              <p className="card-text flex-grow-1">{product.description}</p>

              <h5 className="fw-bold text-primary mb-3">₹ {product.price}</h5>

              <button
                className="btn btn-dark w-100"
                onClick={() => handleAddToCart(product.id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
