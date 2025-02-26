const staffPerPage = 10;
let currentPage = 1;
let allStaff = [];

const staffContainer = document.getElementById('staff-container');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

function displayStaff(page) {
    staffContainer.innerHTML = '';
    const startIndex = (page - 1) * staffPerPage;
    const endIndex = startIndex + staffPerPage;
    const pageStaff = allStaff.slice(startIndex, endIndex);

    pageStaff.forEach(staffMember => {
        const staffCard = document.createElement('div');
        staffCard.classList.add('character-card');

        const img = document.createElement('img');
        img.src = staffMember.image;
        img.alt = staffMember.name;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://via.placeholder.com/150';
        };
        staffCard.appendChild(img);

        let staffDetails = '';
        for (const key in staffMember) {
            if (staffMember.hasOwnProperty(key) && key !== 'id' && key !== 'image' && key !== 'actor' && key !== 'alternate_actors') {
                let value = staffMember[key];
                if (typeof value === 'object' && value !== null) {
                    value = JSON.stringify(value);
                }
                if (value) {
                    staffDetails += `<p><strong>${key}:</strong> ${value}</p>`;
                }
            }
        }

        staffCard.innerHTML += `<h2>${staffMember.name}</h2>${staffDetails}`;
        staffContainer.appendChild(staffCard);
    });
}

fetch('https://hp-api.onrender.com/api/characters/staff')
    .then(response => response.json())
    .then(staff => {
        allStaff = staff;
        displayStaff(currentPage);

        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayStaff(currentPage);
            }
        });

        nextPageButton.addEventListener('click', () => {
            const totalPages = Math.ceil(allStaff.length / staffPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayStaff(currentPage);
            }
        });
    });