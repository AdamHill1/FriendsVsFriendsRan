// ...existing code...

// Card and Character classes
class Card {
    constructor(name, description, cost, imageUrl) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.imageUrl = imageUrl;
    }
}
// ...existing code...

class Character {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

// DeckRandomizer class
class DeckRandomizer {
    constructor(cards) {
        this.availableCards = cards;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generateRandomDeck(minCards, maxCards, maxTotalCost) {
        let deck = [];
        let currentTotalCost = 0;
        let shuffledCards = this.shuffle([...this.availableCards]);

        for (let card of shuffledCards) {
            if (deck.length < maxCards && currentTotalCost + card.cost <= maxTotalCost) {
                deck.push(card);
                currentTotalCost += card.cost;
            }
        }

        // Ensure minimum card count is met, if possible
        while (
            deck.length < minCards &&
            this.availableCards.some(
                c => !deck.includes(c) && currentTotalCost + c.cost <= maxTotalCost
            )
        ) {
            let candidates = this.availableCards.filter(
                c => !deck.includes(c) && currentTotalCost + c.cost <= maxTotalCost
            );
            if (candidates.length === 0) break;
            let cardToAdd = candidates[Math.floor(Math.random() * candidates.length)];
            deck.push(cardToAdd);
            currentTotalCost += cardToAdd.cost;
        }

        // Trim deck if it exceeds max cards
        while (deck.length > maxCards) {
            let idx = Math.floor(Math.random() * deck.length);
            currentTotalCost -= deck[idx].cost;
            deck.splice(idx, 1);
        }

        return deck;
    }
}

// Data
const characters = [
    new Character("Dale Donovan", "Detect rival trails and do more damage to them from behind."),
    new Character("DJ Newton", "Start each round with more accuracy (+55%ACC)"),
    new Character("Donnie B.", "Start each round with more health (+30HP)"),
    new Character("Duck Anderson", "Add a Green herb card to your hand each round (heals 40HP)"),
    new Character("FKF_Dingo", "Start each round with garbage."),
    new Character("Haru", "You move faster (+10%SPD)"),
    new Character("Jawhara Farms", "Protects your head."),
    new Character("Klustr Jr.", "Start with your beloved Miniturrets each round!"),
    new Character("Laika (Character)", "Two bullets at the end of the barrel."),
    new Character("Little Lars", "Explosion resistant (+60%RST)"),
    new Character("Margarita Kala", "Combo 3 same color cards to trigger an effect."),
    new Character("Moose Salto", "Start each round with double jump"),
    new Character("Myk Raver", "Start each round with the Brasshopper"),
    new Character("Ribberto Mulligan", "Copy your rival's personality"),
    new Character("Sable Santana", "Start each round with the Katana"),
    new Character("Siaro", "Poison heals you."),
    new Character("Spike Remington", "Your bullets deal more damage (+12%DMG)"),
    new Character("Stevie Gull", "Start each round with the Golden Boira")
];

const allGameCards = [
    new Card("Small Head","Your head shrinks",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e1/0002_SmallHead.png/revision/latest?cb=20230616135951"),
new Card("Health Up","More max health",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/0b/HealthUp.png/revision/latest?cb=20230616140145"),
new Card("Move Faster","More speed",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/2/2b/MoveFaster.png/revision/latest?cb=20230616140511"),
new Card("Double Jump","Jump twice!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/01/DoubleJump.png/revision/latest?cb=20230616140533"),
new Card("More Accuracy","Laser precision!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/7/7e/MoreAccuracy.png/revision/latest?cb=20230616140732"),
new Card("Steel Bullets","Deal more damage!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/56/SteelBullets.png/revision/latest?cb=20230616140811"),
new Card("Big Mag","More bullets per mag",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/8b/BigMag.png/revision/latest?cb=20230616140853"),
new Card("Medkit","Restores a bit of health!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/c4/MedKit.png/revision/latest?cb=20230616141046"),
new Card("Bullet Time","Slows time briefly",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/1e/BulletTime.png/revision/latest?cb=20230616141217"),
new Card("Vampire Bullets","Each impact heals you",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/eb/VampireBullets.png/revision/latest?cb=20230616141255"),
new Card("Energy Drink","Faster reflexes for a while",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/5f/EnergyDrink.png/revision/latest?cb=20230616141316"),
new Card("Helmet","Less headshot damage",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/37/Helmet.png/revision/latest?cb=20230616141338"),
new Card("Poison Bullets","Bullets will poison your rival",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/53/PoisonBullets.png/revision/latest?cb=20230616141436"),
new Card("Tin Man","Become bullet-proof and slower for a bit",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/d/dc/TinMan.png/revision/latest?cb=20230616141511"),
new Card("Invisible","You're invisible until your next attack",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e1/Invisible.png/revision/latest?cb=20230616141837"),
new Card("Love Letter","Heal a little and sends this card to your rival",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/7/7d/LoveLetterCard.png/revision/latest?cb=20230620082331"),
new Card("404","Let's see what can't be seen",0,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/bc/404.png/revision/latest?cb=20240501212514"),
new Card("Predator Vision","You can see your rival through walls",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/32/PredatorVision.png/revision/latest?cb=20230620082709"),
new Card("Phantom Bullets","Your bullets pierce walls",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/4b/PhantomBullets.png/revision/latest?cb=20230620082651"),
new Card("Bomb Lover","Throw a bomb everytime you use a card",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/3d/BombLover.png/revision/latest?cb=20230620082633"),
new Card("Bigger Explosions","Your explosions deal more damage",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/a7/BiggerExplosions.png/revision/latest?cb=20230620082613"),
new Card("Thick Skin","Explosion resistant",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/83/ThickSkin.png/revision/latest?cb=20230620082558"),
new Card("Extra Cards","Draw cards from your deck",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/a6/0050_ExtraCards.png/revision/latest?cb=20230707110807"),
new Card("Card Profaner","Draw cards from your graveyard",4,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/c9/0051_CardProfaner.png/revision/latest?cb=20230707110824"),
new Card("Card Thief","Steal from your rivals hand",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/d/db/0056_CardThief.png/revision/latest?cb=20230707110849"),
new Card("Lottery Ticket","A chance to win some cards!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/fd/0078_LotteryTicket.png/revision/latest?cb=20230707110829"),
new Card("Quick Reload","More reload speed",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/2/29/0018_QuickReload.png/revision/latest?cb=20230824173512"),
new Card("Silent Steps","Your feet don't make noise",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/b8/0019_SilentSteps.png/revision/latest?cb=20230824173528"),
new Card("Ninja Smoke","Vanish and retreat!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/7/72/0094_NinjaSmoke.png/revision/latest?cb=20230824173602"),
new Card("Berserker","Increase your damage, but receive more damage too",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e2/0099_Berserker.png/revision/latest?cb=20230824173611"),
new Card("Painkillers","Ignore the pain for a while",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/6/66/0113_Painkillers.png/revision/latest?cb=20230824173617"),
new Card("Pyromania","Fire heals you!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/ff/Card_0127_bake.png/revision/latest?cb=20240118005924"),
new Card("Reroll","Swap your hand for a new one",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/01/Card_0148_bake.png/revision/latest?cb=20240118005958"),
new Card("Venom Eater","Poison heals you",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/8a/Venom.png/revision/latest?cb=20240501212402"),
new Card("Sly Shooter","Detect rival trails and crit from their back",3,"https://en.m.wikipedia.org/wiki/File:No_image_available.svg"),
new Card("Big Head","Their head grows",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e8/BigHead.png/revision/latest?cb=20230616135915"),
new Card("Health Down","Less max health",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/cd/HealthDown.png/revision/latest?cb=20230616140120"),
new Card("Move Slower","Less speed",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/41/MoveSlower.png/revision/latest?cb=20230616140210"),
new Card("No Jump","They can't jump!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/55/NoJump.png/revision/latest?cb=20230616140605"),
new Card("Less Accuracy","They won't hit a shot",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/f5/LessAccuracy.png/revision/latest?cb=20230616140710"),
new Card("Rubber Bullets","They deal less damage",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/c7/RubberBullets.png/revision/latest?cb=20230616140752"),
new Card("Small Mag","Less bullets per mag",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/1d/SmallMag.png/revision/latest?cb=20230616140835"),
new Card("Invisible Health","Hides their health bar",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/c7/InvisibleHealth.png/revision/latest?cb=20230616141102"),
new Card("Invisible Hand","They can't see their hand!",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/d/dc/InvisibleHand.png/revision/latest?cb=20230616141121"),
new Card("Poison","Poison your rival for a bit",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/05/Poison.png/revision/latest?cb=20230616141239"),
new Card("Garbage Day","Add garbage to your rival's hand",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/7/7b/GarbageDay.png/revision/latest?cb=20230616141638"),
new Card("Mind Blowing","Expose your rival's brain for a bit",4,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/8c/MindBlowing.png/revision/latest?cb=20230616141855"),
new Card("Swap Weapons","Swap weapons with your rival",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/fa/SwapWeapons.png/revision/latest?cb=20230616142205"),
new Card("Empty Mag","With no bullets, they can't hurt you!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/d/dc/EmptyMag.png/revision/latest?cb=20230616142223"),
new Card("Barbed Cards","Using them will be painful",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/10/0111_BarbedCards.png/revision/latest?cb=20230616142508"),
new Card("Pixel Vision","Rivals will see the world pixelated",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/46/Pixel-Vision.png/revision/latest?cb=20230616142527"),
new Card("Slow Reload","Less reload speed",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/b6/0017_SlowReload.png/revision/latest?cb=20230824173445"),
new Card("Disarm","Bring their default weapon back",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/52/0035_Disarm.png/revision/latest?cb=20230824173546"),
new Card("Clown Shoes","Rival's steps are louder",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/fd/0074_ClownShoes.png/revision/latest?cb=20230824173554"),
new Card("Frozen Gun","Can't attack for a while!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/5f/Card_0086_bake.png/revision/latest?cb=20240118010159"),
new Card("Silence","They can't use cards for a while",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/bf/Card_0147_bake.png/revision/latest?cb=20240118010226"),
new Card("Boomstick","Get the Boomstick",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e1/Boomstick.png/revision/latest?cb=20230616140634"),
new Card("Albatross 21","Get the Albatross 21",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/19/Albatross21.png/revision/latest?cb=20230616140652"),
new Card("Brasshopper","Get the Brasshopper",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/a8/Brasshopper.png/revision/latest?cb=20230616140912"),
new Card("Laika","Get the Laika",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/6/6d/Laika.png/revision/latest?cb=20230616140932"),
new Card("FK-82","Get the FK-82",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/0e/FK-82.png/revision/latest?cb=20230616141159"),
new Card("Golden Boira","Get the Golden Boira",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/cd/GoldenBoira.png/revision/latest?cb=20230616141949"),
new Card("Punch-R","Get the Punch-R",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/6/69/0067_Punch-R.png/revision/latest?cb=20230616142104"),
new Card("Katana","Get the Katana",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e9/Katana.png/revision/latest?cb=20230616142144"),
new Card("Akimbo","Duplicates your Weapon",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/33/0032_Akimbo.png/revision/latest?cb=20230824173535"),
new Card("Deep Fryer","Get the Deep fryer",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/9/9a/Card_0131_bake.png/revision/latest?cb=20240118010405"),
new Card("CA-Turret","it will die for you! >:[",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/bd/CA-Turret.png/revision/latest?cb=20230616141400"),
new Card("Bomb","Throw a bomb",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/9/91/0037_Bomb.png/revision/latest?cb=20230620092929"),
new Card("Wall","Creates a destructible wall",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/9/96/Wall.png/revision/latest?cb=20230616141549"),
new Card("Bomb Belt","Get more bombs!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/1c/BombBelt.png/revision/latest?cb=20230616141608"),
new Card("Ice Block","Become an iceblock protected from damage",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/0c/IceBlock.png/revision/latest?cb=20230616141710"),
new Card("Smoke Bomb","Throw a smoke bomb",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/a2/SmokeBomb.png/revision/latest?cb=20230616141734"),
new Card("Flash Bomb","Throw a flash bomb",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/4e/FlashBomb.png/revision/latest?cb=20230616141747"),
new Card("Land Mine","Places a land mine",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/b/b4/LandMine.png/revision/latest?cb=20230616141802"),
new Card("Bear Trap","Places a bear trap that stops your rival",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/1/19/BearTrap.png/revision/latest?cb=20230616141817"),
new Card("Sticky Bomb","Throws a sticky bomb",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/2/21/StickyBomb.png/revision/latest?cb=20230616142005"),
new Card("Toxic Bomb","Throws a toxic bomb",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/ce/ToxicGrenade.png/revision/latest?cb=20230616142128"),
new Card("Kaboomber","It will KA-BOOM for you! >:D",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/5/5f/0088_Kaboomber.png/revision/latest?cb=20230616142238"),
new Card("Karrotov","Set everything on fire!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/8f/Karrotov.png/revision/latest?cb=20230616142435"),
new Card("Bouncy Wall","Creates a wall that reflects all bullets",2,"https://en.m.wikipedia.org/wiki/File:No_image_available.svg"),
new Card("Dr. Molebot","It will heal all your wounds!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/8b/Card_0124_bake.png/revision/latest?cb=20240118010451"),
new Card("Teleport Bomb","Teleport on impact",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/ae/Card_0137_bake.png/revision/latest?cb=20240118010514"),
new Card("Bat Turret Lover","It gives you 2 Bat turrets",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/e3/Card_0143_bake.png/revision/latest?cb=20240118010602"),
new Card("Laser Fence","Block their way with style!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/ce/Card_0140_bake.png/revision/latest?cb=20240118010719"),
new Card("Dice Bomb","This bomb will suprise you!",0,"https://static.wikia.nocookie.net/friends-vs-friends/images/7/7a/Card_0149_bake.png/revision/latest?cb=20240118010751"),
new Card("Brain Mirror","Damage dealt to your head will be applied to your rivals.",2,"https://en.m.wikipedia.org/wiki/File:No_image_available.svg"),
new Card("Present","Friendship is the best gift",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/4c/Card_0152_bake.png/revision/latest?cb=20240118010931"),
new Card("Titan","Become a GIANT",4,"https://static.wikia.nocookie.net/friends-vs-friends/images/8/88/Titan.png/revision/latest?cb=20230616141417"),
new Card("Heartless","Hide your heart. You won't be hurt, but you'll slowly lose health.",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/35/Heartless.png/revision/latest?cb=20230616141912"),
new Card("Nuke","Ends the world as we know it!",0,"https://static.wikia.nocookie.net/friends-vs-friends/images/e/ec/Nuke.png/revision/latest?cb=20230616141931"),
new Card("Parley","Truce! let's relax for a bit",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/f/f9/Parley.png/revision/latest?cb=20230616142452"),
new Card("Hot Potato!","Pass it around, or it will explode on your hands!",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/2/25/0083_HotPotato%21.png/revision/latest?cb=20230707110834"),
new Card("Warp Room","Teleport wherever you want!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/3/39/Card_0128_bake.png/revision/latest?cb=20240118011002"),
new Card("Shrink Spell","Become tiny!",4,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/42/Card_0139_bake.png/revision/latest?cb=20240118011023"),
new Card("Floor is Lava","The floor is lava, be careful!",2,"https://en.m.wikipedia.org/wiki/File:No_image_available.svg"),
new Card("Counter Card","Counters the next card they use",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/4/42/CounterCard.png/revision/latest?cb=20230616142254"),
new Card("Mirror Card","Copies the next card they use",1,"https://static.wikia.nocookie.net/friends-vs-friends/images/c/cd/MirrorCard.png/revision/latest?cb=20230616142309"),
new Card("Ninja Log","Avoid next attack like a ninja!",2,"https://static.wikia.nocookie.net/friends-vs-friends/images/0/08/0100_NinjaLog.png/revision/latest?cb=20230616142350"),
new Card("Self-Destruct Device","An explosive surprise when you die",3,"https://static.wikia.nocookie.net/friends-vs-friends/images/a/aa/Self-DestructDevice.png/revision/latest?cb=20230616142405")
];

// Main logic
function main() {
    // Pick a random character
    const shuffledCharacters = characters.sort(() => Math.random() - 0.5);
    const characterToPlay = shuffledCharacters[Math.floor(Math.random() * shuffledCharacters.length)];

    // Generate deck
    const deckGenerator = new DeckRandomizer(allGameCards);
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

// Run main on page load
window.onload = main;

// ...existing code...

// ...existing code...

// Populate multi-selects
function populateSelects() {
    const charSel = document.getElementById('excludeCharacters');
    const cardSel = document.getElementById('excludeCards');
    charSel.innerHTML = '';
    cardSel.innerHTML = '';
    characters.forEach((c, i) => {
        let opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        charSel.appendChild(opt);
    });
    allGameCards.forEach((c, i) => {
        let opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        cardSel.appendChild(opt);
    });
}

// Main logic with filtering
function main() {
    // Get excluded characters/cards
    const charSel = document.getElementById('excludeCharacters');
    const cardSel = document.getElementById('excludeCards');
    const excludedChars = Array.from(charSel.selectedOptions).map(opt => opt.value);
    const excludedCards = Array.from(cardSel.selectedOptions).map(opt => opt.value);

    // Filter
    const filteredCharacters = characters.filter(c => !excludedChars.includes(c.name));
    const filteredCards = allGameCards.filter(c => !excludedCards.includes(c.name));

    // Pick a random character
    if (filteredCharacters.length === 0) {
        document.getElementById('output').innerHTML = "<b>No characters left to choose from!</b>";
        return;
    }
    const shuffledCharacters = filteredCharacters.sort(() => Math.random() - 0.5);
    const characterToPlay = shuffledCharacters[Math.floor(Math.random() * shuffledCharacters.length)];

    // Generate deck
    if (filteredCards.length === 0) {
        document.getElementById('output').innerHTML = "<b>No cards left to build a deck!</b>";
        return;
    }
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

// Event listeners for filters and button
window.onload = function() {
    populateSelects();
    main();
    document.getElementById('runBtn').onclick = main;
    document.getElementById('excludeCharacters').onchange = main;
    document.getElementById('excludeCards').onchange = main;
};

// ...existing code...
// ...existing code...

// Populate checkboxes for characters and cards
function populateCheckboxes() {
    const charContainer = document.getElementById('excludeCharactersContainer');
    const cardContainer = document.getElementById('excludeCardsContainer');
    charContainer.innerHTML = '';
    cardContainer.innerHTML = '';

    characters.forEach((c, i) => {
        const label = document.createElement('label');
        label.style.display = 'block';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = c.name;
        checkbox.className = 'excludeCharacterCheckbox';
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + c.name));
        charContainer.appendChild(label);
    });

    allGameCards.forEach((c, i) => {
        const label = document.createElement('label');
        label.style.display = 'block';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = c.name;
        checkbox.className = 'excludeCardCheckbox';
        label.appendChild(checkbox);
        // Add image
if (c.imageUrl) {
    const img = document.createElement('img');
    img.src = c.imageUrl;
    img.alt = c.name;
    img.style.height = '96px'; // 3x larger
    img.style.verticalAlign = 'middle';
    img.style.marginRight = '8px';
    label.appendChild(img);
}
        label.appendChild(document.createTextNode(' ' + c.name));
        cardContainer.appendChild(label);
    });
}
// Get excluded names from checked checkboxes
function getExcludedNames(className) {
    return Array.from(document.getElementsByClassName(className))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

// Main logic with filtering
function main() {
    const excludedChars = getExcludedNames('excludeCharacterCheckbox');
    const excludedCards = getExcludedNames('excludeCardCheckbox');

    const filteredCharacters = characters.filter(c => !excludedChars.includes(c.name));
    const filteredCards = allGameCards.filter(c => !excludedCards.includes(c.name));

    if (filteredCharacters.length === 0) {
        document.getElementById('output').innerHTML = "<b>No characters left to choose from!</b>";
        return;
    }
    if (filteredCards.length === 0) {
        document.getElementById('output').innerHTML = "<b>No cards left to build a deck!</b>";
        return;
    }

    const shuffledCharacters = filteredCharacters.sort(() => Math.random() - 0.5);
    const characterToPlay = shuffledCharacters[Math.floor(Math.random() * shuffledCharacters.length)];

    const deckGenerator = new DeckRandomizer(filteredCards);
    const randomDeck = deckGenerator.generateRandomDeck(25, 50, 50);

    // ...inside main()
let output = `<h2>Character to play:</h2>
    <p><strong>${characterToPlay.name}</strong> - ${characterToPlay.description}</p>
    <h2>Generated Deck:</h2>
    <ul style="list-style:none;padding:0;">`;
let totalCost = 0;
for (let card of randomDeck) {
output += `<li style="margin-bottom:8px;">
    ${card.imageUrl ? `<img src="${card.imageUrl}" alt="${card.name}" style="height:96px;vertical-align:middle;margin-right:8px;">` : ''}
    <strong>${card.name}</strong> (Cost: ${card.cost})<br>
    <span style="font-size:smaller;">${card.description}</span>
</li>`;
    totalCost += card.cost;
}
output += `</ul>
    <p><strong>Total Cards:</strong> ${randomDeck.length}</p>
    <p><strong>Total Cost:</strong> ${totalCost}</p>`;
document.getElementById('output').innerHTML = output;
}

// Event listeners for filters and button
window.onload = function() {
    populateCheckboxes();
    main();
    document.getElementById('runBtn').onclick = main;
    document.getElementById('excludeCharactersContainer').onchange = main;
    document.getElementById('excludeCardsContainer').onchange = main;
};

// ...existing code...