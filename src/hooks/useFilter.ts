import {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';

type FiltersAction<T> =
    | { type: 'ALL'; value: T }
    | { type: 'SET'; key: keyof T; value: T[keyof T] }
    | { type: 'RESET' };

const isEmptyDeep = (v: unknown): boolean => {
    if (v === undefined || v === null) return true;
    if (typeof v === 'string') return v.trim() === '';

    if (Array.isArray(v)) {
        return v.length === 0 || v.every(isEmptyDeep);
    }

    if (typeof v === 'object') {
        const vals = Object.values(v as Record<string, unknown>);
        return vals.length === 0 || vals.every(isEmptyDeep);
    }

    return false;
};

function filtersReducer<T extends Record<string, any>>(
    state: T,
    action: FiltersAction<T>
): T {
    switch (action.type) {
        case 'ALL':
            return action.value;
        case 'SET':
            return {...state, [action.key]: action.value};
        case 'RESET':
            return Object.keys(state).reduce((acc, key) => {
                acc[key as keyof T] = undefined as T[keyof T];
                return acc;
            }, {} as T);
        default:
            return state;
    }
}

export function useFilter<T extends Record<string, any>>(
    initialFilters: T,
    onChange?: (action: FiltersAction<T>, filters: T) => void
) {
    const [filters, rawDispatch] = useReducer(filtersReducer<T>, initialFilters);

    const actionRef = useRef<FiltersAction<T> | null>(null);

    const showReset = useMemo(() => {
        return Object.values(filters).some(v => !isEmptyDeep(v));
    }, [filters]);

    const dispatch = useCallback((a: FiltersAction<T>) => {
        actionRef.current = a;
        rawDispatch(a);
    }, []);

    const setAll = (data: T) => {
        dispatch({type: 'ALL', value: data});
    };

    const setFilter = (key: string, value: any) =>
        dispatch({type: 'SET', key, value});

    const resetFilters = () => dispatch({type: 'RESET'});

    useEffect(() => {
        if (actionRef.current && onChange) {
            onChange(actionRef.current, filters);
        }
    }, [filters, onChange]);

    return {filters, setFilter, setAll, resetFilters, showReset};
}