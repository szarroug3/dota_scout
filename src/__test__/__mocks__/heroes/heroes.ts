const mockHeroesResponse: Array<HeroResponse> = [
  {
    id: 1,
    localized_name: 'Anti-Mage',
  },
  {
    id: 2,
    localized_name: 'Axe',
  },
  {
    id: 3,
    localized_name: 'Bane',
  },
  {
    id: 4,
    localized_name: 'Bloodseeker',
  },
  {
    id: 5,
    localized_name: 'Crystal Maiden',
  },
  {
    id: 6,
    localized_name: 'Drow Ranger',
  },
  {
    id: 7,
    localized_name: 'Earthshaker',
  },
  {
    id: 8,
    localized_name: 'Juggernaut',
  },
  {
    id: 9,
    localized_name: 'Mirana',
  },
  {
    id: 10,
    localized_name: 'Morphling',
  },
  {
    id: 11,
    localized_name: 'Shadow Fiend',
  },
  {
    id: 12,
    localized_name: 'Phantom Lancer',
  },
  {
    id: 13,
    localized_name: 'Puck',
  },
  {
    id: 14,
    localized_name: 'Pudge',
  },
  {
    id: 15,
    localized_name: 'Razor',
  },
  {
    id: 16,
    localized_name: 'Sand King',
  },
  {
    id: 17,
    localized_name: 'Storm Spirit',
  },
  {
    id: 18,
    localized_name: 'Sven',
  },
  {
    id: 19,
    localized_name: 'Tiny',
  },
  {
    id: 20,
    localized_name: 'Vengeful Spirit',
  },
  {
    id: 21,
    localized_name: 'Windranger',
  },
  {
    id: 22,
    localized_name: 'Zeus',
  },
  {
    id: 23,
    localized_name: 'Kunkka',
  },
  {
    id: 25,
    localized_name: 'Lina',
  },
  {
    id: 26,
    localized_name: 'Lion',
  },
  {
    id: 27,
    localized_name: 'Shadow Shaman',
  },
  {
    id: 28,
    localized_name: 'Slardar',
  },
  {
    id: 29,
    localized_name: 'Tidehunter',
  },
  {
    id: 30,
    localized_name: 'Witch Doctor',
  },
  {
    id: 31,
    localized_name: 'Lich',
  },
  {
    id: 32,
    localized_name: 'Riki',
  },
  {
    id: 33,
    localized_name: 'Enigma',
  },
  {
    id: 34,
    localized_name: 'Tinker',
  },
  {
    id: 35,
    localized_name: 'Sniper',
  },
  {
    id: 36,
    localized_name: 'Necrophos',
  },
  {
    id: 37,
    localized_name: 'Warlock',
  },
  {
    id: 38,
    localized_name: 'Beastmaster',
  },
  {
    id: 39,
    localized_name: 'Queen of Pain',
  },
  {
    id: 40,
    localized_name: 'Venomancer',
  },
  {
    id: 41,
    localized_name: 'Faceless Void',
  },
  {
    id: 42,
    localized_name: 'Wraith King',
  },
  {
    id: 43,
    localized_name: 'Death Prophet',
  },
  {
    id: 44,
    localized_name: 'Phantom Assassin',
  },
  {
    id: 45,
    localized_name: 'Pugna',
  },
  {
    id: 46,
    localized_name: 'Templar Assassin',
  },
  {
    id: 47,
    localized_name: 'Viper',
  },
  {
    id: 48,
    localized_name: 'Luna',
  },
  {
    id: 49,
    localized_name: 'Dragon Knight',
  },
  {
    id: 50,
    localized_name: 'Dazzle',
  },
  {
    id: 51,
    localized_name: 'Clockwerk',
  },
  {
    id: 52,
    localized_name: 'Leshrac',
  },
  {
    id: 53,
    localized_name: "Nature's Prophet",
  },
  {
    id: 54,
    localized_name: 'Lifestealer',
  },
  {
    id: 55,
    localized_name: 'Dark Seer',
  },
  {
    id: 56,
    localized_name: 'Clinkz',
  },
  {
    id: 57,
    localized_name: 'Omniknight',
  },
  {
    id: 58,
    localized_name: 'Enchantress',
  },
  {
    id: 59,
    localized_name: 'Huskar',
  },
  {
    id: 60,
    localized_name: 'Night Stalker',
  },
  {
    id: 61,
    localized_name: 'Broodmother',
  },
  {
    id: 62,
    localized_name: 'Bounty Hunter',
  },
  {
    id: 63,
    localized_name: 'Weaver',
  },
  {
    id: 64,
    localized_name: 'Jakiro',
  },
  {
    id: 65,
    localized_name: 'Batrider',
  },
  {
    id: 66,
    localized_name: 'Chen',
  },
  {
    id: 67,
    localized_name: 'Spectre',
  },
  {
    id: 68,
    localized_name: 'Ancient Apparition',
  },
  {
    id: 69,
    localized_name: 'Doom',
  },
  {
    id: 70,
    localized_name: 'Ursa',
  },
  {
    id: 71,
    localized_name: 'Spirit Breaker',
  },
  {
    id: 72,
    localized_name: 'Gyrocopter',
  },
  {
    id: 73,
    localized_name: 'Alchemist',
  },
  {
    id: 74,
    localized_name: 'Invoker',
  },
  {
    id: 75,
    localized_name: 'Silencer',
  },
  {
    id: 76,
    localized_name: 'Outworld Destroyer',
  },
  {
    id: 77,
    localized_name: 'Lycan',
  },
  {
    id: 78,
    localized_name: 'Brewmaster',
  },
  {
    id: 79,
    localized_name: 'Shadow Demon',
  },
  {
    id: 80,
    localized_name: 'Lone Druid',
  },
  {
    id: 81,
    localized_name: 'Chaos Knight',
  },
  {
    id: 82,
    localized_name: 'Meepo',
  },
  {
    id: 83,
    localized_name: 'Treant Protector',
  },
  {
    id: 84,
    localized_name: 'Ogre Magi',
  },
  {
    id: 85,
    localized_name: 'Undying',
  },
  {
    id: 86,
    localized_name: 'Rubick',
  },
  {
    id: 87,
    localized_name: 'Disruptor',
  },
  {
    id: 88,
    localized_name: 'Nyx Assassin',
  },
  {
    id: 89,
    localized_name: 'Naga Siren',
  },
  {
    id: 90,
    localized_name: 'Keeper of the Light',
  },
  {
    id: 91,
    localized_name: 'Io',
  },
  {
    id: 92,
    localized_name: 'Visage',
  },
  {
    id: 93,
    localized_name: 'Slark',
  },
  {
    id: 94,
    localized_name: 'Medusa',
  },
  {
    id: 95,
    localized_name: 'Troll Warlord',
  },
  {
    id: 96,
    localized_name: 'Centaur Warrunner',
  },
  {
    id: 97,
    localized_name: 'Magnus',
  },
  {
    id: 98,
    localized_name: 'Timbersaw',
  },
  {
    id: 99,
    localized_name: 'Bristleback',
  },
  {
    id: 100,
    localized_name: 'Tusk',
  },
  {
    id: 101,
    localized_name: 'Skywrath Mage',
  },
  {
    id: 102,
    localized_name: 'Abaddon',
  },
  {
    id: 103,
    localized_name: 'Elder Titan',
  },
  {
    id: 104,
    localized_name: 'Legion Commander',
  },
  {
    id: 105,
    localized_name: 'Techies',
  },
  {
    id: 106,
    localized_name: 'Ember Spirit',
  },
  {
    id: 107,
    localized_name: 'Earth Spirit',
  },
  {
    id: 108,
    localized_name: 'Underlord',
  },
  {
    id: 109,
    localized_name: 'Terrorblade',
  },
  {
    id: 110,
    localized_name: 'Phoenix',
  },
  {
    id: 111,
    localized_name: 'Oracle',
  },
  {
    id: 112,
    localized_name: 'Winter Wyvern',
  },
  {
    id: 113,
    localized_name: 'Arc Warden',
  },
  {
    id: 114,
    localized_name: 'Monkey King',
  },
  {
    id: 119,
    localized_name: 'Dark Willow',
  },
  {
    id: 120,
    localized_name: 'Pangolier',
  },
  {
    id: 121,
    localized_name: 'Grimstroke',
  },
  {
    id: 123,
    localized_name: 'Hoodwink',
  },
  {
    id: 126,
    localized_name: 'Void Spirit',
  },
  {
    id: 128,
    localized_name: 'Snapfire',
  },
  {
    id: 129,
    localized_name: 'Mars',
  },
  {
    id: 135,
    localized_name: 'Dawnbreaker',
  },
  {
    id: 136,
    localized_name: 'Marci',
  },
  {
    id: 137,
    localized_name: 'Primal Beast',
  },
  {
    id: 138,
    localized_name: 'Muerta',
  },
];

