import * as React from "react";
import {useRef, useState} from "react";
import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {Button, Form, Input} from "antd";
import {formatUSPhone} from "@/utils";
import {ArrowDown2, ArrowLeft} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {ModalSelect} from "@/components/SelectModal.tsx";
import {CustomModal, type ModalRef} from "@/components/Modals.tsx";
import {OTPInput} from "@/components/OTPInput.tsx";
import {useRouter} from "@/hooks/useRouter.ts";
import {CSteps} from "@/components/CSteps.tsx";

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


interface FormValues {
    full: string;
    phone: string;
    city: string;
    zip: string;
    authUS: string;
}

const CForm = () => {
    const {push} = useRouter();
    const [form] = Form.useForm();

    const US_PHONE_REGEX = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    const [otp, setOTP] = useState<string>();


    const selectModal = useRef<ModalRef>(null)
    const otpModal = useRef<ModalRef>(null)


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
            onChange={(val) => {
                selectModal.current?.close()
                form.setFieldValue("authUS", val === "yes" ? "Yes" : "No");
            }}
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

        <CustomModal
            ref={otpModal}
            title="Enter the code"
            subtitle="Enter the 4-digit code sent to your phone number."
            onSubmit={() => console.log("submit")}
            onClose={() => {
                setOTP("")
            }}
            buttonsTitle={{
                close: "Cancel",
                action: "Confirm"
            }}
        >
            <div className="w-full flex flex-col gap-2">
                <p className="font-medium text-gray-700 text-sm">Secure code</p>
                <div className="flex gap-2 items-center">
                    <OTPInput
                        value={otp}
                        onInput={(val) => setOTP(val.join(''))}
                        onChange={() => {
                            otpModal.current?.close()
                        }}
                    />
                    <Button type="text" size="middle"
                            className="!text-primary-700 !font-semibold !text-base">
                        Resend
                    </Button>
                </div>
            </div>

        </CustomModal>
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

                <Button onClick={() => otpModal.current?.open()} type="text" size="middle"
                        className="!text-primary-700 !font-semibold">
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
            <div className="flex justify-center mb-4">
                <Button onClick={() => push("signUp", {params: {mode: "verifyEmail"}})} type="text" size="middle"
                        className="!text-primary-700 !font-semibold !text-base">
                    <ArrowLeft size="20" color={themeColors.primary[700]}/>
                    Back
                </Button>
            </div>
        </Form>
    </>
}