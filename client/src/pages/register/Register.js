import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { lHost } from "../../host";
import { message } from "antd";
import "./signup.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handlerSubmit = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post(`${lHost}/api/user/signup`, formData, {
        withCredentials: true, // Ensure credentials are sent
      });
      message.success("Your account has been created!");
      navigate("/login");
    } catch (error) {
      alert("Error!");
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <header>
          <h2>Point Of Sale</h2>
          <p>Create a new account</p>
        </header>
        <main>
          {step === 1 && (
            <>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter First Name"
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter Last Name"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="i.e; abcd_."
                />
              </div>
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
            </>
          )}

          {step === 3 && (
            <>
              <div className="input-container">
                <label>Create Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create a strong password"
                />
              </div>
            </>
          )}

          <div className="button-group">
            {step !== 1 && (
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step === 1 && (
              <button
                disabled={!formData.firstName || !formData.lastName}
                className="next-btn"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                disabled={!formData.username || !formData.email}
                className="next-btn"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                disabled={!formData.password}
                className="submit-btn"
                onClick={handlerSubmit}
              >
                Signup
              </button>
            )}
          </div>
        </main>
        <footer>
          <Link to="/login">Already have an account? Login now!</Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
