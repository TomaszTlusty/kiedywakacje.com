import {Laugh, PartyPopper, TreePalm} from "lucide-react";
import {getNextSylwester, getNextWeekend} from "@/lib/event-dates";

export type eventGroup = {
    id: string;
    label: string;
    date: Date;
    title: string;
    provinces: string;
};

export const events = [
    {
        id: 'summer',
        label: 'wakacji',
        endLabel: 'końca wakacji',
        date: new Date('2026-06-27T00:00:00'),
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
