import { writable, Writable, Readable } from "svelte/store";
import { noop } from "svelte/internal";

/* Svelte doesn't export these =( */
type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

export function backedStore<T>(this: any, keyName: string, defaultValue: T, start: StartStopNotifier<T> = noop): Writable<T> {
  const { subscribe, set, update } = writable(JSON.parse(this.getItem(keyName) || "null") || defaultValue, start);
  subscribe((value: T) => this.setItem(keyName, JSON.stringify(value)));
  return { subscribe, set, update };
}

export function toReadOnly<T>(writable: Writable<T>): Readable<T> {
  return { subscribe: writable.subscribe };
}
