import {Slider} from "antd";
import {useMemo} from "react";

interface Props {
    value?: number[];
    onChange?: (value: number[]) => void;
}

export const CSlider = ({value, onChange}: Props) => {
    const markData = useMemo(() => value?.reduce((acc, val) => {
        acc[val] = `${val}/hr`;
        return acc;
    }, {} as Record<number, string>), [value])

    return <Slider
        range
        value={value}
        marks={markData}
        onChange={onChange!}
    />
}