/** @format */

import React from "react";
import renderer, { act } from "react-test-renderer";
import { cleanup, render, waitFor } from "@testing-library/react-native";

import App from "../App";
import Home from "../src/screens/Home";
import List from "../src/screens/List";

const mockedDispatch = jest.fn();

// Mocks like this need to be configured at the top level
// of the test file, they can't be setup inside your tests.
jest.mock("@react-navigation/native", () => {
	const actualNav = jest.requireActual("@react-navigation/native");
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: jest.fn(),
			dispatch: mockedDispatch,
		}),
	};
});

it("render <App />", () => {
	const app = renderer.create(<App />).toJSON();
	// @ts-ignore
	expect(app).toMatchSnapshot();
});

it("renders <Home /> with proper placeholder", () => {
	const home = render(<Home />);
	expect(home.getByPlaceholderText("Enter country")).toBeTruthy();
});

it("renders <List /> with proper placeholder", () => {
	// act(() => {
	const list = render(
		<List
			route={{
				params: {
					text: "a",
				},
			}}
		/>
	);
	//@ts-ignore
	expect(list.toJSON()?.children?.length).toBe(2);
});
