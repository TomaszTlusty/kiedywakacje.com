// Treść stron wydarzeń i artykułów (markdown). Build-time only.
const {
    events, winterBreakGroups,
    getNextSylwester, getNextChristmas, getNextEaster, getNextMajowka,
    getNextMatura, getNextEgzaminOsmoklasisty, getNextDlugiWeekend,
} = require('./data.js');

const summerDate = events.find(e => e.id === 'summer').date;
const winterDate = winterBreakGroups[0].date;
const sylwesterDate = getNextSylwester();
const christmasDate = getNextChristmas();
const easterDate = getNextEaster();
const majowkaDate = getNextMajowka();
const maturaDate = getNextMatura();
const egzaminDate = getNextEgzaminOsmoklasisty();
const dlugiWeekendDate = getNextDlugiWeekend();

const eventPages = [
    {
        slug: 'wakacje',
        h1: 'Ile dni do wakacji letnich?',
        label: 'wakacji letnich',
        date: summerDate,
        breadcrumbLabel: 'Wakacje letnie',
        metaTitle: `Ile dni do wakacji ${summerDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Sprawdź precyzyjne odliczanie do wakacji letnich ${summerDate.getFullYear()} — ile dni, godzin i minut do pierwszego dnia wolnego od szkoły. Termin z kalendarza MEN.`,
        content: `Wakacje letnie to najdłuższa przerwa w polskim roku szkolnym — trwają ponad dwa miesiące, od końca czerwca do początku września. Termin wakacji wyznacza Ministerstwo Edukacji Narodowej w kalendarzu roku szkolnego; w roku ${summerDate.getFullYear()} uczniowie cieszą się wolnym od ${summerDate.getDate()} czerwca.\n\nSprawdź powyżej, ile dokładnie dni, godzin i minut dzieli Cię od pierwszego dnia wakacji — licznik aktualizuje się co sekundę.`,
    },
    {
        slug: 'ferie-zimowe',
        h1: 'Ile dni do ferii zimowych?',
        label: 'ferii zimowych',
        date: winterDate,
        breadcrumbLabel: 'Ferie zimowe',
        metaTitle: `Ile dni do ferii zimowych ${winterDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do ferii zimowych ${winterDate.getFullYear()} — sprawdź, kiedy Twoje województwo ma ferie i ile dni zostało do przerwy śródlekcyjnej.`,
        content: `Ferie zimowe to dwutygodniowa przerwa w nauce przypadająca w środku roku szkolnego — zazwyczaj w drugiej połowie stycznia i w lutym. Ministerstwo Edukacji Narodowej dzieli kraj na kilka grup województw, które mają ferie w różnych terminach, by rozładować ruch w popularnych miejscach.\n\nW roku szkolnym ${winterDate.getFullYear() - 1}/${winterDate.getFullYear()} najwcześniejsze ferie startują ${winterDate.getDate()} ${winterDate.getMonth() === 0 ? 'stycznia' : 'lutego'} w województwach: podkarpackim, podlaskim, dolnośląskim, łódzkim, śląskim i opolskim. Licznik powyżej pokazuje odliczanie do tego terminu.`,
    },
    {
        slug: 'sylwester',
        h1: 'Ile dni do sylwestra?',
        label: 'sylwestra',
        date: sylwesterDate,
        breadcrumbLabel: 'Sylwester',
        metaTitle: `Ile dni do sylwestra ${sylwesterDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do sylwestra ${sylwesterDate.getFullYear()} — ile dni, godzin i sekund do 31 grudnia i powitania Nowego Roku. Sprawdź precyzyjny licznik.`,
        content: `Sylwester — ostatni dzień roku, 31 grudnia — to jedna z najbardziej wyczekiwanych nocy w roku. Polacy witają Nowy Rok przy szampanie, ogniach sztucznych i rodzinnych lub towarzyskich spotkaniach. Tradycja wspólnego odliczania do północy łączy ludzi na całym świecie.\n\nNiezależnie od tego, czy planujesz wyjazd na sylwestrową imprezę czy spokojny wieczór w domu, powyższy licznik pokaże Ci co do sekundy, ile czasu zostało do magicznego momentu przejścia z ${sylwesterDate.getFullYear()} w ${sylwesterDate.getFullYear() + 1} rok.`,
    },
    {
        slug: 'boze-narodzenie',
        h1: 'Ile dni do Bożego Narodzenia?',
        label: 'Bożego Narodzenia',
        date: christmasDate,
        breadcrumbLabel: 'Boże Narodzenie',
        metaTitle: `Ile dni do Bożego Narodzenia ${christmasDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do Bożego Narodzenia ${christmasDate.getFullYear()} — ile dni, godzin i minut do świąt. Sprawdź precyzyjny licznik na kiedywakacje.com.`,
        content: `Boże Narodzenie to największe rodzinne święto w Polsce. 25 i 26 grudnia są dniami ustawowo wolnymi od pracy i nauki, a szkoły zamykają się zazwyczaj już 23 lub 24 grudnia, dając uczniom kilkudniową przerwę świąteczną. W ${christmasDate.getFullYear()} roku Wigilia przypada 24 grudnia.\n\nŚwięta Bożego Narodzenia to czas kolacji wigilijnej, wymiany prezentów i rodzinnych spotkań. Tradycyjne potrawy — barszcz czerwony, pierogi, karp i makowiec — pojawiają się na polskich stołach co roku w grudniu.`,
    },
    {
        slug: 'wielkanoc',
        h1: 'Ile dni do Wielkanocy?',
        label: 'Wielkanocy',
        date: easterDate,
        breadcrumbLabel: 'Wielkanoc',
        metaTitle: `Ile dni do Wielkanocy ${easterDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do Wielkanocy ${easterDate.getFullYear()} — kiedy wypada Wielkanoc i ile dni zostało do świąt wielkanocnych. Sprawdź precyzyjny licznik.`,
        content: `Wielkanoc to ruchome święto chrześcijańskie, którego data zmienia się każdego roku i zależy od cyklu księżycowego. Wielka Niedziela i Wielki Poniedziałek (Śmigus-Dyngus) są w Polsce dniami ustawowo wolnymi od pracy i nauki. W ${easterDate.getFullYear()} roku Wielkanoc wypada ${easterDate.getDate()} ${['stycznia','lutego','marca','kwietnia','maja','czerwca'][easterDate.getMonth()]}.\n\nTradycje wielkanocne w Polsce to święcenie pokarmów w Wielką Sobotę, śniadanie wielkanocne z jajkami, żurkiem i wędliną, a także zabawa śmigusem-dyngusem polegająca na wzajemnym polewaniu się wodą. Wiele rodzin wyjeżdża na ten czas poza miasto.`,
    },
    {
        slug: 'majowka',
        h1: 'Ile dni do majówki?',
        label: 'majówki',
        date: majowkaDate,
        breadcrumbLabel: 'Majówka',
        metaTitle: `Ile dni do majówki ${majowkaDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do majówki ${majowkaDate.getFullYear()} — kiedy zaczyna się długi weekend majowy i ile dni zostało. Sprawdź precyzyjny licznik na kiedywakacje.com.`,
        content: `Majówka to potoczna nazwa długiego weekendu na przełomie kwietnia i maja, powstałego z połączenia dwóch świąt: Święta Pracy (1 maja) i Święta Konstytucji 3 Maja. W zależności od tego, na jakie dni tygodnia wypadają te daty, majówka może trwać od trzech do nawet pięciu dni wolnych z rzędu.\n\nW ${majowkaDate.getFullYear()} roku Święto Pracy wypada ${majowkaDate.getDate()} maja. Majówka tradycyjnie kojarzy się z pierwszymi grillami, wyjazdami za miasto i otwarciem sezonu turystycznego.`,
    },
    {
        slug: 'matura',
        h1: 'Ile dni do matury?',
        label: 'matury',
        date: maturaDate,
        breadcrumbLabel: 'Matura',
        metaTitle: `Ile dni do matury ${maturaDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do matury ${maturaDate.getFullYear()} — ile dni zostało do egzaminu dojrzałości. Sprawdź precyzyjny licznik i zacznij przygotowania na czas.`,
        content: `Matura to egzamin dojrzałości zdawany przez uczniów szkół ponadpodstawowych na zakończenie edukacji w liceum lub technikum. Organizuje ją Centralna Komisja Egzaminacyjna zgodnie z harmonogramem ogłaszanym w poprzednim roku szkolnym. Egzaminy odbywają się zazwyczaj w maju — najpierw egzaminy ustne, potem pisemne.\n\nWyniki matury decydują o możliwości ubiegania się o przyjęcie na studia wyższe — im wyższy wynik procentowy, tym lepsze szanse na preferowany kierunek. Orientacyjny termin matury ${maturaDate.getFullYear()} to pierwsza dekada maja; szczegółowy harmonogram zostanie opublikowany przez CKE.`,
    },
    {
        slug: 'egzamin-osmoklasisty',
        h1: 'Ile dni do egzaminu ósmoklasisty?',
        label: 'egzaminu ósmoklasisty',
        date: egzaminDate,
        breadcrumbLabel: 'Egzamin ósmoklasisty',
        metaTitle: `Ile dni do egzaminu ósmoklasisty ${egzaminDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do egzaminu ósmoklasisty ${egzaminDate.getFullYear()} — ile dni zostało do sprawdzianu z języka polskiego, matematyki i języka obcego.`,
        content: `Egzamin ósmoklasisty to obowiązkowy sprawdzian wiedzy przeprowadzany wśród uczniów kończących ósmą klasę szkoły podstawowej. Przeprowadza go Centralna Komisja Egzaminacyjna; egzamin obejmuje trzy przedmioty: język polski, matematykę oraz wybrany język obcy nowożytny.\n\nWyniki egzaminu ósmoklasisty mają bezpośredni wpływ na przyjęcie do szkoły ponadpodstawowej. Egzamin odbywa się zazwyczaj w połowie kwietnia — orientacyjny termin na rok ${egzaminDate.getFullYear()} to drugi lub trzeci tydzień miesiąca. Oficjalny harmonogram ogłosi MEN w roku szkolnym ${egzaminDate.getFullYear() - 1}/${egzaminDate.getFullYear()}.`,
    },
    {
        slug: 'dlugi-weekend',
        h1: 'Ile dni do długiego weekendu?',
        label: 'długiego weekendu',
        date: dlugiWeekendDate,
        breadcrumbLabel: 'Długi weekend',
        metaTitle: `Ile dni do długiego weekendu ${dlugiWeekendDate.getFullYear()}? Odliczanie | Kiedywakacje.com`,
        metaDescription: `Odliczanie do najbliższego długiego weekendu — kiedy następny długi weekend w Polsce i ile dni zostało. Sprawdź precyzyjny licznik na kiedywakacje.com.`,
        content: `Długi weekend w Polsce to każda sytuacja, gdy dzień ustawowo wolny od pracy lub nauki wypada blisko weekendu, tworząc kilkudniową przerwę. Polskie prawo przewiduje kilkanaście świąt państwowych i kościelnych — Wszystkich Świętych, Święto Niepodległości, Boże Ciało czy Wniebowzięcie NMP — które regularnie tworzą takie okazje.\n\nNajbliższy długi weekend w ${dlugiWeekendDate.getFullYear()} roku to idealna okazja na krótki wyjazd za miasto, odwiedziny rodziny lub po prostu dłuższy odpoczynek od codziennych obowiązków. Sprawdź powyżej, ile dokładnie czasu pozostało.`,
    },
];

module.exports = { eventPages };
