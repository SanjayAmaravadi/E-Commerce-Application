import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getMyOrders,
} from "../services/orderService";

const OrdersPage = () => {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  /*
      LOAD ORDERS
  */

  const loadOrders = async () => {

    try {

      const response =
        await getMyOrders();

      setOrders(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);
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

          <h2 className="fw-bold mb-1">
            My Orders
          </h2>

          <p className="text-muted mb-0">
            Track your recent purchases
          </p>

        </div>

        {orders.length === 0 ? (

          <div
            className="card border-0 shadow-sm text-center"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body py-5">

              <div
                className="mb-3"
                style={{
                  fontSize: "55px",
                }}
              >
                📦
              </div>

              <h4 className="fw-bold">
                No Orders Found
              </h4>

              <p className="text-muted mb-0">
                Your placed orders will appear here
              </p>

            </div>

          </div>

        ) : (

          <div className="row">

            {orders.map((order) => (

              <div
                key={order.id}
                className="col-12 mb-4"
              >

                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "22px",
                  }}
                >

                  <div className="card-body p-4">

                    {/* TOP SECTION */}

                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">

                      {/* LEFT */}

                      <div>

                        <div className="text-muted small mb-1">
                          Order ID
                        </div>

                        <h5 className="fw-bold mb-2">
                          #{order.id}
                        </h5>

                        <div className="small text-muted">
                          {order.createdAt}
                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="text-end">

                        <span
                          className="badge px-3 py-2"
                          style={{
                            background:
                              order.status ===
                              "DELIVERED"
                                ? "#198754"
                                : order.status ===
                                  "PENDING"
                                ? "#ffc107"
                                : "#212529",
                            color:
                              order.status ===
                              "PENDING"
                                ? "#000"
                                : "#fff",
                            borderRadius: "10px",
                            fontSize: "13px",
                          }}
                        >
                          {order.status}
                        </span>

                        <div className="mt-3">

                          <div className="small text-muted">
                            Total Amount
                          </div>

                          <h4 className="fw-bold text-success mb-0">
                            ₹ {
                              order.totalAmount
                            }
                          </h4>

                        </div>

                      </div>

                    </div>

                    {/* ITEMS */}

                    <div className="d-flex flex-column gap-3">

                      {order.items.map((item) => (

                        <div
                          key={item.id}
                          className="border bg-light d-flex justify-content-between align-items-center p-3"
                          style={{
                            borderRadius: "16px",
                          }}
                        >

                          {/* PRODUCT DETAILS */}

                          <div>

                            <div className="text-muted small mb-1">
                              Product
                            </div>

                            <h6 className="fw-bold mb-1">
                              {
                                item.product.name
                              }
                            </h6>

                            <div className="small text-muted">
                              Quantity:
                              {" "}
                              {item.quantity}
                            </div>

                          </div>

                          {/* PRICE */}

                          <div className="text-end">

                            <div className="small text-muted mb-1">
                              Amount
                            </div>

                            <h5 className="fw-bold text-success mb-0">

                              ₹ {
                                item.price *
                                item.quantity
                              }

                            </h5>

                          </div>

                        </div>

                      ))}

                    </div>

                    {/* FOOTER */}

                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">

                      <div className="small text-muted">
                        {order.items.length}
                        {" "}
                        item(s) in this order
                      </div>

                      {/* <button
                        className="btn btn-dark px-4"
                        style={{
                          borderRadius: "12px",
                        }}
                      >
                        View Details
                      </button> */}

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

export default OrdersPage;

// import { useEffect, useState } from "react";

// import Navbar from "../components/Navbar";

// import { getMyOrders } from "../services/orderService";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   /*
//       LOAD ORDERS
//   */

//   const loadOrders = async () => {
//     try {
//       const response = await getMyOrders();

//       setOrders(response.data.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-light min-vh-100">
//       <Navbar />

//       <div className="container py-4">
//         {/* HEADER */}

//         <div className="mb-4">
//           <h2 className="fw-bold mb-1">My Orders</h2>

//           <p className="text-muted">Track your recent purchases</p>
//         </div>

//         {orders.length === 0 ? (
//           <div className="card border-0 shadow-sm">
//             <div className="card-body text-center py-5">
//               <h4 className="fw-bold">No Orders Found</h4>
//             </div>
//           </div>
//         ) : (
//           orders.map((order) => (
//             <div key={order.id} className="card border-0 shadow-sm mb-4">
//               <div className="card-body">
//                 {/* TOP */}

//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div>
//                     <h5 className="fw-bold mb-1">Order #{order.id}</h5>

//                     <p className="text-muted mb-0">{order.createdAt}</p>
//                   </div>

//                   <span className="badge bg-dark px-3 py-2">
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* ITEMS */}

//                 {order.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="d-flex justify-content-between align-items-center border rounded p-3 mb-3 bg-light"
//                   >
//                     <div>
//                       <h6 className="fw-bold mb-1">{item.product.name}</h6>

//                       <small className="text-muted">Qty: {item.quantity}</small>
//                     </div>

//                     <div className="fw-bold text-success">
//                       ₹ {item.price * item.quantity}
//                     </div>
//                   </div>
//                 ))}

//                 {/* TOTAL */}

//                 <div className="d-flex justify-content-between align-items-center mt-4">
//                   <h5 className="fw-bold">Total Amount</h5>

//                   <h4 className="fw-bold text-success">
//                     ₹ {order.totalAmount}
//                   </h4>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
