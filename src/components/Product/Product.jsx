import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import TopPicks from "../TopPicks/TopPicks";
import { foods, grocery, medicine } from "../../features/productData";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../../features/dstepSlice";

const Product = () => {
  const [count, setCount] = useState(1);
  const { productId } = useParams();
  const allProducts = [...foods, ...medicine, ...grocery];
  const product = allProducts.find((e) => e.id === Number(productId));
  const dispatch = useDispatch();
  const [notification,setNot]=useState(false)
  const handleAddTocart = () => {
    setNot(true)
    dispatch(addTocart(product));
    setTimeout(() => {
      setNot(false)
    }, 2000);
  };
  return (
    <div>
      {notification && <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Your item:</strong>
        <span class="block sm:inline">&nbsp;{product.name} Added to cart</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-anju"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>}
      <div className="pt-[40px] px-[120px] w-full flex flex-col justify-center items-center mb-8">
        <div className="w-full h-[420px] flex flex-row">
          <div className="w-[40%] h-full pr-[25px] border-r border-[#F01F26]">
            <div className="flex flex-col h-full w-ful justify-center items-center">
              <div className=" flex justify-center items-center">
                <img src={product.image} alt="" className="rounded-lg" />
              </div>
            </div>
          </div>
          <div className="w-full h-full pl-[25px] flex flex-col">
            <div className="font-lexend text-2xl pb-[23px]">{product.name}</div>
            <div className="pl-[25px] pb-[27px]">
              <ul className="list-disc font-lexend text-sm text-slate-600">
                <li>
                  Die cut from single wall high quality 40 BF imported kraft
                  liner
                </li>
                <li>E Flute 2.1 mm wall thickness & 25 ECT construction</li>
                <li>
                  Great for shipping, as subscription boxes, gift boxes, and
                  e-commerce packaging
                </li>
                <li>Sustainably sourced & environmentally responsible</li>
                <li>Custom printed mailers: Print both outside & inside</li>
              </ul>
            </div>
            <div className="flex flex-row font-lexend pb-[25px]">
              <div className="flex flex-col pr-[52px] ">
                <h1 className="font-bold pb-[18px]">Product Code</h1>
                <p className=" text-slate-600">{product.id}</p>
              </div>
              <div className="flex flex-col ">
                <h1 className="font-bold pb-[18px]">Quantity</h1>
                <div className="flex flex-row ">
                  <button
                    className="px-[24px] py-[8px] border-2  border-anju mr-[4px] cursor-pointer"
                    onClick={() => {
                      if (count <= 0) {
                        return null;
                      }
                      setCount(count - 1);
                    }}
                  >
                    -
                  </button>
                  <div className="w-full flex justify-center items-center px-4 cursor-pointer">
                    {count}
                  </div>
                  <button
                    className="px-[24px] py-[8px] border-2 border-anju"
                    onClick={() => {
                      if (count >= 5) {
                        return null;
                      }
                      setCount(count + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="priceandrating flex flex-row gap-3">
                <div className="font-lexend text-2xl font-bold">
                  ₹{product.price}
                </div>
                <div className="px-3 py-[2px] bg-[#14AD36] text-white rounded-full flex flex-row justify-center items-center">
                  <IoMdStar />
                  &nbsp;4.5
                </div>
              </div>
              <div className="redtext font-lexend text-anju text-sm">
                Note:For more details call @987654321.
              </div>
              <div className="freedelivery text-sm text-[#666666]">
                Free delivery
              </div>
            </div>
            <div className="finaldiv flex flex-row w-full  justify-between">
              <div className="flex flex-row gap-5 mt-4 font-semibold">
                <button
                  className="addtocart py-[14px] px-[44px] border-2 border-anju text-anju "
                  onClick={handleAddTocart}
                >
                  Add To Bag
                </button>
                <button className="buynow  py-[14px] px-[44px] border-2 border-[#14AD36] text-[#14AD36]">
                  BUY NOW
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="pl-1">
                  <CiShare2 size={30} />
                </div>
                <div className="text-[#66666]">Share</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b  border-[#F01F26] w-full pb-[44px] flex flex-row justify-around items-center"></div>
      </div>

      <TopPicks
        title="Related Products"
        data={allProducts.filter(
          (elem) => elem.category === product.category && elem.id !== product.id
        )}
      />
      <br />
      <br />
    </div>
  );
};

export default Product;
