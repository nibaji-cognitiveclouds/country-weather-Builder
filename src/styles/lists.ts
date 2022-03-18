/** @format */

import { StyleSheet } from "react-native";

export const ListsStyle = StyleSheet.create({
	listItem: {
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: 10,
		margin: 10,
		padding: 15,
		minWidth: "80%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	listProps: {
		margin: 5,
	},
	listItemPropName: {
		fontWeight: "bold",
		color: "grey",
	},
	listItemPropValue: {
		fontWeight: "bold",
		fontStyle: "italic",
		color: "black",
	},
	listImage: {
		width: 50,
		height: 50,
	},
});
