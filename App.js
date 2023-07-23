// App.js or root component
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scan from "./Scan";
import MonsterCollection from "./MonsterCollection";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen name="Monster Collection" component={MonsterCollection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
