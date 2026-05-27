// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { getProductById, getCategories } from "../services/productService";
// import { updateProduct } from "../services/adminProductService";
// import toast from "react-hot-toast";

// const UpdateProductPage = () => {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   /*
//       STATES
//   */

//   const [categories, setCategories] = useState([]);

//   const [product, setProduct] = useState({
//     name: "",

//     description: "",

//     imageUrl: "",

//     price: "",

//     quantity: "",

//     categoryId: "",
//   });

//   /*
//       IMAGE SETTINGS
//   */

//   const [imageStyle, setImageStyle] = useState({
//     scale: 1,

//     x: 0,

//     y: 0,
//   });

//   /*
//       LOAD DATA
//   */

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       /*
//             PRODUCT
//         */

//       const productResponse = await getProductById(id);

//       /*
//             CATEGORIES
//         */

//       const categoryResponse = await getCategories();

//       setCategories(categoryResponse.data.data);

//       /*
//             PRODUCT DATA
//         */

//       const foundProduct = productResponse.data;

//       /*
//             FIRST IMAGE
//         */

//       const firstImage = foundProduct.images?.[0];

//       /*
//             SET PRODUCT
//         */

//       setProduct({
//         name: foundProduct.name || "",

//         description: foundProduct.description || "",

//         imageUrl: firstImage?.imageUrl || "",

//         price: foundProduct.price || "",

//         quantity: foundProduct.quantity || "",

//         categoryId: foundProduct.categoryId || "",
//       });

//       /*
//             IMAGE SETTINGS
//         */

//       setImageStyle({
//         scale: firstImage?.scale || 1,

//         x: firstImage?.positionX || 0,

//         y: firstImage?.positionY || 0,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   /*
//       HANDLE CHANGE
//   */

//   const handleChange = (e) => {
//     setProduct({
//       ...product,

//       [e.target.name]: e.target.value,
//     });
//   };

//   /*
//       HANDLE SUBMIT
//   */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         name: product.name,

//         description: product.description,

//         price: Number(product.price),

//         quantity: Number(product.quantity),

//         categoryId: Number(product.categoryId),

//         /*
//               IMAGE DATA
//           */

//         imageUrl: product.imageUrl,

//         scale: Number(imageStyle.scale),

//         positionX: Number(imageStyle.x),

//         positionY: Number(imageStyle.y),
//       };

//       console.log(payload);

//       /*
//             UPDATE
//         */

//       const response = await updateProduct(id, payload);

//       console.log(response.data);

//       toast.success("Product Updated");

//       navigate("/admin");
//     } catch (error) {
//       console.log(error);

//       console.log(error.response);

//       toast.error(error.response?.data?.message || "Update Failed");
//     }
//   };

//   return (
//     <div
//       className="min-vh-100"
//       style={{
//         background: "#f8fafc",
//       }}
//     >
//       <Navbar />

//       <div className="container py-3">
//         <div className="row justify-content-center">
//           <div className="col-xl-10">
//             <div
//               className="card border-0 shadow-sm"
//               style={{
//                 borderRadius: "22px",
//               }}
//             >
//               <div className="card-body p-4">
//                 {/* HEADER */}

//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div>
//                     <h3 className="fw-bold mb-1">Update Product</h3>

//                     <p className="text-muted small mb-0">
//                       Edit product details
//                     </p>
//                   </div>

//                   <div
//                     style={{
//                       fontSize: "42px",
//                     }}
//                   >
//                     ✏️
//                   </div>
//                 </div>

//                 {/* FORM */}

//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {/* LEFT */}

//                     <div className="col-lg-7">
//                       <div className="row">
//                         {/* NAME */}

//                         <div className="col-md-6 mb-3">
//                           <label className="form-label small fw-semibold">
//                             Product Name
//                           </label>

//                           <input
//                             type="text"
//                             name="name"
//                             className="form-control"
//                             value={product.name}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>

//                         {/* PRICE */}

//                         <div className="col-md-3 mb-3">
//                           <label className="form-label small fw-semibold">
//                             Price
//                           </label>

//                           <input
//                             type="number"
//                             name="price"
//                             className="form-control"
//                             value={product.price}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>

//                         {/* STOCK */}

//                         <div className="col-md-3 mb-3">
//                           <label className="form-label small fw-semibold">
//                             Stock
//                           </label>

//                           <input
//                             type="number"
//                             name="quantity"
//                             className="form-control"
//                             value={product.quantity}
//                             onChange={handleChange}
//                             required
//                             min="0"
//                           />
//                         </div>
//                       </div>

//                       {/* CATEGORY */}

//                       <div className="mb-3">
//                         <label className="form-label small fw-semibold">
//                           Category
//                         </label>

//                         <select
//                           name="categoryId"
//                           className="form-select"
//                           value={product.categoryId}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Category</option>

//                           {categories.map((category) => (
//                             <option key={category.id} value={category.id}>
//                               {category.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* IMAGE URL */}

//                       <div className="mb-3">
//                         <label className="form-label small fw-semibold">
//                           Image URL
//                         </label>

//                         <input
//                           type="text"
//                           name="imageUrl"
//                           className="form-control"
//                           value={product.imageUrl}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       {/* DESCRIPTION */}

//                       <div className="mb-3">
//                         <label className="form-label small fw-semibold">
//                           Description
//                         </label>

//                         <textarea
//                           name="description"
//                           rows="5"
//                           className="form-control"
//                           value={product.description}
//                           onChange={handleChange}
//                           required
//                           style={{
//                             resize: "none",
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* RIGHT */}

//                     <div className="col-lg-5">
//                       <label className="form-label small fw-semibold">
//                         Image Preview
//                       </label>

