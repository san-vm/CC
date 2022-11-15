import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	Button,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import Toast from "../components/Toast";
import { useSelector } from "react-redux";
import { storeData } from "../components/res";
import { useDispatch } from "react-redux";
import { addParkingSize } from "./redux/initData";

export default function PLC() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [ParkingSize, setParkingSize] = useState("");
	const parkingSize = useSelector((state: any) => state.parkingSize);

	useEffect(() => {
		if (parkingSize.value > 0) setParkingSize(`${parkingSize.value}`);
	}, []);

	function handleNumber(num: string) {
		if (num === "") {
			setParkingSize("");
			return;
		}

		let parsedNum = parseInt(num);

		if (isNaN(parsedNum) || parsedNum < 1 || parsedNum > 1000) {
			Toast("Enter a valid range of numbers");
			return;
		}

		setParkingSize(`${parsedNum}`);
	}

	function handleSubmit() {
		dispatch(addParkingSize(ParkingSize));
		storeData("parkingSize", ParkingSize);
		navigation.dispatch(StackActions.replace("PLD"));
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Parking Management</Text>

			<TextInput
				style={styles.input}
				onChangeText={handleNumber}
				value={ParkingSize}
				keyboardType="number-pad"
				placeholder="Enter number of parking spaces"
				testID="Parking-create-text-input"
			/>

			<View style={{ padding: 20 }}>
				<Button
					title="Submit"
					disabled={ParkingSize === ""}
					onPress={handleSubmit}
					testID="Parking-create-submitbutton"
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: -100,
	},
	title: {
		fontSize: 22,
		marginVertical: 20,
	},
	input: {
		fontSize: 15,
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
	},
});
