import {useMemo, useRef} from 'react';

export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    } as T;
}

export function useDebounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
) {
    const fnRef = useRef(fn);
    fnRef.current = fn;

    return useMemo(
        () =>
            debounce((...args: Parameters<T>) => {
                fnRef.current(...args);
            }, delay),
        [delay]
    );
}