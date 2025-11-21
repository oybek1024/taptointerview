import {HeaderBreadcrumb} from "@/portals/header-breadcrumb.tsx";
import {Button, Form} from "antd";
import {CustomSelect} from "@/components";
import type {SelectItem, SelectTreeItem} from "@/components/types.ts";
import {CSlider} from "@/components/CSlider.tsx";
import {Add} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import type {UploadFile} from "antd/es/upload/interface";
import Dragger from "antd/es/upload/Dragger";

export const Preferences = () => {
    return <div className="flex flex-col gap-6">
        <HeaderBreadcrumb
            items={[
                {
                    title: "Settings",
                    routeId: "settings"
                },
                {
                    title: "Preferences",
                }
            ]}/>
        <div className="flex justify-between items-center">
            <p className="font-semibold text-3xl">Preferences</p>
            <Button type="primary" size="large" variant="solid">
                Save Changes
            </Button>
        </div>
        <PreferenceForm/>

    </div>
}

interface FormValues {
    jobCategory: string;
    payRange: [number, number];
    availability: string;
    startDate: string;
    resume?: UploadFile;
}

const categories: SelectTreeItem[] = [
    {
        title: "Hospitality",
        prefix: "categories",
        items: [
            {
                label: "Restaurants & Cafes",
                value: 1,
            },
            {
                label: "Bartending & Serving",
                value: 2,
            }
        ]
    },
    {
        title: "Retail & Sales",
        prefix: "categories",
        items: [
            {
                label: "Sales",
                value: 4,
            },
            {
                label: "Restaurants & Retail",
                value: 6,
            },
            {
                label: "Serving & Retail",
                value: 7,
            }
        ]
    },
]

const availabilities: SelectItem[] = [
    {
        label: 'Day Shift',
        value: 1,
    },
    {
        label: 'Evening Shift',
        value: 2,
    },
    {
        label: 'Night Shift',
        value: 3,
    },
    {
        label: 'Weekends',
        value: 4,
    }
]

const startDates: SelectItem[] = [
    {
        label: 'Immediately',
        value: 1,
    },
    {
        label: 'Within 2 weeks',
        value: 2,
    },
]

const PreferenceForm = () => {
    const [form] = Form.useForm<FormValues>();

    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
    }

    return <Form<FormValues>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        initialValues={{
            payRange: [20, 80]
        }}
        className="max-w-xl"
    >
        <Form.Item<FormValues>
            label="Job category"
            name="jobCategory"
            rules={[
                {
                    required: true,
                    message: "Please enter categories",
                }
            ]}
        >
            <CustomSelect
                title="Select job categories"
                mode="multiple"
                placeholder={"Select job categories"}
                items={categories}
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Preferred pay range"
            name="payRange"
            rules={[
                {
                    required: true,
                    message: "Please enter pay range",
                }
            ]}
        >
            <CSlider/>
        </Form.Item>

        <Form.Item<FormValues>
            label="Availability"
            name="availability"
            rules={[
                {
                    required: true,
                    message: "Please enter availabilities",
                }
            ]}
        >
            <CustomSelect
                title="Select your availability"
                mode="multiple"
                placeholder={"Select your availability"}
                items={availabilities}
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Start date"
            name="startDate"
            rules={[
                {
                    required: true,
                    message: "Please enter start date",
                }
            ]}
        >
            <CustomSelect
                title="Select when you can start"
                mode="single"
                placeholder={"Select when you can start"}
                items={startDates}
            />
        </Form.Item>

        <Form.Item<FormValues>
            label="Resume (optional)"
            name="resume"
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
    </Form>
}