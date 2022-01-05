import "./authpage.css";
import {Link} from "react-router-dom"
function AuthPage() {
  return (
    <div className="wrapper authwrapper">
      <div className="auth">
        <div className="namelogo">
          <img src="./zinglogo.png" alt="logo"></img>
          <h2>Zing</h2>
        </div>
        <p> Sign in to your workspace.</p>
        <Link to="/signup">Don't have an account?</Link>
        <form onSubmit={(e) => {
            e.preventDefault()
        }}>
          <input type="text" placeholder={"Email"} required></input>
          <input type="password" placeholder={"Password"} required></input>
          <button>Continue</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
