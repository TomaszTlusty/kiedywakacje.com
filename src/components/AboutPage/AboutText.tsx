"use client";
import Icons from "@/components/AboutPage/Icons"
import { motion } from 'framer-motion';

export default function AboutText() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            className="z-10 flex flex-col items-center gap-12 text-center font-Inter"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header variants={itemVariants}>
                <h1 className="text-5xl font-semibold text-black dark:text-white text-outline">
                    To nie jest licznik.
                </h1>
                <h2 className="mt-2 text-2xl font-medium  text-black dark:text-white sm:text-5xl text-outline">
                    To zegar egzekucji.
                </h2>
            </motion.header>

            <motion.section
                className="flex max-w-lg flex-col gap-8 text-xl font-light text-black dark:text-white sm:text-2xl"
                variants={itemVariants}
            >
                <blockquote className="italic text-black dark:text-white text-outline max-w-7xl">
                    Ludzie mają obsesję na punkcie „czekania na coś”.Wakacje, weekend, lepszy dzień. A co robisz dzisiaj? Czekasz na zbawienie?
                </blockquote>
                <p className="font-light text-black dark:text-white text-outline">
                    Patrz na ten zegar codziennie.
                    <br />
                    Nie po to, by się cieszyć.
                    <br />
                    Tylko po to, żeby poczuć presję.
                </p>
            </motion.section>
            <Icons/>
        </motion.div>
    );
}