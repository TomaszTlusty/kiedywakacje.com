'use client';
import useCountdown from '@/hooks/useCountdown';
import { useIsClient } from 'usehooks-ts';
import NumberFlow from '@number-flow/react'
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import {useState} from "react";
export default function AlternateCountdown(props: { toDate: Date }) {
    const [days, hours, minutes, seconds, isFinished] = useCountdown(props.toDate);
    const isClient = useIsClient();
    const { width, height } = useWindowSize();
    const [isConfettiRunning, setIsConfettiRunning] = useState(true);

    return isClient ? (
        isFinished ? (
            <>
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={false}
                    run={isConfettiRunning}
                    onConfettiComplete={() => setIsConfettiRunning(false)}
                    gravity={0.4}
                />
                <p className="text-xl sm:2xl font-medium md:text-4xl py-6 jumping-fix z-10 select-none ">
                    🎉 Koniec odliczania, początek odpoczynku 🎉
                </p>
            </>
        ) : (
            <>
                <div className="flex items-center gap-6 font-lato jumping-fix z-10 select-none">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-semibold md:text-5xl font-mono"><NumberFlow  transformTiming={{ duration: 200, easing: 'ease-out' }} value={days}/></span>
                        <span className="text-lg font-light  z-10 ">dni</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-semibold md:text-5xl font-mono"><NumberFlow transformTiming={{ duration: 200, easing: 'ease-out' }} value={hours}/></span>
                        <span className="text-lg font-light  z-10">godzin</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-semibold md:text-5xl font-mono"><NumberFlow transformTiming={{ duration: 200, easing: 'ease-out' }} value={minutes}/></span>
                        <span className="text-lg font-light  z-10">minut</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-semibold md:text-5xl font-mono"><NumberFlow transformTiming={{ duration: 200, easing: 'ease-out' }} value={seconds}/></span>
                        <span className="text-lg font-light  z-10">sekund</span>
                    </div>
                </div>
            </>
        )
    ) : (
        <>
            <div className="flex items-center gap-6 font-lato jumping-fix  z-10 min-h-32 select-none">
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-semibold md:text-5xl font-mono">000</span>
                    <span className="text-lg font-light  z-10 ">dni</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-semibold md:text-5xl font-mono">00</span>
                    <span className="text-lg font-light  z-10">godzin</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-semibold md:text-5xl font-mono">00</span>
                    <span className="text-lg font-light  z-10">minut</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-semibold md:text-5xl font-mono">00</span>
                    <span className="text-lg font-light  z-10">sekund</span>
                </div>
            </div>
        </>
    );
}
