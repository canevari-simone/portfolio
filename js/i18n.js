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
    'pdf.download': { en: 'Download PDF', it: 'Scarica PDF' },

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

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.dataset.lang);
      });
    });
    apply(detect());
  });
})();
