import {useLocation, useNavigate, useParams} from "react-router";
import {_routes as routes, findRouteByPath, findRoutePath} from "@/router";
import {replacePathParams} from "@/utils";
import qs from "qs";


interface ActionProps {
    params?: Record<string, string | number>;
    query?: any;
    state?: any;
}

type QueryValue = string | number | undefined;

type ParamsOut<T> =
    T extends string
        ? Readonly<Partial<Record<T, string>>>
        : Readonly<T>;


export const useRouter = <T extends string | Record<string, string | undefined> = string>() => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const params = useParams() as ParamsOut<T>;

    const push = (id: string, props: ActionProps = {}) => {
        const {params, query, state} = props;
        let path = findRoutePath(id);
        path = path === "" ? "/" : path;
        const parsedPath = params ? replacePathParams(path, params) : path;
        const qsString = query
            ? `?${qs.stringify(query, {encodeValuesOnly: true})}`
            : undefined;
        const route = parsedPath + (qsString || "");
        navigate(route, {state: {...state, routeId: id}});
    }

    const replace = (props: ActionProps = {}) => {
        const {query} = props;
        const qsString = query
            ? qs.stringify(query, {encodeValuesOnly: true})
            : "";
        navigate(pathname + `?${qsString}`, {replace: true});
    };

    const queryParser = function (query: string): Record<string, QueryValue> {
        const params = new URLSearchParams(query);
        const result: Record<string, QueryValue> = {};

        params.forEach((value, key) => {
            result[key] = value;
        });

        return result;
    }

    const prev = () => navigate(-1)

    const currentRoute = findRouteByPath(routes, pathname)!


    return {
        push,
        replace,
        prev,
        params,
        queryParser,
        currentRoute
    }

}