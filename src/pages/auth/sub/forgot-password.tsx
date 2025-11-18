import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button, Form, Input} from "antd";

export const ForgotPassword = () => {
    return <div className="flex flex-col gap-4 mt-8">
        <PageTitle
            title="Forgot password?"
            subtitle="Pop in your email, and we'll send you a reset link faster than you can say 'Forgot password'!"
        />
        <CForm/>
    </div>
}

interface FormValues {
    email: string;
}

const CForm = () => {
    const [form] = Form.useForm<FormValues>();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
        // TODO: Implement forgot password logic
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
                        Send Link
                    </Button>
                );
            }}
        </Form.Item>
    </Form>
}

