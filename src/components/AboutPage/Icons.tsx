"use client";
import { motion } from 'framer-motion';
import {itemVariants} from "@/components/AboutPage/AboutText";
import {FaLinkedin, FaGithub, FaXTwitter} from "react-icons/fa6";
import Link from "next/link";

export default function AboutText() {

    const socialLinks = [
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/tlusty/",
            icon: FaLinkedin,
        },
        {
            label: "GitHub",
            href: "https://github.com/TomaszTlusty",
            icon: FaGithub,
        },
        {
            label: "Twitter / X",
            href: "https://x.com/TlustyTomasz",
            icon: FaXTwitter,
        },
    ];


    return (

            <motion.footer variants={itemVariants} className="mt-4">
                <div className="flex items-center justify-center gap-6">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="text-black transition-transform duration-200 hover:scale-110 hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                        >
                            <link.icon size={32} />
                        </Link>
                    ))}
                </div>
            </motion.footer>
    );
}