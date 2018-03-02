import Column from './Column';
import CompositeNumberColumn, { ICompositeNumberDesc } from './CompositeNumberColumn';
import { IDataRow } from './interfaces';
export declare function createScriptDesc(label?: string): {
    type: string;
    label: string;
    script: string;
};
export interface IScriptDesc extends ICompositeNumberDesc {
    script?: string;
}
export declare type IScriptColumnDesc = IScriptDesc & ICompositeNumberDesc;
export default class ScriptColumn extends CompositeNumberColumn {
    static readonly EVENT_SCRIPT_CHANGED: string;
    static readonly DEFAULT_SCRIPT: string;
    private script;
    private f;
    constructor(id: string, desc: Readonly<IScriptColumnDesc>);
    protected createEventList(): string[];
    setScript(script: string): void;
    getScript(): string;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    protected compute(row: IDataRow): any;
}
