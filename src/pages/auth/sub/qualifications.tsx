import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {CSteps} from "@/components/CSteps.tsx";
import {CustomSelect} from "@/components/CSelect.tsx";
import type {SelectItem} from "@/components/types.ts";
import {Button, Form, Upload} from "antd";
import {Add, ArrowLeft} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {useRouter} from "@/hooks/useRouter.ts";
import type {UploadFile} from "antd/es/upload/interface";

const {Dragger} = Upload;

const educationOptions: SelectItem[] = [
    {
        label: "Master",
        value: "master",
    },
    {
        label: "Not degree",
        value: "not_degree",
    },
]

const driverLicenseOptions: SelectItem[] = [
    {
        label: "Yes",
        value: "yes",
    },
    {
        label: "No",
        value: "no",
    },
]

const languagesOptions: SelectItem[] = [
    {
        label: "English",
        value: "english",
    },
    {
        label: "Spanish",
        value: "spanish",
    },
    {
        label: "French",
        value: "french",
    },
    {
        label: "German",
        value: "german",
    },
    {
        label: "Italian",
        value: "italian",
    },
    {
        label: "Portuguese",
        value: "portuguese",
    },
    {
        label: "Russian",
        value: "russian",
    },
    {
        label: "Mandarin",
        value: "mandarin",
    },
    {
        label: "Japanese",
        value: "japanese",
    },
    {
        label: "Arabic",
        value: "arabic",
    },
]

export const Qualifications = () => {

    return <div className="flex flex-col gap-5 mt-4 pt-5 w-sm">
        <div className="flex items-center justify-center">
            <CSteps currentStep={2}/>
        </div>

        <PageTitle
            title="Qualifications"
            subtitle="Tell us more about your background."
        />

        <CForm/>

    </div>
}

interface FormValues {
    education?: string;
    certifications?: UploadFile[];
    driverLicense?: string;
    languages?: string[];
}

const CForm = () => {
    const {push} = useRouter();
    const [form] = Form.useForm<FormValues>();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
    }

    return <Form<FormValues>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
    >
        <Form.Item<FormValues>
            label="Education / Degree (optional)"
            name="education"
        >
            <CustomSelect
                title="Select education"
                mode="single"
                placeholder="Enter your education"
                items={educationOptions}
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Certifications/Licenses"
            name="certifications"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                    return e;
                }
                return e?.fileList;
            }}
        >
            <Dragger
                listType="text"
                multiple
                beforeUpload={() => false}
                className="!p-0"
            >
                <div className="flex justify-center items-center w-full">
                    <Add size="32" color={themeColors.primary[500]}/>
                </div>

            </Dragger>
        </Form.Item>

        <Form.Item<FormValues>
            label="Valid driver's license"
            name="driverLicense"
            rules={[
                {
                    required: true,
                    message: "Please select an option",
                }
            ]}
        >
            <CustomSelect
                title="Valid driver's license"
                mode="single"
                placeholder="Select an option"
                items={driverLicenseOptions}
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Languages you speak"
            name="languages"
            rules={[
                {
                    required: true,
                    message: "Please select languages",
                }
            ]}
        >
            <CustomSelect
                title="Select languages"
                mode="multiple"
                placeholder="Select languages"
                items={languagesOptions}
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
            <Button onClick={() => push("signUp", {params: {mode: "jobPreferences"}})} type="text" size="middle"
                    className="!text-primary-700 !font-semibold !text-base">
                <ArrowLeft size="20" color={themeColors.primary[700]}/>
                Back
            </Button>
        </div>
    </Form>
}

