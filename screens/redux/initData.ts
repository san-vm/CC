import { createSlice } from "@reduxjs/toolkit";

const initDataSlice = createSlice({
	name: "parkingSize",
	initialState: { value: 0 },
	reducers: {
		addParkingSize(state, action) {
			state["value"] = action.payload;
		},
	},
});

export const { addParkingSize } = initDataSlice.actions;
export default initDataSlice.reducer;
