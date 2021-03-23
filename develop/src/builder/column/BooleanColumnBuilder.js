import { __extends } from "tslib";
import ColumnBuilder from './ColumnBuilder';
var BooleanColumnBuilder = /** @class */ (function (_super) {
    __extends(BooleanColumnBuilder, _super);
    function BooleanColumnBuilder(column) {
        return _super.call(this, 'boolean', column) || this;
    }
    BooleanColumnBuilder.prototype.trueMarker = function (marker) {
        this.desc.trueMarker = marker;
        return this;
    };
    BooleanColumnBuilder.prototype.falseMarker = function (marker) {
        this.desc.falseMarker = marker;
        return this;
    };
    return BooleanColumnBuilder;
}(ColumnBuilder));
export default BooleanColumnBuilder;
/**
 * builds a boolean column builder
 * @param {string} column column which contains the associated data
 * @returns {BooleanColumnBuilder}
 */
export function buildBooleanColumn(column) {
    return new BooleanColumnBuilder(column);
}
//# sourceMappingURL=BooleanColumnBuilder.js.map