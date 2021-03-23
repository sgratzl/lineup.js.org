import { __decorate, __extends } from "tslib";
import { toolbar } from './annotations';
import { patternFunction, integrateDefaults } from './internal';
import MapColumn from './MapColumn';
import LinkColumn from './LinkColumn';
import { EAlignment } from './StringColumn';
/**
 * a string column with optional alignment
 */
var LinkMapColumn = /** @class */ (function (_super) {
    __extends(LinkMapColumn, _super);
    function LinkMapColumn(id, desc) {
        var _a, _b, _c;
        var _this = _super.call(this, id, integrateDefaults(desc, {
            width: 200,
            renderer: 'map',
        })) || this;
        _this.patternFunction = null;
        _this.alignment = (_a = desc.alignment) !== null && _a !== void 0 ? _a : EAlignment.left;
        _this.escape = desc.escape !== false;
        _this.pattern = (_b = desc.pattern) !== null && _b !== void 0 ? _b : '';
        _this.patternTemplates = (_c = desc.patternTemplates) !== null && _c !== void 0 ? _c : [];
        return _this;
    }
    LinkMapColumn.prototype.setPattern = function (pattern) {
        LinkColumn.prototype.setPattern.call(this, pattern);
    };
    LinkMapColumn.prototype.getPattern = function () {
        return this.pattern;
    };
    LinkMapColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([LinkColumn.EVENT_PATTERN_CHANGED]);
    };
    LinkMapColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    LinkMapColumn.prototype.getValue = function (row) {
        var r = this.getLinkMap(row);
        return r.every(function (d) { return d.value == null; })
            ? null
            : r.map(function (_a) {
                var key = _a.key, value = _a.value;
                return ({
                    key: key,
                    value: value ? value.href : '',
                });
            });
    };
    LinkMapColumn.prototype.getLabels = function (row) {
        return this.getLinkMap(row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: value ? value.alt : '',
            });
        });
    };
    LinkMapColumn.prototype.getLinkMap = function (row) {
        var _this = this;
        return _super.prototype.getMap.call(this, row).map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({
                key: key,
                value: _this.transformValue(value, row, key),
            });
        });
    };
    LinkMapColumn.prototype.transformValue = function (v, row, key) {
        if (v == null || v === '') {
            return null;
        }
        if (typeof v === 'string') {
            if (!this.pattern) {
                return {
                    alt: v,
                    href: v,
                };
            }
            if (!this.patternFunction) {
                this.patternFunction = patternFunction(this.pattern, 'item', 'key');
            }
            return {
                alt: v,
                href: this.patternFunction.call(this, v, row.v, key),
            };
        }
        return v;
    };
    LinkMapColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        if (this.pattern !== this.desc.pattern) {
            r.pattern = this.pattern;
        }
        return r;
    };
    LinkMapColumn.prototype.restore = function (dump, factory) {
        if (dump.pattern) {
            this.pattern = dump.pattern;
        }
        _super.prototype.restore.call(this, dump, factory);
    };
    LinkMapColumn.EVENT_PATTERN_CHANGED = LinkColumn.EVENT_PATTERN_CHANGED;
    LinkMapColumn = __decorate([
        toolbar('rename', 'search', 'editPattern')
    ], LinkMapColumn);
    return LinkMapColumn;
}(MapColumn));
export default LinkMapColumn;
//# sourceMappingURL=LinkMapColumn.js.map