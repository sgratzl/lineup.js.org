export declare function groupByKey<T extends {
    key: string;
}>(arr: T[][]): {
    key: string;
    values: T[];
}[];
