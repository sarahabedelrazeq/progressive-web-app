import React from "react";
import useUrlParams from "./useUrlParams";

export default function useFilter() {
  const { params, setParams } = useUrlParams();

  const addFilter = React.useCallback(
    (key, value) => {
      const newParams = params;
      if (newParams[key] && newParams[key].length > 0) {
        if (newParams[key].includes(value)) {
          newParams[key] = newParams[key].filter((item) => item !== value);
        } else newParams[key] = [...newParams[key], value];
      } else newParams[key] = [value];

      setParams(newParams);
    },
    [params, setParams]
  );
  const clearFilter = React.useCallback(() => {
    setParams({});
  }, [setParams]);

  return [params, addFilter, clearFilter];
}
