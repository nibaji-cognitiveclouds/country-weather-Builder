/** @format */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import Home from "../screens/Home";
import List from "../screens/List";

const AppStack: FC = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="List" component={List} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
