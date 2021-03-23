import { GridStyleManager } from 'lineupengine';
import { ILineUpOptions } from '../../config';
import { AEventDispatcher, IEventListener } from '../../internal';
import { DataProvider } from '../../provider';
import { IRenderContext } from '../../renderer';
import { IEngineRankingContext } from '../EngineRanking';
import { IRankingHeaderContext, IRankingHeaderContextContainer } from '../interfaces';
import { IRule } from './rules';
import { ADialog } from '../dialogs';
/**
 * emitted when the highlight changes
 * @asMemberOf TaggleRenderer
 * @param dataIndex the highlighted data index or -1 for none
 * @event
 */
export declare function highlightChanged(dataIndex: number): void;
/**
 * emitted a dialog is opened
 * @asMemberOf TaggleRenderer
 * @param dialog the opened dialog
 * @event
 */
export declare function dialogOpened(dialog: ADialog): void;
/**
 * emitted a dialog is closed
 * @asMemberOf TaggleRenderer
 * @param dialog the closed dialog
 * @param action the action how the dialog was closed
 * @event
 */
export declare function dialogClosed(dialog: ADialog, action: 'cancel' | 'confirm'): void;
export interface ITaggleOptions {
    violationChanged(rule: IRule | null, violation: string): void;
    rowPadding: number;
}
export default class TaggleRenderer extends AEventDispatcher {
    data: DataProvider;
    static readonly EVENT_HIGHLIGHT_CHANGED = "highlightChanged";
    static readonly EVENT_DIALOG_OPENED = "dialogOpened";
    static readonly EVENT_DIALOG_CLOSED = "dialogClosed";
    private isDynamicLeafHeight;
    private rule;
    private levelOfDetail;
    private readonly resizeListener;
    private readonly renderer;
    private readonly options;
    constructor(data: DataProvider, parent: HTMLElement, options: Partial<ITaggleOptions> & Readonly<ILineUpOptions>);
    get style(): GridStyleManager;
    get ctx(): IRankingHeaderContextContainer & IRenderContext & IEngineRankingContext;
    pushUpdateAble(updateAble: (ctx: IRankingHeaderContext) => void): void;
    private dynamicHeight;
    protected createEventList(): string[];
    on(type: typeof TaggleRenderer.EVENT_HIGHLIGHT_CHANGED, listener: typeof highlightChanged | null): this;
    on(type: typeof TaggleRenderer.EVENT_DIALOG_OPENED, listener: typeof dialogOpened | null): this;
    on(type: typeof TaggleRenderer.EVENT_DIALOG_CLOSED, listener: typeof dialogClosed | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
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
//# sourceMappingURL=TaggleRenderer.d.ts.map