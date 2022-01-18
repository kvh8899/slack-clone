import "./App.css";
import Orgmainchat from "./Orgmainchat";
import AuthPage from "./AuthPage";
import SignUp from "./SignUp";
import Splash from "./Splash";
import Workspace from "./Workspace"
import WorkspaceCreate from "./WorkspaceCreate";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authenticate } from './store/session';
import About from './about'
import NotFound from "./NotFound";

function App() {
  // organization page:
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
    <Routes>
      <Route path="/organization" element={<Workspace />}> </Route>
      <Route path="/" element={<Splash />}></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/organizations/:id/channels/:channelId" element={<Orgmainchat />}></Route>
      <Route path="/users/:id/organizations" element={<WorkspaceCreate />}></Route>
      <Route path="/NotFound" element={<NotFound />}></Route>
      <Route path="/About" element={<About />}></Route>
    </Routes>
  );
}

export default App;
