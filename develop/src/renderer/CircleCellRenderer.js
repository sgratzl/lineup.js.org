import { isNumbersColumn, isNumberColumn } from '../model';
import { colorOf } from './impose';
import { ERenderMode, } from './interfaces';
import { renderMissingDOM } from './missing';
import { noRenderer, setText } from './utils';
import { cssClass } from '../styles';
var CircleCellRenderer = /** @class */ (function () {
    function CircleCellRenderer() {
        this.title = 'Proportional Symbol';
    }
    CircleCellRenderer.prototype.canRender = function (col, mode) {
        return isNumberColumn(col) && mode === ERenderMode.CELL && !isNumbersColumn(col);
    };
    CircleCellRenderer.prototype.create = function (col, _context, imposer) {
        return {
            template: "<div style=\"background: radial-gradient(circle closest-side, red 100%, transparent 100%)\" title=\"\">\n              <div class=\"" + cssClass('hover-only') + " " + cssClass('bar-label') + "\"></div>\n          </div>",
            update: function (n, d) {
                var v = col.getNumber(d);
                var p = Math.round(v * 100);
                var missing = renderMissingDOM(n, col, d);
                n.style.background = missing
                    ? null
                    : "radial-gradient(circle closest-side, " + colorOf(col, d, imposer) + " " + p + "%, transparent " + p + "%)";
                setText(n.firstElementChild, col.getLabel(d));
            },
        };
    };
    CircleCellRenderer.prototype.createGroup = function () {
        return noRenderer;
    };
    CircleCellRenderer.prototype.createSummary = function () {
        return noRenderer;
    };
    return CircleCellRenderer;
}());
export default CircleCellRenderer;
//# sourceMappingURL=CircleCellRenderer.js.map