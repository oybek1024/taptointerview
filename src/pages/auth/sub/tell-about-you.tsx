import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button, Form, Input, Steps} from "antd";
import {cn} from "@/lib/utils.ts";
import {formatUSPhone} from "@/utils";
import {ArrowDown2} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {ModalSelect} from "@/components/SelectModal.tsx";
import {useRef} from "react";
import type {ModalRef} from "@/components/Modals.tsx";
// import {type ModalRef, SelectModal} from "@/components/Modals.tsx";

export const TellAboutYou = () => {
    return <div className="flex flex-col gap-5 mt-4 pt-5">
        <div className="flex items-center justify-center">
            <CSteps/>
        </div>

        <PageTitle
            title="Tell us about you"
            subtitle="We’ll use this information to match you with nearby job opportunities."
        />
        <CForm/>


    </div>
}

export const CSteps = ({currentStep = 0}: { currentStep?: number }) => {
    return <Steps
        className="max-w-xs"
        current={currentStep}
        items={new Array(3).fill(0).map((_, i) => (
            {
                icon: <StepItem key={i} active={currentStep >= i}/>
            }
        ))}
    />
}

const StepItem = ({active}: { active?: boolean }) => {
    return <div
        className={cn("flex items-center justify-center size-10 rounded-full border-2 border-gray-200", active && "border-primary")}>
        <div className={cn("size-3 rounded-full bg-gray-200", active && "bg-primary")}></div>
    </div>
}


interface FormValues {
    full: string;
    phone: string;
    city: string;
    zip: string;
    authUS: boolean;
}

const CForm = () => {

    const US_PHONE_REGEX = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;


    const [form] = Form.useForm();

    const selectModal = useRef<ModalRef>(null)
    // const {push} = useRouter();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatUSPhone(e.target.value);
        form.setFieldsValue({phone: formatted});
    };

    return <>
        <ModalSelect
            ref={selectModal}
            title="Authorized to work in the U.S.?"
            items={
                [
                    {
                        title: "Yes",
                        value: "yes",
                    },
                    {
                        title: "No",
                        value: "no",
                    }
                ]
            }/>
        <Form<FormValues>
            layout="vertical"
            form={form}
            onFinish={onSubmit}
        >
            <Form.Item<FormValues>
                label="Full name"
                name="full"
                rules={[
                    {
                        required: true,
                        message: "Please enter your full name",
                    }
                ]}
            >
                <Input
                    size="large"
                    variant="filled"
                    placeholder="Enter your Full Name"
                />
            </Form.Item>

            <div className="flex items-center gap-2 w-full">
                <Form.Item<FormValues>
                    className="flex-1"
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your phone",
                        },
                        {
                            pattern: US_PHONE_REGEX,
                            message: "Enter a valid US number: +1 (213) 987-2214",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        variant="filled"
                        placeholder="Enter your phone number"
                        onChange={handlePhoneChange}
                    />
                </Form.Item>

                <Button type="text" size="middle" className="!text-primary-700 !font-semibold">
                    Send code
                </Button>
            </div>


            <Form.Item<FormValues>
                label="City"
                name="city"
            >
                <Input
                    size="large"
                    variant="filled"
                    placeholder="Enter your city"
                />
            </Form.Item>

            <Form.Item<FormValues>
                label="ZIP Code"
                name="zip"
            >
                <Input
                    size="large"
                    variant="filled"
                    placeholder="Enter your ZIP code"
                />
            </Form.Item>

            <Form.Item<FormValues>
                label="Authorized to work in the U.S.?"
                name="authUS"
            >
                <Input
                    onClick={() => selectModal.current?.open()}
                    readOnly
                    size="large"
                    variant="filled"
                    placeholder="Yes"
                    suffix={<ArrowDown2 size="16" color={themeColors.gray[400]}/>}
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
                            Continue
                        </Button>
                    );
                }}
            </Form.Item>
        </Form>
    </>
}