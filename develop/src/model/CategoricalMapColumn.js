import { __decorate, __extends } from "tslib";
import { DEFAULT_COLOR } from './interfaces';
import MapColumn from './MapColumn';
import { DEFAULT_CATEGORICAL_COLOR_FUNCTION } from './CategoricalColorMappingFunction';
import CategoricalColumn from './CategoricalColumn';
import { toolbar } from './annotations';
import { toCategories } from './internalCategorical';
var CategoricalMapColumn = /** @class */ (function (_super) {
    __extends(CategoricalMapColumn, _super);
    function CategoricalMapColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.lookup = new Map();
        _this.categories = toCategories(desc);
        _this.categories.forEach(function (d) { return _this.lookup.set(d.name, d); });
        _this.colorMapping = DEFAULT_CATEGORICAL_COLOR_FUNCTION;
        return _this;
    }
    CategoricalMapColumn_1 = CategoricalMapColumn;
    CategoricalMapColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([CategoricalMapColumn_1.EVENT_COLOR_MAPPING_CHANGED]);
    };
    CategoricalMapColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    CategoricalMapColumn.prototype.parseValue = function (v) {
        if (!v) {
            return null;
        }
        var vs = String(v);
        return this.lookup.has(vs) ? this.lookup.get(vs) : null;
    };
    CategoricalMapColumn.prototype.getCategoryMap = function (row) {
        var _this = this;
        return _super.prototype.getMap.call(this, row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: _this.parseValue(value),
            });
        });
    };
    CategoricalMapColumn.prototype.getCategories = function (row) {
        return this.getCategoryMap(row).map(function (d) { return d.value; });
    };
    CategoricalMapColumn.prototype.getColors = function (row) {
        var _this = this;
        return this.getCategoryMap(row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: value ? _this.colorMapping.apply(value) : DEFAULT_COLOR,
            });
        });
    };
    CategoricalMapColumn.prototype.getValue = function (row) {
        var r = this.getCategoryMap(row);
        return r.length === 0
            ? null
            : r.map(function (_a) {
                var key = _a.key, value = _a.value;
                return ({
                    key: key,
                    value: value ? value.name : null,
                });
            });
    };
    CategoricalMapColumn.prototype.getLabels = function (row) {
        return this.getCategoryMap(row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: value ? value.label : '',
            });
        });
    };
    CategoricalMapColumn.prototype.getColorMapping = function () {
        return this.colorMapping.clone();
    };
    CategoricalMapColumn.prototype.setColorMapping = function (mapping) {
        return CategoricalColumn.prototype.setColorMapping.call(this, mapping);
    };
    CategoricalMapColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.colorMapping = this.colorMapping.toJSON();
        return r;
    };
    CategoricalMapColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        this.colorMapping = factory.categoricalColorMappingFunction(dump.colorMapping, this.categories);
    };
    CategoricalMapColumn.prototype.iterCategory = function (row) {
        return this.getCategories(row);
    };
    var CategoricalMapColumn_1;
    CategoricalMapColumn.EVENT_COLOR_MAPPING_CHANGED = CategoricalColumn.EVENT_COLOR_MAPPING_CHANGED;
    CategoricalMapColumn = CategoricalMapColumn_1 = __decorate([
        toolbar('rename', 'colorMappedCategorical')
    ], CategoricalMapColumn);
    return CategoricalMapColumn;
}(MapColumn));
export default CategoricalMapColumn;
//# sourceMappingURL=CategoricalMapColumn.js.map