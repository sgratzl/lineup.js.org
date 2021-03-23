import { __decorate, __extends } from "tslib";
import { similar } from '../internal';
import { toolbar } from './annotations';
import Column from './Column';
import CompositeColumn from './CompositeColumn';
import StackColumn from './StackColumn';
var MultiLevelCompositeColumn = /** @class */ (function (_super) {
    __extends(MultiLevelCompositeColumn, _super);
    function MultiLevelCompositeColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        /**
         * whether this stack column is collapsed i.e. just looks like an ordinary number column
         * @type {boolean}
         * @private
         */
        _this.collapsed = false;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var that = _this;
        _this.adaptChange = function (old, newValue) {
            that.adaptWidthChange(old, newValue);
        };
        return _this;
    }
    MultiLevelCompositeColumn_1 = MultiLevelCompositeColumn;
    MultiLevelCompositeColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this)
            .concat([MultiLevelCompositeColumn_1.EVENT_COLLAPSE_CHANGED, MultiLevelCompositeColumn_1.EVENT_MULTI_LEVEL_CHANGED]);
    };
    MultiLevelCompositeColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    MultiLevelCompositeColumn.prototype.setCollapsed = function (value) {
        if (this.collapsed === value) {
            return;
        }
        this.fire([StackColumn.EVENT_COLLAPSE_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.collapsed, (this.collapsed = value));
    };
    MultiLevelCompositeColumn.prototype.getCollapsed = function () {
        return this.collapsed;
    };
    MultiLevelCompositeColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.collapsed = this.collapsed;
        return r;
    };
    MultiLevelCompositeColumn.prototype.restore = function (dump, factory) {
        this.collapsed = dump.collapsed === true;
        _super.prototype.restore.call(this, dump, factory);
    };
    MultiLevelCompositeColumn.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        return StackColumn.prototype.flatten.call(this, r, offset, levelsToGo, padding);
    };
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     */
    MultiLevelCompositeColumn.prototype.insert = function (col, index) {
        col.on(Column.EVENT_WIDTH_CHANGED + ".stack", this.adaptChange);
        //increase my width
        _super.prototype.setWidth.call(this, this.length === 0 ? col.getWidth() : this.getWidth() + col.getWidth());
        return _super.prototype.insert.call(this, col, index);
    };
    /**
     * adapts weights according to an own width change
     * @param oldValue
     * @param newValue
     */
    MultiLevelCompositeColumn.prototype.adaptWidthChange = function (oldValue, newValue) {
        if (similar(oldValue, newValue, 0.5)) {
            return;
        }
        var act = this.getWidth();
        var next = act + (newValue - oldValue);
        this.fire([MultiLevelCompositeColumn_1.EVENT_MULTI_LEVEL_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY], act, next);
        _super.prototype.setWidth.call(this, next);
    };
    MultiLevelCompositeColumn.prototype.removeImpl = function (child, index) {
        child.on(Column.EVENT_WIDTH_CHANGED + ".stack", null);
        _super.prototype.setWidth.call(this, this.length === 0 ? 100 : this.getWidth() - child.getWidth());
        return _super.prototype.removeImpl.call(this, child, index);
    };
    MultiLevelCompositeColumn.prototype.setWidth = function (value) {
        var act = this.getWidth();
        var factor = value / act;
        this._children.forEach(function (child) {
            //disable since we change it
            child.setWidthImpl(child.getWidth() * factor);
        });
        if (!similar(act, value, 0.5)) {
            this.fire([MultiLevelCompositeColumn_1.EVENT_MULTI_LEVEL_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY], act, value);
        }
        _super.prototype.setWidth.call(this, value);
    };
    MultiLevelCompositeColumn.prototype.getRenderer = function () {
        if (this.getCollapsed()) {
            return MultiLevelCompositeColumn_1.EVENT_COLLAPSE_CHANGED;
        }
        return _super.prototype.getRenderer.call(this);
    };
    MultiLevelCompositeColumn.prototype.getExportValue = function (row, format) {
        if (format === 'json') {
            return {
                children: this.children.map(function (d) { return d.getExportValue(row, format); }),
            };
        }
        return _super.prototype.getExportValue.call(this, row, format);
    };
    var MultiLevelCompositeColumn_1;
    MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED = StackColumn.EVENT_COLLAPSE_CHANGED;
    MultiLevelCompositeColumn.EVENT_MULTI_LEVEL_CHANGED = StackColumn.EVENT_MULTI_LEVEL_CHANGED;
    MultiLevelCompositeColumn = MultiLevelCompositeColumn_1 = __decorate([
        toolbar('compress', 'expand')
    ], MultiLevelCompositeColumn);
    return MultiLevelCompositeColumn;
}(CompositeColumn));
export default MultiLevelCompositeColumn;
//# sourceMappingURL=MultiLevelCompositeColumn.js.map