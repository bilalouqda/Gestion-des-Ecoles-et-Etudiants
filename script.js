document.addEventListener('DOMContentLoaded', function () {    
let ecoleCounter = 0;
let studentCounter = 1;

const formAddEcole = document.getElementById('AddEcole');
const formAddEtudiant = document.getElementById('AddEtudiant');
const ecoleNameInput = document.getElementById('ecoleName');
const etudiantNomInput = document.getElementById('etudiantNom');
const etudiantPrenomInput = document.getElementById('etudiantPrenom');
const ecoleSelect = document.getElementById('ecoleSelect');
const studentsTableBody = document.getElementById('studentsTable').querySelector('tbody');
studentsTableBody.innerHTML = localStorage.getItem('studentsTableBody');

formAddEcole.addEventListener('submit', function (event) {
    event.preventDefault();

    const ecoleName = ecoleNameInput.value;
    
    if (ecoleName) {
        const option = document.createElement('option');
        option.textContent = ecoleName.toUpperCase();
        option.value = ++ecoleCounter;
        ecoleSelect.appendChild(option);

        if (formAddEtudiant.style.display === 'none') {
            formAddEtudiant.style.display = 'block';
        }

        ecoleNameInput.value = '';
    }
});

formAddEtudiant.addEventListener('submit', function (event) {
    event.preventDefault();

    const etudiantNom = etudiantNomInput.value.trim();
    const etudiantPrenom = etudiantPrenomInput.value.trim();
    const ecoleSelected = ecoleSelect.options[ecoleSelect.selectedIndex].text;

    if (etudiantNom && etudiantPrenom && ecoleSelected) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${studentCounter++}</td>
            <td>${etudiantNom}</td>
            <td>${etudiantPrenom}</td>
            <td>${ecoleSelected}</td>
            <td><button id="delete" style="background-color: red;">Delete</button></td>
        `;
        console.log(row);

        const deleteButton = row.querySelector('button');

        deleteButton.addEventListener('click', function () {
            row.remove();
        });

        studentsTableBody.appendChild(row);

        etudiantNomInput.value = '';
        etudiantPrenomInput.value = '';
        ecoleSelect.selectedIndex = 0;
    }

    localStorage.setItem('studentsTableBody', studentsTableBody.innerHTML);
    
});

});