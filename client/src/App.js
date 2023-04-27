import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";

//pages & components 
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext()
  // const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes> 
          <Route path="/" element={user ? <Home/> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
