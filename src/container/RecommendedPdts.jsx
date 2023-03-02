import React, { createContext, useState, useMemo, useEffect } from "react";
import { ConfigConsumer } from "./Config";
import { isEmpty } from "../common";

const RecommendedPdtsContext = createContext({});
const { Consumer, Provider } = RecommendedPdtsContext;

const fetchRecommendedProducts = (
  updateRecommendedPdts,
  recommendedWidgetList,
  fallBack,
  appConfig,
  force_debug
) => {
  const {
    postBody,
    widgetList,
    recommendationUrl,
    configName,
  } = recommendedWidgetList;
  if (recommendationUrl && widgetList && postBody) {
    let updatedRecommendedObj = { loading: false };
    /**
     * Updates data
     */
    const updateDataInState = () => {
      updateRecommendedPdts((prevRecommendedObj) => ({
        ...prevRecommendedObj,
        ...updatedRecommendedObj,
      }));
    };

    /**
     * Fetches a data.
     *
     * @param      {<type>}    formattedPostBody  The formatted post body
     * @param      {Function}  callback           The callback
     */
    const fetchData = (reqObj, callback) => {
      let status = "";
      fetch(recommendationUrl, reqObj)
        .then((data) => {
          status = data.status;
          return data.json();
        })
        .then((response) => {
          // 2×× Success
          if (
            status >= 200 &&
            status < 300 &&
            (response.data || response.results)
          ) {
            callback(null, response);
          } else {
            callback(response.message);
          }
        })
        .catch((err) => callback(err));
    };

    /**
     * { function_description }
     *
     * @param      {<type>}  formattedPostBody  The formatted post body
     */
    const handleManyToOneWidgetRequest = (requestPayload) => {
      if (appConfig.config.cardType == "video") {
        let postData = {
          ...postBody,
          force: true,
          is_from_demo_site: true,
          details: true,
          num_results: [20],
        };
        fetchData(
          {
            method: "POST",
            body: JSON.stringify(postData),
            headers: { "Content-Type": "application/json" },
          },
          (err, response) => {
            if (err) {
              console.error(err);
              updatedRecommendedObj = {
                ...updatedRecommendedObj,
                loading: false,
              };
            } else {
              const { data, results } = response;
              if (data && data.length && Array.isArray(data)) {
                data.forEach((item, key) => {
                  if (item && item.length && widgetList[key]) {
                    updatedRecommendedObj[widgetList[key]] = [...item];
                  }
                });
              } else if (results) {
                updatedRecommendedObj[recommendedWidgetList.widgetList] =
                  response.results;
              } else {
                updatedRecommendedObj[widgetList] = data;
              }
            }
            updateDataInState();
          }
        );
      } else {
        fetchData(
          {
            method: "POST",
            body: requestPayload,
            ...(recommendedWidgetList.vueX
              ? {
                headers: {
                  "Content-Type":
                    recommendedWidgetList.contentType ||
                    "application/x-www-form-urlencoded",
                  "x-api-key": appConfig.api_key,
                },
              }
              : {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }),
          },
          (err, response) => {
            if (err) {
              if (
                recommendedWidgetList.widgetList[0] == "user_session" ||
                recommendedWidgetList.widgetList[0] == "per_session" ||
                recommendedWidgetList.widgetList[0] == "price_by_event"
              ) {
                updatedRecommendedObj[recommendedWidgetList.widgetList[0]] = {};
              }
              updatedRecommendedObj = {
                ...updatedRecommendedObj,
                loading: false,
              };
            } else {
              const { data, results } = response;
              if (data && data.length && Array.isArray(data)) {
                data.forEach((item, key) => {
                  if (item && item.length && widgetList[key]) {
                    updatedRecommendedObj[widgetList[key]] = [...item];
                  }
                });
              } else if (results) {
                updatedRecommendedObj[recommendedWidgetList.widgetList] =
                  response.results;
              } else {
                updatedRecommendedObj[widgetList] = data;
              }
            }
            updateDataInState();
          }
        );
      }
    };

    if (isEmpty(configName)) {
      updateRecommendedPdts({ loading: true });
      handleManyToOneWidgetRequest(postBody);
    } else {
      const config = appConfig[configName || "discover"] || {};
      const isVueX = config.vueX || false;
      const widgetPayload = (config.widgetPayload &&
        config.widgetPayload[isVueX ? "vueX" : "vueApp"]) || { ...fallBack };

      /**
       * Handles the multi widgets in de-coupled way
       */
      const handleOneToManyWidgetsRequest = () => {
        let index = 0;
        let widgets = [];
        let payload = { ...postBody };
        if (payload.widget_list && payload.widget_list.length > 0) {
          widgets = payload.widget_list;
          delete payload.widget_list;
        }
        const totalIteration = widgets.length;
        const startLoop = () => {
          if (index < totalIteration) {
            const currentWidget = widgets[index];
            const keyName = widgetList[index];
            if (isEmpty(currentWidget)) {
              handleManyToOneWidgetRequest(postBody);
            } else {
              const widgetFields = widgetPayload[`widget${keyName}`] || {};
              try {
                Object.keys(widgetFields).forEach((key) => {
                  payload[key] = widgetFields[key];
                });
              } catch (err) {
                console.error(
                  "Error in accessing widget fields from config",
                  err
                );
              }
              if (Object.keys(widgetFields).length > 0) {
                fetchData(
                  {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                      "x-api-key": appConfig.API_KEY,
                      "Content-Type": "application/json",
                    },
                  },
                  (err, response) => {
                    if (err) {
                      console.error(err);
                    } else {
                      if (response) {
                        const { data } = response;
                        let dataRef = data ? data[0] || {} : {};
                        if (
                          parseInt(keyName, 10) === 9 &&
                          dataRef &&
                          dataRef.tiles
                        ) {
                          const autoThemeSelection =
                            appConfig.productDetails.widgetPayload.vueX
                              .autoThemeSelection;
                          if (autoThemeSelection) {
                            const newData = [];
                            dataRef.data.forEach((el) => {
                              const newObject = new Object();
                              const bundlingType = el.bundling_type;
                              newObject[bundlingType] = el.data;
                              newData.push(newObject);
                            });
                            data[0].data = newData;
                          } else {
                            const tilesRef = {};
                            let consolidatedData = [];
                            const formattedTiles = {};
                            const formattedResults = [];
                            if (dataRef.data && dataRef.data.length > 0) {
                              dataRef.data.forEach((set, index) => {
                                set.forEach((obj) => {
                                  obj.internalIndex = index;
                                });
                                consolidatedData = consolidatedData.concat(set);
                              });
                            }
                            const groupBy = (objectArray, property) => {
                              const temp = objectArray.reduce((acc, obj) => {
                                const key = obj[property];
                                if (!acc[key]) {
                                  acc[key] = [];
                                }
                                // Add object to list for given key's value
                                acc[key].push(obj);
                                return acc;
                              }, {});
                              const result = [];
                              Object.keys(temp).forEach((key) => {
                                result.push(temp[key]);
                              });
                              return result;
                            };
                            dataRef.tiles.forEach((tile, index) => {
                              const bundlingType = tile.bundling_type;
                              if (!tilesRef[bundlingType]) {
                                tilesRef[bundlingType] = [];
                              }
                              formattedTiles[bundlingType] = tile;
                              tilesRef[bundlingType].push(
                                consolidatedData[index]
                              );
                            });
                            Object.keys(formattedTiles).forEach((tileName) => {
                              formattedResults.push({
                                bundling_type: tileName,
                                [tileName]: groupBy(
                                  tilesRef[tileName],
                                  "internalIndex"
                                ),
                              });
                            });
                            data[0].data = formattedResults;
                          }
                        }
                        updatedRecommendedObj[keyName] = data[0].data || [];
                      }
                    }
                    index += 1;
                    updateDataInState();
                    startLoop();
                  }
                );
              }
            }
          }
        };
        startLoop();
      };

      updateRecommendedPdts({ loading: true });
      if (isVueX) {
        handleOneToManyWidgetsRequest();
      } else {
        // Handling normal work-flow
        const params =
          configName === "discover"
            ? widgetPayload.widgetList
            : widgetPayload[`widget${widgetList[0]}`];
        if (params) {
          const paramNames = Object.keys(params);
          let payload = `force_debug=${force_debug}`;
          payload = new URLSearchParams(payload);
          Object.keys(postBody).forEach((key) => {
            if (!paramNames.includes(key)) {
              payload.append(key, postBody[key]);
            }
          });
          payload.delete("widget_list");
          paramNames.forEach((field) => {
            if (field === "fields" || field === "widget_list") {
              payload.append(
                field,
                `[${params[field].map((key) => `"${key}"`)}]`
              );
            } else if (field === "occasions") {
              const occasions = JSON.parse(postBody[field]);
              if (occasions.length > 0) {
                payload.append(
                  field,
                  `[${occasions.map((key) => `"${key}"`)}]`
                );
              } else {
                payload.append(
                  field,
                  `[${params[field].map((key) => `"${key}"`)}]`
                );
              }
            } else {
              payload.append(field, params[field]);
            }
          });
          handleManyToOneWidgetRequest(payload.toString());
        }
      }
    }
  }
};

const RecommendedPdtsContainer = (props) => {
  const { children, recommendedWidgetList, fallBack, force_debug } = props;
  const appConfig = JSON.parse(localStorage.userConfig);
  const [ProductRecommendation, updateProductRecommendation] = useState({
    loading: true,
  });
  useEffect(() => {
    if (Object.keys(recommendedWidgetList).length > 0) {
      fetchRecommendedProducts(
        updateProductRecommendation,
        recommendedWidgetList,
        fallBack,
        appConfig,
        force_debug
      );
    } else return;
  }, [recommendedWidgetList]);

  return (
    <ConfigConsumer>
      {(context) => {
        context.updateProductRecommendation = updateProductRecommendation;
        Object.assign(ProductRecommendation, context);
        return <Provider value={ProductRecommendation}>{children}</Provider>;
      }}
    </ConfigConsumer>
  );
};

export {
  RecommendedPdtsContainer,
  RecommendedPdtsContainer as default,
  Consumer as RecommendedPdtsConsumer,
};
