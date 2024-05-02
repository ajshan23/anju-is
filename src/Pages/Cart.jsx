import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import "./style.css";
import { calculateTotal, resetCart, setCart } from "../features/dstepSlice";
import Model from "../components/model/Model";
import { db } from "../auth/Firebase";
import { collection, getDocs, updateDoc, where } from "firebase/firestore";
import { query } from "firebase/database";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.totalAmount);
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const [change, setChange] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [showTick, setShowTick] = useState(false);
  // const collectionRef = db.collection("cart");
  const dbRef = collection(db, "cart");
  const cartData=useSelector(state=>state.cart)
  const navigate=useNavigate()
  const fetchCart = async () => {
    try {
      let q = query(
        dbRef,
        where("owner", "==", sessionStorage.getItem("user"))
      );
      const data = await getDocs(q);
      const documents = [];
      data.forEach((doc) => {
        documents.push(doc.data());
      });
      dispatch(setCart(documents));
      console.log("cart updated", cartData);
    } catch (error) {
      console.log("error at fetching cart in cart page", error);
    }
  };
  const handleRemove = async (id) => {
    try {
      const q = query(
        collection(db, "cart"),
        where("owner", "==", sessionStorage.getItem("user"),where("id","==", id))
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // console.log(doc.get("id"));
       if (doc.get("id")===id) {
        updateDoc(doc.ref, {
          owner:"owner@gmail.com",
        });
       } 
      });
      fetchCart()
    } catch (error) {
      console.log("error at fetching cart in product page", error);
    }
  };
  const handleConfirm = async() => {
    if (address.trim() === "" || phone.trim() === "" || pincode.trim() === "") {
      alert("All fields are required");
      return null;
    }
    setShowTick(true);
    try {
      const q = query(
        collection(db, "cart"),
        where("owner", "==", sessionStorage.getItem("user"))
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
     
        updateDoc(doc.ref, {
          owner:"owner@gmail.com",
        });
      });

      await fetchCart()
    } catch (error) {
      console.log("error at fetching cart in product page", error);
    }
  };
  const handleProceed = () => {
    if (cart.length === 0) {
      return null;
    }
    const answer = confirm("Do you want to proceed and buy?");

    if (!answer) {
      return null;
    }
    setShowModel(true);
  };
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/login")
    }
    dispatch(calculateTotal());
  }, [change, showTick, loading,handleConfirm]);

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <Fragment>
      <div className="relative w-full px-[120px] mt-1 ">
        <div className="w-full flex flex-col shadow-lg">
          <div className=" w-full text-5xl text-anju font-bold flex justify-center items-center mt-1 mb-4">
            Cart
          </div>
          <div className="w-full flex justify-center items-center text-slate-500 mb-4">
            Quality products at your DoorStep
          </div>
        </div>
        <div className="w-full grid grid-cols-3">
          <div className="col-span-2 overflow-y-scroll h-[410px] scroll-container">
            <div className="pt-2 w-[80%] grid grid-cols-1  gap-y-4">
              {cart &&
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-xl grid grid-cols-3"
                  >
                    <div className="col-span-1 my-4">
                      <img
                        src={item.image}
                        alt=""
                        className="w-36 h-36 rounded-2xl ml-10"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full h-full flex flex-col justify-center">
                        <li>Product: {item?.name}</li>
                        <li>From: {item?.resname}</li>
                        <li>Quantity: {item?.quantity}</li>
                        <li>Price: {item?.price}</li>
                        <div className="mt-4 w-full justify-start">
                          <button
                            className="px-3 py-[2px] border border-gray-600 rounded-full shadow-xl"
                            onClick={() => handleRemove(item?.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full m-3 border border-gray-300 rounded-xl shadow-xl flex flex-col items-center">
            <div className="text-anju font-lexend text-2xl pt-3">
              Price details({cart.length} products)
            </div>
            <div className="w-full pt-3 pl-10 text-lg font-lexend text-gray-800">
              Products
            </div>
            <div className="w-full h-36 pt-2 pl-10 text-gray-600 overflow-y-scroll scroll-container">
              {cart &&
                cart.map((item, index) => (
                  <div key={index} className="flex w-full justify-between pr-8">
                    <div>{item?.name}</div>
                    <div>₹{item?.price * item.quantity}</div>
                  </div>
                ))}
            </div>
            <div className="flex w-full justify-between pl-10  pr-8 font-bold">
              <div>Total</div>
              <div>₹{totalPrice}</div>
            </div>
            <button
              className="px-24 mt-3 py-2 bg-anju text-white font-lexend font-bold text-xl rounded-lg"
              onClick={handleProceed}
            >
              Proceed to buy
            </button>
          </div>
        </div>
      </div>
      <Model
        isvisible={showModel}
        onClose={() => {
          setShowModel(false);
          setAddress("");
          setPhone("");
          setPincode("");
          setShowTick(false);
        }}
      >
        {!showTick ? (
          <div className="p-6 flex flex-col">
            <div className="text-anju font-lexend text-2xl flex justify-center mb-6">
              SET YOUR ADDRESS
            </div>
            <div className="flex flex-row justify-center mb-5">
              <div>Phone :</div>
              <div className="ml-3 w-72 h-10 flex justify-center overflow-hidden border-2 rounded-lg border-anju">
                <input
                  type="number"
                  value={phone}
                  className="outline-none border-none pl-2 w-full"
                  onChange={(e) =>
                    phone.length < 10 && setPhone(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mb-5">
              <div>Address :</div>
              <div className="ml-3 w-72 h-32 flex justify-start items-start overflow-hidden border-2 rounded-lg border-anju">
                <textarea
                  value={address}
                  className="outline-none border-none pl-2 w-full h-full"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mb-10">
              <div>Pincode :</div>
              <div className="ml-3 w-72 h-10 flex justify-center overflow-hidden border-2 rounded-lg border-anju">
                <input
                  type="number"
                  value={pincode}
                  className="outline-none border-none pl-2 w-full"
                  onChange={(e) =>
                    pincode.length < 6 && setPincode(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-5 py-1 bg-anju rounded-lg text-white"
                onClick={handleConfirm}
              >
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[400px] bg-white flex flex-col justify-center items-center">
            <div className="mb-10 text-2xl font-semibold flex">
              <div className=" mr-2">DOORSTEP</div>
              <div className="text-anju">DEPORT</div>
            </div>
            <div className="mb-10 w-20 h-20 rounded-full bg-anju text-white flex justify-center items-center">
              <FaCheckCircle size={60} />
            </div>
            <div className="flex font-mono text-4xl">
              <div className="text-anju">"</div>
              <div>ORDER PLACED</div>
              <div className="text-anju">"</div>
            </div>
          </div>
        )}
      </Model>
    </Fragment>
  );
};

export default Cart;
