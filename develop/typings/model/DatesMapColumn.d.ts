import { IDateDesc } from './DateColumn';
import { IKeyValue } from './IArrayColumn';
import { IDataRow } from './interfaces';
import MapColumn, { IMapColumnDesc } from './MapColumn';
export declare type IDateMapColumnDesc = IDateDesc & IMapColumnDesc<Date | null>;
export default class DatesMapColumn extends MapColumn<Date | null> {
    private readonly format;
    private readonly parse;
    constructor(id: string, desc: Readonly<IDateMapColumnDesc>);
    private parseValue(v);
    getValue(row: IDataRow): {
        key: string;
        value: Date | null;
    }[];
    getLabels(row: IDataRow): IKeyValue<string>[];
}
