import { StringColumn } from '../model';
import { filterMissingMarkup, findFilterMissing } from '../ui/missing';
import { renderMissingDOM } from './missing';
import { setText, exampleText } from './utils';
import { cssClass } from '../styles';
import { debounce } from '../internal';
/**
 * renders a string with additional alignment behavior
 * one instance factory shared among strings
 */
var StringCellRenderer = /** @class */ (function () {
    function StringCellRenderer() {
        this.title = 'Default';
    }
    StringCellRenderer.prototype.canRender = function (col) {
        return col instanceof StringColumn;
    };
    StringCellRenderer.prototype.create = function (col) {
        var align = col.alignment || 'left';
        return {
            template: "<div" + (align !== 'left' ? " class=\"" + cssClass(align) + "\"" : '') + "> </div>",
            update: function (n, d) {
                renderMissingDOM(n, col, d);
                if (col.escape) {
                    setText(n, col.getLabel(d));
                }
                else {
                    n.innerHTML = col.getLabel(d);
                }
                n.title = n.textContent;
            },
        };
    };
    StringCellRenderer.prototype.createGroup = function (col, context) {
        return {
            template: "<div> </div>",
            update: function (n, group) {
                return context.tasks
                    .groupExampleRows(col, group, 'string', function (rows) { return exampleText(col, rows); })
                    .then(function (text) {
                    if (typeof text === 'symbol') {
                        return;
                    }
                    n.classList.toggle(cssClass('missing'), !text);
                    if (col.escape) {
                        setText(n, text);
                    }
                    else {
                        n.innerHTML = text;
                        n.title = text;
                    }
                });
            },
        };
    };
    StringCellRenderer.interactiveSummary = function (col, node) {
        var form = node;
        var filterMissing = findFilterMissing(node);
        var input = node.querySelector('input[type="text"]');
        var isRegex = node.querySelector('input[type="checkbox"]');
        var update = function () {
            var valid = input.value.trim();
            if (valid.length <= 0) {
                var filter = filterMissing.checked ? { filter: null, filterMissing: filterMissing.checked } : null;
                col.setFilter(filter);
                return;
            }
            col.setFilter({
                filter: isRegex.checked ? new RegExp(input.value) : input.value,
                filterMissing: filterMissing.checked,
            });
        };
        filterMissing.onchange = update;
        input.onchange = update;
        input.oninput = debounce(update, 100);
        isRegex.onchange = update;
        form.onsubmit = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            update();
            return false;
        };
        return function (actCol) {
            col = actCol;
            var f = col.getFilter() || { filter: null, filterMissing: false };
            var bak = f.filter;
            filterMissing.checked = f.filterMissing;
            input.value = bak instanceof RegExp ? bak.source : bak || '';
            isRegex.checked = bak instanceof RegExp;
        };
    };
    StringCellRenderer.prototype.createSummary = function (col, _context, interactive) {
        if (!interactive) {
            return {
                template: "<div></div>",
                update: function (node) {
                    var filter = col.getFilter();
                    node.textContent = toString(filter);
                },
            };
        }
        var f = col.getFilter() || { filter: null, filterMissing: false };
        var bak = f.filter || '';
        var update;
        return {
            template: "<form><input type=\"text\" placeholder=\"Filter " + col.desc.label + "...\" autofocus value=\"" + (bak instanceof RegExp ? bak.source : bak) + "\">\n          <label class=\"" + cssClass('checkbox') + "\">\n            <input type=\"checkbox\" " + (bak instanceof RegExp ? 'checked="checked"' : '') + ">\n            <span>Use regular expressions</span>\n          </label>\n          " + filterMissingMarkup(f.filterMissing) + "</form>",
            update: function (node) {
                if (!update) {
                    update = StringCellRenderer.interactiveSummary(col, node);
                }
                update(col);
            },
        };
    };
    return StringCellRenderer;
}());
export default StringCellRenderer;
function toString(filter) {
    if (filter == null || !filter.filter) {
        return '';
    }
    if (filter.filter instanceof RegExp) {
        return filter.filter.source;
    }
    return filter.filter;
}
//# sourceMappingURL=StringCellRenderer.js.map