import { getRandomColor } from "../getRandomColor";

test("should return hex color string", () => {
    expect(getRandomColor()).toMatch(/^#([a-f0-9]{2}){3}$/i);
});