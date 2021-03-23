import { __decorate, __extends } from "tslib";
import { format } from 'd3-format';
import { Category, dialogAddons, SortByDefault, toolbar } from './annotations';
import Column from './Column';
import { ECompareValueType } from './interfaces';
import { ESortMethod, } from './INumberColumn';
import { restoreMapping } from './MappingFunction';
import NumberColumn from './NumberColumn';
import ValueColumn from './ValueColumn';
import { DEFAULT_FORMATTER, noNumberFilter, toCompareBoxPlotValue, getBoxPlotNumber, isDummyNumberFilter, restoreNumberFilter, } from './internalNumber';
var BoxPlotColumn = /** @class */ (function (_super) {
    __extends(BoxPlotColumn, _super);
    function BoxPlotColumn(id, desc, factory) {
        var _this = _super.call(this, id, desc) || this;
        _this.numberFormat = DEFAULT_FORMATTER;
        /**
         * currently active filter
         * @type {{min: number, max: number}}
         * @private
         */
        _this.currentFilter = noNumberFilter();
        _this.mapping = restoreMapping(desc, factory);
        _this.original = _this.mapping.clone();
        _this.colorMapping = factory.colorMappingFunction(desc.colorMapping);
        if (desc.numberFormat) {
            _this.numberFormat = format(desc.numberFormat);
        }
        _this.sort = desc.sort || ESortMethod.min;
        return _this;
    }
    BoxPlotColumn_1 = BoxPlotColumn;
    BoxPlotColumn.prototype.getNumberFormat = function () {
        return this.numberFormat;
    };
    BoxPlotColumn.prototype.toCompareValue = function (row) {
        return toCompareBoxPlotValue(this, row);
    };
    BoxPlotColumn.prototype.toCompareValueType = function () {
        return ECompareValueType.FLOAT;
    };
    BoxPlotColumn.prototype.getBoxPlotData = function (row) {
        return this.getValue(row);
    };
    BoxPlotColumn.prototype.getRange = function () {
        return this.mapping.getRange(this.numberFormat);
    };
    BoxPlotColumn.prototype.getRawBoxPlotData = function (row) {
        return this.getRawValue(row);
    };
    BoxPlotColumn.prototype.getRawValue = function (row) {
        return _super.prototype.getValue.call(this, row);
    };
    BoxPlotColumn.prototype.getExportValue = function (row, format) {
        return format === 'json' ? this.getRawValue(row) : _super.prototype.getExportValue.call(this, row, format);
    };
    BoxPlotColumn.prototype.getValue = function (row) {
        var _this = this;
        var v = this.getRawValue(row);
        if (v == null) {
            return null;
        }
        var r = {
            min: this.mapping.apply(v.min),
            max: this.mapping.apply(v.max),
            median: this.mapping.apply(v.median),
            q1: this.mapping.apply(v.q1),
            q3: this.mapping.apply(v.q3),
        };
        if (v.outlier) {
            Object.assign(r, {
                outlier: v.outlier.map(function (d) { return _this.mapping.apply(d); }),
            });
        }
        if (v.whiskerLow != null) {
            Object.assign(r, {
                whiskerLow: this.mapping.apply(v.whiskerLow),
            });
        }
        if (v.whiskerHigh != null) {
            Object.assign(r, {
                whiskerHigh: this.mapping.apply(v.whiskerHigh),
            });
        }
        return r;
    };
    BoxPlotColumn.prototype.getNumber = function (row) {
        return getBoxPlotNumber(this, row, 'normalized');
    };
    BoxPlotColumn.prototype.getRawNumber = function (row) {
        return getBoxPlotNumber(this, row, 'raw');
    };
    BoxPlotColumn.prototype.iterNumber = function (row) {
        return [this.getNumber(row)];
    };
    BoxPlotColumn.prototype.iterRawNumber = function (row) {
        return [this.getRawNumber(row)];
    };
    BoxPlotColumn.prototype.getLabel = function (row) {
        var v = this.getRawValue(row);
        if (v == null) {
            return '';
        }
        var f = this.numberFormat;
        return "BoxPlot(min = " + f(v.min) + ", q1 = " + f(v.q1) + ", median = " + f(v.median) + ", q3 = " + f(v.q3) + ", max = " + f(v.max) + ")";
    };
    BoxPlotColumn.prototype.getSortMethod = function () {
        return this.sort;
    };
    BoxPlotColumn.prototype.setSortMethod = function (sort) {
        if (this.sort === sort) {
            return;
        }
        this.fire(BoxPlotColumn_1.EVENT_SORTMETHOD_CHANGED, this.sort, (this.sort = sort));
        // sort by me if not already sorted by me
        if (!this.isSortedByMe().asc) {
            this.sortByMe();
        }
    };
    BoxPlotColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.sortMethod = this.getSortMethod();
        r.filter = !isDummyNumberFilter(this.currentFilter) ? this.currentFilter : null;
        r.map = this.mapping.toJSON();
        r.colorMapping = this.colorMapping.toJSON();
        return r;
    };
    BoxPlotColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
        if (dump.filter) {
            this.currentFilter = restoreNumberFilter(dump.filter);
        }
        if (dump.map || dump.domain) {
            this.mapping = restoreMapping(dump, factory);
        }
        if (dump.colorMapping) {
            this.colorMapping = factory.colorMappingFunction(dump.colorMapping);
        }
    };
    BoxPlotColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this)
            .concat([
            BoxPlotColumn_1.EVENT_SORTMETHOD_CHANGED,
            BoxPlotColumn_1.EVENT_COLOR_MAPPING_CHANGED,
            BoxPlotColumn_1.EVENT_MAPPING_CHANGED,
            BoxPlotColumn_1.EVENT_FILTER_CHANGED,
        ]);
    };
    BoxPlotColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    BoxPlotColumn.prototype.getOriginalMapping = function () {
        return this.original.clone();
    };
    BoxPlotColumn.prototype.getMapping = function () {
        return this.mapping.clone();
    };
    BoxPlotColumn.prototype.setMapping = function (mapping) {
        if (this.mapping.eq(mapping)) {
            return;
        }
        this.fire([
            BoxPlotColumn_1.EVENT_MAPPING_CHANGED,
            Column.EVENT_DIRTY_HEADER,
            Column.EVENT_DIRTY_VALUES,
            Column.EVENT_DIRTY_CACHES,
            Column.EVENT_DIRTY,
        ], this.mapping.clone(), (this.mapping = mapping));
    };
    BoxPlotColumn.prototype.getColor = function (row) {
        return NumberColumn.prototype.getColor.call(this, row);
    };
    BoxPlotColumn.prototype.getColorMapping = function () {
        return this.colorMapping.clone();
    };
    BoxPlotColumn.prototype.setColorMapping = function (mapping) {
        if (this.colorMapping.eq(mapping)) {
            return;
        }
        this.fire([
            BoxPlotColumn_1.EVENT_COLOR_MAPPING_CHANGED,
            Column.EVENT_DIRTY_HEADER,
            Column.EVENT_DIRTY_VALUES,
            Column.EVENT_DIRTY_CACHES,
            Column.EVENT_DIRTY,
        ], this.colorMapping.clone(), (this.colorMapping = mapping));
    };
    BoxPlotColumn.prototype.isFiltered = function () {
        return NumberColumn.prototype.isFiltered.call(this);
    };
    BoxPlotColumn.prototype.getFilter = function () {
        return NumberColumn.prototype.getFilter.call(this);
    };
    BoxPlotColumn.prototype.setFilter = function (value) {
        NumberColumn.prototype.setFilter.call(this, value);
    };
    BoxPlotColumn.prototype.filter = function (row) {
        return NumberColumn.prototype.filter.call(this, row);
    };
    BoxPlotColumn.prototype.clearFilter = function () {
        return NumberColumn.prototype.clearFilter.call(this);
    };
    var BoxPlotColumn_1;
    BoxPlotColumn.EVENT_MAPPING_CHANGED = NumberColumn.EVENT_MAPPING_CHANGED;
    BoxPlotColumn.EVENT_COLOR_MAPPING_CHANGED = NumberColumn.EVENT_COLOR_MAPPING_CHANGED;
    BoxPlotColumn.EVENT_SORTMETHOD_CHANGED = NumberColumn.EVENT_SORTMETHOD_CHANGED;
    BoxPlotColumn.EVENT_FILTER_CHANGED = NumberColumn.EVENT_FILTER_CHANGED;
    BoxPlotColumn = BoxPlotColumn_1 = __decorate([
        toolbar('rename', 'clone', 'sort', 'sortBy', 'filterNumber', 'colorMapped', 'editMapping'),
        dialogAddons('sort', 'sortBoxPlot'),
        Category('array'),
        SortByDefault('descending')
    ], BoxPlotColumn);
    return BoxPlotColumn;
}(ValueColumn));
export default BoxPlotColumn;
//# sourceMappingURL=BoxPlotColumn.js.map