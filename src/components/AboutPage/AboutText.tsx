"use client";
import Icons from "@/components/AboutPage/Icons";
import { motion, Variants } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

export const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

export default function AboutText() {
    return (
        <motion.div
            className="z-10 flex flex-col items-center gap-6 text-center font-Inter"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header variants={itemVariants}>
                <h1 className="text-5xl font-semibold text-black dark:text-white text-outline">
                    Skąd się to wzięło?
                </h1>
                <h2 className="mt-2 text-2xl font-medium text-black dark:text-white sm:text-5xl text-outline">
                    Z nudów. I z miłości do wakacji.
                </h2>
            </motion.header>

            <motion.section
                className="flex max-w-lg flex-col gap-8 text-xl font-light text-black dark:text-white sm:text-2xl"
                variants={itemVariants}
            >
                <blockquote className="italic text-black dark:text-white max-w-7xl text-outline">
                    &#34;Ile jeszcze do wakacji?&#34; - usłyszałem to pytanie setki razy.
                    Od kolegów, od siebie samego, gdzieś w środku marca kiedy
                    zima nie chce odpuścić.
                </blockquote>
                <p className="font-light text-black dark:text-white text-outline">
                    Zamiast za każdym razem liczyć w głowie,
                    <br />
                    zrobiłem stronę. Dla siebie, a potem dla was.
                </p>
            </motion.section>
            <Icons />
        </motion.div>
    );
}