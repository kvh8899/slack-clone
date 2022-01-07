import "./signup.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import { Navigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  //const hist = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ email: "demo@aa.io", hashedPassword: "password" })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === confirmPassword) {
      setErrors([]);
      const data = await dispatch(sessionActions.signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else if (password !== confirmPassword) {
      setErrors([
        "Passwords need to match!",
      ]);
    }
    if (!errors.length) {
      console.log('hiiiii')
      return < Navigate to='/channel' />;
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
        <Link to="/login">Already have an account?</Link>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            required
            name='username'
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='text'
            required
            name='email'
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            required
            name='password'
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            required
            name='repeat_password'
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Continue</button>
          <button onClick={demoLogin}>Demo User</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
