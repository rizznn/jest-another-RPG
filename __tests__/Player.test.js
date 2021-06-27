const Player = require('../lib/Player');
const Potion = require('../lib/Potion'); //imports the Potion() constructor into the test, establishing Potion as a variable

// mocks/replaces the constructor's implementation with our faked data = mocked data will be returned
jest.mock('../lib/Potion');

console.log(new Potion());

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