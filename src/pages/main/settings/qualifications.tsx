import {HeaderBreadcrumb} from "@/portals/header-breadcrumb.tsx";
import {Button, Form} from "antd";
import type {SelectItem} from "@/components/types.ts";
import {CustomSelect} from "@/components";
import {Add} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import type {UploadFile} from "antd/es/upload/interface";
import Dragger from "antd/es/upload/Dragger";

export const Qualifications = () => {
    return <div className="flex flex-col gap-6">
        <HeaderBreadcrumb
            items={[
                {
                    title: "Settings",
                    routeId: "settings"
                },
                {
                    title: "Qualifications",
                }
            ]}/>
        <div className="flex justify-between items-center">
            <p className="font-semibold text-3xl">Qualifications</p>
            <Button type="primary" size="large" variant="solid">
                Save Changes
            </Button>
        </div>
        <QualificationForm/>
    </div>
}


const educationOptions: SelectItem[] = [
    {
        label: "Master",
        value: "master",
    },
    {
        label: "Not degree",
        value: "not_degree",
    },
    {
        label: "Medium degree",
        value: "medium_degree",
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

const states: SelectItem[] = [
    {
        label: "California",
        value: "california",
    },
    {
        label: "New york",
        value: "new_york",
    },
    {
        label: "Texas",
        value: "texas",
    }
]

interface FormValues {
    education?: string;
    certifications?: UploadFile[];
    driverLicense?: string;
    languages?: string[];
    state?: string;
}

const QualificationForm = () => {
    const [form] = Form.useForm<FormValues>();
    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
    }

    return <Form<FormValues>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        className="max-w-xl"
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
            label="State"
            name="state"
            rules={[
                {
                    required: true,
                    message: "Please select an option",
                }
            ]}
        >
            <CustomSelect
                title="State"
                mode="single"
                placeholder="Select your state"
                items={states}
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
    </Form>
}