import { __decorate, __extends } from "tslib";
import { Category, SupportType } from './annotations';
import Column from './Column';
import { integrateDefaults } from './internal';
/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
export function createRankDesc(label) {
    if (label === void 0) { label = 'Rank'; }
    return { type: 'rank', label: label };
}
/**
 * a rank column
 */
var RankColumn = /** @class */ (function (_super) {
    __extends(RankColumn, _super);
    function RankColumn(id, desc) {
        return _super.call(this, id, integrateDefaults(desc, {
            width: 50,
        })) || this;
    }
    RankColumn.prototype.getLabel = function (row) {
        return String(this.getValue(row));
    };
    RankColumn.prototype.getRaw = function (row) {
        var ranking = this.findMyRanker();
        if (!ranking) {
            return -1;
        }
        return ranking.getRank(row.i);
    };
    RankColumn.prototype.getValue = function (row) {
        var r = this.getRaw(row);
        return r === -1 ? null : r;
    };
    Object.defineProperty(RankColumn.prototype, "frozen", {
        get: function () {
            return this.desc.frozen !== false;
        },
        enumerable: false,
        configurable: true
    });
    RankColumn = __decorate([
        SupportType(),
        Category('support')
    ], RankColumn);
    return RankColumn;
}(Column));
export default RankColumn;
//# sourceMappingURL=RankColumn.js.map