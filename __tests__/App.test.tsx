/** @format */

import React from "react";
import renderer from "react-test-renderer";
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

it("render <Home />", () => {
	const home = renderer.create(<App />).toJSON();
	// @ts-ignore
	expect(home).toMatchSnapshot();
});
