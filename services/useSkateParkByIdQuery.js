//#region imports
import { useState, useEffect } from "react";
import { API_URL } from "../constants/api_config";
//#endregion imports

const useSkateParkByIdQuery = (id) => {
  //#region UseState
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //#endregion

  //#region GetData
  const getData = async () => {
    setError(null);
    setData(null);
    setIsLoading(true);
    //#endregion

    //#region Get_Fetch
    try {
      const response = await fetch(API_URL, {
        //is default
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      //#endregion

      //#region Get Id from 0 > 14 And checks for Errors
      if (response.ok) {
        const data = await response.json();

        //filter skatepark
        const skatePark = data.filter((sp) => sp.id == id);

        if (skatePark.length > 0) {
          setData(skatePark[0]);
        } else {
          console.log("error in fetch no id found");
          setError("big nono happin her");
        }
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
  }, [id]); //filter on id
  //#endregion

  //#region Return data
  return {
    isLoading,
    data,
    error,
    refresh: getData,
  };
  //#endregion
};

export default useSkateParkByIdQuery;
