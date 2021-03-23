import { __extends } from "tslib";
import { filterMissingMarkup, findFilterMissing } from '../missing';
import ADialog from './ADialog';
import { cssClass } from '../../styles';
import { debounce } from '../../internal';
function toInput(text, isRegex) {
    var v = text.trim();
    if (v === '') {
        return null;
    }
    return isRegex ? new RegExp(v, 'm') : v;
}
/** @internal */
var StringFilterDialog = /** @class */ (function (_super) {
    __extends(StringFilterDialog, _super);
    function StringFilterDialog(column, dialog) {
        var _this = _super.call(this, dialog, {
            livePreview: 'filter',
        }) || this;
        _this.column = column;
        _this.before = _this.column.getFilter();
        return _this;
    }
    StringFilterDialog.prototype.updateFilter = function (filter, filterMissing) {
        if (filter == null && !filterMissing) {
            this.column.setFilter(null);
        }
        else {
            this.column.setFilter({ filter: filter, filterMissing: filterMissing });
        }
    };
    StringFilterDialog.prototype.reset = function () {
        this.findInput('input[type="text"]').value = '';
        this.forEach('input[type=checkbox]', function (n) { return (n.checked = false); });
    };
    StringFilterDialog.prototype.cancel = function () {
        if (this.before) {
            this.updateFilter(this.before.filter === '' ? null : this.before.filter, this.before.filterMissing);
        }
        else {
            this.updateFilter(null, false);
        }
    };
    StringFilterDialog.prototype.submit = function () {
        var filterMissing = findFilterMissing(this.node).checked;
        var input = this.findInput('input[type="text"]').value;
        var isRegex = this.findInput('input[type="checkbox"]').checked;
        this.updateFilter(toInput(input, isRegex), filterMissing);
        return true;
    };
    StringFilterDialog.prototype.build = function (node) {
        var _this = this;
        var bak = this.column.getFilter() || { filter: '', filterMissing: false };
        node.insertAdjacentHTML('beforeend', "<input type=\"text\" placeholder=\"Filter " + this.column.desc.label + "...\" autofocus value=\"" + (bak.filter instanceof RegExp ? bak.filter.source : bak.filter || '') + "\" style=\"width: 100%\">\n    <label class=\"" + cssClass('checkbox') + "\">\n      <input type=\"checkbox\" " + (bak.filter instanceof RegExp ? 'checked="checked"' : '') + ">\n      <span>Use regular expressions</span>\n    </label>\n    " + filterMissingMarkup(bak.filterMissing));
        var filterMissing = findFilterMissing(node);
        var input = node.querySelector('input[type="text"]');
        var isRegex = node.querySelector('input[type="checkbox"]');
        this.enableLivePreviews([filterMissing, input, isRegex]);
        if (!this.showLivePreviews()) {
            return;
        }
        input.addEventListener('input', debounce(function () { return _this.submit(); }, 100), {
            passive: true,
        });
    };
    return StringFilterDialog;
}(ADialog));
export default StringFilterDialog;
//# sourceMappingURL=StringFilterDialog.js.map