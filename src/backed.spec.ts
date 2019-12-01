import { backedStore } from "./backed";

const localStore = backedStore.bind(localStorage);
const sessionStore = backedStore.bind(sessionStorage);

const localStoreItem = localStore("test", {});
const sessionStoreItem = sessionStore("test", {});

describe("backedStore", () => {
    test("standalone", () => {
        expect(localStorage.getItem("test")).toBe(JSON.stringify({}));
        expect(sessionStorage.getItem("test")).toBe(JSON.stringify({}));
        localStoreItem.set("null");
        expect(localStorage.getItem("test")).toBe(JSON.stringify("null"));
        expect(sessionStorage.getItem("test")).toBe(JSON.stringify({}));
        sessionStoreItem.set({ test: "test" });
        expect(sessionStorage.getItem("test")).toBe(JSON.stringify({ test: "test" }));
    });
});