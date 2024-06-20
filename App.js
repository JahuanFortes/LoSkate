//#region imports
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MenuItems from "./components/menu/MenuItems";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

//#endregion imports

export default function App() {
  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MapView
          style={styles.map}
          region={{
            latitude: 52.1326,
            longitude: 5.2913,
            latitudeDelta: 3,
            longitudeDelta: 3,
          }}
        />
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings</Text>
      </View>
    );
  }
  function ListScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>List</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    backgroundColor: "#d9d9d9",
    height: "84px",
    width: "390px",
    position: "absolute",
    top: "760px",
    left: "0px",
  },

  map: {
    width: "100%",
    height: "100%",
  },
});
