import { isArrayColumn, isMapColumn, isMissingValue, } from '../model';
import { renderMissingDOM } from './missing';
import { forEach, noop } from './utils';
import { cssClass } from '../styles';
var TableCellRenderer = /** @class */ (function () {
    function TableCellRenderer() {
        this.title = 'Table';
    }
    TableCellRenderer.prototype.canRender = function (col) {
        return isMapColumn(col);
    };
    TableCellRenderer.prototype.create = function (col) {
        if (isArrayColumn(col) && col.dataLength) {
            // fixed length optimized rendering
            return this.createFixed(col);
        }
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"></div>",
            update: function (node, d) {
                if (renderMissingDOM(node, col, d)) {
                    return;
                }
                node.innerHTML = col
                    .getMapLabel(d)
                    .map(function (_a) {
                    var key = _a.key, value = _a.value;
                    return "<div class=\"" + cssClass('table-cell') + "\">" + key + "</div><div class=\"" + cssClass('table-cell') + "\">" + value + "</div>";
                })
                    .join('');
            },
        };
    };
    TableCellRenderer.template = function (col) {
        var labels = col.labels;
        return "<div>" + labels
            .map(function (l) { return "<div class=\"" + cssClass('table-cell') + "\">" + l + "</div><div  class=\"" + cssClass('table-cell') + "\" data-v></div>"; })
            .join('\n') + "</div>";
    };
    TableCellRenderer.prototype.createFixed = function (col) {
        return {
            template: TableCellRenderer.template(col),
            update: function (node, d) {
                if (renderMissingDOM(node, col, d)) {
                    return;
                }
                var value = col.getLabels(d);
                forEach(node, '[data-v]', function (n, i) {
                    n.innerHTML = value[i];
                });
            },
        };
    };
    TableCellRenderer.example = function (arr) {
        var numExampleRows = 5;
        return "" + arr
            .slice(0, numExampleRows)
            .map(function (d) { return d.value; })
            .join(', ') + (numExampleRows < arr.length ? ', &hellip;' : '');
    };
    TableCellRenderer.prototype.createGroup = function (col, context) {
        if (isArrayColumn(col) && col.dataLength) {
            // fixed length optimized rendering
            return this.createFixedGroup(col, context);
        }
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"></div>",
            update: function (node, group) {
                return context.tasks
                    .groupRows(col, group, 'table', function (rows) { return groupByKey(rows.map(function (d) { return col.getMapLabel(d); })); })
                    .then(function (entries) {
                    if (typeof entries === 'symbol') {
                        return;
                    }
                    node.innerHTML = entries
                        .map(function (_a) {
                        var key = _a.key, values = _a.values;
                        return "<div class=\"" + cssClass('table-cell') + "\">" + key + "</div><div class=\"" + cssClass('table-cell') + "\">" + TableCellRenderer.example(values) + "</div>";
                    })
                        .join('');
                });
            },
        };
    };
    TableCellRenderer.prototype.createFixedGroup = function (col, context) {
        return {
            template: TableCellRenderer.template(col),
            update: function (node, group) {
                return context.tasks
                    .groupExampleRows(col, group, 'table', function (rows) {
                    var values = col.labels.map(function () { return []; });
                    rows.forEach(function (row) {
                        var labels = col.getLabels(row);
                        for (var i = 0; i < Math.min(values.length, labels.length); ++i) {
                            if (!isMissingValue(labels[i])) {
                                values[i].push(labels[i]);
                            }
                        }
                    });
                    return values;
                })
                    .then(function (values) {
                    if (typeof values === 'symbol') {
                        return;
                    }
                    forEach(node, '[data-v]', function (n, i) {
                        n.innerHTML = values[i].join(', ') + "&hellip;";
                    });
                });
            },
        };
    };
    TableCellRenderer.prototype.createSummary = function () {
        return {
            template: "<div class=\"" + cssClass('rtable') + "\"><div>Key</div><div>Value</div></div>",
            update: noop,
        };
    };
    return TableCellRenderer;
}());
export default TableCellRenderer;
/** @internal */
export function groupByKey(arr) {
    var m = new Map();
    arr.forEach(function (a) {
        return a.forEach(function (d) {
            if (!m.has(d.key)) {
                m.set(d.key, [d]);
            }
            else {
                m.get(d.key).push(d);
            }
        });
    });
    return Array.from(m)
        .sort(function (a, b) { return a[0].localeCompare(b[0]); })
        .map(function (_a) {
        var key = _a[0], values = _a[1];
        return ({ key: key, values: values });
    });
}
//# sourceMappingURL=TableCellRenderer.js.map