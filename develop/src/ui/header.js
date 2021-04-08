var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { MIN_LABEL_WIDTH } from '../constants';
import { equalArrays, dragAble, dropAble, hasDnDType } from '../internal';
import { categoryOf, getSortType } from '../model';
import { createNestedDesc, createReduceDesc, createStackDesc, isArrayColumn, isBoxPlotColumn, isCategoricalColumn, isMapColumn, isNumberColumn, isNumbersColumn, ImpositionCompositeColumn, ImpositionCompositesColumn, createImpositionDesc, createImpositionsDesc, ImpositionBoxPlotColumn, createImpositionBoxPlotDesc, CompositeColumn, isMultiLevelColumn, } from '../model';
import { aria, cssClass, engineCssClass, RESIZE_ANIMATION_DURATION, RESIZE_SPACE } from '../styles';
import MoreColumnOptionsDialog from './dialogs/MoreColumnOptionsDialog';
import { getToolbar } from './toolbar';
import { dialogContext } from './dialogs';
/** @internal */
export function createHeader(col, ctx, options) {
    if (options === void 0) { options = {}; }
    options = Object.assign({
        dragAble: true,
        mergeDropAble: true,
        rearrangeAble: true,
        resizeable: true,
        level: 0,
        extraPrefix: '',
    }, options);
    var node = ctx.document.createElement('section');
    var extra = options.extraPrefix
        ? function (name) { return cssClass(name) + " " + cssClass(options.extraPrefix + "-" + name); }
        : cssClass;
    var summary = col.getMetaData().summary;
    node.innerHTML = "\n    <div class=\"" + extra('label') + " " + cssClass('typed-icon') + "\">" + (col.getWidth() < MIN_LABEL_WIDTH ? '&nbsp;' : col.label) + "</div>\n    <div class=\"" + extra('sublabel') + "\">" + (col.getWidth() < MIN_LABEL_WIDTH || !summary ? '&nbsp;' : summary) + "</div>\n    <div class=\"" + extra('toolbar') + "\"></div>\n    <div class=\"" + extra('spacing') + "\"></div>\n    <div class=\"" + extra('handle') + " " + cssClass('feature-advanced') + " " + cssClass('feature-ui') + "\"></div>\n  ";
    // addTooltip(node, col);
    createShortcutMenuItems(node.getElementsByClassName(cssClass('toolbar'))[0], options.level, col, ctx, 'header');
    toggleToolbarIcons(node, col);
    if (options.dragAble) {
        dragAbleColumn(node, col, ctx);
    }
    if (options.mergeDropAble) {
        mergeDropAble(node, col, ctx);
    }
    if (options.rearrangeAble) {
        rearrangeDropAble(node.getElementsByClassName(cssClass('handle'))[0], col, ctx);
    }
    if (options.resizeable) {
        dragWidth(col, node);
    }
    return node;
}
/** @internal */
export function updateHeader(node, col, minWidth) {
    if (minWidth === void 0) { minWidth = MIN_LABEL_WIDTH; }
    var label = node.getElementsByClassName(cssClass('label'))[0];
    label.innerHTML = col.getWidth() < minWidth ? '&nbsp;' : col.label;
    var summary = col.getMetaData().summary;
    var subLabel = node.getElementsByClassName(cssClass('sublabel'))[0];
    if (subLabel) {
        subLabel.innerHTML = col.getWidth() < minWidth || !summary ? '&nbsp;' : summary;
    }
    var title = col.label;
    if (summary) {
        title = title + "\n" + summary;
    }
    if (col.description) {
        title = title + "\n" + col.description;
    }
    node.title = title;
    node.dataset.colId = col.id;
    node.dataset.type = col.desc.type;
    label.dataset.typeCat = categoryOf(col).name;
    updateIconState(node, col);
    updateMoreDialogIcons(node, col);
}
function updateMoreDialogIcons(node, col) {
    var root = node.closest("." + cssClass());
    if (!root) {
        return;
    }
    var dialog = root.querySelector("." + cssClass('more-options') + "[data-col-id=\"" + col.id + "\"]");
    if (!dialog) {
        return;
    }
    updateIconState(dialog, col);
}
/** @internal */
export function updateIconState(node, col) {
    var sort = node.getElementsByClassName(cssClass('action-sort'))[0];
    if (sort) {
        var _a = col.isSortedByMe(), asc = _a.asc, priority = _a.priority;
        sort.dataset.sort = asc !== undefined ? asc : '';
        sort.dataset.type = getSortType(col);
        if (priority !== undefined) {
            sort.dataset.priority = (priority + 1).toString();
        }
        else {
            delete sort.dataset.priority;
        }
    }
    var sortGroups = node.getElementsByClassName(cssClass('action-sort-groups'))[0];
    if (sortGroups) {
        var _b = col.isGroupSortedByMe(), asc = _b.asc, priority = _b.priority;
        sortGroups.dataset.sort = asc !== undefined ? asc : '';
        sortGroups.dataset.type = getSortType(col);
        if (priority !== undefined) {
            sortGroups.dataset.priority = (priority + 1).toString();
        }
        else {
            delete sortGroups.dataset.priority;
        }
    }
    var group = node.getElementsByClassName(cssClass('action-group'))[0];
    if (group) {
        var groupedBy = col.isGroupedBy();
        group.dataset.group = groupedBy >= 0 ? 'true' : 'false';
        if (groupedBy >= 0) {
            group.dataset.priority = (groupedBy + 1).toString();
        }
        else {
            delete group.dataset.priority;
        }
    }
    var filter = node.getElementsByClassName(cssClass('action-filter'))[0];
    if (!filter) {
        return;
    }
    if (col.isFiltered()) {
        filter.dataset.active = '';
    }
    else {
        delete filter.dataset.active;
    }
}
/** @internal */
export function actionCSSClass(title) {
    if (title.endsWith('&hellip;')) {
        title = title.slice(0, -'&hellip;'.length - 1);
    }
    if (title.endsWith('By')) {
        title = title.slice(0, -3);
    }
    var clean = title.toLowerCase().replace(/[ +-]/gm, '-');
    return cssClass('action') + " " + cssClass("action-" + clean);
}
function addIconDOM(node, col, ctx, level, showLabel, mode) {
    return function (action) {
        var m = isActionMode(col, action, mode, 'shortcut')
            ? 'o'
            : isActionMode(col, action, mode, 'menu+shortcut')
                ? 's'
                : 'r';
        node.insertAdjacentHTML('beforeend', "<i data-a=\"" + m + "\" title=\"" + action.title + "\" class=\"" + actionCSSClass(action.title.toString()) + " " + cssClass("feature-" + (action.options.featureLevel || 'basic')) + " " + cssClass("feature-" + (action.options.featureCategory || 'others')) + "\"><span" + (!showLabel ? " class=\"" + cssClass('aria') + "\" aria-hidden=\"true\"" : '') + ">" + action.title + "</span> </i>");
        var i = node.lastElementChild;
        i.onclick = function (evt) {
            evt.stopPropagation();
            ctx.dialogManager.setHighlightColumn(col);
            action.onClick(col, evt, ctx, level, !showLabel);
        };
        return i;
    };
}
function isActionMode(col, d, mode, value) {
    var s = d.options.mode === undefined ? 'menu' : d.options.mode;
    if (s === value) {
        return true;
    }
    if (typeof s === 'function') {
        return s(col, mode) === value;
    }
    return false;
}
/** @internal */
export function createShortcutMenuItems(node, level, col, ctx, mode, willAutoHide) {
    if (willAutoHide === void 0) { willAutoHide = true; }
    var addIcon = addIconDOM(node, col, ctx, level, false, mode);
    var toolbar = getToolbar(col, ctx);
    var shortcuts = toolbar.filter(function (d) { return !isActionMode(col, d, mode, 'menu'); });
    var hybrids = shortcuts.reduce(function (a, b) { return a + (isActionMode(col, b, mode, 'menu+shortcut') ? 1 : 0); }, 0);
    shortcuts.forEach(addIcon);
    var moreEntries = toolbar.length - shortcuts.length + hybrids;
    if (shortcuts.length === toolbar.length || (moreEntries === hybrids && !willAutoHide)) {
        // all visible or just hybrids that will always be visible
        return;
    }
    // need a more entry
    node.insertAdjacentHTML('beforeend', "<i data-a=\"m\" data-m=\"" + moreEntries + "\" title=\"More &hellip;\" class=\"" + actionCSSClass('More') + "\">" + aria('More &hellip;') + "</i>");
    var i = node.lastElementChild;
    i.onclick = function (evt) {
        evt.stopPropagation();
        ctx.dialogManager.setHighlightColumn(col);
        var dialog = new MoreColumnOptionsDialog(col, dialogContext(ctx, level, evt), mode, ctx);
        dialog.open();
    };
}
/** @internal */
export function createToolbarMenuItems(node, level, col, ctx, mode) {
    var addIcon = addIconDOM(node, col, ctx, level, true, mode);
    getToolbar(col, ctx)
        .filter(function (d) { return !isActionMode(col, d, mode, 'shortcut'); })
        .forEach(addIcon);
}
/** @internal */
function toggleRotatedHeader(node, col, defaultVisibleClientWidth) {
    // rotate header flag if needed
    var label = node.getElementsByClassName(cssClass('label'))[0];
    if (col.getWidth() < MIN_LABEL_WIDTH) {
        label.classList.remove("." + cssClass('rotated'));
        return;
    }
    var width = label.clientWidth;
    var rotated = width <= 0
        ? ((col.label.length * defaultVisibleClientWidth) / 3) * 0.6 > col.getWidth()
        : label.scrollWidth * 0.6 > label.clientWidth;
    label.classList.toggle("." + cssClass('rotated'), rotated);
}
/** @internal */
function toggleToolbarIcons(node, col, defaultVisibleClientWidth) {
    if (defaultVisibleClientWidth === void 0) { defaultVisibleClientWidth = 22.5; }
    toggleRotatedHeader(node, col, defaultVisibleClientWidth);
    var toolbar = node.getElementsByClassName(cssClass('toolbar'))[0];
    if (toolbar.childElementCount === 0) {
        return;
    }
    var availableWidth = col.getWidth();
    var actions = Array.from(toolbar.children).map(function (d) { return ({
        node: d,
        width: d.clientWidth > 0 ? d.clientWidth : defaultVisibleClientWidth,
    }); });
    var shortCuts = actions.filter(function (d) { return d.node.dataset.a === 'o'; });
    var hybrids = actions.filter(function (d) { return d.node.dataset.a === 's'; });
    var moreIcon = actions.find(function (d) { return d.node.dataset.a === 'm'; });
    var moreEntries = moreIcon ? Number.parseInt(moreIcon.node.dataset.m, 10) : 0;
    var needMore = moreEntries > hybrids.length;
    var total = actions.reduce(function (a, b) { return a + b.width; }, 0);
    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
        var action = actions_1[_i];
        // maybe hide not needed "more"
        action.node.classList.remove(cssClass('hidden'));
    }
    // all visible
    if (total < availableWidth) {
        return;
    }
    if (moreIcon && !needMore && total - moreIcon.width < availableWidth) {
        // available space is enough we can skip the "more" and then it fits
        moreIcon.node.classList.add(cssClass('hidden'));
        return;
    }
    for (var _a = 0, _b = hybrids.reverse().concat(shortCuts.reverse()); _a < _b.length; _a++) {
        var action = _b[_a];
        // back to forth and hybrids earlier than pure shortcuts
        // hide and check if enough
        action.node.classList.add(cssClass('hidden'));
        total -= action.width;
        if (total < availableWidth) {
            return;
        }
    }
}
/**
 * allow to change the width of a column using dragging the handle
 * @internal
 */
