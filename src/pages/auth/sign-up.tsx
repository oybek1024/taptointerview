import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button} from "antd";
import {RadioSelect} from "@/components/RadioSelect.tsx";
import {useState} from "react";

export const SignUp = () => {
    const [value, setValue] = useState<string | number>();
    const items = [
        {
            title: 'Job Seeker',
            subtitle: 'Find jobs. Interview instantly.',
            value: 1
        },
        {
            title: 'Employer',
            subtitle: 'Post jobs. Hire faster.',
            value: 2
        }
    ]


    return <div className="flex flex-col gap-8 mt-8">
        <PageTitle
            title="Choose account type"
            subtitle="Tell us how you plan to use Tap to Interview."
        />
        <RadioSelect
            items={items}
            value={value}
            onChange={(val) => setValue(val)}
        />
        <Button
            variant="solid"
            size="large"
            color="primary"
            className="!rounded-2xl font-semibold"
        >
            Continue
        </Button>
    </div>
}