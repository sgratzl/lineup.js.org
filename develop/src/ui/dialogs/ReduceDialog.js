import { __extends } from "tslib";
import { EAdvancedSortMethod } from '../../model';
import ADialog from './ADialog';
import { sortMethods } from './utils';
/** @internal */
var ReduceDialog = /** @class */ (function (_super) {
    __extends(ReduceDialog, _super);
    function ReduceDialog(column, dialog) {
        var _this = _super.call(this, dialog, {
            livePreview: 'reduce',
        }) || this;
        _this.column = column;
        _this.handler = null;
        return _this;
    }
    ReduceDialog.prototype.build = function (node) {
        var _this = this;
        var wrapper = {
            getSortMethod: function () { return _this.column.getReduce(); },
            setSortMethod: function (s) { return _this.column.setReduce(s); },
        };
        this.handler = sortMethods(node, wrapper, Object.keys(EAdvancedSortMethod));
        this.enableLivePreviews(this.handler.elems);
    };
    ReduceDialog.prototype.submit = function () {
        return this.handler.submit();
    };
    ReduceDialog.prototype.reset = function () {
        this.handler.reset();
    };
    ReduceDialog.prototype.cancel = function () {
        this.handler.cancel();
    };
    return ReduceDialog;
}(ADialog));
export default ReduceDialog;
//# sourceMappingURL=ReduceDialog.js.map