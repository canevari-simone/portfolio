# Code review — portfolio

Data: 2026-08-28 · Commit: `ec783ba` · Sito live: https://canevari-simone.github.io/portfolio/

Progetto: sito statico di 3 pagine HTML + 2 CSS + asset. Nessuna dipendenza, nessun build.
Nel complesso è coerente e pulito. I problemi seri sono pochi ma alcuni sono visibili in
produzione. Elencati in ordine di priorità.

---

## 🔴 Critici — rotti in produzione

### 1. Link a PDF inesistente → 404 confermato
`index.html:64` punta a `pdf/bombe_sporche.pdf`, che non esiste nel repo.
Verificato live: `https://canevari-simone.github.io/portfolio/pdf/bombe_sporche.pdf` → **404**.
La sezione "Dirty Bombs" è anche una delle tre card in evidenza in home, quindi è un
percorso molto visibile.

*Fix:* caricare il PDF mancante, oppure rimuovere il link finché non è disponibile.
Nota: in `pdf/` c'è `Presentazione_Nanomedicina.pdf` mai referenziato — non è però lo stesso documento.

### 2. Schede personaggio D&D invertite
In `creative.html` i due personaggi hanno i PDF scambiati fra loro. Verificato estraendo
il testo dai PDF:

| Scheda | Link attuale | Contenuto reale del PDF |
| --- | --- | --- |
| Diana Maréehaute (`creative.html:60-61`) | `Marlo.pdf`, `La_rinascita_bardica.pdf` | Marlo, goblin, bard/warlock, banjo |
| Marlo Zeller (`creative.html:76-77`) | `diana_lv_17.pdf`, `diana_backstory.pdf` | Diana, halfling, rogue |

*Fix:* scambiare le due coppie di link.

---

## 🟠 Importanti

### 3. Dati personali sensibili su pagina pubblica
`resume.html:31-33` pubblica **indirizzo di residenza completo** (Via Rossini 20, 27010
Linarolo) e **numero di cellulare** su una pagina indicizzabile dai motori di ricerca.
Per un CV online la prassi è lasciare solo città + email, e riservare indirizzo e telefono
al PDF inviato su richiesta. È una scelta personale, ma va fatta consapevolmente.

### 4. URL LinkedIn incoerenti
- `index.html:88` → `linkedin.com/in/simone-canevari/`
- `resume.html:35` → `linkedin.com/in/simone-canevari-145297366/`

Uno dei due è sbagliato. Vanno allineati a quello reale.

### 5. Peso del repository: ~60 MB
`pdf/` occupa 55 MB, di cui `Tesi_Magistrale_Canevari_v8.pdf` da solo 30 MB e
`underwater_rules.pdf` 15 MB. Conseguenze: clone lentissimo, e un visitatore che clicca
la tesi scarica 30 MB.

*Fix consigliato:* comprimere i PDF (Ghostscript `-dPDFSETTINGS=/ebook` riduce spesso
del 70-90% senza danni visibili). Attenzione: comprimere ora **non riduce** la storia git
già pubblicata, ma evita che cresca ancora.

### 6. `target="_blank"` senza `rel="noopener"`
Tutti i link esterni (footer, LinkedIn, i 5 link Goodreads in `creative.html`) usano
`target="_blank"` senza `rel="noopener noreferrer"`. I browser moderni lo applicano
già di default, quindi il rischio pratico è basso, ma resta buona pratica esplicitarlo.

---

## 🟡 Minori / qualità

### 7. JavaScript duplicato tre volte
Lo stesso blocco di ~25 righe (toggle sidebar, hamburger, chiusura al click fuori) è
copiato identico in fondo a `index.html`, `resume.html` e `creative.html`. Ogni modifica
va replicata a mano in tre punti — classica fonte di divergenze future.

*Fix:* estrarlo in `js/sidebar.js` (la cartella `js/` esiste già ed è vuota) e includerlo
con `<script src="js/sidebar.js" defer></script>`.

### 8. Cartelle vuote: `assets/`, `js/`, `downloads/`
Nessun file, nessun riferimento nel codice. Git peraltro non traccia cartelle vuote,
quindi su GitHub non esistono affatto. Vanno rimosse o riempite.

