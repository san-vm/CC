import React from "react";
import Main from "./screens/MainNavigator";

// Redux
import { Provider } from "react-redux";
import { store } from "./screens/redux/store";

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
