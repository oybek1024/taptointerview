import {useRouter} from "@/hooks/useRouter.ts";
import {AccountType, CreateAccount} from "@/pages/auth/sub";
import {VerifyEmail} from "@/pages/auth/sub/verify-email.tsx";
import {TellAboutYou} from "@/pages/auth/sub/tell-about-you.tsx";

type SignUpMode = "accountType" | "createAccount" | "verifyEmail" | "tellUsAboutYou";

export const SignUp = () => {
    const {params} = useRouter<{ mode: SignUpMode }>()

    const CurrentModeComponent = ({mode}: { mode: SignUpMode }) => {
        switch (mode) {
            case "accountType":
                return <AccountType/>

            case "createAccount":
                return <CreateAccount/>

            case "verifyEmail":
                return <VerifyEmail/>

            case "tellUsAboutYou":
                return <TellAboutYou/>
            default:
                return null
        }
    }

    return <div>
        <CurrentModeComponent mode={params.mode}/>
    </div>
}