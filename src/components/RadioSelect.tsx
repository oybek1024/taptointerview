import {Activity} from "react";
import {cn} from "@/lib/utils.ts";

interface RadioItemProps {
    title: string;
    subtitle?: string;
    selected?: boolean;
    value: string | number;
    onClick: (value: string | number) => void;
}


const RadioItem = ({title, subtitle, selected, value, onClick}: RadioItemProps) => {
    return <div onClick={() => onClick(value)} className={cn(
        "rounded-2xl bg-gray-100 border border-gray-100  py-3 px-5 flex justify-between items-center cursor-pointer",
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
    items: {
        title: string;
        subtitle?: string;
        value: number | string;
    }[];
    value?: number | string;
    onChange?: (value: number | string) => void;
    className?: string;
}

export const RadioSelect = ({items, value, onChange, className}: RadioSelectProps) => {
    return <div className={cn("flex flex-col gap-4", className)}>
        {
            items?.map((item, index) => <RadioItem
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                selected={value === item.value}
                value={item.value}
                onClick={(val) => onChange?.(val)}
            />)
        }
    </div>
}