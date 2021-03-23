import { __extends } from "tslib";
import ADialog from './ADialog';
/** @internal */
var AddonDialog = /** @class */ (function (_super) {
    __extends(AddonDialog, _super);
    function AddonDialog(column, addons, dialog, ctx, onClick) {
        var _this = _super.call(this, dialog) || this;
        _this.column = column;
        _this.addons = addons;
        _this.ctx = ctx;
        _this.onClick = onClick;
        _this.handlers = [];
        return _this;
    }
    AddonDialog.prototype.build = function (node) {
        for (var _i = 0, _a = this.addons; _i < _a.length; _i++) {
            var addon = _a[_i];
            this.node.insertAdjacentHTML('beforeend', "<strong>" + addon.title + "</strong>");
            this.handlers.push(addon.append(this.column, node, this.dialog, this.ctx));
        }
    };
    AddonDialog.prototype.submit = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.submit() === false) {
                return false;
            }
        }
        if (this.onClick) {
            this.onClick();
        }
        return true;
    };
    AddonDialog.prototype.cancel = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.cancel();
        }
    };
    AddonDialog.prototype.reset = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.reset();
        }
    };
    return AddonDialog;
}(ADialog));
export default AddonDialog;
//# sourceMappingURL=AddonDialog.js.map