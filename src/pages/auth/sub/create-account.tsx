import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button, Divider, Form, Input} from "antd";
import {Eye, EyeSlash} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {Radio} from "@/components/Radio.tsx";
import {useRouter} from "@/hooks/useRouter.ts";

export const CreateAccount = () => {
    return <div className="flex flex-col gap-4 mt-8">
        <PageTitle
            title="Create Job Seeker account"
            subtitle="Get started finding jobs and interviewing instantly."
        />
        <CForm/>
        <div className="flex flex-col items-center">
            <p className="text-gray-400 flex gap-2 items-center justify-center">
                Already have an account?
                <span className="text-primary hover:underline cursor-pointer">
                        Sign in
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
    rePassword: string;
    check: boolean;
}

const CForm = () => {
    const [form] = Form.useForm();
    const {push} = useRouter();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
        push("signUp", {params: {mode: "verifyEmail"}})
    }

    return <Form<FormValues>
        layout="vertical"
        form={form}
        style={{padding: '0 35px'}}
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
                },
                {
                    min: 8,
                    message: "Must be at least 8 characters.",
                }
            ]}
        >
            <Input.Password
                size="large"
                placeholder="Create a password"
                variant="filled"
                iconRender={(visible) => (!visible ? <Eye size="20" color={themeColors.gray[400]}/> :
                    <EyeSlash size="20" color={themeColors.gray[400]}/>)}
            />
        </Form.Item>
        <Form.Item<FormValues>
            label="Confirm Password"
            name="rePassword"
            dependencies={["password"]}
            rules={[
                {required: true, message: "Please confirm your password"},
                {
                    min: 8,
                    message: "Must be at least 8 characters.",
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("The two passwords do not match")
                        );
                    },
                }),
            ]}>
            <Input.Password
                size="large"
                placeholder="Re-enter your password"
                variant="filled"
                iconRender={(visible) => (!visible ? <Eye size="20" color={themeColors.gray[400]}/> :
                    <EyeSlash size="20" color={themeColors.gray[400]}/>)}
            />
        </Form.Item>
        <Form.Item<FormValues>
            name="check"
            valuePropName="value"
            rules={[{
                validator: (_, value) =>
                    value
                        ? Promise.resolve()
                        : Promise.reject(new Error("You must accept the terms")),
            }]}
        >
            <Radio
                invalid={!form.isFieldTouched("check")}
                content={
                    <p className="text-gray-400 text-sm flex gap-1">
                        I agree with the
                        <span className="text-primary hover:underline">
                        Privacy Policy
                    </span>
                        and
                        <span className="text-primary hover:underline">
                        Terms & Conditions
                    </span>
                    </p>
                }/>
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
                        Continue
                    </Button>
                );
            }}
        </Form.Item>
    </Form>
}