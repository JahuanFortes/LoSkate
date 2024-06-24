//#region Imports
import { useState, useEffect } from "react";
import { API_URL } from "../constants/api_config";
//#endregion

const useSkateParksQuery = () => {
  //#region UseState
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  //#endregion

  //#region GetData
  const getData = async () => {
    setError(null);
    setData(null);
    setIsLoading(true);
    //#endregion

    //#region Fetch
    try {
      const response = await fetch(API_URL, {
        //is default
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      //#endregion

      //#region Check for Get
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.log("error in fetch", error);
        setError("big nono happin her");
      }
    } catch (error) {
      console.log("error in fetch", error);
      setError("big nono happin her");
    }

    setIsLoading(false);
  };
  //#endregion

  //#region UseEffect
  useEffect(() => {
    getData();
  }, []);
  //#endregion

  //#region Return Data
  return {
    isLoading,
    data,
    error,
    refresh: getData, //checks values got changed
  };
  //#endregion
};

export default useSkateParksQuery;
