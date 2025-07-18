//#region Imports
import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useSkateParksQuery from "../services/useSkateParksQuery";
import DetailScreen from "./DetailScreen";
import { ErrorMessage } from "../components/shared/errorMessage";
import { useUserLocation } from "../services/useUserLocation";
import { useTheme } from "../providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";

//#endregion

const HomeScreen = () => {
  //#region UseState/WebserviceData
  const { data, isLoading, error, refresh } = useSkateParksQuery();
  const [selectedId, setSelectedId] = useState(null);
  const { location } = useUserLocation();
  const navigation = useNavigation();

  //#endregion

  //#region CSS
  const { isDarkMode } = useTheme();
  const defaultStyles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    map: {
      width: "100%",
      height: "100%",
    },
  });

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

  const styles = {
    ...defaultStyles,
    ...(isDarkMode ? stylesDark : stylesLight),
  };
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

  //#region Pin Selection

  //#endregion

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 52.1326,
          longitude: 5.2913,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        userInterfaceStyle={isDarkMode ? "dark" : "light"}
      >
        {/* Map end */}

        {/* Marker Location Start */}
        {data.map((markerItem, index) => (
          <Marker
            key={`${index}-${markerItem.id}`}
            coordinate={{
              latitude: markerItem.latitude,
              longitude: markerItem.longitude,
            }}
            title={markerItem.title}
            description={markerItem.description}
            onPress={() =>
              navigation.navigate("Details", { id: markerItem.id })
            }
            //Marker Location End
          />
        ))}

        {/* Your Location Start */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="#00ff00"
          />
          // Your Location end
        )}
      </MapView>
    </View>
  );
};

export default HomeScreen;
