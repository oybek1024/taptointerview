import {Activity, type ReactNode} from "react";
import {TickCircle} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {cn} from "@/lib/utils.ts";

interface Props {
    value?: boolean
    content?: ReactNode
    onChange?: (value: boolean) => void
    invalid?: boolean
}


export const Radio = ({value = false, content, onChange, invalid}: Props) => {
    const change = () => onChange?.(!value)
    return <div className="flex gap-2 items-center">
        <div className="w-6">
            <Activity mode={value ? 'visible' : 'hidden'}>
                <div>
                    <TickCircle onClick={change} size="24" color={themeColors.primary[500]}
                                variant="Bold"/>
                </div>
            </Activity>
            <Activity mode={!value ? 'visible' : 'hidden'}>
                <div onClick={change}
                     className={cn("size-5 rounded-full border border-gray-300", invalid && "border-red-500")}></div>
            </Activity>
        </div>
        <Activity mode={content ? 'visible' : 'hidden'}>
            <div onClick={change} className="cursor-pointer flex-1">
                {content}
            </div>
        </Activity>
    </div>
}