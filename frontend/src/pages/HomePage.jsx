import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

import { getProducts, getCategories } from "../services/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsRef = useRef(null);

  /*
      LOAD DATA
  */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productResponse = await getProducts();

      const categoryResponse = await getCategories();

      setProducts(productResponse.data.data.content);

      setCategories(categoryResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /*
      FILTER PRODUCTS
  */

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.categoryId === Number(selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}

      <div
        className="py-5"
        style={{
          background: "linear-gradient(to right, #ffffff, #f1f5f9)",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1
                className="fw-bold"
                style={{
                  fontSize: "3rem",
                  color: "#212529",
                  lineHeight: "1.2",
                }}
              >
                Discover Amazing
                <span
                  className="ms-2"
                  style={{
                    color: "#0d6efd",
                  }}
                >
                  Products
                </span>
              </h1>

              <p
                className="text-muted mt-3"
                style={{
                  fontSize: "1.1rem",
                  maxWidth: "650px",
                }}
              >
                Explore premium collections, trending products, smart deals, and
                customer favorites in one modern shopping experience.
              </p>

              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-dark px-4 py-2 rounded-pill"
                  onClick={scrollToProducts}
                >
                  Explore Now
                </button>

                <button
                  className="btn btn-outline-dark px-4 py-2 rounded-pill"
                  onClick={scrollToProducts}
                >
                  Latest Deals
                </button>
              </div>
            </div>

            {/* HERO IMAGE */}

            <div className="col-lg-5 text-center mt-4 mt-lg-0">
              {products.length > 0 ? (
                <img
                  src={products[0]?.imageUrl}
                  alt={products[0]?.name || "Hero Product"}
                  className="img-fluid rounded-4 shadow"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600?text=No+Image";
                  }}
                  style={{
                    maxHeight: "380px",
                    width: "100%",
                    objectFit: "contain",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "24px",
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center rounded-4 shadow"
                  style={{
                    height: "380px",
                    background: "#ffffff",
                    color: "#9ca3af",
                    fontSize: "1.2rem",
                  }}
                >
                  Loading Products...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="container py-5">
        {/* FILTER + SEARCH */}

        <div
          className="card border-0 shadow-sm p-4 mb-5 rounded-4"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <div className="row g-4 align-items-center">
            <div className="col-lg-4">
              <h5 className="fw-bold mb-3">Categories</h5>

              <CategoryFilter
                categories={categories}
                onSelect={setSelectedCategory}
              />
            </div>

            <div className="col-lg-8">
              <h5 className="fw-bold mb-3">Search Products</h5>

              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>

        {/* SECTION TITLE */}

        <div
          ref={productsRef}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <h2 className="fw-bold mb-1">Featured Products</h2>

            <p className="text-muted mb-0">
              Showing {filteredProducts.length} products
            </p>
          </div>
        </div>

        {/* PRODUCT GRID */}

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomePage;

// import { useEffect, useState } from "react";

// import Navbar from "../components/Navbar";
// import ProductGrid from "../components/ProductGrid";
// import CategoryFilter from "../components/CategoryFilter";
// import SearchBar from "../components/SearchBar";

// import { getProducts, getCategories } from "../services/productService";

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const productResponse = await getProducts();
//       const categoryResponse = await getCategories();
//       setProducts(productResponse.data.data.content);
//       setCategories(categoryResponse.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesCategory = selectedCategory
//       ? product.categoryId === Number(selectedCategory)
//       : true;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div>
//       <Navbar />

//       <div className="container mt-4">
//         <div className="row mb-4">
//           <div className="col-md-4">
//             <CategoryFilter
//               categories={categories}
//               onSelect={setSelectedCategory}
//             />
//           </div>

//           <div className="col-md-8">
//             <SearchBar search={search} setSearch={setSearch} />
//           </div>
//         </div>

//         <ProductGrid products={filteredProducts} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
