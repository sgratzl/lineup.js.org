import { __extends } from "tslib";
import { createToolbarMenuItems, updateIconState } from '../header';
import { cssClass } from '../../styles';
import APopup from './APopup';
/** @internal */
var MoreColumnOptionsDialog = /** @class */ (function (_super) {
    __extends(MoreColumnOptionsDialog, _super);
    function MoreColumnOptionsDialog(column, dialog, mode, ctx) {
        var _this = _super.call(this, dialog, {
            autoClose: true,
        }) || this;
        _this.column = column;
        _this.mode = mode;
        _this.ctx = ctx;
        return _this;
    }
    MoreColumnOptionsDialog.prototype.build = function (node) {
        node.classList.add(cssClass('more-options'));
        node.dataset.colId = this.column.id;
        createToolbarMenuItems(node, this.dialog.level + 1, this.column, this.ctx, this.mode);
        updateIconState(node, this.column);
    };
    return MoreColumnOptionsDialog;
}(APopup));
export default MoreColumnOptionsDialog;
//# sourceMappingURL=MoreColumnOptionsDialog.js.map