export function dragWidth(col, node) {
    var ueberElement;
    var sizeHelper;
    var currentFooterTransformation = '';
    var handle = node.getElementsByClassName(cssClass('handle'))[0];
    var start = 0;
    var originalWidth = 0;
    var mouseMove = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var end = evt.clientX;
        var delta = end - start;
        if (Math.abs(start - end) < 2) {
            //ignore
            return;
        }
        start = end;
        var width = Math.max(0, col.getWidth() + delta);
        sizeHelper.classList.toggle(cssClass('resize-animated'), width < originalWidth);
        // no idea why shifted by the size compared to the other footer element
        sizeHelper.style.transform = currentFooterTransformation + " translate(" + (width - originalWidth - RESIZE_SPACE) + "px, 0px)";
        node.style.width = width + "px";
        col.setWidth(width);
        toggleToolbarIcons(node, col);
    };
    var mouseUp = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var end = evt.clientX;
        node.classList.remove(cssClass('change-width'));
        ueberElement.removeEventListener('mousemove', mouseMove);
        ueberElement.removeEventListener('mouseup', mouseUp);
        ueberElement.removeEventListener('mouseleave', mouseUp);
        ueberElement.classList.remove(cssClass('resizing'));
        node.style.width = null;
        setTimeout(function () {
            sizeHelper.classList.remove(cssClass('resizing'), cssClass('resize-animated'));
        }, RESIZE_ANIMATION_DURATION * 1.2); // after animation ended
        if (Math.abs(start - end) < 2) {
            //ignore
            return;
        }
        var delta = end - start;
        var width = Math.max(0, col.getWidth() + delta);
        col.setWidth(width);
        toggleToolbarIcons(node, col);
    };
    handle.onmousedown = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        node.classList.add(cssClass('change-width'));
        originalWidth = col.getWidth();
        start = evt.clientX;
        ueberElement = node.closest('body') || node.closest("." + cssClass()); // take the whole body or root lineup
        ueberElement.addEventListener('mousemove', mouseMove);
        ueberElement.addEventListener('mouseup', mouseUp);
        ueberElement.addEventListener('mouseleave', mouseUp);
        ueberElement.classList.add(cssClass('resizing'));
        sizeHelper = node
            .closest("." + engineCssClass())
            .querySelector("." + cssClass('resize-helper'));
        currentFooterTransformation = sizeHelper.previousElementSibling.style.transform;
        sizeHelper.style.transform = currentFooterTransformation + " translate(" + -RESIZE_SPACE + "px, 0px)";
        sizeHelper.classList.add(cssClass('resizing'));
    };
    handle.onclick = function (evt) {
        // avoid resorting
        evt.stopPropagation();
        evt.preventDefault();
    };
}
/** @internal */
export var MIMETYPE_PREFIX = 'text/x-caleydo-lineup-column';
/**
 * allow to drag the column away
 * @internal
 */
