/**
 * Sämtliche Inhalte der Website. Statisch, lokal, ohne externe Datenquellen.
 * Alle Fakten sind evidenzbasiert und mit Quellenkontext versehen.
 */
import type { LucideIcon } from "lucide-react";
import {
  TrendingUp, Layers, Landmark, Home, Gem, Bitcoin, PiggyBank, Rocket,
  Brain, Users, Flame, Eye, HeartPulse, Cpu, Bot, Wind, Orbit, Dna, Atom, Search,
} from "lucide-react";

/* ---------------------------------- Wirtschaftswelt ---------------------------------- */

export interface AssetClass {
  id: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  chancen: string[];
  risiken: string[];
  historie: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  hue: string;
}

export const assetClasses: AssetClass[] = [
  {
    id: "aktien",
    name: "Aktien",
    icon: TrendingUp,
    tagline: "Anteile an echten Unternehmen",
    description:
      "Eine Aktie ist ein Miteigentumsanteil an einem Unternehmen. Wer Aktien hält, profitiert über Kurssteigerungen und Dividenden direkt vom unternehmerischen Erfolg.",
    chancen: [
      "Langfristig höchste Realrenditen aller großen Anlageklassen",
      "Dividenden als laufender Ertrag (MSCI World: Ø ca. 1,8 % p. a.)",
      "Schutz vor Inflation durch reale Unternehmenswerte",
    ],
    risiken: [
      "Starke Kursschwankungen – historische Crashs: −34 % (2020), −57 % (2008/09)",
      "Einzelunternehmen können scheitern (Totalverlust möglich)",
      "Emotionale Fehlentscheidungen in Crashphasen vernichten Rendite",
    ],
    historie:
      "Die erste Aktiengesellschaft der Welt war die Niederländische Ostindien-Kompanie (VOC, 1602). Breit gestreute Aktienmärkte haben langfristig nominal ca. 8–10 % pro Jahr erbracht – trotz Kriegen, Krisen und Crashs (Quellen: MSCI, Credit Suisse Global Investment Returns Yearbook).",
    riskLevel: 4,
    hue: "cyan",
  },
  {
    id: "etfs",
    name: "ETFs",
    icon: Layers,
    tagline: "Ganze Märkte mit einem Kauf",
    description:
      "Ein ETF (Exchange Traded Fund) bildet einen Index wie den MSCI World nach. Mit einem einzigen Produkt investierst du in hunderte oder tausende Unternehmen gleichzeitig.",
    chancen: [
      "Maximale Streuung zu minimalen Kosten (TER ab 0,07 %)",
      "Schon ab kleinen Sparraten möglich – viele Broker ab 1 €",
      "Transparent, liquide und in der EU durch UCITS-Richtlinie reguliert",
    ],
    risiken: [
      "Marktrisiko bleibt vollständig bestehen – kein Schutz vor Bärenmärkten",
      "Themen-ETFs sind oft teuer, zyklisch und kommen meist nach dem Hype",
      "Blind nachbilden ohne Grundverständnis kann zu falschem Timing verleiten",
    ],
    historie:
      "Der erste börsengehandelte Indexfonds startete am 22. Januar 1993 in den USA (SPDR S&P 500, Ticker: SPY). Heute verwalten ETFs weltweit über 12 Billionen US-Dollar – sie sind das meistgenutzte Instrument für privaten Vermögensaufbau.",
    riskLevel: 3,
    hue: "indigo",
  },
  {
    id: "anleihen",
    name: "Anleihen",
    icon: Landmark,
    tagline: "Kredite an Staaten und Unternehmen",
    description:
      "Mit einer Anleihe leihst du einem Staat oder Unternehmen Geld und erhältst dafür Zinsen. Am Ende der Laufzeit bekommst du den Nennwert zurück.",
    chancen: [
      "Planbare Zinszahlungen (Kupon) während der Laufzeit",
      "Stabilisiert ein Portfolio in Aktienkrisen (negative Korrelation)",
      "Große Auswahl: Staatspapiere, Unternehmens-, Inflationsanleihen",
    ],
    risiken: [
      "Zinsänderungsrisiko: Steigen die Marktzinsen, fallen die Kurse laufender Anleihen",
      "Inflation frisst die Realrendite – reale Renditen können negativ sein",
      "Ausfallrisiko bei schwachen Schuldnern (Griechenland 2012: ~53 % Schuldenschnitt)",
    ],
    historie:
      "Anleihen sind älter als Aktien: Schon italienische Stadtstaaten des Mittelalters finanzierten sich über Schuldverschreibungen. Staatsanleihen erstklassiger Emittenten (USA, Deutschland) gelten als Referenz für den 'risikofreien' Zins.",
    riskLevel: 2,
    hue: "sky",
  },
  {
    id: "immobilien",
    name: "Immobilien",
    icon: Home,
    tagline: "Betongold mit Hebelwirkung",
    description:
      "Immobilien lassen sich direkt (Kauf) oder indirekt (REITs, Fonds) besitzen. Sie liefern Mieteinnahmen und können im Wert steigen – oft finanziert mit Fremdkapital.",
    chancen: [
      "Laufende Mieteinnahmen als relativ stabiler Cashflow",
      "Kredithebel kann die Eigenkapitalrendite deutlich erhöhen",
      "Sachwert mit historisch guter Inflationsschutz-Wirkung",
    ],
    risiken: [
      "Klumpenrisiko: viel Kapital in einem einzigen Objekt gebunden",
      "Illiquide – Verkauf dauert Monate, in Krisenzeiten länger",
      "Zins-, Lage-, Mietausfall- und Instandhaltungsrisiken kumulieren",
    ],
    historie:
      "Grundbesitz war über Jahrhunderte die dominierende Vermögensform. Die globale Finanzkrise 2007–2009 zeigte, dass auch Immobilienmärkte um 30–60 % einbrechen können (USA, Irland, Spanien). In Deutschland sanken die Preise 2022–2024 um bis zu 14 % (Destatis).",
    riskLevel: 3,
    hue: "amber",
  },
  {
    id: "rohstoffe",
    name: "Rohstoffe",
    icon: Gem,
    tagline: "Gold, Öl und Industriemetalle",
    description:
      "Rohstoffe wie Gold, Öl oder Kupfer werden über Börsen gehandelt. Sie erwirtschaften selbst keine Erträge – ihr Preis folgt Angebot, Nachfrage und Krisenstimmung.",
    chancen: [
      "Gold als bewährter Krisen- und Inflationsanker (seit über 5.000 Jahren Wertspeicher)",
      "Geringe bis negative Korrelation zu Aktien in Krisenzeiten",
      "Profitiert von realen Angebotsknappheiten (Kupfer, Lithium, seltene Erden)",
    ],
    risiken: [
      "Keine Zinsen, keine Dividenden, kein innerer Cashflow",
      "Extreme Preiszyklen: Öl fiel im April 2020 kurzzeitig unter null US-Dollar",
      "Lager-, Produktions- und Rollkosten bei Fonds-Investments",
    ],
    historie:
      "Gold dient seit über 5.000 Jahren als Wertspeicher. Der Ölpreisschock von 1973 (OPEC-Embargo) zeigte, wie stark Rohstoffe ganze Volkswirtschaften bewegen können. Real – nach Inflation – hat Gold langfristig kaum an Kaufkraft gewonnen.",
    riskLevel: 3,
    hue: "yellow",
  },
  {
    id: "krypto",
    name: "Kryptowährungen",
    icon: Bitcoin,
    tagline: "Digitale, dezentrale Assets",
    description:
      "Kryptowährungen wie Bitcoin basieren auf der Blockchain – einem dezentralen, fälschungssicheren Register. Ihr Wert entsteht aus Knappheit, Netzwerkeffekten und Vertrauen.",
    chancen: [
      "Asymmetrisches Renditepotenzial (Bitcoin: +1.000 % in manchen Zyklen)",
      "Unabhängig von Zentralbanken, global und 24/7 übertragbar",
      "Technologische Innovation mit wachsenden institutionellen Anwendungsfällen",
    ],
    risiken: [
      "Extreme Volatilität: −82 % (2018), −77 % (2022) sind historisch belegte Crashs",
      "Regulatorische Unsicherheit in vielen Ländern",
      "Verwahrungsrisiken (Lost Keys, Exchanges) und zahllose Betrugsprojekte",
    ],
    historie:
      "Bitcoin startete 2009 mit dem Genesis-Block als Antwort auf die Finanzkrise. Das Whitepaper erschien am 31. Oktober 2008 unter dem Pseudonym Satoshi Nakamoto. Aus einem Nischenexperiment wurde eine Asset-Klasse, die inzwischen auch institutionelle Investoren halten – hochspekulativ bleibt sie trotzdem.",
    riskLevel: 5,
    hue: "orange",
  },
  {
    id: "tagesgeld",
    name: "Tagesgeld",
    icon: PiggyBank,
    tagline: "Der sichere Parkplatz",
    description:
      "Tagesgeld ist ein täglich verfügbares Bankkonto mit Verzinsung. Es ist die Basis jeder Finanzplanung – ideal für den Notgroschen, ungeeignet für langfristigen Vermögensaufbau.",
    chancen: [
      "Bis 100.000 € pro Bank gesetzlich abgesichert (EU-Einlagensicherung)",
      "Jederzeit verfügbar – kein Kursrisiko, kein Liquiditätsengpass",
      "Seit 2022 wieder positive Nominalzinsen in der Eurozone",
    ],
    risiken: [
      "Rendite liegt langfristig meist unter der Inflation → realer Kaufkraftverlust",
      "2 % Inflation bedeutet: 1.000 € verlieren in 10 Jahren ~18 % ihrer Kaufkraft",
      "Zinsniveau kann sich jederzeit ändern – kein Schutz gegen Niedrigzinsphasen",
    ],
    historie:
      "Sparbuch und Tagesgeld waren in Deutschland jahrzehntelang die beliebteste Geldanlage. Das Ergebnis: reale Vermögen wuchsen kaum. Zwischen 2014 und 2021 lagen die Zinsen bei oder nahe null, während die Inflation anzog. Sicherheit hat ihren Preis.",
    riskLevel: 1,
    hue: "emerald",
  },
  {
    id: "gruendung",
    name: "Unternehmensgründung",
    icon: Rocket,
    tagline: "Investieren in die eigene Idee",
    description:
      "Die renditestärkste – und riskanteste – Anlage ist oft das eigene Unternehmen. Hier investierst du Kapital, Zeit und Können in etwas, das du selbst steuerst.",
    chancen: [
      "Unbegrenztes Aufwärtspotenzial – kein Index begrenzt deine Rendite",
      "Volle Kontrolle über strategische Entscheidungen",
      "Aufbau von Fähigkeiten und Netzwerken, die dauerhaft Wert schaffen",
    ],
    risiken: [
      "Rund 50 % aller Neugründungen scheitern innerhalb von fünf Jahren (KfW Gründungsmonitor)",
      "Klumpenrisiko: Einkommen und Vermögen hängen an derselben Quelle",
      "Hoher persönlicher Einsatz – Opportunitätskosten sind real",
    ],
    historie:
      "Fast jedes große Vermögen der Wirtschaftsgeschichte – von den Fuggern bis zu modernen Tech-Gründern – entstand durch Unternehmertum, nicht durch passives Sparen. Der Median-Gründer verdient dennoch weniger als ein vergleichbarer Angestellter (Quellen: KfW, IAB).",
    riskLevel: 5,
    hue: "fuchsia",
  },
];

