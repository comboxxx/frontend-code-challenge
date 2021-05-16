// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import * as Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({
  adapter: new Adapter(),
});


// "jest": "^26.6.3",

//  "jest": {
//     "moduleFileExtensions": [
//       "ts",
//       "tsx",
//       "js"
//     ],
//     "transform": {
//       "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
//     },
//     "setupFiles": [
//       "raf/polyfill"
//     ],
//     "testRegex": "/__tests__/.*\\.(ts|tsx|js)$",
//     "setupTestFrameworkScriptFile": "<rootDir>src/setupTests.ts",
//     "snapshotSerializers": [
//       "enzyme-to-json"
//     ]
//   }
