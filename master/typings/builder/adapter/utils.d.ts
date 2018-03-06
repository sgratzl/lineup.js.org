export declare const equal: (a: any, b: any) => boolean;
export declare function isTypeInstance(clazz: any, superClass: any): boolean;
export declare function pick<T>(obj: T, keys: (keyof T)[]): Pick<T, keyof T>;
export declare function isSame<T>(current: T, changed: (prop: keyof T) => boolean, props: (keyof T)[]): Pick<T, keyof T> | null;
