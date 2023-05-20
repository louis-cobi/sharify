import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import data from "@emoji-mart/data"
import { init } from 'emoji-mart'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

//pages & components 
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import DetailMedia from "./components/DetailMedia";
import Watchlist from "./pages/Watchlist";
import CreateWatchlist from "./pages/CreateWatchlist";
import UpdateWatchlist from "./pages/UpdateWatchlist"
import SendResetPassword from "./pages/SendResetPassword"
import ResetPassword from "./pages/ResetPassword"
import Profil from "./pages/Profil";

function App() {
  init({ data })
  const { user } = useAuthContext()

  const [updateUser, setUpdateUser] = useState(false)

  const handleUserUpdate = () => {
    setUpdateUser(true);
  }
  // const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer 
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          //theme={themeMode}
        />
        <Header updateUser={updateUser}/>
          <Routes> 
            <Route path="/" element={user ? <Home/> : <Navigate to={"/login"} />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/profil" element={<Profil onUserUpdate={handleUserUpdate}/>} />
            <Route path="/watchlist/:watchlistId"  element={<Watchlist/>}/>
            <Route path="/createWatchlist"  element={<CreateWatchlist />}/>
            <Route path="/watchlist/update/:watchlistId"  element={<UpdateWatchlist />}/>
            <Route path="/search/:watchlistId"  element={<Search/>}/>
            <Route path="/search"  element={<Search/>}/>
            <Route path="/detail/:mediaType/:mediaId"  element={<DetailMedia/>}/>
            <Route path="/reset-password"  element={<SendResetPassword/>}/>
            <Route path="/reset-password/:id/:token"  element={<ResetPassword/>}/>
          </Routes>
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
