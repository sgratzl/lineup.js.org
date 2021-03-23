import { __extends } from "tslib";
import { dialogContext } from './ADialog';
import RenameRankingDialog from './RenameRankingDialog';
import { cssClass } from '../../styles';
import { actionCSSClass } from '../header';
import APopup from './APopup';
/** @internal */
var MoreRankingOptionsDialog = /** @class */ (function (_super) {
    __extends(MoreRankingOptionsDialog, _super);
    function MoreRankingOptionsDialog(ranking, dialog, ctx) {
        var _this = _super.call(this, dialog, {
            autoClose: true,
        }) || this;
        _this.ranking = ranking;
        _this.ctx = ctx;
        return _this;
    }
    MoreRankingOptionsDialog.prototype.addIcon = function (node, title, onClick) {
        node.insertAdjacentHTML('beforeend', "<i title=\"" + title + "\" class=\"" + actionCSSClass(title) + "\"><span>" + title + "</span> </i>");
        var i = node.lastElementChild;
        i.onclick = function (evt) {
            evt.stopPropagation();
            onClick(evt);
        };
    };
    MoreRankingOptionsDialog.prototype.build = function (node) {
        var _this = this;
        node.classList.add(cssClass('more-options'));
        this.addIcon(node, 'Rename', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var dialog = new RenameRankingDialog(_this.ranking, dialogContext(_this.ctx, _this.level + 1, evt));
            dialog.open();
        });
        this.addIcon(node, 'Remove', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            _this.destroy('confirm');
            _this.ctx.provider.removeRanking(_this.ranking);
        });
    };
    return MoreRankingOptionsDialog;
}(APopup));
export default MoreRankingOptionsDialog;
//# sourceMappingURL=MoreRankingOptionsDialog.js.map