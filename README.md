# Portfolio — Simone Canevari

Sito personale statico: progetti scientifici, CV e lato creativo.

🔗 **[canevari-simone.github.io/portfolio](https://canevari-simone.github.io/portfolio/)**

## Contenuti

- **Home** — about, progetti in evidenza, tesi e lavori accademici (spettroscopia Raman,
  machine learning, radiodatazione), contatti
- **Resume** — curriculum in HTML + CV in PDF
- **Creative Side** — Dungeons & Dragons (personaggi, one-shot, meccaniche homebrew),
  scrittura, letture

## Stack

HTML e CSS puri. Nessun framework, nessuna dipendenza, nessun build step.

## Sviluppo locale

```bash
python -m http.server 8000
```

Poi apri <http://localhost:8000>. Serve un server locale: aprendo i file con `file://`
alcuni percorsi relativi non si risolvono correttamente.

## Deploy

Ogni push su `main` viene pubblicato automaticamente da GitHub Pages (branch `main`, root `/`).

## Licenza

Contenuti e documenti sono rilasciati sotto
[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).
