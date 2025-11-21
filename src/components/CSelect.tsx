import {useEffect, useMemo, useRef, useState} from "react";
import {CustomModal, type ModalRef} from "@/components/Modals.tsx";
import {Add, ArrowDown2} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {Input} from "antd";
import type {SelectItem, SelectMode, SelectTreeItem, SelectValue} from "@/components/types.ts";
import {RadioSelect} from "@/components/RadioSelect.tsx";
import {getDisplayValue} from "@/utils";


interface Props {
    title: string;
    items: SelectItem[] | SelectTreeItem[];
    mode?: SelectMode;
    placeholder?: string;
    value?: SelectValue | SelectValue[];
    onChange?: (value: SelectValue | SelectValue[] | undefined) => void;
}

export const CustomSelect = ({
                                 title,
                                 mode = 'single',
                                 items,
                                 placeholder,
                                 value: propValue,
                                 onChange
                             }: Props) => {
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

    const displayValue = useMemo(() => {
        return getDisplayValue(propValue, items)
    }, [items, propValue])

    const submit = (value: SelectValue | SelectValue[]) => {
        onChange?.(value);
        selectModal.current?.close();
    }

    const clear = () => {
        onChange?.(undefined)
    }

    return <>
        <CustomModal
            ref={selectModal}
            title={title}
            onSubmit={() => submit(value!)}
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
            suffix={
                displayValue ?
                    <Add
                        onClick={clear}
                        size="24"
                        color={themeColors.gray[400]}
                        className="rotate-45 cursor-pointer"
                    /> :
                    <ArrowDown2
                        onClick={() => selectModal.current?.open()}
                        size="16"
                        color={themeColors.gray[400]}
                    />
            }
        />
    </>
}