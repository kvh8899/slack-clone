import "./authpage.css";
import React, { useState } from "react";
import { login } from '../store/session'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import Redirect from 'react'

function AuthPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(login({ email: 'demo@aa.io', hashedPassword: 'password' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      console.log(data)
    }
    if (!errors.length) {
      return <Redirect to='/channel' />;
    }
  };
  return (
    <div className="wrapper authwrapper">
      <div className="auth">
        <div className="namelogo">
          <img src="./zinglogo.png" alt="logo"></img>
          <h2>Zing</h2>
        </div>
        <p> Sign in to your workspace.</p>
        <Link to="/signup">Don't have an account?</Link>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <li className='errors' key={idx}>{error}</li>
          ))}
        </ul>
        <form className='loginform' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Email"}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>Continue</button>
          <button onClick={demoLogin}>Demo User</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
