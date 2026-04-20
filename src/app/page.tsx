import HeroButtons from "@/components/HeroPage/HeroButtons";
import AnimatedBackground from "@/components/HeroPage/AnimatedBackground";
import { ThemeToogle } from "@/components/theme-toogle";
import { HomeToggle} from "@/components/home-toggle";
import HeroText from "@/components/HeroPage/HeroText";


export default function HomePage() {


    return (
        <>
            <AnimatedBackground/>
            <main className="flex flex-col items-center justify-center px-4 pt-64 text-black dark:text-white min-h-screen overflow-y-auto">
                <HeroText/>
                <HeroButtons/>
                <ThemeToogle/>
                <HomeToggle/>
            </main>
        </>

    );
}