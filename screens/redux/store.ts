import { configureStore } from "@reduxjs/toolkit";
import initDataReducer from "./initData";
import ParkingDataReducer from "./ParkingData";

export const store = configureStore({
	reducer: {
		parkingData: ParkingDataReducer,
		parkingSize: initDataReducer,
	},
});
