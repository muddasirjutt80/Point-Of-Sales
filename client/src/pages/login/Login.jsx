import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { lHost } from "../../host";
import "./login.css";
import { useAuth } from "../../auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlerSubmit = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { email, password } = formData;
      const res = await axios.post(
        `${lHost}/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "HIDE_LOADING" });

      if (res.status === 200) {
        message.success(`Welcome!`);
        setAuth(true);
        navigate("/");
      } else {
        message.error(res.data.message || "Unexpected server response!");
      }
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      const serverMessage = error?.response?.data?.message;
      message.error(serverMessage || "Error during login!");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(`${lHost}/api/user/status`);
        if (response.data.isAuthenticated) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };
    fetchAuthStatus();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <header>
          <h2>Point Of Sale</h2>
          <p>Login to your account</p>
        </header>
        <main>
          {step === 1 && (
            <>
              <div className="input-container">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="button-group">
                <button
                  className="next-btn"
                  disabled={!formData.email}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter Password"
                />
              </div>
              <div className="button-group">
                <button className="back-btn" onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  className="submit-btn"
                  disabled={!formData.password}
                  onClick={handlerSubmit}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </main>
        <footer>
          <Link to="/signup">Don't have an account? Signup now!</Link>
        </footer>
      </div>
    </div>
  );
};

export default Login;
