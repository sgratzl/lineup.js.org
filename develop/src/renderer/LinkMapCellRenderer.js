import { LinkMapColumn } from '../model';
import { ERenderMode, } from './interfaces';
import { renderMissingDOM } from './missing';
import { groupByKey } from './TableCellRenderer';
import { noRenderer, noop } from './utils';
import { cssClass } from '../styles';
var LinkMapCellRenderer = /** @class */ (function () {
    function LinkMapCellRenderer() {
        this.title = 'Table with Links';
    }
    LinkMapCellRenderer.prototype.canRender = function (col, mode) {
        return col instanceof LinkMapColumn && mode !== ERenderMode.SUMMARY;
    };
    LinkMapCellRenderer.prototype.create = function (col) {
        var align = col.alignment || 'left';
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"></div>",
            update: function (node, d) {
                if (renderMissingDOM(node, col, d)) {
                    return;
                }
                node.innerHTML = col
                    .getLinkMap(d)
                    .map(function (_a) {
                    var key = _a.key, value = _a.value;
                    return "\n          <div class=\"" + cssClass('table-cell') + "\">" + key + "</div>\n          <div class=\"" + cssClass('table-cell') + " " + (align !== 'left' ? cssClass(align) : '') + "\">\n            <a href=\"" + value.href + "\" target=\"_blank\" rel=\"noopener\">" + value.alt + "</a>\n          </div>";
                })
                    .join('');
            },
            render: noop,
        };
    };
    LinkMapCellRenderer.example = function (arr) {
        var numExampleRows = 5;
        var examples = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var row = arr_1[_i];
            if (!row || !row.value.href) {
                continue;
            }
            examples.push("<a target=\"_blank\" rel=\"noopener\" href=\"" + row.value.href + "\">" + row.value.alt + "</a>");
            if (examples.length >= numExampleRows) {
                break;
            }
        }
        if (examples.length === 0) {
            return '';
        }
        return "" + examples.join(', ') + (examples.length < arr.length) + " ? ', &hellip;': ''}";
    };
    LinkMapCellRenderer.prototype.createGroup = function (col, context) {
        var align = col.alignment || 'left';
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"></div>",
            update: function (node, group) {
                return context.tasks
                    .groupRows(col, group, 'linkmap', function (rows) { return groupByKey(rows.map(function (d) { return col.getLinkMap(d); })); })
                    .then(function (entries) {
                    if (typeof entries === 'symbol') {
                        return;
                    }
                    node.innerHTML = entries
                        .map(function (_a) {
                        var key = _a.key, values = _a.values;
                        var data = LinkMapCellRenderer.example(values);
                        if (!data) {
                            return "<div>" + key + "</div><div class=\"" + cssClass('missing') + "\"></div>";
                        }
                        return "<div>" + key + "</div><div" + (align !== 'left' ? " class=\"" + cssClass(align) + "\"" : '') + ">" + data + "</div>";
                    })
                        .join('');
                });
            },
        };
    };
    LinkMapCellRenderer.prototype.createSummary = function () {
        return noRenderer;
    };
    return LinkMapCellRenderer;
}());
export default LinkMapCellRenderer;
//# sourceMappingURL=LinkMapCellRenderer.js.map