import { __decorate, __extends } from "tslib";
import ArrayColumn from './ArrayColumn';
import { DEFAULT_COLOR } from './interfaces';
import { toolbar } from './annotations';
import CategoricalColumn from './CategoricalColumn';
import { DEFAULT_CATEGORICAL_COLOR_FUNCTION } from './CategoricalColorMappingFunction';
import { toCategories } from './internalCategorical';
/**
 * a string column with optional alignment
 */
var CategoricalsColumn = /** @class */ (function (_super) {
    __extends(CategoricalsColumn, _super);
    function CategoricalsColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.lookup = new Map();
        _this.categories = toCategories(desc);
        _this.categories.forEach(function (d) { return _this.lookup.set(d.name, d); });
        _this.colorMapping = DEFAULT_CATEGORICAL_COLOR_FUNCTION;
        return _this;
    }
    CategoricalsColumn_1 = CategoricalsColumn;
    CategoricalsColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([CategoricalsColumn_1.EVENT_COLOR_MAPPING_CHANGED]);
    };
    CategoricalsColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    CategoricalsColumn.prototype.getCategories = function (row) {
        var _this = this;
        return _super.prototype.getValues.call(this, row).map(function (v) {
            if (!v) {
                return null;
            }
            var vs = String(v);
            return _this.lookup.has(vs) ? _this.lookup.get(vs) : null;
        });
    };
    CategoricalsColumn.prototype.getColors = function (row) {
        var _this = this;
        return this.getCategories(row).map(function (d) { return (d ? _this.colorMapping.apply(d) : DEFAULT_COLOR); });
    };
    CategoricalsColumn.prototype.iterCategory = function (row) {
        return this.getCategories(row);
    };
    CategoricalsColumn.prototype.getValues = function (row) {
        return this.getCategories(row).map(function (v) { return (v ? v.name : null); });
    };
    CategoricalsColumn.prototype.getLabels = function (row) {
        return this.getCategories(row).map(function (v) { return (v ? v.label : ''); });
    };
    CategoricalsColumn.prototype.getColorMapping = function () {
        return this.colorMapping.clone();
    };
    CategoricalsColumn.prototype.setColorMapping = function (mapping) {
        return CategoricalColumn.prototype.setColorMapping.call(this, mapping);
    };
    CategoricalsColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.colorMapping = this.colorMapping.toJSON();
        return r;
    };
    CategoricalsColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        this.colorMapping = factory.categoricalColorMappingFunction(dump.colorMapping, this.categories);
    };
    var CategoricalsColumn_1;
    CategoricalsColumn.EVENT_COLOR_MAPPING_CHANGED = CategoricalColumn.EVENT_COLOR_MAPPING_CHANGED;
    CategoricalsColumn = CategoricalsColumn_1 = __decorate([
        toolbar('rename', 'colorMappedCategorical')
    ], CategoricalsColumn);
    return CategoricalsColumn;
}(ArrayColumn));
export default CategoricalsColumn;
//# sourceMappingURL=CategoricalsColumn.js.map