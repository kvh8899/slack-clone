import "./App.css";
//import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import SignUp from "./SignUp";
import Splash from "./Splash";
import Workspace from "./Workspace"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  // organization page:
  //<Route path="/channel" element={<Orgmainchat />}></Route>
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/organization" element ={<Workspace />}> </Route>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
