import React from "react";
import { View, StyleSheet } from "react-native";
import { generate as generateRandomWord } from "random-words";

const monsterAttributes = {}; // Object to store barcode-to-monster attributes mapping

const generateMonster = (barcodeData) => {
  if (monsterAttributes.hasOwnProperty(barcodeData)) {
    // If the barcode data already exists in the mapping, return the existing monster
    return monsterAttributes[barcodeData];
  } else {
    // Generate a unique monster name based on barcodeData
    const randomName = generateRandomWord();

    // For simplicity, let's generate a random monster color
    const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

    // Create the monster object with generated attributes, including the sprite
    const generatedMonster = {
      name: randomName,
      color: randomColor,
      hairType: generateRandomAttribute(hairTypes),
      headType: generateRandomAttribute(headTypes),
      species: generateRandomAttribute(species),
      strength: generateRandomStat(10, 50), // Stat between 10 and 50 (inclusive)
      agility: generateRandomStat(10, 50), // Stat between 10 and 50 (inclusive)
      dexterity: generateRandomStat(10, 50), // Stat between 10 and 50 (inclusive)
      intelligence: generateRandomStat(10, 50), // Stat between 10 and 50 (inclusive)
      magic: generateRandomStat(10, 50), // Stat between 10 and 50 (inclusive)
    };

    // Store the generated monster attributes in the mapping
    monsterAttributes[barcodeData] = generatedMonster;

    return generatedMonster;
  }
};

// Helper function to extract attributes from barcodeData (replace this with your actual logic)
const extractAttributesFromBarcodeData = (barcodeData) => {
  // This is just an example, you should implement your own logic to parse the barcodeData
  return {
    hairType: "Unique Hair Type",
    headType: "Common Head Type",
    species: "Rare Species",
    strength: 45,
    agility: 30,
    dexterity: 35,
    intelligence: 40,
    magic: 50,
  };
};

// Helper function to generate a random attribute from an array
const generateRandomAttribute = (attributes) => {
  const rarityRoll = Math.random(); // Generate a random number between 0 and 1 for rarity check
  let attribute;
  if (rarityRoll < 0.8) {
    // 80% chance for common attribute
    attribute = getRandomElement(attributes.common);
  } else if (rarityRoll < 0.95) {
    // 15% chance for unique attribute
    attribute = getRandomElement(attributes.unique);
  } else if (rarityRoll < 0.99) {
    // 4% chance for rare attribute
    attribute = getRandomElement(attributes.rare);
  } else if (rarityRoll < 0.99925) {
    // 0.925% chance for legendary attribute
    attribute = getRandomElement(attributes.legendary);
  } else {
    // 0.025% chance for mythic attribute
    attribute = getRandomElement(attributes.mythic);
  }
  return attribute;
};

// Helper function to generate a random stat
const generateRandomStat = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get a random element from an array
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Hair types with different rarity variations
const hairTypes = {
  common: Array(20)
    .fill()
    .map((_, index) => `Common Hair Type ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Hair Type ${index + 1}`),
  rare: Array(5)
    .fill()
    .map((_, index) => `Rare Hair Type ${index + 1}`),
  legendary: Array(1)
    .fill()
    .map((_, index) => `Legendary Hair Type ${index + 1}`),
  mythic: Array(1)
    .fill()
    .map((_, index) => `Mythic Hair Type ${index + 1}`),
};

// Head types with different rarity variations
const headTypes = {
  common: Array(20)
    .fill()
    .map((_, index) => `Common Head Type ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Head Type ${index + 1}`),
  rare: Array(5)
    .fill()
    .map((_, index) => `Rare Head Type ${index + 1}`),
  legendary: Array(1)
    .fill()
    .map((_, index) => `Legendary Head Type ${index + 1}`),
  mythic: Array(1)
    .fill()
    .map((_, index) => `Mythic Head Type ${index + 1}`),
};

// Species with different rarity variations
const species = {
  common: Array(20)
    .fill()
    .map((_, index) => `Common Species ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Species ${index + 1}`),
  rare: Array(5)
    .fill()
    .map((_, index) => `Rare Species ${index + 1}`),
  legendary: Array(1)
    .fill()
    .map((_, index) => `Legendary Species ${index + 1}`),
  mythic: Array(1)
    .fill()
    .map((_, index) => `Mythic Species ${index + 1}`),
};

const styles = StyleSheet.create({
  monsterContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default generateMonster;