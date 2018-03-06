import { INumberBin } from '../internal/math';
import { INumberColumn } from '../model/INumberColumn';
import { IImposer } from './interfaces';
export declare function getHistDOMRenderer(totalNumberOfRows: number, col: INumberColumn, imposer?: IImposer): {
    template: string;
    render: (n: HTMLElement, stats: {
        bins: number;
        max: number;
        hist: INumberBin[];
    }) => void;
    guessedBins: number;
};
