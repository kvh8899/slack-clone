import "./App.css";
// import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import SignUp from "./SignUp";
import Splash from "./Splash";
import Workspace from "./Workspace"
import { Routes, Route } from "react-router-dom";
function App() {
  // organization page:
  return (
      <Routes>
        <Route path="/organization" element ={<Workspace />}> </Route>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
  );
}

export default App;
