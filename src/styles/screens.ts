/** @format */

import { StyleSheet } from "react-native";

export const screens = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	input: {
		width: "80%",
		padding: 5,
		borderRadius: 5,
		borderColor: "grey",
		borderWidth: 1,
		marginBottom: 10,
	},
	container2: {
		flex: 1,
		backgroundColor: "white",
	},
	item: {
		margin: 20,
		padding: 20,
		borderRadius: 5,
		borderColor: "grey",
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
