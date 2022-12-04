import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenAuth } from "../../App";
import "../register/register.css";
function Login(props) {
  const [token, setToken] = useContext(TokenAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://test.nexisltd.com/login", {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data);
        //console.log(res.data);
        navigate("/");
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
        <h1 className="title">Login Form</h1>
        {error && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form className="form-group" onSubmit={handleSubmit}>
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
          <p> Don’t have an account? </p>
          <Link to={"/register"}>
            <button className="">SIGNUP HERE!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
