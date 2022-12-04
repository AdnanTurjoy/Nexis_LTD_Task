import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
function Register(props) {
  const [first_name, setFirst_name] = useState("");
  const [Last_Name, setLast_Name] = useState("");
  const [phone_number, setPhone_number] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://test.nexisltd.com/signup", {
        first_name,
        Last_Name,
        phone_number,
        email,
        password,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.response.data.error);

        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 4000);
      });
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="logo"></div>
        <div className="signin-photo"></div>
      </div>
      <div className="right-side">
        <h1 className="title">SignUp Form</h1>
        {error && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="first_name"
              onChange={(e) => setFirst_name(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="last_Name"
              id="last_Name"
              placeholder="last_Name"
              onChange={(e) => setLast_Name(e.target.value)}
              required
            />
          </div>
          <div className="phone-number">
            <span>+880</span>

            <input
              type="number"
              name="phone_number"
              id="phone_number"
              placeholder="1xxxxxxxx"
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="write email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Next Step {"-->"}
          </button>
        </form>
        <div className="bottom-login">
          <p>Already have an account? </p>
          <Link to={"/login"}>
            <button className="">LOGIN HERE!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
