import {useEffect, useRef, useState} from "react";
import {CustomModal, type ModalRef} from "@/components/Modals.tsx";
import {ArrowDown2} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {Input} from "antd";
import type {SelectItem, SelectMode, SelectValue, SelectTreeItem} from "@/components/types.ts";
import {RadioSelect} from "@/components/RadioSelect.tsx";


interface Props {
    title: string;
    items: SelectItem[] | SelectTreeItem[];
    mode?: SelectMode;
    placeholder?: string;
    value?: SelectValue | SelectValue[];
    onChange?: (value: SelectValue | SelectValue[]) => void;
}

function isTreeItem(item: SelectItem | SelectTreeItem): item is SelectTreeItem {
    return (item as SelectTreeItem).items !== undefined;
}

function getLabelByValue(items: SelectItem[] | SelectTreeItem[], value: SelectValue): string | undefined {
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

export const CustomSelect = ({title, mode = 'single', items, placeholder, value: propValue, onChange}: Props) => {
    const selectModal = useRef<ModalRef>(null)
    const initialValue = mode === "multiple" ? ([] as SelectValue[]) : undefined;
    const [value, setValue] = useState<SelectValue | SelectValue[] | undefined>(
        propValue !== undefined ? propValue : initialValue
    );

    useEffect(() => {
        const defaultValue = mode === "multiple" ? ([] as SelectValue[]) : undefined;
        setValue(propValue !== undefined ? propValue : defaultValue);
    }, [propValue, mode]);

    const handleChange = (val: SelectValue | SelectValue[]) => {
        setValue(val);
    };

    const getDisplayValue = (): string => {
        if (!value) return "";
        
        if (Array.isArray(value)) {
            const labels = value.map(v => getLabelByValue(items, v)).filter(Boolean) as string[];
            return labels.join(", ");
        } else {
            return getLabelByValue(items, value) ?? String(value);
        }
    };

    const displayValue = getDisplayValue();

    return <>
        <CustomModal
            ref={selectModal}
            title={title}
            onSubmit={() => {
                if (value !== undefined) {
                    onChange?.(value);
                    selectModal.current?.close();
                }
            }}
            buttonsTitle={{
                close: "Cancel",
                action: "Confirm"
            }}
        >
            <RadioSelect
                items={items}
                mode={mode}
                value={value}
                onChange={handleChange}
                className="gap-2.5"
            />
        </CustomModal>
        <Input
            value={displayValue}
            onClick={() => selectModal.current?.open()}
            readOnly
            size="large"
            variant="filled"
            placeholder={placeholder}
            className="cursor-pointer"
            suffix={
                <ArrowDown2
                    onClick={() => selectModal.current?.open()}
                    size="16"
                    color={themeColors.gray[400]}
                />
            }
        />
    </>
}