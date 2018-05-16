import { ILineUpOptions } from '../../interfaces';
import AEventDispatcher from '../../internal/AEventDispatcher';
import DataProvider from '../../provider/ADataProvider';
import { IRenderContext } from '../../renderer';
import { IEngineRankingContext } from '../EngineRanking';
import { IRankingHeaderContext, IRankingHeaderContextContainer } from '../interfaces';
import { IRule } from './interfaces';
export interface ITaggleOptions {
    violationChanged(rule: IRule, violation: string): void;
    rowPadding: number;
}
export default class TaggleRenderer extends AEventDispatcher {
    data: DataProvider;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    private isDynamicLeafHeight;
    private rule;
    private levelOfDetail;
    private readonly resizeListener;
    private readonly renderer;
    private readonly options;
    constructor(data: DataProvider, parent: HTMLElement, options: (Partial<ITaggleOptions> & Readonly<ILineUpOptions>));
    readonly ctx: IRankingHeaderContextContainer & IRenderContext & IEngineRankingContext;
    pushUpdateAble(updateAble: (ctx: IRankingHeaderContext) => void): void;
    private dynamicHeight(data);
    protected createEventList(): string[];
    zoomOut(): void;
    zoomIn(): void;
    switchRule(rule: IRule | null): void;
    destroy(): void;
    update(): void;
    setDataProvider(data: DataProvider): void;
    setHighlight(dataIndex: number, scrollIntoView: boolean): boolean;
    getHighlight(): number;
    enableHighlightListening(enable: boolean): void;
}
