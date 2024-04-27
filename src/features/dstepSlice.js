import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialstate={
    cart:[],
    accessToken:"",
    totalAmount:0,
    item:[],
    place:"all",
    meds:[],
    grocery:[],
    isLoading:false,
    
    
}

export const ecomSlice=createSlice({
    name:"ecom",
    initialState:initialstate,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        removeFromCart:(state,action)=>{
            state.cart=state.cart.filter((car)=>car.cartid!==action.payload)
        },
        updateAccessToken:(state,action)=>{
            state.accessToken=action.payload
        },
        calculateTotal:(state)=>{
            
            let temp=0;
            state.cart.forEach(element => {
                // console.log(element);
                temp+=(Number(element.price)*(Number(element.quantity)))
                // console.log(temp);
            });
            state.totalAmount=temp;
        },
        resetCart:(state)=>{
            state.cart=[];
        },
        setItems:(state,action)=>{
            state.item=action.payload;
        },
        setPlacein:(state,action)=>{
            state.place=action.payload;
        },
        setMeds:(state,action)=>{
            state.meds=action.payload;
        },
        setGrocery:(state,action)=>{
            state.grocery=action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        }

    }
})

export const {removeFromCart,setCart,updateAccessToken,calculateTotal,resetCart,setItems,setPlacein,setMeds,setGrocery,setLoading}=ecomSlice.actions

export default ecomSlice.reducer;