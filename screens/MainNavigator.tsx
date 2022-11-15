import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import { getData } from "../components/res";
import PLC from "./Parking Lot Creation";
import PLD from "./Parking Lot Drawing";
import Checkout from "./Car Deregister";
import { useDispatch } from "react-redux";
import { addParkingSize } from "./redux/initData";

// Routes
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function Main() {
	const [appIsReady, setAppIsReady] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		getData("parkingSize").then((res) => {
			if (res) {
				dispatch(addParkingSize(parseInt(res)));
			}
			setAppIsReady(true);
		});
	}, []);

	useEffect(() => {
		if (appIsReady) SplashScreen.hideAsync();
	}, [appIsReady]);

	if (!appIsReady) return null;

	return <Navigator />;
}

function Navigator() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="PLC" component={PLC} />
				<Stack.Screen name="PLD" component={PLD} />
				<Stack.Screen name="checkout" component={Checkout} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
