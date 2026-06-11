# Kapitalwerk – Moderne Finanzbildung

Eine vollständig responsive, interaktive Finanzbildungs-Website für die nächste
Generation von Investoren. Dark Mode, Glassmorphism, scroll-getriebene
Animationen – komplett ohne APIs und ohne Live-Daten.

## Tech-Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** mit eigenem Design-Token-System (`app/globals.css`)
- **Framer Motion** für GPU-beschleunigte Animationen
- **Recharts** für alle Visualisierungen
- **Lucide Icons**

## Schnellstart (lokal)

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Produktions-Build (statischer Export nach ./out)
```

Hinweis: `next/font` lädt Sora und Inter beim ersten Build von Google Fonts
und bündelt sie anschließend lokal (self-hosted, DSGVO-freundlich). Dafür
ist beim allerersten `npm run build` einmalig Internetzugang nötig.

## Deployment auf GitHub Pages

### Einmalige Einrichtung

1. **GitHub Pages aktivieren**
   - Repository → Settings → Pages
   - Source: **GitHub Actions** auswählen

2. **Branch schützen (empfohlen)**
   - Repository → Settings → Branches → `main` schützen

3. Push auf `main` – der Workflow baut automatisch und veröffentlicht die Seite unter:
   `https://<username>.github.io/kapitalwerk/`

### Custom Domain (optional)

Wenn eine eigene Domain (z. B. `kapitalwerk.de`) eingerichtet werden soll:

1. DNS konfigurieren (CNAME auf `<username>.github.io` oder A-Records für GitHub)
2. Repository → Settings → Pages → Custom Domain eintragen
3. In `.github/workflows/deploy.yml` die Zeile `NEXT_PUBLIC_BASE_PATH: /kapitalwerk`
   auf `NEXT_PUBLIC_BASE_PATH: ""` ändern
4. `public/CNAME` Datei mit der Domain anlegen:
   ```
   kapitalwerk.de
   ```

## Struktur

```
app/
  layout.tsx          SEO-Metadaten, Fonts, Root-Layout
  page.tsx            Seitenkomposition
  globals.css         Design-Tokens, Glass-/Gradient-Utilities, reduced motion
components/
  Navbar.tsx          Glass-Navbar, Scroll-Fortschritt, Lernpfad-Punkte
  sections/           Die 10 Sektionen der Seite
  ui/                 Wiederverwendbare Bausteine (Slider, Reveal, …)
lib/
  data.ts             Sämtliche Inhalte (statisch, lokal)
  finance.ts          Zinseszins- und Risiko-Modellrechnungen
  useLearningProgress.ts  Lokales Fortschritts-Tracking (localStorage)
```

## Besondere Features

1. Scroll-getriebene Storytelling-Timeline (Börsenhistorie) mit wachsender Kurslinie
2. Interaktiver Zinseszins-Simulator mit drei Szenarien in Echtzeit
3. Risiko-Labor mit modellhaftem Rendite-Korridor (Slider für Risiko, Diversifikation, Horizont)
4. Lernpfad-Tracking lokal im Browser (IntersectionObserver + localStorage)
5. Gamifiziertes Quiz mit Punkten, Fortschrittsbalken und gespeichertem Bestwert
6. Animierte Signatur-Kurslinie im Hero, Parallax-Hintergrund, Glass-Flip-Cards

## Datenschutz & Disclaimer

Keine APIs, keine Cookies, kein Tracking. Lernfortschritt und Quiz-Bestwert
liegen ausschließlich im localStorage des Browsers. Alle Inhalte dienen der
Bildung und sind keine Anlageberatung.
