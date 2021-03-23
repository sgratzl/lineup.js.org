import { __extends } from "tslib";
import { createNumberFilter } from '../../renderer/HistogramCellRenderer';
import { cssClass } from '../../styles';
import ADialog from './ADialog';
/** @internal */
var NumberFilterDialog = /** @class */ (function (_super) {
    __extends(NumberFilterDialog, _super);
    function NumberFilterDialog(column, dialog, ctx) {
        var _this = _super.call(this, dialog, {
            livePreview: 'filter',
            cancelSubDialogs: true,
        }) || this;
        _this.column = column;
        _this.ctx = ctx;
        _this.handler = null;
        _this.before = column.getFilter();
        return _this;
    }
    NumberFilterDialog.prototype.build = function (node) {
        node.classList.add(cssClass('dialog-mapper'));
        this.handler = createNumberFilter(this.column, node, {
            dialogManager: this.ctx.dialogManager,
            idPrefix: this.ctx.idPrefix,
            tasks: this.ctx.provider.getTaskExecutor(),
        }, this.showLivePreviews());
    };
    NumberFilterDialog.prototype.cleanUp = function (action) {
        _super.prototype.cleanUp.call(this, action);
        this.handler.cleanUp();
    };
    NumberFilterDialog.prototype.reset = function () {
        this.handler.reset();
    };
    NumberFilterDialog.prototype.submit = function () {
        this.handler.submit();
        return true;
    };
    NumberFilterDialog.prototype.cancel = function () {
        this.column.setFilter(this.before);
    };
    return NumberFilterDialog;
}(ADialog));
export default NumberFilterDialog;
//# sourceMappingURL=NumberFilterDialog.js.map