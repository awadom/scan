import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Modal,
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { getMonsters, clearMonsters } from "./MonsterStorage";

function MonsterCollection({ isFocused }) {
  const [monsters, setMonsters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(null); // State variable to hold the selected monster data
  const [isModalVisible, setModalVisible] = useState(false); // State variable to control the modal visibility

  useEffect(() => {
    if (isFocused) {
      fetchMonsters();
    }
  }, [isFocused]);

  const fetchMonsters = async () => {
    const collectedMonsters = await getMonsters();
    setMonsters(collectedMonsters);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMonsters();
    setRefreshing(false);
  };

  const handleDeleteMonsters = async () => {
    try {
      await clearMonsters();
      fetchMonsters(); // Refetch the monsters after clearing
    } catch (error) {
      console.error("Error deleting monsters:", error);
    }
  };

  // Function to handle tapping on a monster item
  const handleMonsterTap = (monster) => {
    setSelectedMonster(monster); // Set the selected monster data to display in the modal
    setModalVisible(true); // Show the modal
  };

  const renderMonsterItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMonsterTap(item)}>
      <View style={styles.monsterItem}>
        <Text style={styles.monsterName}>{item.name}</Text>
        <View style={[styles.miniImage, { backgroundColor: item.color }]} />
      </View>
    </TouchableOpacity>
  );

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monster Collection</Text>
      <FlatList
        data={monsters.reverse()}
        renderItem={renderMonsterItem}
        keyExtractor={(item) => item.name}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <Button title="Delete Monsters" onPress={handleDeleteMonsters} />

      {/* Modal to display monster details */}
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        {selectedMonster && (
          <View style={styles.modalContainer}>
            {/* Render the unique monster sprite */}

            <Text style={styles.modalTitle}>{selectedMonster.name}</Text>
            <Text>Color: {selectedMonster.color}</Text>
            <Text>Height: {selectedMonster.height}</Text>
            <Text>Weight: {selectedMonster.weight}</Text>
            <Text>Hair Type: {selectedMonster.hairType}</Text>
            <Text>Head Type: {selectedMonster.headType}</Text>
            <Text>Species: {selectedMonster.species}</Text>
            <Text>Strength: {selectedMonster.strength}</Text>
            <Text>Agility: {selectedMonster.agility}</Text>
            <Text>Dexterity: {selectedMonster.dexterity}</Text>
            <Text>Intelligence: {selectedMonster.intelligence}</Text>
            <Text>Magic: {selectedMonster.magic}</Text>



            <Button title="Close" onPress={closeModal} />
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    monsterItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      marginTop:12,
    },
    monsterName: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 12,
    },
    // Update the monsterImage style to create an egg shape
    miniImage: {
        width: 30,
        height: 50,
        borderRadius: '80% 15% 55% 50% / 55% 15% 80% 50%',
        borderWidth: 3,
        borderColor: '#1c446b',
        transform: [{ rotate: '-45deg' }],
        marginLeft: 60
    },
      
    monsterImage: {
        width: 30,
        height: 50, // Adjust the height to make it look like an egg shape
        borderRadius: 30, // Change the borderRadius to make it look like an egg shape
        transform: [{ scaleY: 0.6 }], // Apply scaleY to adjust the height of the egg shape
      marginBottom: 50,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
});

export default withNavigationFocus(MonsterCollection);
