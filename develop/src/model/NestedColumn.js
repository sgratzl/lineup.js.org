import { __decorate, __extends } from "tslib";
import MultiLevelCompositeColumn from './MultiLevelCompositeColumn';
import { concat } from '../internal';
import { toolbar } from './annotations';
/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
export function createNestedDesc(label) {
    if (label === void 0) { label = 'Nested'; }
    return { type: 'nested', label: label };
}
/**
 * a nested column is a composite column where the sorting order is determined by the nested ordering of the children
 * i.e., sort by the first child if equal sort by the second child,...
 */
var NestedColumn = /** @class */ (function (_super) {
    __extends(NestedColumn, _super);
    function NestedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedColumn.prototype.toCompareValue = function (row) {
        return concat(this.children.map(function (d) { return d.toCompareValue(row); }));
    };
    NestedColumn.prototype.toCompareValueType = function () {
        return concat(this.children.map(function (d) { return d.toCompareValueType(); }));
    };
    NestedColumn.prototype.getLabel = function (row) {
        return this.children.map(function (d) { return d.getLabel(row); }).join(';');
    };
    NestedColumn.prototype.getValue = function (row) {
        return this.children.map(function (d) { return d.getValue(row); }).join(';');
    };
    NestedColumn = __decorate([
        toolbar('rename', 'clone', 'sort', 'sortBy')
    ], NestedColumn);
    return NestedColumn;
}(MultiLevelCompositeColumn));
export default NestedColumn;
//# sourceMappingURL=NestedColumn.js.map