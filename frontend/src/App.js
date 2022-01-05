import "./App.css";
//import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import Splash from "./Splash"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  //<Route path="/channel" element={<Orgmainchat />}></Route>
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/login" element={<AuthPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
