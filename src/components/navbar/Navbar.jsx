import React, { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink as Linkh } from "react-router-hash-link";
const Navbar = () => {
  const cart=useSelector(state=>state.cart)
  const [menu,setMenu]=useState("home")
  
  return (
    <div className=" font-lexend flex flex-col justify-center items-center w-full h-[79px] border shadow-md ">
      <div className="py-[27px] flex flex-row w-full px-[120px] justify-between">
        <div className=" text-2xl font-semibold flex">
          <div className=" mr-2">DOORSTEP</div>
          <div className="text-anju">DEPORT</div>
        </div>
        <div className="flex flex-row gap-[118px] justify-center items-center">
          <div className="flex gap-[28px]  text-sm font-light">
            <div className={`group hover:text-anju ${menu==="home"?"text-anju":""}`}onClick={()=>setMenu("home")}><Link to="/" style={{textDecoration:'none'}}>Home</Link></div>
            <div className={`group hover:text-anju ${menu==="products"?"text-anju":""}`} onClick={()=>setMenu("products")}><Link to="/menu" style={{textDecoration:'none'}}>Menu</Link></div>
            <div className={`group hover:text-anju `} onClick={()=>setMenu("about")}>About</div>
            <div className={`group hover:text-anju `} ><Linkh to="#contact" style={{textDecoration:'none'}} smooth>Contact</Linkh></div>
            <div className="group hover:text-[#F01F26]">ENG</div>
          </div>
          <div className="flex gap-[28px]">
            <div>
              <FaHeart size={20} color="#FF843F" />
            </div>
            <Link to="/cart" style={{textDecoration:'none'}}>
            <div className="flex relative">
              <IoBagHandle size={20} color="#FF843F" className="z-10" />
              <div className="absolute w-4 h-4 bg-anju rounded-full -right-2 -top-1 z-0"></div>
              <div className="absolute text-white -right-1 -top-1 text-xs">{cart.length || 0}</div>
            </div>
            </Link>

            
            <div>
              <FaUser size={20} color="#FF843F" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
