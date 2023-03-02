import React, { createContext, useState, useMemo, useEffect, useRef } from "react";
import { Mask } from "../component/molecule/Mask";
const _ = require('lodash'); 

const CategoryPdtsContext = createContext({});
const { Consumer, Provider } = CategoryPdtsContext;

const fetchCategoryProducts = (updateCategoryPdts, APIData, appConfig, currPage, isDuplicate, setApiFetch, apiFetch, updateLoading) => {
  if (isDuplicate) return
  if (APIData) {
    const { postBody, url, vueX } = APIData;

    if(!(_.isEqual(apiFetch, APIData.postBody))){
      updateLoading(true)
    }

    if (currPage == 'category') {
      if (url && postBody && postBody.facet_filters && Object.keys(postBody.facet_filters).length > 0) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            ...(vueX ? {"x-api-key": postBody.api_key} : '')
          },
          body: JSON.stringify(postBody),
        })
          .then((data) => data.json())
          .then((resp) => {
            updateLoading(false);
            setApiFetch(APIData.postBody);
            if (resp && resp.status && resp.status.toLowerCase() === "success" || "ok") {
              vueX ? updateCategoryPdts({ ...resp.data[0] }) : updateCategoryPdts({ ...resp });
            } else {
              updateCategoryPdts({ status: "failure" });
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          ...(vueX ? {"x-api-key": postBody.api_key} : '')
        },
        body: JSON.stringify(postBody),
      })
      .then((data) => data.json())
      .then((resp) => {
        updateLoading(false)
        setApiFetch(APIData.postBody);
        if (resp && resp.status && resp.status.toLowerCase() === "success" || "ok") {
          vueX ? updateCategoryPdts({ ...resp.data[0] }) : updateCategoryPdts({ ...resp });
        } else {
          updateCategoryPdts({ status: "failure" });
        }
      })
      .catch((err) => console.log(err));
    }
  } else {
    updateCategoryPdts({});
  }
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CategoryPdtsContainer = ({ children, APIData, currPage, updateLoading }) => {
  let isDuplicate = false;
  const [ProductRecommendation, updateProductRecommendation] = useState({});
  const [apiFetch, setApiFetch] = useState('');
  let { postBody } = APIData;
  const appConfig = JSON.parse(localStorage.userConfig);
  Object.assign(postBody, {mad_uuid: localStorage.getItem('mad_UUID')})
  const previousAPIData = usePrevious(APIData);
  const facetFilterKeyMapping = appConfig.vue_find.children.category_list.facetFilterKeyMapping 
    && appConfig.vue_find.children.category_list.facetFilterKeyMapping;
  if (facetFilterKeyMapping && Object.keys(facetFilterKeyMapping).length > 0 && currPage == 'category') {
    const facetFilter = Object.keys(postBody.facet_filters);
    Object.keys(facetFilterKeyMapping).forEach(key => {
      if(facetFilter.includes(key)) {
        let newFacetFilters = new Object();
        let newKey = facetFilterKeyMapping[key];
        newFacetFilters[newKey] = postBody.facet_filters[key];
        Object.assign(postBody.facet_filters, newFacetFilters);
        delete postBody.facet_filters[key];
      }
    })
  }
  if (previousAPIData && APIData) {
    if (_.isEqual(previousAPIData, APIData)) {
      isDuplicate = true;
    }
  }

  useMemo(() => fetchCategoryProducts(updateProductRecommendation, APIData, appConfig, currPage, isDuplicate, setApiFetch, apiFetch, updateLoading), [
    APIData,
  ]);
  useEffect(() => updateProductRecommendation({}), [currPage]);

  return <Provider value={ProductRecommendation}>{children}</Provider>
};

export {
  CategoryPdtsContainer,
  CategoryPdtsContainer as default,
  Consumer as CategoryPdtsConsumer,
};