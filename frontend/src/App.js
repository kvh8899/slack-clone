import "./App.css";
// import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import SignUp from "./SignUp";
import Splash from "./Splash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  // organization page:
  return (
    <Routes>
      <Route path="/" element={<Splash />} exact={true}></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {/* <Route path="/channel" element={<Orgmainchat />}></Route> */}
    </Routes>
  );
}

export default App;
