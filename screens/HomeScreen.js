//#region Imports
import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import useSkateParksQuery from "../services/useSkateParksQuery";
import DetailScreen from "./DetailScreen";
import { ErrorMessage } from "../components/shared/errorMessage";
import { useUserLocation } from "../services/useUserLocation";
//#endregion

const HomeScreen = () => {
  //#region UseState/WebserviceData
  const { data, isLoading, error, refresh } = useSkateParksQuery();
  const [selectedId, setSelectedId] = useState(null);
  const { location } = useUserLocation();
  //#endregion

  //#region CSS
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    map: {
      width: "100%",
      height: "100%",
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

  //#region Pin Selection
  if (selectedId) {
    return <DetailScreen id={selectedId} onBack={() => setSelectedId(null)} />;
  }
  //#endregion

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        region={{
          latitude: 52.1326,
          longitude: 5.2913,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
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
            onPress={() => setSelectedId(markerItem.id)}
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
