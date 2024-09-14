import { useEffect, useCallback } from "react";
import { useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Something went wrong...");
  }
  return responseData;
}

export default function useFetch(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialValue);
  }

  const sendRequest = useCallback(async function sendRequest(bodyData) {
    setIsFetching(true);
    try {
      const responseData = await sendHttpRequest(url, {
        ...config,
        body: JSON.stringify(bodyData),
      });
      setData(responseData);
    } catch (error) {
      setError(error);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (!config || config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, error, isFetching, sendRequest, clearData };
}
