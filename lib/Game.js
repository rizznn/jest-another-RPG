const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    // Note that currentEnemy and player are currently undefined
    // We'll assign them when the initializeGame() method is called.
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    // enemies array 
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // We also need to keep track of which Enemy object is currently fighting the Player. 
    // When the game starts, this would be the first object in the array.
    this.currentEnemy = this.enemies[0];
    
    // prompt the user for their name, which will become the Player name.
    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
        this.player = new Player(name);

        // placeholder for starting a new round
        this.startNewBattle();
    });

};
// start new battle
Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    // we need to display the Player stats in a  formatted table of data
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    // Enemy object's description
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

// battle
Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        // player prompts will go here
        inquirer
        .prompt({
            // inquirer package's type: 'list' option to display a list of choices, where the user must either select 'Attack' or 'Use potion'
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
        })
        .then(({ action }) => {
            if (action === 'Use potion') {
                // follow-up prompt will go here
                //  It would be good to check for an empty inventory before trying to display choices to the user. 
                // If the inventory is empty, immediately return to end the Player turn. 
                if (!this.player.getInventory()) {
                    console.log("You don't have any potions!");
                    return this.checkEndOfBattle();
                }
                
                // If the inventory is not empty, then the code following the if statement will still execute and it will prompt the user for a specific Potion selection.
                inquirer
                    .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({ action }) => {
                        const potionDetails = action.split(': ');

                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                        this.checkEndOfBattle();
                    });
            } else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
                this.checkEndOfBattle();
            }
        });

    } else {

        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
    
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    // verify if both characters are alive and can continue fighting, then we should switch the turn order and run battle() again.
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }

    // Player is still alive but the Enemy has been defeated
    // If this is the case, Player is awarded a Potion, and the roundNumber increases.
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
      
        this.roundNumber++;
      
        // However, it's possible there are no more enemies to fight, in which case the Player has won the overall game.
        if (this.roundNumber < this.enemies.length) {
          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();
        } else {
          console.log('You win!');
        }
    }
    // the Player might have been defeated
    else {
        console.log("You've been defeated!");
      }
};


module.exports = Game;