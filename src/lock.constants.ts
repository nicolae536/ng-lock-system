export interface Dictionary<T> {
    [index: string]: T;
}

export const LOCK_STATUS = {
    LOCKED: "LOCKED",
    UNLOCKED: "UNLOCKED",
};

export type ComponentsLockMap = Dictionary<{ status: string, lockManager: boolean }>;
