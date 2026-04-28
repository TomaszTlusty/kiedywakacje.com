import {FaXTwitter, FaGithub, FaLinkedin, FaMailchimp} from "react-icons/fa6";
import Link from "next/link";
import { MdOutgoingMail } from "react-icons/md";


export default function Footer() {
    const socials = [
        {
            label: "GitHub",
            href: "https://github.com/TomaszTlusty",
            icon: FaGithub,
        },
        {
            label: "Linkedin",
            href: "https://www.linkedin.com/in/tlusty/",
            icon: FaLinkedin,
        },
        {
            label: "Twitter / X",
            href: "https://x.com/TlustyTomasz",
            icon: FaXTwitter,
        },
    ];

    return (
        <footer className="relative bg-yellow-50/50 dark:bg-black border-t border-yellow-200 dark:border-blue-900 py-2 justify-between items-center flex flex-row mt-32 overflow-hidden backdrop-blur-sm">
            <Link href="mailto:lider@kiedywakacje.com" className="mx-6 text-lg items-center font-black sm:flex-row sm:flex gap-2 text-black/80 dark:text-white/80 leading-none whitespace-nowrap ">
                <span className={"hidden sm:block"}>Napisz do nas tutaj</span>
                <MdOutgoingMail size={22}/>
            </Link>
            <div className="flex flex-row mx-6 gap-2">
                {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                    <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="rounded-xl transition-all duration-200 hover:scale-110
                        text-black/80 hover:text-yellow-500
                        dark:text-white/80 dark:hover:text-blue-300"
                        >
                        <Icon size={22} />
                    </Link>
                    );
                })}
            </div>
        </footer>
    );
}
