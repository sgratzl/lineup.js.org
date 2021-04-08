var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Category, SupportType, toolbar } from './annotations';
import { ECompareValueType } from './interfaces';
import ValueColumn from './ValueColumn';
import { integrateDefaults } from './internal';
/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
export function createSelectionDesc(label) {
    if (label === void 0) { label = 'Selection Checkboxes'; }
    return { type: 'selection', label: label, fixed: true };
}
/**
 * a checkbox column for selections
 */
var SelectionColumn = /** @class */ (function (_super) {
    __extends(SelectionColumn, _super);
    function SelectionColumn(id, desc) {
        return _super.call(this, id, integrateDefaults(desc, {
            width: 20,
        })) || this;
    }
    SelectionColumn_1 = SelectionColumn;
    Object.defineProperty(SelectionColumn.prototype, "frozen", {
        get: function () {
            return this.desc.frozen !== false;
        },
        enumerable: false,
        configurable: true
    });
    SelectionColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([SelectionColumn_1.EVENT_SELECT]);
    };
    SelectionColumn.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    SelectionColumn.prototype.setValue = function (row, value) {
        var old = this.getValue(row);
        if (old === value) {
            return true;
        }
        return this.setImpl(row, value);
    };
    SelectionColumn.prototype.setValues = function (rows, value) {
        if (rows.length === 0) {
            return false;
        }
        if (this.desc.setterAll) {
            this.desc.setterAll(rows, value);
        }
        this.fire(SelectionColumn_1.EVENT_SELECT, rows[0], value, rows);
        return true;
    };
    SelectionColumn.prototype.setImpl = function (row, value) {
        if (this.desc.setter) {
            this.desc.setter(row.i, value);
        }
        this.fire(SelectionColumn_1.EVENT_SELECT, row.i, value);
        return true;
    };
    SelectionColumn.prototype.toggleValue = function (row) {
        var old = this.getValue(row);
        this.setImpl(row, !old);
        return !old;
    };
    SelectionColumn.prototype.toCompareValue = function (row) {
        var v = this.getValue(row) === true;
        return v ? 1 : 0;
    };
    SelectionColumn.prototype.toCompareValueType = function () {
        return ECompareValueType.BINARY;
    };
    SelectionColumn.prototype.group = function (row) {
        var isSelected = this.getValue(row);
        return Object.assign({}, isSelected ? SelectionColumn_1.SELECTED_GROUP : SelectionColumn_1.NOT_SELECTED_GROUP);
    };
    var SelectionColumn_1;
    SelectionColumn.SELECTED_GROUP = {
        name: 'Selected',
        color: 'orange',
    };
    SelectionColumn.NOT_SELECTED_GROUP = {
        name: 'Unselected',
        color: 'gray',
    };
    SelectionColumn.EVENT_SELECT = 'select';
    SelectionColumn = SelectionColumn_1 = __decorate([
        SupportType(),
        toolbar('sort', 'sortBy', 'group', 'groupBy', 'invertSelection'),
        Category('support')
    ], SelectionColumn);
    return SelectionColumn;
}(ValueColumn));
export default SelectionColumn;
//# sourceMappingURL=SelectionColumn.js.map