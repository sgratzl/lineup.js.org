import { __decorate, __extends } from "tslib";
import { Category } from './annotations';
import ValueColumn from './ValueColumn';
import { empty } from '../internal';
var ArrayColumn = /** @class */ (function (_super) {
    __extends(ArrayColumn, _super);
    function ArrayColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this._dataLength = desc.dataLength == null || Number.isNaN(desc.dataLength) ? null : desc.dataLength;
        _this.originalLabels =
            desc.labels || empty(_this._dataLength == null ? 0 : _this._dataLength).map(function (_d, i) { return "Column " + i; });
        return _this;
    }
    Object.defineProperty(ArrayColumn.prototype, "labels", {
        get: function () {
            return this.originalLabels;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrayColumn.prototype, "dataLength", {
        get: function () {
            return this._dataLength;
        },
        enumerable: false,
        configurable: true
    });
    ArrayColumn.prototype.getValue = function (row) {
        var r = this.getValues(row);
        return r.every(function (d) { return d === null; }) ? null : r;
    };
    ArrayColumn.prototype.getValues = function (row) {
        var r = _super.prototype.getValue.call(this, row);
        return r == null ? [] : r;
    };
    ArrayColumn.prototype.getLabels = function (row) {
        return this.getValues(row).map(String);
    };
    ArrayColumn.prototype.getLabel = function (row) {
        var v = this.getLabels(row);
        if (v.length === 0) {
            return '';
        }
        return v.toString();
    };
    ArrayColumn.prototype.getMap = function (row) {
        var labels = this.labels;
        return this.getValues(row).map(function (value, i) { return ({ key: labels[i], value: value }); });
    };
    ArrayColumn.prototype.getMapLabel = function (row) {
        var labels = this.labels;
        return this.getLabels(row).map(function (value, i) { return ({ key: labels[i], value: value }); });
    };
    ArrayColumn = __decorate([
        Category('array')
    ], ArrayColumn);
    return ArrayColumn;
}(ValueColumn));
export default ArrayColumn;
//# sourceMappingURL=ArrayColumn.js.map