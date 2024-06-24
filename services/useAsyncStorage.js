//#region imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
//#endregion imports

const useAsyncStorage = (key, defaultValue) => {
  //#region UseState
  const [value, setValue] = useState(defaultValue);
  //#endregion

  //#region GET function
  //Gets all the Json Data from the Local storage
  const get = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem(key);
      if (!jsonValue) {
        setValue(defaultValue);
        return defaultValue;
      }
      jsonValue = JSON.parse(jsonValue);
      setValue(jsonValue);

      return jsonValue;
    } catch (error) {
      console.log(`Error getting key ${key}`);
      setValue(defaultValue);
      return defaultValue;
    }
  };
  //#endregion

  //#region SET function
  //Posts all the Js Data To the Local storage
  const set = async (data) => {
    try {
      setValue(data);
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(`Error setting key ${key}`);
    }
  };
  //#endregion

  //#region UseEffect
  useEffect(() => {
    get();
  }, []);
  //#endregion

  return { get, set, value };
};

export default useAsyncStorage;
