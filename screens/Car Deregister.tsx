import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { timeDifference } from "../components/res";
import Toast from "../components/Toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeCar } from "./redux/ParkingData";

function calculatePrice(TotalHours: number) {
	let price = 20;
	if (TotalHours > 2) price = TotalHours * 10;
	else price = 20;
	return price;
}

export default function Checkout({ navigation, route }: any) {
	const item = route.params;

	const dispatch = useDispatch()

	const [TotalHours] = useState(timeDifference(item.time));
	const [TotalPrice] = useState(calculatePrice(TotalHours));

	function handlePayment() {
		axios
			.post("https://httpstat.us/200", {
				"car-registration": item.carNo,
				charge: TotalPrice,
			})
			.then((res) => {
				const data = res.data;
				console.log(data);
			})
			.catch((err) => console.log(err));

		dispatch(removeCar(item.position))

		Toast("Payment Taken");
		navigation.goBack();
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 16, textAlign: "center", margin: 20 }}>
				Check Out
			</Text>

			<View style={{ maxWidth: 120 }}>
				<Button
					title="Go Back"
					onPress={() => navigation.goBack()}
					testID="Parking-create-submitbutton"
				/>
			</View>

			<View style={styles.paymentBox}>
				<View style={styles.boxText}>
					<Text style={{ fontWeight: "bold" }}>Car Registration:</Text>
					<Text>{item.carNo}</Text>
				</View>

				<View style={styles.boxText}>
					<Text style={{ fontWeight: "bold" }}>Time Spent:</Text>
					<Text>{TotalHours}</Text>
				</View>

				<View style={styles.boxText}>
					<Text style={{ fontWeight: "bold" }}>Parking Charges:</Text>
					<Text>{`\$ ${TotalPrice}`}</Text>
				</View>
			</View>

			<Button title="Payment Taken" onPress={handlePayment} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
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
	paymentBox: {
		borderColor: "#ADD8E6",
		borderWidth: 2,
		borderRadius: 10,
		width: "100%",
		marginVertical: 20,
	},
	boxText: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
});

interface t {}
