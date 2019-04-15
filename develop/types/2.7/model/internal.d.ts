import Column, { IOrderedGroup } from '.';
/**
 * unify the parents of the given groups by reusing the same group parent if possible
 * @param groups
 */
export declare function unifyParents<T extends IOrderedGroup>(groups: T[]): T[];
export declare function getAllToolbarActions(col: Column): string[];
export declare function getAllToolbarDialogAddons(col: Column, key: string): string[];
