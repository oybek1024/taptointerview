import {useState} from "react";
import {Button} from "antd";
import {JobCard, type JobCardProps} from "@/components/ui/JobCard.tsx";

// Mock data - replace with actual API call
const mockJobs: Omit<JobCardProps, 'onArchive' | 'onTapToInterview'>[] = [
    {
        id: 1,
        companyName: "Amazon Fulfillment",
        companyLogo: "https://files.softicons.com/download/social-media-icons/free-social-media-icons-by-uiconstock/png/256x256/Amazon-Icon.png",
        title: "Picker/Packer",
        location: "Seattle, WA",
        shiftType: "Evening shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$18–$22/hr"
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
        payRange: "$21–$25/hr"
    },
    {
        id: 3,
        companyName: "Walmart Distribution",
        title: "Inventory Control Specialist",
        location: "Atlanta, GA",
        shiftType: "Day shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$20–$24/hr"
    },
    {
        id: 4,
        companyName: "Target Supply Chain",
        title: "Shipping and Receiving Clerk",
        location: "Chicago, IL",
        shiftType: "Flexible hours",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$19–$23/hr"
    },
    {
        id: 5,
        companyName: "XPO Logistics",
        title: "Freight Handler",
        location: "Orlando, FL",
        shiftType: "Day shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$20–$24/hr"
    },
    {
        id: 6,
        companyName: "DHL Express",
        title: "Operations Agent",
        location: "Miami, FL",
        shiftType: "Weekend shift",
        date: "Tomorrow",
        time: "3:00 PM PST",
        payRange: "$22–$26/hr"
    },
    {
        id: 7,
        companyName: "UPS Supply Chain",
        title: "Package Handler",
        location: "Phoenix, AZ",
        shiftType: "Night shift",
        date: "Mar 15",
        time: "11:00 PM PST",
        payRange: "$19–$23/hr"
    },
    {
        id: 8,
        companyName: "Costco Wholesale",
        title: "Stock Associate",
        location: "San Diego, CA",
        shiftType: "Day shift",
        date: "Tomorrow",
        time: "8:00 AM PST",
        payRange: "$21–$25/hr"
    },
];

const JOBS_PER_PAGE = 6;

export const JobFeedList = () => {
    const [displayedJobs, setDisplayedJobs] = useState(mockJobs.slice(0, JOBS_PER_PAGE));
    const [hasMore, setHasMore] = useState(mockJobs.length > JOBS_PER_PAGE);

    const handleLoadMore = () => {
        const currentCount = displayedJobs.length;
        const nextJobs = mockJobs.slice(0, currentCount + JOBS_PER_PAGE);
        setDisplayedJobs(nextJobs);
        setHasMore(nextJobs.length < mockJobs.length);
    };

    const handleArchive = (id: string | number) => {
        console.log('Archive job:', id);
    };

    const handleTapToInterview = (id: string | number) => {
        console.log('Tap to interview:', id);
    };

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {displayedJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        {...job}
                        onArchive={handleArchive}
                        onTapToInterview={handleTapToInterview}
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
    );
};

