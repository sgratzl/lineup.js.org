import { __extends } from "tslib";
import { BooleanColumn } from '../model';
import { DefaultCellRenderer } from './DefaultCellRenderer';
import { ERenderMode } from './interfaces';
import { cssClass } from '../styles';
var BooleanCellRenderer = /** @class */ (function (_super) {
    __extends(BooleanCellRenderer, _super);
    function BooleanCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = 'Default';
        return _this;
    }
    BooleanCellRenderer.prototype.canRender = function (col, mode) {
        return col instanceof BooleanColumn && mode === ERenderMode.CELL;
    };
    BooleanCellRenderer.prototype.create = function (col) {
        var r = _super.prototype.create.call(this, col);
        r.template = "<div class=\"" + cssClass('center') + "\"> </div>";
        return r;
    };
    return BooleanCellRenderer;
}(DefaultCellRenderer));
export default BooleanCellRenderer;
//# sourceMappingURL=BooleanCellRenderer.js.map