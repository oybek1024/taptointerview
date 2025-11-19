import {type ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";

export const HeaderTitle = ({children}: { children: ReactNode }) => {
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setTargetNode(document.getElementById("appBarHeaderTitle"));
    }, []);
    return targetNode ? (
        createPortal(
            <>
                {children}
            </>,
            targetNode,
            "appBarHeaderTitle"
        )
    ) : (
        <>TapToInterview</>
    );
};