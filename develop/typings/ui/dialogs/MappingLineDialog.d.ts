export declare class MappingLine {
    domain: number;
    range: number;
    private readonly adapter;
    readonly node: SVGGElement;
    private readonly $select;
    constructor(g: SVGGElement, domain: number, range: number, adapter: IMappingAdapter);
    readonly frozen: boolean;
    destroy(): void;
    update(domain: number, range: number): void;
}
