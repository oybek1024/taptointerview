import {LessOrMore, RangeFilter, SearchInput, SelectFilter} from "@/components";
import type {SelectItem, SelectTreeItem} from "@/components/types.ts";
import {useFilter} from "@/hooks/useFilter.ts";
import {Activity, useState} from "react";

type FilterState = {
    search?: string;
    categories?: (string | number)[];
    availabilities?: (string | number)[];
    payRange?: number[];
    location?: string | number;
    sortBy?: string | number;
    startDate?: string | number;
};


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


export const JobFeedFilters = () => {
    const [more, setMore] = useState<boolean>(false);
    const {filters, setFilter} = useFilter<FilterState>({
        payRange: [10, 70],
    })


    return <div className="flex gap-2 flex-wrap">
        <SearchInput
            placeholder="Search jobs or companies"
            value={filters.search}
            onChange={(val) => setFilter("search", val)}
        />
        <SelectFilter
            title="Category"
            mode="multiple"
            items={categories}
            value={filters.categories}
            onChange={(val) => setFilter("categories", val)}
        />
        <RangeFilter
            title="Pay Range"
            onChange={(val) => setFilter("payRange", val)}
            value={filters.payRange}
        />
        <Activity mode={more ? 'visible' : 'hidden'}>
            <SelectFilter
                title="Availability"
                mode="multiple"
                items={availabilities}
                value={filters.availabilities}
                onChange={(val) => setFilter("availabilities", val)}
            />
            <SelectFilter
                title="Start date"
                mode="single"
                items={startDates}
                value={filters.startDate}
                onChange={(val) => setFilter("startDate", val)}
            />
        </Activity>
        <LessOrMore open={more} onClick={() => setMore(!more)}/>
    </div>
}