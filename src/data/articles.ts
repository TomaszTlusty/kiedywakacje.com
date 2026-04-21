import {IconType} from "react-icons";
import { TbTargetArrow } from "react-icons/tb";
import { FaMapMarkedAlt} from "react-icons/fa";
import { FaTent } from "react-icons/fa6";
import React from "react";

type Article = {
    id: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    emoji: React.ComponentType<{ size?: number; className?: string }>;
};

 const articles: Article[] = [
    {
        id: '10-miejsc-na-wakacje',
        title: '10 miejsc w Polsce, które musisz odwiedzić w te wakacje',
        description: 'Nie wiesz gdzie jechać? Zebraliśmy 10 najpiękniejszych miejsc w Polsce idealnych na letni wypoczynek.',
        date: '2025-06-01',
        readTime: '4 min',
        emoji: FaTent,
    },
    {
        id: 'rzeczy-do-zrobienia-na-wakacjach',
        title: '15 rzeczy, które musisz zrobić w te wakacje',
        description: 'Lista rzeczy, które sprawią że te wakacje będą niezapomniane od małych przyjemności po wielkie przygody.',
        date: '2025-06-10',
        readTime: '3 min',
        emoji: FaMapMarkedAlt,
    },
    {
        id: 'jak-nie-nudzic-sie-na-wakacjach',
        title: 'Jak nie nudzić się na wakacjach? 20 pomysłów na każdą kieszeń',
        description: 'Nudne wakacje? Niemożliwe. Mamy 20 pomysłów dla każdego czy wolisz aktywny wypoczynek czy totalny relaks.',
        date: '2025-06-15',
        readTime: '5 min',
        emoji: TbTargetArrow,
    },
];
export default articles