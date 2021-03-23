import { MIN_LABEL_WIDTH } from '../constants';
import { isMapAbleColumn, DEFAULT_COLOR } from '../model';
import { hsl } from 'd3-color';
import { cssClass } from '../styles';
/** @internal */
export function noop() {
    // no op
}
export var noRenderer = {
    template: "<div></div>",
    update: noop,
};
/** @internal */
export function setText(node, text) {
    if (text === undefined) {
        return node;
    }
    //no performance boost if setting the text node directly
    //const textNode = <Text>node.firstChild;
    //if (textNode == null) {
    //  node.appendChild(node.ownerDocument!.createTextNode(text));
    //} else {
    //  textNode.data = text;
    //}
    if (node.textContent !== text) {
        node.textContent = text;
    }
    return node;
}
/**
 * for each item matching the selector execute the callback
 * @param node
 * @param selector
 * @param callback
 * @internal
 */
export function forEach(node, selector, callback) {
    Array.from(node.querySelectorAll(selector)).forEach(callback);
}
/** @internal */
export function forEachChild(node, callback) {
    Array.from(node.children).forEach(callback);
}
/**
 * matches the columns and the dom nodes representing them
 * @param {HTMLElement} node row
 * @param columns columns to check
 * @internal
 */
export function matchColumns(node, columns, ctx) {
    if (node.childElementCount === 0) {
        // initial call fast method
        node.innerHTML = columns.map(function (c) { return c.template; }).join('');
        var children_1 = Array.from(node.children);
        columns.forEach(function (col, i) {
            var cnode = children_1[i];
            // set attribute for finding again
            cnode.dataset.columnId = col.column.id;
            // store current renderer
            cnode.dataset.renderer = col.rendererId;
            cnode.classList.add(cssClass("renderer-" + col.rendererId));
        });
        return;
    }
    function matches(c, i) {
        //do both match?
        var n = node.children[i];
        return n != null && n.dataset.columnId === c.column.id && n.dataset.renderer === c.rendererId;
    }
    if (columns.every(matches)) {
        return; //nothing to do
    }
    var idsAndRenderer = new Set(columns.map(function (c) { return c.column.id + "@" + c.rendererId; }));
    //remove all that are not existing anymore
    forEachChild(node, function (n) {
        var id = n.dataset.columnId;
        var renderer = n.dataset.renderer;
        var idAndRenderer = id + "@" + renderer;
        if (!idsAndRenderer.has(idAndRenderer)) {
            node.removeChild(n);
        }
    });
    columns.forEach(function (col) {
        var cnode = node.querySelector("[data-column-id=\"" + col.column.id + "\"]");
        if (!cnode) {
            cnode = ctx.asElement(col.template);
            cnode.dataset.columnId = col.column.id;
            cnode.dataset.renderer = col.rendererId;
            cnode.classList.add(cssClass("renderer-" + col.rendererId));
        }
        node.appendChild(cnode);
    });
}
export function wideEnough(col, length) {
    if (length === void 0) { length = col.labels.length; }
    var w = col.getWidth();
    return w / length > MIN_LABEL_WIDTH; // at least 30 pixel
}
export function wideEnoughCat(col) {
    var w = col.getWidth();
    return w / col.categories.length > MIN_LABEL_WIDTH; // at least 30 pixel
}
// side effect
var adaptColorCache = {};
/**
 * Adapts the text color for a given background color
 * @param {string} bgColor as `#ff0000`
 * @returns {string} returns `black` or `white` for best contrast
 */
export function adaptTextColorToBgColor(bgColor) {
    var bak = adaptColorCache[bgColor];
    if (bak) {
        return bak;
    }
    return (adaptColorCache[bgColor] = hsl(bgColor).l > 0.5 ? 'black' : 'white');
}
/**
 *
 * Adapts the text color for a given background color
 * @param {HTMLElement} node the node containing the text
 * @param {string} bgColor as `#ff0000`
 * @param {string} title the title to render
 * @param {number} width for which percentages of the cell this background applies (0..1)
 */
export function adaptDynamicColorToBgColor(node, bgColor, title, width) {
    var adapt = adaptTextColorToBgColor(bgColor);
    if (width <= 0.05 || adapt === 'black' || width > 0.9) {
        // almost empty or full
        node.style.color = adapt === 'black' || width <= 0.05 ? null : adapt; // null = black
        // node.classList.remove('lu-gradient-text');
        // node.style.backgroundImage = null;
        return;
    }
    node.style.color = null;
    node.innerText = title;
    var span = node.ownerDocument.createElement('span');
    span.classList.add(cssClass('gradient-text'));
    span.style.color = adapt;
    span.innerText = title;
    node.appendChild(span);
}
/** @internal */
export var uniqueId = (function () {
    // side effect but just within the function itself, so good for the library
    var idCounter = 0;
    return function (prefix) { return "" + prefix + (idCounter++).toString(36); };
})();
var NUM_EXAMPLE_VALUES = 5;
/** @internal */
export function exampleText(col, rows) {
    var examples = [];
    rows.every(function (row) {
        if (col.getValue(row) == null) {
            return true;
        }
        var v = col.getLabel(row);
        examples.push(v);
        return examples.length < NUM_EXAMPLE_VALUES;
    });
    if (examples.length === 0) {
        return '';
    }
    return "" + examples.join(', ') + (examples.length < rows.length ? ', ...' : '');
}
/** @internal */
export function multiLevelGridCSSClass(idPrefix, column) {
    return cssClass("stacked-" + idPrefix + "-" + column.id);
}
/** @internal */
export function colorOf(col) {
    if (isMapAbleColumn(col)) {
        return col.getColorMapping().apply(0);
    }
    return DEFAULT_COLOR;
}
//# sourceMappingURL=utils.js.map