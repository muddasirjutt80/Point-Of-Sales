import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// const axios = require("axios");
import "antd/dist/antd.min.css";
import "./App.css";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bills from "./pages/bills/Bills";
import Profile from "./pages/profile/Profile";
import Customers from "./pages/customers/Customers";
import { AuthProvider, useAuth } from "./auth";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRouter>
                <Products />
              </ProtectedRouter>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRouter>
                <Categories />
              </ProtectedRouter>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRouter>
                <Cart />
              </ProtectedRouter>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRouter>
                <Bills />
              </ProtectedRouter>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRouter>
                <Customers />
              </ProtectedRouter>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouter>
                <Profile />
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

export function ProtectedRouter({ children }) {
  const { isAuthenticated } = useAuth();
  // axios.defaults.withCredentials = true;
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
