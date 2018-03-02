import CategoricalColumn from '../model/CategoricalColumn';
import OrdinalColumn from '../model/OrdinalColumn';
export declare function interactiveHist(col: CategoricalColumn | OrdinalColumn, node: HTMLElement): (missing: number, actCol: CategoricalColumn | OrdinalColumn) => void;
