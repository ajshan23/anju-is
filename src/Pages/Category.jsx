import React, { useEffect, useState } from 'react'
import { FaSortAmountDownAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Card from '../components/SingleCard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setFood, setGrocery, setMeds } from '../features/dstepSlice';
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import { useNavigate, useParams } from 'react-router-dom';

const Category = ({section}) => {

  const navigate=useNavigate()

  const title=useParams()
  console.log(title.categoryName);
  const [data,setData]=useState()
  console.log("data",data);
 
  const fetchData=async()=>{
    try {
      let q=query(collection(db, "items"),where("category","==",title.categoryName))
     const data= await getDocs(q)
     const documents = [];
     data.forEach((doc) => {
       documents.push(doc.data());
     });
     console.log(documents);
    //  dispatch(setItems(documents))
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
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className='w-full px-[120px] my-12 '>
      <div className='w-full flex flex-col shadow-lg'>
            <div className=' w-full text-5xl text-anju font-bold flex justify-center items-center my-4'>
                {title.categoryName}
            </div>
            <div className='w-full flex justify-center items-center text-slate-500 mb-4'>
                Quality products at your DoorStep
            </div>
            <div className='w-full flex flex-row justify-center items-center gap-4 pb-8'>
                    <div className='flex flex-row gap-3 justify-center items-center border border-slate-500  py-2 rounded-full shadow-xl'>
                        <div className='pl-3'>Sort By</div>
                        <div className='pr-3'><FaSortAmountDownAlt color='gray' /></div>
                    </div>
                    <div className='flex flex-row gap-3 justify-center items-center border border-slate-500  py-2 rounded-full shadow-xl'>
                        <div className='pl-3'>4+ rating</div>
                        <div className='pr-3'><CiStar color='gray' size={25} /></div>
                    </div>
                    <div className='flex flex-row gap-3 justify-center items-center border border-slate-500  py-2 rounded-full shadow-xl'>
                        <div className='px-3'>Rs 50-100</div>
                        
                    </div>
                    <div className='flex flex-row gap-3 justify-center items-center border border-slate-500  py-2 rounded-full shadow-xl'>
                        <div className='px-3'>Rs 100-250</div>
                    </div>
            </div>
      </div>
      <div className='ml-20 mt-10 grid gap-y-10 grid-cols-4'>
        {data && data.map((item,index)=>(
          <div key={index}>
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
    // <div></div>
  )
}

export default Category
