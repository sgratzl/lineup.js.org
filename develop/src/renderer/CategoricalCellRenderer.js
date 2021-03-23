import { DENSE_HISTOGRAM } from '../constants';
import { round } from '../internal';
import { OrdinalColumn, isCategoricalColumn, isCategoricalLikeColumn, CategoricalColumn, SetColumn, BooleanColumn, } from '../model';
import { CANVAS_HEIGHT, cssClass, FILTERED_OPACITY } from '../styles';
import { filterMissingNumberMarkup, updateFilterMissingNumberMarkup } from '../ui/missing';
import { ERenderMode, } from './interfaces';
import { renderMissingCanvas, renderMissingDOM } from './missing';
import { setText, wideEnough, forEach } from './utils';
import { color } from 'd3-color';
var CategoricalCellRenderer = /** @class */ (function () {
    function CategoricalCellRenderer() {
        this.title = 'Color';
        this.groupTitle = 'Histogram';
    }
    CategoricalCellRenderer.prototype.canRender = function (col, mode) {
        return isCategoricalLikeColumn(col) && (mode !== ERenderMode.CELL || isCategoricalColumn(col));
    };
    CategoricalCellRenderer.prototype.create = function (col, context) {
        var width = context.colWidth(col);
        return {
            template: "<div>\n        <div class=\"" + cssClass('cat-color') + "\"></div><div class=\"" + cssClass('cat-label') + "\"></div>\n      </div>",
            update: function (n, d) {
                renderMissingDOM(n, col, d);
                var v = col.getCategory(d);
                n.firstElementChild.style.backgroundColor = v ? col.getColor(d) : null;
                setText(n.lastElementChild, col.getLabel(d));
            },
            render: function (ctx, d) {
                if (renderMissingCanvas(ctx, col, d, width)) {
                    return;
                }
                var v = col.getCategory(d);
                ctx.fillStyle = v ? col.getColor(d) : '';
                ctx.fillRect(0, 0, width, CANVAS_HEIGHT);
            },
        };
    };
    CategoricalCellRenderer.prototype.createGroup = function (col, context) {
        var _a = hist(col, false), template = _a.template, update = _a.update;
        return {
            template: template + "</div>",
            update: function (n, group) {
                return context.tasks.groupCategoricalStats(col, group).then(function (r) {
                    if (typeof r === 'symbol') {
                        return;
                    }
                    var isMissing = !r || r.group == null || r.group.count === 0 || r.group.count === r.group.missing;
                    n.classList.toggle(cssClass('missing'), isMissing);
                    if (isMissing) {
                        return;
                    }
                    update(n, r.group);
                });
            },
        };
    };
    CategoricalCellRenderer.prototype.createSummary = function (col, context, interactive) {
        return col instanceof CategoricalColumn ||
            col instanceof OrdinalColumn ||
            col instanceof SetColumn ||
            col instanceof BooleanColumn
            ? interactiveSummary(col, context, interactive)
            : staticSummary(col, context, interactive);
    };
    return CategoricalCellRenderer;
}());
export default CategoricalCellRenderer;
function staticSummary(col, context, interactive) {
    var _a = hist(col, interactive), template = _a.template, update = _a.update;
    return {
        template: template + "</div>",
        update: function (n) {
            return context.tasks.summaryCategoricalStats(col).then(function (r) {
                if (typeof r === 'symbol') {
                    return;
                }
                var isMissing = !r || r.summary == null || r.summary.count === 0 || r.summary.count === r.summary.missing;
                n.classList.toggle(cssClass('missing'), isMissing);
                if (isMissing) {
                    return;
                }
                update(n, r.summary);
            });
        },
    };
}
function interactiveSummary(col, context, interactive) {
    var _a = hist(col, interactive || wideEnough(col)), template = _a.template, update = _a.update;
    var filterUpdate;
    return {
        template: "" + template + (interactive ? filterMissingNumberMarkup(false, 0) : '') + "</div>",
        update: function (n) {
            n.classList.toggle(cssClass('histogram-i'), interactive);
            if (!filterUpdate) {
                filterUpdate = interactiveHist(col, n);
            }
            return context.tasks.summaryCategoricalStats(col).then(function (r) {
                if (typeof r === 'symbol') {
                    return;
                }
                var summary = r.summary, data = r.data;
                filterUpdate(interactive && data ? data.missing : summary ? summary.missing : 0, col);
                var isMissing = !r || r.summary == null || r.summary.count === 0 || r.summary.count === r.summary.missing;
                n.classList.toggle(cssClass('missing'), isMissing);
                if (isMissing) {
                    return;
                }
                update(n, summary, interactive ? data : undefined);
            });
        },
    };
}
function hist(col, showLabels) {
    var mapping = col.getColorMapping();
    var bins = col.categories
        .map(function (c) {
        return "<div class=\"" + cssClass('histogram-bin') + "\" title=\"" + c.label + ": 0\" data-cat=\"" + c.name + "\" " + (showLabels ? "data-title=\"" + c.label + "\"" : '') + "><div style=\"height: 0; background-color: " + mapping.apply(c) + "\"></div></div>";
    })
        .join('');
    var template = "<div class=\"" + cssClass('histogram') + " " + (col.categories.length > DENSE_HISTOGRAM ? cssClass('dense') : '') + "\">" + bins; // no closing div to be able to append things
    return {
        template: template,
        update: function (n, hist, gHist) {
            var mapping = col.getColorMapping();
            var selected = col.categories.map(function (d) {
                var c = color(mapping.apply(d));
                c.opacity = FILTERED_OPACITY;
                return c.toString();
            });
            var maxBin = gHist ? gHist.maxBin : hist.maxBin;
            forEach(n, '[data-cat]', function (d, i) {
                var cat = col.categories[i];
                var count = hist.hist[i].count;
                var inner = d.firstElementChild;
                if (gHist) {
                    var gCount = gHist.hist[i].count;
                    d.title = cat.label + ": " + count + " of " + gCount;
                    inner.style.height = round((gCount * 100) / maxBin, 2) + "%";
                    var relY = 100 - round((count * 100) / gCount, 2);
                    inner.style.background =
                        relY === 0
                            ? mapping.apply(cat)
                            : relY === 100
                                ? selected[i]
                                : "linear-gradient(" + selected[i] + " " + relY + "%, " + mapping.apply(cat) + " " + relY + "%, " + mapping.apply(cat) + " 100%)";
                }
                else {
                    d.title = col.categories[i].label + ": " + count;
                    var inner_1 = d.firstElementChild;
                    inner_1.style.height = Math.round((count * 100) / maxBin) + "%";
                    inner_1.style.background = mapping.apply(cat);
                }
            });
        },
    };
}
function setCategoricalFilter(col, filter, filterMissing) {
    if (col instanceof SetColumn) {
        var f = col.getFilter();
        var mode = f ? f.mode : undefined;
        col.setFilter({
            filter: filter,
            filterMissing: filterMissing,
            mode: mode,
        });
    }
    else {
        col.setFilter({
            filter: filter,
            filterMissing: filterMissing,
        });
    }
}
/** @internal */
export function interactiveHist(col, node) {
    var bins = Array.from(node.querySelectorAll('[data-cat]'));
    var markFilter = function (bin, cat, value) {
        // update filter highlight eagerly for better user feedback
        var inner = bin.firstElementChild;
        var base = col.getColorMapping().apply(cat);
        if (value) {
            inner.style.background = base;
            return;
        }
        var c = color(base);
        c.opacity = FILTERED_OPACITY;
        inner.style.background = c.toString();
    };
    bins.forEach(function (bin, i) {
        var cat = col.categories[i];
        bin.onclick = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            // toggle filter
            var old = col.getFilter();
            if (old == null || !Array.isArray(old.filter)) {
                // deselect
                markFilter(bin, cat, false);
                var included = col.categories.slice();
                included.splice(i, 1);
                setCategoricalFilter(col, included.map(function (d) { return d.name; }), old ? old.filterMissing : false);
                return;
            }
            var filter = old.filter.slice();
            var contained = filter.indexOf(cat.name);
            if (contained >= 0) {
                // remove
                filter.splice(contained, 1);
                markFilter(bin, cat, false);
            }
            else {
                // readd
                filter.push(cat.name);
                markFilter(bin, cat, true);
            }
            if (!old.filterMissing && filter.length === col.categories.length) {
                // dummy filter
                col.setFilter(null);
                return;
            }
            setCategoricalFilter(col, filter, old.filterMissing);
        };
    });
    var filterMissing = node.getElementsByTagName('input')[0];
    if (filterMissing) {
        filterMissing.onchange = function () {
            // toggle filter
            var v = filterMissing.checked;
            var old = col.getFilter();
            if (old == null) {
                if (v) {
                    setCategoricalFilter(col, col.categories.map(function (d) { return d.name; }), v);
                }
                else {
                    col.setFilter(null);
                }
            }
            else if (!v && Array.isArray(old.filter) && old.filter.length === col.categories.length) {
                // dummy
                col.setFilter(null);
            }
            else {
                setCategoricalFilter(col, old.filter, v);
            }
        };
    }
    return function (missing, actCol) {
        col = actCol;
        var f = col.getFilter();
        if (filterMissing) {
            filterMissing.checked = f != null && f.filterMissing;
            updateFilterMissingNumberMarkup(filterMissing.parentElement, missing);
        }
    };
}
//# sourceMappingURL=CategoricalCellRenderer.js.map