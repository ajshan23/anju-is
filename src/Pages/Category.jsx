import React, { useState } from 'react'
import { FaSortAmountDownAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Card from '../components/SingleCard/Card';

const Category = ({title,data}) => {
  const [show,setShow]=useState(data)
  console.log(data);
  return (
    <div className='w-full px-[120px] my-12 '>
      <div className='w-full flex flex-col shadow-lg'>
            <div className=' w-full text-5xl text-anju font-bold flex justify-center items-center my-4'>
                {title}
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
        {show && show.map((item,index)=>(
          <div key={index}>
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
