import { Storage as InternalStorage } from "./storage";

let storage: InternalStorage;

beforeAll(() => {
    storage = new InternalStorage();
});

afterEach(() => {
    storage.clear();
});

describe("Storage", () => {
    test("length", () => {
        expect(storage.length).toBe(0);
        storage.setItem("Item 1", "");
        expect(storage.length).toBe(1);
    });

    test("clear", () => {
        expect(storage.length).toBe(0);
        storage.setItem("Item 1", "");
        expect(storage.length).toBe(1);
        storage.clear();
        expect(storage.length).toBe(0);
    });

    test("getItem", () => {
        storage.setItem("Item 1", "item-1");
        expect(storage.getItem("Item 1")).toBe("item-1");
    });

    test("key", () => {
        expect(storage.key(0)).toBe(null);
        storage.setItem("Item 1", "item-1");
        expect(storage.key(0)).toBe("Item 1");
    });

    test("removeItem", () => {
        storage.setItem("Item 1", "item-1");
        storage.setItem("Item 2", "item-2");
        storage.setItem("Item 3", "item-3");

        storage.removeItem("Item 2");
        expect(storage.length).toBe(2);
        expect(storage.key(0)).toBe("Item 1");
        expect(storage.key(1)).toBe("Item 3");
    });

    test("setItem", () => {
        storage.setItem("Item 1", "item-1");
        expect(storage.getItem("Item 1")).toBe("item-1");
    });

    test("property access", () => {
        storage.Item1 = "other-1";
        expect(storage.Item1).toBe("other-1");
        expect(storage.getItem("Item1")).toBe("other-1");

        storage.setItem("Item 1", "item-1");
        expect(storage["Item 1"]).toBe("item-1");
        expect(storage.getItem("Item 1")).toBe("item-1");
    });

    test("interaction", () => {
        let otherStorage: InternalStorage = new InternalStorage();
        otherStorage.setItem("Item 1", "other-1");
        storage.setItem("Item 1", "item-1");
        expect(otherStorage.getItem("Item 1")).toBe("other-1");
        expect(storage.getItem("Item 1")).toBe("item-1");
    });
});
