import 'reflect-metadata';
import Column from './Column';
import { IColumnDesc } from './interfaces';
export declare function SupportType(): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare class Categories {
    readonly string: {
        label: string;
        order: number;
        name: string;
    };
    readonly categorical: {
        label: string;
        order: number;
        name: string;
    };
    readonly number: {
        label: string;
        order: number;
        name: string;
    };
    readonly date: {
        label: string;
        order: number;
        name: string;
    };
    readonly array: {
        label: string;
        order: number;
        name: string;
    };
    readonly map: {
        label: string;
        order: number;
        name: string;
    };
    readonly composite: {
        label: string;
        order: number;
        name: string;
    };
    readonly support: {
        label: string;
        order: number;
        name: string;
    };
    readonly other: {
        label: string;
        order: number;
        name: string;
    };
}
export declare const categories: Categories;
export declare function Category(cat: keyof Categories): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function toolbar(...keys: string[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function isSupportType(col: Column): boolean;
export declare function categoryOf(col: (typeof Column) | Column): {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
} | {
    label: string;
    order: number;
    name: string;
};
export declare function categoryOfDesc(col: IColumnDesc | string, models: {
    [key: string]: typeof Column;
}): {
    label: string;
    order: number;
    name: string;
};
export declare function getAllToolbarActions(col: Column): string[];
