import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
 
  userId: null,
  menu:[],
  cart:[],
  total:0,
  order:{total:0, userData:{}, cart: []},
  isLoggedIn:false
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers:{
        setUserId: (state, action) => {
          state.userId = action.payload
        },
        setIsLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload
        },
        setOrder: (state,action) => {
          state.order = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
          },
        setMenuData: (state, action) => {
            state.menu = action.payload
        },
        addToCart: (state, action) => {
            const itemToAdd = action.payload;
            const existingItem = state.cart.find(item => item.name === itemToAdd.name);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              state.cart.push(itemToAdd);
            }
        },
        removeFromCart: (state, action) => {
            const itemToRemove = action.payload;
            const existingItem = state.cart.find(item => item.name === itemToRemove.name);
            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
              } else {
                state.cart = state.cart.filter(item => item.name !== existingItem.name);
              }
            }
        },
        setTotal: (state, action) => {
            state.total = action.payload
        }          
    }
})
export const { setUserId} = deliverySlice.actions
export const selectUserId = (state) => state.delivery.userId
export const { setOrder } = deliverySlice.actions
export const selectOrder = (state) => state.delivery.order
export const { setIsLoggedIn } = deliverySlice.actions
export const selectIsLoggedIn = (state) => state.delivery.isLoggedIn
export const { setUserData } = deliverySlice.actions
export const selectUserData = (state) => state.delivery.userData
export const { setMenuData } = deliverySlice.actions
export const selectMenuData = (state) => state.delivery.menu
export const { addToCart } = deliverySlice.actions
export const { removeFromCart} = deliverySlice.actions
export const selectCart = (state) => state.delivery.cart
export const { setTotal } = deliverySlice.actions
export const selectTotal = ( state ) => state.delivery.total

const store = configureStore({
    reducer: {
      delivery: deliverySlice.reducer
    },
  });

  export default store