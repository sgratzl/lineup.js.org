import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LineUp, { LineUpRanking, LineUpSupportColumn, LineUpColumn } from '../src';
var arr = [];
var cats = ['c1', 'c2', 'c3'];
for (var i = 0; i < 100; ++i) {
    arr.push({
        a: Math.random() * 10,
        d: "Row " + i,
        cat: cats[Math.floor(Math.random() * 3)],
        cat2: cats[Math.floor(Math.random() * 3)]
    });
}
var Builder3 = (function (_super) {
    tslib_1.__extends(Builder3, _super);
    function Builder3(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            selection: [],
            sidePanelCollapsed: true,
            highlight: -1,
            arr: arr,
            groupBy: 'cat'
        };
        return _this;
    }
    Builder3.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement(LineUp, { data: this.state.arr, sidePanel: true, highlight: this.state.highlight >= 0 ? this.state.highlight : null, sidePanelCollapsed: this.state.sidePanelCollapsed, selection: this.state.selection, onSelectionChanged: function (s) { return _this.setState({ selection: s }); }, onHighlightChanged: function (h) {
                    console.log(h);
                    _this.setState({ highlight: h });
                } },
                React.createElement(LineUpRanking, { groupBy: this.state.groupBy, sortBy: "a:desc" },
                    React.createElement(LineUpSupportColumn, { type: "*" }),
                    React.createElement(LineUpColumn, { column: "*" }))),
            React.createElement("div", null,
                React.createElement("button", { onClick: function () { return _this.setState({ sidePanelCollapsed: !_this.state.sidePanelCollapsed }); } }, "Panel"),
                React.createElement("button", { onClick: function () { return _this.setState({ arr: _this.state.arr.slice(10) }); } }, "Data"),
                React.createElement("button", { onClick: function () { return _this.setState({ groupBy: _this.state.groupBy === 'cat' ? 'cat2' : 'cat' }); } }, "Group"),
                React.createElement("button", { onClick: function () { return _this.setState({ highlight: _this.state.highlight + 20 }); } }, "Highlight"),
                this.state.selection.map(function (d) { return React.createElement("div", { key: d }, d); })));
    };
    return Builder3;
}(React.PureComponent));
ReactDOM.render(React.createElement(Builder3), document.querySelector('body'));
//# sourceMappingURL=builder3.js.map