import "@testing-library/jest-dom";
import { TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    };