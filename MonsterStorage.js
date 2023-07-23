// MonsterStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const MONSTERS_KEY = "@monsters"; // Key to identify the monsters in AsyncStorage

export const saveMonster = async (monster) => {
    try {
      const existingMonsters = await getMonsters();
      const updatedMonsters = [...existingMonsters, monster];
      const monstersJSON = JSON.stringify(updatedMonsters);
      await AsyncStorage.setItem(MONSTERS_KEY, monstersJSON);
    } catch (error) {
      console.error("Error saving monster:", error);
    }
  };

export const getMonsters = async () => {
    try {
      const monstersJSON = await AsyncStorage.getItem(MONSTERS_KEY);
      let monsters = monstersJSON ? JSON.parse(monstersJSON) : [];
      
      // Sort the monsters by createdAt property (newest to oldest)
      monsters = monsters.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      return monsters;
    } catch (error) {
      console.error("Error getting monsters:", error);
      return [];
    }
  };

  export const clearMonsters = async () => {
    try {
      await AsyncStorage.removeItem(MONSTERS_KEY);
    } catch (error) {
      console.error("Error clearing monsters:", error);
    }
  };