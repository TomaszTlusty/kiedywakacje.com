
export function getNextWeekend(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = dayOfWeek === 0 ? 6 : (6 - dayOfWeek);

    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    nextSaturday.setHours(0, 0, 0, 0);

    return nextSaturday;
}


export function getNextSylwester(): Date {
    const today = new Date();
    const currentYear = today.getFullYear();
    return new Date(currentYear, 11, 31);
}