/* ---------------------------------- Börsenhistorie ---------------------------------- */

export interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  summary: string;
  lesson: string;
  drawdown: string;
  spark: number[];
}

export const historyEvents: HistoryEvent[] = [
  {
    id: "tulpen",
    year: "1637",
    title: "Tulpenmanie",
    summary:
      "In den Niederlanden kosteten einzelne Tulpenzwiebeln zeitweise mehrere Jahresgehälter. Als die Nachfrage kippte, kollabierten die Preise binnen weniger Wochen. Die genauen historischen Ausmaße sind unter Ökonomen umstritten – die grundlegende Dynamik ist jedoch gut dokumentiert: die erste belegte Spekulationsblase der Geschichte.",
    lesson: "Wenn der Preis nur noch steigt, weil alle steigende Preise erwarten, ist es keine Investition mehr – es ist ein Schneeballsystem aus Hoffnung.",
    drawdown: "−95 % (geschätzt)",
    spark: [10, 14, 22, 38, 70, 100, 30, 12, 8, 7],
  },
  {
    id: "crash29",
    year: "1929",
    title: "Schwarzer Donnerstag",
    summary:
      "Am 24. Oktober 1929 brach der New Yorker Aktienmarkt ein. Der Dow Jones verlor von seinem September-Hoch (381 Punkte) bis zum Tief im Juli 1932 (41 Punkte) insgesamt 89 %. Er erreichte erst 1954 wieder seinen alten Stand. Die Große Depression folgte – mit bis zu 25 % Arbeitslosigkeit in den USA. Die Folgen prägten Regulierung und Geldpolitik für Jahrzehnte.",
    lesson: "Schuldenfinanziertes Investieren (Margin) erzwingt Zwangsverkäufe zum schlechtesten Zeitpunkt. Märkte können sich sehr lange in einer Abwärtsspirale befinden – Liquidität und Nerven entscheiden.",
    drawdown: "−89 % (Dow Jones, 1929–1932)",
    spark: [100, 85, 60, 38, 22, 14, 11, 12, 16, 22],
  },
  {
    id: "industrie",
    year: "1850+",
    title: "Industrialisierung",
    summary:
      "Eisenbahnen, Stahl und Elektrizität schufen die ersten modernen Kapitalmärkte. Aktiengesellschaften finanzierten Projekte, die kein Einzelner hätte stemmen können – der Grundstein des heutigen Wohlstands. Auf jeden Boom folgten Panik und Bereinigung, doch der langfristige Aufwärtstrend blieb intakt.",
    lesson: "Kapitalmärkte sind kein Casino, sondern eine Maschine, die Sparkapital in reale Innovation verwandelt.",
    drawdown: "Boom & Panik im Wechsel",
    spark: [8, 12, 11, 18, 16, 26, 24, 40, 38, 60],
  },
  {
    id: "dotcom",
    year: "2000",
    title: "Dotcom-Blase",
    summary:
      "Internetfirmen ohne Umsatz wurden mit Milliarden bewertet. Der NASDAQ Composite fiel von seinem Hoch im März 2000 (5.049 Punkte) bis Oktober 2002 auf 1.114 Punkte – ein Rückgang von 78 %. Das Internet veränderte die Welt trotzdem – nur später und mit anderen Gewinnern als erwartet.",
    lesson: "Eine richtige Technologie-These schützt nicht vor einem falschen Preis. Bewertung schlägt Story.",
    drawdown: "−78 % (NASDAQ Composite)",
    spark: [10, 16, 26, 44, 80, 100, 55, 30, 22, 24],
  },
  {
    id: "gfc",
    year: "2008",
    title: "Finanzkrise",
    summary:
      "Faule Immobilienkredite, verpackt in komplexe Wertpapiere (CDOs), brachten das Weltfinanzsystem an den Rand des Kollapses. Lehman Brothers fiel am 15. September 2008. Der S&P 500 verlor vom Hoch (Oktober 2007) bis zum Tief (März 2009) 56,8 %. Notenbanken und Staaten intervenierten mit historisch beispiellosen Mitteln.",
    lesson: "Risiken verschwinden nicht, wenn man sie verpackt und umbenennt. Verstehe, was du besitzt – oder besitze es nicht.",
    drawdown: "−56,8 % (S&P 500, 2007–2009)",
    spark: [60, 70, 78, 82, 76, 50, 28, 24, 34, 48],
  },
  {
    id: "eurokrise",
    year: "2011",
    title: "Eurokrise",
    summary:
      "Griechische Staatsschulden lösten eine Vertrauenskrise im gesamten Euroraum aus. Anleiherenditen in Portugal, Irland und Spanien explodierten. Griechenland musste Gläubiger 2012 mit einem Schuldenschnitt von rund 53 % am Nominalbetrag beteiligen. Die EZB stabilisierte die Lage erst mit Mario Draghis Satz 'Whatever it takes' im Juli 2012.",
    lesson: "Staatsanleihen sind nicht risikolos – Bonitätsrisiken existieren auch in der Eurozone. Breite geografische Streuung schützt vor Länderrisiken.",
    drawdown: "−29 % (EuroStoxx 50, 2011)",
    spark: [90, 92, 88, 78, 68, 62, 64, 70, 75, 80],
  },
  {
    id: "corona",
    year: "2020",
    title: "Corona-Crash",
    summary:
      "Der schnellste Bärenmarkt der Geschichte: Der S&P 500 fiel vom 19. Februar bis 23. März 2020 um 33,9 % – in nur 33 Tagen. Ebenso historisch war die Erholung. Wer panisch verkaufte, verpasste eine der stärksten Aufholbewegungen aller Zeiten. Ende 2020 notierte der Markt auf einem neuen Allzeithoch.",
    lesson: "Die teuersten Tage an der Börse sind oft die, an denen man aus Angst nicht investiert ist.",
    drawdown: "−33,9 % in 33 Tagen (S&P 500)",
    spark: [70, 74, 78, 80, 50, 44, 58, 72, 86, 100],
  },
  {
    id: "ki",
    year: "2023+",
    title: "KI-Boom",
    summary:
      "Die Veröffentlichung von ChatGPT (November 2022) löste eine massive Neubewertung von Technologiewerten aus. NVIDIA erreichte 2024 kurzzeitig eine Marktkapitalisierung von über 3 Billionen US-Dollar – mehr als das BIP Deutschlands. Die Frage, wie viel Zukunft bereits eingepreist ist, bleibt offen.",
    lesson: "Jede echte Revolution erzeugt echte Gewinner und teure Übertreibungen – meist gleichzeitig. Selektion und Geduld entscheiden.",
    drawdown: "Kapitel noch offen",
    spark: [20, 22, 26, 34, 46, 60, 58, 74, 88, 100],
  },
];

