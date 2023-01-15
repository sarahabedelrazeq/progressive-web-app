import React from "react";
import { useFetch } from "hooks";
import { useParams } from "react-router-dom";
import useFilter from "hooks/useFilter";
import QueryString from "qs";

function withContainer(Component) {
  return (props) => {
    const [page, setPage] = React.useState(1);
    const { collection_name } = useParams();
    const [params, addFilter, clearFilter] = useFilter();
    const [collectionResponse, collectionRequest] = useFetch(
      `/collections/${collection_name}/glasses`
    );
    const [glasses, setGlasses] = React.useState([]);

    const onPageView = React.useCallback(
      (viewPage) => {
        if (
          viewPage === page &&
          glasses.length > 0 &&
          glasses[glasses.length - 1].items.length === 12
        ) {
          setPage((prev) => prev + 1);
        }
      },
      [page, glasses]
    );

    const getCollection = React.useCallback(
      async (page, params) => {
        let queryString = {
          sort: { type: "collection_relations_position", order: "asc" },
          filters: {
            lens_variant_prescriptions: ["fashion"],
            lens_variant_types: ["classic"],
            frame_variant_home_trial_available: false,
            glass_variant_frame_variant_colour_tag_configuration_names:
              params?.colour && params.colour.length > 0 ? params.colour : [],
            glass_variant_frame_variant_frame_tag_configuration_names:
              params?.shape && params.shape.length > 0 ? params.shape : [],
          },
          page: { limit: 12, number: page },
        };

        const responseData = await collectionRequest(
          {},
          `?${QueryString.stringify(queryString, {
            encodeValuesOnly: true,
            arrayFormat: "brackets",
          })}`
        );

        if (responseData?.glasses) {
          if (page === 1) setGlasses([{ page, items: responseData?.glasses }]);
          else
            setGlasses((prev) => [
              ...prev,
              {
                page,
                items: responseData?.glasses,
              },
            ]);
        }
      },
      [collectionRequest]
    );

    React.useEffect(() => {
      getCollection(1, params);
      setPage(1);
    }, [collection_name, params, getCollection]);

    React.useEffect(() => {
      const lastPage = glasses[glasses.length - 1];
      if (page !== 1 && lastPage && page === lastPage.page + 1)
        getCollection(page, params);
    }, [page, params, glasses, getCollection]);

    return (
      <Component
        glasses={{
          items: glasses,
          totalCount: collectionResponse.result?.meta?.total_count,
        }}
        clearFilter={clearFilter}
        onPageView={onPageView}
        params={params}
        addFilter={addFilter}
        collectionName={collection_name?.split("-").join(" ").split("_").join(" ").split(".").join(" ")}
        {...props}
      />
    );
  };
}

export default withContainer;
