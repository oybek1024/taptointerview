import {Button, Modal} from "antd";
import {forwardRef, type ReactNode, useImperativeHandle, useState} from "react";

export interface ModalRef {
    open: () => void;
    close: () => void;
}

const CustomModalFooter = ({
                               onClose,
                               onSubmit,
                               loading,
                               disabled,
                               closeTitle = "Close",
                               actionTitle = "Action",
                           }: {
    onClose: () => void;
    onSubmit: () => void;
    loading: boolean;
    disabled?: boolean;
    closeTitle?: string;
    actionTitle?: string;
}) => {
    return (
        <div className="flex gap-4 mt-5">
            <Button
                size="large"
                color="default"
                variant="filled"
                block
                onClick={onClose}
                className="text-gray-700 font-semibold"
            >
                {closeTitle}
            </Button>
            <Button
                onClick={onSubmit}
                block
                disabled={disabled}
                loading={loading}
                type="primary"
                size="large"
                variant="solid"
                className="font-medium"
            >
                {actionTitle}
            </Button>
        </div>
    );
};


export interface CustomModalProps {
    title?: string;
    width?: number;
    children?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    onSubmit?: () => void;
    onClose?: () => void;
    buttonsTitle?: {
        close: string;
        action: string;
    };
}

export const CustomModal = forwardRef<ModalRef, CustomModalProps>(
    ({
         title = "Custom Modal",
         children,
         loading = false,
         disabled = false,
         buttonsTitle,
         onSubmit,
         onClose,
         width = 400
     }, ref) => {
        const [open, setOpen] = useState(false);
        useImperativeHandle(ref, () => ({
            open: () => {
                setOpen(true);
            },
            close: () => {
                setOpen(false);
                onClose && onClose();
            },
        }));

        const closed = () => {
            setOpen(false);
            onClose && onClose();
        }


        return (
            <Modal
                width={width}
                title={<Title title={title} onClose={() => closed()}/>}
                open={open}
                closeIcon={null}
                onCancel={closed}
                centered
                styles={{content: {padding: "24px", borderRadius: 12}}}
                footer={
                    <CustomModalFooter
                        closeTitle={buttonsTitle?.close}
                        actionTitle={buttonsTitle?.action}
                        loading={loading}
                        disabled={disabled}
                        onClose={closed}
                        onSubmit={onSubmit!}
                    />
                }
            >
                {children}
            </Modal>
        );
    }
);

const Title = ({title, onClose}: { title: string, onClose?: () => void }) => {
    return <div className="flex justify-between items-center pb-4">
        <p className="font-semibold text-[18px] text-slate-gray">{title}</p>
        <div onClick={onClose} className="cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="#667085"
                      style={{fill: 'gray'}}
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
}