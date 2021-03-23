import { __extends } from "tslib";
import ADialog from './ADialog';
/** @internal */
var EditPatternDialog = /** @class */ (function (_super) {
    __extends(EditPatternDialog, _super);
    function EditPatternDialog(column, dialog, idPrefix) {
        var _this = _super.call(this, dialog) || this;
        _this.column = column;
        _this.idPrefix = idPrefix;
        _this.before = _this.column.getPattern();
        return _this;
    }
    EditPatternDialog.prototype.build = function (node) {
        var templates = this.column.patternTemplates;
        node.insertAdjacentHTML('beforeend', "<strong>Edit Pattern (access via ${value}, ${item})</strong><input\n        type=\"text\"\n        size=\"30\"\n        value=\"" + this.before + "\"\n        required\n        autofocus\n        placeholder=\"pattern (access via ${value}, ${item})\"\n        " + (templates.length > 0 ? "list=\"ui" + this.idPrefix + "lineupPatternList\"" : '') + "\n      >");
        if (templates.length > 0) {
            node.insertAdjacentHTML('beforeend', "<datalist id=\"ui" + this.idPrefix + "lineupPatternList\">" + templates.map(function (t) { return "<option value=\"" + t + "\">"; }) + "</datalist>");
        }
        this.enableLivePreviews('input');
    };
    EditPatternDialog.prototype.cancel = function () {
        this.column.setPattern(this.before);
    };
    EditPatternDialog.prototype.reset = function () {
        this.node.querySelector('input').value = '';
    };
    EditPatternDialog.prototype.submit = function () {
        var newValue = this.node.querySelector('input').value;
        this.column.setPattern(newValue);
        return true;
    };
    return EditPatternDialog;
}(ADialog));
export default EditPatternDialog;
//# sourceMappingURL=EditPatternDialog.js.map