/* ---------------------------------- ETF-Lernzentrum ---------------------------------- */

export interface EtfTopic {
  id: string;
  title: string;
  short: string;
  body: string;
  stat: { value: string; label: string };
}

export const etfTopics: EtfTopic[] = [
  {
    id: "was-sind-etfs",
    title: "Was sind ETFs?",
    short: "Indexfonds, die an der Börse gehandelt werden.",
    body:
      "Ein ETF kauft alle (oder eine repräsentative Auswahl) der Wertpapiere eines Index und bildet dessen Entwicklung nahezu 1:1 ab. Statt einen Fondsmanager zu bezahlen, der den Markt schlagen soll, kaufst du einfach den ganzen Markt – günstig, transparent und jederzeit handelbar. In der EU sind ETFs als UCITS-Fonds reguliert und unterliegen strengen Anlegerschutzregeln.",
    stat: { value: "0,07–0,20 %", label: "typische Jahreskosten (TER) breiter Welt-ETFs" },
  },
  {
    id: "diversifikation",
    title: "Was ist Diversifikation?",
    short: "Nicht alle Eier in einen Korb.",
    body:
      "Diversifikation verteilt dein Kapital über viele Unternehmen, Branchen und Länder. Einzelrisiken gleichen sich gegenseitig aus: Fällt ein Unternehmen aus, trägt der Rest das Portfolio. Es ist der einzige 'Free Lunch' der Geldanlage – weniger unsystematisches Risiko ohne zwingend weniger Renditeerwartung. Ein Welt-ETF eliminiert unternehmensspezifisches Risiko praktisch vollständig.",
    stat: { value: "1.450+", label: "Unternehmen in einem einzigen MSCI World ETF (Stand 2025)" },
  },
  {
    id: "rebalancing",
    title: "Was ist Rebalancing?",
    short: "Das Portfolio zurück ins Gleichgewicht bringen.",
    body:
      "Mit der Zeit verschieben sich Gewichte: Was gut lief, wird zu groß. Beim Rebalancing stellst du die ursprüngliche Aufteilung wieder her – du verkaufst also automatisch teuer und kaufst günstig nach. Einmal pro Jahr reicht in der Regel völlig. Durch Sparplan-Umschichtungen (neue Einzahlungen in untergewichtete Positionen) lässt sich Rebalancing steuerneutral erreichen.",
    stat: { value: "1× pro Jahr", label: "genügt für die meisten Portfolios" },
  },
  {
    id: "msci-world",
    title: "Was ist der MSCI World?",
    short: "Der bekannteste Aktienindex der Welt.",
    body:
      "Der MSCI World bündelt rund 1.450 große und mittelgroße Unternehmen aus 23 Industrieländern (Stand 2025). Wichtig: 'World' ist relativ – Schwellenländer fehlen, und US-Aktien dominieren mit rund 65–70 %. Wer globaler diversifizieren möchte, wählt den MSCI ACWI, der auch Schwellenländer einschließt, oder den MSCI ACWI IMI, der zusätzlich Small Caps abdeckt.",
    stat: { value: "23", label: "Industrieländer im MSCI World (Schwellenländer: MSCI ACWI)" },
  },
  {
    id: "sp500",
    title: "Was ist der S&P 500?",
    short: "Die 500 größten börsennotierten US-Unternehmen.",
    body:
      "Der S&P 500 ist das Herzstück des US-Aktienmarkts und der meistbeachtete Index der Welt. Er ist marktkapitalisierungsgewichtet: Die größten Konzerne haben das größte Gewicht. Langfristig erzielte er (seit 1926) nominal ca. 10 % pro Jahr – mit zwischenzeitlich brutalen Einbrüchen bis −57 %. Nach Inflation und Kosten liegt die Realrendite deutlich darunter.",
    stat: { value: "500", label: "Unternehmen, ein Kürzel, ein Weltmaßstab" },
  },
  {
    id: "thesaurierend",
    title: "Ausschüttend oder thesaurierend?",
    short: "Dividenden kassieren oder automatisch reinvestieren?",
    body:
      "Ausschüttende ETFs zahlen Dividenden und Zinsen regelmäßig aus – praktisch für laufendes Einkommen. Thesaurierende ETFs legen Erträge sofort wieder an und nutzen so den Zinseszins vollständiger. In Deutschland sind seit der Investmentsteuerreform 2018 beide Typen steuerlich gleichgestellt – die Vorabpauschale sorgt für eine jährliche Mindestbesteuerung thesaurierender Fonds. Den Freistellungsauftrag (1.000 € / 2.000 € Verheiratete) kann man bei beiden Typen nutzen.",
    stat: { value: "2.000 €", label: "Freistellungsauftrag (Verheiratete) – Kapitalerträge bis hierhin steuerfrei" },
  },
  {
    id: "kosten",
    title: "Kosten: die einzige sichere Renditevernichtung",
    short: "Was ETFs von aktiven Fonds unterscheidet.",
    body:
      "Jeder Kostenprozentpunkt frisst über Jahrzehnte erhebliche Summen. Aktive Fonds verlangen oft 1,5–2 % TER plus Ausgabeaufschläge bis 5 %. Günstige Welt-ETFs kosten 0,07–0,20 % TER. Modellrechnung: 10.000 € über 30 Jahre bei 8 % Bruttorendite – mit 0,2 % TER wächst das Kapital auf ~97.000 €, mit 1,5 % TER nur auf ~66.000 €. Der Unterschied: fast 47 % mehr Endvermögen. Und Kosten sind sicher – Mehrrendite aktiver Fonds ist es nicht: ca. 85 % aktiver Fonds liefern langfristig weniger als ihr Vergleichsindex (Quelle: S&P SPIVA-Bericht).",
    stat: { value: "~47 %", label: "mehr Endvermögen bei 0,2 % statt 1,5 % TER über 30 Jahre (Modell, 8 % Brutto)" },
  },
];

