import { globals } from "svelte/internal";

import { backedStore } from "./backed";
import { Storage as InternalStorage } from "./storage";

if (typeof sessionStorage === "undefined") {
    globals.sessionStorage = new InternalStorage();
}

if (typeof localStorage === "undefined") {
    globals.localStorage = new InternalStorage();
}

Object.getPrototypeOf(globals.sessionStorage).store = backedStore;
Object.getPrototypeOf(globals.localStorage).store = backedStore;