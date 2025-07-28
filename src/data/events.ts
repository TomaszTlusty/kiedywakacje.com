import {Laugh, PartyPopper, TreePalm} from "lucide-react";
import {getNextSylwester, getNextWeekend} from "@/lib/event-dates";

const summerStart = new Date('2026-06-22');
export const events = [
    {
        id: 'summer',
        label: 'wakacji',
        endLabel: 'końca wakacji',
        date: summerStart,
        Icon: TreePalm,
        title: 'Wakacje Letnie',
    },
    {
        id: 'newYear',
        label: 'sylwestra',
        date: getNextSylwester(),
        Icon: PartyPopper,
        title: 'Sylwester',
    },
    {
        id: 'weekend',
        label: 'weekendu',
        date: getNextWeekend(),
        Icon: Laugh,
        title: 'Najbliższy Weekend',
    },
];
