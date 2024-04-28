import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import TopPicks from "../TopPicks/TopPicks";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/dstepSlice";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../auth/Firebase";

const Product = () => {
  const [count, setCount] = useState(1);
  const [product,setProduct] = useState([])
  const [relatedProduct,setRelatedProduct] = useState([])
  const { categoryType,productId } = useParams();
  // console.log(productId);
  // console.log(categoryType);

  const dispatch = useDispatch();
  const [notification,setNot]=useState(false)
  const dbRef = collection(db, "cart");

  const cartData=useSelector(state=>state.cart)
  const handleAddTocart = async() => {
    
    try {
      await addDoc(dbRef,{
        id:product[0]?.id,
        name:product[0]?.name,
        image:product[0]?.image,
        resname:product[0]?.resname,
        price:product[0]?.price,
        quantity:count,
        owner:sessionStorage?.getItem("user")
      }).then((docRef)=>{
        setNot(true)
        // console.log("return data:",docRef);
        fetchCart()
        setTimeout(() => {
          setNot(false)
        }, 2000);
      })
    } catch (error) {
      setNot(false)
      console.log("Error at cart creation",error);
    }
  };

  const fetchCart=async()=>{
    try {
     
      let q=query(dbRef,where("owner","==",sessionStorage.getItem("user")))
      const data= await getDocs(q)
      const documents = [];
      data.forEach((doc) => {
        documents.push(doc.data());
      });
      dispatch(setCart(documents))
     console.log("cart updated",cartData);

    } catch (error) {
      console.log("error at fetching cart in product page",error);
    }
  }
  const fetchData = async() =>{
    try {
      let q=query(collection(db, "items"),where("id","==",productId))
     const data= await getDocs(q)
     const documents = [];
     data.forEach((doc) => {
       documents.push(doc.data());
     });
     setProduct(documents)
     
    } catch (error) {
      console.log(error);
    }
  }
  const fetchRelated = async() =>{
    // console.log(categoryType);
    try {
      let q=query(collection(db, "items"),where("category","==",categoryType),where("id","!=",productId))
     const data= await getDocs(q)
     const documents = [];
     await data.forEach((doc) => {
       documents.push(doc.data());
     });
     setRelatedProduct(documents)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
    fetchRelated()
    
  },[productId])

  if (!product[0]) {
    return(
      <div>
        loading....
      </div>
    )
  }
  return (
    <div>
      {notification && <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Your item:</strong>
        <span className="block sm:inline">&nbsp;{product[0]?.name} Added to cart</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-anju"
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
                <img src={product[0]?.image} alt="" className="rounded-lg w-96 h-96" />
              </div>
            </div>
          </div>
          <div className="w-full h-full pl-[25px] flex flex-col">
            <div className="font-lexend text-2xl pb-[23px]">{product[0]?.name}</div>
            <div className="pl-[25px] pb-[27px]">
              <ul className="list-disc font-lexend text-sm text-slate-600">
                <li>
                A tasty and delicious dish 
                </li>
                <li>Rich in flavor, packed with nutrients, and versatile in cooking</li>
                <li>
                Bursting with taste, nutritional goodness, and culinary adaptability.
                </li>
                <li>Deliciously satisfying, nutritionally balanced, and endlessly versatile.</li>
                <li>Flavorful, nutritious, and adaptable to various culinary styles.</li>
              </ul>
            </div>
            <div className="flex flex-row font-lexend pb-[25px]">
              <div className="flex flex-col pr-[52px] ">
                <h1 className="font-bold pb-[18px]">Product Code</h1>
                <p className=" text-slate-600">{product[0]?.id}</p>
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
                  ₹{product[0]?.price}
                </div>
                <div className="px-3 py-[2px] bg-[#14AD36] text-white rounded-full flex flex-row justify-center items-center">
                  <IoMdStar />
                  &nbsp;4.5
                </div>
              </div>
              <div className="redtext font-lexend text-anju text-sm">
                From :{product[0]?.resname}
              </div>
              
              <div className="freedelivery text-sm flex text-[#666666]">
                Free delivery <div className="redtext font-lexend text-anju text-sm">
                Note:For more details call @987654321.
              </div>
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
        data={relatedProduct.slice(0,4)}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
    
  );
};

export default Product;
