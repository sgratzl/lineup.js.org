var styles = new Map();
// {
//   const r = /^[$]([\w]+): ([\w #.()'\/,-]+)( !default)?;/gmi;
//   const s = String(vars);
//   let m: RegExpMatchArray | null = r.exec(s);
//   while (m != null) {
//     styles.set(m[1], m[2]);
//     m = r.exec(s);
//   }
// }
/** @internal */
export default function getStyle(key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    if (key[0] === '$') {
        key = key.slice(1);
    }
    if (styles.has(key)) {
        return styles.get(key);
    }
    return defaultValue;
}
/** @internal */
export var COLUMN_PADDING = Number.parseInt(getStyle('lu_engine_grip_gap', '5px'), 10);
/** @internal */
export var FILTERED_OPACITY = Number.parseFloat(getStyle('lu_filtered_opacity', '0.2'));
/** @internal */
export var DASH = {
    width: Number.parseInt(getStyle('lu_missing_dash_width', '3px'), 10),
    height: Number.parseInt(getStyle('lu_missing_dash_height', '10px'), 10),
    color: getStyle('lu_missing_dash_color', 'gray'),
};
/** @internal */
export var UPSET = {
    color: getStyle('lu_renderer_upset_color'),
    inactive: Number.parseFloat(getStyle('lu_renderer_upset_inactive_opacity', '0.1')),
};
/** @internal */
export var DOT = {
    color: getStyle('lu_renderer_dot_color', 'gray'),
    size: Number.parseInt(getStyle('lu_renderer_dot_size', '5px'), 10),
    opacity: Number.parseFloat(getStyle('lu_renderer_dot_opacity', '0.5')),
};
/** @internal */
export var BOX_PLOT = {
    box: getStyle('lu_renderer_boxplot_box', '#e0e0e0'),
    stroke: getStyle('lu_renderer_boxplot_stroke', 'black'),
    sort: getStyle('lu_renderer_boxplot_sort_indicator', '#ffa500'),
    outlier: getStyle('lu_renderer_boxplot_outlier', '#e0e0e0'),
};
/** @internal */
export var AGGREGATE = {
    width: Number.parseInt(getStyle('lu_aggregate_square_bracket_width', '4px'), 10),
    strokeWidth: Number.parseInt(getStyle('lu_aggregate_square_bracket_stroke_width', '2px'), 10),
    color: getStyle('lu_aggregate_square_bracket_stroke_color', '#000'),
    levelOffset: Number.parseInt(getStyle('lu_aggregate_level_offset', '2px'), 10),
    levelWidth: Number.parseInt(getStyle('lu_aggregate_level_width', '22px'), 10),
};
/** @internal */
export var SLOPEGRAPH_WIDTH = Number.parseInt(getStyle('lu_slope_width', '200px'), 10);
/** @internal */
export var CANVAS_HEIGHT = 4;
/** @internal */
export var CSS_PREFIX = getStyle('lu_css_prefix', 'lu');
/** @internal */
export var ENGINE_CSS_PREFIX = 'le';
/** @internal */
export var RESIZE_SPACE = Number.parseInt(getStyle('lu_engine_resize_space', '50px'), 10);
/** @internal */
export var RESIZE_ANIMATION_DURATION = Number.parseInt(getStyle('lu_engine_resize_animation_duration', '1000ms'), 10);
/** @internal */
export var AGGREGATION_LEVEL_WIDTH = Number.parseInt(getStyle('lu_aggregate_level_width', '22px'), 10);
/** @internal */
export function cssClass(suffix) {
    return suffix ? CSS_PREFIX + "-" + suffix : CSS_PREFIX;
}
/** @internal */
export function engineCssClass(suffix) {
    return suffix ? ENGINE_CSS_PREFIX + "-" + suffix : ENGINE_CSS_PREFIX;
}
/** @internal */
export function aria(text) {
    return "<span class=\"" + cssClass('aria') + "\" aria-hidden=\"true\">" + text + "</span>";
}
//# sourceMappingURL=index.js.map