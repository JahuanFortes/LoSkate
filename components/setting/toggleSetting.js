//#region imports
import { Text, View, StyleSheet, Switch } from "react-native";
//#endregion imports

export const ToggleSetting = ({ title, value, onChange }) => {
  //#region CSS
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 10,
      padding: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: "red",
    },
  });
  //#endregion

  return (
    //#region ToggleSwitch
    // Toggle on the Settings page
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
    //#endregion
  );
};
