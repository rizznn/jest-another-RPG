// Player and Enemy have many of the same properties and methods
// They could pull these methods from a shared location instead of being defined twice. -> Character constructor

class Character {
    constructor(name = '') {
      this.name = name;
      this.health = Math.floor(Math.random() * 10 + 95);
      this.strength = Math.floor(Math.random() * 5 + 7);
      this.agility = Math.floor(Math.random() * 5 + 7);
    }

    // another method to check if the player is alive.
    // Here, we're updating the value of health halfway through the test so that we can check for both conditions: true and false
    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    };

    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // We've created variables for min and max to make this function a little easier to maintain.
    // What if you decide to increase the range of attacks later on? This code will be easier to understand upon revisit than if we wrote all of the expressions in one single return statement.
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // include the conditional to ensure the health never goes negative
    reduceHealth(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };
}

module.exports = Character;