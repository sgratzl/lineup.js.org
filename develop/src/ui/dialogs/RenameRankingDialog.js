import { __extends } from "tslib";
import ADialog from './ADialog';
import { cssClass } from '../../styles';
/** @internal */
var RenameRankingDialog = /** @class */ (function (_super) {
    __extends(RenameRankingDialog, _super);
    function RenameRankingDialog(ranking, dialog) {
        var _this = _super.call(this, dialog, {
            livePreview: 'rename',
        }) || this;
        _this.ranking = ranking;
        _this.before = ranking.getLabel();
        return _this;
    }
    RenameRankingDialog.prototype.build = function (node) {
        node.classList.add(cssClass('dialog-rename'));
        node.insertAdjacentHTML('beforeend', "\n      <input type=\"text\" value=\"" + this.ranking.getLabel() + "\" required autofocus placeholder=\"name\">");
    };
    RenameRankingDialog.prototype.reset = function () {
        this.findInput('input[type="text"]').value = this.before;
    };
    RenameRankingDialog.prototype.cancel = function () {
        this.ranking.setLabel(this.before);
    };
    RenameRankingDialog.prototype.submit = function () {
        var newValue = this.findInput('input[type="text"]').value;
        this.ranking.setLabel(newValue);
        return true;
    };
    return RenameRankingDialog;
}(ADialog));
export default RenameRankingDialog;
//# sourceMappingURL=RenameRankingDialog.js.map