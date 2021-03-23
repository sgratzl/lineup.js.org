import { AAggregatedGroupRenderer } from './AAggregatedGroupRenderer';
import { ANumbersCellRenderer } from './ANumbersCellRenderer';
import ActionRenderer from './ActionRenderer';
import AggregateGroupRenderer from './AggregateGroupRenderer';
import AnnotationRenderer from './AnnotationRenderer';
import BarCellRenderer from './BarCellRenderer';
import BooleanCellRenderer from './BooleanCellRenderer';
import BoxplotCellRenderer from './BoxplotCellRenderer';
import BrightnessCellRenderer, { toHeatMapColor } from './BrightnessCellRenderer';
import CategoricalCellRenderer from './CategoricalCellRenderer';
import CategoricalHeatmapCellRenderer from './CategoricalHeatmapCellRenderer';
import CategoricalStackedDistributionlCellRenderer from './CategoricalStackedDistributionlCellRenderer';
import CircleCellRenderer from './CircleCellRenderer';
import DateCellRenderer from './DateCellRenderer';
import DateHistogramCellRenderer from './DateHistogramCellRenderer';
import { DefaultCellRenderer } from './DefaultCellRenderer';
import DotCellRenderer from './DotCellRenderer';
import GroupCellRenderer from './GroupCellRenderer';
import HeatmapCellRenderer from './HeatmapCellRenderer';
import HistogramCellRenderer from './HistogramCellRenderer';
import ImageCellRenderer from './ImageCellRenderer';
import InterleavingCellRenderer from './InterleavingCellRenderer';
import LinkCellRenderer from './LinkCellRenderer';
import LinkMapCellRenderer from './LinkMapCellRenderer';
import LoadingCellRenderer from './LoadingCellRenderer';
import MapBarCellRenderer from './MapBarCellRenderer';
import MultiLevelCellRenderer from './MultiLevelCellRenderer';
import RankCellRenderer from './RankCellRenderer';
import SelectionRenderer from './SelectionRenderer';
import SetCellRenderer from './SetCellRenderer';
import SparklineCellRenderer from './SparklineCellRenderer';
import StringCellRenderer from './StringCellRenderer';
import TableCellRenderer from './TableCellRenderer';
import UpSetCellRenderer from './UpSetCellRenderer';
import VerticalBarCellRenderer from './VerticalBarCellRenderer';
import { noRenderer, wideEnough, wideEnoughCat, adaptTextColorToBgColor, adaptDynamicColorToBgColor } from './utils';
export { colorOf } from './impose';
export * from './interfaces';
export { renderMissingCanvas, renderMissingDOM } from './missing';
export var rendererClasses = {
    AAggregatedGroupRenderer: AAggregatedGroupRenderer,
    ANumbersCellRenderer: ANumbersCellRenderer,
    ActionRenderer: ActionRenderer,
    AggregateGroupRenderer: AggregateGroupRenderer,
    AnnotationRenderer: AnnotationRenderer,
    BarCellRenderer: BarCellRenderer,
    BooleanCellRenderer: BooleanCellRenderer,
    BoxplotCellRenderer: BoxplotCellRenderer,
    BrightnessCellRenderer: BrightnessCellRenderer,
    CategoricalCellRenderer: CategoricalCellRenderer,
    CategoricalHeatmapCellRenderer: CategoricalHeatmapCellRenderer,
    CategoricalStackedDistributionlCellRenderer: CategoricalStackedDistributionlCellRenderer,
    CircleCellRenderer: CircleCellRenderer,
    DateCellRenderer: DateCellRenderer,
    DateHistogramCellRenderer: DateHistogramCellRenderer,
    DefaultCellRenderer: DefaultCellRenderer,
    DotCellRenderer: DotCellRenderer,
    GroupCellRenderer: GroupCellRenderer,
    HeatmapCellRenderer: HeatmapCellRenderer,
    HistogramCellRenderer: HistogramCellRenderer,
    ImageCellRenderer: ImageCellRenderer,
    InterleavingCellRenderer: InterleavingCellRenderer,
    LinkCellRenderer: LinkCellRenderer,
    LinkMapCellRenderer: LinkMapCellRenderer,
    LoadingCellRenderer: LoadingCellRenderer,
    MapBarCellRenderer: MapBarCellRenderer,
    MultiLevelCellRenderer: MultiLevelCellRenderer,
    RankCellRenderer: RankCellRenderer,
    SelectionRenderer: SelectionRenderer,
    SetCellRenderer: SetCellRenderer,
    SparklineCellRenderer: SparklineCellRenderer,
    StringCellRenderer: StringCellRenderer,
    TableCellRenderer: TableCellRenderer,
    UpSetCellRenderer: UpSetCellRenderer,
    VerticalBarCellRenderer: VerticalBarCellRenderer,
};
export var rendererUtils = {
    toHeatMapColor: toHeatMapColor,
    noRenderer: noRenderer,
    wideEnough: wideEnough,
    wideEnoughCat: wideEnoughCat,
    adaptTextColorToBgColor: adaptTextColorToBgColor,
    adaptDynamicColorToBgColor: adaptDynamicColorToBgColor,
};
//# sourceMappingURL=index.js.map