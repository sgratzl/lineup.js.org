import Column, { IColumnDesc } from './Column';
import { IGroup } from './interfaces';
import Ranking from './Ranking';
export declare function createAggregateDesc(label?: string): {
    type: string;
    label: string;
    fixed: boolean;
};
export interface IAggregateGroupColumnDesc extends IColumnDesc {
    isAggregated(ranking: Ranking, group: IGroup): boolean;
    setAggregated(ranking: Ranking, group: IGroup, value: boolean): void;
}
export default class AggregateGroupColumn extends Column {
    static readonly EVENT_AGGREGATE: string;
    constructor(id: string, desc: Readonly<IAggregateGroupColumnDesc>);
    readonly frozen: boolean;
    protected createEventList(): string[];
    isAggregated(group: IGroup): boolean;
    setAggregated(group: IGroup, value: boolean): boolean;
}
