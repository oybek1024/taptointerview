export const replacePathParams = (
    path: string,
    params: Record<string, string | number>
): string => {
    return path.replace(
        /:(\w+)/g,
        (_, key) => params[key]?.toString() || `:${key}`
    );
};

export function formatUSPhone(value: string): string {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Ensure it starts with "1" for +1
    const country = "+1";
    let rest = digits.startsWith("1") ? digits.slice(1) : digits;

    // Limit to 10 digits max (US number)
    rest = rest.slice(0, 10);

    const area = rest.slice(0, 3);
    const prefix = rest.slice(3, 6);
    const line = rest.slice(6, 10);

    if (rest.length > 6) {
        return `${country} (${area}) ${prefix}-${line}`;
    } else if (rest.length > 3) {
        return `${country} (${area}) ${prefix}`;
    } else if (rest.length > 0) {
        return `${country} (${area}`;
    }

    return country;
}
