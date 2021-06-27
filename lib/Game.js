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

        // test the object creation
        console.log(this.currentEnemy, this.player);
    });

};



module.exports = Game;