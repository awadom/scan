import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Ellipse } from "react-native-svg";

const styles = StyleSheet.create({
  monsterContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

 const createMonsterSprite = (color) => {
  return (
    <View style={styles.monsterContainer}>
      <Svg height="100" width="100">
        {/* Body */}
        <Circle cx="50" cy="50" r="40" fill={color} />
        {/* Eyes */}
        <Circle cx="35" cy="40" r="5" fill="black" />
        <Circle cx="65" cy="40" r="5" fill="black" />
        {/* Mouth */}
        <Ellipse cx="50" cy="60" rx="15" ry="8" fill="black" />
      </Svg>
    </View>
  );
};

export {createMonsterSprite};
