import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function storeData(key: string, value: string) {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.log("LOG", error);
	}
}

export async function getData(key: string) {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.log("LOG", error);
	}
}

export async function deleteData(key: string) {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.log("LOG", error);
	}
}

export async function logout() {
	const data: Array<string> = [];

	data.forEach((item) => deleteData(item));
}

export function formatData(dataList: any[any], numCols: number) {
	const totalRows = Math.floor(dataList.length / numCols);
	let totalLastRow = dataList.length - totalRows * numCols;

	while (totalLastRow !== 0 && totalLastRow !== numCols) {
		dataList.push({ key: "blank", empty: true });
		totalLastRow++;
	}
	return dataList;
}

export function timeDifference(previous: number) {
	let current = +new Date();

	if (Platform.OS === "ios") previous = previous * 1000;

	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	return Math.round(elapsed / msPerHour);

	// if (elapsed < msPerMinute) {
	// 	return Math.round(elapsed / 1000) + " seconds ago";
	// } else if (elapsed < msPerHour) {
	// 	return Math.round(elapsed / msPerMinute) + " minutes ago";
	// } else if (elapsed < msPerDay) {
	// 	return Math.round(elapsed / msPerHour) + " hours ago";
	// } else if (elapsed < msPerMonth) {
	// 	return Math.round(elapsed / msPerDay) + " days ago";
	// } else if (elapsed < msPerYear) {
	// 	return Math.round(elapsed / msPerMonth) + " months ago";
	// } else {
	// 	return Math.round(elapsed / msPerYear) + " years ago";
	// }
}

export function formatAMPM(date: Date) {
	let hours = date.getHours();
	let minutes: string | number = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours %= 12;
	hours = hours || 12;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	const strTime = `${hours}:${minutes} ${ampm}`;

	return strTime;
}

// Types
interface reqOps {
	method: string;
	[headers: string]: any;
	redirect?: string;
	body?: string;
}
