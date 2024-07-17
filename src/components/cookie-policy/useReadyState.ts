import { EffectCallback, useEffect } from "react";

type ExpectedReadyState = ReadonlyArray<DocumentReadyState> | DocumentReadyState | undefined;

export const isReadyStateMatch = (expected?: ExpectedReadyState): boolean => {
    if (!expected) {
        return true;
    }
    if (("string" === typeof expected) && document.readyState === expected) {
        return true;
    }
    return expected.indexOf(document.readyState) !== -1;
};

export type useReadyStateEffect = (
    effect: EffectCallback,
    deps?: any[],
    onState?: ExpectedReadyState
) => void;

export const useReadyStateEffect: useReadyStateEffect = (
    effect,
    deps = [],
    onState = "complete"
): void => {
    useEffect(() => {
        const destructors: Array<() => void> = [
            () => document.removeEventListener("readystatechange", listener),
        ];

        const listener = () => {
            if (!isReadyStateMatch(onState)) {
                return;
            }
            const destructor = effect();
            if (destructor) {
                destructors.push(destructor);
            }
        };

        listener();
        document.addEventListener("readystatechange", listener);

        return () => destructors.forEach((d) => d());
    }, deps);
};
