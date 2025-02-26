const spellsPerPage = 10;
let currentPage = 1;
let allSpells = [];

const spellsContainer = document.getElementById('spells-container');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

function displaySpells(page) {
    console.log("displaySpells called with page:", page);
    spellsContainer.innerHTML = '';
    const startIndex = (page - 1) * spellsPerPage;
    const endIndex = startIndex + spellsPerPage;
    console.log("startIndex:", startIndex, "endIndex:", endIndex);
    const pageSpells = allSpells.slice(startIndex, endIndex);

    pageSpells.forEach(spell => {
        const spellCard = document.createElement('div');
        spellCard.classList.add('spell-card');
        spellCard.innerHTML = `
            <h2>${spell.name}</h2>
            <p>${spell.description}</p>
        `;
        spellsContainer.appendChild(spellCard);
    });
}

fetch('https://hp-api.onrender.com/api/spells')
    .then(response => response.json())
    .then(spells => {
        allSpells = spells;
        console.log(allSpells); // Verifica si allSpells se llena correctamente
        displaySpells(currentPage);

        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displaySpells(currentPage);
            }
        });

        nextPageButton.addEventListener('click', () => {
            const totalPages = Math.ceil(allSpells.length / spellsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displaySpells(currentPage);
            }
        });
    });