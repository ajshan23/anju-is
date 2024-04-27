import React, { useEffect, useState } from "react";
import Card from "../SingleCard/Card";

const TopPicks = ({title,desc,data}) => {
  const [show,setShow]=useState()
  // console.log(data);
  useEffect(()=>{
    window.scrollTo(0,0)
    setShow(data)
  },[data])

  return (
    <div className="w-full px-[120px] flex flex-col">
      <div className="text-3xl font-bold mb-4">{title}</div>
      <div className="text-lg font-medium mb-9">
        {desc}
      </div>
      <div className="grid grid-cols-4">
        {show && show.map((item,index)=>(
          <div key={index}>
            <Card data={item}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
