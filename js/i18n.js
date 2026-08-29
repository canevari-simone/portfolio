// Selettore di lingua EN/IT.
// Ogni nodo traducibile porta data-i18n="chiave"; le stringhe stanno in TRANSLATIONS.
// La scelta e' ricordata in localStorage e riletta al caricamento.
(function () {
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'preferred-lang';
  const SUPPORTED = ['en', 'it'];

  const TRANSLATIONS = {
    /* ---------- comuni ---------- */
    'nav.home':       { en: 'Home',              it: 'Home' },
    'nav.projects':   { en: 'Projects & Theses', it: 'Progetti e Tesi' },
    'nav.contacts':   { en: 'Contacts',          it: 'Contatti' },
    'nav.resume':     { en: 'Resume',            it: 'Curriculum' },
    'nav.creative':   { en: 'Personal interests', it: 'Interessi personali' },
    'nav.scientific': { en: 'Portfolio',          it: 'Portfolio' },
    'nav.dnd':        { en: 'D&D',               it: 'D&D' },
    'nav.writing':    { en: 'Writing',           it: 'Scrittura' },
    'nav.reading':    { en: 'Reading',           it: 'Letture' },

    'footer.rights': {
      en: '© 2025 Simone Canevari. All documents and content on this site are protected by intellectual property law.',
      it: '© 2025 Simone Canevari. Tutti i documenti e i contenuti di questo sito sono protetti dal diritto di proprietà intellettuale.'
    },
    'footer.licensed': { en: 'Licensed under', it: 'Distribuito con licenza' },
    'footer.creative': {
      en: '© 2025 Simone Canevari. Creative content and texts on this page are protected by copyright and shared under a',
      it: '© 2025 Simone Canevari. I contenuti creativi e i testi di questa pagina sono protetti da copyright e condivisi con licenza'
    },
    'a11y.skip': { en: 'Skip to content', it: 'Vai al contenuto' },
    'pdf.download': { en: 'Download PDF', it: 'Scarica PDF' },
    'project.explore': { en: 'Explore project', it: 'Esplora il progetto' },

    'credits.h': { en: 'Image credits', it: 'Crediti immagini' },
    'credits.pd': { en: 'public domain', it: 'pubblico dominio' },
    'credits.p.portraits': {
      en: 'Character portraits: attribution is being compiled. If you are the author of one of these images and would like it credited or removed, please get in touch.',
      it: 'Ritratti dei personaggi: l’attribuzione è in corso di raccolta. Se sei l’autore di una di queste immagini e vuoi che venga accreditata o rimossa, scrivimi pure.'
    },
    'pdf.soon':     { en: 'PDF coming soon.', it: 'PDF in arrivo.' },

    /* ---------- competenze (condivise) ---------- */
    'skill.raman':       { en: 'Raman spectroscopy', it: 'Spettroscopia Raman' },
    'skill.sers':        { en: 'SERS', it: 'SERS' },
    'skill.ml':          { en: 'Machine Learning', it: 'Machine Learning' },
    'skill.nn':          { en: 'Neural networks', it: 'Reti neurali' },
    'skill.stats':       { en: 'Advanced statistics', it: 'Statistica avanzata' },
    'skill.python':      { en: 'Python', it: 'Python' },
    'skill.sql':         { en: 'SQL', it: 'SQL' },
    'skill.java':        { en: 'Java', it: 'Java' },
    'skill.js':          { en: 'JavaScript', it: 'JavaScript' },
    'skill.cv':          { en: 'Computer Vision', it: 'Computer Vision' },
    'skill.cpp':         { en: 'C++', it: 'C++' },
    'skill.nuclear':     { en: 'Nuclear physics', it: 'Fisica nucleare' },
    'skill.radioprot':   { en: 'Radiation protection', it: 'Radioprotezione' },
    'skill.radiobio':    { en: 'Radiobiology', it: 'Radiobiologia' },
    'skill.radiodating': { en: 'Radiodating techniques', it: 'Tecniche di radiodatazione' },
    'skill.heritage':    { en: 'Cultural heritage physics', it: 'Fisica dei beni culturali' },
    'skill.matter':      { en: 'Condensed matter', it: 'Fisica della materia' },

    'kind.master':   { en: 'Master thesis', it: 'Tesi magistrale' },
    'kind.bachelor': { en: 'Bachelor thesis', it: 'Tesi triennale' },
    'kind.report':   { en: 'Course project', it: 'Progetto d\u2019esame' },
    'kind.study':    { en: 'Study', it: 'Studio' },
    'kind.work':     { en: 'Current role', it: 'Ruolo attuale' },

    'index.p0.year': { en: '2025 – present', it: '2025 – oggi' },
    'index.p0.h':    { en: 'AI & Computer Vision for Earthquake Engineering', it: 'AI e Computer Vision per l’ingegneria sismica' },
    'index.p0.p': {
      en: 'Research and software development at Fondazione Eucentre: applying artificial intelligence and machine learning to earthquake engineering, with a focus on computer vision models supporting post-disaster assessment.',
      it: 'Ricerca e sviluppo software in Fondazione Eucentre: applicazione di intelligenza artificiale e machine learning all’ingegneria sismica, con particolare attenzione a modelli di computer vision a supporto della valutazione post-catastrofe.'
    },

    'index.tagline': {
      en: 'Researcher at Fondazione Eucentre \u00b7 AI & Machine Learning applied to earthquake engineering',
      it: 'Ricercatore in Fondazione Eucentre \u00b7 AI e Machine Learning applicati all\u2019ingegneria sismica'
    },
    'index.header.resume': { en: 'Read resume', it: 'Vedi il curriculum' },
    'index.skills.h': { en: 'Skills & methods', it: 'Competenze e metodi' },
    'index.teaser.h': { en: 'Beyond the lab', it: 'Oltre il laboratorio' },
    'index.teaser.p': {
      en: 'Outside research I write, design tabletop role-playing adventures and play guitar \u2014 the same curiosity, applied to stories instead of spectra.',
      it: 'Fuori dalla ricerca scrivo, progetto avventure di gioco di ruolo e suono la chitarra: la stessa curiosit\u00e0, applicata alle storie invece che agli spettri.'
    },
    'index.teaser.link': { en: 'Personal interests \u2192', it: 'Interessi personali \u2192' },

    /* ---------- pagina bombe sporche ---------- */
    'sh.title': { en: 'Dirty Bombs \u2014 Simone Canevari', it: 'Bombe sporche \u2014 Simone Canevari' },
    'sh.h1':    { en: 'Dirty Bombs', it: 'Bombe sporche' },
    'sh.tagline': {
      en: 'Why the physics of a radiological dispersal device is mostly the physics of shielding',
      it: 'Perch\u00e9 la fisica di un ordigno a dispersione radiologica \u00e8 soprattutto fisica della schermatura'
    },

    'sh.about.h': { en: 'What the study is about', it: 'Di cosa parla lo studio' },
    'sh.about.p1': {
      en: 'A dirty bomb is not a nuclear weapon. There is no chain reaction and no nuclear explosion: it is conventional explosive wrapped around radioactive material, designed to scatter contamination over an area.',
      it: 'Una bomba sporca non \u00e8 un\u2019arma nucleare. Non c\u2019\u00e8 reazione a catena n\u00e9 esplosione nucleare: \u00e8 esplosivo convenzionale avvolto attorno a materiale radioattivo, pensato per disperdere contaminazione su un\u2019area.'
    },
    'sh.about.p2': {
      en: 'That distinction matters, because it changes what the actual hazard is. In most credible scenarios the blast itself causes the casualties, while the radiological consequence is contamination, disruption and the cost of decontaminating an urban area \u2014 which is why these devices are sometimes described as weapons of disruption rather than destruction.',
      it: 'La distinzione conta, perch\u00e9 cambia quale sia il pericolo reale. Negli scenari pi\u00f9 credibili sono l\u2019esplosione e i suoi effetti a causare le vittime, mentre la conseguenza radiologica \u00e8 la contaminazione, l\u2019interruzione delle attivit\u00e0 e il costo di bonificare un\u2019area urbana \u2014 per questo si parla talvolta di armi da disturbo pi\u00f9 che di distruzione.'
    },
    'sh.about.p3': {
      en: 'My study looks at the physics behind that assessment: which radionuclides would matter, how the three types of ionising radiation behave in matter, and what actually stops them. The last question is the one with the most counter-intuitive answer.',
      it: 'Il mio studio guarda alla fisica dietro questa valutazione: quali radionuclidi conterebbero, come si comportano nella materia i tre tipi di radiazione ionizzante e cosa li ferma davvero. L\u2019ultima domanda \u00e8 quella con la risposta pi\u00f9 controintuitiva.'
    },

    'sh.sim.h': { en: 'What stops what', it: 'Cosa ferma cosa' },
    'sh.sim.p': {
      en: 'Choose a type of radiation, a shielding material and a thickness, and see how much reaches the person a metre away. Alpha and beta particles have a finite range \u2014 past it, nothing gets through at all. Gamma rays never stop completely: they only get attenuated, which is a different problem entirely.',
      it: 'Scegli un tipo di radiazione, un materiale schermante e uno spessore, e guarda quanto raggiunge la persona a un metro di distanza. Le particelle alfa e beta hanno un percorso finito: oltre quello non passa pi\u00f9 nulla. I raggi gamma invece non si fermano mai del tutto, vengono solo attenuati \u2014 ed \u00e8 un problema di natura diversa.'
    },
    'sh.disclaimer': {
      en: 'Teaching illustration. The reference dose is an arbitrary value chosen to make the scale readable, not the output of any real source. Attenuation coefficients are from the NIST tables interpolated at 662 keV (caesium-137); alpha and beta ranges are order-of-magnitude values from standard literature. This is not a radiation protection tool and must not be used to assess a real situation.',
      it: 'Illustrazione didattica. La dose di riferimento \u00e8 un valore arbitrario scelto per rendere leggibile la scala, non l\u2019output di una sorgente reale. I coefficienti di attenuazione provengono dalle tabelle NIST interpolate a 662 keV (cesio-137); i percorsi di alfa e beta sono valori d\u2019ordine di grandezza dalla letteratura standard. Non \u00e8 uno strumento di radioprotezione e non va usato per valutare una situazione reale.'
    },

    'sh.takeaway.h': { en: 'Why it matters', it: 'Perch\u00e9 conta' },
    'sh.takeaway.p1': {
      en: 'Try alpha with a sheet of paper: it stops completely. Alpha particles cannot penetrate the outer layer of dead skin, which makes an alpha emitter almost harmless outside the body \u2014 and among the most dangerous things there is once inhaled or ingested, because inside the body that same dense energy deposition happens directly in living tissue.',
      it: 'Prova l\u2019alfa con un foglio di carta: si ferma del tutto. Le particelle alfa non attraversano nemmeno lo strato di pelle morta pi\u00f9 esterno, il che rende un emettitore alfa quasi innocuo all\u2019esterno del corpo \u2014 e fra le cose pi\u00f9 pericolose che esistano una volta inalato o ingerito, perch\u00e9 all\u2019interno quella stessa densa cessione di energia avviene direttamente nei tessuti vivi.'
    },
    'sh.takeaway.p2': {
      en: 'That inversion is the heart of radiation protection, and it is why the response to a radiological incident is about preventing inhalation and ingestion first, and about distance and shielding second. The exponential curve for gamma rays says something equally important: there is no thickness that gives you zero, only thicknesses that give you less.',
      it: 'Questa inversione \u00e8 il cuore della radioprotezione, ed \u00e8 il motivo per cui la risposta a un incidente radiologico riguarda prima di tutto impedire inalazione e ingestione, e solo dopo distanza e schermatura. La curva esponenziale dei gamma dice qualcosa di altrettanto importante: non esiste uno spessore che dia zero, solo spessori che danno meno.'
    },

    /* controlli del simulatore */
    'sh.label.radiation': { en: 'Radiation', it: 'Radiazione' },
    'sh.label.material':  { en: 'Shielding material', it: 'Materiale schermante' },
    'sh.label.thickness': { en: 'Shield thickness', it: 'Spessore dello schermo' },
    'sh.source':      { en: 'source', it: 'sorgente' },
    'sh.distance':    { en: '1 m', it: '1 m' },
    'sh.stopped':     { en: 'fully stopped', it: 'fermata del tutto' },
    'sh.transmitted': { en: 'Radiation getting through', it: 'Radiazione che passa' },
    'sh.aria':        { en: 'Source, shield and person', it: 'Sorgente, schermo e persona' },

    'sh.rad.alpha.short': { en: 'Alpha', it: 'Alfa' },
    'sh.rad.alpha.note': {
      en: 'Helium nuclei: heavy, doubly charged, and stopped by a few centimetres of air or a sheet of paper. Dangerous only if the source gets inside the body.',
      it: 'Nuclei di elio: pesanti, con carica doppia, fermati da pochi centimetri d\u2019aria o da un foglio di carta. Pericolosi solo se la sorgente entra nel corpo.'
    },
    'sh.rad.beta.short': { en: 'Beta', it: 'Beta' },
    'sh.rad.beta.note': {
      en: 'Electrons or positrons: lighter and more penetrating than alpha, stopped by a few millimetres of aluminium. Heavy shields can make things worse by producing bremsstrahlung X-rays.',
      it: 'Elettroni o positroni: pi\u00f9 leggeri e penetranti delle alfa, fermati da pochi millimetri di alluminio. Schermi pesanti possono peggiorare le cose, producendo raggi X di frenamento (bremsstrahlung).'
    },
    'sh.rad.gamma.short': { en: 'Gamma', it: 'Gamma' },
    'sh.rad.gamma.note': {
      en: 'Photons: no charge, no mass, no finite range. Attenuated exponentially \u2014 each half-value layer halves what gets through, but never brings it to zero. The 662 keV line of caesium-137 is used here.',
      it: 'Fotoni: niente carica, niente massa, nessun percorso finito. Vengono attenuati esponenzialmente: ogni strato emivalente dimezza ci\u00f2 che passa, ma non lo azzera mai. Qui si usa la riga a 662 keV del cesio-137.'
    },

    'sh.mat.air':       { en: 'Air', it: 'Aria' },
    'sh.mat.paper':     { en: 'Paper', it: 'Carta' },
    'sh.mat.water':     { en: 'Water', it: 'Acqua' },
    'sh.mat.concrete':  { en: 'Concrete', it: 'Calcestruzzo' },
    'sh.mat.aluminium': { en: 'Aluminium', it: 'Alluminio' },
    'sh.mat.lead':      { en: 'Lead', it: 'Piombo' },

    'sh.v.none':       { en: 'Nothing gets through', it: 'Non passa nulla' },
    'sh.v.negligible': { en: 'Below the annual limit for the public', it: 'Sotto il limite annuo per la popolazione' },
    'sh.v.low':        { en: 'Within occupational limits, but not negligible', it: 'Entro i limiti per i lavoratori esposti, ma non trascurabile' },
    'sh.v.high':       { en: 'Well above any regulatory limit', it: 'Ben oltre qualsiasi limite normativo' },
    'sh.v.ars':        { en: 'Acute radiation syndrome territory', it: 'Soglia della sindrome acuta da radiazioni' },
    'sh.v.lethal':     { en: 'Around the median lethal dose without treatment', it: 'Attorno alla dose letale mediana senza trattamento' },

    'sh.th.public': { en: 'annual limit, general public', it: 'limite annuo, popolazione' },
    'sh.th.worker': { en: 'annual limit, radiation workers', it: 'limite annuo, lavoratori esposti' },
    'sh.th.ars':    { en: 'onset of acute radiation syndrome', it: 'soglia della sindrome acuta da radiazioni' },
    'sh.th.ld50':   { en: 'median lethal dose without treatment', it: 'dose letale mediana senza trattamento' },

    /* ---------- pagina radiodatazione ---------- */
    'dt.title': { en: 'Dating Techniques \u2014 Simone Canevari', it: 'Tecniche di datazione \u2014 Simone Canevari' },
    'dt.h1':    { en: 'Dating Techniques', it: 'Tecniche di datazione' },
    'dt.tagline': {
      en: 'How old is old? Comparing radiocarbon and thermoluminescence, and what their error bars mean',
      it: 'Quanto \u00e8 antico? Radiocarbonio e termoluminescenza a confronto, e cosa significano davvero i loro margini d\u2019errore'
    },
    'dt.download': { en: 'Download the thesis (PDF)', it: 'Scarica la tesi (PDF)' },

    'dt.about.h': { en: 'What the thesis is about', it: 'Di cosa parla la tesi' },
    'dt.about.p1': {
      en: 'Every dating technique answers the question \u201chow old is this?\u201d with a range, never a number. The width of that range decides what you can actually conclude \u2014 whether you can tell two archaeological layers apart, or whether the answer is simply \u201csomewhere in this century\u201d.',
      it: 'Ogni tecnica di datazione risponde alla domanda \u201cquanto \u00e8 antico?\u201d con un intervallo, mai con un numero. L\u2019ampiezza di quell\u2019intervallo decide cosa si pu\u00f2 davvero concludere: se si riescono a distinguere due strati archeologici, oppure se la risposta \u00e8 soltanto \u201cda qualche parte in questo secolo\u201d.'
    },
    'dt.about.p2': {
      en: 'My bachelor thesis compares radiocarbon dating with thermoluminescence, applied to the same archaeological contexts. The two measure different things: radiocarbon measures when an organism stopped exchanging carbon with the atmosphere; thermoluminescence measures when a ceramic was last fired. When both are available, they cross-check each other.',
      it: 'La mia tesi triennale confronta la datazione al radiocarbonio con la termoluminescenza, applicate agli stessi contesti archeologici. Le due misurano cose diverse: il radiocarbonio misura quando un organismo ha smesso di scambiare carbonio con l\u2019atmosfera; la termoluminescenza misura quando una ceramica \u00e8 stata cotta l\u2019ultima volta. Quando entrambe sono disponibili, si verificano a vicenda.'
    },
    'dt.about.p3': {
      en: 'Beyond about ten half-lives there is too little carbon-14 left to count against the background, and the method stops working. Thermoluminescence reaches much further back but pays for it with a far larger error, because the dose rate the sample absorbed while it was buried has to be reconstructed rather than measured directly \u2014 and that reconstruction is the dominant source of error.',
      it: 'Oltre una decina di emivite resta troppo poco carbonio-14 per distinguerlo dal fondo, e il metodo smette di funzionare. La termoluminescenza arriva molto pi\u00f9 indietro, ma lo paga con un errore assai maggiore: il rateo di dose assorbito dal campione durante la giacitura va ricostruito invece che misurato direttamente \u2014 e quella ricostruzione \u00e8 la principale fonte di errore.'
    },

    'dt.key.h': { en: 'The numbers that matter', it: 'I numeri che contano' },
    'dt.stat.halflife':  { en: 'half-life of carbon-14 \u2014 the clock that makes the method work', it: 'emivita del carbonio-14 \u2014 l\u2019orologio su cui si basa il metodo' },
    'dt.stat.max':       { en: 'practical limit of accelerator mass spectrometry', it: 'limite pratico della spettrometria di massa con acceleratore' },
    'dt.stat.precision': { en: 'best achievable precision \u2014 about 16 years of uncertainty', it: 'precisione massima raggiungibile \u2014 circa 16 anni di incertezza' },

    'dt.compare.h': { en: 'Same object, different answers', it: 'Stesso oggetto, risposte diverse' },
    'dt.compare.p': {
      en: 'Set the true age of an object and see how each technique would date it. The bar is the interval each method would return \u2014 the wider it is, the less the result tells you.',
      it: 'Imposta l\u2019et\u00e0 vera di un oggetto e guarda come lo daterebbe ciascuna tecnica. La barra \u00e8 l\u2019intervallo che il metodo restituirebbe: pi\u00f9 \u00e8 larga, meno il risultato dice.'
    },
    'dt.compare.note': {
      en: 'Uncertainties are modelled as a relative term plus a fixed one, using the orders of magnitude reported in the thesis and in standard literature. It is a teaching illustration, not the full error propagation a laboratory would perform on a real sample.',
      it: 'Le incertezze sono modellate come un termine relativo pi\u00f9 uno fisso, usando gli ordini di grandezza riportati nella tesi e nella letteratura standard. \u00c8 un\u2019illustrazione didattica, non la propagazione completa degli errori che un laboratorio eseguirebbe su un campione reale.'
    },

    'dt.takeaway.h': { en: 'Why it matters', it: 'Perch\u00e9 conta' },
    'dt.takeaway.p1': {
      en: 'Move the slider to a few hundred years and thermoluminescence returns a range so wide it barely constrains anything, while radiocarbon is still sharp. Move it past fifty thousand and radiocarbon disappears entirely, leaving thermoluminescence as the only option available \u2014 imprecise, but not nothing.',
      it: 'Sposta il cursore su qualche centinaio di anni e la termoluminescenza restituisce un intervallo cos\u00ec ampio da vincolare ben poco, mentre il radiocarbonio resta preciso. Portalo oltre i cinquantamila e il radiocarbonio scompare del tutto, lasciando la termoluminescenza come unica opzione: imprecisa, ma non nulla.'
    },
    'dt.takeaway.p2': {
      en: 'There is no best technique, only a technique appropriate to the question and the material. That is the point the thesis argues, and it is why the two methods were applied to the same finds rather than treated as alternatives: agreement between independent methods is worth more than precision from either one alone.',
      it: 'Non esiste una tecnica migliore, ma una tecnica adeguata alla domanda e al materiale. \u00c8 la tesi che il lavoro sostiene, ed \u00e8 il motivo per cui i due metodi sono stati applicati agli stessi reperti invece che trattati come alternative: l\u2019accordo fra metodi indipendenti vale pi\u00f9 della precisione di uno solo.'
    },

    'dt.slider': { en: 'True age of the object', it: 'Et\u00e0 vera dell\u2019oggetto' },
    'dt.years':  { en: 'years', it: 'anni' },
    'dt.y':      { en: 'y', it: 'a' },
    'dt.true':   { en: 'true age', it: 'et\u00e0 vera' },
    'dt.na':     { en: 'not applicable at this age', it: 'non applicabile a questa et\u00e0' },
    'dt.aria':   { en: 'Comparison of dating techniques', it: 'Confronto fra tecniche di datazione' },
    'dt.ad':     { en: 'AD', it: 'd.C.' },
    'dt.bc':     { en: 'BC', it: 'a.C.' },

    'dt.m.ams.short': { en: 'AMS \u00b9\u2074C', it: 'AMS \u00b9\u2074C' },
    'dt.m.ams.note': {
      en: 'Accelerator mass spectrometry counts carbon-14 atoms directly instead of waiting for them to decay. Needs a far smaller sample and gives the tightest error \u2014 the best method on both counts.',
      it: 'La spettrometria di massa con acceleratore conta direttamente gli atomi di carbonio-14 invece di attenderne il decadimento. Richiede un campione molto pi\u00f9 piccolo e d\u00e0 l\u2019errore pi\u00f9 contenuto: il metodo migliore su entrambi i fronti.'
    },
    'dt.m.c14.short': { en: 'Conventional \u00b9\u2074C', it: '\u00b9\u2074C convenzionale' },
    'dt.m.c14.note': {
      en: 'Counting decay events rather than atoms. Requires more material and more time, and the statistical error on the counts is correspondingly larger.',
      it: 'Conta gli eventi di decadimento invece degli atomi. Richiede pi\u00f9 materiale e pi\u00f9 tempo, e l\u2019errore statistico sui conteggi \u00e8 di conseguenza maggiore.'
    },
    'dt.m.tl.short': { en: 'Thermoluminescence', it: 'Termoluminescenza' },
    'dt.m.tl.note': {
      en: 'Measures the radiation dose a ceramic accumulated since it was last fired. Reaches far beyond the radiocarbon limit, but the buried dose rate must be reconstructed, and that reconstruction dominates the error.',
      it: 'Misura la dose di radiazione accumulata da una ceramica dall\u2019ultima cottura. Arriva molto oltre il limite del radiocarbonio, ma il rateo di dose durante la giacitura va ricostruito, e quella ricostruzione domina l\u2019errore.'
    },
    'dt.m.dendro.short': { en: 'Dendrochronology', it: 'Dendrocronologia' },
    'dt.m.dendro.note': {
      en: 'Counting tree rings against a reference chronology. Where it applies it can give the exact year \u2014 but it only works on wood, and only where a reference sequence for that region and species exists.',
      it: 'Conta gli anelli di accrescimento confrontandoli con una cronologia di riferimento. Dove \u00e8 applicabile pu\u00f2 dare l\u2019anno esatto, ma funziona solo sul legno e solo dove esiste una sequenza di riferimento per quella regione e specie.'
    },

    /* ---------- pagina Vinland ---------- */
    'vl.title': { en: 'The Vinland Map \u2014 Simone Canevari', it: 'La Mappa di Vinland \u2014 Simone Canevari' },
    'vl.h1':    { en: 'The Vinland Map', it: 'La Mappa di Vinland' },
    'vl.tagline': {
      en: 'Sixty years of spectroscopy on a map that claimed to show America before Columbus',
      it: 'Sessant\u2019anni di spettroscopia su una mappa che sosteneva di mostrare l\u2019America prima di Colombo'
    },
    'vl.download': { en: 'Download the study (PDF)', it: 'Scarica lo studio (PDF)' },

    'vl.about.h': { en: 'What the study is about', it: 'Di cosa parla lo studio' },
    'vl.about.p1': {
      en: 'In 1965 Yale published a parchment map showing a landmass west of Greenland, labelled Vinlanda Insula. If genuine, it was the earliest known European depiction of America \u2014 drawn decades before Columbus sailed.',
      it: 'Nel 1965 Yale pubblic\u00f2 una mappa su pergamena che mostrava una terra a ovest della Groenlandia, indicata come Vinlanda Insula. Se autentica, sarebbe stata la pi\u00f9 antica raffigurazione europea nota dell\u2019America \u2014 disegnata decenni prima del viaggio di Colombo.'
    },
    'vl.about.p2': {
      en: 'It was not genuine. What makes the case worth studying is not the forgery itself but how it was exposed: not by historians arguing over handwriting, but by physicists and chemists reading the ink. My study looks at the role Raman spectroscopy played in that verdict.',
      it: 'Non era autentica. Ci\u00f2 che rende il caso interessante non \u00e8 la falsificazione in s\u00e9, ma il modo in cui \u00e8 stata smascherata: non da storici in disaccordo sulla grafia, ma da fisici e chimici che hanno letto l\u2019inchiostro. Il mio studio guarda al ruolo che la spettroscopia Raman ha avuto in quel verdetto.'
    },
    'vl.about.p3': {
      en: 'The parchment is real. The ink is not. A forger who obtains genuine medieval parchment defeats radiocarbon dating entirely \u2014 which is precisely why dating the support and dating the writing are two different problems, and why spectroscopy of the pigment turned out to be the decisive measurement.',
      it: 'La pergamena \u00e8 autentica. L\u2019inchiostro no. Un falsario che si procura pergamena medievale vera rende inefficace la datazione al radiocarbonio \u2014 ed \u00e8 esattamente per questo che datare il supporto e datare la scrittura sono due problemi distinti, e per cui la spettroscopia del pigmento si \u00e8 rivelata la misura decisiva.'
    },
    'vl.about.p4': {
      en: 'Raman spectroscopy identifies anatase unambiguously: it has a strong, narrow band at 143 cm\u207b\u00b9 that no medieval pigment produces. It is also non-destructive \u2014 you can point a laser at a priceless manuscript and take nothing away from it. For cultural heritage that is not a convenience, it is a precondition.',
      it: 'La spettroscopia Raman identifica l\u2019anatasio senza ambiguit\u00e0: ha una banda intensa e stretta a 143 cm\u207b\u00b9 che nessun pigmento medievale produce. Ed \u00e8 non distruttiva \u2014 si pu\u00f2 puntare un laser su un manoscritto inestimabile senza portargli via nulla. Per i beni culturali non \u00e8 una comodit\u00e0: \u00e8 una precondizione.'
    },

    'vl.key.h': { en: 'The decisive evidence', it: 'La prova decisiva' },
    'vl.stat.anatase':   { en: 'anatase in the ink \u2014 a pigment industrially produced only from the 1920s', it: 'anatasio nell\u2019inchiostro \u2014 un pigmento prodotto industrialmente solo dagli anni Venti' },
    'vl.stat.parchment': { en: 'radiocarbon date of the parchment: genuinely medieval', it: 'datazione al radiocarbonio della pergamena: autenticamente medievale' },
    'vl.stat.years':     { en: 'years between publication and the final verdict', it: 'anni fra la pubblicazione e il verdetto finale' },

    'vl.tl.h': { en: 'Sixty years of analysis', it: 'Sessant\u2019anni di analisi' },
    'vl.tl.p': {
      en: 'Each point is a study or a finding. Select one to read what it concluded \u2014 and notice how the verdict swung back and forth for decades before the evidence settled.',
      it: 'Ogni punto \u00e8 uno studio o una scoperta. Selezionane uno per leggere a cosa \u00e8 arrivato \u2014 e nota come il verdetto abbia oscillato per decenni prima che le prove si consolidassero.'
    },
    'vl.tl.note': {
      en: 'Chronology compiled from the Vinland Map entry on Wikipedia and from Yale University\u2019s announcement of 1 September 2021.',
      it: 'Cronologia ricostruita dalla voce Wikipedia sulla Mappa di Vinland e dall\u2019annuncio della Yale University del 1\u00b0 settembre 2021.'
    },
    'vl.tl.aria': { en: 'Timeline of studies on the Vinland Map', it: 'Cronologia degli studi sulla Mappa di Vinland' },

    'vl.legend.for':     { en: 'supported authenticity', it: 'a favore dell\u2019autenticit\u00e0' },
    'vl.legend.against': { en: 'evidence of forgery', it: 'indizi di falsificazione' },
    'vl.legend.neutral': { en: 'context or inconclusive', it: 'contesto o non conclusivo' },

    'vl.takeaway.h': { en: 'Why it matters', it: 'Perch\u00e9 conta' },
    'vl.takeaway.p1': {
      en: 'A single measurement rarely settles anything. McCrone found anatase in 1972; a different team using a different technique found almost none in the 1980s; the argument ran for another thirty years. What eventually closed it was not one decisive experiment but the convergence of several independent methods on the same answer.',
      it: 'Una singola misura raramente chiude una questione. McCrone trov\u00f2 anatasio nel 1972; un altro gruppo, con un\u2019altra tecnica, negli anni Ottanta non ne trov\u00f2 quasi nulla; la discussione \u00e8 durata altri trent\u2019anni. A chiuderla non \u00e8 stato un esperimento decisivo, ma la convergenza di pi\u00f9 metodi indipendenti sulla stessa risposta.'
    },
    'vl.takeaway.p2': {
      en: 'That is the part worth carrying over into any analytical work: a result that no one can reproduce, or that one technique alone supports, is a hypothesis rather than a conclusion.',
      it: '\u00c8 questa la parte che vale la pena portarsi dietro in qualsiasi lavoro analitico: un risultato che nessuno riesce a riprodurre, o sostenuto da una sola tecnica, \u00e8 un\u2019ipotesi, non una conclusione.'
    },

    /* eventi della cronologia */
    'vl.e.1957.year': { en: '1957', it: '1957' },
    'vl.e.1957.h': { en: 'The map surfaces', it: 'La mappa compare' },
    'vl.e.1957.p': {
      en: 'The map appears on the antiquarian market, offered to the British Museum and then bought by the dealer Laurence Witten. Its provenance before this point has never been established \u2014 an absence that would itself become part of the case.',
      it: 'La mappa compare sul mercato antiquario, offerta al British Museum e poi acquistata dal mercante Laurence Witten. La sua provenienza precedente non \u00e8 mai stata accertata: un\u2019assenza che sarebbe diventata essa stessa parte del caso.'
    },
    'vl.e.1965.year': { en: '1965', it: '1965' },
    'vl.e.1965.h': { en: 'Yale publishes it as authentic', it: 'Yale la pubblica come autentica' },
    'vl.e.1965.p': {
      en: 'Yale University Press publishes The Vinland Map and the Tartar Relation, presenting the map as a genuine pre-Columbian document. It makes headlines worldwide.',
      it: 'La Yale University Press pubblica The Vinland Map and the Tartar Relation, presentando la mappa come un autentico documento precolombiano. La notizia fa il giro del mondo.'
    },
    'vl.e.1966.year': { en: '1966', it: '1966' },
    'vl.e.1966.h': { en: 'The first doubts', it: 'I primi dubbi' },
    'vl.e.1966.p': {
      en: 'A conference at the Smithsonian Institution raises a series of objections \u2014 on the handwriting, the cartography and the missing provenance. None is decisive, but the consensus starts to crack.',
      it: 'Un convegno alla Smithsonian Institution solleva una serie di obiezioni: sulla grafia, sulla cartografia e sulla provenienza mancante. Nessuna \u00e8 decisiva, ma il consenso inizia a incrinarsi.'
    },
    'vl.e.1967.year': { en: '1967', it: '1967' },
    'vl.e.1967.h': { en: 'The ink is not what it should be', it: 'L\u2019inchiostro non \u00e8 quello che dovrebbe' },
    'vl.e.1967.p': {
      en: 'British Museum scientists examine the document and find the ink is not conventional iron-gall ink \u2014 the standard medieval writing ink \u2014 and that the parchment appears to have been treated with an unidentified substance.',
      it: 'Gli scienziati del British Museum esaminano il documento e rilevano che l\u2019inchiostro non \u00e8 il consueto ferro-gallico \u2014 l\u2019inchiostro da scrittura medievale standard \u2014 e che la pergamena sembra trattata con una sostanza non identificata.'
    },
    'vl.e.1972.year': { en: '1972', it: '1972' },
    'vl.e.1972.h': { en: 'McCrone finds anatase', it: 'McCrone trova l\u2019anatasio' },
    'vl.e.1972.p': {
      en: 'Walter McCrone\u2019s forensic analysis identifies anatase \u2014 titanium dioxide \u2014 in rounded crystals of the kind manufactured for pale pigments since the 1920s. A twentieth-century material in a supposedly fifteenth-century document.',
      it: 'L\u2019analisi forense di Walter McCrone identifica anatasio \u2014 biossido di titanio \u2014 in cristalli arrotondati del tipo prodotto per pigmenti chiari a partire dagli anni Venti. Un materiale del Novecento in un documento che si suppone del Quattrocento.'
    },
    'vl.e.1985.year': { en: '1980s', it: 'Anni \u201980' },
    'vl.e.1985.h': { en: 'A contradiction', it: 'Una contraddizione' },
    'vl.e.1985.p': {
      en: 'Thomas Cahill\u2019s team at UC Davis analyses the map with PIXE (particle-induced X-ray emission) and reports only trace amounts of titanium \u2014 apparently contradicting McCrone. The question reopens and stays open for years.',
      it: 'Il gruppo di Thomas Cahill a UC Davis analizza la mappa con la tecnica PIXE (emissione di raggi X indotta da particelle) e rileva solo tracce di titanio, in apparente contraddizione con McCrone. La questione si riapre e resta aperta per anni.'
    },
    'vl.e.1991.year': { en: '1991', it: '1991' },
    'vl.e.1991.h': { en: 'McCrone returns', it: 'McCrone torna sulla mappa' },
    'vl.e.1991.p': {
      en: 'A second examination confirms the anatase particles penetrate the full depth of the ink \u2014 they are not surface contamination \u2014 and identifies gelatin as the binder.',
      it: 'Un secondo esame conferma che le particelle di anatasio penetrano l\u2019intero spessore dell\u2019inchiostro \u2014 non sono contaminazione superficiale \u2014 e identifica la gelatina come legante.'
    },
    'vl.e.1995.year': { en: '1995\u20132002', it: '1995\u20132002' },
    'vl.e.1995.h': { en: 'The parchment is medieval', it: 'La pergamena \u00e8 medievale' },
    'vl.e.1995.p': {
      en: 'Radiocarbon dating by Donahue, Olin and Harbottle places the parchment between 1423 and 1445. The support is genuinely medieval \u2014 which proves nothing about the drawing on it, and shows why dating the material and dating the artefact are separate questions.',
      it: 'La datazione al radiocarbonio di Donahue, Olin e Harbottle colloca la pergamena fra il 1423 e il 1445. Il supporto \u00e8 autenticamente medievale \u2014 il che non dice nulla sul disegno che vi \u00e8 sopra, e mostra perch\u00e9 datare il materiale e datare il manufatto siano due domande distinte.'
    },
    'vl.e.2002.year': { en: '2002', it: '2002' },
    'vl.e.2002.h': { en: 'Raman spectroscopy', it: 'La spettroscopia Raman' },
    'vl.e.2002.p': {
      en: 'Katherine Brown and Robin Clark analyse the map by Raman spectroscopy and confirm significant quantities of anatase, identifying the black pigment as soot-type carbon. Non-destructive, and unambiguous on the anatase band.',
      it: 'Katherine Brown e Robin Clark analizzano la mappa con la spettroscopia Raman e confermano quantit\u00e0 significative di anatasio, identificando il pigmento nero come carbone di tipo fuliggine. Tecnica non distruttiva, e priva di ambiguit\u00e0 sulla banda dell\u2019anatasio.'
    },
    'vl.e.2021.year': { en: '2021', it: '2021' },
    'vl.e.2021.h': { en: 'Yale settles it', it: 'Yale chiude la questione' },
    'vl.e.2021.p': {
      en: 'A full elemental analysis by Yale finds titanium ink throughout the map\u2019s lines and text. Decisively, an inscription on the back \u2014 apparently a bookbinder\u2019s note \u2014 had been overwritten in the same modern ink, to make the map look as though it had always belonged with the medieval volume. Yale declares the map a forgery.',
      it: 'Un\u2019analisi elementare completa condotta da Yale rileva inchiostro al titanio lungo tutte le linee e il testo della mappa. In modo decisivo, un\u2019iscrizione sul retro \u2014 verosimilmente una nota del rilegatore \u2014 risulta sovrascritta con lo stesso inchiostro moderno, per far sembrare che la mappa fosse sempre appartenuta al volume medievale. Yale dichiara la mappa un falso.'
    },

    /* ---------- pagina Forza 4 ---------- */
    'c4.title': { en: 'Connect Four \u2014 Simone Canevari', it: 'Forza 4 \u2014 Simone Canevari' },
    'c4.h1':    { en: 'Connect Four', it: 'Forza 4' },
    'c4.tagline': {
      en: 'What a neural network learns about a game it was never taught to play',
      it: 'Cosa impara una rete neurale su un gioco di cui non conosce le regole'
    },
    'c4.download': { en: 'Download the report (PDF)', it: 'Scarica la relazione (PDF)' },

    'c4.about.h': { en: 'What the project is about', it: 'Di cosa parla il progetto' },
    'c4.about.p1': {
      en: 'Given a Connect Four position, can a model predict who wins? Not by searching the game tree \u2014 by learning from thousands of finished games what a winning board looks like.',
      it: 'Data una posizione di Forza 4, un modello pu\u00f2 prevedere chi vince? Non esplorando l\u2019albero di gioco, ma imparando da migliaia di partite concluse che aspetto ha una configurazione vincente.'
    },
    'c4.about.p2': {
      en: 'The dataset is a set of board positions, each labelled with the eventual outcome: red wins, yellow wins, or draw. The first thing worth noticing is that the labels are badly unbalanced \u2014 around 66% red, 23% yellow, 10% draw \u2014 which means any model will be biased towards predicting a red win. That bias had to be accounted for rather than ignored.',
      it: 'Il dataset \u00e8 un insieme di posizioni sulla griglia, ciascuna etichettata con l\u2019esito finale: vince rosso, vince giallo, oppure pareggio. La prima cosa da notare \u00e8 che le etichette sono fortemente sbilanciate \u2014 circa 66% rosso, 23% giallo, 10% pareggio \u2014 il che rende qualsiasi modello incline a prevedere la vittoria del rosso. Un bias da tenere in conto, non da ignorare.'
    },
    'c4.about.p3': {
      en: 'A Multi-Layer Perceptron, trained with the Adam optimiser and early stopping. The gap between training and test accuracy is small \u2014 the model generalises rather than memorising, even if 82% is modest by modern standards.',
      it: 'Un Multi-Layer Perceptron, addestrato con l\u2019ottimizzatore Adam e early stopping. Lo scarto fra accuratezza di training e di test \u00e8 contenuto: il modello generalizza invece di memorizzare, anche se l\u201982% resta modesto per gli standard attuali.'
    },
    'c4.about.p4': {
      en: 'The interesting part is not the accuracy. It is that the weights the network learned can be read back: laid out over the board, they show which squares the model came to consider important \u2014 and it converged on something Connect Four players already know.',
      it: 'La parte interessante non \u00e8 l\u2019accuratezza. \u00c8 che i pesi appresi dalla rete si possono rileggere: disposti sulla griglia, mostrano quali caselle il modello ha imparato a considerare importanti \u2014 ed \u00e8 arrivato a qualcosa che i giocatori di Forza 4 gi\u00e0 sanno.'
    },

    'c4.results.h': { en: 'The model', it: 'Il modello' },
    'c4.stat.inputs': { en: 'input neurons \u2014 one per cell of the 7\u00d76 grid', it: 'neuroni di input \u2014 uno per casella della griglia 7\u00d76' },
    'c4.stat.hidden': { en: 'hidden layers with ReLU activation', it: 'strati nascosti con attivazione ReLU' },
    'c4.stat.train':  { en: 'accuracy on the training set', it: 'accuratezza sul training set' },
    'c4.stat.test':   { en: 'accuracy on the held-out test set', it: 'accuratezza sul test set' },

    'c4.board.h': { en: 'Where would you open?', it: 'Dove apriresti?' },
    'c4.board.p': {
      en: 'Pick a column for the first move and see what the network thinks of it. The values are the weights the model learned for the bottom row \u2014 the squares where a first piece actually lands.',
      it: 'Scegli una colonna per la prima mossa e guarda cosa ne pensa la rete. I valori sono i pesi che il modello ha appreso per la riga in basso: le caselle dove un primo gettone finisce davvero.'
    },
    'c4.board.note': {
      en: 'These are raw model weights read from the trained network, not measured win probabilities. Zero means neutral; the sign tells you whether the model associates that square with winning or losing positions.',
      it: 'Questi sono i pesi grezzi letti dalla rete addestrata, non probabilit\u00e0 di vittoria misurate. Lo zero indica neutralit\u00e0; il segno dice se il modello associa quella casella a posizioni vincenti o perdenti.'
    },

    'c4.takeaway.h': { en: 'What it learned', it: 'Cosa ha imparato' },
    'c4.takeaway.p1': {
      en: 'The network was never told the rules. It never searched ahead. It only saw finished boards and their outcomes \u2014 and from that alone it concluded that the centre columns matter most and the far right column is a liability.',
      it: 'Alla rete non sono mai state date le regole, e non ha mai esplorato mosse future. Ha visto soltanto griglie concluse e il loro esito \u2014 e da questo soltanto ha concluso che le colonne centrali contano di pi\u00f9 e che quella all\u2019estrema destra \u00e8 uno svantaggio.'
    },
    'c4.takeaway.p2': {
      en: 'That happens to be correct: Connect Four is a solved game, and the first player wins with perfect play only by opening in the centre. The model rediscovered a piece of game theory from data, which is a good illustration of what these methods do \u2014 and of why reading a model\u2019s weights is worth the effort, rather than stopping at its accuracy score.',
      it: 'Ed \u00e8 corretto: Forza 4 \u00e8 un gioco risolto, e con gioco perfetto il primo giocatore vince solo aprendo al centro. Il modello ha riscoperto dai dati un risultato di teoria dei giochi: un buon esempio di cosa fanno questi metodi \u2014 e del perch\u00e9 valga la pena leggere i pesi di un modello, invece di fermarsi al suo punteggio di accuratezza.'
    },

    'c4.hint':    { en: 'Pick a column for the first move.', it: 'Scegli una colonna per la prima mossa.' },
    'c4.aria':    { en: 'Connect Four board', it: 'Griglia di Forza 4' },
    'c4.column':  { en: 'Column', it: 'Colonna' },
    'c4.weight':  { en: 'Model weight', it: 'Peso del modello' },
    'c4.scale':   { en: '0 = neutral', it: '0 = neutro' },
    'c4.compare': { en: 'All columns compared', it: 'Confronto fra tutte le colonne' },

    'c4.v.best':    { en: 'the strongest opening the model found', it: 'l\u2019apertura pi\u00f9 forte secondo il modello' },
    'c4.v.good':    { en: 'a favourable opening', it: 'un\u2019apertura favorevole' },
    'c4.v.neutral': { en: 'roughly neutral', it: 'sostanzialmente neutra' },
    'c4.v.weak':    { en: 'a weak opening', it: 'un\u2019apertura debole' },
    'c4.v.worst':   { en: 'the weakest opening the model found', it: 'l\u2019apertura pi\u00f9 debole secondo il modello' },

    /* ---------- pagina microplastiche ---------- */
    'mp.title': { en: 'Domestic Microplastics — Simone Canevari', it: 'Microplastiche domestiche — Simone Canevari' },
    'mp.back':  { en: '\u2190 Projects', it: '\u2190 Progetti' },
    'mp.back.all': { en: '\u2190 All projects', it: '\u2190 Tutti i progetti' },
    'mp.h1':    { en: 'Domestic Microplastics', it: 'Microplastiche domestiche' },
    'mp.tagline': {
      en: 'Raman spectroscopy and machine learning to classify what our waste is made of',
      it: 'Spettroscopia Raman e machine learning per classificare di cosa sono fatti i nostri rifiuti'
    },
    'mp.download': { en: 'Download the thesis (PDF)', it: 'Scarica la tesi (PDF)' },

    'mp.about.h': { en: 'What the thesis is about', it: 'Di cosa parla la tesi' },
    'mp.about.p1': {
      en: 'Microplastics are everywhere \u2014 in water, soil, air and food. Identifying which polymer a fragment is made of matters: different plastics degrade differently, carry different additives, and pose different risks. The problem is that identification is slow and requires an expert reading each spectrum.',
      it: 'Le microplastiche sono ovunque: nell\u2019acqua, nel suolo, nell\u2019aria e nel cibo. Sapere di quale polimero \u00e8 fatto un frammento conta: plastiche diverse si degradano in modo diverso, portano additivi diversi e comportano rischi diversi. Il problema \u00e8 che identificarle \u00e8 lento e richiede che un esperto legga ogni spettro.'
    },
    'mp.about.p2': {
      en: 'This thesis asks whether that reading can be automated. Raman spectroscopy gives every polymer a vibrational fingerprint; a machine learning model can learn to recognise those fingerprints \u2014 including on dirty, coloured, real-world fragments rather than clean laboratory standards.',
      it: 'Questa tesi si chiede se quella lettura possa essere automatizzata. La spettroscopia Raman assegna a ogni polimero un\u2019impronta vibrazionale; un modello di machine learning pu\u00f2 imparare a riconoscerla \u2014 anche su frammenti reali, sporchi e colorati, non solo su standard puliti da laboratorio.'
    },
    'mp.about.p3': {
      en: 'The classifier is a Support Vector Machine with a linear kernel, trained on 900 spectra per class from transparent samples plus 5,413 spectra from coloured fragments \u2014 pigments and dyes make the signal harder, which is exactly the point: the dataset had to look like the real world.',
      it: 'Il classificatore \u00e8 una Support Vector Machine con kernel lineare, addestrata su 900 spettri per classe da campioni trasparenti pi\u00f9 5.413 spettri da frammenti colorati: pigmenti e coloranti rendono il segnale pi\u00f9 difficile, ed \u00e8 proprio il punto \u2014 il dataset doveva somigliare al mondo reale.'
    },
    'mp.about.p4': {
      en: 'Accuracy alone would not be enough. PCA and t-SNE were used to visualise how separable the classes really are, and the weights the SVM learned were compared against the known Raman bands of each polymer. They coincide: the model is keying on genuine chemical signatures, not on statistical artefacts of the dataset.',
      it: 'La sola accuratezza non basterebbe. PCA e t-SNE sono serviti a visualizzare quanto le classi siano davvero separabili, e i pesi appresi dall\u2019SVM sono stati confrontati con le bande Raman note di ciascun polimero. Coincidono: il modello si basa su firme chimiche reali, non su artefatti statistici del dataset.'
    },

    'mp.results.h': { en: 'Results', it: 'Risultati' },
    'mp.stat.spectra':  { en: 'Raman spectra collected from real plastic waste', it: 'spettri Raman raccolti da rifiuti plastici reali' },
    'mp.stat.classes':  { en: 'polymer classes \u2014 the standard recycling codes 01\u201307', it: 'classi di polimeri \u2014 i codici di riciclo standard 01\u201307' },
    'mp.stat.accuracy': { en: 'classification accuracy on the held-out test set', it: 'accuratezza di classificazione sul test set' },
    'mp.stat.cv':       { en: 'cross-validation accuracy', it: 'accuratezza in cross-validation' },

    'mp.explorer.h': { en: 'Explore the spectra', it: 'Esplora gli spettri' },
    'mp.explorer.p': {
      en: 'Each recycling code has its own vibrational fingerprint. Switch between polymers and hover a peak to see which molecular motion produces it \u2014 these are the features the classifier learns to tell apart.',
      it: 'Ogni codice di riciclo ha la propria impronta vibrazionale. Cambia polimero e passa sopra un picco per vedere quale moto molecolare lo produce: sono le caratteristiche che il classificatore impara a distinguere.'
    },
    'mp.explorer.note': {
      en: 'Spectra reconstructed from peak positions reported in the literature (Nava, Frezzotti & Leoni, Applied Spectroscopy 75(11), 2021), not from the experimental measurements of the thesis. They show where the diagnostic bands fall, not quantitative data.',
      it: 'Spettri ricostruiti dalle posizioni dei picchi riportate in letteratura (Nava, Frezzotti & Leoni, Applied Spectroscopy 75(11), 2021), non dalle misure sperimentali della tesi. Mostrano dove cadono le bande diagnostiche, non un dato quantitativo.'
    },

    'mp.takeaway.h': { en: 'Why it matters', it: 'Perch\u00e9 conta' },
    'mp.takeaway.p': {
      en: 'A screening tool that identifies polymers in seconds, from spectra of ordinary dirty fragments, makes large-scale environmental monitoring practical in a way that manual analysis never could be. The same pipeline extends to mixtures, blends and fragments embedded in other materials \u2014 tested here by adding a dedicated \u201cground\u201d class and checking the model still holds up under ambiguity.',
      it: 'Uno strumento di screening che identifica i polimeri in pochi secondi, a partire da spettri di frammenti sporchi qualsiasi, rende praticabile un monitoraggio ambientale su larga scala che l\u2019analisi manuale non potrebbe sostenere. La stessa pipeline si estende a miscele, mescole e frammenti immersi in altri materiali: verificato aggiungendo una classe dedicata \u201cground\u201d e controllando che il modello regga anche in condizioni ambigue.'
    },

    /* ---------- polimeri ---------- */
    'poly.pet':   { en: 'Polyethylene terephthalate', it: 'Polietilene tereftalato' },
    'poly.hdpe':  { en: 'High-density polyethylene', it: 'Polietilene ad alta densit\u00e0' },
    'poly.pvc':   { en: 'Polyvinyl chloride', it: 'Polivinilcloruro' },
    'poly.ldpe':  { en: 'Low-density polyethylene', it: 'Polietilene a bassa densit\u00e0' },
    'poly.pp':    { en: 'Polypropylene', it: 'Polipropilene' },
    'poly.ps':    { en: 'Polystyrene', it: 'Polistirene' },

    'poly.pet.note': {
      en: 'Bottles and food packaging. The carbonyl band at 1730 cm\u207b\u00b9 and the aromatic ring modes make PET one of the easiest polymers to recognise.',
      it: 'Bottiglie e imballaggi alimentari. La banda carbonilica a 1730 cm\u207b\u00b9 e i modi dell\u2019anello aromatico rendono il PET uno dei polimeri pi\u00f9 facili da riconoscere.'
    },
    'poly.hdpe.note': {
      en: 'Detergent bottles, caps, pipes. Chemically identical to LDPE \u2014 the two are told apart by the intensity ratio of the two CH\u2082 stretching bands, which reflects how crystalline the material is.',
      it: 'Flaconi di detersivo, tappi, tubi. Chimicamente identico all\u2019LDPE: i due si distinguono dal rapporto di intensit\u00e0 fra le due bande di stiramento CH\u2082, che riflette quanto il materiale \u00e8 cristallino.'
    },
    'poly.pvc.note': {
      en: 'Pipes, window frames, flooring. The C\u2013Cl stretching bands below 700 cm\u207b\u00b9 are unique among common plastics \u2014 no other recycling code has them.',
      it: 'Tubi, infissi, pavimenti. Le bande di stiramento C\u2013Cl sotto i 700 cm\u207b\u00b9 sono uniche fra le plastiche comuni: nessun altro codice di riciclo le presenta.'
    },
    'poly.ldpe.note': {
      en: 'Bags, films, flexible packaging. Same bands as HDPE, but the 2850 cm\u207b\u00b9 band is relatively stronger: less crystalline, more disordered chains. This pair is where a classifier earns its keep.',
      it: 'Sacchetti, pellicole, imballaggi flessibili. Stesse bande dell\u2019HDPE, ma quella a 2850 cm\u207b\u00b9 \u00e8 relativamente pi\u00f9 intensa: meno cristallino, catene pi\u00f9 disordinate. \u00c8 su questa coppia che un classificatore dimostra il suo valore.'
    },
    'poly.pp.note': {
      en: 'Caps, containers, textile fibres. The most common plastic in the dataset\u2019s coloured samples \u2014 over 1,700 spectra of pigmented fragments.',
      it: 'Tappi, contenitori, fibre tessili. La plastica pi\u00f9 rappresentata fra i campioni colorati del dataset: oltre 1.700 spettri di frammenti pigmentati.'
    },
    'poly.ps.note': {
      en: 'Foam packaging, disposable cups. The sharp band at 1001 cm\u207b\u00b9 \u2014 the aromatic ring breathing mode \u2014 is one of the strongest and most distinctive signals in all of Raman spectroscopy of polymers.',
      it: 'Imballaggi in polistirolo, bicchieri usa e getta. La banda stretta a 1001 cm\u207b\u00b9 \u2014 il modo di respiro dell\u2019anello aromatico \u2014 \u00e8 uno dei segnali pi\u00f9 intensi e caratteristici di tutta la spettroscopia Raman dei polimeri.'
    },
    'spectra.aria':    { en: 'Raman spectrum', it: 'Spettro Raman' },
    'spectra.tablist': { en: 'Polymer', it: 'Polimero' },

    /* ---------- assegnazioni dei picchi ---------- */
    'pk.pet.857':  { en: 'ring C\u2013H and C\u2013C vibrations of the benzene ring', it: 'vibrazioni C\u2013H e C\u2013C dell\u2019anello benzenico' },
    'pk.pet.1096': { en: 'C\u2013O and C\u2013C stretching of the ester group', it: 'stiramento C\u2013O e C\u2013C del gruppo estere' },
    'pk.pet.1295': { en: 'ring\u2013ester stretching', it: 'stiramento anello\u2013estere' },
    'pk.pet.1615': { en: 'aromatic ring stretching', it: 'stiramento dell\u2019anello aromatico' },
    'pk.pet.1730': { en: 'C=O stretching \u2014 the carbonyl band, PET\u2019s signature', it: 'stiramento C=O \u2014 la banda carbonilica, firma del PET' },
    'pk.pet.3080': { en: 'aromatic C\u2013H stretching', it: 'stiramento C\u2013H aromatico' },

    'pk.pe.1063':    { en: 'symmetric C\u2013C stretching', it: 'stiramento simmetrico C\u2013C' },
    'pk.pe.1130':    { en: 'asymmetric C\u2013C stretching', it: 'stiramento asimmetrico C\u2013C' },
    'pk.pe.1296':    { en: 'CH\u2082 twisting', it: 'torsione dei gruppi CH\u2082' },
    'pk.pe.1440':    { en: 'CH\u2082 bending', it: 'piegamento dei CH\u2082' },
    'pk.pe.2850':    { en: 'symmetric CH\u2082 stretching', it: 'stiramento simmetrico dei CH\u2082' },
    'pk.pe.2883':    { en: 'asymmetric CH\u2082 stretching', it: 'stiramento asimmetrico dei CH\u2082' },
    'pk.pe.2883.hd': { en: 'asymmetric CH\u2082 stretching \u2014 stronger than the 2850 band: this ratio marks HDPE', it: 'stiramento asimmetrico dei CH\u2082 \u2014 pi\u00f9 intenso della banda a 2850: \u00e8 questo rapporto a indicare l\u2019HDPE' },
    'pk.pe.2850.ld': { en: 'symmetric CH\u2082 stretching \u2014 stronger than the 2883 band: the ratio is reversed compared to HDPE', it: 'stiramento simmetrico dei CH\u2082 \u2014 pi\u00f9 intenso della banda a 2883: il rapporto \u00e8 invertito rispetto all\u2019HDPE' },

    'pk.pvc.638':  { en: 'C\u2013Cl stretching \u2014 unique to PVC among common plastics', it: 'stiramento C\u2013Cl \u2014 unico del PVC fra le plastiche comuni' },
    'pk.pvc.694':  { en: 'C\u2013Cl stretching', it: 'stiramento C\u2013Cl' },
    'pk.pvc.1430': { en: 'CH\u2082 bending', it: 'piegamento dei CH\u2082' },
    'pk.pvc.2914': { en: 'asymmetric CH\u2082 stretching', it: 'stiramento asimmetrico dei CH\u2082' },
    'pk.pvc.2935': { en: 'C\u2013H stretching', it: 'stiramento C\u2013H' },

    'pk.pp.809':  { en: 'CH\u2082 rocking and C\u2013C backbone stretching', it: 'rocking dei CH\u2082 e stiramento della catena C\u2013C' },
    'pk.pp.841':  { en: 'CH\u2082 rocking \u2014 a diagnostic band for polypropylene', it: 'rocking dei CH\u2082 \u2014 banda diagnostica del polipropilene' },
    'pk.pp.973':  { en: 'CH\u2083 rocking and C\u2013C stretching', it: 'rocking dei CH\u2083 e stiramento C\u2013C' },
    'pk.pp.1152': { en: 'C\u2013C stretching and CH\u2083 rocking', it: 'stiramento C\u2013C e rocking dei CH\u2083' },
    'pk.pp.1330': { en: 'CH bending', it: 'piegamento CH' },
    'pk.pp.1458': { en: 'asymmetric bending of CH\u2083 and CH\u2082', it: 'piegamento asimmetrico di CH\u2083 e CH\u2082' },
    'pk.pp.2883': { en: 'C\u2013H stretching', it: 'stiramento C\u2013H' },

    'pk.ps.621':  { en: 'aromatic ring deformation', it: 'deformazione dell\u2019anello aromatico' },
    'pk.ps.1001': { en: 'breathing mode of the aromatic ring \u2014 the sharpest and most distinctive band in polymer Raman spectroscopy', it: 'modo di respiro dell\u2019anello aromatico \u2014 la banda pi\u00f9 stretta e caratteristica nella spettroscopia Raman dei polimeri' },
    'pk.ps.1031': { en: 'in-plane C\u2013H bending of the ring', it: 'piegamento C\u2013H nel piano dell\u2019anello' },
    'pk.ps.1450': { en: 'CH\u2082 bending', it: 'piegamento dei CH\u2082' },
    'pk.ps.1602': { en: 'aromatic ring stretching', it: 'stiramento dell\u2019anello aromatico' },
    'pk.ps.3054': { en: 'aromatic C\u2013H stretching', it: 'stiramento C\u2013H aromatico' },

    /* ---------- spettro Raman e filtro ---------- */
    'raman.hint': {
      en: 'Hover or focus a peak to see its vibrational assignment.',
      it: 'Passa sopra un picco (o selezionalo da tastiera) per vederne l\u2019assegnazione vibrazionale.'
    },
    'raman.xaxis': { en: 'Raman shift (cm\u207b\u00b9)', it: 'Shift Raman (cm\u207b\u00b9)' },
    'raman.yaxis': { en: 'Intensity (a.u.)', it: 'Intensit\u00e0 (u.a.)' },

    'filter.hint': {
      en: 'Click a skill to filter the projects below.',
      it: 'Clicca una competenza per filtrare i progetti qui sotto.'
    },

    /* ---------- index ---------- */
    'index.title':   { en: 'Simone Canevari - Portfolio', it: 'Simone Canevari - Portfolio' },
    'index.about.h': { en: 'About me', it: 'Chi sono' },
    'index.about.p': {
      en: 'I’m an applied physicist and researcher at Fondazione Eucentre in Pavia, where I develop software and apply AI and machine learning to earthquake engineering, with a focus on computer vision. Before that, my academic work spanned Raman and SERS spectroscopy, machine learning on experimental data and nuclear physics — plus two years teaching physics in high schools.',
      it: 'Sono un fisico applicato e ricercatore in Fondazione Eucentre a Pavia, dove mi occupo di sviluppo software e applico AI e machine learning all’ingegneria sismica, con particolare attenzione alla computer vision. Prima, il mio percorso accademico ha riguardato spettroscopia Raman e SERS, machine learning su dati sperimentali e fisica nucleare — oltre a due anni di insegnamento della fisica nelle scuole superiori.'
    },

    'index.projects.h': { en: 'Research, Projects & Theses', it: 'Ricerca, progetti e tesi' },
    'index.projects.p': {
      en: 'Here are some of my projects and academic works. Some are in Italian, others in English.',
      it: 'Alcuni dei miei progetti e lavori accademici. Alcuni sono in italiano, altri in inglese.'
    },

    'index.p1.h': { en: 'Raman Analysis: the Vinland Map', it: 'Analisi Raman: la Mappa di Vinland' },
    'index.p1.p': { en: 'A study using Raman spectroscopy to evaluate dating of the Vinland Map.', it: 'Uno studio che usa la spettroscopia Raman per valutare la datazione della Mappa di Vinland.' },
    'index.p2.h': { en: 'Radiodating Techniques Comparison', it: 'Confronto tra tecniche di radiodatazione' },
    'index.p2.p': { en: 'Comparative analysis of radiodating methods in archaeological contexts.', it: 'Analisi comparativa dei metodi di radiodatazione in contesti archeologici.' },
    'index.p3.h': { en: 'Dirty Bombs: A Scientific Overview', it: 'Bombe sporche: una panoramica scientifica' },
    'index.p3.p': { en: 'Science work on the implications of dirty bombs.', it: 'Lavoro scientifico sulle implicazioni delle bombe sporche.' },
    'index.p4.h': { en: 'ML analysis of Connect Four', it: 'Analisi ML di Forza 4' },
    'index.p4.p': { en: 'Machine Learning report I did for an exam in which I analyzed connect four tournament results.', it: 'Relazione di Machine Learning svolta per un esame, in cui ho analizzato i risultati di un torneo di Forza 4.' },
    'index.p5.h': { en: 'Understanding and Classifying Domestic Microplastics through Raman Spectroscopy and Machine Learning', it: 'Comprendere e classificare le microplastiche domestiche con spettroscopia Raman e Machine Learning' },
    'index.p5.p': { en: 'A data-driven approach to identify microplastics using spectroscopic fingerprints and machine learning to face a modern environmental crisis.', it: 'Un approccio data-driven per identificare le microplastiche tramite impronte spettroscopiche e machine learning, di fronte a una crisi ambientale moderna.' },

    'index.contacts.h': { en: 'Contacts', it: 'Contatti' },
    'index.cv.link':    { en: 'Download my CV', it: 'Scarica il mio CV' },

    /* ---------- resume ---------- */
    'resume.title':    { en: 'Simone Canevari - Resume', it: 'Simone Canevari - Curriculum' },
    'resume.h':        { en: 'Resume', it: 'Curriculum' },
    'resume.degree':   { en: 'Researcher – AI & Machine Learning applied to Earthquake Engineering', it: 'Ricercatore – AI e Machine Learning applicati all’ingegneria sismica' },
    'resume.location': { en: 'Binasco (MI), Italy', it: 'Binasco (MI), Italia' },
    'resume.note':     { en: 'Full address and phone number are available in the downloadable CV.', it: 'Indirizzo completo e numero di telefono sono disponibili nel CV scaricabile.' },

    'resume.summary.h': { en: 'Professional Summary', it: 'Profilo professionale' },
    'resume.summary.p': {
      en: 'Applied physicist working as a researcher at Fondazione Eucentre (Pavia), where I develop software and apply artificial intelligence and machine learning methods to earthquake engineering, with a focus on computer vision. Background in Raman spectroscopy, data analysis and nuclear physics, combined with two years of teaching experience. Interested in interdisciplinary work and open to international collaboration.',
      it: 'Fisico applicato, ricercatore in Fondazione Eucentre (Pavia), dove mi occupo di sviluppo software e applico metodi di intelligenza artificiale e machine learning all’ingegneria sismica, con particolare attenzione alla computer vision. Formazione in spettroscopia Raman, analisi dati e fisica nucleare, unita a due anni di esperienza nell’insegnamento. Interessato al lavoro interdisciplinare e aperto a collaborazioni internazionali.'
    },

    'resume.edu.h':          { en: 'Education', it: 'Formazione' },
    'resume.edu.msc':        { en: 'MSc in Physics, University of Pavia, Italy', it: 'Laurea Magistrale in Fisica, Università di Pavia, Italia' },
    'resume.edu.msc.spec':   { en: 'Specialization in Applied and Nuclear Physics', it: 'Indirizzo in Fisica Applicata e Nucleare' },
    'resume.edu.msc.thesis': { en: 'Thesis: “Understanding and Classifying Domestic Microplastics through Raman Spectroscopy and Machine Learning”', it: 'Tesi: “Understanding and Classifying Domestic Microplastics through Raman Spectroscopy and Machine Learning”' },
    'resume.edu.msc.sup':    { en: 'Supervisors: Prof. Pietro Galinetto & Claudio Cusano', it: 'Relatori: Prof. Pietro Galinetto e Claudio Cusano' },
    'resume.edu.bsc':        { en: 'BSc in Physics, University of Pavia, Italy', it: 'Laurea Triennale in Fisica, Università di Pavia, Italia' },
    'resume.edu.bsc.thesis': { en: 'Thesis: “Radiocarbon dating via 14C and comparison with other methods (thermoluminescence)”', it: 'Tesi: “Datazione al radiocarbonio tramite 14C e confronto con altri metodi (termoluminescenza)”' },
    'resume.edu.bsc.sup':    { en: 'Supervisor: Prof. Paola Salvini', it: 'Relatrice: Prof.ssa Paola Salvini' },

    'resume.work.h':      { en: 'Work Experience', it: 'Esperienza lavorativa' },
    'resume.work.0.date': { en: 'Nov 2025 – present', it: 'Nov 2025 – oggi' },
    'resume.work.0.role': { en: 'Researcher – Software Development & AI, Fondazione Eucentre, Pavia', it: 'Ricercatore – Sviluppo software e AI, Fondazione Eucentre, Pavia' },
    'resume.work.0.desc': {
      en: 'Software development with a particular, though not exclusive, focus on artificial intelligence and machine learning methods applied to earthquake engineering. Development of computer vision models supporting post-disaster assessment.',
      it: 'Sviluppo software con particolare, ma non esclusiva, attenzione ai metodi di intelligenza artificiale e machine learning applicati all’ingegneria sismica. Sviluppo di modelli di computer vision a supporto della valutazione post-catastrofe.'
    },
    'resume.work.0.tech': { en: 'Technologies: Python, SQL, Java, JavaScript, HTML, CSS', it: 'Tecnologie: Python, SQL, Java, JavaScript, HTML, CSS' },
    'resume.work.1.date': { en: 'Jan – Jun 2023', it: 'Gen – Giu 2023' },
    'resume.work.1.role': { en: 'High School Physics Teacher, Liceo Scientifico G. Cardano, Pavia', it: 'Insegnante di Fisica, Liceo Scientifico G. Cardano, Pavia' },
    'resume.work.1.desc': {
      en: 'Planned and delivered individual and group physics lessons. Designed support activities for students with learning disabilities (DSA). Applied educational models focused on problem-solving and goal-oriented learning.',
      it: 'Progettazione ed erogazione di lezioni di fisica individuali e di gruppo. Realizzazione di attività di supporto per studenti con DSA. Applicazione di modelli didattici centrati sul problem solving e sull’apprendimento per obiettivi.'
    },
    'resume.work.2.date': { en: 'Jan – Feb 2024', it: 'Gen – Feb 2024' },
    'resume.work.2.role': { en: 'High School Physics and Math Teacher, Liceo Scientifico N. Copernico, Pavia', it: 'Insegnante di Fisica e Matematica, Liceo Scientifico N. Copernico, Pavia' },
    'resume.work.2.desc': {
      en: 'Same responsibilities as above: lesson planning, DSA support, and implementation of problem-based educational methods.',
      it: 'Stesse responsabilità: progettazione delle lezioni, supporto DSA e metodi didattici basati sul problem solving.'
    },

    'resume.skills.h':      { en: 'Skills', it: 'Competenze' },
    'resume.skills.prog':   { en: 'Programming:', it: 'Programmazione:' },
    'resume.skills.prog.v': { en: 'Python, SQL, Java, JavaScript, C++, HTML, CSS', it: 'Python, SQL, Java, JavaScript, C++, HTML, CSS' },
    'resume.skills.data':   { en: 'AI & Data:', it: 'AI e dati:' },
    'resume.skills.data.v': { en: 'Machine Learning, Computer Vision, Neural Networks, Advanced Statistics, Data Analysis', it: 'Machine Learning, Computer Vision, reti neurali, statistica avanzata, analisi dati' },
    'resume.skills.physics':   { en: 'Physics:', it: 'Fisica:' },
    'resume.skills.physics.v': { en: 'Raman spectroscopy, SERS, Nuclear physics, Radiation protection, Condensed matter', it: 'Spettroscopia Raman, SERS, fisica nucleare, radioprotezione, fisica della materia' },
    'resume.skills.lang':   { en: 'Languages:', it: 'Lingue:' },
    'resume.skills.lang.v': { en: 'Italian (native), English (C1), Spanish (basic)', it: 'Italiano (madrelingua), Inglese (C1), Spagnolo (base)' },

    'resume.hobbies.h':          { en: 'Hobbies and Interests', it: 'Hobby e interessi' },
    'resume.hobbies.creative':   { en: 'Creative:', it: 'Creatività:' },
    'resume.hobbies.creative.v': { en: 'Writing and designing collaborative role-playing campaigns (Dungeons & Dragons), both as player and game master', it: 'Scrittura e progettazione di campagne di gioco di ruolo collaborativo (Dungeons & Dragons), sia come giocatore che come game master' },
    'resume.hobbies.music':      { en: 'Music:', it: 'Musica:' },
    'resume.hobbies.music.v':    { en: 'Electric guitar, both solo and in band', it: 'Chitarra elettrica, da solista e in band' },
    'resume.hobbies.team':       { en: 'Teamwork:', it: 'Lavoro di squadra:' },
    'resume.hobbies.team.v':     { en: 'Board games and cooperative projects', it: 'Giochi da tavolo e progetti cooperativi' },
    'resume.hobbies.well':       { en: 'Well-being:', it: 'Benessere:' },
    'resume.hobbies.well.v':     { en: 'Jogging, training, and home cooking', it: 'Corsa, allenamento e cucina casalinga' },

    'resume.career.h':         { en: 'Career Objectives', it: 'Obiettivi professionali' },
    'resume.career.sectors':   { en: 'Preferred sectors:', it: 'Settori preferiti:' },
    'resume.career.sectors.v': { en: 'Energy, biomedical, chemical-physical, mechanical and precision engineering', it: 'Energia, biomedicale, chimico-fisico, meccanica e ingegneria di precisione' },
    'resume.career.areas':     { en: 'Professional areas of interest:', it: 'Aree professionali di interesse:' },
    'resume.career.areas.v':   { en: 'Engineering & Design, R&D, IP and Patents, Manufacturing, Quality Control', it: 'Ingegneria e progettazione, R&S, proprietà intellettuale e brevetti, produzione, controllo qualità' },

    'resume.portfolio.h':        { en: 'Portfolio', it: 'Portfolio' },
    'resume.portfolio.master':   { en: 'Master Thesis:', it: 'Tesi Magistrale:' },
    'resume.portfolio.bachelor': { en: 'Bachelor Thesis:', it: 'Tesi Triennale:' },

    'resume.disclaimer.h': { en: 'Disclaimer', it: 'Informativa' },
    'resume.disclaimer.p': {
      en: 'I hereby authorize the processing of my personal data included in this CV pursuant to Regulation (EU) 2016/679 (GDPR).',
      it: 'Autorizzo il trattamento dei miei dati personali contenuti in questo CV ai sensi del Regolamento (UE) 2016/679 (GDPR).'
    },

    /* ---------- creative ---------- */
    'creative.title':     { en: 'Simone Canevari – Creative Projects', it: 'Simone Canevari – Progetti creativi' },
    'creative.welcome.h': { en: 'Welcome to my creative space', it: 'Benvenuto nel mio spazio creativo' },
    'creative.welcome.p1': {
      en: 'This part of the site is where I collect the more creative side of my work — a mix of narrative design, game mechanics, character creation, fiction writing, music, and whatever else captures my imagination.',
      it: 'In questa parte del sito raccolgo il lato più creativo del mio lavoro: un misto di scrittura narrativa, meccaniche di gioco, creazione di personaggi, musica e tutto ciò che cattura la mia immaginazione.'
    },
    'creative.welcome.p2': {
      en: 'Over the years, I’ve written original one-shots and homebrew content for D&D 5e, exploring different themes, characters, and scenarios that often stretch beyond traditional archetypes. I enjoy building things that feel alive — whether it’s a peculiar item with a hidden story or a dilemma woven into an adventure.',
      it: 'Negli anni ho scritto one-shot originali e contenuti homebrew per D&D 5e, esplorando temi, personaggi e scenari che spesso vanno oltre gli archetipi tradizionali. Mi piace costruire cose che sembrino vive: un oggetto particolare con una storia nascosta, o un dilemma intrecciato in un’avventura.'
    },
    'creative.welcome.p3': {
      en: 'Beyond tabletop games, I spend time writing fiction across different genres, from fantasy settings to more introspective stories. I also play electric guitar, sketch out ideas for future projects, and read a lot — not just for inspiration, but as a way to reconnect with how stories take shape.',
      it: 'Oltre ai giochi da tavolo, scrivo narrativa in generi diversi, dai contesti fantasy alle storie più introspettive. Suono la chitarra elettrica, abbozzo idee per progetti futuri e leggo molto: non solo per ispirazione, ma per ritrovare il modo in cui le storie prendono forma.'
    },

    'creative.dnd.h':   { en: 'Dungeons & Dragons', it: 'Dungeons & Dragons' },
    'creative.dnd.p':   { en: 'I explore D&D 5e through characters, one-shots, and homebrew mechanics.', it: 'Esploro D&D 5e attraverso personaggi, one-shot e meccaniche homebrew.' },
    'creative.chars.h': { en: 'Characters', it: 'Personaggi' },
    'creative.chars.p': { en: 'Original characters combining narrative intent and mechanical creativity.', it: 'Personaggi originali che uniscono intento narrativo e creatività meccanica.' },

    'creative.diana.p': {
      en: 'Diana was my first character played in a long campaign (2 years). She is a <b>Halfling multiclass Blood Hunter 9/ Rogue 8</b> who was an all-purpose fighter (strong in both close and ranged combat) with no magic whatsoever which also led to quite a few problems for the party due to her recklessness and tendency to bite dying demons.',
      it: 'Diana è stata la mia prima personaggia, giocata in una campagna lunga (2 anni). È una <b>Halfling multiclasse Blood Hunter 9 / Ladra 8</b>, combattente tuttofare (forte sia in mischia sia a distanza) e del tutto priva di magia: cosa che ha causato non pochi problemi al gruppo, vista la sua sconsideratezza e la tendenza a mordere i demoni morenti.'
    },
    'creative.marlo.p': {
      en: 'Marlo is my second important character that I created for a recently started campaign. He is a <b>Goblin multiclass Bard 2/Warlock 2</b> who is a fearful young man who tries hard to avoid violence and tries as best he can to defend the last. He has done little in his life except loiter, work his day job and play with his new banjo which, <b>for some reason</b>, has made him a surprisingly talented musician.',
      it: 'Marlo è il secondo personaggio importante che ho creato, per una campagna iniziata da poco. È un <b>Goblin multiclasse Bardo 2 / Warlock 2</b>, un giovane pauroso che cerca in ogni modo di evitare la violenza e di difendere gli ultimi. Nella vita ha fatto poco: bighellonare, lavorare e suonare il suo nuovo banjo che, <b>per qualche motivo</b>, lo ha reso un musicista sorprendentemente dotato.'
    },
    'creative.sheet':     { en: 'Character Sheet', it: 'Scheda personaggio' },
    'creative.backstory': { en: 'Backstory', it: 'Background' },

    'creative.oneshots.h': { en: 'One-Shots', it: 'One-Shot' },
    'creative.oneshots.p': { en: 'Short adventures I’ve written, each with its own tone and structure.', it: 'Brevi avventure che ho scritto, ognuna con tono e struttura propri.' },
    'creative.os1': { en: 'Whispers in the Fog', it: 'Sussurri nella nebbia' },
    'creative.os2': { en: 'The Ember Pact', it: 'Il patto di brace' },
    'creative.os3': { en: 'Echoes of Tomorrow', it: 'Echi del domani' },

    'creative.mech.h': { en: 'Homebrew Mechanics', it: 'Meccaniche homebrew' },
    'creative.mech.p': { en: 'Custom systems, features and tweaks to expand storytelling potential.', it: 'Sistemi, privilegi e modifiche personalizzate per ampliare il potenziale narrativo.' },
    'creative.uw.h':   { en: 'Underwater Mechanics', it: 'Meccaniche subacquee' },
    'creative.uw.p':   { en: 'Ruleset for handling combat, movement, and acting in underwater environments. Useful for adventures set beneath the surface — both magical and mundane.', it: 'Regolamento per gestire combattimento, movimento e azioni in ambienti subacquei. Utile per avventure ambientate sotto la superficie, magiche o meno.' },
    'creative.lb.h':   { en: 'Layered Backgrounds', it: 'Background stratificati' },
    'creative.lb.p':   { en: 'Custom background builder to deepen character motivation.', it: 'Generatore di background personalizzati per approfondire le motivazioni dei personaggi.' },

    'creative.writing.h': { en: 'Writing', it: 'Scrittura' },
    'creative.writing.p': { en: 'I enjoy experimenting with fiction, both short stories and novel-length ideas. Some projects are private drafts, others may become sharable content soon.', it: 'Mi piace sperimentare con la narrativa, sia racconti brevi sia idee da romanzo. Alcuni progetti restano bozze private, altri potrebbero diventare presto contenuti condivisibili.' },

    'creative.reading.h': { en: 'Reading', it: 'Letture' },
    'creative.reading.p': {
      en: 'I love reading despite the fact that I take long breaks (even months) between one book and another. I find reading (both in English and Italian) very engaging and stimulating especially when I find books that are unusual and alien to my interests or habits that make me see narrative universes or ways of telling a story that I have never seen before. I list below my 5 favourite books (or series of books) in no particular order:',
      it: 'Amo leggere, anche se tra un libro e l’altro passano pause lunghe (persino mesi). Trovo la lettura (in inglese e in italiano) coinvolgente e stimolante, soprattutto quando incontro libri insoliti e lontani dai miei interessi o dalle mie abitudini, che mi mostrano universi narrativi o modi di raccontare che non avevo mai visto. Elenco qui i miei 5 libri (o serie) preferiti, in ordine sparso:'
    }
  };

  function readStored() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(v) !== -1 ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* modalita' privata o storage disabilitato: la scelta vale solo per questa pagina */
    }
  }

  function detect() {
    const stored = readStored();
    if (stored) return stored;
    const nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const entry = TRANSLATIONS[el.getAttribute('data-i18n')];
      if (!entry || entry[lang] === undefined) return;
      // le stringhe che contengono markup (<b>) vanno inserite come HTML
      if (/<[a-z][\s\S]*>/i.test(entry[lang])) {
        el.innerHTML = entry[lang];
      } else {
        el.textContent = entry[lang];
      }
    });

    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && TRANSLATIONS[titleKey] && TRANSLATIONS[titleKey][lang]) {
      document.title = TRANSLATIONS[titleKey][lang];
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    store(lang);
  }

  window.__RAMAN_I18N__ = TRANSLATIONS;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.dataset.lang);
      });
    });
    apply(detect());
  });
})();
