import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class UtilService {
    destroySubscription(s: Subscription | Subscription[]): number {
        if (this.isNullOrUndefined(s)) {
            return;
        }

        const arr = this.mapToArray<Subscription>(s);
        let numberOfSubscriptionsRemained = 0;
        for (const subs of arr) {
            if (this.isNullOrUndefined(s) ||
                !this.isSubscription(subs)) {
                numberOfSubscriptionsRemained++;
                continue;
            }

            subs.unsubscribe();
        }

        return numberOfSubscriptionsRemained;
    }

    cloneObjectWithoutProps<T>(value: Object, omitProps: string | string[] = []): T {
        if (this.isNullOrUndefined(value) ||
            !this.isObject(value)) {
            return;
        }

        const oProps = this.mapToArray<string>(omitProps);
        const retVal = {};
        for (const key in value) {
            if (oProps.indexOf(key) !== -1) {
                continue;
            }

            retVal[key] = value[key];
        }

        return retVal as T;
    }

    isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined;
    }

    mapToArray<T>(value: any): T[] {
        if (Array.isArray(value)) {
            return value as T[];
        }

        return [value];
    }

    isSubscription(subs: any): boolean {
        return subs && subs.unsubscribe && this.isInstanceOf(Subscription, subs);
    }

    isFunction(f: any): boolean {
        return this.isInstanceOf(Function, f);
    }

    isObject(subs: any): boolean {
        return this.isInstanceOf(Object, subs);
    }

    isInstanceOf(typeClass: any, value: any): boolean {
        return value instanceof typeClass;
    }

    getId() {
        return this.getFourRandomChars() + this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + this.getFourRandomChars() + this.getFourRandomChars();
    }

    private getFourRandomChars() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
