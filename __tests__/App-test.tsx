/**
 * @format
 */

import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Home from "../src/Screens/Home";

it("renders correctly", (done) => {
	jest.useFakeTimers();
	renderer.create(<Home />);
	done();
});
