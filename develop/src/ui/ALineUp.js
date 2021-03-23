import { __extends } from "tslib";
import { getUnsupportedBrowserError, SUPPORTED_CHROME_VERSION, SUPPORTED_EDGE_VERSION, SUPPORTED_FIREFOX_VERSION, } from '../browser';
import { AEventDispatcher, clear } from '../internal';
import { DataProvider } from '../provider';
import { cssClass } from '../styles';
import DialogManager from './dialogs/DialogManager';
var ALineUp = /** @class */ (function (_super) {
    __extends(ALineUp, _super);
    function ALineUp(node, _data, ignoreIncompatibleBrowser) {
        var _this = _super.call(this) || this;
        _this.node = node;
        _this._data = _data;
        _this.highlightListeners = 0;
        var error = getUnsupportedBrowserError();
        _this.isBrowserSupported = ignoreIncompatibleBrowser || !error;
        if (!_this.isBrowserSupported) {
            _this.node.classList.add(cssClass('unsupported-browser'));
            _this.node.innerHTML = "<span>" + error + "</span>\n      <div class=\"" + cssClass('unsupported-browser') + "\">\n        <a href=\"https://www.mozilla.org/en-US/firefox/\" rel=\"noopener\" target=\"_blank\" data-browser=\"firefox\" data-version=\"" + SUPPORTED_FIREFOX_VERSION + "\"></a>\n        <a href=\"https://www.google.com/chrome/index.html\" rel=\"noopener\" target=\"_blank\" data-browser=\"chrome\" data-version=\"" + SUPPORTED_CHROME_VERSION + "\" title=\"best support\"></a>\n        <a href=\"https://www.microsoft.com/en-us/windows/microsoft-edge\" rel=\"noopener\" target=\"_blank\" data-browser=\"edge\" data-version=\"" + SUPPORTED_EDGE_VERSION + "\"></a>\n      </div><span>use the <code>ignoreUnsupportedBrowser=true</code> option to ignore this error at your own risk</span>";
        }
        _this.forward(_data, DataProvider.EVENT_SELECTION_CHANGED + ".main");
        _data.on(DataProvider.EVENT_BUSY + ".busy", function (busy) { return _this.node.classList.toggle(cssClass('busy'), busy); });
        return _this;
    }
    ALineUp.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this)
            .concat([
            ALineUp.EVENT_HIGHLIGHT_CHANGED,
            ALineUp.EVENT_SELECTION_CHANGED,
            ALineUp.EVENT_DIALOG_OPENED,
            ALineUp.EVENT_DIALOG_CLOSED,
        ]);
    };
    ALineUp.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    Object.defineProperty(ALineUp.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    ALineUp.prototype.destroy = function () {
        // just clear since we hand in the node itself
        clear(this.node);
        this._data.destroy();
    };
    ALineUp.prototype.dump = function () {
        return this.data.dump();
    };
    ALineUp.prototype.restore = function (dump) {
        this._data.restore(dump);
    };
    ALineUp.prototype.setDataProvider = function (data, dump) {
        var _this = this;
        if (this._data) {
            this.unforward(this._data, DataProvider.EVENT_SELECTION_CHANGED + ".taggle");
            this._data.on(DataProvider.EVENT_BUSY + ".busy", null);
        }
        this._data = data;
        if (dump) {
            data.restore(dump);
        }
        this.forward(data, DataProvider.EVENT_SELECTION_CHANGED + ".taggle");
        data.on(DataProvider.EVENT_BUSY + ".busy", function (busy) { return _this.node.classList.toggle(cssClass('busy'), busy); });
    };
    ALineUp.prototype.getSelection = function () {
        return this._data.getSelection();
    };
    ALineUp.prototype.setSelection = function (dataIndices) {
        this._data.setSelection(dataIndices);
    };
    /**
     * sorts LineUp by he given column
     * @param column callback function finding the column to sort
     * @param ascending
     * @returns {boolean}
     */
    ALineUp.prototype.sortBy = function (column, ascending) {
        if (ascending === void 0) { ascending = false; }
        var col = this.data.find(column);
        if (col) {
            col.sortByMe(ascending);
        }
        return col != null;
    };
    ALineUp.prototype.listenersChanged = function (type, enabled) {
        _super.prototype.listenersChanged.call(this, type, enabled);
        if (!type.startsWith(ALineUp.EVENT_HIGHLIGHT_CHANGED)) {
            return;
        }
        if (enabled) {
            this.highlightListeners++;
            if (this.highlightListeners === 1) {
                // first
                this.enableHighlightListening(true);
            }
        }
        else {
            this.highlightListeners -= 1;
            if (this.highlightListeners === 0) {
                // last
                this.enableHighlightListening(false);
            }
        }
    };
    ALineUp.prototype.enableHighlightListening = function (_enable) {
        // hook
    };
    ALineUp.EVENT_SELECTION_CHANGED = DataProvider.EVENT_SELECTION_CHANGED;
    ALineUp.EVENT_DIALOG_OPENED = DialogManager.EVENT_DIALOG_OPENED;
    ALineUp.EVENT_DIALOG_CLOSED = DialogManager.EVENT_DIALOG_CLOSED;
    ALineUp.EVENT_HIGHLIGHT_CHANGED = 'highlightChanged';
    return ALineUp;
}(AEventDispatcher));
export { ALineUp };
export default ALineUp;
//# sourceMappingURL=ALineUp.js.map