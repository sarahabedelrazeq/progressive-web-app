import React from "react";
import axios from "axios";
import { API_URL } from "constants";

export default function useFetch(endpoint, method = "GET") {
  const [loading, toggleLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  const request = React.useCallback(
    async (body, params, onSuccess, onError) => {
      setResult([]);
      toggleLoading(true);
      try {
        const response = await axios.request({
          method,
          baseURL: API_URL,
          url: `${endpoint}${params ? params : ""}`,
          headers: {
            "Content-Type": "application/json",
          },
          ...(method === "POST" &&
            body && {
              data: body,
            }),
        });
        setResult(response.data);
        if (response.data.data && onSuccess) {
          return onSuccess(response.data);
        }
        if (onError) {
          onError(response.data.error);
        }
        return response.data;
      } catch (error) {
        setErrors(error.message);
        if (onError) {
          onError();
        }
      } finally {
        toggleLoading(false);
      }
    },
    [endpoint, method, toggleLoading]
  );

  return [{ loading, result, errors }, request];
}
