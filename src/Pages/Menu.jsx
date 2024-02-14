import React, { useEffect } from "react";
import TopPicks from "../components/TopPicks/TopPicks";
import foodpic1 from "../assets/foodpic.jpg";
import grocery1 from "../assets/grocery.jpg";
import medicine1 from "../assets/medicine.jpg";
import { foods, grocery, medicine } from "../features/productData";
import { Link } from "react-router-dom";
const Menu = () => {
  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      navigate('/login')
    }
  },[])
  return (
    <div className="mb-10">
      <div className="px-[120px] w-full mb-24">
        <div className="w-full flex flex-col">
          <div className="my-12 text-5xl font-bold">Category</div>

          <div className="grid grid-cols-7">
            <Link to="/food">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={foodpic1}
                  alt=""
                  className="w-[90px] h-[90px]  bg-cover rounded-xl "
                />
                <div>Food</div>
              </div>
            </Link>
            <Link to="/grocery">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={grocery1}
                  alt=""
                  className="w-[90px] h-[90px]  bg-cover rounded-xl "
                />
                <div>Groceries</div>
              </div>
            </Link>
            <Link to="/medicine">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={medicine1}
                  alt=""
                  className="w-[90px] h-[90px]  bg-cover rounded-xl"
                />
                <div>Medicine</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <TopPicks
        data={foods.slice(-4)}
        title="Most loved food items"
        desc="Our customers top pics"
      />
      <br />
      <br />
      <br />
      <TopPicks
        data={grocery.slice(-4)}
        title="Healthy Grocery Items"
        desc="Do not compromise up on your health,we brings you nest quality products"
      />
      <br />
      <br />
      <br />
      <TopPicks
        data={medicine.slice(-4)}
        title="Essential medicine's for you day to day use"
        desc="Quality in cheap price"
      />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Menu;
