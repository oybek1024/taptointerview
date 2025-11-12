import {_routes as routes} from "@/router";
import type {RouteObject} from "react-router";

export const findRoutePath = (
    id: string,
    list?: RouteObject[],
    parentPath: string = "",
): string => {
    if (!list) {
        list = routes
    }
    for (const route of list) {
        const path = route.path || ""
        const isLayout = route.children && route.children.length > 0
        let fullPath = parentPath

        if (!route.index) {
            fullPath = parentPath + (isLayout ? path : `/${path}`)
        }

        if (route.id === id) {
            return fullPath;
        }

        if (route.children) {
            const childPath = findRoutePath(id, route.children, fullPath);
            if (childPath) return childPath;
        }
    }
    return "";
};

const normalize = (p: string) =>
    (p.startsWith("/") ? p : "/" + p).replace(/\/+$/, "") || "/"

const joinPaths = (base: string, seg?: string) => {
    if (!seg) return base || "/"
    const out = (base ? base.replace(/\/+$/, "") : "") + "/" + seg.replace(/^\/+/, "")
    return normalize(out)
}

const pathToRegex = (fullPath: string) => {
    // replace :id with [^/]+ and allow optional trailing slash
    const pattern = "^" + fullPath.replace(/:[^/]+/g, "[^/]+") + "/?$"
    return new RegExp(pattern)
}

export function findRouteByPath(
    routes: RouteObject[],
    pathname: string,
    base: string = ""
): RouteObject | undefined {
    const currentPath = normalize(pathname)

    for (const route of routes) {
        const full = route.path ? joinPaths(base, route.path) : base || "/"

        // index route: matches exactly the parent path
        if (route.index) {
            if (currentPath === normalize(base)) return route
            // keep searching siblings; no "continue" because index is a separate match
        }

        // match this route if it has a path
        if (route.path) {
            const rx = pathToRegex(full)
            if (rx.test(currentPath)) return route
        }

        // try children with updated base
        if (route.children?.length) {
            const hit = findRouteByPath(route.children, pathname, full)
            if (hit) return hit
        }
    }
    return undefined
}