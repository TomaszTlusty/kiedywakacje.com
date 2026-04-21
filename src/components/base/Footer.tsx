import {FaXTwitter, FaGithub, FaLinkedin} from "react-icons/fa6";


export default function Footer() {
    const socials = [
        {
            label: "GitHub",
            href: "https://github.com/FarciarzYT",
            icon: FaGithub,
        },
        {
            label: "Linkedin",
            href: "https://www.linkedin.com/in/tlusty/",
            icon: FaLinkedin,
        },
        {
            label: "Twitter / X",
            href: "https://x.com/FarciarzYT",
            icon: FaXTwitter,
        },
    ];

    return (
        <footer className="relative bg-yellow-50/50 dark:bg-zinc-900/50 border-t border-yellow-200 dark:border-blue-900 pt-2 justify-between items-center flex flex-row mt-32 overflow-hidden backdrop-blur-sm">
            <h1 className="text-3xl font-black text-yellow-200 dark:text-blue-900 leading-none whitespace-nowrap hidden sm:block">
                Kiedy Wakacje?
            </h1>
            <div className="flex flex-row mx-6 gap-2">
                {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="rounded-xl transition-all duration-200 hover:scale-110
                        text-yellow-400 hover:text-yellow-500
                        dark:text-blue-400 dark:hover:text-blue-300"
                        >
                        <Icon size={22} />
                    </a>
                    );
                })}
            </div>
        </footer>
    );
}