export function dragAbleColumn(node, column, ctx) {
    dragAble(node, function () {
        var _a;
        var ref = JSON.stringify(ctx.provider.toDescRef(column.desc));
        var data = (_a = {
                'text/plain': column.label
            },
            _a[MIMETYPE_PREFIX + "-ref"] = column.id,
            _a[MIMETYPE_PREFIX] = ref,
            _a);
        if (isNumberColumn(column)) {
            data[MIMETYPE_PREFIX + "-number"] = ref;
            data[MIMETYPE_PREFIX + "-number-ref"] = column.id;
        }
        if (isCategoricalColumn(column)) {
            data[MIMETYPE_PREFIX + "-categorical"] = ref;
            data[MIMETYPE_PREFIX + "-categorical-ref"] = column.id;
        }
        if (isBoxPlotColumn(column)) {
            data[MIMETYPE_PREFIX + "-boxplot"] = ref;
            data[MIMETYPE_PREFIX + "-boxplot-ref"] = column.id;
        }
        if (isMapColumn(column)) {
            data[MIMETYPE_PREFIX + "-map"] = ref;
            data[MIMETYPE_PREFIX + "-map-ref"] = column.id;
        }
        if (isArrayColumn(column)) {
            data[MIMETYPE_PREFIX + "-array"] = ref;
            data[MIMETYPE_PREFIX + "-array-ref"] = column.id;
        }
        if (isNumbersColumn(column)) {
            data[MIMETYPE_PREFIX + "-numbers"] = ref;
            data[MIMETYPE_PREFIX + "-numbers-ref"] = column.id;
        }
        return {
            effectAllowed: 'copyMove',
            data: data,
        };
    }, true);
}
/**
 * dropper for allowing to rearrange (move, copy) columns
 * @internal
 */
