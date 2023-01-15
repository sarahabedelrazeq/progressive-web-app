import React from "react";
import qs from "qs";

export default function useUrlParams() {
  const [searchParams, setSearchParams] = React.useState({});

  const setSearchParamsFromURL = React.useCallback((locationParams) => {
    const searchParams = locationParams.slice(1);
    if (searchParams) {
      const searchParamsArray = searchParams.split("&");
      let searchParamsObject = {};

      searchParamsArray.forEach((item) => {
        const [name, value] = item.split("=");
        searchParamsObject = {
          ...searchParamsObject,
          [name]: value.split("%2C"),
        };
      });
      if (searchParamsObject) setSearchParams(searchParamsObject);
      else setSearchParams({});
    } else setSearchParams({});
  }, []);

  const setParams = React.useCallback(
    (newParams) => {
      let newurl;
      if (qs.stringify(newParams, { arrayFormat: "comma" }))
        newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          `?${qs.stringify(newParams, { arrayFormat: "comma" })}`;
      else
        newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname;

      window.history.pushState({ path: newurl }, "", newurl);

      setSearchParamsFromURL(window.location.search);
    },
    [setSearchParamsFromURL]
  );

  React.useEffect(() => {
    setSearchParamsFromURL(window.location.search);
  }, [setSearchParamsFromURL]);
  return {
    params: searchParams,
    setParams,
  };
}
