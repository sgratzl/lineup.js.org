import { IStringColumnDesc } from '../../model';
import ColumnBuilder from './ColumnBuilder';
export default class StringColumnBuilder extends ColumnBuilder<IStringColumnDesc> {
    constructor(column: string);
    editable(): this;
    html(): this;
    pattern(pattern: string, templates?: string[]): this;
}
export declare function buildStringColumn(column: string): StringColumnBuilder;
