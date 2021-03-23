import { __extends } from "tslib";
import { SetColumn, Ranking, } from '../../model';
import { findFilterMissing, updateFilterMissingNumberMarkup, filterMissingNumberMarkup } from '../missing';
import ADialog from './ADialog';
import { forEach } from './utils';
import { cssClass, engineCssClass } from '../../styles';
import { isCategoryIncluded } from '../../model/internalCategorical';
/** @internal */
var CategoricalFilterDialog = /** @class */ (function (_super) {
    __extends(CategoricalFilterDialog, _super);
    function CategoricalFilterDialog(column, dialog, ctx) {
        var _this = _super.call(this, dialog, {
            livePreview: 'filter',
        }) || this;
        _this.column = column;
        _this.ctx = ctx;
        _this.before = _this.column.getFilter() || { filter: '', filterMissing: false };
        return _this;
    }
    CategoricalFilterDialog.prototype.build = function (node) {
        var _this = this;
        node.insertAdjacentHTML('beforeend', "<div class=\"" + cssClass('dialog-table') + "\">\n        <label class=\"" + cssClass('checkbox') + " " + cssClass('dialog-filter-table-entry') + "\">\n          <input type=\"checkbox\" checked>\n          <span>\n            <span class=\"" + cssClass('dialog-filter-table-color') + "\"></span>\n            <div>Un/Select All</div>\n          </span>\n        </label>\n        " + this.column.categories
            .map(function (c) { return "<label class=\"" + cssClass('checkbox') + " " + cssClass('dialog-filter-table-entry') + "\">\n          <input data-cat=\"" + c.name + "\" type=\"checkbox\"" + (isCategoryIncluded(_this.before, c) ? 'checked' : '') + ">\n          <span>\n            <span class=\"" + cssClass('dialog-filter-table-color') + "\" style=\"background-color: " + c.color + "\"></span>\n            <div class=\"" + cssClass('dialog-filter-table-entry-label') + "\">" + c.label + "</div>\n            <div class=\"" + cssClass('dialog-filter-table-entry-stats') + "\"></div>\n          </span>\n        </label>"; })
            .join('') + "\n    </div>");
        // selectAll
        var selectAll = this.findInput('input:not([data-cat])');
        selectAll.onchange = function () {
            forEach(node, 'input[data-cat]', function (n) { return (n.checked = selectAll.checked); });
        };
        if (this.column instanceof SetColumn) {
            var some = this.before.mode !== 'every';
            node.insertAdjacentHTML('beforeend', "<strong>Show rows where</strong>");
            node.insertAdjacentHTML('beforeend', "<label class=\"" + cssClass('checkbox') + "\">\n        <input type=\"radio\" " + (!some ? 'checked="checked"' : '') + " name=\"mode\" value=\"every\">\n        <span>all are selected</span>\n      </label>");
            node.insertAdjacentHTML('beforeend', "<label class=\"" + cssClass('checkbox') + "\" style=\"padding-bottom: 0.6em\">\n        <input type=\"radio\" " + (some ? 'checked="checked"' : '') + " name=\"mode\" value=\"some\">\n        <span>some are selected</span>\n      </label>");
        }
        node.insertAdjacentHTML('beforeend', filterMissingNumberMarkup(this.before.filterMissing, 0));
        this.enableLivePreviews('input[type=checkbox],input[type=radio]');
        var ranking = this.column.findMyRanker();
        if (ranking) {
            ranking.on(Ranking.EVENT_ORDER_CHANGED + ".catFilter", function () { return _this.updateStats(); });
        }
        this.updateStats();
    };
    CategoricalFilterDialog.prototype.updateStats = function () {
        var _this = this;
        var ready = this.ctx.provider
            .getTaskExecutor()
            .summaryCategoricalStats(this.column)
            .then(function (r) {
            if (typeof r === 'symbol') {
                return;
            }
            var summary = r.summary, data = r.data;
            var missing = data ? data.missing : summary ? summary.missing : 0;
            updateFilterMissingNumberMarkup(findFilterMissing(_this.node).parentElement, missing);
            if (!summary || !data) {
                return;
            }
            _this.forEach("." + cssClass('dialog-filter-table-entry-stats'), function (n, i) {
                var bin = summary.hist[i];
                var raw = data.hist[i];
                n.textContent = bin.count + "/" + raw.count;
            });
        });
        if (!ready) {
            return;
        }
        this.node.classList.add(engineCssClass('loading'));
        ready.then(function () {
            _this.node.classList.remove(engineCssClass('loading'));
        });
    };
    CategoricalFilterDialog.prototype.updateFilter = function (filter, filterMissing, someMode) {
        if (someMode === void 0) { someMode = false; }
        var noFilter = filter == null && filterMissing === false;
        var f = { filter: filter, filterMissing: filterMissing };
        if (this.column instanceof SetColumn) {
            f.mode = someMode ? 'some' : 'every';
        }
        this.column.setFilter(noFilter ? null : f);
    };
    CategoricalFilterDialog.prototype.reset = function () {
        this.forEach('input[data-cat]', function (n) { return (n.checked = true); });
        findFilterMissing(this.node).checked = false;
        var mode = this.findInput('input[value=every]');
        if (mode) {
            mode.checked = true;
        }
    };
    CategoricalFilterDialog.prototype.cancel = function () {
        this.updateFilter(this.before.filter === '' ? null : this.before.filter, this.before.filterMissing, this.before.mode === 'some');
    };
    CategoricalFilterDialog.prototype.submit = function () {
        var f = this.forEach('input[data-cat]:checked', function (n) { return n.dataset.cat; });
        if (f.length === this.column.categories.length) {
            // all checked = no filter
            f = null;
        }
        var filterMissing = findFilterMissing(this.node).checked;
        var mode = this.findInput('input[value=some]');
        this.updateFilter(f, filterMissing, mode != null && mode.checked);
        return true;
    };
    CategoricalFilterDialog.prototype.cleanUp = function (action) {
        _super.prototype.cleanUp.call(this, action);
        var ranking = this.column.findMyRanker();
        if (ranking) {
            ranking.on(Ranking.EVENT_ORDER_CHANGED + ".catFilter", null);
        }
    };
    return CategoricalFilterDialog;
}(ADialog));
export default CategoricalFilterDialog;
//# sourceMappingURL=CategoricalFilterDialog.js.map