/* ---------------------------------- Anlegerpsychologie ---------------------------------- */

export interface Bias {
  id: string;
  title: string;
  icon: LucideIcon;
  hook: string;
  explanation: string;
  example: string;
  antidote: string;
}

export const biases: Bias[] = [
  {
    id: "fomo",
    title: "FOMO",
    icon: Flame,
    hook: "Die Angst, etwas zu verpassen",
    explanation:
      "Wenn alle über einen steigenden Kurs reden, fühlt sich Nichtstun wie Verlieren an. FOMO lässt Anleger genau dann kaufen, wenn die Euphorie – und damit oft der Preis – am höchsten ist.",
    example: "2021 kauften Millionen Privatanleger Meme-Aktien (GameStop, AMC) auf dem Höhepunkt des Hypes – viele mit dauerhaften Verlusten.",
    antidote: "Feste Sparpläne und Investmentregeln, die vor dem Hype definiert wurden – nicht währenddessen.",
  },
  {
    id: "verlustaversion",
    title: "Verlustaversion",
    icon: HeartPulse,
    hook: "Verluste schmerzen doppelt so stark",
    explanation:
      "Laut Kahneman und Tversky (Verhaltensökonomik, Nobelpreis 2002) wiegt ein Verlust psychologisch etwa doppelt so schwer wie ein gleich großer Gewinn. Deshalb halten Anleger Verlierer zu lange ('wird schon wieder') und verkaufen Gewinner zu früh.",
    example: "Eine Aktie steht 40 % im Minus – statt die Investitionsthese zu prüfen, wird gewartet, 'bis sie wieder bei null ist'. Der Einstandskurs ist irrelevant – der Markt kennt ihn nicht.",
    antidote: "Entscheidungen an der Zukunft ausrichten, nicht am Einstandskurs. Regelmäßig fragen: 'Würde ich diese Position heute neu kaufen?'",
  },
  {
    id: "herdentrieb",
    title: "Herdentrieb",
    icon: Users,
    hook: "Alle machen es – also ist es richtig?",
    explanation:
      "Menschen orientieren sich instinktiv an der Gruppe. An der Börse führt das dazu, dass Trends sich selbst verstärken – nach oben wie nach unten, bis weit über jeden fairen Wert hinaus.",
    example: "In jeder Blase der Geschichte – Tulpen (1637), Eisenbahn (1840er), Dotcom (2000), Krypto (2021) – galt der Skeptiker als ahnungslos. Bis zum Platzen.",
    antidote: "Eine eigene, schriftlich festgehaltene Investment-These. Wer weiß, warum er investiert ist, braucht keine Herde.",
  },
  {
    id: "overconfidence",
    title: "Overconfidence",
    icon: Eye,
    hook: "Die Illusion, klüger als der Markt zu sein",
    explanation:
      "Nach ein paar erfolgreichen Trades hält sich fast jeder für überdurchschnittlich. Die Folge: zu viel Handel, zu wenig Streuung, zu hohe Risiken – und langfristig schlechtere Ergebnisse.",
    example: "Studien von Barber & Odean (2000) zeigen: Je häufiger Privatanleger handeln, desto schlechter ist ihre durchschnittliche Rendite – um bis zu 6 Prozentpunkte pro Jahr.",
    antidote: "Demut als System: breit streuen, selten handeln, Ergebnisse ehrlich gegen einen Welt-ETF benchmarken.",
  },
  {
    id: "confirmation",
    title: "Bestätigungsfehler",
    icon: Search,
    hook: "Wir suchen, was wir ohnehin glauben",
    explanation:
      "Anleger lesen bevorzugt Nachrichten, die ihre Investmentthese bestätigen, und ignorieren Gegenargumente. Das führt zu falscher Sicherheit – besonders gefährlich bei Einzelaktien oder Nischeninvestments.",
    example: "Wer Bitcoin besitzt, liest primär positive Krypto-Nachrichten. Wer skeptisch ist, sieht nur Kritik. Beide verpassen das vollständige Bild – und damit bessere Entscheidungen.",
    antidote: "Das stärkste Gegenargument zur eigenen These aktiv suchen (Steel-Manning). Quellen lesen, die man nicht mag. Wer sein Investment nicht kritisch prüfen kann, sollte es nicht besitzen.",
  },
  {
    id: "emotionen",
    title: "Emotionale Entscheidungen",
    icon: Brain,
    hook: "Angst und Gier am Steuer",
    explanation:
      "Die Börse verstärkt Emotionen: Gier auf dem Hoch, Panik im Tief. Beides verleitet zu genau falschem Timing – teuer kaufen, billig verkaufen. Studien zeigen, dass Privatanleger durch schlechtes Timing im Schnitt deutlich weniger erzielen als der Fonds selbst.",
    example: "Im März 2020 verkauften viele Anleger am Tiefpunkt – Wochen später notierten die Märkte zweistellig höher. Wer hielt, erzielte die volle Erholung.",
    antidote: "Automatisierung. Ein Sparplan kennt weder Angst noch Gier – er investiert einfach weiter, auch wenn es sich falsch anfühlt.",
  },
];

