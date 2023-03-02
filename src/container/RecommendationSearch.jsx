import React, { useState, useEffect, createContext } from "react";
import { ConfigConsumer } from "./Config";

const RecommendationSearchContext = createContext({});
const { Provider, Consumer } = RecommendationSearchContext;

const fetchRecommendationSearchProducts = (
  updateSearchEvent,
  madId,
  gender,
  config,
  debug
) => {
  const { url } = config;
  const image_search =
    config.vue_find &&
    config.vue_find.children &&
    config.vue_find.children.image_search
      ? config.vue_find.children.image_search
      : {};
  let API_KEY = config.API_KEY;
  if (madId && gender && image_search) {
    let search_endpoint = image_search["search_endpoint"]
      ? image_search["search_endpoint"]
      : url + "/search";
    if (image_search.API_KEY) {
      API_KEY = image_search.API_KEY;
    }

    if (search_endpoint) {
      fetch(search_endpoint, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        method: "post",
        body: `api_key=${API_KEY}&mad_id=${madId}&details=true&multi_facet=true&num_results=25&filters=[]&ontology=[]&is_from_demo_site=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link", "msd_ontology"]&gender=${gender}&force_debug=${debug}`,
      })
        .then((data) => data.json())
        .then((response) => {
          if (
            response &&
            response.status &&
            response.status.toLowerCase() === "success"
          ) {
            updateSearchEvent(response);
          }
        })
        .catch((err) => console.log(err));
    }
  }
};

const RecommendationSearchContainer = (props) => {
  const { children, madId, gender, debug } = props;
  const [RecommendationSearchResp, updateRecommendationSearchResp] = useState(
    {}
  );
  const [config, updateConfig] = useState({});

  // eslint-disable-next-line
  useEffect(
    () =>
      fetchRecommendationSearchProducts(
        updateRecommendationSearchResp,
        madId,
        gender,
        config,
        debug
      ),
    [madId, gender]
  );

  return (
    <ConfigConsumer>
      {(context) => {
        updateConfig(context);
        return <Provider value={RecommendationSearchResp}>{children}</Provider>;
      }}
    </ConfigConsumer>
  );
};

export {
  RecommendationSearchContainer,
  Consumer as RecommendationSearchConsumer,
};