### 9. File mai referenziati
Immagini: `Sienna.png` (479 KB), `ground+plastic.jpeg`, `itaflag.png`, `map.jpg`, `usgbflag.png`.
PDF: `Presentazione_Nanomedicina.pdf` (2 MB).
`itaflag.png`/`usgbflag.png` suggeriscono un selettore di lingua mai completato.

### 10. CSS morto e incoerenze
- `css/style.css:44-52` — regola `#cosmicCanvas` per un canvas che non esiste in nessuna pagina.
- `css/style.css:78` — `.showcase` definita ma mai usata nell'HTML (si usa `.showcase-row`).
- `css/style.css` non ha custom properties: i colori `#1c3144`, `#52796f`, `#cad2c5` sono
  ripetuti a mano ovunque, mentre `creative.css` usa correttamente le variabili in `:root`.
  Vale la pena allineare `style.css` allo stesso approccio.
- `index.html`/`resume.html` dichiarano `font-family: 'Poppins'` e `creative.css` `'Spectral'`,
  ma **nessun font viene caricato** (niente `@font-face`, niente Google Fonts): si vede
  ovunque il fallback `sans-serif`/`serif`. O si caricano, o si tolgono.
- `css/creative.css:150` — `.pdf-button` ha testo bianco su sfondo oro `#ffd700`:
  contrasto ~1.5:1, sotto la soglia WCAG AA (4.5:1). Poco leggibile. Meglio testo scuro.

### 11. Accessibilità e SEO
- Manca `<meta name="description">` su tutte e tre le pagine.
- L'hamburger è un `<div>` non focalizzabile da tastiera: dovrebbe essere un `<button>`
  con `aria-label` e `aria-expanded`.
- Le icone emoji nella sidebar sono lette dagli screen reader ("casa con giardino", ...):
  andrebbero marcate `aria-hidden="true"`, dato che l'etichetta testuale è già accanto.
- Nessuna favicon.

### 12. Ordine voci sidebar incoerente
In `index.html` l'ordine è Home / Projects / Contacts / Resume / Creative; in `resume.html`
Resume e Creative sono invertite. Dettaglio, ma si nota passando da una pagina all'altra.

### 13. Refusi nei testi
- `index.html:67` — "Machine Learning report i did" → `I did`; "i analyzed" → `I analyzed`.
- `creative.html:57` — "all pourpuse" → `all-purpose`.
- `creative.html:73` — "i created" → `I created`; "suprisingly" → `surprisingly`.
- `index.html:59` — "Mind that some of them are in italian" → `Italian`.

### 14. Messaggi di commit non descrittivi
La storia è fatta di `fede`, `ge`, `dwa`, `dad`, `dawdw`... Su un repo pubblico linkato
da un CV, è la prima cosa che un recruiter tecnico guarda dopo il codice.
Non riscrivere il passato (è già pubblicato), ma da qui in avanti conviene usare messaggi reali.

---

## ✅ Cosa funziona bene

- Separazione netta fra lato scientifico e lato creativo, con due temi CSS distinti e coerenti.
- `creative.css` usa correttamente le custom properties in `:root`.
- Responsive fatto a mano e funzionante: sidebar a icone su desktop che si espande in hover,
  hamburger sotto i 768px, con chiusura al click esterno.
- `scroll-margin-top` via `.section-anchor` — dettaglio curato che molti dimenticano.
- Licenza CC BY-NC-ND dichiarata in tutti i footer.
- `object-fit: cover` sulle immagini showcase: nessuna deformazione.
- Zero dipendenze: il sito funzionerà identico fra dieci anni.

---

## Ordine di intervento suggerito

1. PDF `bombe_sporche` mancante (404 pubblico)
2. Scambio schede Diana/Marlo
3. Decisione su indirizzo/telefono in `resume.html`
4. Allineamento URL LinkedIn
5. Refusi
6. Estrazione del JS in `js/sidebar.js`
7. Compressione PDF
8. Pulizia file inutilizzati e CSS morto

---

# Stato dopo gli interventi — 2026-08-28

## ✅ Risolti

