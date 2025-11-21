import {type ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";

export const HeaderTitle = ({children}: { children: ReactNode }) => {
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const node = document.getElementById("appBarHeaderTitle")!
        const breadNode = document.getElementById("appBarBreadCrumb")!
        node.classList.remove("hidden");
        breadNode.classList.add("hidden");
        setTargetNode(node);
    }, []);

    return targetNode ? (
        createPortal(
            <>
                {children}
            </>,
            targetNode,
            "appBarHeaderTitle"
        )
    ) : null;
};