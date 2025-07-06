//#region imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
//Screens
import ListScreen from "./screens/ListScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
//Icons
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import useAsyncStorage from "./services/useAsyncStorage";
import { ThemeProvider, useTheme } from "./providers/ThemeProvider";
import { createStackNavigator } from "@react-navigation/stack";
//#endregion

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  //#region CSS
  const { isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: isDarkMode ? "#B55555" : "#D9D9D9",
    },
    tabBar: {
      backgroundColor: isDarkMode ? "#D9D9D9" : "#D9D9D9",
      padding: 0,
      margin: 0,
    },
    headerTitle: {
      color: "white",
    },
  });
  //#endregion

  return (
    <Tab.Navigator
      //"initialRouteName" is the start screen
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: styles.header,
        tabBarStyle: styles.tabBar,

        //#region Nav ICons
        tabBarIcon: ({ focused, color, size }) => {
          switch (
            route.name // switch case is the same as an if but you don't have to press in this example "route.name" once
          ) {
            case "Home":
              return (
                <Ionicons
                  size={size}
                  name="home"
                  color={focused ? "#B55555" : ""}
                />
              );
            case "List":
              return (
                <Ionicons
                  size={size}
                  name="list"
                  color={focused ? "#B55555" : ""}
                />
              );
            case "Settings":
              return (
                <Ionicons
                  size={size}
                  name="cog"
                  color={focused ? "#B55555" : ""}
                />
              );
            default:
              // if route not found
              return <Ionicons size={size} name="closecircle" color={color} />;
          }
        },
        tabBarShowLabel: false, //doesn't show label name on the tab
        //#endregion
      })}
    >
      {/* Tab Start */}
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          headerTintColor: isDarkMode ? "#fff" : "#000",
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: isDarkMode ? "#fff" : "#000",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTintColor: isDarkMode ? "#fff" : "#000",
        }}
      />
      {/* Tab End */}
    </Tab.Navigator>
  );
};
function Root() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home-screen"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        initialParams={{ id: null }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </NavigationContainer>
  );
}
