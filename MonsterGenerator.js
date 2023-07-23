import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Ellipse, Rect } from "react-native-svg";
import createMonsterSprite from "./MonsterSprite"; // Import the createMonsterSprite function from the new file

const monsterAttributes = {}; // Object to store barcode-to-monster attributes mapping

const generateMonster = (barcodeData) => {
  if (monsterAttributes.hasOwnProperty(barcodeData)) {
    // If the barcode data already exists in the mapping, return the existing monster
    return monsterAttributes[barcodeData];
  } else {
    // For simplicity, let's generate a random monster name and color
    const randomName = "Monster " + Math.floor(Math.random() * 1000);
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
      sprite: createMonsterSprite(randomColor), // Generate a unique monster sprite based on the color
    };

    // Store the generated monster attributes in the mapping
    monsterAttributes[barcodeData] = generatedMonster;

    return generatedMonster;
  }
};

// Helper function to generate a random attribute from an array
const generateRandomAttribute = (attributes) => {
  const rarityRoll = Math.random(); // Generate a random number between 0 and 1 for rarity check
  let attribute;
  if (rarityRoll < 0.6) {
    // 60% chance for common attribute
    attribute = getRandomElement(attributes.common);
  } else if (rarityRoll < 0.9) {
    // 30% chance for unique attribute
    attribute = getRandomElement(attributes.unique);
  } else {
    // 10% chance for rare attribute
    attribute = getRandomElement(attributes.rare);
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

// Hair types with common, unique, and rare variations
const hairTypes = {
  common: Array(20)
    .fill()
    .map((_, index) => `Hair Type ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Hair Type ${index + 1}`),
  rare: Array(10)
    .fill()
    .map((_, index) => `Rare Hair Type ${index + 1}`),
};

// Head types with common, unique, and rare variations
const headTypes = {
  common: Array(20)
    .fill()
    .map((_, index) => `Head Type ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Head Type ${index + 1}`),
  rare: Array(10)
    .fill()
    .map((_, index) => `Rare Head Type ${index + 1}`),
};

// Species with common, unique, and rare variations
const species = {
  common: Array(20)
    .fill()
    .map((_, index) => `Species ${index + 1}`),
  unique: Array(10)
    .fill()
    .map((_, index) => `Unique Species ${index + 1}`),
  rare: Array(10)
    .fill()
    .map((_, index) => `Rare Species ${index + 1}`),
};

const styles = StyleSheet.create({
  monsterContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default generateMonster;
