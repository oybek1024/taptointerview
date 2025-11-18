import {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';
import {useRouter} from '@/hooks/useRouter';
import qs from 'qs';

type QueryValue =
    | string
    | number
    | string[]
    | number[]
    | QueryObject
    | undefined;

interface QueryObject {
    [key: string]: QueryValue;
}

export const useQuery = <T extends Record<string, QueryValue>>() => {
    const [searchParams] = useSearchParams();
    const {replace} = useRouter();

    const parsedQueries = qs.parse(searchParams.toString()) as T;
    const [queries, setQueries] = useState<T>(parsedQueries);

    useEffect(() => setQueries(parsedQueries), [searchParams]);

    const setQuery = useCallback(
        (updates: Partial<T>, callback?: (queries: T) => void) => {
            const newQuery = {...queries, ...updates} as Record<
                string,
                string | string[]
            >;
            replace({query: newQuery});
            setQueries(newQuery as T);
            callback?.(newQuery as T);
        },
        [replace]
    );

    return {queries, setQuery};
};