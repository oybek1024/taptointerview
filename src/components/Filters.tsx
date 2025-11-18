import {Button, Input, Popover, Slider} from "antd";
import {ArrowDown2, SearchNormal1} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import * as React from "react";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import type {SelectItem, SelectMode, SelectTreeItem, SelectValue} from "@/components/types.ts";
import {RadioSelect} from "@/components/RadioSelect.tsx";
import {cutText, getDisplayValue} from "@/utils";


interface SelectFilterProps {
    title: string;
    items: SelectItem[] | SelectTreeItem[];
    mode?: SelectMode;
    value?: SelectValue | SelectValue[];
    onChange?: (value: SelectValue | SelectValue[]) => void;
}

export const SelectFilter = (props: SelectFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState<string>();

    const initialValue = props.mode === "multiple" ? ([] as SelectValue[]) : undefined;
    const [value, setValue] = useState<SelectValue | SelectValue[] | undefined>(
        props.value !== undefined ? props.value : initialValue
    );

    const handleChange = (val: SelectValue | SelectValue[]) => setValue(val);

    const onConfirm = () => {
        setDisplayValue(getDisplayValue(value, props.items))
        props.onChange?.(value!)
        setIsOpen(false);
    }

    const onClear = () => {
        setDisplayValue(undefined)
        setValue(undefined)
        props.onChange?.(value!)
        setIsOpen(false);
    }


    return <Popover
        open={isOpen}
        onOpenChange={(value) => setIsOpen(value)}
        content={
            <div className="flex flex-col w-[240px] gap-2">
                <div className="max-h-[400px] overflow-x-scroll">
                    <RadioSelect
                        items={props.items}
                        mode={props.mode}
                        value={value}
                        onChange={handleChange}
                        className="gap-2.5"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        block
                        variant="filled"
                        color="default"
                        onClick={onClear}
                    >
                        Clear
                    </Button>
                    <Button
                        block
                        size="middle"
                        type="primary"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        }
        title=""
        trigger="click"
        placement="bottom"
        arrow={false}
    >
        <div className="flex gap-2 px-4 py-2 rounded-xl items-center bg-unknown-gray cursor-pointer">
            <p className="font-semibold text-sm text-gray-700">{props.title}{displayValue && ":"} {displayValue ?
                <span className="text-primary">
                    {cutText(displayValue, 30)}
                </span> : null}</p>
            <ArrowDown2
                size="20"
                color={themeColors.gray[700]}
                variant="Outline"
                className={cn("transform transition-transform duration-300 ease-out", isOpen && "rotate-180")}
            />
        </div>
    </Popover>

}

interface RangeFilterProps {
    title: string;
    value?: number[];
    onChange?: (value: number[]) => void;
}

export const RangeFilter = (props: RangeFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<number[]>(props.value ? props.value : [])
    const [displayValue, setDisplayValue] = useState<string>();

    const onConfirm = () => {
        setDisplayValue(value && value.length ? value.map((e) => '$' + e).join("-").concat("/hr") : undefined)
        props.onChange?.(value!)
        setIsOpen(false);
    }

    const onClear = () => {
        setDisplayValue(undefined)
        setValue([])
        props.onChange?.(value!)
        setIsOpen(false);
    }

    useEffect(() => {
        setDisplayValue(props.value && props.value.length ? value.map((e) => '$' + e).join("-").concat("/hr") : undefined)
    }, []);


    return <Popover
        open={isOpen}
        onOpenChange={(value) => setIsOpen(value)}
        content={
            <div className="flex flex-col w-[240px] gap-2">
                <Slider
                    range
                    value={value}
                    marks={value?.reduce((acc, val) => {
                        acc[val] = `${val}/hr`;
                        return acc;
                    }, {} as Record<number, string>)}
                    onChange={(val) => setValue(val)}
                />
                <div className="flex gap-2">
                    <Button
                        block
                        variant="filled"
                        color="default"
                        onClick={onClear}
                    >
                        Clear
                    </Button>
                    <Button
                        block
                        size="middle"
                        type="primary"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        }
        title={props.title}
        trigger="click"
        placement="bottom"
        arrow={false}
    >
        <div className="flex gap-2 px-4 items-center py-2 rounded-xl bg-unknown-gray cursor-pointer">
            <p className="font-semibold text-sm text-gray-700">
                Pay Range{displayValue && ":"} {displayValue ?
                <span className="text-primary">
                    {displayValue}
                </span> : null}
            </p>
            <ArrowDown2
                size="20"
                color={themeColors.gray[700]}
                variant="Outline"
                className={cn("transform transition-transform duration-300 ease-out", isOpen && "rotate-180")}
            />
        </div>
    </Popover>

}

interface SearchInputProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
    return <Input
        value={props.value}
        placeholder={props.placeholder || "Search..."}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange?.(e.target.value)}
        variant="filled"
        size="large"
        className="h-10 !rounded-2xl max-w-xs"
        prefix={
            <SearchNormal1 size="18" color={themeColors.gray[500]}/>
        }/>
}

interface LessOrMoreProps {
    open: boolean;
    onClick: () => void;
}

export const LessOrMore = (props: LessOrMoreProps) => {
    return <div
        className="flex gap-2 px-4 py-2 rounded-xl items-center cursor-pointer"
        onClick={props.onClick}
    >
        <p className="font-semibold text-sm text-gray-600">
            {props.open ? "Less filters" : "More filters"}
        </p>
        <ArrowDown2
            size="20"
            color={themeColors.gray[700]}
            variant="Outline"
            className={cn("transform transition-transform duration-300 ease-out", props.open && "rotate-180")}
        />
    </div>
}