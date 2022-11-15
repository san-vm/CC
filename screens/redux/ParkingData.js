import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const ParkingDataSlice = createSlice({
	name: "carsParked",
	initialState: [],
	reducers: {
		addCar(state, action) {
			state.push(action.payload);
		},
		removeCar(state, action) {
			return state = state.filter((item) => item.position !== action.payload);
		},
	},
});

export const { addCar, removeCar } = ParkingDataSlice.actions;
export default ParkingDataSlice.reducer;
