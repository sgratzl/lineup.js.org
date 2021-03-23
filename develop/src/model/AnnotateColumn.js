import { __extends } from "tslib";
import Column from './Column';
import StringColumn from './StringColumn';
/**
 * a string column in which the values can be edited locally
 */
var AnnotateColumn = /** @class */ (function (_super) {
    __extends(AnnotateColumn, _super);
    function AnnotateColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.annotations = new Map();
        return _this;
    }
    AnnotateColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([AnnotateColumn.EVENT_VALUE_CHANGED]);
    };
    AnnotateColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    AnnotateColumn.prototype.getValue = function (row) {
        if (this.annotations.has(row.i)) {
            return this.annotations.get(row.i);
        }
        return _super.prototype.getValue.call(this, row);
    };
    AnnotateColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.annotations = {};
        this.annotations.forEach(function (v, k) {
            r.annotations[k] = v;
        });
        return r;
    };
    AnnotateColumn.prototype.restore = function (dump, factory) {
        var _this = this;
        _super.prototype.restore.call(this, dump, factory);
        if (!dump.annotations) {
            return;
        }
        Object.keys(dump.annotations).forEach(function (k) {
            _this.annotations.set(Number(k), dump.annotations[k]);
        });
    };
    AnnotateColumn.prototype.setValue = function (row, value) {
        var old = this.getValue(row);
        if (old === value) {
            return true;
        }
        if (value === '' || value == null) {
            this.annotations.delete(row.i);
        }
        else {
            this.annotations.set(row.i, value);
        }
        this.fire([AnnotateColumn.EVENT_VALUE_CHANGED, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY_CACHES, Column.EVENT_DIRTY], row.i, old, value);
        return true;
    };
    AnnotateColumn.EVENT_VALUE_CHANGED = 'valueChanged';
    return AnnotateColumn;
}(StringColumn));
export default AnnotateColumn;
//# sourceMappingURL=AnnotateColumn.js.map