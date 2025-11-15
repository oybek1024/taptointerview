import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {CustomModal, type ModalRef} from "@/components/Modals.tsx";
import {RadioSelect} from "@/components/RadioSelect.tsx";

interface Props {
    items: { title: string; subtitle?: string, value: string | number }[];
    title?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
}

export const ModalSelect = forwardRef<ModalRef, Props>(
    (
        {
            items,
            title,
            onChange,
            value
        },
        ref
    ) => {
        const selectModal = useRef<ModalRef>(null);
        const [radioValue, setRadioValue] = useState(value);

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
            onSubmit={() => onChange?.(radioValue!)}
            buttonsTitle={{
                close: "Cancel",
                action: "Confirm"
            }}
        >
            <RadioSelect
                items={items}
                value={radioValue}
                onChange={(val) => setRadioValue(val)}
                className="gap-2.5"
            />
        </CustomModal>
    })