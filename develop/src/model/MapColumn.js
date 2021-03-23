import { __decorate, __extends } from "tslib";
import { Category } from './annotations';
import ValueColumn from './ValueColumn';
import { integrateDefaults } from './internal';
var MapColumn = /** @class */ (function (_super) {
    __extends(MapColumn, _super);
    function MapColumn(id, desc) {
        return _super.call(this, id, integrateDefaults(desc, {
            width: 200,
        })) || this;
    }
    MapColumn.prototype.getValue = function (row) {
        var r = this.getMap(row);
        return r.length === 0 ? null : r;
    };
    MapColumn.prototype.getLabels = function (row) {
        var v = this.getMap(row);
        return v.map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({ key: key, value: String(value) });
        });
    };
    MapColumn.prototype.getMap = function (row) {
        return toKeyValue(_super.prototype.getValue.call(this, row));
    };
    MapColumn.prototype.getMapLabel = function (row) {
        return this.getLabels(row);
    };
    MapColumn.prototype.getLabel = function (row) {
        var v = this.getLabels(row);
        return "{" + v.map(function (_a) {
            var key = _a.key, value = _a.value;
            return key + ": " + value;
        }).join(', ') + "}";
    };
    MapColumn = __decorate([
        Category('map')
    ], MapColumn);
    return MapColumn;
}(ValueColumn));
export default MapColumn;
function byKey(a, b) {
    if (a === b) {
        return 0;
    }
    return a.key.localeCompare(b.key);
}
function toKeyValue(v) {
    if (!v) {
        return [];
    }
    if (v instanceof Map) {
        return Array.from(v.entries())
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return ({ key: key, value: value });
        })
            .sort(byKey);
    }
    if (Array.isArray(v)) {
        return v; // keep original order
    }
    // object
    return Object.keys(v)
        .map(function (key) { return ({ key: key, value: v[key] }); })
        .sort(byKey);
}
//# sourceMappingURL=MapColumn.js.map