/* ---------------------------------- Quiz ---------------------------------- */

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Was beschreibt der Zinseszins-Effekt?",
    options: [
      "Zinsen werden nur auf das Startkapital gezahlt",
      "Erträge erwirtschaften selbst wieder Erträge",
      "Die Bank verdoppelt jährlich die Zinsen",
      "Zinsen sind steuerfrei, wenn man sie reinvestiert",
    ],
    correctIndex: 1,
    explanation:
      "Beim Zinseszins wachsen auch deine bisherigen Erträge weiter – das Wachstum beschleunigt sich exponentiell. Bei 8 % Rendite wächst 1 € in 30 Jahren auf ca. 10 €.",
  },
  {
    question: "Was ist ein ETF?",
    options: [
      "Ein börsengehandelter Fonds, der einen Index nachbildet",
      "Eine staatlich garantierte Anleihe",
      "Eine einzelne Technologie-Aktie",
      "Ein Sparkonto mit Bonuszins",
    ],
    correctIndex: 0,
    explanation:
      "ETF steht für Exchange Traded Fund: ein an der Börse gehandelter Fonds, der einen Index wie den MSCI World möglichst exakt abbildet – günstig, transparent und liquide.",
  },
  {
    question: "Warum ist Diversifikation sinnvoll?",
    options: [
      "Sie garantiert Gewinne",
      "Sie maximiert die Rendite einzelner Aktien",
      "Sie reduziert das Risiko einzelner Ausfälle im Portfolio",
      "Sie spart Steuern",
    ],
    correctIndex: 2,
    explanation:
      "Streuung über viele Unternehmen, Branchen und Länder sorgt dafür, dass kein einzelner Ausfall dein Gesamtvermögen gefährdet. Systematisches Marktrisiko bleibt – unternehmensspezifisches Risiko wird minimiert.",
  },
  {
    question: "Der MSCI World enthält …",
    options: [
      "alle Aktien der Welt inklusive Schwellenländer",
      "rund 1.450 Unternehmen aus 23 Industrieländern",
      "nur die 30 größten deutschen Konzerne",
      "ausschließlich US-Technologiewerte",
    ],
    correctIndex: 1,
    explanation:
      "Der MSCI World deckt Industrieländer ab (rund 1.450 Titel, Stand 2025) – Schwellenländer wie China oder Indien fehlen. Dafür gibt es den MSCI ACWI.",
  },
  {
    question: "Was passiert mit bestehenden Anleihekursen, wenn die Marktzinsen steigen?",
    options: ["Sie steigen", "Sie fallen", "Sie bleiben exakt gleich", "Sie werden eingefroren"],
    correctIndex: 1,
    explanation:
      "Steigen die Zinsen, sind alte Anleihen mit niedrigem Kupon weniger attraktiv – ihr Kurs fällt, bis die Rendite zum neuen Zinsniveau passt. Dieses inverse Verhältnis ist ein Grundprinzip der Rentenmärkte.",
  },
  {
    question: "Welche Aussage über Risiko und Rendite ist langfristig korrekt?",
    options: [
      "Hohe Rendite gibt es auch ganz ohne Risiko",
      "Risiko und Renditechance hängen grundsätzlich zusammen",
      "Tagesgeld schlägt langfristig den Aktienmarkt",
      "Risiko lässt sich durch häufiges Handeln eliminieren",
    ],
    correctIndex: 1,
    explanation:
      "Renditechancen sind die Entlohnung für getragenes Risiko. Wer Schwankungen aushält und Zeit mitbringt, wird dafür historisch belohnt. Häufiges Handeln erhöht Kosten und verschlechtert die Rendite.",
  },
  {
    question: "Was beschreibt 'Verlustaversion'?",
    options: [
      "Die Strategie, niemals Aktien zu kaufen",
      "Verluste schmerzen psychologisch stärker, als gleich hohe Gewinne erfreuen",
      "Die Pflicht, Verluste steuerlich anzugeben",
      "Eine Order-Art beim Broker",
    ],
    correctIndex: 1,
    explanation:
      "Laut Kahneman & Tversky wiegt ein Verlust gefühlt etwa doppelt so schwer wie ein gleich hoher Gewinn. Das verleitet dazu, Verlustpositionen zu lange zu halten und Gewinne zu früh zu realisieren.",
  },
  {
    question: "Du hast 50 € im Monat übrig und 40 Jahre Zeit. Was ist historisch betrachtet der wirksamste Hebel?",
    options: [
      "Auf den perfekten Einstiegszeitpunkt warten",
      "Früh anfangen und dauerhaft investiert bleiben",
      "Nur in der Hausse investieren",
      "Das Geld bar zu Hause lagern",
    ],
    correctIndex: 1,
    explanation:
      "Zeit im Markt schlägt Markt-Timing. Der Zinseszins braucht vor allem eines: viele Jahre. Früh anzufangen ist wichtiger als die perfekte Strategie.",
  },
  {
    question: "Eine Aktie fällt um 50 %. Wie viel Kursanstieg braucht sie danach, um den Ausgangswert zu erreichen?",
    options: [
      "50 %",
      "75 %",
      "100 %",
      "25 %",
    ],
    correctIndex: 2,
    explanation:
      "Nach einem Verlust von 50 % bleibt die Hälfte des Werts übrig. Von 50 auf 100 zu kommen braucht eine Verdopplung – also +100 %. Das zeigt die asymmetrische Wirkung von Verlusten: Verlieren ist leichter als Erholen.",
  },
  {
    question: "Was beschreibt den 'Cost-Average-Effekt' bei einem Sparplan?",
    options: [
      "Je mehr Anteile man kauft, desto günstiger wird der Stückpreis",
      "Durch regelmäßige Einzahlungen kauft man bei niedrigen Kursen automatisch mehr Anteile",
      "ETFs werden umso billiger, je länger man sie hält",
      "Der Effekt, dass Verwaltungskosten mit der Zeit sinken",
    ],
    correctIndex: 1,
    explanation:
      "Beim Cost-Average-Effekt investiert man regelmäßig feste Beträge. Bei niedrigen Kursen kauft man automatisch mehr Anteile, bei hohen weniger – das mittelt den Einstiegskurs und dämpft das Timing-Risiko.",
  },
  {
    question: "Wie hoch ist die Abgeltungsteuer auf Kapitalerträge in Deutschland (ohne Kirchensteuer)?",
    options: [
      "15 %",
      "25 %",
      "35 %",
      "42 %",
    ],
    correctIndex: 1,
    explanation:
      "Kapitalerträge werden in Deutschland mit 25 % Abgeltungsteuer belastet, plus 5,5 % Solidaritätszuschlag auf die Steuer – effektiv 26,375 %. Der Freistellungsauftrag befreit Erträge bis 1.000 € (Alleinstehende) bzw. 2.000 € (Verheiratete) pro Jahr.",
  },
  {
    question: "Was ist der Unterschied zwischen einem thesaurierenden und einem ausschüttenden ETF?",
    options: [
      "Thesaurierende ETFs sind riskanter als ausschüttende",
      "Thesaurierende ETFs legen Erträge automatisch wieder an, ausschüttende zahlen sie aus",
      "Ausschüttende ETFs sind in Deutschland steuerlich verboten",
      "Thesaurierende ETFs haben grundsätzlich höhere Kosten",
    ],
    correctIndex: 1,
    explanation:
      "Thesaurierende ETFs reinvestieren Dividenden und Zinsen automatisch – ideal für Vermögensaufbau durch vollen Zinseszins. Ausschüttende ETFs zahlen Erträge regelmäßig aus. Steuerlich sind beide in Deutschland seit 2018 gleichgestellt.",
  },
];

