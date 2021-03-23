import { __extends } from "tslib";
import ADialog from './ADialog';
var APopup = /** @class */ (function (_super) {
    __extends(APopup, _super);
    function APopup(dialog, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, dialog, Object.assign({
            popup: true,
        }, options)) || this;
    }
    APopup.prototype.submit = function () {
        return true;
    };
    APopup.prototype.reset = function () {
        // dummy
    };
    APopup.prototype.cancel = function () {
        // dummy
    };
    return APopup;
}(ADialog));
export default APopup;
//# sourceMappingURL=APopup.js.map