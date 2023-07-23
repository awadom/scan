import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import generateMonster from "./MonsterGenerator";
import { saveMonster, getMonsters } from "./MonsterStorage"; // Import the saveMonster and getMonsters functions
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import MonsterCollection from "./MonsterCollection"; // Import the MonsterCollection component

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedBarcodes, setScannedBarcodes] = useState([]);
  const [monster, setMonster] = useState(null);
  const [showMonster, setShowMonster] = useState(false);
  const [showCaptureModal, setShowCaptureModal] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const fetchScannedBarcodes = async () => {
    const collectedMonsters = await getMonsters();
    const collectedBarcodes = collectedMonsters.map((monster) => monster.barcode);
    setScannedBarcodes(collectedBarcodes);
  };

  // Load the scanned barcodes on component mount and when the app comes into the foreground
  useEffect(() => {
    fetchScannedBarcodes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchScannedBarcodes();
      return () => {
        // Cleanup function to remove focus subscription
      };
    }, [])
  );

// ... (Other imports and code)

const handleBarCodeScanned = async ({ type, data }) => {
    if (!scannedBarcodes.includes(data)) {
      setScanned(true);
      setShowMonster(true);
      const newScannedBarcodes = [...scannedBarcodes, data];
      setScannedBarcodes(newScannedBarcodes);
  
      const newMonster = generateMonster(data);
      setMonster(newMonster);
  
      await saveMonster({ ...newMonster, barcode: data }); // Include barcode with the monster object
    } else {
      // If the barcode has already been scanned, show the capture modal
      setShowCaptureModal(true);
    }
  };
  
  // ... (Remaining code)
  

  const handleScanAgain = () => {
    setScanned(false);
    setShowMonster(false);
    setShowCaptureModal(false);
    // No need to clear scanned barcodes when "Tap to Scan Again" is pressed
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Modal isVisible={showMonster}>
        <View style={styles.modalContent}>
          {monster && (
            <View style={styles.monsterContainer}>
              <Text style={styles.monsterName}>{monster.name}</Text>
              <View
                style={[styles.monsterImage, { backgroundColor: monster.color }]}
              />
            </View>
          )}
          <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
        </View>
      </Modal>
      <Modal isVisible={showCaptureModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This monster has been captured!</Text>
          <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    monsterContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    monsterName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
      marginBottom: 10,
    },
    // Update the monsterImage style to create an egg shape
    monsterImage: {
        width: 30,
        height: 30, // Adjust the height to make it look like an egg shape
        borderRadius: 25, // Change the borderRadius to make it look like an egg shape
        transform: [{ scaleY: 1.3 }], // Apply scaleY to adjust the height of the egg shape
      },
    modalText: {
      fontSize: 18,
      marginBottom: 16,
    },
  });