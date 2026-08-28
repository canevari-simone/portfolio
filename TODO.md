# TODO — pagine di progetto interattive

**Stato: ✅ tutte e 5 le pagine completate.**

## L'idea

Ogni progetto ha una **pagina propria** con: una breve introduzione al contenuto e ai
risultati, e sotto un **elemento interattivo specifico per quel tipo di lavoro**.
Non decorazione: qualcosa che il visitatore usa e che dimostra cosa sai fare.

Lo spettro del polietilene già in home (`js/raman.js`) è il prototipo del pattern.

---

## 1. Tesi magistrale — selettore di spettri Raman

**Pagina:** `progetti/microplastiche.html` · **✅ FATTA**

Introduzione a contenuto e risultati della tesi, poi uno spettro interattivo dove
l'utente **cambia polimero e vede cambiare lo spettro**.

I sette polimeri sono quelli effettivamente analizzati nella tesi — i codici di riciclo
01–07 (verificato nel PDF, sezione "Dataset Description"):

| Codice | Polimero |
| --- | --- |
| 01 | PET — polietilene tereftalato |
| 02 | HDPE — polietilene ad alta densità |
| 03 | PVC — polivinilcloruro |
| 04 | LDPE — polietilene a bassa densità |
| 05 | PP — polipropilene |
| 06 | PS — polistirene |
| 07 | Other — plastiche miste/multistrato |

**Dati reali dalla tesi da citare nell'introduzione:**
- oltre **11.700 spettri** raccolti da rifiuti plastici reali
- 900 spettri per tipo da campioni trasparenti/bianchi + **5.413 da campioni colorati**
- classificatore **SVM con kernel lineare**, accuratezza **99,49%** su test set,
  cross-validation oltre **99,7%**
- PCA e t-SNE per la separabilità; i pesi dell'SVM confrontati con i picchi Raman reali
  per mostrare che il modello coglie firme chimiche, non artefatti statistici

**Nota su HDPE/LDPE:** hanno lo stesso spettro Raman di base (entrambi polietilene), si
distinguono per intensità relative legate alla cristallinità. Va detto — è uno dei punti
interessanti della tesi (si separano lungo la prima componente PCA).

**Nota sulla classe 07:** è eterogenea per definizione, quindi non ha un singolo spettro
caratteristico. Va gestita a parte, non inventando uno spettro finto.

---

## 2. Forza 4 — probabilità di vittoria della prima mossa

**Pagina:** `progetti/forza-quattro.html` · **✅ FATTA**

Board 7×6 in cui l'utente **sceglie la colonna della prima mossa**; dopo la scelta gli
viene mostrata **la probabilità di vittoria** associata a quella mossa, ricavata dai dati
del report.

**Dati usati:** i pesi della riga 1 della heatmap (`images/colonne.JPG`), fornita
dall'utente — la fila in basso, dove cade il gettone in una colonna vuota:

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 |
| --- | --- | --- | --- | --- | --- | --- |
| 0.39 | 0.27 | **1.15** | **1.07** | 0.51 | −0.40 | −1.30 |

**Scelta fatta:** sono mostrati come **pesi del modello**, non convertiti in "probabilità
di vittoria". I valori nella heatmap sono pesi appresi dalla rete: trasformarli in
percentuali richiederebbe una normalizzazione arbitraria e presenterebbe come misura
qualcosa che il modello non ha mai prodotto. La pagina lo dichiara esplicitamente.
Le barre di confronto hanno lo zero al centro, così il segno resta leggibile.

---

## 3. Mappa di Vinland — cronologia degli studi

**Pagina:** `progetti/vinland.html` · **✅ FATTA**

Una **linea del tempo con dei punti**: ogni punto è una valutazione, scoperta o studio
condotto sulla mappa. Cliccando un punto compare la descrizione.

**Date verificate** su Wikipedia e sull'annuncio Yale del 1° settembre 2021. Le stime
iniziali del TODO erano in parte sbagliate e sono state corrette:
- comparsa sul mercato: **1957** (non 1946)
- McCrone trova l'anatasio: **1972** (non 1974)
- radiocarbonio: **1423–1445** (non "~1434")
- aggiunti: 1966 convegno Smithsonian, 1991 secondo esame McCrone

Dieci eventi su quattro corsie (le date 1965/66/67 sono troppo ravvicinate per due sole).
Colore per verdetto: verde = a favore dell'autenticità, rosso = indizi di falsificazione,
grigio = contesto.

---

## 4. Bombe sporche — schermatura e dose

**Pagina:** `progetti/bombe-sporche.html` · **✅ FATTA**

