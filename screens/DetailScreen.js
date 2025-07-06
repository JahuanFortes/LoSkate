//#region imports
import { Text, View, StyleSheet, Image, Button } from "react-native";
import useSkateParkByIdQuery from "../services/useSkateParkByIdQuery";
import { ErrorMessage } from "../components/shared/errorMessage";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { useUserLocation } from "../services/useUserLocation";
import placeholder from "../assets/cat.png";
import useAsyncStorage from "../services/useAsyncStorage";
import { useTheme } from "../providers/ThemeProvider";

//#endregion imports

const DetailScreen = ({ route, navigation }) => {
  const { isDarkMode } = useTheme();

  const { id } = route?.params;

  //#region CSS
  const styles = StyleSheet.create({
    background: {
      height: "100%",
      backgroundColor: isDarkMode ? "#222222" : "white",
    },
    container: {
      flex: 1,
      alignItems: "center",
      paddingBottom: "55%",
      backgroundColor: isDarkMode ? "#222222" : "white",
    },
    map: {
      width: "100%",
      height: "60%",
    },
    image: {
      objectFit: "cover",
      width: 120,
      height: 100,
    },
    text: {
      color: isDarkMode ? "white" : "black",
    },
    header: {
      backgroundColor: isDarkMode ? "#B55555" : "#D9D9D9",
    },
  });
  //#endregion

  //#region Data/UseState/Favorites
  const { data, isLoading, error, refresh } = useSkateParkByIdQuery(id);
  const { location } = useUserLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const { get: getFavorites, set: setFavorites } = useAsyncStorage(
    //changes get/set name
    "favorites",
    []
  );
  //#endregion

  //#region UseEffect
  useEffect(() => {
    const checkFavorite = async () => {
      //checks if id is in the favorites arr
      const favorites = await getFavorites();
      setIsFavorite(favorites.includes(id));
    };
    checkFavorite();
  }, []);
  //#endregion

  //#region ErrorHandeling
  if (!id) {
    //checks if there is an ID
    return null;
  }

  if (!data || error) {
    //checks if there is an ID
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

  //#region Favorite create
  const makeFavorite = async () => {
    const favorites = await getFavorites();
    setFavorites([...favorites, data.id]);
    setIsFavorite(true);
  };
  //#endregion

  //#region Favorite Delete
  const removeFavorite = async () => {
    const favorites = await getFavorites();
    setFavorites(favorites.filter((fav) => fav !== id));
    setIsFavorite(false);
  };
  //#endregion

  return (
    <View style={styles.background}>
      {/* Map Detail page Start */}
      <MapView
        style={styles.map}
        region={{
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
      >
        <Marker
          coordinate={{
            latitude: data.latitude,
            longitude: data.longitude,
          }}
          title={data.title}
          description={data.description}
        />
        {/* Map Detail page end */}

        {/* Your Location Detail page end */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="#00ff00"
          />
        )}
        {/* Your location Detail page end */}
      </MapView>

      {/* Detail Text area Start*/}
      <View style={styles.container}>
        <Text style={styles.text}>{data.title}</Text>

        <Image source={placeholder} style={styles.image} />

        <Text style={styles.text}>{data.description}</Text>

        <Button
          onPress={isFavorite ? removeFavorite : makeFavorite}
          title={isFavorite ? "Remove from Favorite" : "Add to Favorite"} //if already fav btn = remove fav; else = add fav
        />
        <Button onPress={navigation.goBack} title="Back" />
      </View>
      {/* Detail Text area End*/}
    </View>
  );
};

export default DetailScreen;
