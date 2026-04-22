import HeroButtons from "@/components/HeroPage/HeroButtons";
import AnimatedBackground from "@/components/HeroPage/AnimatedBackground";
import { ThemeToogle } from "@/components/theme-toogle";
import { HomeToggle} from "@/components/home-toggle";
import HeroText from "@/components/HeroPage/HeroText";
import {Articles} from "@/components/articles/Articles"
import AltFooter from "@/components/base/Footer";


export default function HomePage() {


    return (
        <>
            <AnimatedBackground/>
            <main className="flex flex-col items-center justify-center px-4 pt-48 text-black dark:text-white min-h-screen scroll-auto min-[100vh]">
                <HeroText/>
                <HeroButtons/>
                <ThemeToogle/>
                <HomeToggle/>
            </main>
            <Articles/>
            <AltFooter/>
        </>

    );
}