import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as LineUpJS from '../src';
function data() {
    var arr = [];
    for (var i = 0; i < 100; ++i) {
        arr.push({
            a: (i * 999) % 11,
            d: "Row " + i,
        });
    }
    return arr;
}
var d = data();
var Render = (function (_super) {
    tslib_1.__extends(Render, _super);
    function Render(props, ctx) {
        var _this = _super.call(this, props, ctx) || this;
        _this.state = {
            highlight: -1,
            selection: []
        };
        return _this;
    }
    Render.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement(LineUpJS.LineUp, { data: d, onSelectionChanged: function (selection) { return _this.setState({ selection: selection }); }, onHighlightChanged: function (highlight) { return _this.setState({ highlight: highlight }); }, selection: this.state.selection, highlight: this.state.highlight },
                React.createElement(LineUpJS.LineUpStringColumnDesc, { column: "d", label: "Label", width: 80 }),
                React.createElement(LineUpJS.LineUpNumberColumnDesc, { column: "a", label: "other label", width: 160 })),
            React.createElement("button", { onClick: function () { return _this.setState({ highlight: _this.state.highlight + 10 }); } }, "Highlight"));
    };
    return Render;
}(React.Component));
ReactDOM.render(React.createElement(Render), document.querySelector('body'));
//# sourceMappingURL=highlight.js.map