import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Layout from "./Layout";
import Settings from "./components/Settings";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import PasswordUpdate from "./components/PasswordUpdate";
import useStore from "./store";
import CreateNote from "./components/CreateNote";

function App() {
  const navigate = useNavigate();
  const { user, setUser, userLogin, userLogout, Reload, setTheme } = useStore();
  useEffect(() => {
    setUser();
  }, [userLogin, userLogout, Reload]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element=<Home /> />
        <Route
          path="/createnote"
          index
          element={user ? <CreateNote /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/Settings"
          element={user ? <Settings /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/Signin"
          element={!user ? <Signin /> : <Navigate to="/" replace />}
        />
        <Route
          path="/Signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />
        <Route path="/Passwordupdate" element={<PasswordUpdate />} />
      </Route>
    </Routes>
  );
}

export default App;