| # | Problema | Intervento |
| --- | --- | --- |
| 2 | Schede D&D invertite | Link scambiati: Diana → `diana_lv_17`/`diana_backstory`, Marlo → `Marlo`/`La_rinascita_bardica`. Verificato via `pdftotext`. |
| 4 | *(parziale)* Link 404 | Rimosso il link a `bombe_sporche.pdf`, sostituito da "PDF coming soon" + TODO nel sorgente. Nessun 404 pubblico residuo. |
| 6 | `target="_blank"` senza `rel` | Aggiunto `rel="noopener noreferrer"` a tutti i link esterni (10 occorrenze). |
| 7 | JS duplicato ×3 | Estratto in `js/sidebar.js`, incluso con `defer`. Aggiunta chiusura con `Esc`. |
| 8 | Cartelle vuote | `assets/` e `downloads/` rimosse. `js/` ora contiene `sidebar.js`. |
| 10 | CSS morto e incoerenze | Rimossi `#cosmicCanvas` e `.showcase`. `style.css` ora usa custom properties in `:root` come `creative.css`. `.pdf-button` passa a testo scuro su oro (contrasto da ~1.5:1 a ~11:1). Aggiunto reset per `<button>`. |
| 11 | Accessibilità / SEO | `<meta name="description">` su tutte le pagine. Hamburger da `<div>` a `<button>` con `aria-label`/`aria-expanded`/`aria-controls`. Emoji sidebar `aria-hidden="true"`. |
| 12 | Ordine sidebar | `resume.html` allineato a `index.html`. |
| 13 | Refusi | `i did`→`I did`, `i analyzed`→`I analyzed`, `pourpuse`→`purpose`, `i created`→`I created`, `suprisingly`→`surprisingly`, `italian`/`english` maiuscoli. |

**Verifica:** servite le tre pagine su `http://localhost:8765` — tutte 200, insieme a CSS,
`js/sidebar.js` e i PDF dei personaggi. Nessun riferimento rotto residuo.

## ⏸ Aperti — richiedono una decisione o materiale

| # | Problema | Cosa serve |
| --- | --- | --- |
| 1 | `bombe_sporche.pdf` mancante | Il file. Il TODO nel sorgente indica dove ripristinare il link. |
| 3 | Indirizzo + telefono pubblici | Decisione: rimuoverli, ridurli alla sola città, o lasciarli. |
| 4 | URL LinkedIn discordanti | Quale dei due è quello vero. |
| 5 | Repo ~60 MB | Compressione PDF: modifica documenti accademici, meglio con conferma. |
| 9 | 6 file mai referenziati | Confermare se sono scarti o materiale da pubblicare. |
| 10b | Font mai caricati | Decidere se importare Poppins/Spectral o togliere le dichiarazioni. |
| 14 | Messaggi di commit | Nessuna azione sul passato; da qui in avanti messaggi descrittivi. |

---

# Secondo intervento — 2026-08-28 (decisioni utente)

| # | Decisione | Esito |
| --- | --- | --- |
| 1 | Indirizzo/telefono: lasciarli solo nel CV | Rimossi da `resume.html`, sostituiti da "Pavia, Italy" + nota che rimanda al CV scaricabile. Restano nel PDF. |
| 2 | LinkedIn corretto: `/in/simone-canevari/` | `resume.html` allineato a `index.html`. |
| 3 | `bombe_sporche.pdf` ancora in lavorazione | Nessuna azione; TODO già in `index.html`. |
| 4 | Comprimere i PDF | **55 MB → 14 MB (-75%)** con Ghostscript `/ebook`. Numero di pagine verificato identico per ogni file; livello testo intatto (16.733 parole estratte dalla tesi). Backup degli originali nello scratchpad di sessione. |
| 5 | Tenere i file inutilizzati + aggiungere selettore lingua | File conservati. Selettore EN/IT implementato. |
| 6 | Font: tenere solo quelli usati, verificarne la licenza | Poppins e Spectral (entrambi **SIL Open Font License 1.1**, open source) caricati da Google Fonts. Arial (proprietario Monotype, mai caricato) sostituito da uno stack di sistema. |

## Selettore di lingua

- `js/i18n.js`: dizionario di **114 chiavi** EN/IT che copre ogni testo visibile delle tre pagine.
- Pulsanti EN/IT fissi in alto a destra, con stile dedicato per ciascun tema.
- Cambio lingua **senza ricaricare la pagina**; aggiorna anche `<title>` e `<html lang>`.
- Preferenza salvata in `localStorage`; al primo accesso segue la lingua del browser
  (fallback: inglese). Ogni accesso allo storage è in `try/catch` per la modalità privata.
