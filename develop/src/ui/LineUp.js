import { __extends, __spreadArray } from "tslib";
import { defaultOptions } from '../config';
import { merge, suffix } from '../internal';
import { cssClass } from '../styles';
import { ALineUp } from './ALineUp';
import EngineRenderer from './EngineRenderer';
import SidePanel from './panel/SidePanel';
var LineUp = /** @class */ (function (_super) {
    __extends(LineUp, _super);
    function LineUp(node, data, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, node, data, options && options.ignoreUnsupportedBrowser === true) || this;
        _this.options = defaultOptions();
        merge(_this.options, options);
        if (!_this.isBrowserSupported) {
            _this.renderer = null;
            _this.panel = null;
            return _this;
        }
        _this.node.classList.add(cssClass());
        _this.renderer = new EngineRenderer(data, _this.node, _this.options);
        if (_this.options.sidePanel) {
            _this.panel = new SidePanel(_this.renderer.ctx, _this.node.ownerDocument, {
                collapseable: _this.options.sidePanelCollapsed ? 'collapsed' : true,
                hierarchy: _this.options.hierarchyIndicator && _this.options.flags.advancedRankingFeatures,
            });
            _this.renderer.pushUpdateAble(function (ctx) { return _this.panel.update(ctx); });
            _this.node.insertBefore(_this.panel.node, _this.node.firstChild);
        }
        else {
            _this.panel = null;
        }
        _this.forward.apply(_this, __spreadArray([_this.renderer], suffix('.main', EngineRenderer.EVENT_HIGHLIGHT_CHANGED, EngineRenderer.EVENT_DIALOG_OPENED, EngineRenderer.EVENT_DIALOG_CLOSED)));
        return _this;
    }
    LineUp.prototype.destroy = function () {
        this.node.classList.remove(cssClass());
        if (this.renderer) {
            this.renderer.destroy();
        }
        if (this.panel) {
            this.panel.destroy();
        }
        _super.prototype.destroy.call(this);
    };
    LineUp.prototype.update = function () {
        if (this.renderer) {
            this.renderer.update();
        }
    };
    LineUp.prototype.setDataProvider = function (data, dump) {
        _super.prototype.setDataProvider.call(this, data, dump);
        if (!this.renderer) {
            return;
        }
        this.renderer.setDataProvider(data);
        this.update();
        if (this.panel) {
            this.panel.update(this.renderer.ctx);
        }
    };
    LineUp.prototype.setHighlight = function (dataIndex, scrollIntoView) {
        if (scrollIntoView === void 0) { scrollIntoView = true; }
        return this.renderer != null && this.renderer.setHighlight(dataIndex, scrollIntoView);
    };
    LineUp.prototype.getHighlight = function () {
        return this.renderer ? this.renderer.getHighlight() : -1;
    };
    LineUp.prototype.enableHighlightListening = function (enable) {
        if (this.renderer) {
            this.renderer.enableHighlightListening(enable);
        }
    };
    LineUp.EVENT_SELECTION_CHANGED = ALineUp.EVENT_SELECTION_CHANGED;
    LineUp.EVENT_DIALOG_OPENED = ALineUp.EVENT_DIALOG_OPENED;
    LineUp.EVENT_DIALOG_CLOSED = ALineUp.EVENT_DIALOG_CLOSED;
    LineUp.EVENT_HIGHLIGHT_CHANGED = ALineUp.EVENT_HIGHLIGHT_CHANGED;
    return LineUp;
}(ALineUp));
export default LineUp;
//# sourceMappingURL=LineUp.js.map