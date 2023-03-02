import React, { createContext, useState, useEffect } from "react";

const DetailsContext = createContext({});
const { Provider, Consumer } = DetailsContext;

const fetchProductDetails = (config, category) => {
  const {
    apiKey,
    getTag,
    putTag,
    correlationKey,
    postData,
    updateProductDetails,
    setloading,
    version
  } = config;
  if (Object.keys(postData).length != 0 && apiKey != null) {
    setloading(true);
    let payload = {};
    let headers = {};
    if (version == "v2") {
      payload.correlation_id = correlationKey;
      payload.input = {
        ...postData
      }
    } else {
      payload = {
        correlation_key: correlationKey,
        ...postData,
      }
    }
    if (version == "v2") {
      headers = { "Content-Type": "application/json", "Authorization": apiKey }
    } else {
      headers = { "Content-Type": "application/json", "x-api-key": apiKey }
    }
    fetch(category == "image_guidelines" ? putTag : getTag, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    })
      .then((data) => data.json())
      .then((response) => {
        response.image_url = postData.image_url;
        if (
          (response.status && response.status.toLowerCase() !== "success") ||
          response?.message === "Internal Server Error"
        ) {
          setloading(false);
          response.responseSuccess = false;
          updateProductDetails(response);
        } else {
          response.responseSuccess = true;
          setloading(false);
          if (
            category == "image_guidelines" &&
            putTag?.includes("image_guidelines")
          ) {
            updateProductDetails(response);
          } else if (category != "image_guidelines" && getTag.includes("tag")) {
            updateProductDetails(response);
          } else {
            if (category == "image_guidelines" && response.data == undefined) {
              config.postData = {
                mad_id: response.mad_id,
                image_url: postData.image_url,
              };
              config.putTag = getTag;
              fetchProductDetails(config, category);
            } else {
              setloading(false);
              updateProductDetails(response);
            }
          }
        }
      })
      .catch((err) => {
        setloading(false);
        let response = {};
        response.image_url = postData.image_url;
        response.responseSuccess = false;
        updateProductDetails(response);
      });
  }
};

const DetailsContainer = (props) => {
  const { children, config, category, defaultResponse } = props;

  const [ProductDetails, updateProductDetails] = useState(defaultResponse);

  const { postData, apiKey } = config;

  config.updateProductDetails = updateProductDetails;

  useEffect(() => {
    fetchProductDetails(config, category);
  }, [postData, apiKey]);

  useEffect(() => {
    updateProductDetails(defaultResponse);
  }, [defaultResponse]);

  return <Provider value={ProductDetails}>{children}</Provider>;
};

export { DetailsContext, DetailsContainer, Consumer as DetailsConsumer };
