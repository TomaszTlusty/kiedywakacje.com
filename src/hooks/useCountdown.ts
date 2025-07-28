
import { useEffect, useState } from 'react';


/**
 * Zwraca tablicę z wartościami odliczania oraz flagę informującą o zakończeniu.
 * @returns [dni, godziny, minuty, sekundy, czyZakończone]
 */

type CountdownTuple = [number, number, number, number, boolean];
const useCountdown = (targetDate: Date): CountdownTuple => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    const getReturnValues = (countDown: number): CountdownTuple => {
        if (countDown <= 0) {
            return [0, 0, 0, 0, true];
        }
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        return [days, hours, minutes, seconds, false];
    };
    return getReturnValues(countDown);
};
export default useCountdown;