Schema con **una sorgente radioattiva e una figura umana**. L'utente sceglie:
- **tipo di radiazione**: alfa, beta, gamma
- **materiale schermante** tra i due (carta, alluminio, piombo, calcestruzzo, acqua)
- **spessore** dello schermo

Il modello calcola la dose che arriva alla persona con le leggi fisiche reali:
attenuazione esponenziale `I = I₀·e^(−μx)` con coefficienti μ per materiale ed energia,
più la legge dell'inverso del quadrato per la distanza.

**Fatto così** (approccio approvato dall'utente):
- Presentato come **dose assorbita in mSv** con quattro soglie cliniche (limite popolazione
  1 mSv, lavoratori 20 mSv, sindrome acuta 1000 mSv, LD50 4000 mSv), non come "mortalità".
- Riquadro di avvertenza esplicito: illustrazione didattica, non strumento di
  radioprotezione, dose di riferimento arbitraria.
- **Coefficienti NIST reali**, interpolati a 662 keV (Cs-137). Verifica: HVL del piombo
  risulta 0,54 cm, coerente con il valore noto (~0,5 cm).
- **Alfa e beta non usano l'esponenziale** ma un range finito: è fisicamente corretto e
  didatticamente il punto centrale. Verificato: alfa fermata da 0,1 cm di carta, beta da
  1 cm di alluminio, gamma su 0,54 cm di piombo → 49,9% (esattamente l'HVL).

**Nota:** la card in home linka alla pagina ma non ha ancora il pulsante PDF, perché
`pdf/bombe_sporche.pdf` non esiste. C'è un TODO nell'HTML che indica dove aggiungerlo.

---

## 5. Tesi triennale — confronto fra tecniche di datazione

**Pagina:** `progetti/radiodatazione.html` · **✅ FATTA**

Un oggetto di **età vera nota**; l'utente vede **in quale epoca verrebbe datato** dalle
diverse tecniche, per far capire i **margini di errore** di ciascuna.

Tecniche da confrontare (sono quelle della tua tesi): radiocarbonio ¹⁴C,
termoluminescenza, e possibilmente dendrocronologia come riferimento.

**Fatto così:** slider logaritmico da 50 a 60.000 anni; quattro metodi (AMS ¹⁴C, ¹⁴C
convenzionale, termoluminescenza, dendrocronologia) con banda di incertezza centrata
sull'età vera e intervallo di calendario corrispondente. I metodi fuori dal proprio
intervallo di applicabilità mostrano "non applicabile a questa età" invece di una banda
inventata.

**Parametri dalla tesi:** AMS fino a ~60.000 anni, precisione massima 0,2% ≈ 16 anni.
L'incertezza è modellata come termine relativo + termine fisso: semplificazione didattica,
dichiarata in pagina.

---

## Domande ancora aperte

1. ~~Forza 4: il report contiene probabilità per colonna?~~ **Risolto**: l'utente ha
   fornito la heatmap dei pesi (`images/colonne.JPG`). Il report contiene inoltre
   accuratezze 89/84/82% e la struttura dell'MLP, usate nell'introduzione.
2. **NDA Eucentre**: la pagina del ruolo attuale è esclusa per ora. Confermi?
3. ~~Spettri della magistrale: dati sperimentali disponibili?~~ **Risolto**: la tesi non
   contiene tabelle di picchi per polimero e non ci sono dati grezzi nella cartella.
   Gli spettri sono ricostruiti da Nava, Frezzotti & Leoni, *Applied Spectroscopy* 75(11),
   2021 — citato in pagina. **Se un giorno esporti i dati veri dalla tesi**, sostituire
   `RAMAN_PEAKS` in `js/spectra.js` sarebbe un miglioramento sostanziale.

---

## Vincoli da rispettare

- **Niente framework, niente build step.** Il valore del sito è che si apre e si modifica
  senza installare nulla.
- **Niente librerie pesanti** (Three.js valutato e scartato): SVG e canvas 2D bastano per
  tutte le interazioni sopra, pesano ~5 KB invece di ~600 KB e non richiedono WebGL.
- **Degradare bene**: senza JS la pagina resta leggibile; rispettare `prefers-reduced-motion`.
- **Angoli netti**, palette esistente, bilingue EN/IT: seguire `CLAUDE.md`.
- **Dati ricostruiti vanno dichiarati.** Lo spettro attuale porta la nota "ricostruito
  dalla letteratura, non una misura sperimentale". Vale per ogni visualizzazione non
  sperimentale: altrimenti è un dato falso su un sito professionale.
- **Navigazione**: ogni pagina ha un ritorno alla home e il link al PDF completo.
- **i18n**: ogni pagina aggiunge stringhe. Con sei pagine `js/i18n.js` diventa grosso,
  valutare se spezzarlo per pagina.
