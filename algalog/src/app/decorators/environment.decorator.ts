import { environment } from "environments/environment";

export function Environment(atribute: any) {
    console.log(environment);
    return (target: any, key: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
        console.log("🚀 ~ file: environment.decorator.ts ~ line 7 ~ return ~ descriptor", descriptor)
       descriptor.value = environment[atribute];
        Object.defineProperty(target, key, descriptor);
    };
}
