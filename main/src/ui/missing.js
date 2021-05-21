import { cssClass } from '../styles';
/** @internal */
export var filterMissingText = 'Filter rows containing missing values';
/** @internal */
export function filterMissingMarkup(bakMissing) {
    return "<label class=\"" + cssClass('checkbox') + "\">\n    <input type=\"checkbox\" " + (bakMissing ? 'checked="checked"' : '') + ">\n    <span class=\"" + cssClass('filter-missing') + "\">" + filterMissingText + "</span>\n  </label>";
}
/** @internal */
export function filterMissingNumberMarkup(bakMissing, count) {
    return "<label class=\"" + cssClass('checkbox') + "\">\n    <input type=\"checkbox\" " + (bakMissing ? 'checked="checked"' : '') + " " + (count === 0 ? 'disabled' : '') + ">\n    <span class=\"" + cssClass('filter-missing') + " " + (count === 0 ? cssClass('disabled') : '') + "\">Filter " + count + " missing value rows</span>\n  </label>";
}
/** @internal */
export function findFilterMissing(node) {
    return node.getElementsByClassName(cssClass('filter-missing'))[0]
        .previousElementSibling;
}
/** @internal */
export function updateFilterMissingNumberMarkup(element, count) {
    var checked = element.getElementsByTagName('input')[0];
    checked.disabled = count === 0;
    element.lastElementChild.classList.toggle(cssClass('disabled'), count === 0);
    element.lastElementChild.textContent = "Filter " + count + " missing value rows";
}
//# sourceMappingURL=missing.js.map