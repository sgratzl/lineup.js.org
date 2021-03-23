import { __extends } from "tslib";
import { noDateFilter } from '../../model/internalDate';
import { createDateFilter } from '../../renderer/DateHistogramCellRenderer';
import { cssClass } from '../../styles';
import ADialog from './ADialog';
/** @internal */
var DateFilterDialog = /** @class */ (function (_super) {
    __extends(DateFilterDialog, _super);
    function DateFilterDialog(column, dialog, ctx) {
        var _a;
        var _this = _super.call(this, dialog, {
            livePreview: 'filter',
            cancelSubDialogs: true,
        }) || this;
        _this.column = column;
        _this.ctx = ctx;
        _this.handler = null;
        _this.before = (_a = _this.column.getFilter()) !== null && _a !== void 0 ? _a : noDateFilter();
        return _this;
    }
    DateFilterDialog.prototype.build = function (node) {
        node.classList.add(cssClass('dialog-mapper'));
        this.handler = createDateFilter(this.column, node, {
            dialogManager: this.ctx.dialogManager,
            idPrefix: this.ctx.idPrefix,
            tasks: this.ctx.provider.getTaskExecutor(),
        }, this.showLivePreviews());
    };
    DateFilterDialog.prototype.cleanUp = function (action) {
        _super.prototype.cleanUp.call(this, action);
        this.handler.cleanUp();
    };
    DateFilterDialog.prototype.reset = function () {
        this.handler.reset();
    };
    DateFilterDialog.prototype.submit = function () {
        this.handler.submit();
        return true;
    };
    DateFilterDialog.prototype.cancel = function () {
        this.column.setFilter(this.before);
    };
    return DateFilterDialog;
}(ADialog));
export default DateFilterDialog;
//# sourceMappingURL=DateFilterDialog.js.map