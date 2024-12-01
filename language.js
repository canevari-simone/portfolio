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
    const langData = translations[lang];

    // Aggiorna il testo degli elementi
    
    document.getElementById('home-link').innerText = langData.home;
    document.getElementById('projects-link').innerText = langData.projects;
    document.getElementById('contacts-link').innerText = langData.contacts;
    document.getElementById('welcome-message').innerText = langData.welcome;
    document.getElementById('description').innerText = langData.description;

    // Skills
    document.getElementById('skill-1').innerText = langData.skills[0];
    document.getElementById('skill-2').innerText = langData.skills[1];
    document.getElementById('skill-3').innerText = langData.skills[2];

    // Projects
    document.getElementById('project-title-1').innerText = langData.projects_title[0];
    document.getElementById('project-desc-1').innerText = langData.projects_description[0];
    document.getElementById('project-title-2').innerText = langData.projects_title[1];
    document.getElementById('project-desc-2').innerText = langData.projects_description[1];
    document.getElementById('project-title-3').innerText = langData.projects_title[2];
    document.getElementById('project-desc-3').innerText = langData.projects_description[2];

    // Footer
    document.getElementById('footer-text').innerHTML = langData.footer;
    document.getElementById('privacy-link').innerText = langData.privacy;
    document.getElementById('terms-link').innerText = langData.terms;
}

// Carica la lingua predefinita
document.addEventListener('DOMContentLoaded', () => changeLanguage(currentLanguage));
