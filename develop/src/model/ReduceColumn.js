import { __decorate, __extends } from "tslib";
import { median, quantile } from '../internal';
import { toolbar } from './annotations';
import Column from './Column';
import CompositeNumberColumn from './CompositeNumberColumn';
import { DEFAULT_COLOR } from './interfaces';
import { EAdvancedSortMethod } from './INumberColumn';
import { integrateDefaults } from './internal';
/**
 *  factory for creating a description creating a max column
 * @param label
 * @returns {{type: string, label: string}}
 */
export function createReduceDesc(label) {
    if (label === void 0) { label = 'Reduce'; }
    return { type: 'reduce', label: label };
}
/**
 * combines multiple columns by using the maximal value
 */
var ReduceColumn = /** @class */ (function (_super) {
    __extends(ReduceColumn, _super);
    function ReduceColumn(id, desc) {
        var _this = _super.call(this, id, integrateDefaults(desc, {
            renderer: 'interleaving',
            groupRenderer: 'interleaving',
            summaryRenderer: 'interleaving',
        })) || this;
        _this.reduce = desc.reduce || EAdvancedSortMethod.max;
        return _this;
    }
    ReduceColumn_1 = ReduceColumn;
    Object.defineProperty(ReduceColumn.prototype, "label", {
        get: function () {
            var l = _super.prototype.getMetaData.call(this).label;
            if (l !== 'Reduce') {
                return l;
            }
            return "" + this.reduce[0].toUpperCase() + this.reduce.slice(1) + "(" + this.children.map(function (d) { return d.label; }).join(', ') + ")";
        },
        enumerable: false,
        configurable: true
    });
    ReduceColumn.prototype.getColor = function (row) {
        //compute the index of the maximal one
        var c = this._children;
        if (c.length === 0 ||
            this.reduce === EAdvancedSortMethod.q1 ||
            this.reduce === EAdvancedSortMethod.q3 ||
            this.reduce === EAdvancedSortMethod.mean) {
            return DEFAULT_COLOR;
        }
        var v = this.compute(row);
        var selected = c.find(function (c) { return c.getValue(row) === v; });
        return selected ? selected.getColor(row) : DEFAULT_COLOR;
    };
    ReduceColumn.prototype.compute = function (row) {
        var vs = this._children.map(function (d) { return d.getValue(row); }).filter(function (d) { return !Number.isNaN(d); });
        if (vs.length === 0) {
            return NaN;
        }
        switch (this.reduce) {
            case EAdvancedSortMethod.mean:
                return vs.reduce(function (a, b) { return a + b; }, 0) / vs.length;
            case EAdvancedSortMethod.max:
                return vs.reduce(function (a, b) { return Math.max(a, b); }, Number.NEGATIVE_INFINITY);
            case EAdvancedSortMethod.min:
                return vs.reduce(function (a, b) { return Math.min(a, b); }, Number.POSITIVE_INFINITY);
            case EAdvancedSortMethod.median:
                return median(vs);
            case EAdvancedSortMethod.q1:
                return quantile(vs.sort(function (a, b) { return a - b; }), 0.25);
            case EAdvancedSortMethod.q3:
                return quantile(vs.sort(function (a, b) { return a - b; }), 0.75);
        }
    };
    ReduceColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([ReduceColumn_1.EVENT_REDUCE_CHANGED]);
    };
    ReduceColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    ReduceColumn.prototype.getReduce = function () {
        return this.reduce;
    };
    ReduceColumn.prototype.setReduce = function (reduce) {
        if (this.reduce === reduce) {
            return;
        }
        this.fire([ReduceColumn_1.EVENT_REDUCE_CHANGED, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY_CACHES, Column.EVENT_DIRTY], this.reduce, (this.reduce = reduce));
    };
    ReduceColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.reduce = this.reduce;
        return r;
    };
    ReduceColumn.prototype.restore = function (dump, factory) {
        this.reduce = dump.reduce || this.reduce;
        _super.prototype.restore.call(this, dump, factory);
    };
    Object.defineProperty(ReduceColumn.prototype, "canJustAddNumbers", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    ReduceColumn.prototype.getExportValue = function (row, format) {
        if (format === 'json') {
            return {
                value: this.getRawNumber(row),
                children: this.children.map(function (d) { return d.getExportValue(row, format); }),
            };
        }
        return _super.prototype.getExportValue.call(this, row, format);
    };
    var ReduceColumn_1;
    ReduceColumn.EVENT_REDUCE_CHANGED = 'reduceChanged';
    ReduceColumn = ReduceColumn_1 = __decorate([
        toolbar('reduce')
    ], ReduceColumn);
    return ReduceColumn;
}(CompositeNumberColumn));
export default ReduceColumn;
//# sourceMappingURL=ReduceColumn.js.map