// ...existing code...

// (Classes and data remain unchanged)

function getSelectedOptions(selectId) {
    const select = document.getElementById(selectId);
    return Array.from(select.selectedOptions).map(opt => opt.value);
}

function main() {
    // Get selected cards and characters to remove
    const removedCardNames = getSelectedOptions('cardFilter');
    const removedCharacterNames = getSelectedOptions('characterFilter');

    // Filter out selected cards and characters
    const filteredCharacters = characters.filter(c => !removedCharacterNames.includes(c.name));
    const filteredCards = allGameCards.filter(c => !removedCardNames.includes(c.name));

    if (filteredCharacters.length === 0 || filteredCards.length === 0) {
        document.getElementById('output').innerHTML = "<p>No characters or cards available after filtering.</p>";
        return;
    }

    // Pick a random character
    const shuffledCharacters = filteredCharacters.sort(() => Math.random() - 0.5);
    const characterToPlay = shuffledCharacters[Math.floor(Math.random() * shuffledCharacters.length)];

    // Generate deck
    const deckGenerator = new DeckRandomizer(filteredCards);
    const randomDeck = deckGenerator.generateRandomDeck(25, 50, 50);

    // Display
    let output = `<h2>Character to play:</h2>
        <p><strong>${characterToPlay.name}</strong> - ${characterToPlay.description}</p>
        <h2>Generated Deck:</h2>
        <ul>`;
    let totalCost = 0;
    for (let card of randomDeck) {
        output += `<li>${card.name} (Cost: ${card.cost}, Description: ${card.description})</li>`;
        totalCost += card.cost;
    }
    output += `</ul>
        <p><strong>Total Cards:</strong> ${randomDeck.length}</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>`;

    document.getElementById('output').innerHTML = output;
}

// Populate select options
function populateSelects() {
    const cardSelect = document.getElementById('cardFilter');
    const charSelect = document.getElementById('characterFilter');
    cardSelect.innerHTML = '';
    charSelect.innerHTML = '';

    allGameCards.forEach(card => {
        const opt = document.createElement('option');
        opt.value = card.name;
        opt.textContent = card.name + " - " + card.description;
        cardSelect.appendChild(opt);
    });

    characters.forEach(char => {
        const opt = document.createElement('option');
        opt.value = char.name;
        opt.textContent = char.name + " - " + char.description;
        charSelect.appendChild(opt);
    });
}

// Event listeners for filters and button
window.onload = function() {
    populateSelects();
    main();
    document.getElementById('runBtn').onclick = main;
    document.getElementById('cardFilter').onchange = main;
    document.getElementById('characterFilter').onchange = main;
};

// ...existing code...
