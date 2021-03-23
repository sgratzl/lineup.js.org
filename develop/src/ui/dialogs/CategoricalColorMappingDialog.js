import { __extends } from "tslib";
import ADialog from './ADialog';
import { uniqueId } from './utils';
import { cssClass } from '../../styles';
import { color } from 'd3-color';
import { schemeCategory10, schemeAccent, schemeDark2, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, } from 'd3-scale-chromatic';
import { DEFAULT_CATEGORICAL_COLOR_FUNCTION, ReplacementColorMappingFunction, } from '../../model/CategoricalColorMappingFunction';
var sets = {
    schemeCategory10: schemeCategory10,
    schemeAccent: schemeAccent,
    schemeDark2: schemeDark2,
    schemePastel1: schemePastel1,
    schemePastel2: schemePastel2,
    schemeSet1: schemeSet1,
    schemeSet2: schemeSet2,
    schemeSet3: schemeSet3,
};
/** @internal */
var CategoricalColorMappingDialog = /** @class */ (function (_super) {
    __extends(CategoricalColorMappingDialog, _super);
    function CategoricalColorMappingDialog(column, dialog) {
        var _this = _super.call(this, dialog, {
            livePreview: 'colorMapping',
        }) || this;
        _this.column = column;
        _this.before = column.getColorMapping().clone();
        return _this;
    }
    CategoricalColorMappingDialog.prototype.build = function (node) {
        var _this = this;
        var id = uniqueId(this.dialog.idPrefix);
        var mapping = this.column.getColorMapping();
        node.insertAdjacentHTML('beforeend', "<div class=\"" + cssClass('dialog-table') + "\">\n      <div class=\"" + cssClass('dialog-color-table-entry') + "\">\n        <select id=\"" + id + "Chooser\">\n          <option value=\"\">Apply Color Scheme...</option>\n          <option value=\"schemeCategory10\">D3 Category 10 (" + schemeCategory10.length + ")</option>\n          <option value=\"schemeSet1\">Set 1 (" + schemeSet1.length + ")</option>\n          <option value=\"schemeSet2\">Set 2 (" + schemeSet2.length + ")</option>\n          <option value=\"schemeSet3\">Set 3 (" + schemeSet3.length + ")</option>\n          <option value=\"schemeAccent\">Accent (" + schemeAccent.length + ")</option>\n          <option value=\"schemeDark2\">Dark2 (" + schemeDark2.length + ")</option>\n          <option value=\"schemePastel1\">Pastel 1 (" + schemePastel1.length + ")</option>\n          <option value=\"schemePastel2\">Pastel 2 (" + schemePastel2.length + ")</option>\n        </select>\n      </div>\n      " + this.column.categories
            .map(function (d) { return "\n        <label class=\"" + cssClass('checkbox') + " " + cssClass('dialog-color-table-entry') + "\">\n          <input data-cat=\"" + d.name + "\" type=\"color\" value=\"" + color(mapping.apply(d)).hex() + "\">\n          <span>" + d.label + "</span>\n        </label>"; })
            .join('') + "\n    </div>");
        this.findInput('select').onchange = function (evt) {
            var scheme = sets[evt.currentTarget.value];
            if (!scheme) {
                return;
            }
            _this.forEach('[data-cat]', function (n, i) {
                n.value = scheme[i % scheme.length];
            });
            if (_this.showLivePreviews()) {
                _this.submit();
            }
        };
        this.enableLivePreviews('input[type=color]');
    };
    CategoricalColorMappingDialog.prototype.reset = function () {
        var cats = this.column.categories;
        this.forEach('[data-cat]', function (n, i) {
            n.value = color(cats[i].color).hex();
        });
    };
    CategoricalColorMappingDialog.prototype.submit = function () {
        var cats = this.column.categories;
        var map = new Map();
        this.forEach('input[data-cat]', function (n, i) {
            var cat = cats[i];
            if (color(cat.color).hex() !== n.value) {
                map.set(cat, n.value);
            }
        });
        if (map.size === 0) {
            this.column.setColorMapping(DEFAULT_CATEGORICAL_COLOR_FUNCTION);
        }
        else {
            this.column.setColorMapping(new ReplacementColorMappingFunction(map));
        }
        return true;
    };
    CategoricalColorMappingDialog.prototype.cancel = function () {
        this.column.setColorMapping(this.before);
    };
    return CategoricalColorMappingDialog;
}(ADialog));
export default CategoricalColorMappingDialog;
//# sourceMappingURL=CategoricalColorMappingDialog.js.map