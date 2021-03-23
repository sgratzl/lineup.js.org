import { GUESSES_GROUP_HEIGHT } from '../constants';
import { concatSeq, round } from '../internal';
import { DEFAULT_COLOR, isNumberColumn, isNumbersColumn, } from '../model';
import { CANVAS_HEIGHT, DOT, cssClass } from '../styles';
import { colorOf } from './impose';
import { ERenderMode, } from './interfaces';
import { renderMissingCanvas, renderMissingDOM } from './missing';
import { noRenderer } from './utils';
var DotCellRenderer = /** @class */ (function () {
    function DotCellRenderer() {
        this.title = 'Dot';
        this.groupTitle = 'Dots';
    }
    DotCellRenderer.prototype.canRender = function (col, mode) {
        return isNumberColumn(col) && mode !== ERenderMode.SUMMARY;
    };
    DotCellRenderer.getCanvasRenderer = function (col, context) {
        var width = context.colWidth(col);
        var pi2 = Math.PI * 2;
        var radius = DOT.size / 2;
        var render = function (ctx, vs, width) {
            ctx.save();
            ctx.globalAlpha = DOT.opacity;
            for (var _i = 0, vs_1 = vs; _i < vs_1.length; _i++) {
                var v = vs_1[_i];
                ctx.fillStyle = v.color || DOT.color;
                var x = Math.min(width - radius, Math.max(radius, v.value * width));
                var y = round(Math.random() * (GUESSES_GROUP_HEIGHT - DOT.size) + radius, 2);
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.arc(x, y, radius, 0, pi2, true);
                ctx.fill();
            }
            ctx.restore();
        };
        return {
            template: "<canvas height=\"" + GUESSES_GROUP_HEIGHT + "\"></canvas>",
            render: render,
            width: width,
        };
    };
    DotCellRenderer.getDOMRenderer = function (col) {
        var dots = isNumbersColumn(col) ? col.dataLength : 1;
        var tmp = '';
        for (var i = 0; i < dots; ++i) {
            tmp += "<div style='background-color: " + DEFAULT_COLOR + "' title=''></div>";
        }
        var update = function (n, data) {
            //adapt the number of children
            var l = data.length;
            if (n.children.length !== l) {
                n.innerHTML = data.reduce(function (tmp, r) {
                    return tmp + "<div style='background-color: " + r.color + "' title='" + r.label + "'></div>";
                }, '');
            }
            var children = n.children;
            data.forEach(function (v, i) {
                var d = children[i];
                d.title = v.label;
                d.style.display = Number.isNaN(v.value) ? 'none' : null;
                d.style.left = round(v.value * 100, 2) + "%";
                // jitter
                d.style.top = l > 1 ? round(Math.random() * 80 + 10, 2) + "%" : null;
                d.style.backgroundColor = v.color;
            });
        };
        var render = function (ctx, vs, colors, width) {
            ctx.save();
            ctx.globalAlpha = DOT.opacity;
            vs.forEach(function (v, i) {
                ctx.fillStyle = colors[i] || DOT.color;
                ctx.fillRect(Math.max(0, v * width - DOT.size / 2), 0, DOT.size, CANVAS_HEIGHT);
            });
            ctx.restore();
        };
        return { template: "<div>" + tmp + "</div>", update: update, render: render };
    };
    DotCellRenderer.prototype.create = function (col, context, imposer) {
        var _a = DotCellRenderer.getDOMRenderer(col), template = _a.template, render = _a.render, update = _a.update;
        var width = context.colWidth(col);
        var formatter = col.getNumberFormat();
        return {
            template: template,
            update: function (n, d) {
                if (renderMissingDOM(n, col, d)) {
                    return;
                }
                var color = colorOf(col, d, imposer);
                if (!isNumbersColumn(col)) {
                    var v = col.getNumber(d);
                    return update(n, [{ value: v, label: col.getLabel(d), color: color }]);
                }
                var data = col
                    .getNumbers(d)
                    .filter(function (vi) { return !Number.isNaN(vi); })
                    .map(function (value) { return ({ value: value, label: formatter(value), color: color }); });
                return update(n, data);
            },
            render: function (ctx, d) {
                if (renderMissingCanvas(ctx, col, d, width)) {
                    return;
                }
                var color = colorOf(col, d, imposer);
                if (!isNumbersColumn(col)) {
                    var v = col.getNumber(d);
                    return render(ctx, [v], [color], width);
                }
                var vs = col.getNumbers(d).filter(function (vi) { return !Number.isNaN(vi); });
                return render(ctx, vs, vs.map(function (_) { return color; }), width);
            },
        };
    };
    DotCellRenderer.prototype.createGroup = function (col, context, imposer) {
        var _a = DotCellRenderer.getCanvasRenderer(col, context), template = _a.template, render = _a.render, width = _a.width;
        return {
            template: template,
            update: function (n, group) {
                return context.tasks
                    .groupRows(col, group, 'dot', function (rows) {
                    //value, color, label,
                    if (!isNumbersColumn(col)) {
                        return Array.from(rows.map(function (r) { return ({ value: col.getNumber(r), color: colorOf(col, r, imposer) }); }));
                    }
                    // concatenate all columns
                    var vs = rows.map(function (r) {
                        var color = colorOf(col, r, imposer);
                        return col
                            .getNumbers(r)
                            .filter(function (vi) { return !Number.isNaN(vi); })
                            .map(function (value) { return ({ value: value, color: color }); });
                    });
                    return Array.from(concatSeq(vs));
                })
                    .then(function (data) {
                    if (typeof data === 'symbol') {
                        return;
                    }
                    var isMissing = !data || data.length === 0 || data.every(function (v) { return Number.isNaN(v.value); });
                    n.classList.toggle(cssClass('missing'), isMissing);
                    if (isMissing) {
                        return;
                    }
                    var ctx = n.getContext('2d');
                    ctx.canvas.width = width;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    render(ctx, data, width);
                });
            },
        };
    };
    DotCellRenderer.prototype.createSummary = function () {
        return noRenderer;
    };
    return DotCellRenderer;
}());
export default DotCellRenderer;
//# sourceMappingURL=DotCellRenderer.js.map