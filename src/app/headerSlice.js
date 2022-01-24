const { createSlice } = require("@reduxjs/toolkit");


const headerSlice = createSlice({
	name: 'header',
	initialState: true,
	reducers: {
		changeStateHeader(state, action) {
			return state = action.payload
		},
	},
});

const { actions, reducer } = headerSlice;
export const { changeStateHeader } = actions;
export default reducer;