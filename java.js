// Initial health values for player and opponent
let playerHealth = 100;
let opponentHealth = 100;
let currentPlayerAction;

// Function for coin toss
function tossCoin() {
    const coinChoice = document.getElementById('choice').value;
    const coinResult = Math.random() < 0.5 ? 'head' : 'tail';
    const tossMessage = `Coin is ${coinResult}. You chose ${coinChoice}!`;

    // Enable buttons for player actions
    document.getElementById('attackbutton').disabled = false;
    document.getElementById('defendbutton').disabled = false;

    // Display the result of the coin toss
    showTossCoinMessage(tossMessage);
}

// Function for calculating damage
function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1; 
}

// Function for opponent's action (randomized between attack and defend)
function opponentAction() {
    return Math.random() < 0.5 ? 'attack' : 'defend';
}

// Function for player's action
function playerAction(action) {
    currentPlayerAction = action;
    if (action === 'attack') {
        showMessage("<strong> You will Attack! </strong>");
        playerAttack();
    } else {
        showMessage("<strong> You will Defend! </strong>");
        playerDefend();
    }
}

// Function for player's attack action
function playerAttack() {
    let damage = calculateDamage();
    let opponentBlock = Math.random() < 0.5;
    if (opponentBlock) {
        showMessage("The opponent completely blocked your attack.");
        damage = 0;
    } else {
        opponentHealth -= damage;
        if (opponentHealth < 0) opponentHealth = 0;
        showMessage(`You inflict ${damage} damage.`);
    }
    updateHealthStatus();
    opponentTurn();
}

// Function for player's defend action
function playerDefend() {
    const action = opponentAction();
    if (action === 'attack') {
        const opponentDamage = Math.floor(Math.random() * 4);
        playerHealth -= opponentDamage;
        if (playerHealth < 0) playerHealth = 0;
        showMessage(`Opponent inflicts ${opponentDamage} damage.`);
    } else if (action === 'defend') {
        showMessage("Opponent defends");
    }
    updateHealthStatus();
}

// Function for opponent's turn
function opponentTurn() {
    if (currentPlayerAction === 'defend') {
        return;
    }

    if (opponentHealth > 0) {
        const action = opponentAction();
        if (action === 'attack') {
            playerDefend();
        } else if (action === 'defend') {
            showMessage("Opponent defends.");
        }
    }
}

// Function for updating health status
function updateHealthStatus() {
    document.getElementById('playerhealth').textContent = "Player: " + playerHealth;
    document.getElementById('opponenthealth').textContent = "Opponent: " + opponentHealth;
    checkHealth();
}

// Function for checking game over conditions
function checkHealth() {
    if (playerHealth <= 0) {
        showMessage("<strong>Opponent wins.</strong>");
        disableButtons();
    } else if (opponentHealth <= 0) {
        showMessage("<strong>Player wins.</strong>");
        disableButtons();
    }
}

// Function for resetting the game
function resetGame() {
    playerHealth = 100;
    opponentHealth = 100;
    updateHealthStatus();
    clearMessages();
    enableButtons(); 
}

// Function for disabling buttons
function disableButtons() {
    document.getElementById('attackbutton').disabled = true;
    document.getElementById('defendbutton').disabled = true;
    document.getElementById('resetbutton').disabled = false;
}

// Function for enabling buttons
function enableButtons() {
    document.getElementById('attackbutton').disabled = false;
    document.getElementById('defendbutton').disabled = false;
    document.getElementById('resetbutton').disabled = true;
}

// Functions for displaying messages
function showMessage(message) {
    const messagesDiv = document.getElementById("battleoutput");
    const p = document.createElement('p');
    p.classList.add('message');
    p.innerHTML = message; 
    messagesDiv.appendChild(p);
}

function showTossCoinMessage(message) {
    const messagesDiv = document.getElementById("tosscoinresultoutput");
    const p = document.createElement('p');
    p.classList.add('message');
    p.innerHTML = message; 
    messagesDiv.appendChild(p);
}

function clearMessages() {
    document.getElementById('battleoutput').innerHTML = '';
}