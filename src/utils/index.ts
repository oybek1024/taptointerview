import type {SelectItem, SelectTreeItem, SelectValue} from "@/components/types.ts";

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

export function isTreeItem(item: SelectItem | SelectTreeItem): item is SelectTreeItem {
    return (item as SelectTreeItem).items !== undefined;
}

export function getLabelByValue(items: SelectItem[] | SelectTreeItem[], value: SelectValue): string | undefined {
    for (const item of items) {
        if (isTreeItem(item)) {
            const found = item.items.find(i => i.value === value);
            if (found) return found.label;
        } else {
            if (item.value === value) return item.label;
        }
    }
    return undefined;
}

export const getDisplayValue = (value: SelectValue | SelectValue[] | undefined, items: SelectItem[] | SelectTreeItem[]): string => {
    if (!value) return "";

    if (Array.isArray(value)) {
        const labels = value.map(v => getLabelByValue(items, v)).filter(Boolean) as string[];
        return labels.join(", ");
    } else {
        return getLabelByValue(items, value) ?? String(value);
    }
};

export function cutText(text: string, maxLength: 30) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}