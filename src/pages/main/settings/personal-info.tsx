import * as React from "react";
import {useRef, useState} from "react";
import {Button, Form, Input} from "antd";
import {formatUSPhone} from "@/utils";
import {themeColors} from "@/config/theme.ts";
import {CustomModal, DestructiveModal, type ModalRef} from "@/components/Modals.tsx";
import {OTPInput} from "@/components/OTPInput.tsx";
import {ProfileDelete, Trash} from "iconsax-reactjs";
import {HeaderBreadcrumb} from "@/portals/header-breadcrumb.tsx";

interface FormValues {
    full: string;
    email: string;
    phone: string;
    city: string;
    zip: string;
}

export const PersonalInfo = () => {
    return (
        <div className="flex flex-col gap-6">
            <HeaderBreadcrumb
                items={[
                    {
                        title: "Settings",
                        routeId: "settings"
                    },
                    {
                        title: "Personal info",
                    }
                ]}/>
            <div className="flex justify-between items-center">
                <p className="font-semibold text-3xl">Personal Info</p>
                <Button type="primary" size="large" variant="solid">
                    Save Changes
                </Button>
            </div>
            <PersonalInfoForm/>
        </div>
    );
};

const PersonalInfoForm = () => {
    const [form] = Form.useForm<FormValues>();
    const US_PHONE_REGEX = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    const [otp, setOTP] = useState<string>();
    const [emailOtp, setEmailOtp] = useState<string>();

    const phoneModal = useRef<ModalRef>(null);
    const emailModal = useRef<ModalRef>(null);
    const deleteAccountModal = useRef<ModalRef>(null);

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
        // TODO: Implement save logic
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatUSPhone(e.target.value);
        form.setFieldsValue({phone: formatted});
    };

    const handleChangeEmail = () => {
        emailModal.current?.open();
    };

    const handleChangePhone = () => {
        phoneModal.current?.open();
    };

    const handleDeleteAccount = () => {
        // TODO: Implement delete account logic
        deleteAccountModal.current?.open();
        console.log('Delete account');
    };

    return (
        <>
            <DestructiveModal
                ref={deleteAccountModal}
                title="Delete account"
                content="Are you sure you want to delete your account? This will permanently erase your account."
                buttonsTitle={{
                    close: "Cancel",
                    action: "Delete"
                }}
                onSubmit={() => deleteAccountModal.current?.close()}
                icon={<ProfileDelete size="24" color={themeColors.error[500]}/>}
            />
            <CustomModal
                ref={phoneModal}
                title="Enter the code"
                subtitle="Enter the 4-digit code sent to your phone number."
                onSubmit={() => {
                    console.log("submit phone verification");
                    phoneModal.current?.close();
                }}
                onClose={() => {
                    setOTP("");
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
                                phoneModal.current?.close();
                            }}
                        />
                        <Button type="text" size="middle"
                                className="!text-primary-700 !font-semibold !text-base">
                            Resend
                        </Button>
                    </div>
                </div>
            </CustomModal>

            <CustomModal
                ref={emailModal}
                title="Enter the code"
                subtitle="Enter the 4-digit code sent to your email address."
                onSubmit={() => {
                    console.log("submit email verification");
                    emailModal.current?.close();
                }}
                onClose={() => {
                    setEmailOtp("");
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
                            value={emailOtp}
                            onInput={(val) => setEmailOtp(val.join(''))}
                            onChange={() => {
                                emailModal.current?.close();
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
                className="max-w-xl"
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
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

                    <Button
                        onClick={handleChangeEmail}
                        type="text"
                        size="middle"
                        className="!text-primary-700 !font-semibold"
                    >
                        Change
                    </Button>
                </div>

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

                    <Button
                        onClick={handleChangePhone}
                        type="text"
                        className="!text-primary-700 !font-semibold"
                    >
                        Change
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

                <div className="flex items-center gap-2 mt-4">
                    <Button
                        onClick={handleDeleteAccount}
                        variant="filled"
                        size="large"
                        color="default"
                        className="!text-red-500 !font-semibold !px-4"
                    >
                        <Trash size="20" color={themeColors.error[500]}/>
                        Delete Account
                    </Button>
                </div>

                {/*<Form.Item shouldUpdate className="mt-6">*/}
                {/*    {() => {*/}
                {/*        const hasErrors = form*/}
                {/*            .getFieldsError()*/}
                {/*            .some((field) => field.errors.length > 0);*/}
                {/*        const isDirty = form.isFieldsTouched(true);*/}

                {/*        return (*/}
                {/*            <Button*/}
                {/*                block*/}
                {/*                size="large"*/}
                {/*                type="primary"*/}
                {/*                variant="solid"*/}
                {/*                htmlType="submit"*/}
                {/*                disabled={hasErrors || !isDirty}*/}
                {/*                style={{*/}
                {/*                    backgroundColor: themeColors.primary[500],*/}
                {/*                    borderColor: themeColors.primary[500],*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Save Changes*/}
                {/*            </Button>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*</Form.Item>*/}
            </Form>
        </>
    );
};

