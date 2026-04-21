
import AnimatedBackground from "@/components/AboutPage/AnimatedBackground";
import { ThemeToogle } from "@/components/theme-toogle";
import { HomeToggle } from "@/components/home-toggle";
import AboutText from "@/components/AboutPage/AboutText";
export default function About() {
    return (
        <>
            <AnimatedBackground/>
            <main className="flex flex-col items-center justify-center text-black dark:text-white min-h-screen max-h-screen">
                <AboutText />
                <ThemeToogle/>
                <HomeToggle/>
            </main>
        </>
    );
}
