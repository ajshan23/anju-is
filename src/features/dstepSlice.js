import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialstate={
    cart:[],
    accessToken:"",
    totalAmount:0,
    
}

export const ecomSlice=createSlice({
    name:"ecom",
    initialState:initialstate,
    reducers:{
        addTocart:(state,action)=>{
            let item={
                cartid:nanoid(),
                ...action.payload
            }
            state.cart.push(item)
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
                temp+=element.price
            });
            state.totalAmount=temp;
        },
        resetCart:(state)=>{
            state.cart=[];
        }

    }
})

export const {removeFromCart,addTocart,updateAccessToken,calculateTotal,resetCart}=ecomSlice.actions

export default ecomSlice.reducer;