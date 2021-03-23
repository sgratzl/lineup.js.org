import { __spreadArray } from "tslib";
import { getAllToolbarActions, getAllToolbarDialogAddons } from '../model/internal';
import { EDateSort, EAdvancedSortMethod, ESortMethod, isSupportType, isSortingAscByDefault, } from '../model';
import { cssClass } from '../styles';
import { dialogContext } from './dialogs/ADialog';
import CategoricalColorMappingDialog from './dialogs/CategoricalColorMappingDialog';
import CategoricalFilterDialog from './dialogs/CategoricalFilterDialog';
import CategoricalMappingFilterDialog from './dialogs/CategoricalMappingFilterDialog';
import ChangeRendererDialog from './dialogs/ChangeRendererDialog';
import ColorMappingDialog from './dialogs/ColorMappingDialog';
import CompositeChildrenDialog from './dialogs/CompositeChildrenDialog';
import CutOffHierarchyDialog from './dialogs/CutOffHierarchyDialog';
import DateFilterDialog from './dialogs/DateFilterDialog';
import EditPatternDialog from './dialogs/EditPatternDialog';
import appendDate from './dialogs/groupDate';
import GroupDialog from './dialogs/GroupDialog';
import appendNumber from './dialogs/groupNumber';
import appendString from './dialogs/groupString';
import MappingDialog from './dialogs/MappingDialog';
import NumberFilterDialog from './dialogs/NumberFilterDialog';
import ReduceDialog from './dialogs/ReduceDialog';
import RenameDialog from './dialogs/RenameDialog';
import ScriptEditDialog from './dialogs/ScriptEditDialog';
import SearchDialog from './dialogs/SearchDialog';
import ShowTopNDialog from './dialogs/ShowTopNDialog';
import SortDialog from './dialogs/SortDialog';
import StringFilterDialog from './dialogs/StringFilterDialog';
import { sortMethods } from './dialogs/utils';
import WeightsEditDialog from './dialogs/WeightsEditDialog';
function ui(title, onClick, options) {
    if (options === void 0) { options = {}; }
    return { title: title, onClick: onClick, options: options };
}
function uiDialog(title, dialogClass, extraArgs, options) {
    if (extraArgs === void 0) { extraArgs = function () { return []; }; }
    if (options === void 0) { options = {}; }
    return {
        title: title,
        onClick: function (col, evt, ctx, level) {
            var dialog = new (dialogClass.bind.apply(dialogClass, __spreadArray([void 0, col, dialogContext(ctx, level, evt)], extraArgs(ctx))))();
            dialog.open();
        },
        options: options,
    };
}
function uiSortMethod(methods) {
    methods = methods.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); });
    return {
        title: 'Sort By',
        order: 2,
        append: function (col, node) {
            return sortMethods(node, col, methods);
        },
    };
}
var sort = {
    title: 'Sort',
    onClick: function (col, evt, ctx, level) {
        ctx.dialogManager.removeAboveLevel(level);
        if (!evt.ctrlKey) {
            col.toggleMySorting();
            return;
        }
        var ranking = col.findMyRanker();
        var current = ranking.getSortCriteria();
        var order = col.isSortedByMe();
        var isAscByDefault = isSortingAscByDefault(col);
        if (order.priority === undefined) {
            ranking.sortBy(col, isAscByDefault, current.length);
            return;
        }
        var next = undefined;
        if (isAscByDefault) {
            next = order.asc ? 'desc' : undefined;
        }
        else {
            next = !order.asc ? 'asc' : undefined;
        }
        ranking.sortBy(col, next === 'asc', next ? order.priority : -1);
    },
    options: {
        mode: 'shortcut',
        order: 1,
        featureCategory: 'ranking',
        featureLevel: 'basic',
    },
};
var sortBy = {
    title: 'Sort By &hellip;',
    onClick: function (col, evt, ctx, level) {
        var dialog = new SortDialog(col, false, dialogContext(ctx, level, evt), ctx);
        dialog.open();
    },
    options: {
        mode: 'menu',
        order: 1,
        featureCategory: 'ranking',
        featureLevel: 'advanced',
    },
};
var sortGroupBy = {
    title: 'Sort Groups By &hellip;',
    onClick: function (col, evt, ctx, level) {
        var dialog = new SortDialog(col, true, dialogContext(ctx, level, evt), ctx);
        dialog.open();
    },
    options: {
        mode: 'menu',
        order: 3,
        featureCategory: 'ranking',
        featureLevel: 'advanced',
    },
};
var rename = {
    title: 'Rename &hellip;',
    onClick: function (col, evt, ctx, level) {
        var dialog = new RenameDialog(col, dialogContext(ctx, level, evt));
        dialog.open();
    },
    options: {
        order: 5,
        featureCategory: 'ui',
        featureLevel: 'advanced',
    },
};
var vis = {
    title: 'Visualization &hellip;',
    onClick: function (col, evt, ctx, level) {
        var dialog = new ChangeRendererDialog(col, dialogContext(ctx, level, evt), ctx);
        dialog.open();
    },
    options: {
        featureCategory: 'ui',
        featureLevel: 'advanced',
    },
};
var clone = {
    title: 'Clone',
    onClick: function (col, _evt, ctx) {
        ctx.dialogManager.removeAll(); // since the column will be removed
        ctx.provider.takeSnapshot(col);
    },
    options: {
        order: 80,
        featureCategory: 'model',
        featureLevel: 'advanced',
    },
};
var remove = {
    title: 'Remove',
    onClick: function (col, _evt, ctx) {
        ctx.dialogManager.removeAll(); // since the column will be removed
        var ranking = col.findMyRanker();
        var last = ranking.children.every(function (d) { return isSupportType(d) || d.fixed || d === col; });
        if (!last) {
            col.removeMe();
            return;
        }
        ctx.provider.removeRanking(ranking);
        ctx.provider.ensureOneRanking();
    },
    options: {
        order: 90,
        featureCategory: 'model',
        featureLevel: 'advanced',
    },
};
// basic ranking
var group = ui('Group', function (col, evt, ctx, level) {
    ctx.dialogManager.removeAboveLevel(level);
    if (!evt.ctrlKey) {
        col.groupByMe();
        return;
    }
    var ranking = col.findMyRanker();
    var current = ranking.getGroupCriteria();
    var order = current.indexOf(col);
    ranking.groupBy(col, order >= 0 ? -1 : current.length);
}, { mode: 'shortcut', order: 2, featureCategory: 'ranking', featureLevel: 'basic' });
// advanced ranking
var groupBy = ui('Group By &hellip;', function (col, evt, ctx, level) {
    var dialog = new GroupDialog(col, dialogContext(ctx, level, evt), ctx);
    dialog.open();
}, { mode: 'menu', order: 2, featureCategory: 'ranking', featureLevel: 'advanced' });
function toggleCompressExpand(col, evt, ctx, level) {
    ctx.dialogManager.removeAboveLevel(level);
    var mcol = col;
    mcol.setCollapsed(!mcol.getCollapsed());
    var collapsed = mcol.getCollapsed();
    var i = evt.currentTarget;
    i.title = collapsed ? 'Expand' : 'Compress';
    i.classList.toggle(cssClass('action-compress'), !collapsed);
    i.classList.toggle(cssClass('action-expand'), collapsed);
    var inner = i.getElementsByTagName('span')[0];
    if (inner) {
        inner.textContent = i.title;
    }
}
var compress = {
    title: 'Compress',
    enabled: function (col) { return !col.getCollapsed(); },
    onClick: toggleCompressExpand,
    options: { featureCategory: 'model', featureLevel: 'advanced' },
};
var expand = {
    title: 'Expand',
    enabled: function (col) { return col.getCollapsed(); },
    onClick: toggleCompressExpand,
    options: { featureCategory: 'model', featureLevel: 'advanced' },
};
var setShowTopN = {
    title: 'Change Show Top N',
    onClick: function (_col, evt, ctx, level) {
        var dialog = new ShowTopNDialog(ctx.provider, dialogContext(ctx, level, evt));
        dialog.open();
    },
    options: {
        featureCategory: 'ui',
        featureLevel: 'advanced',
    },
};
export var toolbarDialogAddons = {
    sortNumber: uiSortMethod(Object.keys(EAdvancedSortMethod)),
    sortNumbers: uiSortMethod(Object.keys(EAdvancedSortMethod)),
    sortBoxPlot: uiSortMethod(Object.keys(ESortMethod)),
    sortDates: uiSortMethod(Object.keys(EDateSort)),
    sortGroups: uiSortMethod(['count', 'name']),
    groupNumber: {
        title: 'Split',
        order: 2,
        append: appendNumber,
    },
    groupString: {
        title: 'Groups',
        order: 2,
        append: appendString,
    },
    groupDate: {
        title: 'Granularity',
        order: 2,
        append: appendDate,
    },
};
export var toolbarActions = {
    vis: vis,
    group: group,
    groupBy: groupBy,
    compress: compress,
    expand: expand,
    sort: sort,
    sortBy: sortBy,
    sortGroupBy: sortGroupBy,
    clone: clone,
    remove: remove,
    rename: rename,
    setShowTopN: setShowTopN,
    search: uiDialog('Search &hellip;', SearchDialog, function (ctx) { return [ctx.provider]; }, {
        mode: 'menu+shortcut',
        order: 4,
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    filterNumber: uiDialog('Filter &hellip;', NumberFilterDialog, function (ctx) { return [ctx]; }, {
        mode: 'menu+shortcut',
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    filterDate: uiDialog('Filter &hellip;', DateFilterDialog, function (ctx) { return [ctx]; }, {
        mode: 'menu+shortcut',
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    filterString: uiDialog('Filter &hellip;', StringFilterDialog, function () { return []; }, {
        mode: 'menu+shortcut',
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    filterCategorical: uiDialog('Filter &hellip;', CategoricalFilterDialog, function (ctx) { return [ctx]; }, {
        mode: 'menu+shortcut',
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    filterOrdinal: uiDialog('Filter &hellip;', CategoricalMappingFilterDialog, function () { return []; }, {
        mode: 'menu+shortcut',
        featureCategory: 'ranking',
        featureLevel: 'basic',
    }),
    colorMapped: uiDialog('Color Mapping &hellip;', ColorMappingDialog, function (ctx) { return [ctx]; }, {
        mode: 'menu',
        featureCategory: 'ui',
        featureLevel: 'advanced',
    }),
    colorMappedCategorical: uiDialog('Color Mapping &hellip;', CategoricalColorMappingDialog, function () { return []; }, {
        mode: 'menu',
        featureCategory: 'ui',
        featureLevel: 'advanced',
    }),
    script: uiDialog('Edit Combine Script &hellip;', ScriptEditDialog, function () { return []; }, {
        mode: 'menu+shortcut',
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    reduce: uiDialog('Reduce by &hellip;', ReduceDialog, function () { return []; }, {
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    cutoff: uiDialog('Set Cut Off &hellip;', CutOffHierarchyDialog, function (ctx) { return [ctx.idPrefix]; }, {
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    editMapping: uiDialog('Data Mapping &hellip;', MappingDialog, function (ctx) { return [ctx]; }, {
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    editPattern: uiDialog('Edit Pattern &hellip;', EditPatternDialog, function (ctx) { return [ctx.idPrefix]; }, {
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    editWeights: uiDialog('Edit Weights &hellip;', WeightsEditDialog, function () { return []; }, {
        mode: 'menu+shortcut',
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    compositeContained: uiDialog('Contained Columns &hellip;', CompositeChildrenDialog, function (ctx) { return [ctx]; }, {
        featureCategory: 'model',
        featureLevel: 'advanced',
    }),
    splitCombined: ui('Split Combined Column', function (col, _evt, ctx, level) {
        ctx.dialogManager.removeAboveLevel(level - 1); // close itself
        // split the combined column into its children
        col.children.reverse().forEach(function (c) { return col.insertAfterMe(c); });
        col.removeMe();
    }, { featureCategory: 'model', featureLevel: 'advanced' }),
    invertSelection: ui('Invert Selection', function (col, _evt, ctx, level) {
        ctx.dialogManager.removeAboveLevel(level - 1); // close itself
        var s = ctx.provider.getSelection();
        var order = Array.from(col.findMyRanker().getOrder());
        if (s.length === 0) {
            ctx.provider.setSelection(order);
            return;
        }
        var ss = new Set(s);
        var others = order.filter(function (d) { return !ss.has(d); });
        ctx.provider.setSelection(others);
    }, { featureCategory: 'model', featureLevel: 'advanced' }),
};
function sortActions(a, b) {
    if (a.options.order === b.options.order) {
        return a.title.toString().localeCompare(b.title.toString());
    }
    return (a.options.order || 50) - (b.options.order || 50);
}
function getFullToolbar(col, ctx) {
    var cache = ctx.caches.toolbar;
    if (cache.has(col.desc.type)) {
        return cache.get(col.desc.type);
    }
    var keys = getAllToolbarActions(col);
    if (!col.fixed) {
        keys.push('remove');
    }
    {
        var possible = ctx.getPossibleRenderer(col);
        if (possible.item.length > 2 || possible.group.length > 2 || possible.summary.length > 2) {
            // default always possible
            keys.push('vis');
        }
    }
    var actions = ctx.resolveToolbarActions(col, keys);
    var r = Array.from(new Set(actions)).sort(sortActions);
    cache.set(col.desc.type, r);
    return r;
}
/** @internal */
export function getToolbar(col, ctx) {
    var toolbar = getFullToolbar(col, ctx);
    var flags = ctx.flags;
    return toolbar.filter(function (a) {
        if (a.enabled && !a.enabled(col)) {
            return false;
        }
        // level is basic or not one of disabled features
        return (a.options.featureLevel === 'basic' ||
            !((flags.advancedModelFeatures === false && a.options.featureCategory === 'model') ||
                (flags.advancedRankingFeatures === false && a.options.featureCategory === 'ranking') ||
                (flags.advancedUIFeatures === false && a.options.featureCategory === 'ui')));
    });
}
/** @internal */
export function getToolbarDialogAddons(col, key, ctx) {
    var cacheKey = col.desc.type + "@" + key;
    var cacheAddon = ctx.caches.toolbarAddons;
    if (cacheAddon.has(cacheKey)) {
        return cacheAddon.get(cacheKey);
    }
    var keys = getAllToolbarDialogAddons(col, key);
    var actions = ctx.resolveToolbarDialogAddons(col, keys);
    var r = Array.from(new Set(actions)).sort(function (a, b) {
        if (a.order === b.order) {
            return a.title.localeCompare(b.title);
        }
        return (a.order || 50) - (b.order || 50);
    });
    cacheAddon.set(cacheKey, r);
    return r;
}
/** @internal */
export function isSortAble(col, ctx) {
    var toolbar = getFullToolbar(col, ctx);
    return (toolbar.find(function (d) { return d === sort || d === sortBy || d.title === sort.title || d.title.startsWith('Sort By'); }) != null);
}
/** @internal */
export function isGroupAble(col, ctx) {
    var toolbar = getFullToolbar(col, ctx);
    return (toolbar.find(function (d) { return d === group || d === groupBy || d.title === group.title || d.title.startsWith('Group By'); }) !=
        null);
}
/** @internal */
export function isGroupSortAble(col, ctx) {
    var toolbar = getFullToolbar(col, ctx);
    return (toolbar.find(function (d) { return d === sortGroupBy || d.title === sortGroupBy.title || d.title.startsWith('Sort Groups By'); }) !=
        null);
}
//# sourceMappingURL=toolbar.js.map