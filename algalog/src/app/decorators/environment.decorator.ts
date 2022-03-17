import { environment } from "src/environments/environment";

export function Environment(atribute: string) {
    return (target: any, key: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
        descriptor.value = environment[atribute];
        Object.defineProperty(target, key, descriptor);
    };
}
