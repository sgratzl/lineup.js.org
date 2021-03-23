import { __decorate, __extends } from "tslib";
import { toolbar } from './annotations';
import ArrayColumn from './ArrayColumn';
import { patternFunction, integrateDefaults } from './internal';
import { EAlignment } from './StringColumn';
import LinkColumn from './LinkColumn';
var LinksColumn = /** @class */ (function (_super) {
    __extends(LinksColumn, _super);
    function LinksColumn(id, desc) {
        var _a, _b, _c;
        var _this = _super.call(this, id, integrateDefaults(desc, {
            width: 200,
        })) || this;
        _this.patternFunction = null;
        _this.alignment = (_a = desc.alignment) !== null && _a !== void 0 ? _a : EAlignment.left;
        _this.escape = desc.escape !== false;
        _this.pattern = (_b = desc.pattern) !== null && _b !== void 0 ? _b : '';
        _this.patternTemplates = (_c = desc.patternTemplates) !== null && _c !== void 0 ? _c : [];
        return _this;
    }
    LinksColumn_1 = LinksColumn;
    LinksColumn.prototype.setPattern = function (pattern) {
        return LinkColumn.prototype.setPattern.call(this, pattern);
    };
    LinksColumn.prototype.getPattern = function () {
        return this.pattern;
    };
    LinksColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([LinksColumn_1.EVENT_PATTERN_CHANGED]);
    };
    LinksColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    LinksColumn.prototype.getValues = function (row) {
        return this.getLinks(row).map(function (d) { return (d ? d.href : ''); });
    };
    LinksColumn.prototype.getLabels = function (row) {
        return this.getLinks(row).map(function (d) { return (d ? d.alt : ''); });
    };
    LinksColumn.prototype.transformValue = function (v, row, i) {
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
                this.patternFunction = patternFunction(this.pattern, 'item', 'index');
            }
            return {
                alt: v,
                href: this.patternFunction.call(this, v, row.v, i),
            };
        }
        return v;
    };
    LinksColumn.prototype.getLinks = function (row) {
        var _this = this;
        return _super.prototype.getValues.call(this, row).map(function (v, i) {
            return _this.transformValue(v, row, i);
        });
    };
    LinksColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        if (this.pattern !== this.desc.pattern) {
            r.pattern = this.pattern;
        }
        return r;
    };
    LinksColumn.prototype.restore = function (dump, factory) {
        if (dump.pattern) {
            this.pattern = dump.pattern;
        }
        _super.prototype.restore.call(this, dump, factory);
    };
    var LinksColumn_1;
    LinksColumn.EVENT_PATTERN_CHANGED = LinkColumn.EVENT_PATTERN_CHANGED;
    LinksColumn = LinksColumn_1 = __decorate([
        toolbar('rename', 'search', 'editPattern')
    ], LinksColumn);
    return LinksColumn;
}(ArrayColumn));
export default LinksColumn;
//# sourceMappingURL=LinksColumn.js.map