import { __extends } from "tslib";
import ADialog from './ADialog';
import { schemeCategory10, schemeSet1, schemeSet2, schemeSet3, schemeAccent, schemeDark2, schemePastel2, schemePastel1, } from 'd3-scale-chromatic';
import { round } from '../../internal';
import { uniqueId } from '../../renderer/utils';
import { QuantizedColorFunction, CustomColorMappingFunction, SolidColorFunction, SequentialColorFunction, DivergentColorFunction, } from '../../model/ColorMappingFunction';
import { DEFAULT_COLOR } from '../../model';
import { cssClass } from '../../styles';
var ColorMappingDialog = /** @class */ (function (_super) {
    __extends(ColorMappingDialog, _super);
    function ColorMappingDialog(column, dialog, ctx) {
        var _this = _super.call(this, dialog, {
            livePreview: 'colorMapping',
        }) || this;
        _this.column = column;
        _this.ctx = ctx;
        _this.id = uniqueId('col');
        _this.before = _this.column.getColorMapping();
        return _this;
    }
    ColorMappingDialog.prototype.createTemplate = function (id, wrapped) {
        var current = wrapped instanceof QuantizedColorFunction ? wrapped.base : wrapped;
        var entries = current instanceof CustomColorMappingFunction ? current.entries : [];
        var h = '';
        h += "<datalist id=\"" + id + "L\">" + schemeCategory10.map(function (d) { return "<option>" + d + "\"</option>"; }).join('') + "</datalist>";
        h += "<datalist id=\"" + id + "LW\"><option>#FFFFFF\"</option>" + schemeCategory10
            .slice(0, -1)
            .map(function (d) { return "<option>" + d + "</option>"; })
            .join('') + "</datalist>";
        h += "<strong data-toggle=\"" + (current instanceof SolidColorFunction ? 'open' : '') + "\">Solid Color</strong>";
        h += "<div>";
        {
            var refColor_1 = current instanceof SolidColorFunction ? current.color : '';
            var has_1 = refColor_1 === DEFAULT_COLOR;
            var colorSets = [
                schemeCategory10,
                schemeAccent,
                schemeDark2,
                schemePastel1,
                schemePastel2,
                schemeSet1,
                schemeSet2,
                schemeSet3,
            ];
            var renderColor_1 = function (d) { return "<label class=\"" + cssClass('checkbox-color') + "\">\n        <input name=\"color\" type=\"radio\" value=\"" + d + "\" " + (d === refColor_1 ? 'checked="checked"' : '') + ">\n        <span style=\"background: " + d + "\"></span>\n      </label>"; };
            colorSets.forEach(function (colors, i) {
                has_1 = has_1 || colors.includes(refColor_1);
                h += "<div class=\"" + cssClass('color-line') + "\">\n          " + colors.map(renderColor_1).join('') + "\n          " + (i === 0 ? renderColor_1(DEFAULT_COLOR) : '') + "\n        </div>";
            });
            h += "<label class=\"" + cssClass('checkbox') + " " + cssClass('color-gradient') + "\"><input name=\"color\" type=\"radio\" value=\"custom:solid\" " + (refColor_1 && !has_1 ? 'checked="checked"' : '') + ">\n        <span class=\"" + cssClass('color-custom') + "\"><input type=\"color\" name=\"solid\" list=\"" + id + "L\" value=\"" + (current instanceof SolidColorFunction ? current.color : DEFAULT_COLOR) + "\" " + (refColor_1 && !has_1 ? '' : 'disabled') + "></span>\n      </label>";
        }
        h += '</div>';
        h += "<strong data-toggle=\"" + (current instanceof SequentialColorFunction ||
            (current instanceof CustomColorMappingFunction && entries.length === 2)
            ? 'open'
            : '') + "\">Sequential Color</strong>";
        h += '<div>';
        h += "<div><label class=\"" + cssClass('checkbox') + "\">\n      <input name=\"kindS\" type=\"radio\" id=\"" + id + "KC_S\" value=\"continuous\" " + (!(wrapped instanceof QuantizedColorFunction) ? 'checked' : '') + ">\n      <span>Continuous</span>\n    </label>\n    <label class=\"" + cssClass('checkbox') + "\">\n      <input name=\"kindS\" type=\"radio\" id=\"" + id + "KQ_S\" value=\"quantized\" " + (wrapped instanceof QuantizedColorFunction ? 'checked' : '') + ">\n      <span>Discrete&nbsp;<input type=\"number\" id=\"" + id + "KQS_S\" min=\"2\" step=\"1\" style=\"width: 3em\" value=\"" + (wrapped instanceof QuantizedColorFunction ? wrapped.steps + "\"" : '5" disabled') + ">&nbsp; steps</span>\n    </label></div>";
        {
            var name_1 = current instanceof SequentialColorFunction ? current.name : '';
            for (var _i = 0, _a = Object.keys(SequentialColorFunction.FUNCTIONS); _i < _a.length; _i++) {
                var colors = _a[_i];
                h += "<label class=\"" + cssClass('checkbox') + " " + cssClass('color-gradient') + "\"><input name=\"color\" type=\"radio\" value=\"" + colors + "\" " + (colors === name_1 ? 'checked="checked"' : '') + ">\n        <span data-c=\"" + colors + "\" style=\"background: " + gradient(SequentialColorFunction.FUNCTIONS[colors], 9) + "\"></span>\n      </label>";
            }
            var isCustom = entries.length === 2;
            h += "<label class=\"" + cssClass('checkbox') + " " + cssClass('color-gradient') + "\">\n        <input name=\"color\" type=\"radio\" value=\"custom:sequential\" " + (isCustom ? 'checked' : '') + ">\n        <span class=\"" + cssClass('color-custom') + "\">\n          <input type=\"color\" name=\"interpolate0\" list=\"" + id + "LW\" " + (!isCustom ? 'disabled' : "value=\"" + entries[0].color + "\"") + ">\n          <input type=\"color\" name=\"interpolate1\" list=\"" + id + "LW\" " + (!isCustom ? 'disabled' : "value=\"" + entries[entries.length - 1].color + "\"") + ">\n        </span>\n      </label>";
        }
        h += '</div>';
        h += "<strong data-toggle=\"" + (current instanceof DivergentColorFunction ||
            (current instanceof CustomColorMappingFunction && entries.length === 3)
            ? 'open'
            : '') + "\">Diverging Color</strong>";
        h += '<div>';
        h += "<div><label class=\"" + cssClass('checkbox') + "\">\n      <input name=\"kindD\" type=\"radio\" id=\"" + id + "KC_D\" value=\"continuous\" " + (!(wrapped instanceof QuantizedColorFunction) ? 'checked' : '') + ">\n      <span>Continuous</span>\n    </label>\n    <label class=\"" + cssClass('checkbox') + "\">\n      <input name=\"kindD\" type=\"radio\" id=\"" + id + "KQ_D\" value=\"quantized\" " + (wrapped instanceof QuantizedColorFunction ? 'checked' : '') + ">\n      <span>Discrete&nbsp;<input type=\"number\" id=\"" + id + "KQS_D\" min=\"2\" step=\"1\" style=\"width: 3em\" value=\"" + (wrapped instanceof QuantizedColorFunction ? wrapped.steps + "\"" : '5" disabled') + ">&nbsp; steps</span>\n    </label></div>";
        {
            var name_2 = current instanceof DivergentColorFunction ? current.name : '';
            for (var _b = 0, _c = Object.keys(DivergentColorFunction.FUNCTIONS); _b < _c.length; _b++) {
                var colors = _c[_b];
                h += "<label class=\"" + cssClass('checkbox') + " " + cssClass('color-gradient') + "\"><input name=\"color\" type=\"radio\" value=\"" + colors + "\" " + (colors === name_2 ? 'checked="checked"' : '') + ">\n        <span data-c=\"" + colors + "\" style=\"background: " + gradient(DivergentColorFunction.FUNCTIONS[colors], 11) + "\"></span>\n      </label>";
            }
            var isCustom = entries.length === 3;
            h += "<label class=\"" + cssClass('checkbox') + " " + cssClass('color-gradient') + "\">\n        <input name=\"color\" type=\"radio\" value=\"custom:divergent\" " + (isCustom ? 'checked' : '') + ">\n        <span class=\"" + cssClass('color-custom') + "\">\n          <input type=\"color\" name=\"divergingm1\" list=\"" + id + "L\" " + (!isCustom ? 'disabled' : "value=\"" + entries[0].color + "\"") + ">\n          <input type=\"color\" name=\"diverging0\" list=\"" + id + "LW\" " + (!isCustom ? 'disabled' : "value=\"" + entries[1].color + "\"") + ">\n          <input type=\"color\" name=\"diverging1\" list=\"" + id + "L\" " + (!isCustom ? 'disabled' : "value=\"" + entries[2].color + "\"") + ">\n        </span>\n      </label>";
        }
        h += '</div>';
        return h;
    };
    ColorMappingDialog.prototype.applyColor = function () {
        var selected = this.findInput("input[name=color]:checked");
        if (!selected) {
            return;
        }
        var quantized = this.findInput("#" + this.id + "KQ_S");
        var steps = this.findInput("#" + this.id + "KQS_S");
        var base = toColor(selected, this.node);
        if (quantized.checked && !(base instanceof SolidColorFunction)) {
            this.column.setColorMapping(new QuantizedColorFunction(base, Number.parseInt(steps.value, 10)));
        }
        else {
            this.column.setColorMapping(base);
        }
    };
    ColorMappingDialog.prototype.build = function (node) {
        var content = node.ownerDocument.createElement('div');
        content.classList.add(cssClass('dialog-color'));
        node.appendChild(content);
        this.render(content, this.column.getColorMapping());
    };
    ColorMappingDialog.prototype.render = function (node, value) {
        var _this = this;
        var id = this.id;
        node.innerHTML = this.createTemplate(id, value);
        var toggles = Array.from(node.querySelectorAll('strong[data-toggle]'));
        var _loop_1 = function (toggle) {
            toggle.onclick = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                for (var _i = 0, toggles_2 = toggles; _i < toggles_2.length; _i++) {
                    var t2 = toggles_2[_i];
                    t2.dataset.toggle = t2.dataset.toggle === 'open' || toggle !== t2 ? '' : 'open';
                }
            };
        };
        for (var _i = 0, toggles_1 = toggles; _i < toggles_1.length; _i++) {
            var toggle = toggles_1[_i];
            _loop_1(toggle);
        }
        var customs = [];
        var updateColor = function (d) {
            if (!d.checked) {
                return;
            }
            var _loop_2 = function (custom) {
                Array.from(custom.nextElementSibling.getElementsByTagName('input')).forEach(function (s) { return (s.disabled = custom !== d); });
            };
            // disable customs
            for (var _i = 0, customs_1 = customs; _i < customs_1.length; _i++) {
                var custom = customs_1[_i];
                _loop_2(custom);
            }
            if (_this.showLivePreviews()) {
                _this.applyColor();
            }
        };
        var updateSelectedColor = function () {
            var selected = _this.findInput("input[name=color]:checked");
            if (selected) {
                updateColor(selected);
            }
        };
        this.forEach('input[name=color]', function (d) {
            if (d.value.startsWith('custom:')) {
                customs.push(d);
            }
            d.onchange = function () { return updateColor(d); };
        });
        // upon changing custom parameter trigger an update
        this.forEach("." + cssClass('color-custom') + " input[type=color]", function (d) {
            d.onchange = function () {
                var item = d.parentElement.previousElementSibling;
                updateColor(item);
            };
        });
        // sync and apply
        var continuouos = this.findInput("#" + id + "KC_S");
        var quantized = this.findInput("#" + id + "KQ_S");
        var steps = this.findInput("#" + id + "KQS_S");
        var continuouos2 = this.findInput("#" + id + "KC_D");
        var quantized2 = this.findInput("#" + id + "KQ_D");
        var steps2 = this.findInput("#" + id + "KQS_D");
        continuouos.onchange = continuouos2.onchange = function (evt) {
            continuouos.checked = continuouos2.checked = evt.currentTarget.checked;
            steps.disabled = steps2.disabled = !quantized.checked;
            if (continuouos.checked) {
                _this.updateGradients(-1);
                updateSelectedColor();
            }
        };
        steps.onchange = steps2.onchange = function (evt) {
            steps.value = steps2.value = evt.currentTarget.value;
            _this.updateGradients(Number.parseInt(steps.value, 10));
            updateSelectedColor();
        };
        quantized.onchange = quantized2.onchange = function (evt) {
            quantized.checked = quantized2.checked = evt.currentTarget.checked;
            steps.disabled = steps2.disabled = !quantized.checked;
            if (quantized.checked) {
                _this.updateGradients(Number.parseInt(steps.value, 10));
                updateSelectedColor();
            }
        };
    };
    ColorMappingDialog.prototype.reset = function () {
        var desc = this.column.desc;
        var colorMapping = this.ctx.provider.getTypeFactory().colorMappingFunction(desc.colorMapping || desc.color);
        this.render(this.node.querySelector("." + cssClass('dialog-color')), colorMapping);
    };
    ColorMappingDialog.prototype.submit = function () {
        this.applyColor();
        return true;
    };
    ColorMappingDialog.prototype.cancel = function () {
        this.column.setColorMapping(this.before);
    };
    ColorMappingDialog.prototype.updateGradients = function (steps) {
        this.forEach("span[data-c]", function (d) {
            var key = d.dataset.c;
            var s = SequentialColorFunction.FUNCTIONS[key];
            if (s) {
                d.style.background = steps < 0 ? gradient(s, 9) : steppedGradient(s, steps);
                return;
            }
            var di = DivergentColorFunction.FUNCTIONS[key];
            if (di) {
                d.style.background = steps < 0 ? gradient(di, 11) : steppedGradient(di, steps);
                return;
            }
        });
    };
    return ColorMappingDialog;
}(ADialog));
export default ColorMappingDialog;
function toColor(input, node) {
    switch (input.value) {
        case 'custom:solid':
            return new SolidColorFunction(node.querySelector('input[name=solid]').value);
        case 'custom:sequential':
            var s0 = node.querySelector('input[name=interpolate0]').value;
            var s1 = node.querySelector('input[name=interpolate1]').value;
            return new CustomColorMappingFunction([
                { color: s0, value: 0 },
                { color: s1, value: 1 },
            ]);
        case 'custom:diverging':
            var dm1 = node.querySelector('input[name=divergentm1]').value;
            var d0 = node.querySelector('input[name=divergent0]').value;
            var d1 = node.querySelector('input[name=divergent1]').value;
            return new CustomColorMappingFunction([
                { color: dm1, value: 0 },
                { color: d0, value: 0.5 },
                { color: d1, value: 1 },
            ]);
    }
    if (input.value in SequentialColorFunction.FUNCTIONS) {
        return new SequentialColorFunction(input.value);
    }
    if (input.value in DivergentColorFunction.FUNCTIONS) {
        return new DivergentColorFunction(input.value);
    }
    return new SolidColorFunction(input.value);
}
function gradient(interpolate, steps) {
    if (steps === void 0) { steps = 2; }
    if (steps <= 1) {
        return "" + interpolate(0);
    }
    var stepSize = 1 / (steps - 1);
    var r = "linear-gradient(to right";
    for (var i = 0; i < steps; ++i) {
        r += ", " + interpolate(i * stepSize) + " " + round(i * stepSize * 100, 2) + "%";
    }
    r += ')';
    return r;
}
function steppedGradient(color, count) {
    if (count === void 0) { count = 2; }
    if (count === 1) {
        return "" + color(0);
    }
    var r = "linear-gradient(to right";
    var stepSize = 1 / count;
    var half = stepSize / 2;
    for (var i = 0; i < count; ++i) {
        // stepped
        // first and last at border else center
        var shift = i === 0 ? 0 : i === count - 1 ? stepSize : half;
        var c = color(i * stepSize + shift);
        r += ", " + c + " " + round(i * stepSize * 100, 2) + "%, " + c + " " + round((i + 1) * stepSize * 100, 2) + "%";
    }
    r += ')';
    return r;
}
//# sourceMappingURL=ColorMappingDialog.js.map