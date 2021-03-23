import { __decorate, __extends } from "tslib";
import { Category, SupportType, toolbar, dialogAddons } from './annotations';
import Column from './Column';
import { ECompareValueType } from './interfaces';
import { missingGroup } from './missing';
export function createGroupDesc(label) {
    if (label === void 0) { label = 'Group Name'; }
    return { type: 'group', label: label };
}
export var EGroupSortMethod;
(function (EGroupSortMethod) {
    EGroupSortMethod["name"] = "name";
    EGroupSortMethod["count"] = "count";
})(EGroupSortMethod || (EGroupSortMethod = {}));
var GroupColumn = /** @class */ (function (_super) {
    __extends(GroupColumn, _super);
    function GroupColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupSortMethod = EGroupSortMethod.name;
        return _this;
    }
    GroupColumn_1 = GroupColumn;
    Object.defineProperty(GroupColumn.prototype, "frozen", {
        get: function () {
            return this.desc.frozen !== false;
        },
        enumerable: false,
        configurable: true
    });
    GroupColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([GroupColumn_1.EVENT_SORTMETHOD_CHANGED]);
    };
    GroupColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    GroupColumn.prototype.getLabel = function () {
        return '';
    };
    GroupColumn.prototype.getValue = function () {
        return '';
    };
    GroupColumn.prototype.getSortMethod = function () {
        return this.groupSortMethod;
    };
    GroupColumn.prototype.setSortMethod = function (sortMethod) {
        if (this.groupSortMethod === sortMethod) {
            return;
        }
        this.fire(GroupColumn_1.EVENT_SORTMETHOD_CHANGED, this.groupSortMethod, (this.groupSortMethod = sortMethod));
        // sort by me if not already sorted by me
        if (!this.isGroupSortedByMe().asc) {
            this.toggleMyGroupSorting();
        }
    };
    GroupColumn.prototype.toCompareGroupValue = function (rows, group) {
        if (this.groupSortMethod === 'count') {
            return rows.length;
        }
        return group.name === missingGroup.name ? null : group.name.toLowerCase();
    };
    GroupColumn.prototype.toCompareGroupValueType = function () {
        return this.groupSortMethod === 'count' ? ECompareValueType.COUNT : ECompareValueType.STRING;
    };
    var GroupColumn_1;
    GroupColumn.EVENT_SORTMETHOD_CHANGED = 'sortMethodChanged';
    GroupColumn = GroupColumn_1 = __decorate([
        SupportType(),
        toolbar('rename', 'sortGroupBy'),
        dialogAddons('sortGroup', 'sortGroups'),
        Category('support')
    ], GroupColumn);
    return GroupColumn;
}(Column));
export default GroupColumn;
//# sourceMappingURL=GroupColumn.js.map