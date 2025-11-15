export interface SelectItem {
    label: string;
    value: string | number;
    subtitle?: string;
}

export interface SelectTreeItem {
    title: string;
    items: SelectItem[];
    prefix?: string;
}


export type SelectMode = 'single' | 'multiple';
export type SelectValue = string | number;