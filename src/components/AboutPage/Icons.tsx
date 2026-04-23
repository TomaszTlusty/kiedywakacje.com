"use client";
import { motion } from 'framer-motion';
import {itemVariants} from "@/components/AboutPage/AboutText";
import {FaLinkedin, FaGithub, FaXTwitter} from "react-icons/fa6";
import Link from "next/link";

export default function AboutText() {



    return (

            <motion.footer variants={itemVariants} className="mt-4">
                <div className="flex items-center justify-center gap-6">
                    <Link
                        href="https://www.linkedin.com/in/tlusty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter profile"
                        className="text-black transition-transform duration-200 hover:scale-110 hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                    >
                        <FaLinkedin size={32} />
                    </Link>

                    <Link
                        href="https://github.com/FarciarzYT"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="text-black transition-transform duration-200 hover:scale-110 hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                    >
                        <FaGithub size={32} />
                    </Link>

                    <Link
                        href="https://x.com/FarciarzYT"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter profile"
                        className="text-black transition-transform duration-200 hover:scale-110 hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                    >
                        <FaXTwitter size={32} />
                    </Link>
                </div>
            </motion.footer>
    );
}