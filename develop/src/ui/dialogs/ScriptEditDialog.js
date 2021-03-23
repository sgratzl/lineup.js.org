import { __extends } from "tslib";
import { ScriptColumn } from '../../model';
import ADialog from './ADialog';
import { cssClass } from '../../styles';
/** @internal */
var ScriptEditDialog = /** @class */ (function (_super) {
    __extends(ScriptEditDialog, _super);
    function ScriptEditDialog(column, dialog) {
        var _this = _super.call(this, dialog) || this;
        _this.column = column;
        _this.before = column.getScript();
        return _this;
    }
    ScriptEditDialog.prototype.build = function (node) {
        node.insertAdjacentHTML('beforeend', "<textarea class=\"" + cssClass('textarea') + "\" autofocus=\"true\" rows=\"5\" autofocus=\"autofocus\" style=\"width: 95%;\">" + this.column.getScript() + "</textarea>");
    };
    ScriptEditDialog.prototype.cancel = function () {
        this.column.setScript(this.before);
    };
    ScriptEditDialog.prototype.reset = function () {
        this.node.querySelector('textarea').value = this.column.desc.script || ScriptColumn.DEFAULT_SCRIPT;
    };
    ScriptEditDialog.prototype.submit = function () {
        this.column.setScript(this.node.querySelector('textarea').value);
        return true;
    };
    return ScriptEditDialog;
}(ADialog));
export default ScriptEditDialog;
//# sourceMappingURL=ScriptEditDialog.js.map