# Portfolio — Simone Canevari

Sito personale statico (HTML/CSS puro, nessun build step, nessuna dipendenza).
Pubblicato con GitHub Pages: **https://canevari-simone.github.io/portfolio/**

## Struttura

| Percorso | Ruolo |
| --- | --- |
| `index.html` | Home / lato scientifico: about, showcase progetti, elenco tesi e lavori, contatti |
| `resume.html` | CV in HTML (dati anagrafici, istruzione, esperienza, competenze) |
| `creative.html` | Lato creativo: D&D (personaggi, one-shot, homebrew), writing, reading |
| `css/style.css` | Tema chiaro, usato da `index.html` e `resume.html` |
| `css/creative.css` | Tema scuro/oro, usato solo da `creative.html` |
| `images/` | Immagini di showcase, ritratti personaggi, texture |
| `pdf/` | CV, tesi, report, schede personaggio — linkati con `download` |
| `js/sidebar.js` | Logica sidebar/hamburger, condivisa dalle tre pagine |
| `js/i18n.js` | Selettore lingua EN/IT: dizionario completo + motore di sostituzione |
| `js/reveal.js` | Fade-in delle sezioni allo scroll (rispetta `prefers-reduced-motion`) |
| `js/filter.js` | Filtro dei progetti per competenza (home) |
| `progetti/*.html` | Una pagina per progetto, ciascuna con la propria interazione |
| `js/spectra.js` | Selettore spettri Raman (pagina microplastiche) |
| `js/connect4.js` | Board interattiva (pagina Forza 4) |
| `js/timeline.js` | Cronologia degli studi (pagina Vinland) |
| `js/dating.js` | Confronto fra tecniche di datazione (pagina radiodatazione) |
| `js/shielding.js` | Simulatore di schermatura (pagina bombe sporche) |
| `robots.txt`, `sitemap.xml` | SEO: indicizzazione e mappa del sito |
| `cv.tex` | **Sorgente LaTeX del CV.** Compilare con `pdflatex` (moderncv) e installare il PDF in `pdf/CV_Canevari.pdf` |

## Come si lavora qui

- **Nessun toolchain.** Niente npm, niente bundler, niente framework. Si modifica l'HTML/CSS e basta.
- **Anteprima locale:** `python -m http.server 8000` dalla root, poi `http://localhost:8000`.
  Serve un server vero (non `file://`) perché i percorsi sono relativi.
- **Deploy:** un `git push` su `main` pubblica automaticamente. Non c'è branch `gh-pages`,
  non c'è workflow di Actions — GitHub Pages serve `main` alla root (`build_type: legacy`).
- **Il JS vive in `js/`**, incluso con `defer` dalle tre pagine. Non reintrodurre copie
  inline: sidebar e traduzioni stanno ciascuna in un punto solo.
- **Bilingue EN/IT.** Ogni testo visibile porta `data-i18n="chiave"`; la stringa nelle due
  lingue sta in `TRANSLATIONS` dentro `js/i18n.js`. Il titolo della pagina usa
  `data-i18n-title` sul tag `<html>`.
  **Aggiungendo testo alla pagina, aggiungere sempre anche la chiave**, altrimenti quel
  testo resta in inglese al cambio lingua. Controllo rapido delle chiavi orfane:
  confrontare `grep -oh 'data-i18n="[^"]*"' *.html` con le chiavi definite in `i18n.js`.
- La lingua scelta è salvata in `localStorage` (`preferred-lang`); al primo accesso si usa
  quella del browser, con fallback all'inglese.

## Convenzioni del progetto

- Lingua dei contenuti: **inglese** per l'interfaccia e le descrizioni; i PDF sono misti
  ITA/ENG e l'indicazione della lingua va nel titolo, es. `... (ITA)` / `... (ENG)`.
- La sidebar è replicata a mano in ogni pagina. Le voci cambiano per pagina:
  `index.html` usa ancore locali (`#home`), le altre puntano a `index.html#home`.
- Ogni `<h2>`/`<h3>` che è bersaglio di un'ancora porta `class="section-anchor"`
  (aggiunge `scroll-margin-top`).
- I link a PDF usano sempre l'attributo `download`.
- Footer: copyright + licenza **CC BY-NC-ND 4.0** su tutte le pagine.
- Il selettore lingua è `position: fixed` in alto a destra, con stile proprio in ciascun
  tema. La sidebar è `fixed`: lo spazio a sinistra è dato da `padding-left` sul `body`,
  azzerato sotto i 768px.
- **Angoli netti ovunque.** Nessun `border-radius` in tutto il progetto: e' una scelta
  estetica deliberata. Il reset su `button, input, select, textarea` in cima a ciascun CSS
  serve a togliere il raggio di default del browser sui controlli nativi.
  **Non reintrodurre `border-radius`** aggiungendo componenti.
- Entrambi i CSS usano custom properties in `:root` (`--navy`, `--green`, `--sand`... in
  `style.css`; `--bg-color`, `--accent`... in `creative.css`).
  **I colori si modificano lì, mai nei singoli selettori.**
- L'hamburger è un `<button>` con `aria-label`/`aria-expanded`; le emoji decorative della
  sidebar sono `aria-hidden="true"`. Mantenere questa struttura se si tocca la nav.

