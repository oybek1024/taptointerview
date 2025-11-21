import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {Breadcrumb} from "antd";
import {ArrowRight2} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {useRouter} from "@/hooks/useRouter.ts";

interface Item {
    title: string;
    routeId?: string;
}

interface Props {
    items: Item[];
    onClick?: (item: Item) => void;
}

export const HeaderBreadcrumb = ({items, onClick}: Props) => {
    const {push} = useRouter()
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const node = document.getElementById("appBarBreadCrumb")!
        const titleNode = document.getElementById("appBarHeaderTitle")!
        node.classList.remove("hidden");
        titleNode.classList.add("hidden");
        setTargetNode(node);
    }, []);

    const click = (item: Item) => {
        onClick?.(item)
        if (item.routeId) {
            push(item.routeId)
        }
    }


    return targetNode ? (
        createPortal(
            <>
                <Breadcrumb
                    separator={<ArrowRight2 size="16" color={themeColors.gray[300]}
                                            className="transform translate-y-1"/>}
                    items={items.map((item, index) => ({
                        title: items.length - 1 > index ?
                            <a
                                onClick={() => click(item)}
                                className="text-sm text-gray-600 font-medium">{item.title}
                            </a> : <span className="text-sm text-primary font-semibold">{item.title}</span>
                    }))}
                />
            </>,
            targetNode,
            "appBarBreadCrumb"
        )
    ) : (
        <>TapToInterview</>
    );
};