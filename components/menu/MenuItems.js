//#region imports
import { StyleSheet, View, Pressable, Text } from "react-native";
//#endregion imports

export default function SkateMenuItems({ label }) {
  // const skateParkList = skateParkList.map;
  // return (
  //   // <View style={styles.menuItemContainer}>
  //   //   <Pressable style={styles.menuItem} onPress={() => alert("hihi")}>
  //   //     <Text style={styles.menuItemLabel}>{label}</Text>
  //   //   </Pressable>
  //   // </View>
  // );
}

const styles = StyleSheet.create({
  menuItemContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  menuItem: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  menuItemIcon: {
    paddingRight: 8,
  },
  menuItemLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
