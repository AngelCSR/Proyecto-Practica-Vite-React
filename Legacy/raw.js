const charactersPerPage = 10;
let currentPage = 1;
let allCharacters = [];

const ravenclawContainer = document.getElementById('ravenclaw-container');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

async function fetchCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters/house/ravenclaw');
        const characters = await response.json();
        return characters;
    } catch (error) {
        console.error("Error fetching characters:", error);
        return [];
    }
}

function displayCharacters(page) {
    ravenclawContainer.innerHTML = '';
    const startIndex = (page - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const pageCharacters = allCharacters.slice(startIndex, endIndex);

    pageCharacters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://via.placeholder.com/150';
        };
        characterCard.appendChild(img);

        let characterDetails = '';
        for (const key in character) {
            if (character.hasOwnProperty(key) && key !== 'id' && key !== 'image' && key !== 'actor' && key !== 'alternate_actors') {
                let value = character[key];
                if (typeof value === 'object' && value !== null) {
                    value = JSON.stringify(value);
                }
                if (value) {
                    characterDetails += `<p><strong>${key}:</strong> ${value}</p>`;
                }
            }
        }

        characterCard.innerHTML += `<h2>${character.name}</h2>${characterDetails}`;
        ravenclawContainer.appendChild(characterCard);
    });
}

async function initialize() {
    allCharacters = await fetchCharacters();
    displayCharacters(currentPage);

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCharacters(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(allCharacters.length / charactersPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayCharacters(currentPage);
        }
    });
}

initialize();