import { __extends } from "tslib";
import { AnnotateColumn } from '../model';
import StringCellRenderer from './StringCellRenderer';
import { cssClass } from '../styles';
var AnnotationRenderer = /** @class */ (function (_super) {
    __extends(AnnotationRenderer, _super);
    function AnnotationRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = 'Default';
        return _this;
    }
    AnnotationRenderer.prototype.canRender = function (col) {
        return _super.prototype.canRender.call(this, col) && col instanceof AnnotateColumn;
    };
    AnnotationRenderer.prototype.create = function (col) {
        return {
            template: "<div>\n        <span></span>\n        <input class=\"" + cssClass('hover-only') + " " + cssClass('annotate-input') + "\">\n       </div>",
            update: function (n, d) {
                var label = n.firstElementChild;
                var input = n.lastElementChild;
                input.onchange = function () {
                    label.textContent = input.value;
                    col.setValue(d, input.value);
                };
                input.onclick = function (event) {
                    event.stopPropagation();
                };
                label.textContent = input.value = col.getLabel(d);
            },
        };
    };
    return AnnotationRenderer;
}(StringCellRenderer));
export default AnnotationRenderer;
//# sourceMappingURL=AnnotationRenderer.js.map