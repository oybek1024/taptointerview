import {ArchiveMinus} from "iconsax-reactjs";

export const EmptySavedJobs = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3.5 py-8 h-[500px]">
            <ArchiveMinus
                size={72}
                variant="Outline"
                className="text-gray-400"
            />
            <div className="flex flex-col items-center gap-2.5 text-center max-w-[327px]">
                <h3 className="text-xl font-semibold text-gray-dark leading-[30px]">
                    No saved jobs yet
                </h3>
                <p className="text-sm font-normal text-slate-gray leading-5">
                    Jobs you save will appear here so you can easily review and apply later.
                </p>
            </div>
        </div>
    );
};

