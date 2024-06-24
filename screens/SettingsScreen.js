//#region imports
import { ScrollView, StyleSheet } from "react-native";
import { ToggleSetting } from "../components/setting/toggleSetting";
import { useEffect } from "react";
import useAsyncStorage from "../services/useAsyncStorage";
import { useTheme } from "../providers/ThemeProvider";
//#endregion imports

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  //#region CSS
  const stylesLight = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
  });

  const stylesDark = StyleSheet.create({
    container: {
      backgroundColor: "#222222",
    },
  });

  const styles = isDarkMode ? stylesDark : stylesLight;
  //#endregion

  //#region Settings page
  return (
    <ScrollView style={styles.container}>
      {/* theme change */}

      <ToggleSetting
        title="DarkMode"
        value={isDarkMode}
        onChange={toggleDarkMode}
      />
    </ScrollView>
  );
  //#endregion
};

export default SettingsScreen;