## Problemi aperti

Vedi `.claude/REVIEW.md` per l'analisi completa. Restano da decidere (richiedono input umano):

1. **`pdf/bombe_sporche.pdf` non esiste.** Il link in `index.html` è commentato con un TODO
   e sostituito da "PDF coming soon". Il file è in lavorazione: quando c'è, ripristinare
   il link e la chiave i18n `pdf.download` al posto di `pdf.soon`.
2. **File non ancora referenziati**, da pubblicare in futuro: `images/Sienna.png`,
   `ground+plastic.jpeg`, `map.jpg`, `pdf/Presentazione_Nanomedicina.pdf`.
   `itaflag.png` e `usgbflag.png` erano per un selettore di lingua: ora c'è, ma usa
   etichette testuali EN/IT invece delle bandiere (più accessibile e meno ambiguo).

## Crediti immagini

Tutte le foto del sito vengono da **Wikimedia Commons**, con licenza verificata via API
(`prop=imageinfo&iiprop=extmetadata`). L'elenco completo con autore, licenza e URL sta
in `CREDITS.md`.

**Due immagini sono sotto CC BY** (`microplastics.jpg` CC BY 4.0, `tree-rings.jpg`
CC BY 2.0): l'attribuzione visibile nella sezione "Crediti immagini" in fondo a
`index.html` **e' obbligatoria per licenza**. Non rimuoverla.

Aggiungendo una foto: prenderla da Commons, verificare la licenza con l'API (non fidarsi
delle descrizioni dei motori di ricerca), aggiungere la riga in `CREDITS.md` e, se la
licenza lo richiede, la voce nella sezione crediti.

**Non dedurre ne' inventare fonti.** L'URL di una pagina dove l'immagine e' stata trovata
non e' la fonte: citare chi ridistribuisce non mette al riparo. I ritratti D&D in
`creative.html` hanno origine ancora non documentata (vedi `CREDITS.md`).

## Pagine di progetto

Ogni progetto ha una pagina in `progetti/` con la stessa struttura: header con breadcrumb
e link al PDF, introduzione + risultati in `.stat-grid`, sezione interattiva, conclusione.
I percorsi sono relativi alla cartella superiore (`../css/`, `../js/`, `../pdf/`).

**Regola che vale per tutte:** ogni dato mostrato deve essere o preso dal PDF del progetto,
o da una fonte citata in pagina. Dove i dati sono ricostruiti (spettri Raman, incertezze
di datazione, dose di schermatura) la pagina lo **dichiara esplicitamente** in una nota.
Non aggiungere numeri senza fonte: su un sito professionale un dato inventato è il danno
peggiore che si possa fare.

Il file `TODO.md` traccia lo stato e le scelte fatte per ciascuna pagina.

## Aggiornare il CV

Il PDF del CV **non si modifica a mano**: si rigenera da `cv.tex`.

```bash
pdflatex -interaction=nonstopmode cv.tex   # due volte, per i riferimenti
```

Poi comprimere e installare (Ghostscript e' in TeXLive):

```bash
gswin64c -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH   -sOutputFile=pdf/CV_Canevari.pdf cv.pdf
```

Il CV **deve stare in una pagina**: `\setlist` e `scale` in cima al file sono tarati
per questo. Aggiungendo contenuto, verificare con `pdfinfo cv.pdf | grep Pages`.

Quando cambia il CV vanno aggiornati **in parallelo** anche `resume.html` (che ne e' la
versione web) e le chiavi `resume.*` in `js/i18n.js`. Sono tre punti da tenere allineati.

## Sicurezza e privacy

Il sito e' statico e senza form: non c'e' backend, non c'e' database, non si raccolgono dati.
Le superfici di attacco reali sono poche, ma vanno mantenute cosi':

- **Nessun `eval`, `new Function`, `document.write`.** Non introdurli.
- Gli `innerHTML` nei moduli JS ricevono **solo stringhe dal dizionario i18n**, mai input
  dell'utente. Se un giorno arriva un input esterno (parametro URL, campo di testo),
  passare a `textContent` o sanificare.
- `localStorage` legge solo `preferred-lang`, **validato contro una whitelist**.
  Mantenere la validazione: e' l'unico ingresso esterno del sito.
- Tutti i link esterni hanno `rel="noopener noreferrer"`. Aggiungendone, mantenerlo.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` su tutte le pagine.
- **Gli artefatti LaTeX non si versionano** (`.aux`, `.log`, `.fls`...): sono in `.gitignore`.
  Il `.log` puo' contenere percorsi assoluti della macchina di chi compila.

**Nota su Google Fonts:** i font sono caricati da `fonts.googleapis.com`, che riceve l'IP
di ogni visitatore. E' un punto discusso in ambito GDPR (sentenza LG Munchen I, 2022).
Poppins e Spectral sono SIL OFL, quindi si possono ospitare localmente: e' una scelta
aperta, documentata in `TODO.md`.

## Cose da non fare

- Non introdurre framework, build step o dipendenze npm: il valore di questo progetto è che
  resta un sito statico che si apre e si modifica senza installare nulla.
- Non riscrivere la storia git (`rebase`, `--force`): il repo è già pubblicato.
- Non toccare i PDF esistenti se non richiesto — sono documenti accademici definitivi.
