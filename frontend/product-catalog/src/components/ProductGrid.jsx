import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
