import { __decorate, __extends } from "tslib";
import { equalArrays, extent } from '../internal';
import { Category, toolbar } from './annotations';
import { DEFAULT_CATEGORICAL_COLOR_FUNCTION } from './CategoricalColorMappingFunction';
import CategoricalColumn from './CategoricalColumn';
import Column from './Column';
import NumberColumn from './NumberColumn';
import ValueColumn from './ValueColumn';
import { toCategories } from './internalCategorical';
import { DEFAULT_FORMATTER } from './internalNumber';
import { integrateDefaults } from './internal';
/**
 * similar to a categorical column but the categories are mapped to numbers
 */
var OrdinalColumn = /** @class */ (function (_super) {
    __extends(OrdinalColumn, _super);
    function OrdinalColumn(id, desc) {
        var _this = _super.call(this, id, integrateDefaults(desc, {
            renderer: 'number',
            groupRenderer: 'boxplot',
        })) || this;
        _this.lookup = new Map();
        _this.currentFilter = null;
        _this.categories = toCategories(desc);
        _this.categories.forEach(function (d) { return _this.lookup.set(d.name, d); });
        _this.colorMapping = DEFAULT_CATEGORICAL_COLOR_FUNCTION;
        return _this;
    }
    OrdinalColumn_1 = OrdinalColumn;
    OrdinalColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this)
            .concat([
            OrdinalColumn_1.EVENT_COLOR_MAPPING_CHANGED,
            OrdinalColumn_1.EVENT_MAPPING_CHANGED,
            OrdinalColumn_1.EVENT_FILTER_CHANGED,
        ]);
    };
    OrdinalColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    OrdinalColumn.prototype.getNumberFormat = function () {
        return DEFAULT_FORMATTER;
    };
    Object.defineProperty(OrdinalColumn.prototype, "dataLength", {
        get: function () {
            return this.categories.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrdinalColumn.prototype, "labels", {
        get: function () {
            return this.categories.map(function (d) { return d.label; });
        },
        enumerable: false,
        configurable: true
    });
    OrdinalColumn.prototype.getValue = function (row) {
        var v = this.getNumber(row);
        return Number.isNaN(v) ? null : v;
    };
    OrdinalColumn.prototype.getCategory = function (row) {
        var v = _super.prototype.getValue.call(this, row);
        if (!v) {
            return null;
        }
        var vs = String(v);
        return this.lookup.has(vs) ? this.lookup.get(vs) : null;
    };
    OrdinalColumn.prototype.getCategories = function (row) {
        return [this.getCategory(row)];
    };
    OrdinalColumn.prototype.iterCategory = function (row) {
        return [this.getCategory(row)];
    };
    OrdinalColumn.prototype.iterNumber = function (row) {
        return [this.getNumber(row)];
    };
    OrdinalColumn.prototype.iterRawNumber = function (row) {
        return [this.getRawNumber(row)];
    };
    OrdinalColumn.prototype.getColor = function (row) {
        return CategoricalColumn.prototype.getColor.call(this, row);
    };
    OrdinalColumn.prototype.getLabel = function (row) {
        return CategoricalColumn.prototype.getLabel.call(this, row);
    };
    OrdinalColumn.prototype.getLabels = function (row) {
        return CategoricalColumn.prototype.getLabels.call(this, row);
    };
    OrdinalColumn.prototype.getValues = function (row) {
        return CategoricalColumn.prototype.getValues.call(this, row);
    };
    OrdinalColumn.prototype.getMap = function (row) {
        return CategoricalColumn.prototype.getMap.call(this, row);
    };
    OrdinalColumn.prototype.getMapLabel = function (row) {
        return CategoricalColumn.prototype.getMapLabel.call(this, row);
    };
    OrdinalColumn.prototype.getSet = function (row) {
        return CategoricalColumn.prototype.getSet.call(this, row);
    };
    OrdinalColumn.prototype.getNumber = function (row) {
        var v = this.getCategory(row);
        return v ? v.value : NaN;
    };
    OrdinalColumn.prototype.getRawNumber = function (row) {
        return this.getNumber(row);
    };
    OrdinalColumn.prototype.getExportValue = function (row, format) {
        if (format === 'json') {
            var value = this.getNumber(row);
            if (Number.isNaN(value)) {
                return null;
            }
            return {
                name: this.getLabel(row),
                value: value,
            };
        }
        return _super.prototype.getExportValue.call(this, row, format);
    };
    OrdinalColumn.prototype.dump = function (toDescRef) {
        var r = CategoricalColumn.prototype.dump.call(this, toDescRef);
        r.mapping = this.getMapping();
        return r;
    };
    OrdinalColumn.prototype.restore = function (dump, factory) {
        CategoricalColumn.prototype.restore.call(this, dump, factory);
        if (dump.mapping) {
            this.setMapping(dump.mapping);
        }
    };
    OrdinalColumn.prototype.getMapping = function () {
        return this.categories.map(function (d) { return d.value; });
    };
    OrdinalColumn.prototype.setMapping = function (mapping) {
        var r = extent(mapping);
        mapping = mapping.map(function (d) { return (d - r[0]) / (r[1] - r[0]); });
        var bak = this.getMapping();
        if (equalArrays(bak, mapping)) {
            return;
        }
        this.categories.forEach(function (d, i) { return (d.value = mapping[i] || 0); });
        this.fire([
            OrdinalColumn_1.EVENT_MAPPING_CHANGED,
            Column.EVENT_DIRTY_HEADER,
            Column.EVENT_DIRTY_VALUES,
            Column.EVENT_DIRTY_CACHES,
            Column.EVENT_DIRTY,
        ], bak, this.getMapping());
    };
    OrdinalColumn.prototype.getColorMapping = function () {
        return this.colorMapping.clone();
    };
    OrdinalColumn.prototype.setColorMapping = function (mapping) {
        return CategoricalColumn.prototype.setColorMapping.call(this, mapping);
    };
    OrdinalColumn.prototype.isFiltered = function () {
        return this.currentFilter != null;
    };
    OrdinalColumn.prototype.filter = function (row) {
        return CategoricalColumn.prototype.filter.call(this, row);
    };
    OrdinalColumn.prototype.group = function (row) {
        return CategoricalColumn.prototype.group.call(this, row);
    };
    OrdinalColumn.prototype.getFilter = function () {
        return this.currentFilter;
    };
    OrdinalColumn.prototype.setFilter = function (filter) {
        return CategoricalColumn.prototype.setFilter.call(this, filter);
    };
    OrdinalColumn.prototype.clearFilter = function () {
        return CategoricalColumn.prototype.clearFilter.call(this);
    };
    OrdinalColumn.prototype.toCompareValue = function (row) {
        return CategoricalColumn.prototype.toCompareValue.call(this, row);
    };
    OrdinalColumn.prototype.toCompareValueType = function () {
        return CategoricalColumn.prototype.toCompareValueType.call(this);
    };
    OrdinalColumn.prototype.getRenderer = function () {
        return NumberColumn.prototype.getRenderer.call(this);
    };
    var OrdinalColumn_1;
    OrdinalColumn.EVENT_MAPPING_CHANGED = NumberColumn.EVENT_MAPPING_CHANGED;
    OrdinalColumn.EVENT_FILTER_CHANGED = CategoricalColumn.EVENT_FILTER_CHANGED;
    OrdinalColumn.EVENT_COLOR_MAPPING_CHANGED = CategoricalColumn.EVENT_COLOR_MAPPING_CHANGED;
    OrdinalColumn = OrdinalColumn_1 = __decorate([
        toolbar('rename', 'clone', 'sort', 'sortBy', 'group', 'filterOrdinal', 'colorMappedCategorical'),
        Category('categorical')
    ], OrdinalColumn);
    return OrdinalColumn;
}(ValueColumn));
export default OrdinalColumn;
//# sourceMappingURL=OrdinalColumn.js.map