import "./signup.css"
import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import * as sessionActions from '../store/session'

function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ email: 'demo@aa.io', hashedPassword: 'password' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signUp({ username, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };


  return (
    <div className="wrapper authwrapper">
      <div className="auth">
        <div className="namelogo">
          <img src="./zinglogo.png" alt="logo"></img>
          <h2>Zing</h2>
        </div>
        <p>Create an Account</p>
        <ul>
          {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
        </ul>
        <Link to="/login">Already have an account?</Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Username"}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Email"}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <input
            type="password"
            placeholder={"Password"} required
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <input
            type="password"
            placeholder={"Confirm Password"} required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
          <button>Continue</button>
          <button onClick={demoLogin}>Demo User</button>
        </form>
      </div>
    </div >
  )
}

export default SignUp
