import { __extends } from "tslib";
import ColumnBuilder from './ColumnBuilder';
var HierarchyColumnBuilder = /** @class */ (function (_super) {
    __extends(HierarchyColumnBuilder, _super);
    function HierarchyColumnBuilder(column) {
        return _super.call(this, 'hierarchy', column) || this;
    }
    /**
     * specify the underlying hierarchy of this column
     * @param {IPartialCategoryNode} hierarchy
     * @param {string} hierarchySeparator specify the character to separate levels (default dot)
     */
    HierarchyColumnBuilder.prototype.hierarchy = function (hierarchy, hierarchySeparator) {
        this.desc.hierarchy = hierarchy;
        if (hierarchySeparator) {
            this.desc.hierarchySeparator = hierarchySeparator;
        }
        return this;
    };
    HierarchyColumnBuilder.prototype.build = function (data) {
        console.assert(Boolean(this.desc.hierarchy));
        return _super.prototype.build.call(this, data);
    };
    return HierarchyColumnBuilder;
}(ColumnBuilder));
export default HierarchyColumnBuilder;
/**
 * build a hierarchical column builder
 * @param {string} column column which contains the associated data
 * @param {IPartialCategoryNode} hierarchy
 * @returns {HierarchyColumnBuilder}
 */
export function buildHierarchicalColumn(column, hierarchy) {
    var r = new HierarchyColumnBuilder(column);
    if (hierarchy) {
        r.hierarchy(hierarchy);
    }
    return r;
}
//# sourceMappingURL=HierarchyColumnBuilder.js.map