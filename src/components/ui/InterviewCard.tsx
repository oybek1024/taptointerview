import {Button} from "antd";
import {cn} from "@/lib/utils.ts";
import {themeColors} from "@/config/theme.ts";
import {Activity} from "react";


type InterviewStatus = 'scheduled' | 'hired' | 'completed'

export interface InterviewCardProps {
    id: string | number;
    companyName: string;
    companyLogo?: string;
    title: string;
    location: string;
    shiftType: string;
    date: string;
    time: string;
    payRange: string;
    status: InterviewStatus;
    onArchive?: (id: string | number) => void;
    onViewDetails?: (id: string | number) => void;
    className?: string;
}

export const InterviewCard = ({
                                  id,
                                  companyName,
                                  companyLogo,
                                  title,
                                  location,
                                  shiftType,
                                  date,
                                  time,
                                  payRange,
                                  status,
                                  onViewDetails,
                                  className
                              }: InterviewCardProps) => {
    const statusColor = (status: InterviewStatus) => {
        switch (status) {
            case 'scheduled':
                return "primary";
            case 'hired':
                return "success";
            case 'completed':
                return "gray";
            default:
                return "error";
        }
    }


    return (
        <div className={cn(
            "rounded-2xl bg-unknown-gray p-6 flex flex-col gap-4",
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
                <div style={{background: themeColors[statusColor(status)][50]}}
                     className={cn("py-2 px-3.5 rounded-2xl")}>
                    <p style={{color: themeColors[statusColor(status)][status === "completed" ? 800 : 500]}}
                       className={cn("text-sm font-semibold")}>
                        {status[0].toUpperCase() + status.slice(1)}
                    </p>
                </div>
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
                    variant="filled"
                    color="default"
                    size="middle"
                    onClick={() => onViewDetails?.(id)}
                    className="!rounded-2xl !h-9 !px-4 !font-semibold !text-sm !bg-white"
                >
                    View Details
                </Button>
            </div>
            <Activity mode={status === "hired" ? 'visible' : 'hidden'}>
                <p className="text-sm text-primary">You’ve been hired for this position. Check your email for
                    paperwork.</p>
            </Activity>
            <Activity mode={status !== "hired" ? 'visible' : 'hidden'}>
                <p className="text-sm text-slate-gray">You’ll receive an email and SMS reminder before your
                    interview.</p>
            </Activity>
        </div>
    );
};

