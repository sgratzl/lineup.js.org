import { __extends } from "tslib";
import APopup from './APopup';
/** @internal */
var InputNumberDialog = /** @class */ (function (_super) {
    __extends(InputNumberDialog, _super);
    function InputNumberDialog(dialog, callback, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, dialog) || this;
        _this.callback = callback;
        _this.ioptions = {
            min: NaN,
            max: NaN,
            step: 'any',
            value: NaN,
            label: null,
        };
        Object.assign(_this.ioptions, options);
        return _this;
    }
    InputNumberDialog.prototype.build = function (node) {
        var o = this.ioptions;
        node.insertAdjacentHTML('beforeend', "\n     <input type=\"number\" value=\"" + (Number.isNaN(o.value) ? '' : String(o.value)) + "\" required autofocus placeholder=\"" + (o.label ? o.label : 'enter number') + "\" " + (Number.isNaN(o.min) ? '' : " min=\"" + o.min + "\"") + " " + (Number.isNaN(o.max) ? '' : " max=\"" + o.max + "\"") + " step=\"" + o.step + "\">\n    ");
        this.enableLivePreviews('input');
    };
    InputNumberDialog.prototype.submit = function () {
        this.callback(this.findInput('input[type=number]').valueAsNumber);
        return true;
    };
    return InputNumberDialog;
}(APopup));
export default InputNumberDialog;
//# sourceMappingURL=InputNumberDialog.js.map