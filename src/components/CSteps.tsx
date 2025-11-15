import {Steps} from "antd";
import {cn} from "@/lib/utils.ts";
import {TickCircle} from "iconsax-reactjs";
import {Activity} from "react";
import {themeColors} from "@/config/theme.ts";

export const CSteps = ({currentStep = 0}: { currentStep?: number }) => {
    return <Steps
        className="max-w-xs"
        current={currentStep}
        items={new Array(3).fill(0).map((_, i) => (
            {
                icon: <StepItem key={i} active={currentStep === i} completed={currentStep > i}/>
            }
        ))}
    />
}

const StepItem = ({active, completed}: { active?: boolean, completed?: boolean }) => {
    return <div
        className={cn("flex items-center justify-center size-10 rounded-full border-2 border-gray-200", active && "border-primary", completed && "border-none")}>
        <Activity mode={completed ? 'visible' : 'hidden'}>
            <TickCircle size="40" color={themeColors.primary[500]}/>
        </Activity>
        <Activity mode={active ? 'visible' : 'hidden'}>
            <div
                className={cn("size-3 rounded-full bg-gray-200", active && "bg-primary")}></div>
        </Activity>

    </div>
}