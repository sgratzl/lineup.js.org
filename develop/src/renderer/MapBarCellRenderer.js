import { round } from '../internal';
import { isMapAbleColumn, isMapColumn, isNumberColumn, } from '../model';
import { colorOf } from './impose';
import { ERenderMode, } from './interfaces';
import { renderMissingDOM } from './missing';
import { noRenderer } from './utils';
import { cssClass } from '../styles';
var MapBarCellRenderer = /** @class */ (function () {
    function MapBarCellRenderer() {
        this.title = 'Bar Table';
    }
    MapBarCellRenderer.prototype.canRender = function (col, mode) {
        return (isMapColumn(col) &&
            isNumberColumn(col) &&
            (mode === ERenderMode.CELL || (mode === ERenderMode.SUMMARY && isMapAbleColumn(col))));
    };
    MapBarCellRenderer.prototype.create = function (col, _context, imposer) {
        var formatter = col.getNumberFormat();
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"></div>",
            update: function (node, d) {
                if (renderMissingDOM(node, col, d)) {
                    return;
                }
                node.innerHTML = col
                    .getMap(d)
                    .map(function (_a) {
                    var key = _a.key, value = _a.value;
                    if (Number.isNaN(value)) {
                        return "<div class=\"" + cssClass('table-cell') + "\">" + key + "</div><div class=\"" + cssClass('table-cell') + " " + cssClass('missing') + "\"></div>";
                    }
                    var w = round(value * 100, 2);
                    return "<div class=\"" + cssClass('table-cell') + "\">" + key + "</div>\n            <div class=\"" + cssClass('table-cell') + "\" title=\"" + formatter(value) + "\">\n              <div style=\"width: " + w + "%; background-color: " + colorOf(col, d, imposer) + "\">\n                <span class=\"" + cssClass('hover-only') + "\">" + value + "</span>\n              </div>\n            </div>";
                })
                    .join('');
            },
        };
    };
    MapBarCellRenderer.prototype.createGroup = function () {
        return noRenderer;
    };
    MapBarCellRenderer.prototype.createSummary = function (col) {
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"><div>Key</div><div><span></span><span></span>Value</div></div>",
            update: function (node) {
                var range = col.getRange();
                var value = node.lastElementChild;
                value.firstElementChild.textContent = range[0];
                value.children[1].textContent = range[1];
            },
        };
    };
    return MapBarCellRenderer;
}());
export default MapBarCellRenderer;
//# sourceMappingURL=MapBarCellRenderer.js.map