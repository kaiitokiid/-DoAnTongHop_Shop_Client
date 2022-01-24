const { createSlice } = require("@reduxjs/toolkit");


const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		getUser(state, action) {
			return state = action.payload;
		},
		removeUser(state) {
			localStorage.setItem('TOKEN', JSON.stringify(''));
			return {};
		}
	},
});

const { actions, reducer } = userSlice;
export const { getUser, removeUser } = actions;
export default reducer;