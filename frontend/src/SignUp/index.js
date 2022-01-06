import "./signup.css"
import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import * as sessionActions from '../store/session'
import {useNavigate} from "react-router-dom"

function SignUp() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ email: 'demo@aa.io', hashedPassword: 'password' }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      await dispatch(sessionActions.signUp({ username, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }else if(password !== confirmPassword){
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
    if(!errors.length){
      // redirect to organization page
    }
    
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
            name="username"
            placeholder={"Username"}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder={"Email"}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <input
            type="password"
            name="password"
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
          <button type='submit'>Continue</button>
          <button onClick={demoLogin}>Demo User</button>
        </form>
      </div>
    </div >
  )
}

export default SignUp
