import {Activity, useState} from "react";
import {Button, Segmented} from "antd";
import {InterviewCard, type InterviewCardProps} from "@/components/ui/InterviewCard.tsx";
import {EmptyInterviews} from "@/components/ui/EmptyInterviews.tsx";

const mockInterviews: Omit<InterviewCardProps, 'onArchive' | 'onViewDetails'>[] = [
    {
        id: 1,
        companyName: "Amazon Fulfillment",
        companyLogo: "https://files.softicons.com/download/social-media-icons/free-social-media-icons-by-uiconstock/png/256x256/Amazon-Icon.png",
        title: "Picker/Packer",
        location: "Seattle, WA",
        shiftType: "Evening shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$18–$22/hr",
        status: "scheduled"
    },
    {
        id: 2,
        companyName: "FedEx Logistics",
        companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs82FBeJpjCGKEZ1Wrqz08UwYyx8fyNJhfBw&s",
        title: "Warehouse Associate",
        location: "Los Angeles, CA",
        shiftType: "Day shift",
        date: "Mar 12",
        time: "3:15 PM",
        payRange: "$21–$25/hr",
        status: "hired"
    },
    {
        id: 3,
        companyName: "Walmart Distribution",
        title: "Inventory Control Specialist",
        location: "Atlanta, GA",
        shiftType: "Day shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$20–$24/hr",
        status: "completed"
    },
];

const INTERVIEWS_PER_PAGE = 6;
const hasInterviews = mockInterviews.length > 0;

export const InterviewList = () => {
    const [displayedInterviews, setDisplayedInterviews] = useState(mockInterviews.slice(0, INTERVIEWS_PER_PAGE));
    const [hasMore, setHasMore] = useState(mockInterviews.length > INTERVIEWS_PER_PAGE);

    const handleLoadMore = () => {
        const currentCount = displayedInterviews.length;
        const nextInterviews = mockInterviews.slice(0, currentCount + INTERVIEWS_PER_PAGE);
        setDisplayedInterviews(nextInterviews);
        setHasMore(nextInterviews.length < mockInterviews.length);
    };

    const handleViewDetails = (id: string | number) => {
        console.log('View interview details:', id);
    };

    const segments = [
        {
            label: "Upcoming",
            value: "upcoming",
        },
        {
            label: "Past",
            value: "past",
        },
        {
            label: "Hired",
            value: "hired",
        },
        {
            label: "All",
            value: "all",
        }
    ]

    return (
        <>
            <Segmented<string>
                className="w-fit"
                size="large"
                options={segments.map((segment) => ({
                    ...segment,
                    className: "px-10"
                }))}
                defaultValue={segments[0].value}
                onChange={(value) => {
                    console.log(value); // string
                }}
            />
            <Activity mode={hasInterviews ? 'visible' : 'hidden'}>
                <div className="flex flex-col w-full gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {displayedInterviews.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                {...interview}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center mt-4">
                            <Button
                                type="default"
                                size="large"
                                onClick={handleLoadMore}
                                className="!rounded-2xl !h-12 !px-8 !font-semibold"
                            >
                                Load more
                            </Button>
                        </div>
                    )}
                </div>
            </Activity>
            <Activity mode={hasInterviews ? 'hidden' : 'visible'}>
                <EmptyInterviews/>
            </Activity>
        </>
    );
};

