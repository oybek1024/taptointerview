import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button} from "antd";
import {useRouter} from "@/hooks/useRouter.ts";

export const VerifyEmail = () => {
    const {push} = useRouter();
    return <div className="flex flex-col gap-8 mt-8">
        <PageTitle
            title="Verify your email"
            subtitle="We’ve sent a verification link to johndoe@gmail.com. Please check your inbox and click the link to confirm your account."
        />
        <Button
            variant="solid"
            size="large"
            color="primary"
            onClick={() => push("signUp", {params: {mode: "tellUsAboutYou"}})}
        >
            Open Email App
        </Button>
        <p className="text-gray-400 flex gap-2 items-center justify-center">
            Didn’t receive the email?
            <span className="text-primary hover:underline cursor-pointer">
                        Click to resend
                    </span>
        </p>
    </div>
}