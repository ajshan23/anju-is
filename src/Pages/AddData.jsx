import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../auth/Firebase';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
    const dbRef = collection(db, "items");
    const [id,setId]=useState()
    const [name,setName]=useState("")
    const [image,setImage]=useState("")
    const [resname,setresname]=useState("")
    const [category,setCategory]=useState("")
    const [price,setPrice]=useState("")
    const [place,setPlace]=useState("")
    const navigate=useNavigate()

    const addData=async()=>{
        try {
            await addDoc(dbRef,{
                id:id,
                name:name,
                image:image,
                resname:resname,
                category:category,
                price:price,
                place:place,
            }).then(()=>{
                alert("added successfully")
                setId("")
                setName("")
                setImage("")
                setPrice("")
                setPlace("")
                setresname("")
                setCategory("")
            })

        } catch (error) {
            console.log(
                "error at saving doc at addData ",error
              );
        }
    }
    useEffect(()=>{
        if (sessionStorage.getItem("admin")!=="anju@gmail.com") {
            navigate("/login")
        }
    })
  return (
    <div className='flex flex-col gap-2 justify-center items-center py-10'>
    <div>id : <input type='number'  className='border-2 border-black outline-none' value={id} onChange={(e)=>setId(e.target.value)}/></div>
    <div>name : <input type='text'  className='border-2 border-black outline-none'value={name} onChange={(e)=>setName(e.target.value)}/></div>
    <div>image : <input type='text'  className='border-2 border-black outline-none'value={image} onChange={(e)=>setImage(e.target.value)}/></div>
    <div>res name : <input type='text'  className='border-2 border-black outline-none'value={resname} onChange={(e)=>setresname(e.target.value)}/></div>
    <div>category : <input type='text' className='border-2 border-black outline-none' value={category} onChange={(e)=>setCategory(e.target.value)}/></div>
    <div>price : <input type='number' className='border-2 border-black outline-none' value={price} onChange={(e)=>setPrice(e.target.value)}/></div>
    <div>place : <input type='text'  className='border-2 border-black outline-none' value={place} onChange={(e)=>setPlace(e.target.value)}/></div>
    <div><button className=' px-3 py-1 rounded-md bg-black text-white'onClick={addData} >Add data</button></div>

    </div>
  )
}

export default AddData
