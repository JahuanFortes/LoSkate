import { useState, useEffect } from "react";
import API_URL from "./api.js";

async function useFetch() {
  const [error, setError] = useState("");
}

const callApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      setError("Somthing wrong!?");
    }
  } catch (error) {}
};
