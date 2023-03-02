import React, { useState, useEffect, createContext } from "react";
import { ConfigConsumer } from "./Config";

const PdtDetailsContext = createContext([]);
const { Provider, Consumer } = PdtDetailsContext;

const fetchProductInfo = (
  pdtDetailsData,
  updatePdtEvent,
  pdtId,
  force_debug,
  appConfig,
  updateProductRecommendation,
  isAffinityDataEmpty,
  updateIsAffinityDataEmpty
) => {
  if (pdtId) {
    const productDetailsConfig = appConfig.productDetails || {};
    const API_KEY = productDetailsConfig.API_KEY || appConfig.API_KEY;
    let headers = { "Content-type": "application/x-www-form-urlencoded" };
    const endPoint = productDetailsConfig.endPoint || appConfig.url;
    const discoverPageUrl = productDetailsConfig.productInfo || appConfig.url;

    const isVueX = productDetailsConfig.vueX || false;
    const getProductMeta = productDetailsConfig.getProductMeta || {};
    const reqConfig = getProductMeta[isVueX ? "vueX" : "vueApp"] || {};

    if (isVueX) {
      if (productDetailsConfig.VUEX_API_KEY) {
        API_KEY = productDetailsConfig.VUEX_API_KEY;
      }
    } else {
      if (productDetailsConfig.API_KEY) {
        API_KEY = productDetailsConfig.API_KEY;
      }
    }

    let reqPayLoad = {};
    let constructedURL = `${endPoint}${discoverPageUrl}`;
    const payLoad = reqConfig.payload || {};
    if (isVueX) {
      // Request url's from config
      constructedURL = reqConfig.url || constructedURL;
      headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
      Object.keys(payLoad).forEach((key) => {
        reqPayLoad[key] = payLoad[key];
      });
      if (
        appConfig &&
        appConfig.config &&
        appConfig.config.cardType == "video"
      ) {
        reqPayLoad = JSON.stringify({ api_key: API_KEY, product_id: pdtId });
      } else {
        reqPayLoad = JSON.stringify({
          ...reqPayLoad,
          api_key: productDetailsConfig.VUEX_API_KEY,
          product_ids: [pdtId],
        });
      }
    } else {
      if (appConfig.client_name === "2321_grocery-demo") {
        // change this to config
        reqPayLoad = `api_key=${API_KEY}&product_id=${pdtId}&get_tags=true&fields=["flav","category","brand","type","mode_name","orga","gour","diet_pref","cont_type","qty","pack_of","maxi_life","form","ingre"]&details=true&is_from_demo_site=true&force_debug=true`;
      } else {
        constructedURL = reqConfig.url || constructedURL;
        reqPayLoad = `api_key=${API_KEY}&product_id=${pdtId}`;
        reqPayLoad = new URLSearchParams(reqPayLoad);
        Object.keys(payLoad).forEach((key) => {
          if (key === "fields") {
            reqPayLoad.append(
              key,
              `[${payLoad[key].map((value) => `"${value}"`)}]`
            );
          } else {
            reqPayLoad.append(key, payLoad[key]);
          }
        });
        reqPayLoad = reqPayLoad.toString();
      }
    }
    const makeAffinityCall = (response) => {
      let ontology =
        appConfig.vue_user.relativeAffinityOntologyKey &&
          response[0][appConfig.vue_user.relativeAffinityOntologyKey]
          ? response[0][appConfig.vue_user.relativeAffinityOntologyKey]
          : response[0]?.ontology || response[0]?.msd_ontology;

      const filters = [];

      if (
        appConfig.vue_user?.fieldToFilterRelativeAffinity &&
        appConfig.vue_user?.fieldToFilterRelativeAffinity.length
      ) {
        const filteredArray = Object.keys(response[0]).filter((value) =>
          appConfig.vue_user?.fieldToFilterRelativeAffinity.includes(value)
        );
        filteredArray.map((value) => {
          if (value && value != "") {
            filters.push({
              field: value,
              type: "exact",
              value: response[0][value],
            });
          }
        });
      }
      headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      };
      reqPayLoad = JSON.stringify({
        api_key: appConfig.API_KEY,
        mad_uuid: appConfig.mad_UUID,
        user_id: appConfig.user_id,
        ontology: ontology || "",
        filters: filters,
        ...appConfig.vue_user?.relativeAffinityPayload,
      });
      fetch(
        appConfig?.vue_user?.userRelativeAffinityUrl ||
        "https://robin-api-dev.madstreetden.com/dev/es/user_profile/relative_affinity",
        {
          headers,
          method: "POST",
          body: reqPayLoad,
        }
      )
        .then((data) => {
          reqStatus = data.status;
          return data.json();
        })
        .then((response) => {
          if (response.data == {} || !Object.keys(response.data).length)
            updateIsAffinityDataEmpty(true);
          if (response.data && updateProductRecommendation) {
            let relativeAffinityObject = {
              relative_affinity: response.data,
            };
            updateProductRecommendation((prevRecommendedObj) => ({
              ...prevRecommendedObj,
              ...relativeAffinityObject,
            }));
          }
        });
      reqPayLoad = JSON.stringify({
        api_key: appConfig.API_KEY,
        mad_uuid: appConfig.mad_UUID,
        user_id: appConfig.user_id,
        ontology: ontology || "",
        filters: filters,
        ...appConfig.vue_user?.absoluteAffinityPayload,
      });
      fetch(
        appConfig?.vue_user?.userAbsoluteAffinityUrl ||
        "https://robin-api-dev.madstreetden.com/dev/es/user_profile/absolute_affinity",
        {
          headers,
          method: "POST",
          body: reqPayLoad,
        }
      )
        .then((data) => {
          reqStatus = data.status;
          return data.json();
        })
        .then((response) => {
          if (response.data && updateProductRecommendation) {
            let absoluteAffinityObject = {
              absolute_affinity: response.data,
            };
            updateProductRecommendation((prevRecommendedObj) => ({
              ...prevRecommendedObj,
              ...absoluteAffinityObject,
            }));
          }
        });
    };
    if (isAffinityDataEmpty) {
      makeAffinityCall(pdtDetailsData);
    }

    let reqStatus = "";
    if (constructedURL && API_KEY && !isAffinityDataEmpty) {
      fetch(constructedURL, {
        headers,
        method: "POST",
        body: reqPayLoad,
      })
        .then((data) => {
          reqStatus = data.status;
          return data.json();
        })
        .then((response) => {
          if (
            reqStatus >= 200 &&
            reqStatus < 300 &&
            response.data &&
            response.data.length
          ) {
            updatePdtEvent(response.data);
            makeAffinityCall(response.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }
};

const ProductDetailsContainer = (props) => {
  const {
    children,
    productId,
    force_debug,
    updateProductRecommendation,
  } = props;
  const [pdtDetailsData, updatepdtDetailsData] = useState([]);
  const [config, updateConfig] = useState([]);
  const [isAffinityDataEmpty, updateIsAffinityDataEmpty] = useState(false);

  useEffect(
    () => {
      fetchProductInfo(
        pdtDetailsData,
        updatepdtDetailsData,
        productId,
        force_debug,
        config,
        updateProductRecommendation,
        isAffinityDataEmpty,
        updateIsAffinityDataEmpty
      )
    },
    [productId, force_debug, config, isAffinityDataEmpty]
  );

  useEffect(() => {
    fetchProductInfo(
      pdtDetailsData,
      updatepdtDetailsData,
      productId,
      force_debug,
      config,
      updateProductRecommendation,
      isAffinityDataEmpty,
      updateIsAffinityDataEmpty
    )
    updateIsAffinityDataEmpty(false)
  }, [productId]);

  return (
    <ConfigConsumer>
      {(context) => {
        updateConfig(context);
        return <Provider value={pdtDetailsData}>{children}</Provider>;
      }}
    </ConfigConsumer>
  );
};

export { ProductDetailsContainer, Consumer as ProductDetailsConsumer };