/* ---------------------------------- Zukunftstrends ---------------------------------- */

export interface Trend {
  id: string;
  title: string;
  icon: LucideIcon;
  body: string;
  fact: string;
}

export const trends: Trend[] = [
  {
    id: "ki",
    title: "Künstliche Intelligenz",
    icon: Cpu,
    body:
      "KI-Modelle automatisieren Wissensarbeit, beschleunigen Forschung und verändern ganze Geschäftsmodelle. Wirtschaftlich relevant sind vor allem Rechenzentren, Halbleiter und Software-Plattformen – die Infrastruktur hinter der Intelligenz. Laut McKinsey könnte KI bis 2030 jährlich 2,6–4,4 Billionen US-Dollar an wirtschaftlichem Wert schaffen.",
    fact: "NVIDIA erreichte 2024 kurzzeitig eine Marktkapitalisierung von über 3 Billionen US-Dollar – angetrieben von der Nachfrage nach KI-Rechenchips. Das entspricht mehr als dem BIP Deutschlands.",
  },
  {
    id: "robotik",
    title: "Robotik & Automatisierung",
    icon: Bot,
    body:
      "Von Industrierobotern bis zu humanoiden Systemen: Robotik überträgt KI in die physische Welt. Alternde Gesellschaften und struktureller Fachkräftemangel machen Automatisierung zunehmend zur ökonomischen Notwendigkeit – nicht nur zur technologischen Option.",
    fact: "Laut IFR (International Federation of Robotics) stieg die globale Roboterdichte von 66 Robotern pro 10.000 Beschäftigte (2015) auf 151 (2023). Südkorea führt mit 1.012 Robotern pro 10.000 Beschäftigte.",
  },
  {
    id: "energie",
    title: "Energiewende",
    icon: Wind,
    body:
      "Der Umbau auf erneuerbare Energien, Speicher und Stromnetze ist eines der größten Investitionsprogramme der Geschichte. Gleichzeitig treibt der Strombedarf von KI-Rechenzentren und der Elektrifizierung von Verkehr und Wärme die Nachfrage massiv.",
    fact: "Laut IRENA sind die Kosten für Solarstrom (LCOE) seit 2010 um über 90 % gefallen. Solar ist in weiten Teilen der Welt heute die günstigste Stromerzeugungsform der Geschichte.",
  },
  {
    id: "raumfahrt",
    title: "Raumfahrt",
    icon: Orbit,
    body:
      "Wiederverwendbare Raketen haben die Startkosten drastisch gesenkt. Satelliten-Internet (Starlink), Erdbeobachtung und Kommunikation entwickeln sich zu realen Märkten – weit jenseits von Science-Fiction.",
    fact: "Die Kosten pro Kilogramm Nutzlast in den niedrigen Erdorbit sanken von ~54.500 $/kg (Space Shuttle) auf ~2.700 $/kg (SpaceX Falcon 9) – ein Rückgang von über 95 %.",
  },
  {
    id: "biotech",
    title: "Biotechnologie",
    icon: Dna,
    body:
      "Gensequenzierung, mRNA-Plattformen und KI-gestützte Wirkstoffforschung verkürzen Entwicklungszyklen dramatisch. Biotech verbindet hohes wissenschaftliches Risiko mit potenziell enormem gesellschaftlichem Nutzen – und erfordert entsprechend langen Anlagehorizont.",
    fact: "Die Kosten für die vollständige Sequenzierung eines menschlichen Genoms fielen von ca. 3 Mrd. USD (Human Genome Project, 2003) auf heute unter 200 USD – ein Rückgang um den Faktor ~15 Millionen.",
  },
  {
    id: "quantum",
    title: "Quantentechnologie",
    icon: Atom,
    body:
      "Quantencomputer rechnen mit Qubits statt Bits und könnten bestimmte Probleme – Materialforschung, Kryptografie, Optimierung – fundamental schneller lösen. Die Technologie ist real und macht Fortschritte, aber zwischen Laborerfolg und kommerziellem Massenmarkt liegen noch Jahre.",
    fact: "Staaten und Konzerne weltweit haben bis 2024 mehr als 40 Mrd. USD in Quantenforschung investiert – lange bevor es breite kommerzielle Anwendungen gibt (Quelle: McKinsey Quantum Technology Report 2024).",
  },
];

