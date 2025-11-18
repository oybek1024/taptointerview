import {Button} from "antd";
import {ArchiveTick} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {cn} from "@/lib/utils.ts";

export interface JobCardProps {
    id: string | number;
    companyName: string;
    companyLogo?: string;
    title: string;
    location: string;
    shiftType: string;
    date: string;
    time: string;
    payRange: string;
    onArchive?: (id: string | number) => void;
    onTapToInterview?: (id: string | number) => void;
    className?: string;
}

export const JobCard = ({
                            id,
                            companyName,
                            companyLogo,
                            title,
                            location,
                            shiftType,
                            date,
                            time,
                            payRange,
                            onArchive,
                            onTapToInterview,
                            className
                        }: JobCardProps) => {
    return (
        <div className={cn(
            "rounded-2xl bg-[#f6f6f6] p-6 flex flex-col gap-4",
            className
        )}>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="size-9 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                        {companyLogo ? (
                            <img src={companyLogo} alt={companyName} className="w-full h-full object-cover"/>
                        ) : (
                            <div className="w-full h-full bg-gray-100"/>
                        )}
                    </div>
                    <span className="font-semibold text-sm text-gray-dark">
                        {companyName}
                    </span>
                </div>
                <button
                    onClick={() => onArchive?.(id)}
                    className="size-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Archive job"
                >
                    <ArchiveTick size={18} color={themeColors.gray[500]} variant="Outline"/>
                </button>
            </div>

            <h3 className="font-bold text-lg text-gray-dark leading-7">
                {title}
            </h3>

            <div className="flex items-center gap-2.5 text-sm text-slate-gray">
                <span>{location}</span>
                <span>•</span>
                <span>{shiftType}</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-slate-gray">
                <span>{date}</span>
                <span>•</span>
                <span>{time}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
                <Button
                    size="middle"
                    className="!rounded-2xl !h-9 !px-4 !font-semibold !text-sm !text-gray-700 !bg-white !border-none"
                >
                    {payRange}
                </Button>
                <Button
                    type="primary"
                    size="middle"
                    onClick={() => onTapToInterview?.(id)}
                    className="!rounded-2xl !h-9 !px-4 !font-semibold !text-sm !bg-primary-500 !border-primary-500 hover:!bg-primary-600"
                >
                    Tap to Interview
                </Button>
            </div>
        </div>
    );
};

