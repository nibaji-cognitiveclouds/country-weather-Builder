/** @format */

import { render } from "@testing-library/react-native";
import React from "react";

import List from "../src/screens/List";

describe("List", () => {
	const prop = {
		params: {
			name: "ind",
		},
	};

	it("renders without crash", () => {
		render(<List route={prop} />);
	});

	it("matches Snapshot", () => {
		const tree = render(<List route={prop} />);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("contains component with req testID", () => {
		const tree = render(<List route={prop} />);
		expect(tree.findByTestId("list")).toBeTruthy();
	});
});
