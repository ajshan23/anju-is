import React, { useEffect } from "react";
import Hero from "../components/hero/Hero";
import TopPicks from "../components/TopPicks/TopPicks";
import ResNearYou from "../components/ResNearYou/ResNearYou";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const auth=useSelector(state=>state.accessToken)
  const navigate=useNavigate()
  const data=useSelector(state=>state.item)
  useEffect(()=>{
    if (!sessionStorage.getItem("user")) {
      navigate("/login")
    }
    if(!auth){
      navigate('/login')
    }
  },[])
  return (
    <div>
      <Hero />
      <div className="px-[120px]  w-full mb-24" id="purchase">
        <div className="w-full flex flex-col">
          <div className="mb-4 text-3xl font-bold">Featured product's</div>
          <div className="mb-16 text-xl text-slate-600">
            Find the popular dishes and medicine from the best near you{" "}
          </div>
          <div className="grid grid-cols-7">
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707301425/anju/gjqjswsvtncan0ywxuzc.jpg" alt="" className="w-20 rounded-xl  bg-cover " />
              <div>Indian</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707301566/anju/guaacvcguoopxr7vtimh.jpg" alt="" className="w-20 rounded-xl   bg-cover " />
              <div>Latin American</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707312687/anju/lt0akyfobb2kpmsxv0pf.jpg" alt="" className="w-20 rounded-xl  bg-cover " />
              <div>Chinease</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707312922/anju/vm3gnavipls5ogkreqrt.jpg" alt="" className="w-20 rounded-xl   bg-cover " />
              <div>Mexican</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707313498/anju/gcfkx7ca6qxyzzvu5eta.png" alt="" className="w-20 rounded-xl   bg-cover " />
              <div>Thai</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707313155/anju/iqcspjdbeu2jr0dl5orx.jpg" alt="" className="w-20 rounded-xl   bg-cover " />
              <div>Sreelankhan</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707313292/anju/nkzv7m3vawdvteyyfqdi.jpg" alt="" className="w-20 rounded-xl  bg-cover " />
              <div>Spanish</div>
            </div>
           
          </div>
        </div>
      </div>
      <div className="mb-24">
     {data && <TopPicks data={data?.slice(0,4)} title="Top Picks" desc="Find the popular dishes from best restaurents near you"/>}
      </div>
      <div className="mb-24">
      {data && <TopPicks data={data?.slice(-4)} title="Popular Dishes" desc="Find the popular dishes from the best restaurent near you"/>}
      </div>
      <div className="mb-24">
        <ResNearYou />
      </div>
      <div className="mb-24">
      {data && <TopPicks data={data?.slice(2,6)} title="Now on Trending" desc="Find the popular dishes from the best restaurent near you"/>}
      </div>
    </div>
  );
};

export default Home;
