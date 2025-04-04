import Wishlist from "@/app/_components/produccts/Wishlist";
import { createSlice } from "@reduxjs/toolkit";
const isUserLogin = JSON.parse(localStorage.getItem("isUserLogin"));
const initialState = {
  value: 0,
  isUserLogin : (isUserLogin)?true:false,
  LoginModelBox : false,
  user : localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
  wishlistItems : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state,action) => {
      state.user = action.payload;
      localStorage.setItem("user",JSON.stringify(state.user))
    //  state.value += 1;
    },
    loginAction: (state,action) => {
        state.isUserLogin = action.payload;
        localStorage.setItem("isUserLogin", JSON.stringify(state.isUserLogin));
      //  state.value += 1;
      },
      LoginModelBoxAction: (state,action) => {
        state.LoginModelBox = action.payload;
      //  state.value += 1;
      },
 
      addWishListItems: (state,action) => {
        const newItem = action.payload;
        const isExist = state.wishlistItems.some(item => item.productId === newItem.productId);
      
        if (!isExist) {
          state.wishlistItems = [...state.wishlistItems, newItem];
        }
      //  state.value += 1;
      },
      loadOldData: (state,action) => {
       // state.LoginModelBox = action.payload;
       console.log("Load Old Data!");
      //  state.value += 1;
      },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addUserInfo,loginAction,LoginModelBoxAction,addWishListItems,loadOldData } = userSlice.actions;
export default userSlice.reducer;
