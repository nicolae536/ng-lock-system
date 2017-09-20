export interface Dictionary<T> {
    [index: string]: T;
}
export declare const LOCK_STATUS: {
    LOCKED: string;
    UNLOCKED: string;
};
export declare type ComponentsLockMap = Dictionary<{
    status: string;
    lockManager: boolean;
}>;
