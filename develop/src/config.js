import { renderers } from './renderer/renderers';
import { toolbarActions, toolbarDialogAddons } from './ui/toolbar';
function resolveToolbarActions(col, keys, lookup) {
    var actions = [];
    keys.forEach(function (key) {
        if (lookup.hasOwnProperty(key)) {
            actions.push(lookup[key]);
        }
        else {
            console.warn("cannot find toolbar action of type: \"" + col.desc.type + "\" with key \"" + key + "\"");
        }
    });
    return actions;
}
function resolveToolbarDialogAddons(col, keys, lookup) {
    var actions = [];
    keys.forEach(function (key) {
        if (lookup.hasOwnProperty(key)) {
            actions.push(lookup[key]);
        }
        else {
            console.warn("cannot find toolbar dialog addon of type: \"" + col.desc.type + "\" with key \"" + key + "\"");
        }
    });
    return actions;
}
export function defaultOptions() {
    return {
        toolbarActions: toolbarActions,
        toolbarDialogAddons: toolbarDialogAddons,
        resolveToolbarActions: resolveToolbarActions,
        resolveToolbarDialogAddons: resolveToolbarDialogAddons,
        renderers: Object.assign({}, renderers),
        canRender: function () { return true; },
        labelRotation: 0,
        summaryHeader: true,
        animated: true,
        expandLineOnHover: false,
        sidePanel: true,
        sidePanelCollapsed: false,
        hierarchyIndicator: true,
        defaultSlopeGraphMode: 'item',
        overviewMode: false,
        livePreviews: {
            search: true,
            filter: true,
            vis: true,
            sort: true,
            group: true,
            groupSort: true,
            colorMapping: true,
        },
        onDialogBackgroundClick: 'cancel',
        rowHeight: 18,
        groupHeight: 40,
        groupPadding: 5,
        rowPadding: 2,
        levelOfDetail: function () { return 'high'; },
        customRowUpdate: function () { return undefined; },
        dynamicHeight: function () { return null; },
        flags: {
            disableFrozenColumns: true,
            advancedRankingFeatures: true,
            advancedModelFeatures: true,
            advancedUIFeatures: true,
        },
        ignoreUnsupportedBrowser: false,
    };
}
//# sourceMappingURL=config.js.map