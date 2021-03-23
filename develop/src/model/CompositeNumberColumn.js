import { __decorate, __extends } from "tslib";
import { format } from 'd3-format';
import CompositeColumn from './CompositeColumn';
import { isMissingValue } from './missing';
import NumberColumn from './NumberColumn';
import { SortByDefault, toolbar } from './annotations';
/**
 * implementation of a combine column, standard operations how to select
 */
var CompositeNumberColumn = /** @class */ (function (_super) {
    __extends(CompositeNumberColumn, _super);
    function CompositeNumberColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.numberFormat = format('.3n');
        if (desc.numberFormat) {
            _this.numberFormat = format(desc.numberFormat);
        }
        return _this;
    }
    CompositeNumberColumn.prototype.getNumberFormat = function () {
        return this.numberFormat;
    };
    CompositeNumberColumn.prototype.getLabel = function (row) {
        if (!this.isLoaded()) {
            return '';
        }
        var v = this.getValue(row);
        //keep non number if it is not a number else convert using formatter
        return String(typeof v === 'number' && !Number.isNaN(v) && isFinite(v) ? this.numberFormat(v) : v);
    };
    CompositeNumberColumn.prototype.getValue = function (row) {
        if (!this.isLoaded()) {
            return null;
        }
        //weighted sum
        var v = this.compute(row);
        if (isMissingValue(v)) {
            return null;
        }
        return v;
    };
    CompositeNumberColumn.prototype.compute = function (_row) {
        return NaN;
    };
    CompositeNumberColumn.prototype.getNumber = function (row) {
        var r = this.getValue(row);
        return r == null ? NaN : r;
    };
    CompositeNumberColumn.prototype.getRawNumber = function (row) {
        return this.getNumber(row);
    };
    CompositeNumberColumn.prototype.iterNumber = function (row) {
        return [this.getNumber(row)];
    };
    CompositeNumberColumn.prototype.iterRawNumber = function (row) {
        return [this.getRawNumber(row)];
    };
    CompositeNumberColumn.prototype.getExportValue = function (row, format) {
        if (format === 'json') {
            return {
                value: this.getRawNumber(row),
                children: this.children.map(function (d) { return d.getExportValue(row, format); }),
            };
        }
        return _super.prototype.getExportValue.call(this, row, format);
    };
    CompositeNumberColumn.prototype.toCompareValue = function (row) {
        return NumberColumn.prototype.toCompareValue.call(this, row);
    };
    CompositeNumberColumn.prototype.toCompareValueType = function () {
        return NumberColumn.prototype.toCompareValueType.call(this);
    };
    CompositeNumberColumn.prototype.toCompareGroupValue = function (rows, group) {
        return NumberColumn.prototype.toCompareGroupValue.call(this, rows, group);
    };
    CompositeNumberColumn.prototype.toCompareGroupValueType = function () {
        return NumberColumn.prototype.toCompareGroupValueType.call(this);
    };
    CompositeNumberColumn.prototype.getRenderer = function () {
        return NumberColumn.prototype.getRenderer.call(this);
    };
    CompositeNumberColumn = __decorate([
        toolbar('rename', 'clone', 'sort', 'sortBy', 'group', 'groupBy'),
        SortByDefault('descending')
    ], CompositeNumberColumn);
    return CompositeNumberColumn;
}(CompositeColumn));
export default CompositeNumberColumn;
//# sourceMappingURL=CompositeNumberColumn.js.map