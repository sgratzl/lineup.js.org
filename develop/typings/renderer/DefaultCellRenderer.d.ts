import { IDataRow } from '../model';
import Column from '../model/Column';
import { ERenderMode, ICellRendererFactory } from './interfaces';
import { noop } from './utils';
export declare class DefaultCellRenderer implements ICellRendererFactory {
    title: string;
    groupTitle: string;
    summaryTitle: string;
    canRender(_col: Column, _mode: ERenderMode): boolean;
    create(col: Column): {
        template: string;
        update: (n: HTMLDivElement, d: IDataRow) => void;
        render: typeof noop;
    };
    createGroup(_col: Column): {
        template: string;
        update: typeof noop;
        render: typeof noop;
    };
    createSummary(): {
        template: string;
        update: typeof noop;
        render: typeof noop;
    };
}