const mockHeroes = {
  1: 'Anti-Mage',
  2: 'Axe',
  3: 'Bane',
  4: 'Bloodseeker',
  5: 'Crystal Maiden',
  6: 'Drow Ranger',
  7: 'Earthshaker',
  8: 'Juggernaut',
  9: 'Mirana',
  10: 'Morphling',
  11: 'Shadow Fiend',
  12: 'Phantom Lancer',
  13: 'Puck',
  14: 'Pudge',
  15: 'Razor',
  16: 'Sand King',
  17: 'Storm Spirit',
  18: 'Sven',
  19: 'Tiny',
  20: 'Vengeful Spirit',
  21: 'Windranger',
  22: 'Zeus',
  23: 'Kunkka',
  25: 'Lina',
  26: 'Lion',
  27: 'Shadow Shaman',
  28: 'Slardar',
  29: 'Tidehunter',
  30: 'Witch Doctor',
  31: 'Lich',
  32: 'Riki',
  33: 'Enigma',
  34: 'Tinker',
  35: 'Sniper',
  36: 'Necrophos',
  37: 'Warlock',
  38: 'Beastmaster',
  39: 'Queen of Pain',
  40: 'Venomancer',
  41: 'Faceless Void',
  42: 'Wraith King',
  43: 'Death Prophet',
  44: 'Phantom Assassin',
  45: 'Pugna',
  46: 'Templar Assassin',
  47: 'Viper',
  48: 'Luna',
  49: 'Dragon Knight',
  50: 'Dazzle',
  51: 'Clockwerk',
  52: 'Leshrac',
  53: "Nature's Prophet",
  54: 'Lifestealer',
  55: 'Dark Seer',
  56: 'Clinkz',
  57: 'Omniknight',
  58: 'Enchantress',
  59: 'Huskar',
  60: 'Night Stalker',
  61: 'Broodmother',
  62: 'Bounty Hunter',
  63: 'Weaver',
  64: 'Jakiro',
  65: 'Batrider',
  66: 'Chen',
  67: 'Spectre',
  68: 'Ancient Apparition',
  69: 'Doom',
  70: 'Ursa',
  71: 'Spirit Breaker',
  72: 'Gyrocopter',
  73: 'Alchemist',
  74: 'Invoker',
  75: 'Silencer',
  76: 'Outworld Destroyer',
  77: 'Lycan',
  78: 'Brewmaster',
  79: 'Shadow Demon',
  80: 'Lone Druid',
  81: 'Chaos Knight',
  82: 'Meepo',
  83: 'Treant Protector',
  84: 'Ogre Magi',
  85: 'Undying',
  86: 'Rubick',
  87: 'Disruptor',
  88: 'Nyx Assassin',
  89: 'Naga Siren',
  90: 'Keeper of the Light',
  91: 'Io',
  92: 'Visage',
  93: 'Slark',
  94: 'Medusa',
  95: 'Troll Warlord',
  96: 'Centaur Warrunner',
  97: 'Magnus',
  98: 'Timbersaw',
  99: 'Bristleback',
  100: 'Tusk',
  101: 'Skywrath Mage',
  102: 'Abaddon',
  103: 'Elder Titan',
  104: 'Legion Commander',
  105: 'Techies',
  106: 'Ember Spirit',
  107: 'Earth Spirit',
  108: 'Underlord',
  109: 'Terrorblade',
  110: 'Phoenix',
  111: 'Oracle',
  112: 'Winter Wyvern',
  113: 'Arc Warden',
  114: 'Monkey King',
  119: 'Dark Willow',
  120: 'Pangolier',
  121: 'Grimstroke',
  123: 'Hoodwink',
  126: 'Void Spirit',
  128: 'Snapfire',
  129: 'Mars',
  135: 'Dawnbreaker',
  136: 'Marci',
  137: 'Primal Beast',
  138: 'Muerta',
};

export { mockHeroesResponse, mockHeroes };
