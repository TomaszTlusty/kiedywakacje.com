export type WinterBreakGroup = {
    id: string;
    label: string;
    date: Date;
    title: string;
    provinces: string;
};

export const winterBreakGroups: WinterBreakGroup[] = [
    {
        id: 'winter-group-1',
        label: 'ferii',
        date: new Date('2026-01-19T00:00:00'),
        title: '19.01 - 01.02.2026',
        provinces: 'mazowieckie, pomorskie, podlaskie, świętokrzyskie, warmińsko-mazurskie'
    },
    {
        id: 'winter-group-2',
        label: 'ferii',
        date: new Date('2026-01-26T00:00:00'),
        title: '26.01 - 08.02.2026',
        provinces: 'dolnośląskie, kujawsko-pomorskie, łódzkie, zachodniopomorskie, małopolskie, opolskie'
    },
    {
        id: 'winter-group-3',
        label: 'ferii',
        date: new Date('2026-02-16T00:00:00'),
        title: '16.02 - 01.03.2026',
        provinces: 'podkarpackie, lubelskie, wielkopolskie, lubuskie, śląskie'
    }
];