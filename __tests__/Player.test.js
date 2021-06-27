const Player = require('../lib/Player');
const Potion = require('../lib/Potion'); //imports the Potion() constructor into the test, establishing Potion as a variable

// mocks/replaces the constructor's implementation with our faked data = mocked data will be returned
jest.mock('../lib/Potion');

test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    // Note that the player's inventory should be an array containing an object.
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)])
    );
});

// the getStats() method will return an object containing a subset of the player's properties
test("gets player's stats as an object", () => {
    const player = new Player('Dave');
  
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

// The getInventory() method will return an array of Potion objects or return false if the inventory is empty.
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
  
    expect(player.getInventory()).toEqual(expect.any(Array));
  
    player.inventory = [];
  
    expect(player.getInventory()).toEqual(false);
});

// a test to get information about the player's health
test("gets player's health value", () => {
    const player = new Player('Dave');
  
    // The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health.
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// to check if the player is alive
test('checks if player is alive or not', () => {
    const player = new Player('Dave');
  
    expect(player.isAlive()).toBeTruthy();
  
    player.health = 0;
  
    expect(player.isAlive()).toBeFalsy();
});

// test to handle the reduceHealth() method to see if the correct amount of health is being subtracted from the Player health property
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;
  
    player.reduceHealth(5);
  
    expect(player.health).toBe(oldHealth - 5);
  
    // we will call the reduceHealth() method twice—the second time with an absurdly high value to make sure that it never goes negative
    player.reduceHealth(99999);
  
    expect(player.health).toBe(0);
});

// The following code shows how to create a new test that verifies that a player's attack value is within range
test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;
  
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// we keep track of the old count so that we can ensure that adding a potion to our inventory actually increases the length of the player.inventory array.
test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;
  
    player.addPotion(new Potion());
  
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// we need to write tests that ensure that usePotion() removes the correct Potion from the Player inventory.
// What is the correct Potion? Eventually, our Player will select which Potion to use from the inventory. We will use the index of the Potion to keep track of which one has been selected.
test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;
  
    player.usePotion(1);
  
    expect(player.inventory.length).toBeLessThan(oldCount);
});