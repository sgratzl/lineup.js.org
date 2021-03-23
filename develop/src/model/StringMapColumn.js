import { __decorate, __extends } from "tslib";
import { toolbar } from './annotations';
import MapColumn from './MapColumn';
import { EAlignment } from './StringColumn';
import { isMissingValue } from './missing';
import { integrateDefaults } from './internal';
/**
 * a string column with optional alignment
 */
var StringMapColumn = /** @class */ (function (_super) {
    __extends(StringMapColumn, _super);
    function StringMapColumn(id, desc) {
        var _a;
        var _this = _super.call(this, id, integrateDefaults(desc, {
            width: 200,
            renderer: 'map',
        })) || this;
        _this.alignment = (_a = desc.alignment) !== null && _a !== void 0 ? _a : EAlignment.left;
        _this.escape = desc.escape !== false;
        return _this;
    }
    StringMapColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    StringMapColumn.prototype.getValue = function (row) {
        var r = this.getMapValue(row);
        return r.every(function (d) { return d.value === ''; }) ? null : r;
    };
    StringMapColumn.prototype.getMapValue = function (row) {
        return _super.prototype.getMap.call(this, row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: isMissingValue(value) ? '' : String(value),
            });
        });
    };
    StringMapColumn = __decorate([
        toolbar('rename', 'search')
    ], StringMapColumn);
    return StringMapColumn;
}(MapColumn));
export default StringMapColumn;
//# sourceMappingURL=StringMapColumn.js.map