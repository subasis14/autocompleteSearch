import { useState } from "react";

export const useFetchInstance = () => {
  const [response, setReponse] = useState({
    data: null,
    error: false,
    loading: false,
  });

  const FetchApi = (url:string) => {
    setReponse({ data: null, error: false, loading: true });
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) =>
          setReponse({ data: data, error: false, loading: false })
        );
    } catch (error) {
      setReponse({ data: null, error: true, loading: false });
    }
  };
  return { ...response, FetchApi };
};
