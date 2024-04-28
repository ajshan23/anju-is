import React, { useEffect, useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HashLink as Linkh } from "react-router-hash-link";
import {query,getDocs, collection, where} from "firebase/firestore"
import {db} from "../../auth/Firebase"
import { calculateTotal, setCart, setItems, setLoading, setPlacein } from "../../features/dstepSlice";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [menu, setMenu] = useState("home");
  const [place, setPlace] = useState("Kakkanad");
  const dbRef = collection(db, "cart");
  const dispatch=useDispatch()
  const location=useLocation()
  console.log(location);
 

  const fetchPlace=async()=>{
    try {
      let q=query(collection(db, "items"),where("place","==",place),where("category","==","food"))
      // let q1=query(collection(db, "items"),where("place","==","kakkanad"),where("category","==","food"))
     const data= await getDocs(q)
     const documents = [];
     data.forEach((doc) => {
       documents.push(doc.data());
     });
     console.log(documents);
     dispatch(setItems(documents))
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAll=async()=>{
    try {
      let q=query(collection(db, "items"),where("category","==","food"))
     const data= await getDocs(q)
     const documents = [];
     data.forEach((doc) => {
       documents.push(doc.data());
     });
     console.log(documents);
     dispatch(setItems(documents))
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCart=async()=>{
    try {
      dispatch(setLoading(true))
      let q=query(dbRef,where("owner","==",sessionStorage.getItem("user")))
      const data= await getDocs(q)
      const documents = [];
      data.forEach((doc) => {
        documents.push(doc.data());
      });
      dispatch(setCart(documents))
      dispatch(setLoading(false))

    } catch (error) {
      console.log("error at fetching cart in product page",error);
      dispatch(setLoading(false))
    }
  }

  const handleLogout=(()=>{
    sessionStorage.clear()
    window.location.reload()
  })

  useEffect(()=>{
   console.log(place);
   dispatch(setPlacein(place))
    if (place=="all") {
      console.log("exec");
      fetchAll();
      
    }else{
      fetchPlace()
      fetchCart()
      dispatch(calculateTotal());
    }
      
  },[place])

  
  return (
    <div className=" font-lexend flex flex-col justify-center items-center w-full h-[79px] border shadow-md ">
      <div className="py-[27px] flex flex-row w-full px-[120px] justify-between">
        <div className=" text-2xl font-semibold flex">
          <div className=" mr-2">DOORSTEP</div>
          <div className="text-anju">DEPORT</div>
        </div>
        <div className="flex flex-row gap-[118px] justify-center items-center">
          <div className="flex gap-[28px]  text-sm font-light">
           {
            location.pathname==="/" &&  <div>
            <select name="" id="" value={place} onChange={(e)=>setPlace(e.target.value)} className="outline-none text-anju">
              <option value="all">Eranankulam</option>
              <option value="Kakkanad">Kakkanad</option>
              <option value="kaloor">Kaloor</option>
              {/* <option value="edapally">Edapally</option> */}
            </select>
          </div>
           }
            <div
              className={`group hover:text-anju ${
                menu === "home" ? "text-anju" : ""
              }`}
              onClick={() => setMenu("home")}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </div>
            <div
              className={`group hover:text-anju ${
                menu === "products" ? "text-anju" : ""
              }`}
              onClick={() => setMenu("products")}
            >
              <Link to="/menu" style={{ textDecoration: "none" }}>
                Menu
              </Link>
            </div>
            {/* <div
              className={`group hover:text-anju `}
              onClick={() => setMenu("about")}
            >
              About
            </div> */}
            <div className={`group hover:text-anju `}>
              <Linkh to="#contact" style={{ textDecoration: "none" }} smooth>
                Contact
              </Linkh>
            </div>
            <div className="group hover:text-[#F01F26]">ENG</div>
          </div>
          <div className="flex gap-[28px] justify-center items-center">
            <div>
              <FaHeart size={20} color="#FF843F" />
            </div>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <div className="flex relative">
                <IoBagHandle size={20} color="#FF843F" className="z-10" />
                <div className="absolute w-4 h-4 bg-anju rounded-full -right-2 -top-1 z-0"></div>
                <div className="absolute text-white -right-1 -top-1 text-xs">
                  {cart.length || 0}
                </div>
              </div>
            </Link>

            <div>
              <button className="px-3 py-1 border-2 border-anju rounded-full" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
