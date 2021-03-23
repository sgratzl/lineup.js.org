import * as equalImpl from 'fast-deep-equal';
// keep here to have a "real" export for webpack not just interfaces
/**
 * deep equal comparison
 */
export var equal = typeof equalImpl === 'function' ? equalImpl : equalImpl.default;
//# sourceMappingURL=mathInterfaces.js.map