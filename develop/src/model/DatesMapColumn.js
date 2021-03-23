import { __decorate, __extends } from "tslib";
import { timeFormat, timeParse } from 'd3-time-format';
import MapColumn from './MapColumn';
import { isMissingValue } from './missing';
import DatesColumn, { EDateSort } from './DatesColumn';
import DateColumn from './DateColumn';
import { dialogAddons, toolbar } from './annotations';
import { noDateFilter, isDummyDateFilter, restoreDateFilter } from './internalDate';
import { integrateDefaults } from './internal';
var DatesMapColumn = /** @class */ (function (_super) {
    __extends(DatesMapColumn, _super);
    function DatesMapColumn(id, desc) {
        var _this = _super.call(this, id, integrateDefaults(desc, {
            renderer: 'default',
        })) || this;
        _this.currentFilter = noDateFilter();
        var f = timeFormat(desc.dateFormat || DateColumn.DEFAULT_DATE_FORMAT);
        _this.format = function (v) { return (v instanceof Date ? f(v) : ''); };
        _this.parse = desc.dateParse
            ? timeParse(desc.dateParse)
            : timeParse(desc.dateFormat || DateColumn.DEFAULT_DATE_FORMAT);
        _this.sort = desc.sort || EDateSort.median;
        return _this;
    }
    DatesMapColumn_1 = DatesMapColumn;
    DatesMapColumn.prototype.getFormatter = function () {
        return this.format;
    };
    DatesMapColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this)
            .concat([DatesMapColumn_1.EVENT_SORTMETHOD_CHANGED, DatesMapColumn_1.EVENT_FILTER_CHANGED]);
    };
    DatesMapColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    DatesMapColumn.prototype.parseValue = function (v) {
        if (isMissingValue(v)) {
            return null;
        }
        if (v instanceof Date) {
            return v;
        }
        return this.parse(String(v));
    };
    DatesMapColumn.prototype.getDateMap = function (row) {
        var _this = this;
        return _super.prototype.getMap.call(this, row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: _this.parseValue(value),
            });
        });
    };
    DatesMapColumn.prototype.iterDate = function (row) {
        return this.getDates(row);
    };
    DatesMapColumn.prototype.getValue = function (row) {
        var r = this.getDateMap(row);
        return r.every(function (d) { return d == null; }) ? null : r;
    };
    DatesMapColumn.prototype.getLabels = function (row) {
        var _this = this;
        return this.getDateMap(row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: value instanceof Date ? _this.format(value) : '',
            });
        });
    };
    DatesMapColumn.prototype.getDates = function (row) {
        return this.getDateMap(row).map(function (v) { return v.value; });
    };
    DatesMapColumn.prototype.getDate = function (row) {
        return DatesColumn.prototype.getDate.call(this, row);
    };
    DatesMapColumn.prototype.getSortMethod = function () {
        return this.sort;
    };
    DatesMapColumn.prototype.setSortMethod = function (sort) {
        return DatesColumn.prototype.setSortMethod.call(this, sort);
    };
    DatesMapColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.sortMethod = this.getSortMethod();
        r.filter = !isDummyDateFilter(this.currentFilter) ? this.currentFilter : null;
        return r;
    };
    DatesMapColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
        if (dump.filter) {
            this.currentFilter = restoreDateFilter(dump.filter);
        }
    };
    DatesMapColumn.prototype.isFiltered = function () {
        return DateColumn.prototype.isFiltered.call(this);
    };
    DatesMapColumn.prototype.getFilter = function () {
        return DateColumn.prototype.getFilter.call(this);
    };
    DatesMapColumn.prototype.setFilter = function (value) {
        DateColumn.prototype.setFilter.call(this, value);
    };
    DatesMapColumn.prototype.filter = function (row) {
        return DateColumn.prototype.filter.call(this, row);
    };
    DatesMapColumn.prototype.clearFilter = function () {
        return DateColumn.prototype.clearFilter.call(this);
    };
    var DatesMapColumn_1;
    DatesMapColumn.EVENT_SORTMETHOD_CHANGED = DatesColumn.EVENT_SORTMETHOD_CHANGED;
    DatesMapColumn.EVENT_FILTER_CHANGED = DateColumn.EVENT_FILTER_CHANGED;
    DatesMapColumn = DatesMapColumn_1 = __decorate([
        toolbar('rename', 'filterDate'),
        dialogAddons('sort', 'sortDates')
    ], DatesMapColumn);
    return DatesMapColumn;
}(MapColumn));
export default DatesMapColumn;
//# sourceMappingURL=DatesMapColumn.js.map