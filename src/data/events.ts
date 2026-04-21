import {Laugh, PartyPopper, TreePalm} from "lucide-react";
import {getNextSylwester, getNextWeekend} from "@/lib/event-dates";
import {IconType} from "react-icons";

export type eventGroup = {
    id: string;
    label: string;
    endLabel: string;
    date: Date;
    Icon: IconType;
    title: string;
};

export const events:eventGroup[] = [
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
        endLabel: 'końca sylwestra',
        date: getNextSylwester(),
        Icon: PartyPopper,
        title: 'Sylwester',
    },
    {
        id: 'weekend',
        label: 'weekendu',
        endLabel: 'końca weekendu',
        date: getNextWeekend(),
        Icon: Laugh,
        title: 'Najbliższy Weekend',
    },
];