export function rearrangeDropAble(node, column, ctx) {
    dropAble(node, [MIMETYPE_PREFIX + "-ref", MIMETYPE_PREFIX], function (result) {
        var col = null;
        var data = result.data;
        if (!(MIMETYPE_PREFIX + "-ref" in data)) {
            var desc = JSON.parse(data[MIMETYPE_PREFIX]);
            col = ctx.provider.create(ctx.provider.fromDescRef(desc));
            return col != null && column.insertAfterMe(col) != null;
        }
        // find by reference
        var id = data[MIMETYPE_PREFIX + "-ref"];
        col = ctx.provider.find(id);
        if (!col || (col === column && !result.effect.startsWith('copy'))) {
            return false;
        }
        if (result.effect.startsWith('copy')) {
            col = ctx.provider.clone(col);
            return col != null && column.insertAfterMe(col) != null;
        }
        // detect whether it is an internal move operation or an real remove/insert operation
        var toInsertParent = col.parent;
        if (!toInsertParent) {
            // no parent will always be a move
            return column.insertAfterMe(col) != null;
        }
        if (toInsertParent === column.parent) {
            // move operation
            return toInsertParent.moveAfter(col, column) != null;
        }
        col.removeMe();
        return column.insertAfterMe(col) != null;
    }, null, true);
}
/**
 * dropper for allowing to change the order by dropping it at a certain position
 * @internal
 */
