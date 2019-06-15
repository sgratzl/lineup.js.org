export { equal } from '../../internal';
export declare function isTypeInstance(clazz: any, superClass: any): boolean;
export declare function pick<T extends object>(obj: T, keys: (keyof T)[]): Pick<T, keyof T>;
export declare function isSame<T extends object>(current: T, changed: (prop: keyof T) => boolean, props: (keyof T)[]): Pick<T, keyof T> | null;
