import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LineUp, { LineUpCategoricalColumnDesc, LineUpNumberColumnDesc, LineUpStringColumnDesc, LineUpRanking, LineUpColumn, LineUpSupportColumn } from '../src';
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
function builder2() {
    return React.createElement(LineUp, { data: arr, sidePanel: true, sidePanelCollapsed: true, defaultRanking: true },
        React.createElement(LineUpStringColumnDesc, { column: "d", label: "Label", width: 100 }),
        React.createElement(LineUpCategoricalColumnDesc, { column: "cat", categories: cats, color: "green" }),
        React.createElement(LineUpCategoricalColumnDesc, { column: "cat2", categories: cats, color: "blue" }),
        React.createElement(LineUpNumberColumnDesc, { column: "a", domain: [0, 10], color: "blue" }),
        React.createElement(LineUpRanking, { groupBy: "cat", sortBy: "a:desc" },
            React.createElement(LineUpSupportColumn, { type: "*" }),
            React.createElement(LineUpColumn, { column: "*" })));
}
ReactDOM.render(React.createElement(builder2), document.querySelector('div'));
//# sourceMappingURL=builder2.js.map