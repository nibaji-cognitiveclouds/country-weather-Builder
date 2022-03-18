/** @format */

import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import App from "../App";
import Home from "../src/screens/Home";

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
