import {TableDocument} from "iconsax-reactjs";
import {Button} from "antd";

export const EmptyInterviews = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3.5 py-8 h-[500px]">
            <TableDocument
                size={72}
                variant="Outline"
                className="text-gray-400"
            />
            <div className="flex flex-col items-center gap-5 text-center max-w-[327px]">
                <h3 className="text-xl font-semibold text-gray-dark leading-[30px]">
                    No interviews yet
                </h3>
                <p className="text-sm font-normal text-slate-gray leading-5">
                    Once you join an interview queue, your interviews will appear here.
                </p>
                <Button type="primary" size="large" block>
                    Browse jobs
                </Button>
            </div>

        </div>
    );
};

