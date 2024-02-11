import { transformFilterValue } from "../transformFilterValue";

test("should delete filterRegex symbols", () => {
    expect(transformFilterValue("some_test.st-ri-nga-nd-+(symb_ols)")).toBe(
        "someteststringandsymbols"
    );
});

test("should transform uppercase symbols to lowercase", () => {
    expect(transformFilterValue("ABCDE")).toBe("abcde");
});

test("should keep non-alphanumeric characters that are not in filterRegex", () => {
    expect(transformFilterValue("/-]_[.+|*&^$^%()")).toBe("/][|*&^$^%");
});
