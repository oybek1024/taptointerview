import {JobFeedFilters} from "@/pages/main/job-feed/filters.tsx";
import {JobFeedList as JobList} from "@/pages/main/job-feed/list.tsx";
import {HeaderTitle} from "@/portals/header-title.tsx";
import {EmptySavedJobs} from "@/components/ui/EmptySavedJobs.tsx";
import {Activity} from "react";

export const SavedJobList = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <HeaderTitle>
                Saved Jobs
            </HeaderTitle>
            <JobFeedFilters/>
            <Activity mode="hidden">
                <JobList/>
            </Activity>
            <Activity mode="visible">
                <EmptySavedJobs/>
            </Activity>

        </div>
    );
}