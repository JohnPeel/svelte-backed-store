import "./polyfill";

describe("polyfill", () => {
    describe("localStorage", () => {
        test("store function exists", () => {
            expect(typeof localStorage.store).toBe("function");
        });
    });
    describe("sessionStorage", () => {
        test("store function exists", () => {
            expect(typeof sessionStorage.store).toBe("function");
        });
    });
})