//#region Import
import { View, StyleSheet, ScrollView, Text } from "react-native";
import useSkateParksQuery from "../services/useSkateParksQuery";
import { ErrorMessage } from "../components/shared/errorMessage";
import ListItem from "../components/list/ListItem";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";

//#endregion

const ListScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  //#region UseState
  const { data, isLoading, error, refresh } = useSkateParksQuery();
  //#endregion

  //#region CSS
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? "#222222" : "white",
    },
  });
  //#endregion

  //#region ErrorHandeling
  if (error) {
    // If query has error
    return <ErrorMessage error={error} />;
  }
  //#endregion

  //#region Loading
  if (isLoading) {
    //  If page is loding then show "loading...
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  //#endregion

  //#region SelectedList OnClick

  // Else show data
  //#endregion

  return (
    //#region ListPage
    <ScrollView style={styles.container}>
      {data.map((listItem) => (
        // creates LI for every item
        <ListItem
          key={listItem.id}
          data={listItem}
          onPress={(id) => navigation.navigate("D etails", { id })}
        />
      ))}
    </ScrollView>

    //#endregion
  );
};

export default ListScreen;
