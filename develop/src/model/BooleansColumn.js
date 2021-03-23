import { __decorate, __extends } from "tslib";
import ArrayColumn from './ArrayColumn';
import { DEFAULT_COLOR } from './interfaces';
import CategoricalColumn from './CategoricalColumn';
import { DEFAULT_CATEGORICAL_COLOR_FUNCTION } from './CategoricalColorMappingFunction';
import { chooseUIntByDataLength, integrateDefaults } from './internal';
import { toCategory } from './internalCategorical';
import { toolbar } from './annotations';
var BooleansColumn = /** @class */ (function (_super) {
    __extends(BooleansColumn, _super);
    function BooleansColumn(id, desc) {
        var _this = _super.call(this, id, integrateDefaults(desc, {
            renderer: 'upset',
        })) || this;
        _this.colorMapping = DEFAULT_CATEGORICAL_COLOR_FUNCTION;
        return _this;
    }
    BooleansColumn_1 = BooleansColumn;
    Object.defineProperty(BooleansColumn.prototype, "categories", {
        get: function () {
            return this.labels.map(function (d, i) { return toCategory(d, i); });
        },
        enumerable: false,
        configurable: true
    });
    BooleansColumn.prototype.getSet = function (row) {
        var vs = this.getValues(row);
        return new Set(this.categories.filter(function (_, i) { return vs[i]; }));
    };
    BooleansColumn.prototype.toCompareValue = function (row) {
        var v = this.getValue(row);
        if (v == null) {
            return NaN;
        }
        return v.reduce(function (a, b) { return a + (b ? 1 : 0); }, 0);
    };
    BooleansColumn.prototype.toCompareValueType = function () {
        return chooseUIntByDataLength(this.dataLength);
    };
    BooleansColumn.prototype.getCategories = function (row) {
        var categories = this.categories;
        return _super.prototype.getValues.call(this, row).map(function (v, i) {
            return v ? categories[i] : null;
        });
    };
    BooleansColumn.prototype.iterCategory = function (row) {
        return this.getCategories(row);
    };
    BooleansColumn.prototype.getColors = function (row) {
        var _this = this;
        return this.getCategories(row).map(function (d) { return (d ? _this.colorMapping.apply(d) : DEFAULT_COLOR); });
    };
    BooleansColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([BooleansColumn_1.EVENT_COLOR_MAPPING_CHANGED]);
    };
    BooleansColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    BooleansColumn.prototype.getColorMapping = function () {
        return this.colorMapping.clone();
    };
    BooleansColumn.prototype.setColorMapping = function (mapping) {
        return CategoricalColumn.prototype.setColorMapping.call(this, mapping);
    };
    BooleansColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.colorMapping = this.colorMapping.toJSON();
        return r;
    };
    BooleansColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        this.colorMapping = factory.categoricalColorMappingFunction(dump.colorMapping, this.categories);
    };
    var BooleansColumn_1;
    BooleansColumn.EVENT_COLOR_MAPPING_CHANGED = CategoricalColumn.EVENT_COLOR_MAPPING_CHANGED;
    BooleansColumn = BooleansColumn_1 = __decorate([
        toolbar('rename', 'clone', 'sort', 'sortBy')
    ], BooleansColumn);
    return BooleansColumn;
}(ArrayColumn));
export default BooleansColumn;
//# sourceMappingURL=BooleansColumn.js.map