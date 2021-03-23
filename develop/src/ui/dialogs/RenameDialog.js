import { __extends } from "tslib";
import ADialog from './ADialog';
import { cssClass } from '../../styles';
/** @internal */
var RenameDialog = /** @class */ (function (_super) {
    __extends(RenameDialog, _super);
    function RenameDialog(column, dialog) {
        var _this = _super.call(this, dialog) || this;
        _this.column = column;
        _this.before = column.getMetaData();
        return _this;
    }
    RenameDialog.prototype.build = function (node) {
        node.classList.add(cssClass('dialog-rename'));
        node.insertAdjacentHTML('beforeend', "\n      <input type=\"text\" value=\"" + this.column.label + "\" required autofocus placeholder=\"name\">\n      <input type=\"text\" value=\"" + this.column.getMetaData().summary + "\" placeholder=\"summary\" name=\"summary\">\n      <textarea class=\"" + cssClass('textarea') + "\" rows=\"5\" placeholder=\"description\">" + this.column.description + "</textarea>");
    };
    RenameDialog.prototype.reset = function () {
        var desc = this.column.desc;
        var meta = {
            label: desc.label || this.column.id,
            summary: desc.summary || '',
            description: desc.description || '',
        };
        this.findInput('input[type="text"]').value = meta.label;
        this.findInput('input[name="summary"]').value = meta.summary;
        this.node.querySelector('textarea').value = meta.description;
    };
    RenameDialog.prototype.submit = function () {
        var label = this.findInput('input[type="text"]').value;
        var summary = this.findInput('input[name="summary"]').value.trim();
        var description = this.node.querySelector('textarea').value;
        this.column.setMetaData({ label: label, description: description, summary: summary });
        return true;
    };
    RenameDialog.prototype.cancel = function () {
        this.column.setMetaData(this.before);
    };
    return RenameDialog;
}(ADialog));
export default RenameDialog;
//# sourceMappingURL=RenameDialog.js.map