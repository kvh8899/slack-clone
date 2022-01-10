import "./App.css";
import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import SignUp from "./SignUp";
import Splash from "./Splash";
import Workspace from "./Workspace"
import { Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { authenticate } from './store/session';
function App() {
  // organization page:
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
      <Routes>
        <Route path="/organization" element ={<Workspace />}> </Route>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/organizations/:id" element={<Orgmainchat />}></Route>
      </Routes>
  );
}

export default App;
