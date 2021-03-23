import { round, getNumberOfBins } from '../../internal';
import { forEach } from '../../renderer/utils';
import { cssClass } from '../../styles';
/** @internal */
export default function groupNumber(col, node, dialog) {
    var domain = col.getMapping().domain;
    var before = col.getGroupThresholds();
    var isThreshold = before.length <= 1;
    var ranking = col.findMyRanker();
    node.insertAdjacentHTML('beforeend', "\n    <label class=\"" + cssClass('checkbox') + "\">\n      <input type=\"radio\" name=\"threshold\" value=\"threshold\" " + (isThreshold ? 'checked' : '') + ">\n      <span>at&nbsp;<input type=\"number\" size=\"10\" id=\"" + dialog.idPrefix + "N1\" value=\"" + (before.length > 0 ? before[0] : round((domain[1] - domain[0]) / 2, 2)) + "\"\n          required min=\"" + domain[0] + "\" max=\"" + domain[1] + "\" step=\"any\" " + (!isThreshold ? 'disabled' : '') + ">\n      </span>\n    </label>\n    <label class=\"" + cssClass('checkbox') + "\">\n      <input type=\"radio\" name=\"threshold\" value=\"bins\" " + (!isThreshold ? 'checked' : '') + ">\n      <span> in&nbsp;<input type=\"number\" size=\"5\" id=\"" + dialog.idPrefix + "N2\" value=\"" + (before.length > 1 ? before.length : getNumberOfBins(ranking.getOrderLength())) + "\"\n          required min=\"2\" step=\"1\" " + (isThreshold ? 'disabled' : '') + ">&nbsp;bins\n      </span>\n    </label>\n  ");
    var threshold = node.querySelector("#" + dialog.idPrefix + "N1");
    var bins = node.querySelector("#" + dialog.idPrefix + "N2");
    forEach(node, 'input[name=threshold]', function (d) {
        d.addEventListener('change', function () {
            var isThreshold = d.value === 'threshold';
            threshold.disabled = !isThreshold;
            bins.disabled = isThreshold;
        }, { passive: true });
    });
    return {
        elems: "input[name=threshold], #" + dialog.idPrefix + "N1, #" + dialog.idPrefix + "N2",
        submit: function () {
            var isThreshold = node.querySelector('input[name=threshold]:checked').value === 'threshold';
            if (isThreshold) {
                col.setGroupThresholds([threshold.valueAsNumber]);
                return true;
            }
            var count = Number.parseInt(bins.value, 10);
            var delta = (domain[1] - domain[0]) / count;
            var act = domain[0] + delta;
            var thresholds = [act];
            for (var i = 1; i < count - 1; ++i) {
                act += delta;
                thresholds.push(act);
            }
            col.setGroupThresholds(thresholds);
            return true;
        },
        cancel: function () {
            col.setGroupThresholds(before);
        },
        reset: function () {
            var value = round((domain[1] - domain[0]) / 2, 2);
            threshold.value = value.toString();
            threshold.disabled = false;
            bins.value = getNumberOfBins(ranking.getOrderLength()).toString();
            bins.disabled = true;
            node.querySelector('input[name=threshold][value=threshold]').checked = true;
        },
    };
}
//# sourceMappingURL=groupNumber.js.map