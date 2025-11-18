import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button, Divider, Form, Input} from "antd";
import {Eye, EyeSlash} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {useRouter} from "@/hooks/useRouter.ts";

export const Login = () => {
    const {push} = useRouter();

    return <div className="flex flex-col gap-4 mt-8">
        <PageTitle
            title="Log in to your account"
            subtitle="Welcome back! Please enter your details."
        />
        <CForm/>
        <div className="flex flex-col items-center">
            <p className="text-gray-400 flex gap-2 items-center justify-center">
                Don't have an account?
                <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => push("signUp", {params: {mode: "createAccount"}})}
                >
                    Sign up
                </span>
            </p>
            <Divider>
                <span className="text-gray-600 text-sm">
                    OR
                </span>
            </Divider>
            <Button type="text" className="!text-primary-700 !font-semibold">
                Continue with SAML SSO
            </Button>
        </div>
    </div>
}

interface FormValues {
    email: string;
    password: string;
}

const CForm = () => {
    const [form] = Form.useForm<FormValues>();
    const {push} = useRouter();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
        // TODO: Implement login logic
    }

    return <Form<FormValues>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
    >
        <Form.Item<FormValues>
            label="Email"
            name="email"
            rules={[
                {
                    required: true,
                    message: "Please enter email address",
                },
                {
                    type: 'email',
                    message: "Please enter a valid email address",
                }
            ]}
        >
            <Input
                size="large"
                variant="filled"
                placeholder="Enter your email address"
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Password"
            name="password"
            rules={[
                {
                    required: true,
                    message: "Please enter your password",
                }
            ]}
        >
            <Input.Password
                size="large"
                placeholder="Enter your password"
                variant="filled"
                iconRender={(visible) => (!visible ? <Eye size="20" color={themeColors.gray[400]}/> :
                    <EyeSlash size="20" color={themeColors.gray[400]}/>)}
            />
        </Form.Item>

        <Form.Item>
            <div className="flex justify-end">
                <Button
                    type="link"
                    className="!text-primary-700 !font-medium !p-0"
                    onClick={() => push("forgotPassword")}
                >
                    Forgot your password?
                </Button>
            </div>
        </Form.Item>

        <Form.Item shouldUpdate>
            {() => {
                const hasErrors = form
                    .getFieldsError()
                    .some((field) => field.errors.length > 0);
                const isDirty = form.isFieldsTouched(true);

                return (
                    <Button
                        block
                        size="large"
                        type="primary"
                        variant="solid"
                        htmlType="submit"
                        className="mt-2"
                        disabled={hasErrors || !isDirty}
                    >
                        Sign In
                    </Button>
                );
            }}
        </Form.Item>
    </Form>
}