- Scelte le etichette testuali EN/IT invece delle bandiere: una bandiera indica uno stato,
  non una lingua, ed è meno accessibile.

## Bug trovati e corretti durante il lavoro

- **Contenuto coperto dalla sidebar:** `main` non lasciava spazio alla sidebar `fixed`, che
  copriva la prima colonna di testo (bug preesistente, visibile in ogni pagina).
  Risolto con `padding-left` sul `body`, azzerato sotto i 768px.
- **`box-sizing` mancante:** aggiunto il reset `border-box` a entrambi i CSS.
- **Card non impilate su mobile:** `style.css` non aveva la regola che `creative.css` aveva già.
- **Selettore lingua sovrapposto al titolo** su schermi stretti: ridotto e con
  `padding-right` sull'`h1` sotto i 768px.

## Verifiche eseguite

- Rendering reale in Chrome headless delle tre pagine, desktop e mobile.
- **Nessun overflow orizzontale** a 500 / 700 / 900 / 1280 px (`scrollWidth == clientWidth`).
- Cambio lingua testato via DOM: `<html lang>` e `<title>` cambiano, i titoli si traducono
  ("About me" ↔ "Chi sono"), **nessun nodo tradotto resta vuoto**.
- Chiavi i18n: **114 usate, 114 definite**, nessuna orfana in nessuna direzione.
- Nessun errore JavaScript in console.

## Ancora aperti

- `bombe_sporche.pdf` da caricare (in lavorazione).
- File conservati ma non ancora referenziati (vedi tabella sopra).
- Messaggi di commit: da qui in avanti descrittivi; la storia passata resta com'è.

---

# Terzo intervento — 2026-08-28 (restyling + nuovo impiego)

## Restyling della home

Obiettivo dichiarato: complemento al CV per HR e non solo, lato creativo secondario ma visibile.

- **Header**: nome + tagline con ruolo + due pulsanti (Scarica CV / Vedi curriculum).
  Prima il CV era l'ultima riga della pagina.
- **Competenze** come chip scansionabili.
- **Progetti come card** con anno, tipo, lingua e tecniche usate. Sostituiscono sia le
  vecchie card decorative sia l'elenco puntato: due sezioni che si duplicavano, ora una.
- **Teaser "Oltre il laboratorio"** a fine home verso gli interessi personali.
- **Naming**: "Lato Scientifico" → "Portfolio", "Lato Creativo" → "Interessi personali".
  Scartato "Lato Professionale": avrebbe implicato che il creativo non lo sia.
- `js/reveal.js`: fade-in allo scroll via IntersectionObserver, disattivato sotto
  `prefers-reduced-motion` e se l'API manca.
- Favicon SVG (mancava del tutto).
- Rimosse le regole `.showcase-*`, ormai morte (-73 righe da `style.css`).

## Nuovo impiego (Fondazione Eucentre, da nov 2025)

Ruolo: sviluppo software con focus su AI/ML applicati all'ingegneria sismica, computer
vision. **L'utente è sotto NDA**: le descrizioni restano volutamente generiche — nessun
dettaglio su casi d'uso, clienti o dati. Non aggiungere specifiche senza sua conferma.

Aggiornati in parallelo:
- `cv.tex` (rinominato da `main (3).tex`): nuova voce, Work Experience spostata **prima**
  di Education, skill riorganizzate in Programming / AI & Data / Physics, indirizzo
  aggiornato a Binasco (MI), LinkedIn corretto.
- `pdf/CV_Canevari.pdf`: ricompilato. Era diventato **2 pagine** con 12 parole sulla
  seconda; compattato con `enumitem` e `scale=0.83` per tornare a **una pagina**.
- `resume.html`: nuova esperienza in cima, sezioni riordinate come nel CV, riga Physics.
- `index.html`: tagline, "Chi sono" e chip aggiornati; **card "Ruolo attuale"** in testa
  alla griglia progetti, evidenziata in verde.
- `js/i18n.js`: **146 chiavi**, corrispondenza esatta con l'HTML.

## Verifiche

- Nessun overflow orizzontale a 500 / 1280 px su tutte e tre le pagine.
- Cambio lingua funzionante ovunque, **nessun nodo tradotto vuoto**.
- Tag HTML bilanciati (`div`, `section`, `main`, `ul`, `li`, `article`).
- CV: 1 pagina, 45 KB, contenuto verificato via `pdftotext`.

