import Column from './Column';
import { IGroupData } from './interfaces';
export declare function createGroupDesc(label?: string): {
    type: string;
    label: string;
};
export default class GroupColumn extends Column {
    private groupSortMethod;
    readonly frozen: boolean;
    getLabel(): string;
    getValue(): string;
    compare(): number;
    getSortMethod(): "name" | "count";
    setSortMethod(sortMethod: 'name' | 'count'): void;
    groupCompare(a: IGroupData, b: IGroupData): number;
}
