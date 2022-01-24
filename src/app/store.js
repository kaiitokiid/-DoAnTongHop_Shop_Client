import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import headerReducer from "./headerSlice";

const rootReducer = {
	user: userReducer,
}

const store = configureStore({
	reducer: rootReducer,
});

export default store;