import { __extends } from "tslib";
import { timeFormat } from 'd3-time-format';
import APopup from './APopup';
/** @internal */
var InputDateDialog = /** @class */ (function (_super) {
    __extends(InputDateDialog, _super);
    function InputDateDialog(dialog, callback, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, dialog) || this;
        _this.callback = callback;
        _this.ioptions = {
            value: null,
            label: null,
        };
        Object.assign(_this.ioptions, options);
        return _this;
    }
    InputDateDialog.prototype.build = function (node) {
        var _this = this;
        var o = this.ioptions;
        var f = timeFormat('%Y-%m-%d');
        node.insertAdjacentHTML('beforeend', "\n     <input type=\"date\" value=\"" + (o.value ? f(o.value) : '') + "\" required autofocus placeholder=\"" + (o.label ? o.label : 'enter date') + "\">\n    ");
        this.findInput('input[type=date]').addEventListener('keypress', function (evt) {
            if (evt.key === 'Enter') {
                _this.triggerSubmit();
            }
        });
        this.enableLivePreviews('input');
    };
    InputDateDialog.prototype.submit = function () {
        this.callback(this.findInput('input[type=date]').valueAsDate);
        return true;
    };
    return InputDateDialog;
}(APopup));
export default InputDateDialog;
//# sourceMappingURL=InputDateDialog.js.map