//#region CSS
import * as Location from "expo-location";
import { useState, useEffect } from "react";
//#endregion

export const useUserLocation = () => {
  //#region UseState
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //#endregion

  //#region UseEffect
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  //#endregion

  return { location, errorMsg };
};
