import { FaSearch, FaLock } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";

const Hero = () => {
  return (
    <div className="w-full my-16 px-[120px] font-lexend">
      <div className="w-full h-[615px] flex flex-row gap-36">
        <div className="w-[580px] h-full flex flex-col gap-10">
          <div>
            <div className="w-[538px] h-[55px] rounded-full flex justify-between border border-gray-500 items-center pl-7 pr-3">
              <input
                type="text"
                name=""
                id=""
                className="outline-none bg-transparent border-none w-full h-full placeholder:font-sans"
                placeholder="search for restaurents and food"
              />
              <div className="w-8 h-8 bg-anju rounded-full flex justify-center items-center">
                <FaSearch color="white" />
              </div>
            </div>
          </div>
          <div className=" relative flex text-7xl font-semibold w-fit">
            <div>In Need</div>
            <div className="text-anju text-8xl absolute -right-8 -bottom-5">
              !
            </div>
          </div>
          <div className="flex flex-col text-5xl">
            <div>Discover the world of </div>
            <div className="flex flex-row">
              <div className="text-anju">top class</div>
              <div className="pl-4">products</div>
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <button className="w-[182px] h-[57px] bg-[#ff640a] text-white text-xl font-medium rounded-full">
              Order now
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <div>
              <div className="w-fit h-[57px] rounded-full border border-black flex justify-center items-center px-3">
                <div className="w-9 h-9 rounded-full bg-anju flex justify-center items-center">
                  <MdDeliveryDining color="white" size={25} />
                </div>
                <div className="text-sm">&nbsp;Super Fast delivery</div>
              </div>
            </div>
            <div>
              <div className="w-fit h-[57px] rounded-full border border-black flex justify-center items-center px-3">
                <div className="w-9 h-9 rounded-full bg-anju flex justify-center items-center">
                  <FaLock color="white" size={18} />
                </div>
                <div className="text-sm">&nbsp;Secure Payment</div>
              </div>
            </div>
            <div>
              <div className="w-fit h-[57px] rounded-full border border-black flex justify-start px-3 items-center">
                <div className="w-9 h-9 rounded-full bg-anju flex justify-center items-center">
                  <IoFastFood color="white" size={20} />
                </div>
                <div className="text-sm">&nbsp;Quality Product</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] h-full flex flex-col gap-6">
          <img src={img1} alt="" className="w-[475px] h-[273px]" />
          <img src={img2} alt="" className="w-[475px] h-[273px]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