//                       <div
//                         className="border overflow-hidden bg-light d-flex align-items-center justify-content-center"
//                         style={{
//                           height: "320px",

//                           borderRadius: "18px",

//                           position: "relative",
//                         }}
//                       >
//                         {product.imageUrl ? (
//                           <img
//                             src={product.imageUrl}
//                             alt="Preview"
//                             style={{
//                               width: "100%",

//                               height: "100%",

//                               objectFit: "cover",

//                               transform: `
//                                 translate(${imageStyle.x}px, ${imageStyle.y}px)
//                                 scale(${imageStyle.scale})
//                               `,

//                               transition: "0.2s",
//                             }}
//                           />
//                         ) : (
//                           <div className="text-muted">No Image</div>
//                         )}
//                       </div>

//                       {/* IMAGE CONTROLS */}

//                       {product.imageUrl && (
//                         <div className="mt-3">
//                           {/* ZOOM */}

//                           <div className="mb-3">
//                             <label className="small text-muted">Zoom</label>

//                             <input
//                               type="range"
//                               min="1"
//                               max="2"
//                               step="0.1"
//                               value={imageStyle.scale}
//                               className="form-range"
//                               onChange={(e) =>
//                                 setImageStyle({
//                                   ...imageStyle,

//                                   scale: Number(e.target.value),
//                                 })
//                               }
//                             />
//                           </div>

//                           {/* MOVE */}

//                           <div className="d-flex gap-2">
//                             <button
//                               type="button"
//                               className="btn btn-light border flex-grow-1"
//                               onClick={() =>
//                                 setImageStyle({
//                                   ...imageStyle,

//                                   y: imageStyle.y - 10,
//                                 })
//                               }
//                             >
//                               ↑
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-light border flex-grow-1"
//                               onClick={() =>
//                                 setImageStyle({
//                                   ...imageStyle,

//                                   x: imageStyle.x - 10,
//                                 })
//                               }
//                             >
//                               ←
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-light border flex-grow-1"
//                               onClick={() =>
//                                 setImageStyle({
//                                   ...imageStyle,

//                                   x: imageStyle.x + 10,
//                                 })
//                               }
//                             >
//                               →
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-light border flex-grow-1"
//                               onClick={() =>
//                                 setImageStyle({
//                                   ...imageStyle,

//                                   y: imageStyle.y + 10,
//                                 })
//                               }
//                             >
//                               ↓
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* BUTTONS */}

//                   <div className="d-flex gap-3 mt-4">
//                     <button
//                       type="button"
//                       className="btn btn-light border w-50"
//                       onClick={() => navigate("/admin")}
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       className="btn btn-success w-50 fw-semibold"
//                     >
//                       Update Product
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProductPage;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductById, getCategories } from "../services/productService";
import { updateProduct } from "../services/adminProductService";
import toast from "react-hot-toast";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  const [imageStyle, setImageStyle] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  /*
      LOAD DATA
  */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productResponse = await getProductById(id);
      const categoryResponse = await getCategories();
      setCategories(categoryResponse.data.data);
      console.log(productResponse.data);
      const foundProduct = productResponse.data;
      setProduct({
        name: foundProduct.name || "",
        description: foundProduct.description || "",
        imageUrl: foundProduct.imageUrl || "",
        price: foundProduct.price || "",
        quantity: foundProduct.quantity || "",

        // FIXED
        categoryId: foundProduct.category?.id || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*
      HANDLE CHANGE
  */

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  /*
      HANDLE SUBMIT
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        quantity: Number(product.quantity),
        categoryId: Number(product.categoryId),
      };

      console.log(payload);
      const response = await updateProduct(id, payload);
      console.log(response.data);
      toast.success("Product Updated");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(error.response?.data?.message || "Update Failed");
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

      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "22px",
              }}
            >
              <div className="card-body p-4">
                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="fw-bold mb-1">Update Product</h3>

                    <p className="text-muted small mb-0">
                      Edit product details
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: "42px",
                    }}
                  >
                    ✏️
                  </div>
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* LEFT */}

                    <div className="col-lg-7">
                      <div className="row">
                        {/* NAME */}

                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-semibold">
                            Product Name
                          </label>

                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={product.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* PRICE */}

                        <div className="col-md-3 mb-3">
                          <label className="form-label small fw-semibold">
                            Price
                          </label>

                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* STOCK */}

                        <div className="col-md-3 mb-3">
                          <label className="form-label small fw-semibold">
                            Stock
                          </label>

                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                          />
                        </div>
                      </div>

                      {/* CATEGORY */}

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Category
                        </label>

                        <select
                          name="categoryId"
                          className="form-select"
                          value={product.categoryId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>

                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* IMAGE URL */}

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Image URL
                        </label>

                        <input
                          type="text"
                          name="imageUrl"
                          className="form-control"
                          value={product.imageUrl}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* DESCRIPTION */}

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Description
                        </label>

                        <textarea
                          name="description"
                          rows="5"
                          className="form-control"
                          value={product.description}
                          onChange={handleChange}
                          required
                          style={{
                            resize: "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-5">
                      <label className="form-label small fw-semibold">
                        Image Preview
                      </label>

                      <div
                        className="border overflow-hidden bg-light d-flex align-items-center justify-content-center"
                        style={{
                          height: "320px",
                          borderRadius: "18px",
                        }}
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transform: `
                                translate(${imageStyle.x}px, ${imageStyle.y}px)
                                scale(${imageStyle.scale})
                              `,
                              transition: "0.2s",
                            }}
                          />
                        ) : (
                          <div className="text-muted">No Image</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-light border w-50"
                      onClick={() => navigate("/admin")}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success w-50 fw-semibold"
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
