import {motion} from "framer-motion";
import {type ReactNode, useEffect, useRef, useState} from "react";

export const Collapse = ({open, children}: { open: boolean; children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">(0);

    useEffect(() => {
        if (open) {
            const scrollHeight = ref.current?.scrollHeight ?? 0;
            setHeight(scrollHeight);

            // after animation ends -> keep auto so content change won't break it
            const timer = setTimeout(() => setHeight("auto"), 50);
            return () => clearTimeout(timer);
        } else {
            // measure before closing
            const full = ref.current?.scrollHeight ?? 0;
            setHeight(full);

            // next tick → animate to 0
            requestAnimationFrame(() => setHeight(0));
        }
    }, [open]);


    return (
        <motion.div
            initial={false}
            animate={{height}}
            variants={{
                open: {height: "auto", opacity: 1},
                closed: {height: 0, opacity: 0}
            }}
            transition={{
                duration: 0.25,
                ease: "easeOut"
            }}
            style={{overflow: "hidden"}}
        >
            {children}
        </motion.div>
    );
};