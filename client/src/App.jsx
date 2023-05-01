import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import data from "@emoji-mart/data"
import { init } from 'emoji-mart'

import "./App.css";

//pages & components 
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateWatchlist from "./components/CreateWatchlist";
import Search from "./pages/Search";
import DetailMedia from "./components/DetailMedia";

function App() {
  init({ data })
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
          <Route path="/createWatchlist"  element={<CreateWatchlist/>}/>
          <Route path="/search/:watchlistId"  element={<Search/>}/>
          <Route path="/search"  element={<Search/>}/>
          <Route path="/detail/:mediaType/:mediaId"  element={<DetailMedia/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
