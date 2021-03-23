import { __extends } from "tslib";
import ColumnBuilder from './ColumnBuilder';
var DateColumnBuilder = /** @class */ (function (_super) {
    __extends(DateColumnBuilder, _super);
    function DateColumnBuilder(column) {
        return _super.call(this, 'date', column) || this;
    }
    /**
     * specify the format and parsing d3-time pattern to convert Date to strings and vise versa
     * @param {string} format d3-time-format pattern
     * @param {string} parse optional different parsing pattern
     */
    DateColumnBuilder.prototype.format = function (format, parse) {
        this.desc.dateFormat = format;
        if (parse) {
            this.desc.dateParse = parse;
        }
        return this;
    };
    return DateColumnBuilder;
}(ColumnBuilder));
export default DateColumnBuilder;
/**
 * builds a date column builder
 * @param {string} column column which contains the associated data
 * @returns {DateColumnBuilder}
 */
export function buildDateColumn(column) {
    return new DateColumnBuilder(column);
}
//# sourceMappingURL=DateColumnBuilder.js.map