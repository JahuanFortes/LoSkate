//#region imports
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import placeholder from "../../assets/cat.png";
//#endregion

const ListItem = ({ data, onPress }) => {
  //#region Css
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      margin: 5,
      padding: 8,
      backgroundColor: "#B55555",
    },
    image: {
      objectFit: "cover",
      width: 120,
      height: 100,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  //#endregion

  //#region Webservice data for the List
  const { id, title, description, latitude, logitude } = data;
  //#endregion

  return (
    //#region Clickable LI
    <TouchableOpacity
      onPress={() => {
        onPress(id);
      }}
    >
      <View style={styles.container}>
        <Image source={placeholder} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
    //#endregion
  );
};

export default ListItem;
