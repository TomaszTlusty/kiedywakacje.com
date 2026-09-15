// Dane strony. Używane przez build.js (Node) — nie trafia do przeglądarki.

// ── daty ruchome ───────────────────────────────────────────────
function getNextWeekend() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
    const d = new Date(today);
    d.setDate(today.getDate() + daysUntilSaturday);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getNextSylwester() {
    return new Date(new Date().getFullYear(), 11, 31);
}

function getNextChristmas() {
    const today = new Date(), year = today.getFullYear();
    const thisYear = new Date(year, 11, 24);
    return today < thisYear ? thisYear : new Date(year + 1, 11, 24);
}

// Algorytm Anonymous Gregorian
function calculateEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

function getNextEaster() {
    const today = new Date();
    const thisYear = calculateEaster(today.getFullYear());
    return today < thisYear ? thisYear : calculateEaster(today.getFullYear() + 1);
}

function getNextMajowka() {
    const today = new Date(), year = today.getFullYear();
    const thisYear = new Date(year, 4, 1);
    return today < thisYear ? thisYear : new Date(year + 1, 4, 1);
}

// Daty z harmonogramów CKE/MEN — aktualizować po ogłoszeniu nowego kalendarza
const maturaDates = [
    new Date('2026-05-04T00:00:00'),
    new Date('2027-05-04T00:00:00'), // orientacyjny termin
];

const egzaminOsmoklasistyDates = [
    new Date('2026-04-14T00:00:00'),
    new Date('2027-04-13T00:00:00'), // orientacyjny termin
];

// Wybrane polskie długie weekendy — aktualizować co roku
const dlugiWeekendDates = [
    new Date('2026-11-01T00:00:00'), // Wszystkich Świętych (nd)
    new Date('2026-12-24T00:00:00'), // Wigilia/Boże Narodzenie (czw-sob)
    new Date('2027-01-01T00:00:00'), // Nowy Rok (pt)
    new Date('2027-03-27T00:00:00'), // Wielkanoc (sob-pn)
    new Date('2027-05-01T00:00:00'), // Majówka (sob-pn)
];

function pickNext(dates) {
    const today = new Date();
    const sorted = [...dates].sort((a, b) => a - b);
    return sorted.find(d => d > today) ?? sorted[sorted.length - 1];
}

// ── wydarzenia na stronie głównej ──────────────────────────────
const events = [
    {
        id: 'summer',
        label: 'wakacji',
        endLabel: 'końca wakacji',
        date: new Date('2027-06-26T00:00:00'),
        endDate: new Date('2027-08-31T00:00:00'),
        icon: 'fa-solid fa-umbrella-beach',
        title: 'Wakacje Letnie',
    },
    {
        id: 'newYear',
        label: 'sylwestra',
        endLabel: 'końca sylwestra',
        date: getNextSylwester(),
        dateFn: 'nextSylwester', // liczone w przeglądarce — data zmienia się z rokiem
        icon: 'fa-solid fa-champagne-glasses',
        title: 'Sylwester',
    },
    {
        id: 'weekend',
        label: 'weekendu',
        endLabel: 'końca weekendu',
        date: getNextWeekend(),
        dateFn: 'nextWeekend', // liczone w przeglądarce — inaczej data zamarza na dniu builda
        icon: 'fa-solid fa-face-laugh',
        title: 'Najbliższy Weekend',
    },
];

const winterBreakGroups = [
    {
        id: 'winter-group-1',
        label: 'ferii',
        date: new Date('2027-01-18T00:00:00'),
        title: '18.01 - 31.01.2027',
        provinces: 'podkarpackie, podlaskie, dolnośląskie, łódzkie, śląskie, opolskie',
    },
    {
        id: 'winter-group-2',
        label: 'ferii',
        date: new Date('2027-02-01T00:00:00'),
        title: '01.02 - 14.02.2027',
        provinces: 'mazowieckie, pomorskie, świętokrzyskie, lubelskie',
    },
    {
        id: 'winter-group-3',
        label: 'ferii',
        date: new Date('2027-02-15T00:00:00'),
        title: '15.02 - 28.02.2027',
        provinces: 'lubuskie, kujawsko-pomorskie, warmińsko-mazurskie, wielkopolskie, zachodniopomorskie, małopolskie',
    },
];

const faqs = [
    {
        id: 1,
        question: 'Co to jest kiedywakacje.com?',
        answer: 'kiedywakacje.com to serwis z precyzyjnym odliczaniem do najważniejszych dni wolnych od szkoły — wakacji letnich, ferii zimowych, świąt oraz długich weekendów. Znajdziesz tu dokładną liczbę dni, godzin i minut do upragnionego odpoczynku.',
    },
    {
        id: 2,
        question: 'Do jakich dat można odliczać?',
        answer: 'Odliczamy do wakacji letnich, ferii zimowych, Bożego Narodzenia, Wielkanocy, sylwestra, a także do egzaminów ósmoklasisty i matur. Lista wydarzeń jest aktualizowana co roku zgodnie z oficjalnym kalendarzem roku szkolnego MEN.',
    },
    {
        id: 3,
        question: 'Skąd pochodzą daty roku szkolnego?',
        answer: 'Terminy wakacji i dni wolnych pobieramy z oficjalnego kalendarza roku szkolnego publikowanego przez Ministerstwo Edukacji Narodowej. Daty są aktualizowane niezwłocznie po ogłoszeniu nowego kalendarza.',
    },
    {
        id: 4,
        question: 'Czy mogę dodać stronę do ekranu głównego telefonu?',
        answer: 'Tak. W przeglądarce mobilnej (Chrome lub Safari) wybierz opcję „Dodaj do ekranu głównego". Dzięki temu kiedywakacje.com będzie dostępne jak zwykła aplikacja — jednym tapnięciem.',
    },
    {
        id: 5,
        question: 'Jak zgłosić błąd lub zaproponować nową funkcję?',
        answer: 'Napisz do nas przez mail dostępny w stopce strony. Czytamy każdą wiadomość i staramy się odpowiadać najszybciej jak to możliwe.',
    },
];

const socials = [
    { label: 'GitHub', href: 'https://github.com/TomaszTlusty', icon: 'fa-brands fa-github' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/tlusty/', icon: 'fa-brands fa-linkedin' },
    { label: 'Twitter / X', href: 'https://x.com/TlustyTomasz', icon: 'fa-brands fa-x-twitter' },
];

module.exports = {
    events, winterBreakGroups, faqs, socials,
    getNextSylwester, getNextChristmas, getNextEaster, getNextMajowka,
    getNextMatura: () => pickNext(maturaDates),
    getNextEgzaminOsmoklasisty: () => pickNext(egzaminOsmoklasistyDates),
    getNextDlugiWeekend: () => pickNext(dlugiWeekendDates),
};
