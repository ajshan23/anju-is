import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../auth/Firebase";
import Card from "../components/SingleCard/Card";

const Restaurant = () => {
    const param=useParams()
    const navigate=useNavigate()
    let resname=param.resname
    let image;
    if (resname==="charcoalshack") {
        resname="Charcoal Shake Restaurant"
        image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714282406/anju/restaurant/msc37nl020dnhruckp1z.jpg"
    }
    if(resname==="happycupheritage"){
        resname="Happy Cup Heritage"
        image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714286826/anju/restaurant/hxktiikhzb9huemgxto4.jpg"
    }
    if(resname==="thevoyager"){
        resname="The Voyager Diner (24/7)"
        image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714286955/anju/restaurant/zbn5etzuk5g4jyecqnuo.jpg"
    }
    if (resname==="diwansdarbar") {
        resname="Diwan's Durbar"
        image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714287071/anju/restaurant/ejkuo2g6kxgwwu2z2nnf.jpg"
    }
    console.log(resname);
    const [data,setData]=useState()
//   const imageUrl =
//     "https://res.cloudinary.com/djmvsz8em/image/upload/v1714282406/anju/restaurant/msc37nl020dnhruckp1z.jpg";

    const fetchData=async()=>{
        try {
          let q=query(collection(db, "items"),where("resname","==",resname))
         const data= await getDocs(q)
         const documents = [];
         data.forEach((doc) => {
           documents.push(doc.data());
         });
         console.log(documents);
       setData(documents)
        
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        if (!sessionStorage.getItem("user")) {
            navigate("/login")
          }
        fetchData()
      },[])

      if (!data) {
        return(
            <div>
              loading....
            </div>
  
        )
      }
  return (
    <div className="w-full py-6 px-[120px] my-6 ">
      <div className="flex flex-row"></div>
      <div className=" w-full text-5xl  text-anju font-bold flex justify-center items-center my-4">
        {/* {title.categoryName} */}
        {resname} 
      </div>
      <div className="w-full flex justify-center">
        <img src={image} className="w-96 h-40 flex flex-col shadow-lg  " />
      </div>

      <div className="py-10 pl-10 mt-10 grid gap-y-20 grid-cols-4 border-t-2 ">
        {data && data.map((item,index)=>(
          <div key={index}>
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
