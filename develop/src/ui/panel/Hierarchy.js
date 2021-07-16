import { clear } from '../../internal';
import { categoryOf, isSortingAscByDefault, isSupportType } from '../../model';
import { aria, cssClass } from '../../styles';
import AddonDialog from '../dialogs/AddonDialog';
import { actionCSSClass, updateHeader } from '../header';
import { getToolbarDialogAddons, isGroupAble, isGroupSortAble, isSortAble } from '../toolbarResolvers';
import SearchBox from './SearchBox';
import { dialogContext } from '../dialogs';
/**
 * @internal
 */
var Hierarchy = /** @class */ (function () {
    function Hierarchy(ctx, document) {
        this.ctx = ctx;
        this.node = document.createElement('aside');
        this.node.classList.add(cssClass('hierarchy'), cssClass('feature-advanced'), cssClass('feature-ranking'));
        this.node.innerHTML = "\n      <section class=\"" + cssClass('group-hierarchy') + "\">\n      </section>\n      <section class=\"" + cssClass('sort-hierarchy') + "\">\n      </section>\n      <section class=\"" + cssClass('sort-groups-hierarchy') + "\">\n      </section>\n    ";
        var options = {
            doc: document,
            placeholder: 'Add Sort Criteria...',
            formatItem: function (item, node) {
                node.classList.add(cssClass('typed-icon'));
                node.dataset.typeCat = categoryOf(item.col).name;
                node.dataset.type = item.col.desc.type;
                var summary = item.col.getMetaData().summary || item.col.description;
                node.classList.toggle(cssClass('searchbox-summary-entry'), Boolean(summary));
                if (summary) {
                    var label = node.ownerDocument.createElement('span');
                    label.textContent = summary;
                    node.appendChild(label);
                    var desc = node.ownerDocument.createElement('span');
                    desc.textContent = summary;
                    node.appendChild(desc);
                    return undefined;
                }
                return item.text;
            },
        };
        this.groupAdder = new SearchBox(Object.assign({}, options, {
            placeholder: 'Add Grouping Criteria...',
        }));
        this.groupSortAdder = new SearchBox(Object.assign({}, options, {
            placeholder: 'Add Grouping Sort Criteria...',
        }));
        this.sortAdder = new SearchBox(options);
    }
    Hierarchy.prototype.update = function (ranking) {
        if (!ranking) {
            this.node.style.display = 'none';
            return;
        }
        this.node.style.display = null;
        this.renderGroups(ranking, this.node.firstElementChild);
        this.renderSorting(ranking, this.node.children[1]);
        this.renderGroupSorting(ranking, this.node.lastElementChild);
    };
    Hierarchy.prototype.render = function (node, items, toColumn, extras, addonKey, onChange) {
        var _this = this;
        var cache = new Map(Array.from(node.children).map(function (d) { return [d.dataset.id, d]; }));
        clear(node);
        items.forEach(function (d) {
            var col = toColumn(d);
            var item = cache.get(col.id);
            if (item) {
                node.appendChild(item);
                updateHeader(item, col, 0);
                return;
            }
            var addons = getToolbarDialogAddons(col, addonKey, _this.ctx);
            node.insertAdjacentHTML('beforeend', "<div data-id=\"" + col.id + "\" class=\"" + cssClass('toolbar') + " " + cssClass('hierarchy-entry') + "\">\n      <div class=\"" + cssClass('label') + " " + cssClass('typed-icon') + "\">" + col.label + "</div>\n      " + (addons.length > 0 ? "<i title=\"Customize\" class=\"" + actionCSSClass('customize') + "\">" + aria('Customize') + "</i>" : '') + "\n      <i title=\"Move Up\" class=\"" + actionCSSClass('Move Up') + "\">" + aria('Move Up') + "</i>\n      <i title=\"Move Down\" class=\"" + actionCSSClass('Move Down') + "\">" + aria('Move Down') + "</i>\n      <i title=\"Remove from hierarchy\" class=\"" + actionCSSClass('Remove') + "\">" + aria('Remove from hierarchy') + "</i>\n      </div>");
            var last = node.lastElementChild;
            function prevent(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            last.querySelector('i[title="Move Down"]').onclick = function (evt) {
                prevent(evt);
                onChange(d, +1);
            };
            last.querySelector('i[title="Move Up"]').onclick = function (evt) {
                prevent(evt);
                onChange(d, -1);
            };
            last.querySelector('i[title^=Remove]').onclick = function (evt) {
                prevent(evt);
                onChange(d, 0);
            };
            if (addons.length > 0) {
                last.querySelector('i[title=Customize]').onclick = function (evt) {
                    prevent(evt);
                    _this.customize(col, addons, evt);
                };
            }
            extras(d, last);
            updateHeader(last, col, 0);
        });
    };
    Hierarchy.prototype.renderGroups = function (ranking, node) {
        var groups = ranking.getGroupCriteria();
        if (groups.length === 0) {
            clear(node);
            return;
        }
        var click = function (col, delta) {
            if (delta === 0) {
                col.groupByMe();
                return;
            }
            var current = col.isGroupedBy();
            col.findMyRanker().groupBy(col, current + delta);
        };
        var addButton = function (_, last) {
            last.insertAdjacentHTML('afterbegin', "<i title=\"Group\" class=\"" + actionCSSClass('group') + "\" data-group=\"true\">" + aria('Group') + "</i>");
        };
        this.render(node, groups, function (d) { return d; }, addButton, 'group', click);
        this.addGroupAdder(ranking, groups, node);
    };
    Hierarchy.prototype.renderSorting = function (ranking, node) {
        var sortCriterias = ranking.getSortCriteria();
        if (sortCriterias.length === 0) {
            clear(node);
            return;
        }
        var click = function (_a, delta) {
            var col = _a.col;
            var current = col.isSortedByMe();
            if (!isFinite(delta)) {
                col.sortByMe(current.asc === 'desc', current.priority);
                return;
            }
            if (delta === 0) {
                col.sortByMe(current.asc === 'asc', -1);
                return;
            }
            col.sortByMe(current.asc === 'asc', current.priority + delta);
        };
        var addButton = function (s, last) {
            last.insertAdjacentHTML('afterbegin', "\n      <i title=\"Sort\" class=\"" + actionCSSClass('sort') + "\" data-sort=\"" + (s.asc ? 'asc' : 'desc') + "\">" + aria('Toggle Sorting') + "</i>");
            last.querySelector('i[title=Sort]').onclick = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                click(s, Number.POSITIVE_INFINITY);
            };
        };
        this.render(node, sortCriterias, function (d) { return d.col; }, addButton, 'sort', click);
        this.addSortAdder(ranking, sortCriterias, node);
    };
    Hierarchy.prototype.renderGroupSorting = function (ranking, node) {
        var sortCriterias = ranking.getGroupSortCriteria();
        if (sortCriterias.length === 0) {
            clear(node);
            return;
        }
        var click = function (_a, delta) {
            var col = _a.col;
            var current = col.isGroupSortedByMe();
            if (!isFinite(delta)) {
                col.groupSortByMe(current.asc === 'desc', current.priority);
                return;
            }
            if (delta === 0) {
                col.groupSortByMe(current.asc === 'asc', -1);
                return;
            }
            col.groupSortByMe(current.asc === 'asc', current.priority + delta);
        };
        var addButton = function (s, last) {
            last.insertAdjacentHTML('afterbegin', "\n      <i title=\"Sort Group\" class=\"" + actionCSSClass('sort-groups') + "\" data-sort=\"" + (s.asc ? 'asc' : 'desc') + "\">" + aria('Toggle Sorting') + "</i>");
            last.querySelector('i[title="Sort Group"]').onclick = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                click(s, Number.POSITIVE_INFINITY);
            };
        };
        this.render(node, sortCriterias, function (d) { return d.col; }, addButton, 'sortGroup', click);
        this.addGroupSortAdder(ranking, sortCriterias, node);
    };
    Hierarchy.prototype.addAdder = function (adder, ranking, addonKey, current, node, check, onSelect) {
        var _this = this;
        var used = new Set(current);
        adder.data = ranking.children
            .filter(function (col) { return !isSupportType(col) && !used.has(col) && check(col); })
            .map(function (col) { return ({ col: col, id: col.id, text: col.label }); });
        adder.on(SearchBox.EVENT_SELECT, function (item) {
            var addons = getToolbarDialogAddons(item.col, addonKey, _this.ctx);
            if (addons.length > 0) {
                _this.customize(item.col, addons, adder.node, function () { return onSelect(item.col); });
            }
            else {
                onSelect(item.col);
            }
        });
        if (adder.data.length <= 0) {
            return;
        }
        var wrapper = node.ownerDocument.createElement('footer');
        wrapper.appendChild(adder.node);
        wrapper.classList.add(cssClass('hierarchy-adder'));
        node.appendChild(wrapper);
    };
    Hierarchy.prototype.addSortAdder = function (ranking, sortCriterias, node) {
        var _this = this;
        this.addAdder(this.sortAdder, ranking, 'sort', sortCriterias.map(function (d) { return d.col; }), node, function (d) { return isSortAble(d, _this.ctx); }, function (col) {
            ranking.sortBy(col, isSortingAscByDefault(col), sortCriterias.length);
        });
    };
    Hierarchy.prototype.addGroupAdder = function (ranking, groups, node) {
        var _this = this;
        this.addAdder(this.groupAdder, ranking, 'group', groups, node, function (d) { return isGroupAble(d, _this.ctx); }, function (col) {
            ranking.groupBy(col, groups.length);
        });
    };
    Hierarchy.prototype.addGroupSortAdder = function (ranking, sortCriterias, node) {
        var _this = this;
        this.addAdder(this.groupSortAdder, ranking, 'sortGroup', sortCriterias.map(function (d) { return d.col; }), node, function (d) { return isGroupSortAble(d, _this.ctx); }, function (col) {
            ranking.groupSortBy(col, isSortingAscByDefault(col), sortCriterias.length);
        });
    };
    Hierarchy.prototype.customize = function (col, addons, attachment, onClick) {
        var dialog = new AddonDialog(col, addons, dialogContext(this.ctx, 0, attachment), this.ctx, onClick);
        dialog.open();
    };
    return Hierarchy;
}());
export default Hierarchy;
//# sourceMappingURL=Hierarchy.js.map