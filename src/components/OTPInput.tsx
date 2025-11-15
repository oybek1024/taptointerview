import {Input} from "antd";
import "@/otp.css"
import {useEffect} from "react";


const {OTP} = Input;

interface Props {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string[]) => void;
}

export const OTPInput = ({value, placeholder = '0', onChange, onInput}: Props) => {

    const init = () => {
        const nodes = document.querySelectorAll(".ant-otp-input") as NodeListOf<HTMLInputElement>;
        nodes.forEach((node, index) => {
            node.placeholder = placeholder
            if (index === 0) {
                node.focus()
            }
        })
    }
    useEffect(init, [placeholder])


    return <OTP
        value={value}
        variant="filled"
        size="large"
        length={4}
        inputMode="numeric"
        className="w-full custom-otp"
        formatter={(str) => str.toUpperCase()}
        onChange={onChange}
        onInput={onInput}
    />

}