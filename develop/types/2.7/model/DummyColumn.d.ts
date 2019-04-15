import Column from './Column';
import { IColumnDesc } from './interfaces';
/**
 * a default column with no values
 */
export default class DummyColumn extends Column {
    constructor(id: string, desc: Readonly<IColumnDesc>);
    getLabel(): string;
    getValue(): string;
}
