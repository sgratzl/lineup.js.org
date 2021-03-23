import { ECompareValueType, ICategoricalDesc } from '.';
export declare const COMPARE_CATEGORY_VALUE_TYPES = ECompareValueType.FLOAT_ASC;
export declare const COMPARE_GROUP_CATEGORY_VALUE_TYPES: ECompareValueType[];
export declare function toCategories(desc: ICategoricalDesc): {
    name: string;
    label: string;
    color: string;
    value: number;
}[];
//# sourceMappingURL=internalCategorical.d.ts.map