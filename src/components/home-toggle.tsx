"use client"
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FaHouse, FaCircleInfo } from "react-icons/fa6";

export function HomeToggle() {

    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";
    const handleToggle = () => {
        router.push(isHome ? "/about" : "/");
    }

    return (
        <Button
            title="about page"
            variant="outline"
            size="icon"
            className="rounded-3xl mt-4 px-10 absolute top-4 right-16 z-20 transition-all duration-300 cursor-pointer "
            onClick={handleToggle}
        >
            {isHome ? (
                <>
                    <span>Info</span>
                    <FaCircleInfo className="h-5 w-5" />
                </>
            ) : (
                <>
                    <span>Powrót</span>
                    <FaHouse className="h-5 w-5" />
                </>
            )}
        </Button>
    );
}
