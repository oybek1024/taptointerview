import {PageTitle} from "@/pages/auth/components/page-title.tsx";
import {CSteps} from "@/components/CSteps.tsx";
import {CustomSelect} from "@/components/CSelect.tsx";
import type {SelectItem, SelectTreeItem} from "@/components/types.ts";
import {Button, Form, Slider} from "antd";
import {ArrowLeft} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {useRouter} from "@/hooks/useRouter.ts";


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
            },
            {
                label: "Hotel & Hospitality",
                value: 3,
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
                label: "Hotel & Sales",
                value: 5,
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

export const JobPreferences = () => {

    return <div className="flex flex-col gap-5 mt-4 pt-5 w-sm">
        <div className="flex items-center justify-center">
            <CSteps currentStep={1}/>
        </div>

        <PageTitle
            title="Job preferences"
            subtitle="Tell us what kind of work you’re looking for."
        />

        <CForm/>

    </div>
}

interface FormValues {
    jobCategory: string;
    payRange: [number, number];
    availability: string;
    startDate: string;
}

const CForm = () => {
    const {push} = useRouter();
    const [form] = Form.useForm<FormValues>();


    const onSubmit = async (values: FormValues) => {
        console.log('Values', values);
    }

    const rangeWatcher = Form.useWatch('payRange', form);

    return <Form<FormValues>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        initialValues={{
            payRange: [20, 80]
        }}
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
            <Slider
                range
                marks={rangeWatcher?.reduce((acc, val) => {
                    acc[val] = `${val}/hr`;
                    return acc;
                }, {} as Record<number, string>)}
                onChange={(val) => form.setFieldValue("payRange", val)}
            />
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
            <Button onClick={() => push("signUp", {params: {mode: "tellUsAboutYou"}})} type="text" size="middle"
                    className="!text-primary-700 !font-semibold !text-base">
                <ArrowLeft size="20" color={themeColors.primary[700]}/>
                Back
            </Button>
        </div>
    </Form>
}