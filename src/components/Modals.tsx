import {Button, Modal} from "antd";
import {forwardRef, type ReactNode, useImperativeHandle, useState} from "react";
import {Add} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";

export interface ModalRef {
    open: () => void;
    close: () => void;
}

const CustomModalFooter = ({
                               onClose,
                               onSubmit,
                               loading,
                               disabled,
                               isDestructive,
                               closeTitle = "Close",
                               actionTitle = "Action",
                           }: {
    onClose: () => void;
    onSubmit: () => void;
    loading: boolean;
    isDestructive?: boolean;
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
                color={isDestructive ? 'danger' : 'primary'}
                size="large"
                variant="solid"
                className="font-semibold"
            >
                {actionTitle}
            </Button>
        </div>
    );
};


export interface CustomModalProps {
    title?: string;
    subtitle?: string;
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
         subtitle,
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
                title={<Title title={title} subtitle={subtitle} onClose={() => closed()}/>}
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

const Title = ({title, onClose, subtitle}: { title: string, subtitle?: string, onClose?: () => void }) => {
    return <div className="flex justify-between items-start pb-4">
        <div className="flex-col flex">
            <p className="font-semibold text-[18px] text-slate-gray">{title}</p>
            <p className="font-light text-sm text-slate-gray">{subtitle}</p>
        </div>
        <Add
            onClick={onClose}
            size="32"
            color={themeColors.gray[500]}
            className="rotate-45 cursor-pointer hover:scale-110 transition-all"
        />
    </div>
}


interface DestructiveModalProps {
    title: string;
    content?: string;
    loading?: boolean;
    disabled?: boolean;
    buttonsTitle?: {
        close: string;
        action: string;
    };
    onSubmit?: () => void;
    onClose?: () => void;
    icon?: ReactNode;

}

export const DestructiveModal = forwardRef<ModalRef, DestructiveModalProps>(
    ({
         title = "Modal",
         content,
         loading = false,
         disabled = false,
         buttonsTitle,
         onSubmit,
         onClose,
         icon
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
                width={400}
                title={undefined}
                open={open}
                closeIcon={null}
                onCancel={closed}
                centered
                styles={{content: {padding: "24px", borderRadius: 12, overflow: "hidden"}}}
                footer={
                    <CustomModalFooter
                        closeTitle={buttonsTitle?.close}
                        actionTitle={buttonsTitle?.action}
                        loading={loading}
                        isDestructive
                        disabled={disabled}
                        onClose={closed}
                        onSubmit={onSubmit!}
                    />
                }
            >
                <div className="flex justify-between items-start pb-4">
                    <div
                        className="size-14 rounded-full bg-error-200 border-8 border-error-100 flex items-center justify-center relative">
                        {icon}
                        <div className="size-24 border border-gray-200 rounded-full absolute z-0"></div>
                        <div className="size-[144px] border border-gray-200 rounded-full absolute z-0"></div>
                        <div className="size-[192px] border border-gray-200 rounded-full absolute z-0"></div>
                        <div className="size-[240px] border border-gray-100 rounded-full absolute z-0"></div>
                        <div className="size-[288px] border border-gray-100 rounded-full absolute z-0"></div>
                    </div>
                    <Add
                        onClick={onClose}
                        size="32"
                        color={themeColors.gray[500]}
                        className="rotate-45 cursor-pointer hover:scale-110 transition-all"
                    />
                </div>
                <div className="z-10 relative flex flex-col gap-2">
                    <p className="font-bold text-gray-900 text-[18px]">{title}</p>
                    <p className="text-gray-600 text-sm">{content}</p>
                </div>

            </Modal>
        );
    }
);