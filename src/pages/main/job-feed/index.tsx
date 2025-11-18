import {JobFeedFilters} from "@/pages/main/job-feed/filters.tsx";
import {JobFeedList as JobList} from "@/pages/main/job-feed/list.tsx";

export const JobFeedList = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <JobFeedFilters/>
            <JobList/>
        </div>
    );
}