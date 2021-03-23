/**
 * caches parsing of html strings in a dom element cache
 * @param doc the doc to create the elements under
 * @internal
 */
export default function domElementCache(doc) {
    var cache = new Map();
    var helper = doc.createElement('div');
    return function (html) {
        if (cache.has(html)) {
            return cache.get(html).cloneNode(true);
        }
        helper.innerHTML = html;
        var node = helper.firstElementChild;
        // keep a copy
        cache.set(html, node.cloneNode(true));
        return node;
    };
}
//# sourceMappingURL=domElementCache.js.map