import { Subscription } from "rxjs/Subscription";
export declare class UtilService {
    destroySubscription(s: Subscription | Subscription[]): number;
    cloneObjectWithoutProps<T>(value: Object, omitProps?: string | string[]): T;
    isNullOrUndefined(value: any): boolean;
    mapToArray<T>(value: any): T[];
    isSubscription(subs: any): boolean;
    isObject(subs: any): boolean;
    isInstanceOf(typeClass: any, value: any): boolean;
    getId(): string;
    private getFourRandomChars();
}