---

# Quarto intervento — 2026-08-28 (angoli netti)

Richiesta: schede e pulsanti con angoli retti invece che arrotondati.

- Rimossi **tutti** i `border-radius` da `css/style.css` (12) e `css/creative.css` (11),
  insieme al token `--radius`. Riguarda card progetto, pulsanti, chip competenze, selettore
  lingua, hamburger, teaser, ritratti personaggi, badge e pulsanti PDF.
- Aggiunto un reset `button, input, select, textarea { border-radius: 0 }` in cima a
  entrambi i CSS: i controlli nativi hanno un raggio proprio dal UA stylesheet, che
  altrimenti sarebbe rimasto visibile su hamburger e pulsanti EN/IT.
- Rimosse le dichiarazioni `border-radius: 0` ridondanti: il valore di default e' gia' 0,
  tenerle avrebbe solo aggiunto rumore.

**Verifica:** ispezione del `getComputedStyle` di ogni elemento visibile delle tre pagine a
500 e 1280 px — **nessun elemento con raggio diverso da 0**, nessun overflow.

---

# Quinto intervento — 2026-08-28 (crediti immagini + pulizia CV)

## Rimossa la riga "Mobilità"
Tolta da `resume.html` e dalle chiavi i18n (`resume.career.mob`, `.mob.v`).
Nel `cv.tex` non era presente. **Nota:** la stessa idea sopravvive nel Professional
Summary ("aperto a collaborazioni internazionali"), non rimossa perche' non richiesto.

## Crediti immagini

Approccio scelto: **attribuzione**, non sostituzione delle immagini.

Verificato che i 7 file non hanno metadati EXIF di autore o copyright: la provenienza e'
nota solo all'utente, che la ricostruira' con Google Lens. Per questo **non sono state
inventate fonti**: dichiarare una licenza sbagliata e' peggio che non dichiararne nessuna.

Predisposto:
- `CREDITS.md` — tabella con una riga per immagine e campi `??` da compilare, piu' le
  istruzioni per i casi tipici (foto propria, banca immagini, generata da AI, commissionata,
  provenienza ignota). Include anche le 4 immagini non ancora referenziate.
- Sezione "Crediti immagini" in fondo a `index.html` e `creative.html`, con testo generico
  bilingue che dichiara la provenienza da terzi e offre un contatto per accredito/rimozione.
  Stile volutamente discreto (separatore, testo piccolo, colore attenuato).
- TODO nell'HTML che indicano dove sostituire il paragrafo con l'elenco reale.

**Osservazione utile per dopo:** le dimensioni suggeriscono origini diverse —
2560x1700 e 1920x1200 sono formati tipici da banca immagini (Unsplash/Pexels),
mentre i ritratti 675x675 e 291x291 quadrati sembrano avatar generati o commissionati.

Verifica: 147 chiavi i18n con corrispondenza esatta, nessun overflow, sezione crediti
tradotta correttamente su entrambe le pagine.

---

# Sesto intervento — 2026-08-28 (immagini da Wikimedia Commons)

## Verifica delle fonti fornite

L'utente ha fornito 5 URL trovati con Google Lens. Verificati uno per uno:

| Immagine | URL fornito | Esito |
| --- | --- | --- |
| `map.jpg` | it.wikipedia File:Vinland_Map_HiRes | ✅ **pubblico dominio** confermato |
| `sporche.png` | hpcwire.com | ⚠️ 403; testata giornalistica, foto verosimilmente stock su licenza |
| `carbon.jpg` | answersingenesis.org | ⚠️ **l'immagine non e' su quella pagina**; nessuna attribuzione |
| `Microplastics.jpg` | studycentrekos.org | ⚠️ **l'immagine non e' su quella pagina** |
| `bubble_texture.jpg` | goodfon.com | ❌ wallpaper caricato da utente anonimo, nessuna licenza |

**Punto chiave comunicato all'utente:** quattro URL su cinque erano *dove l'immagine era
stata trovata*, non *chi l'ha creata*. Citare chi ridistribuisce non mette al riparo.

## Sostituzioni

Su proposta dell'utente ("e se usassimo solo Wikipedia come fonte?"), le 4 immagini a
rischio sono state sostituite con equivalenti da Wikimedia Commons, licenza verificata
via API di Commons (non tramite descrizioni dei motori di ricerca, che sono inaffidabili):

