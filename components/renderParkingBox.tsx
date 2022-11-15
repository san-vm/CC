import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { carData } from "../screens/types";
import { timeDifference } from "./res";

interface Props {
	item: carData;
	index: number;
	navigation: any;
}

export default function ParkingBox(props: Props) {
	const { item, index, navigation } = props;
	if (item.empty) {
		return <View style={[styles.container, { borderWidth: 0 }]}></View>;
	}

	if (!item.carNo) {
		return (
			<View style={styles.container}>
				<View
					style={[
						styles.carTextBox,
						{ backgroundColor: "#fff", borderColor: "green" },
					]}
				>
					<Text style={[styles.carText, { color: "#000" }]}>{index + 1}</Text>
				</View>
			</View>
		);
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				navigation.navigate("checkout", item);
			}}
		>
			{/* <Text>{item.time && timeDifference(item.time)}</Text> */}
			<View style={styles.carTextBox}>
				<Text style={styles.carText}>{index + 1}</Text>
				<Text style={styles.carText}>{item.carNo}</Text>
				<Text style={[styles.carText, { fontSize: 10 }]}>{`Tap to checkout ${
					item.time ? timeDifference(item.time) + "Hr" : ""
				}`}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "green",
		width: 120,
		height: 120,
		margin: 20,
		overflow: "hidden",
	},
	carTextBox: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		backgroundColor: "#0033ee",
	},
	carText: { fontSize: 15, fontWeight: "bold", padding: 5, color: "#fff" },
});
