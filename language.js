let translations = {}; // Per salvare le traduzioni caricate
let currentLanguage = 'it'; // Lingua di default

// Cambia la lingua
async function changeLanguage(lang) {
    if (!translations[lang]) {
        try {
            const response = await fetch('translations.json');
            const data = await response.json();
            translations = data;
        } catch (error) {
            console.error('Errore durante il caricamento delle traduzioni:', error);
            return;
        }
    }

    currentLanguage = lang;

    // Determina la pagina corrente
    const page = document.body.getAttribute('data-page'); // Aggiungi un attributo data-page nel tag <body>

    // Ottieni le traduzioni per la pagina corrente
    const langData = translations[lang][page];

    // Aggiorna gli elementi dinamicamente
    for (const key in langData) {
        const element = document.getElementById(key);
        if (element) {
            element.innerHTML = langData[key];
        }
    }
}

// Carica la lingua predefinita
document.addEventListener('DOMContentLoaded', () => changeLanguage(currentLanguage));
