const { createSlice } = require("@reduxjs/toolkit");


const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addItem(state, action) {
			return state = action.payload
		},
		removeItem(state, action) {

		},
		increaseItem(state, action) {

		},
		decreaseItem(state, action) {

		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem, increaseItem, decreaseItem } = actions;
export default reducer;