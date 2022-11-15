import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	Button,
	Modal,
	TextInput,
	TouchableOpacity,
} from "react-native";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import ParkingBox from "../components/renderParkingBox";
import { formatAMPM, formatData } from "../components/res";
import { carData } from "./types";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast";
import { addCar } from "./redux/ParkingData";

export default function PLD({ navigation }: any) {
	const dispatch = useDispatch();
	const ParkingSize = useSelector((state: any) => state.parkingSize.value);
	const ParkedCars = useSelector((state: any) => state.parkingData);

	// Flow States
	const [CurrentCarNumber, setCurrentCarNumber] = useState("");
	const [ShowAddParkingModal, setShowAddParkingModal] = useState(false);

	// TimePicker
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [time, setTime] = useState(new Date());
	const [ParkingData, setParkingData] = useState<carData[]>([]);

	useEffect(() => {
		let temp: carData[] = [];

		for (let index = 0; index < ParkingSize; index++) {
			temp.push({});
		}

		ParkedCars.forEach((item: carData) => {
			temp[item.position || 0] = item;
		});

		setParkingData(formatData(temp, 2));
	}, [ParkedCars]);

	useEffect(() => {
		if (ShowAddParkingModal) {
			setTime(new Date());
		}
	}, [ShowAddParkingModal]);

	function handleTimeChange(
		event: DateTimePickerEvent,
		date: Date | undefined
	) {
		setShowTimePicker(false);

		if (+new Date(date || 0) > +new Date()) {
			Toast("Select a time before the current time");
			return;
		}

		date && setTime(new Date(date));
	}

	function handleNewCarRegistration() {
		if (CurrentCarNumber == "") {
			Toast("Enter a valid car number");
			return;
		}

		let position = -1;
		for (let index = 0; index < ParkingSize; index++) {
			position = ParkedCars.findIndex(
				(item: carData) => item.position === index
			);
			if (position < 0) {
				position = index;
				break;
			}
		}

		let data: carData = {
			carNo: CurrentCarNumber,
			position,
			time: +time,
		};

		dispatch(addCar(data));
		setCurrentCarNumber("");
		setShowAddParkingModal(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 16 }}>{`Available Spaces: ${
				ParkingSize - ParkedCars.length
			} of ${ParkingSize}`}</Text>

			<FlatList
				data={ParkingData}
				renderItem={({ item, index }) => (
					<ParkingBox item={item} index={index} navigation={navigation} />
				)}
				keyExtractor={(item, index) => index.toString() + item.carNo}
				numColumns={2}
				columnWrapperStyle={{
					justifyContent: "space-around",
				}}
				showsVerticalScrollIndicator={false}
			/>

			<View style={{ width: "100%" }}>
				<Button
					title="Add New Parking"
					onPress={() => {
						if (ParkedCars.length >= ParkingSize) {
							Toast("Parking Full");
							return;
						}
						setShowAddParkingModal(true);
					}}
				/>
			</View>

			<Modal
				visible={ShowAddParkingModal}
				animationType="slide"
				onRequestClose={() => {
					setShowAddParkingModal(false);
				}}
				transparent={true}
			>
				<View
					style={{
						backgroundColor: "rgba(0,0,0,0.4)",
						flex: 1,
						justifyContent: "flex-end",
					}}
				>
					<View
						style={{
							backgroundColor: "#fff",
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
							padding: 10,
						}}
					>
						<Text style={styles.title}>{"Parking Time (Tap to change):"}</Text>

						{showTimePicker && (
							<DateTimePicker
								mode="time"
								value={time}
								style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
								onChange={handleTimeChange}
							/>
						)}

						<TouchableOpacity
							style={styles.input}
							onPress={() => setShowTimePicker(true)}
						>
							<Text>{time !== undefined ? formatAMPM(time) : ""}</Text>
						</TouchableOpacity>

						<Text style={styles.title}>Car Registration:</Text>

						<TextInput
							style={styles.input}
							value={CurrentCarNumber}
							onChangeText={setCurrentCarNumber}
							placeholder="Ex: KAXX01XXXX"
							testID="Parking-create-text-input"
							autoCapitalize="characters"
						/>

						<View style={{ flexDirection: "row", marginTop: 20 }}>
							<View style={{ minWidth: 130, margin: 5 }}>
								<Button
									title="Cancel"
									onPress={() => setShowAddParkingModal(false)}
								/>
							</View>

							<View style={{ width: "60%", margin: 5 }}>
								<Button title="Submit" onPress={handleNewCarRegistration} />
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		marginVertical: 20,
	},
	input: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
	},
});
