"use client"
import {Button} from "@/components/ui/button";
import {FaSun, FaMoon} from "react-icons/fa"
import {useTheme} from "next-themes";

export function ThemeToogle() {
    const {theme, setTheme} = useTheme();
    return (

        <Button title="theme change" variant="outline" size="icon" className="rounded-full mt-4 absolute top-4 right-4 z-20 transition-all duration-300 cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <FaSun className="absolute h-10 w-10 rotate-0 scale-100 dark:rotate-90 dark:scale-0"/>
            <FaMoon className="absolute h-10 w-10 rotate-90 scale-0 dark:rotate-0 dark:scale-100"/>
            <span className={"hidden"}>theme change</span>
        </Button>
        )
}

