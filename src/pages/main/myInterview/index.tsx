import {InterviewList} from "@/pages/main/myInterview/list.tsx";
import {HeaderTitle} from "@/portals/header-title.tsx";

export const MyInterviewList = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <HeaderTitle>
                My Interviews
            </HeaderTitle>
            <InterviewList/>
        </div>
    );
}

