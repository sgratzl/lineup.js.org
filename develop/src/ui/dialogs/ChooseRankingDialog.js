import { __extends } from "tslib";
import { cssClass } from '../../styles';
import APopup from './APopup';
/** @internal */
var ChooseRankingDialog = /** @class */ (function (_super) {
    __extends(ChooseRankingDialog, _super);
    function ChooseRankingDialog(items, dialog) {
        var _this = _super.call(this, dialog) || this;
        _this.items = items;
        return _this;
    }
    ChooseRankingDialog.prototype.build = function (node) {
        node.classList.add(cssClass('more-options'), cssClass('choose-options'));
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            node.appendChild(item);
        }
    };
    return ChooseRankingDialog;
}(APopup));
export default ChooseRankingDialog;
//# sourceMappingURL=ChooseRankingDialog.js.map