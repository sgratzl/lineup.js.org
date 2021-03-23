import { __decorate, __extends } from "tslib";
import { Category, SupportType } from './annotations';
import Column from './Column';
/**
 * utility for creating an action description with optional label
 * @param label
 * @param actions
 * @param groupActions
 * @returns {{type: string, label: string}}
 */
export function createActionDesc(label, actions, groupActions) {
    if (label === void 0) { label = 'actions'; }
    if (actions === void 0) { actions = []; }
    if (groupActions === void 0) { groupActions = []; }
    return { type: 'actions', label: label, actions: actions, groupActions: groupActions, fixed: true };
}
/**
 * a default column with no values
 */
var ActionColumn = /** @class */ (function (_super) {
    __extends(ActionColumn, _super);
    function ActionColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.actions = desc.actions || [];
        _this.groupActions = desc.groupActions || [];
        return _this;
    }
    ActionColumn.prototype.getLabel = function () {
        return '';
    };
    ActionColumn.prototype.getValue = function () {
        return '';
    };
    ActionColumn.prototype.compare = function () {
        return 0; //can't compare
    };
    ActionColumn = __decorate([
        SupportType(),
        Category('support')
    ], ActionColumn);
    return ActionColumn;
}(Column));
export default ActionColumn;
//# sourceMappingURL=ActionColumn.js.map