export function resortDropAble(node, column, ctx, where, autoGroup) {
    dropAble(node, [MIMETYPE_PREFIX + "-ref", MIMETYPE_PREFIX], function (result) {
        var col = null;
        var data = result.data;
        if (MIMETYPE_PREFIX + "-ref" in data) {
            var id = data[MIMETYPE_PREFIX + "-ref"];
            col = ctx.provider.find(id);
            if (!col || col === column) {
                return false;
            }
        }
        else {
            var desc = JSON.parse(data[MIMETYPE_PREFIX]);
            col = ctx.provider.create(ctx.provider.fromDescRef(desc));
            if (col) {
                column.findMyRanker().push(col);
            }
        }
        var ranking = column.findMyRanker();
        if (!col || col === column || !ranking) {
            return false;
        }
        var criteria = ranking.getSortCriteria();
        var groups = ranking.getGroupCriteria();
        var removeFromSort = function (col) {
            var existing = criteria.findIndex(function (d) { return d.col === col; });
            if (existing >= 0) {
                // remove existing column but keep asc state
                return criteria.splice(existing, 1)[0].asc;
            }
            return false;
        };
        // remove the one to add
        var asc = removeFromSort(col);
        var groupIndex = groups.indexOf(column);
        var index = criteria.findIndex(function (d) { return d.col === column; });
        if (autoGroup && groupIndex >= 0) {
            // before the grouping, so either un group or regroup
            removeFromSort(column);
            if (isCategoricalColumn(col)) {
                // we can group by it
                groups.splice(groupIndex + (where === 'after' ? 1 : 0), 0, col);
            }
            else {
                // remove all before and shift to sorting + sorting
                var removed = groups.splice(0, groups.length - groupIndex);
                criteria.unshift.apply(criteria, removed.reverse().map(function (d) { return ({ asc: false, col: d }); })); // now a first sorting criteria
                criteria.unshift({ asc: asc, col: col });
            }
        }
        else if (index < 0) {
            criteria.push({ asc: asc, col: col });
        }
        else if (index === 0 && autoGroup && isCategoricalColumn(col)) {
            // make group criteria
            groups.push(col);
        }
        else {
            criteria.splice(index + (where === 'after' ? 1 : 0), 0, { asc: asc, col: col });
        }
        if (!equalArrays(groups, ranking.getGroupCriteria())) {
            ranking.setGroupCriteria(groups);
        }
        ranking.setSortCriteria(criteria);
        return true;
    }, null, true);
}
/**
 * dropper for merging columns
 * @internal
 */
