import {Activity, useState} from "react";
import {cn} from "@/lib/utils.ts";
import type {SelectItem, SelectMode, SelectTreeItem, SelectValue} from "@/components/types.ts";
import {Collapse} from "@/components/Collapse.tsx";
import {ArrowDown2, ArrowUp2} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";

interface RadioItemProps {
    title: string;
    subtitle?: string;
    selected?: boolean;
    value: string | number;
    onClick: (value: string | number) => void;
}


const RadioItem = ({title, subtitle, selected, value, onClick}: RadioItemProps) => {
    return <div onClick={() => onClick(value)} className={cn(
        "rounded-2xl bg-unknown-gray border border-unknown-gray  py-3 px-5 flex justify-between items-center cursor-pointer",
        selected && "border-primary-500 "
    )}>
        <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-800">{title}</p>
            <Activity mode={subtitle ? 'visible' : 'hidden'}>
                <p className="text-gray-500 text-sm">{subtitle}</p>
            </Activity>
        </div>

        <Activity mode={selected ? 'visible' : 'hidden'}>
            <div className="size-5 rounded-full border-[1.5px] border-primary-500 flex justify-center items-center">
                <div className="size-3 bg-primary-500 rounded-full"/>
            </div>
        </Activity>
        <Activity mode={!selected ? 'visible' : 'hidden'}>
            <div className="size-5 rounded-full border-[1.5px] border-gray-300"></div>
        </Activity>
    </div>
}


interface RadioSelectProps {
    items: SelectItem[] | SelectTreeItem[];
    value?: SelectValue | SelectValue[];
    onChange?: (value: SelectValue | SelectValue[]) => void;
    mode?: SelectMode;
    className?: string;
}

function isTreeItem(item: SelectItem | SelectTreeItem): item is SelectTreeItem {
    return (item as SelectTreeItem).items !== undefined;
}

export const RadioSelect = ({
                                items,
                                value,
                                onChange,
                                className,
                                mode
                            }: RadioSelectProps) => {

    const isSelected = (itemValue: SelectValue) => {
        if (mode === 'multiple') {
            return Array.isArray(value) && value.includes(itemValue);
        }
        return value === itemValue;
    };

    const handleClick = (itemValue: SelectValue) => {
        if (!onChange) return;

        if (mode === 'multiple') {
            let newValue: SelectValue[] = Array.isArray(value) ? [...value] : [];
            if (newValue.includes(itemValue)) {
                newValue = newValue.filter(v => v !== itemValue); // unselect
            } else {
                newValue.push(itemValue); // select
            }
            onChange(newValue);
        } else {
            console.log('ii', itemValue)
            onChange(itemValue); // single select
        }
    };


    return <div className={cn("flex flex-col gap-2", className)}>
        {items?.map((item, index) => {
            if (isTreeItem(item)) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [open, setOpen] = useState(false);
                // It's a TreeItem
                return (
                    <div key={index}>
                        <div
                            className="flex justify-between items-center px-4 py-3 cursor-pointer rounded-2xl bg-unknown-gray mb-2"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-slate-gray">{item.title}</p>
                                <p className="text-gray-500 text-sm">{item.items.length} {item.prefix || 'items'}</p>
                            </div>
                            <div className="text-gray-500">
                                {
                                    open ?
                                        <ArrowUp2 size="24" color={themeColors.gray[500]} variant="Outline"/> :
                                        <ArrowDown2 size="24" color={themeColors.gray[500]}
                                                    variant="Outline"/>}
                            </div>
                        </div>
                        <Collapse open={open}>
                            <div className="flex flex-col gap-2">
                                {item.items.map(subItem => (
                                    <div key={subItem.value} className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                    >
                                        <RadioItem
                                            title={subItem.label}
                                            selected={isSelected(subItem.value)}
                                            value={subItem.value}
                                            onClick={handleClick}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Collapse>

                    </div>
                );
            } else {
                // It's a normal Item
                return (
                    <RadioItem
                        key={item.value}
                        title={item.label}
                        selected={isSelected(item.value)}
                        value={item.value}
                        onClick={handleClick}
                    />
                );
            }
        })}
    </div>
}