/* ---------------------------------- FAQ & Footer ---------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Ist das hier Anlageberatung?",
    answer:
      "Nein. Alle Inhalte dienen ausschließlich der Bildung. Sie sind keine Anlage-, Steuer- oder Rechtsberatung und keine Empfehlung zum Kauf oder Verkauf von Finanzprodukten. Für individuelle Beratung wende dich an einen zugelassenen Finanzberater.",
  },
  {
    question: "Woher stammen die Zahlen in den Rechnern?",
    answer:
      "Sämtliche Berechnungen basieren auf lokal definierten Modellannahmen (Zinseszins-Formel, Szenario-Szenarien) und laufen direkt in deinem Browser. Es werden keine Live-Marktdaten und keine externen Schnittstellen verwendet. Die Ergebnisse sind illustrativ, keine Prognosen.",
  },
  {
    question: "Ab wie viel Geld lohnt sich Investieren?",
    answer:
      "Schon kleine, regelmäßige Beträge entfalten über lange Zeiträume eine enorme Wirkung – probiere es im Vermögens-Simulator aus. Viele Broker bieten ETF-Sparpläne bereits ab 1 € monatlich an. Wichtiger als die Summe ist der frühe Start.",
  },
  {
    question: "Wird mein Fortschritt gespeichert?",
    answer:
      "Dein Lernfortschritt und dein Quiz-Bestwert werden ausschließlich lokal in deinem Browser gespeichert (localStorage). Es verlassen keine Daten dein Gerät – kein Tracking, kein Server.",
  },
];

export const navItems = [
  { id: "wirtschaftswelt", label: "Wirtschaftswelt" },
  { id: "simulator", label: "Simulator" },
  { id: "historie", label: "Börsenreise" },
  { id: "risiko", label: "Risiko-Labor" },
  { id: "etf", label: "ETF-Wissen" },
  { id: "psychologie", label: "Psychologie" },
  { id: "inflation", label: "Kaufkraft" },
  { id: "zukunft", label: "Zukunft" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
