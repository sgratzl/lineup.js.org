import { IColumnDesc } from '../../model';
export default class ColumnBuilder<T extends IColumnDesc = IColumnDesc> {
    protected readonly desc: T;
    constructor(type: string, column: string);
    label(label: string): this;
    description(description: string): this;
    frozen(): this;
    renderer(renderer?: string, groupRenderer?: string, summaryRenderer?: string): this;
    custom(key: string, value: any): this;
    width(width: number): this;
    color(color: string): this;
    asArray(labels?: string[] | number): this;
    asMap(): this;
    build(_data: any[]): T;
}
export declare function buildColumn(type: string, column: string): ColumnBuilder<IColumnDesc>;
