const Potion = require('../lib/Potion');
const Character = require('./Character');

class Player extends Character{
    constructor(name = '') {
        // call parent constructor here:
        super(name);
        
        // calling new Potion() here will actually use the mocked version during the test.
        this.inventory = [new Potion('health'), new Potion()];
    }

    // returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    // add potion
    addPotion(potion) {
        this.inventory.push(potion);
    }

    // two things are happening here: 
    // (a) the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array,
    // (b) then the Potion at index [0] of this "removed items" array is saved in a potion variable.
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];
    
        switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
        }
    }

}
module.exports = Player;