export function mergeDropAble(node, column, ctx) {
    var resolveDrop = function (result) {
        var data = result.data;
        var copy = result.effect === 'copy';
        var prefix = MIMETYPE_PREFIX;
        var key = Object.keys(data).find(function (d) { return d.startsWith(prefix) && d.endsWith('-ref'); });
        if (key) {
            var id = data[key];
            var col = ctx.provider.find(id);
            if (copy) {
                col = ctx.provider.clone(col);
            }
            else if (col === column) {
                return null;
            }
            else {
                col.removeMe();
            }
            return col;
        }
        var alternative = Object.keys(data).find(function (d) { return d.startsWith(prefix); });
        if (!alternative) {
            return null;
        }
        var desc = JSON.parse(alternative);
        return ctx.provider.create(ctx.provider.fromDescRef(desc));
    };
    var pushChild = function (result) {
        var col = resolveDrop(result);
        return col != null && column.push(col) != null;
    };
    var mergeImpl = function (col, desc) {
        if (col == null) {
            return false;
        }
        var ranking = column.findMyRanker();
        var index = ranking.indexOf(column);
        var parent = ctx.provider.create(desc);
        column.removeMe();
        parent.push(column);
        parent.push(col);
        return ranking.insert(parent, index) != null;
    };
    var mergeWith = function (desc) { return function (result) {
        var col = resolveDrop(result);
        return mergeImpl(col, desc);
    }; };
    var all = [MIMETYPE_PREFIX + "-ref", MIMETYPE_PREFIX];
    var numberish = [MIMETYPE_PREFIX + "-number-ref", MIMETYPE_PREFIX + "-number"];
    var categorical = [MIMETYPE_PREFIX + "-categorical-ref", MIMETYPE_PREFIX + "-categorical"];
    var boxplot = [MIMETYPE_PREFIX + "-boxplot-ref", MIMETYPE_PREFIX + "-boxplot"];
    var numbers = [MIMETYPE_PREFIX + "-numbers-ref", MIMETYPE_PREFIX + "-numbers"];
    node.dataset.draginfo = '+';
    if (column instanceof ImpositionCompositeColumn) {
        return dropAble(node, categorical.concat(numberish), pushChild, function (e) {
            if (hasDnDType.apply(void 0, __spreadArray([e], categorical))) {
                node.dataset.draginfo = 'Color by';
                return;
            }
            if (hasDnDType.apply(void 0, __spreadArray([e], numberish))) {
                node.dataset.draginfo = 'Wrap';
            }
        }, false, function () { return column.children.length < 2; });
    }
    if (column instanceof ImpositionBoxPlotColumn) {
        return dropAble(node, categorical.concat(boxplot), pushChild, function (e) {
            if (hasDnDType.apply(void 0, __spreadArray([e], categorical))) {
                node.dataset.draginfo = 'Color by';
                return;
            }
            if (hasDnDType.apply(void 0, __spreadArray([e], boxplot))) {
                node.dataset.draginfo = 'Wrap';
            }
        }, false, function () { return column.children.length < 2; });
    }
    if (column instanceof ImpositionCompositesColumn) {
        return dropAble(node, categorical.concat(numbers), pushChild, function (e) {
            if (hasDnDType.apply(void 0, __spreadArray([e], categorical))) {
                node.dataset.draginfo = 'Color by';
                return;
            }
            if (hasDnDType.apply(void 0, __spreadArray([e], numbers))) {
                node.dataset.draginfo = 'Wrap';
            }
        }, false, function () { return column.children.length < 2; });
    }
    if (isMultiLevelColumn(column)) {
        // stack column or nested
        return dropAble(node, column.canJustAddNumbers ? numberish : all, pushChild);
    }
    if (column instanceof CompositeColumn) {
        return dropAble(node, column.canJustAddNumbers ? numberish : all, pushChild);
    }
    if (isNumbersColumn(column)) {
        node.dataset.draginfo = 'Color by';
        return dropAble(node, categorical, mergeWith(createImpositionsDesc()));
    }
    if (isBoxPlotColumn(column)) {
        node.dataset.draginfo = 'Color by';
        return dropAble(node, categorical, mergeWith(createImpositionBoxPlotDesc()));
    }
    if (isNumberColumn(column)) {
        node.dataset.draginfo = 'Merge';
        return dropAble(node, categorical.concat(numberish), function (result, evt) {
            var col = resolveDrop(result);
            if (col == null) {
                return false;
            }
            if (isCategoricalColumn(col)) {
                return mergeImpl(col, createImpositionDesc());
            }
            if (isNumberColumn(col)) {
                return mergeImpl(col, evt.shiftKey ? createReduceDesc() : createStackDesc());
            }
            return false;
        }, function (e) {
            if (hasDnDType.apply(void 0, __spreadArray([e], categorical))) {
                node.dataset.draginfo = 'Color by';
                return;
            }
            if (hasDnDType.apply(void 0, __spreadArray([e], numberish))) {
                node.dataset.draginfo = e.shiftKey ? 'Min/Max' : 'Sum';
            }
        });
    }
    node.dataset.draginfo = 'Group';
    return dropAble(node, all, mergeWith(createNestedDesc()));
}
//# sourceMappingURL=header.js.map