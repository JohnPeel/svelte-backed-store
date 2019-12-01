import { writable, Writable } from "svelte/store";

export function backedStore<T>(this: any, keyName: string, defaultValue: T): Writable<T> {
  const { subscribe, set, update } = writable(JSON.parse(this.getItem(keyName) || "null") || defaultValue);
  subscribe((value: T) => this.setItem(keyName, JSON.stringify(value)));
  return { subscribe, set, update };
}
