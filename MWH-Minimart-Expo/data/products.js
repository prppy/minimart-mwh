const products = [
  {
    id: 1,
    name: "Toothpaste",
    description: "Fresh mint toothpaste for daily use.",
    image: require("../assets/toothpaste.jpg"),
    points: 10,
    category: "Hygiene",
    type: "Daily",
  },
  {
    id: 2,
    name: "Canned Drinks",
    description: "Refreshing canned drinks for any occasion.",
    image: require("../assets/canned-drinks.jpg"),
    points: 12,
    category: "Drinks",
    type: "Daily",
  },
  {
    id: 3,
    name: "Monopoly",
    description: "Classic board game for family fun.",
    image: require("../assets/monopoly.jpg"),
    points: 150,
    category: "Games",
    type: "Showcase",
  },
  {
    id: 4,
    name: "Uno",
    description: "Fast-paced card game for 2 to 10 players.",
    image: require("../assets/uno.jpg"),
    points: 150,
    category: "Games",
    type: "Showcase",
  },
];

export default products;
