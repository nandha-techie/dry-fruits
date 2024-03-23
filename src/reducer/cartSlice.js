import { createSlice } from "@reduxjs/toolkit"


const fetchFromLocalStorage = ()=>{
    
    let cart = localStorage.getItem("carts");

    if(cart){
        return JSON.parse(cart);
    }else{
        return [];
    }
}

const initialState = {
    carts: fetchFromLocalStorage(),
    totalQuantity: 0,
    totalAmount : 0,
}

const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const cartItemIndex  = state.carts.findIndex((item) => item.id === action.payload.id);
            
            if(cartItemIndex >= 0){
                state.carts[cartItemIndex].quantity += action.payload.quantity;
                
            }else{
                const tempProduct = {...action.payload, quantity: action.payload.quantity };
                state.carts.push(tempProduct)
            }
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        incrementItem: (state, action)=>{

            // state.carts = state.carts.map((item) => { 
            //     if(item.id === action.payload.id){
            //         // console.log(typeof item.quantity)
            //         item.quantity += action.payload.quantity;
            //     }
            //     return item;
            // })
            // console.log(state.carts)

            // console.log(action.payload.quantity)
            const cartItemIndex  = state.carts.findIndex((item) => item.id === action.payload.id);
            
            if(cartItemIndex >= 0){
                state.carts[cartItemIndex].quantity += action.payload.quantity;
                
            }

            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        decrementItem: (state, action)=>{
            const cartItemIndex  = state.carts.findIndex((item) => item.id === action.payload.id);
            
            if(cartItemIndex >= 0){
                if(state.carts[cartItemIndex].quantity > 1){
                    state.carts[cartItemIndex].quantity -= action.payload.quantity;
                }
            }
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        deleteItem:(state, action)=> {
            state.carts = state.carts.filter((item) => item.id !== action.payload.id);
            console.log(state.carts)
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        getTotal(state) {
            let {total,qty} = state.carts.reduce((cartTotal, cartItem)=>{
                const {price, quantity} = cartItem;
                const itemTotal = price * quantity;

                cartTotal.total += itemTotal;
                cartTotal.qty += 1

                return cartTotal;
            }, {
                total:0,
                qty:0,
            });

            state.totalQuantity = qty;
            state.totalAmount = total;
        }
    }
        
});

export const { addToCart, incrementItem, decrementItem, deleteItem, getTotal } = cartSlice.actions;

export default cartSlice.reducer;