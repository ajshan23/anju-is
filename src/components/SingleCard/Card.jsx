import React from "react";

import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({data}) => {
  return (
    <Link to={`/product/${data.category}/${data.id}`}>
    <div className="h-[350px] w-[256px] flex flex-col ">
      <img
        src={data.image}
        alt=""
        className="w-[256px] h-[232px] bg-cover bg-center rounded-3xl"
      />
      <div className="pt-3 w-full flex justify-between items-center px-1">
        <div className="font-bold text-lg">{data.name}</div>
        <div className="w-12  rounded-full bg-[#14AD36] text-white flex justify-around items-center">
          <div className="pl-2">
            <FaStar size={10} />
          </div>
          <div className="mr-3 text-sm">&nbsp;4.5</div>
        </div>
      </div>
      <div className="pl-[2px] pt-[2px] text-lg text-slate-500">Explore the most delicious indian dish near you...</div>
      <div className=" pt-1 flex justify-between">
        <div className="px-[5px] font-bold font-lexend">₹{data.price}</div>
        <div><FaHeart color=" #FF7629" /></div>
      </div>
    </div>
    </Link>
  );
};

export default Card;
