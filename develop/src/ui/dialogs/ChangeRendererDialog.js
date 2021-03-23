import { __extends } from "tslib";
import ADialog from './ADialog';
import { cssClass } from '../../styles';
/** @internal */
var ChangeRendererDialog = /** @class */ (function (_super) {
    __extends(ChangeRendererDialog, _super);
    function ChangeRendererDialog(column, dialog, ctx) {
        var _this = _super.call(this, dialog, {
            livePreview: 'vis',
        }) || this;
        _this.column = column;
        _this.ctx = ctx;
        _this.before = {
            renderer: column.getRenderer(),
            group: column.getGroupRenderer(),
            summary: column.getSummaryRenderer(),
        };
        return _this;
    }
    ChangeRendererDialog.prototype.build = function (node) {
        var current = this.column.getRenderer();
        var currentGroup = this.column.getGroupRenderer();
        var currentSummary = this.column.getSummaryRenderer();
        var _a = this.ctx.getPossibleRenderer(this.column), item = _a.item, group = _a.group, summary = _a.summary;
        console.assert(item.length > 1 || group.length > 1 || summary.length > 1); // otherwise no need to show this
        var byName = function (a, b) { return a.label.localeCompare(b.label); };
        node.insertAdjacentHTML('beforeend', "\n      <strong>Item Visualization</strong>\n      " + item
            .sort(byName)
            .map(function (d) {
            return " <label class=\"" + cssClass('checkbox') + "\"><input type=\"radio\" name=\"renderer\" value=\"" + d.type + "\" " + (current === d.type ? 'checked' : '') + "><span>" + d.label + "</span></label>";
        })
            .join('') + "\n      <strong>Group Visualization</strong>\n      " + group
            .sort(byName)
            .map(function (d) {
            return " <label class=\"" + cssClass('checkbox') + "\"><input type=\"radio\" name=\"group\" value=\"" + d.type + "\" " + (currentGroup === d.type ? 'checked' : '') + "><span>" + d.label + "</span></label>";
        })
            .join('') + "\n      <strong>Summary Visualization</strong>\n      " + summary
            .sort(byName)
            .map(function (d) {
            return " <label class=\"" + cssClass('checkbox') + "\"><input type=\"radio\" name=\"summary\" value=\"" + d.type + "\" " + (currentSummary === d.type ? 'checked' : '') + "><span>" + d.label + "</span></label>";
        })
            .join('') + "\n    ");
        this.enableLivePreviews('input[type=radio]');
    };
    ChangeRendererDialog.prototype.cancel = function () {
        this.column.setRenderer(this.before.renderer);
        this.column.setGroupRenderer(this.before.group);
        this.column.setSummaryRenderer(this.before.summary);
    };
    ChangeRendererDialog.prototype.reset = function () {
        var desc = this.column.desc;
        var r = this.findInput("input[name=renderer][value=\"" + (desc.renderer || desc.type) + "\"]");
        if (r) {
            r.checked = true;
        }
        var g = this.findInput("input[name=group][value=\"" + (desc.groupRenderer || desc.type) + "\"]");
        if (g) {
            g.checked = true;
        }
        var s = this.findInput("input[name=summary][value=\"" + (desc.summaryRenderer || desc.type) + "\"]");
        if (s) {
            s.checked = true;
        }
    };
    ChangeRendererDialog.prototype.submit = function () {
        var renderer = this.findInput('input[name=renderer]:checked').value;
        var group = this.findInput('input[name=group]:checked').value;
        var summary = this.findInput('input[name=summary]:checked').value;
        this.column.setRenderer(renderer);
        this.column.setGroupRenderer(group);
        this.column.setSummaryRenderer(summary);
        return true;
    };
    return ChangeRendererDialog;
}(ADialog));
export default ChangeRendererDialog;
//# sourceMappingURL=ChangeRendererDialog.js.map