import { LinkColumn } from '../model';
import { ERenderMode, } from './interfaces';
import { renderMissingDOM } from './missing';
import { noRenderer, setText } from './utils';
import { cssClass } from '../styles';
var LinkCellRenderer = /** @class */ (function () {
    function LinkCellRenderer() {
        this.title = 'Link';
    }
    LinkCellRenderer.prototype.canRender = function (col, mode) {
        return col instanceof LinkColumn && mode !== ERenderMode.SUMMARY;
    };
    LinkCellRenderer.prototype.create = function (col) {
        var align = col.alignment || 'left';
        return {
            template: "<a" + (align !== 'left' ? " class=\"" + cssClass(align) + "\"" : '') + " target=\"_blank\" rel=\"noopener\" href=\"\"></a>",
            update: function (n, d) {
                renderMissingDOM(n, col, d);
                var v = col.getLink(d);
                n.href = v ? v.href : '';
                if (col.escape) {
                    setText(n, v ? v.alt : '');
                }
                else {
                    n.innerHTML = v ? v.alt : '';
                }
            },
        };
    };
    LinkCellRenderer.exampleText = function (col, rows) {
        var numExampleRows = 5;
        var examples = [];
        rows.every(function (row) {
            var v = col.getLink(row);
            if (!v) {
                return true;
            }
            examples.push("<a target=\"_blank\" rel=\"noopener\"  href=\"" + v.href + "\">" + v.alt + "</a>");
            return examples.length < numExampleRows;
        });
        if (examples.length === 0) {
            return '';
        }
        return "" + examples.join(', ') + (examples.length < rows.length ? ', &hellip;' : '');
    };
    LinkCellRenderer.prototype.createGroup = function (col, context) {
        return {
            template: "<div> </div>",
            update: function (n, group) {
                return context.tasks
                    .groupExampleRows(col, group, 'link', function (rows) { return LinkCellRenderer.exampleText(col, rows); })
                    .then(function (text) {
                    if (typeof text === 'symbol') {
                        return;
                    }
                    n.classList.toggle(cssClass('missing'), !text);
                    n.innerHTML = text;
                });
            },
        };
    };
    LinkCellRenderer.prototype.createSummary = function () {
        return noRenderer;
    };
    return LinkCellRenderer;
}());
export default LinkCellRenderer;
//# sourceMappingURL=LinkCellRenderer.js.map