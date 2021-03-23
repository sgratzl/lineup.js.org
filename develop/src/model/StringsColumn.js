import { __decorate, __extends } from "tslib";
import { toolbar } from './annotations';
import ArrayColumn from './ArrayColumn';
import { EAlignment } from './StringColumn';
import { isMissingValue } from './missing';
import { integrateDefaults } from './internal';
/**
 * a string column with optional alignment
 */
var StringsColumn = /** @class */ (function (_super) {
    __extends(StringsColumn, _super);
    function StringsColumn(id, desc) {
        var _a;
        var _this = _super.call(this, id, integrateDefaults(desc, {
            width: 200,
        })) || this;
        _this.alignment = (_a = desc.alignment) !== null && _a !== void 0 ? _a : EAlignment.left;
        _this.escape = desc.escape !== false;
        return _this;
    }
    StringsColumn.prototype.getValues = function (row) {
        return _super.prototype.getValues.call(this, row).map(function (v) {
            return isMissingValue(v) ? '' : String(v);
        });
    };
    StringsColumn = __decorate([
        toolbar('rename', 'search')
    ], StringsColumn);
    return StringsColumn;
}(ArrayColumn));
export default StringsColumn;
//# sourceMappingURL=StringsColumn.js.map