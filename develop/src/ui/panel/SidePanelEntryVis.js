import { Column, isMapAbleColumn, NumberColumn } from '../../model';
import { cssClass, engineCssClass } from '../../styles';
import { createShortcutMenuItems, dragAbleColumn, updateHeader } from '../header';
import { suffix } from '../../internal';
/** @internal */
var SidePanelEntryVis = /** @class */ (function () {
    function SidePanelEntryVis(column, ctx, document) {
        var _this = this;
        this.column = column;
        this.ctx = ctx;
        this.summaryUpdater = null;
        this.node = document.createElement('article');
        this.node.classList.add(cssClass('side-panel-entry'));
        this.node.dataset.colId = column.id;
        this.node.dataset.type = column.desc.type;
        this.summary = ctx.summaryRenderer(column, true);
        this.column.on(suffix('.panel', NumberColumn.EVENT_FILTER_CHANGED, Column.EVENT_DIRTY_HEADER), function () {
            _this.update();
        });
        this.column.on(suffix('.panel', Column.EVENT_SUMMARY_RENDERER_TYPE_CHANGED, Column.EVENT_DIRTY_CACHES), function () {
            _this.recreateSummary();
        });
        this.init();
        this.update();
    }
    SidePanelEntryVis.prototype.init = function () {
        this.node.innerHTML = "\n      <header class=\"" + cssClass('side-panel-entry-header') + "\">\n        <div class=\"" + cssClass('side-panel-labels') + "\">\n          <span class=\"" + cssClass('label') + " " + cssClass('typed-icon') + " " + cssClass('side-panel-label') + "\"></span>\n          <span class=\"" + cssClass('sublabel') + " " + cssClass('side-panel-sublabel') + "\"></span>\n        </div>\n        <div class=\"" + cssClass('toolbar') + " " + cssClass('side-panel-toolbar') + "\"></div>\n      </header>";
        createShortcutMenuItems(this.node.querySelector("." + cssClass('toolbar')), 0, this.column, this.ctx, 'sidePanel', false);
        dragAbleColumn(this.node.querySelector('header'), this.column, this.ctx);
        this.appendSummary();
    };
    SidePanelEntryVis.prototype.update = function (ctx) {
        if (ctx === void 0) { ctx = this.ctx; }
        this.ctx = ctx;
        updateHeader(this.node, this.column);
        this.updateSummary();
    };
    SidePanelEntryVis.prototype.updateSummary = function () {
        var summaryNode = this.node.querySelector("." + cssClass('summary'));
        if (this.summaryUpdater) {
            this.summaryUpdater.abort();
            summaryNode.classList.remove(engineCssClass('loading'));
            this.summaryUpdater = null;
        }
        var r = this.summary.update(summaryNode);
        if (!r) {
            return;
        }
        this.summaryUpdater = r;
        summaryNode.classList.add(engineCssClass('loading'));
        r.then(function (a) {
            if (typeof a === 'symbol') {
                return;
            }
            summaryNode.classList.remove(engineCssClass('loading'));
        });
    };
    SidePanelEntryVis.prototype.appendSummary = function () {
        var summary = this.ctx.asElement(this.summary.template);
        summary.classList.add(cssClass('summary'), cssClass('side-panel-summary'), cssClass('renderer'), cssClass("renderer-" + this.column.getSummaryRenderer()));
        summary.dataset.renderer = this.column.getSummaryRenderer();
        summary.dataset.interactive = isMapAbleColumn(this.column).toString();
        this.node.appendChild(summary);
    };
    SidePanelEntryVis.prototype.recreateSummary = function () {
        // remove old summary
        this.node.removeChild(this.node.querySelector("." + cssClass('summary')));
        this.summary = this.ctx.summaryRenderer(this.column, true);
        this.appendSummary();
        this.updateSummary();
    };
    SidePanelEntryVis.prototype.destroy = function () {
        this.column.on(suffix('.panel', NumberColumn.EVENT_FILTER_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_SUMMARY_RENDERER_TYPE_CHANGED, Column.EVENT_DIRTY_CACHES), null);
        this.node.remove();
    };
    return SidePanelEntryVis;
}());
export default SidePanelEntryVis;
//# sourceMappingURL=SidePanelEntryVis.js.map