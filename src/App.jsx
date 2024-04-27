import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";


const App = () => {
  const location=useLocation()
  // console.log(location.pathname);
  return (
    <div>
      {location.pathname==="/login"||location.pathname==="/signup" ?<></>:<Navbar />}
      <Outlet />
      {location.pathname==="/login"||location.pathname==="/signup" ?<></>:<Footer />}

    </div>
  );
};

export default App;
