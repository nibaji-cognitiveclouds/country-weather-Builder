/** @format */

import { render } from "@testing-library/react-native";
import React from "react";
import Home from "../src/screens/Home";

jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: jest.fn(),
	};
});

describe("Home", () => {
	it("renders without crash", () => {
		render(<Home />);
	});

	it("matches Snapshot", () => {
		const tree = render(<Home />);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("contains component with req testID", () => {
		const tree = render(<Home />);
		expect(tree.findByTestId("home")).toBeTruthy();
	});
});
