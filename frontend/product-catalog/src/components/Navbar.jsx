import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaClipboardList, FaUserShield, FaSignOutAlt} from "react-icons/fa";
import { getCart } from "../services/cartService";
import { getWishlist } from "../services/wishlistService";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  /*
      AUTH
  */

  const token = user?.token;
  const role = user?.role;
  const isAdmin = role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN";

  /*
      COUNTS
  */
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  /*
      LOAD COUNTS
  */
  const loadCounts = async () => {
    /*
        SKIP FOR ADMIN
    */

    if (!token || isAdmin) {
      setCartCount(0);

      setWishlistCount(0);

      return;
    }

    try {
      /*
          CART COUNT
      */

      const cartResponse = await getCart();

      const cartItems = cartResponse.data.data.items || [];

      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      setCartCount(totalQuantity);

      /*
          WISHLIST COUNT
      */

      const wishlistResponse = await getWishlist();

      const wishlistItems = wishlistResponse.data.data || [];

      setWishlistCount(wishlistItems.length);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      INITIAL + ROLE/TOKEN CHANGE
  */

  useEffect(() => {
    loadCounts();
  }, [token, role]);

  /*
      LIVE NAVBAR UPDATE
  */

  useEffect(() => {
    const handleUpdate = () => {
      loadCounts();
    };

    window.addEventListener("update-navbar", handleUpdate);

    return () => {
      window.removeEventListener("update-navbar", handleUpdate);
    };
  }, [token, role]);

  /*
      LOGOUT
  */

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e9ecef",
        padding: "16px 0",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 15px rgba(0,0,0,0.04)",
      }}
    >
      <div className="container">
        {/* LOGO */}

        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            fontSize: "1.8rem",
            color: "#111827",
            letterSpacing: "-0.5px",
          }}
        >
          SJ Store
        </Link>

        {/* RIGHT SECTION */}

        <div className="d-flex align-items-center gap-3">
          {/* USER NAVIGATION */}

          {token && !isAdmin && (
            <>
              {/* CART */}

              <Link to="/cart" className="nav-icon" title="Cart">
                <FaShoppingCart />

                {cartCount > 0 && (
                  <span className="nav-badge bg-danger">{cartCount}</span>
                )}
              </Link>

              {/* WISHLIST */}

              <Link to="/wishlist" className="nav-icon" title="Wishlist">
                <FaHeart />

                {wishlistCount > 0 && (
                  <span
                    className="nav-badge"
                    style={{
                      backgroundColor: "#111827",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* ORDERS */}

              <Link to="/orders" className="nav-icon" title="Orders">
                <FaClipboardList />
              </Link>
            </>
          )}

          {/* ADMIN DASHBOARD */}

          {isAdmin && (
            <Link to="/admin" className="nav-icon" title="Admin Dashboard">
              <FaUserShield />
            </Link>
          )}

          {/* PROFILE */}

          {token && (
            <Link
              to="/profile"
              className="btn btn-light border"
              title="Profile"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#111827",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </Link>
          )}

          {/* AUTH SECTION */}

          {token ? (
            <button
              className="nav-icon border-0 bg-transparent"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          ) : (
            <div className="d-flex gap-2">
              <Link
                to="/login"
                className="btn btn-dark px-4"
                style={{
                  borderRadius: "12px",
                  fontWeight: "600",
                  padding: "10px 22px",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-dark px-4"
                style={{
                  borderRadius: "12px",
                  fontWeight: "600",
                  padding: "10px 22px",
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM STYLE */}

      <style>
        {`

          .nav-icon{

            width: 44px;
            height: 44px;

            border-radius: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #f8fafc;

            color: #111827;

            text-decoration: none;

            font-size: 1.1rem;

            position: relative;

            transition: all 0.25s ease;

            border: 1px solid #e5e7eb;

            cursor: pointer;

          }

          .nav-icon:hover{

            transform: translateY(-2px);

            background: #111827;

            color: white;

            border-color: #111827;

            box-shadow:
              0 8px 20px rgba(0,0,0,0.12);

          }

          .nav-badge{

            position: absolute;

            top: -6px;
            right: -6px;

            min-width: 20px;
            height: 20px;

            padding: 0 5px;

            border-radius: 50px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 0.7rem;

            color: white;

            font-weight: bold;

            border: 2px solid white;

          }

        `}
      </style>
    </nav>
  );
};

export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getUserRole } from "../utils/authUtils";
// import { getCart } from "../services/cartService";
// import { getWishlist } from "../services/wishlistService";
// import { useAuth } from "../context/AuthContext";
// import {
//   FaShoppingCart,
//   FaHeart,
//   FaClipboardList,
//   FaUserShield,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const Navbar = () => {
//   const navigate = useNavigate();

//   // const token = localStorage.getItem("token");
//   const { user, logout } = useAuth();
//   const token = user?.token;

//   const role = getUserRole();
//   console.log(role);

//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   /*
//       LOAD COUNTS
//   */

//   const loadCounts = async () => {
//     if (!token || role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN") {
//       return;
//     }

//     try {
//       // CART COUNT
//       const cartResponse = await getCart();
//       const cartItems = cartResponse.data.data.items || [];
//       const totalQuantity = cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0,
//       );

//       setCartCount(totalQuantity);

//       /*
//           WISHLIST COUNT
//       */
//       const wishlistResponse = await getWishlist();
//       const wishlistItems = wishlistResponse.data.data || [];
//       setWishlistCount(wishlistItems.length);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   /*
//       INITIAL LOAD
//   */

//   useEffect(() => {
//     loadCounts();
//   }, []);

//   /*
//       LIVE UPDATE
//   */

//   useEffect(() => {
//     window.addEventListener("update-navbar", loadCounts);

//     return () => {
//       window.removeEventListener("update-navbar", loadCounts);
//     };
//   }, []);

//   /*
//       LOGOUT
//   */

//   const handleLogout = () => {
//     logout();

//     navigate("/login");
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg sticky-top"
//       style={{
//         backgroundColor: "#ffffff",
//         borderBottom: "1px solid #e9ecef",
//         padding: "16px 0",
//         backdropFilter: "blur(10px)",
//         boxShadow: "0 2px 15px rgba(0,0,0,0.04)",
//       }}
//     >
//       <div className="container">
//         {/* LOGO */}

//         <Link
//           className="navbar-brand fw-bold"
//           to="/"
//           style={{
//             fontSize: "1.8rem",
//             color: "#111827",
//             letterSpacing: "-0.5px",
//           }}
//         >
//           Store
//         </Link>

//         {/* RIGHT SECTION */}

//         <div className="d-flex align-items-center gap-3">
//           {token && role !== "ROLE_ADMIN" && role !== "ROLE_SUPER_ADMIN" && (
//             <>
//               {/* CART */}

//               <Link to="/cart" className="nav-icon" title="Cart">
//                 <FaShoppingCart />

//                 {cartCount > 0 && (
//                   <span className="nav-badge bg-danger">{cartCount}</span>
//                 )}
//               </Link>

//               {/* WISHLIST */}

//               <Link to="/wishlist" className="nav-icon" title="Wishlist">
//                 <FaHeart />

//                 {wishlistCount > 0 && (
//                   <span
//                     className="nav-badge"
//                     style={{
//                       backgroundColor: "#111827",
//                     }}
//                   >
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>

//               {/* ORDERS */}

//               <Link to="/orders" className="nav-icon" title="Orders">
//                 <FaClipboardList />
//               </Link>
//             </>
//           )}

//           {/* ADMIN */}

//           {(role === "ROLE_SUPER_ADMIN" || role === "ROLE_ADMIN") && (
//             <Link to="/admin" className="nav-icon" title="Admin Dashboard">
//               <FaUserShield />
//             </Link>
//           )}

//           {/* PROFILE */}

//           {token && (
//             <Link
//               to="/profile"
//               className="btn btn-light border position-relative"
//               style={{
//                 width: "48px",
//                 height: "48px",
//                 borderRadius: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: "bold",
//                 fontSize: "18px",
//                 overflow: "hidden",
//               }}
//               title="Profile"
//             >
//               {user?.name ? (
//                 <span>{user.name.charAt(0).toUpperCase()}</span>
//               ) : (
//                 "👤"
//               )}
//             </Link>
//           )}

//           {/* AUTH SECTION */}

//           {token ? (
//             <button
//               className="nav-icon border-0 bg-transparent"
//               onClick={handleLogout}
//               title="Logout"
//             >
//               <FaSignOutAlt />
//             </button>
//           ) : (
//             <div className="d-flex gap-2">
//               <Link
//                 to="/login"
//                 className="btn btn-dark px-4"
//                 style={{
//                   borderRadius: "12px",
//                   fontWeight: "600",
//                   padding: "10px 22px",
//                 }}
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="btn btn-outline-dark px-4"
//                 style={{
//                   borderRadius: "12px",
//                   fontWeight: "600",
//                   padding: "10px 22px",
//                 }}
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CUSTOM STYLE */}

//       <style>
//         {`

//           .nav-icon{

//             width: 44px;
//             height: 44px;

//             border-radius: 14px;

//             display: flex;
//             align-items: center;
//             justify-content: center;

//             background: #f8fafc;

//             color: #111827;

//             text-decoration: none;

//             font-size: 1.1rem;

//             position: relative;

//             transition: all 0.25s ease;

//             border: 1px solid #e5e7eb;

//           }

//           .nav-icon:hover{

//             transform: translateY(-2px);

//             background: #111827;

//             color: white;

//             border-color: #111827;

//             box-shadow:
//               0 8px 20px rgba(0,0,0,0.12);

//           }

//           .nav-badge{

//             position: absolute;

//             top: -6px;
//             right: -6px;

//             min-width: 20px;
//             height: 20px;

//             padding: 0 5px;

//             border-radius: 50px;

//             display: flex;
//             align-items: center;
//             justify-content: center;

//             font-size: 0.7rem;

//             color: white;

//             font-weight: bold;

//             border: 2px solid white;

//           }

//         `}
//       </style>
//     </nav>
//   );
// };

// export default Navbar;
