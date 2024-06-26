import paragon from "../../assets/paragon.png";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import fivestar from "../../assets/5star.png"
import { Link } from "react-router-dom";
const ResCard = ({title,image,param}) => {

  let loc;

  if (param==="charcoalshack") {
    loc="kaloor"
  }
  if(param==="happycupheritage"){
    loc="kaloor"
  }
  if(param==="thevoyager"){
    loc="kakkanad"
  }
  if(param==="diwansdarbar"){
    loc="kakkanad"
  }

  return (
    <Link to={`/restaurant/${param}`}>
    <div className="h-[350px] w-[256px] flex flex-col ">
      <img
        src={image}
        alt=""
        className="w-[256px] h-[232px] bg-cover bg-center rounded-3xl"
      />
      <div className="pt-3 w-full flex justify-between items-center px-1">
        <div className="font-bold text-">{title || "no"}</div>
        <img src={fivestar} alt="" className="h-3 w-16"/>
      </div>
      <div className="pl-[2px] pt-[2px] text-lg text-slate-500">
        Explore the most delicious food from the best{" "}
      </div>
      <div className=" pt-1 flex justify-between">
        <div className="flex flex-row gap-3">
        <div className="w-6 h-6 ml-2 rounded-full flex justify-center items-center bg-[#14AD36]">
          <FaLocationDot color="white" size={13} />
        </div>
        {loc}
        </div>
       
        <div className="flex ">
         <FaHeart color="#FF7629"/>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ResCard;
