import { GridStyleManager } from 'lineupengine';
import { ITaggleOptions } from '../../config';
import { DataProvider } from '../../provider';
import { ALineUp } from '../ALineUp';
export default class Taggle extends ALineUp {
    private readonly spaceFilling;
    private readonly renderer;
    private readonly panel;
    private readonly options;
    constructor(node: HTMLElement, data: DataProvider, options?: Partial<ITaggleOptions>);
    private updateLodRules(overviewMode);
    private setViolation(violation?);
    destroy(): void;
    update(): void;
    setHighlight(dataIndex: number, scrollIntoView?: boolean): boolean;
    getHighlight(): number;
    protected enableHighlightListening(enable: boolean): void;
    setDataProvider(data: DataProvider, dump?: any): void;
}
export declare function updateLodRules(style: GridStyleManager, overviewMode: boolean, options: Readonly<ITaggleOptions>): void;
