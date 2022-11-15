import React from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";

export default function Toast(message) {
	return (
		<View style={styles.container}>
			{ToastAndroid.show(message, ToastAndroid.SHORT)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#888888",
		padding: 8
	}
});