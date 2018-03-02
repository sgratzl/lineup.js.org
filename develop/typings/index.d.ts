import './style.scss';
import { IColumnDesc } from './model';
import { ILocalDataProviderOptions } from './provider';
import ADataProvider from './provider/ADataProvider';
import LocalDataProvider from './provider/LocalDataProvider';
import LineUp, { ILineUpOptions } from './ui/LineUp';
import Taggle, { ITaggleOptions } from './ui/taggle';
export * from './provider';
export * from './renderer';
export * from './model';
export * from './builder';
export * from './ui/';
export * from './interfaces';
export { default } from './ui/LineUp';
export declare const version: string;
export declare const buildId: string;
export declare const license: string;
export declare function createLocalDataProvider(data: any[], columns: IColumnDesc[], options?: Partial<ILocalDataProviderOptions>): LocalDataProvider;
export declare function createLineUp(container: HTMLElement, data: ADataProvider, config?: Partial<ILineUpOptions>): LineUp;
export declare function createTaggle(container: HTMLElement, data: ADataProvider, config?: Partial<ITaggleOptions>): Taggle;
