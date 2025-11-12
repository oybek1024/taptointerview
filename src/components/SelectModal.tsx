import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {CustomModal, type ModalRef} from "@/components/Modals.tsx";
import {RadioSelect} from "@/components/RadioSelect.tsx";

interface Props {
    items: { title: string; subtitle?: string, value: string | number }[];
    // value?: string | number | (string | number)[];
    title?: string;
    onChange?: (
        value: string | number | undefined
    ) => void;
    // otherFieldValue?: string | number;
    // mode?: "radio" | "checkbox"; // 🔹 new
}

export const ModalSelect = forwardRef<ModalRef, Props>(
    (
        {
            items,
            title,
            onChange
        },
        ref
    ) => {
        const selectModal = useRef<ModalRef>(null);
        const [value, setValue] = useState<string | number>();

        useImperativeHandle(ref, () => ({
            open: () => {
                selectModal.current?.open()
            },
            close: () => {
                selectModal.current?.close()
            },
        }));

        return <CustomModal
            ref={selectModal}
            title={title}
            onSubmit={() => onChange?.(value)}
            buttonsTitle={{
                close: "Cancel",
                action: "Confirm"
            }}
        >
            <RadioSelect
                items={items}
                value={value}
                onChange={(val) => setValue(val)}
                className="gap-2.5"
            />
        </CustomModal>
    })