| Nuovo file | Autore | Licenza |
| --- | --- | --- |
| `microplastics.jpg` | European Commission (Lukasz Kobus) | CC BY 4.0 |
| `tree-rings.jpg` | James St. John | CC BY 2.0 |
| `nuclear-waste.jpg` | National Nuclear Security Administration | pubblico dominio |
| `bubbles.jpg` | Paolo Neo | pubblico dominio |

`map.jpg` rinominata `vinland-map.jpg` e mantenuta: e' gia' pubblico dominio.

**Scelte non banali:** ogni candidata e' stata *guardata* prima di installarla, non scelta
dalla descrizione testuale. Due scartate per questo motivo:
- una foto AMS (Univ. Tokyo) risultava una vetrina di museo, scura e illeggibile a 320px;
- fusti "residuos peligrosos" erano rifiuti tossici generici, non radioattivi: fuorviante
  per un lavoro sulle bombe sporche.

Per la tesi triennale la scelta e' caduta sugli **anelli di accrescimento**: la
dendrocronologia e' letteralmente un metodo di datazione, quindi piu' pertinente
dell'orologio nella roccia che c'era prima.

**Peso:** le 4 immagini passano da 3,3 MB a 1,2 MB.

## Attribuzione

- `CREDITS.md` riscritto con la tabella completa e la distinzione fra licenze che
  **obbligano** all'attribuzione (le due CC BY) e quelle che non lo fanno.
- Sezione "Crediti immagini" in fondo a `index.html` con l'elenco reale e i link a
  Commons e ai testi di licenza. **Necessaria per conformita' CC BY.**
- `creative.html`: le bolle sono accreditate; i due ritratti D&D restano con testo
  generico perche' la loro origine e' ancora ignota.

## Incidente durante il lavoro

`rm images/Microplastics.jpg` ha cancellato anche `images/microplastics.jpg` appena
installata: il filesystem Windows e' case-insensitive. Rilevato dal controllo delle
risorse mancanti e ripristinato dal backup. **Attenzione ai nomi che differiscono solo
per maiuscole.**

## Verifiche

- Tutte le immagini rispondono 200; nessun riferimento rotto.
- 147 chiavi i18n, corrispondenza esatta.
- Rendering della home verificato: le nuove foto funzionano bene nel formato card.

---

# Settimo intervento — 2026-08-28 (foto per le ultime due card)

Le card "Ruolo attuale" (Eucentre) e "Forza 4" avevano un glyph emoji invece di una foto.

| Card | Immagine | Autore | Licenza |
| --- | --- | --- | --- |
| Eucentre | `seismogram.jpg` — sismogramma su tamburo rotante | Z22 | CC BY-SA 3.0 |
| Forza 4 | `connect-four.jpg` — griglia riempita | Popperipopp | CC BY 3.0 |

Rimosse le regole CSS `.project-media--plain` e `.project-glyph`, ora morte (-17 righe).

## Scelte editoriali, non solo tecniche

Per la card Eucentre erano disponibili foto di edifici crollati (Turchia 2023, Cile 2010).
**Scartate deliberatamente:** illustrare il proprio lavoro con una tragedia recente e
identificabile — la foto turca mostra soccorritori tra le macerie di un sisma con oltre
50.000 vittime — e' un problema di tatto, non di licenza. Il sismogramma mostra lo
strumento invece del disastro, ed e' anche piu' leggibile a 320px.

Scartate anche, dopo averle **guardate**: una shake table (foto fisheye, affollata di
persone) e una seconda foto di Forza 4 (griglia vuota, in un contesto irrilevante).
La lezione: le descrizioni testuali dei risultati di ricerca non bastano per scegliere
un'immagine — vanno aperte.

## Stato attuale

Tutte e 6 le card hanno una foto da Wikimedia Commons con licenza verificata.
**Quattro immagini sono sotto CC BY/CC BY-SA** e la sezione crediti in fondo a
`index.html` e' obbligatoria per conformita'.

Verifica finale: nessun overflow, **nessuna immagine rotta**, nessun nodo tradotto vuoto,
a 500 e 1280 px su tutte e tre le pagine. 147 chiavi i18n, corrispondenza esatta.
Cartella `images/` a 2,6 MB.
