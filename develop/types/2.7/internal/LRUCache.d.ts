/**
 * simple LRU Cache implementation using a double linked list
 */
export default class LRUCache<K, V> implements Iterable<[K, V]> {
    private readonly maxSize;
    readonly [Symbol.toStringTag]: string;
    private readonly map;
    private youngest;
    constructor(maxSize?: number);
    clear(): void;
    readonly size: number;
    has(key: K): boolean;
    delete(key: K): boolean;
    private removeFromList(v);
    private appendToList(v);
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
}
