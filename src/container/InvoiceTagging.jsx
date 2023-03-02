import React, { createContext, useState, useEffect } from "react";

const InvoiceTaggingContext = createContext({});
const { Provider, Consumer } = InvoiceTaggingContext;

const fetchProductDetails = (config, category) => {
  const {
    apiKey,
    getTag,
    putTag,
    correlationKey,
    postData,
    updateProductDetails,
    setloading,
  } = config;
  if (getTag != null && apiKey != null) {
    setloading(true);
    fetch(getTag, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((response) => {
        if (postData) {
          
          response.image_url = postData.image_url;
        }
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
          updateProductDetails(response);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        let response = {};
        response.image_url = postData.image_url;
        response.responseSuccess = false;
        updateProductDetails(response);
      });
  }
};

const InvoiceTaggingContainer = (props) => {
  const { children, config, category, defaultResponse } = props;

  const [ProductDetails, updateProductDetails] = useState(defaultResponse);

  const { postData, apiKey, getTag } = config;

  config.updateProductDetails = updateProductDetails;

  useEffect(() => {
    fetchProductDetails(config, category);
  }, [postData, apiKey, getTag]);

  useEffect(() => {
    updateProductDetails(defaultResponse);
  }, [defaultResponse]);

  return <Provider value={ProductDetails}>{children}</Provider>;
};

export { InvoiceTaggingContext, InvoiceTaggingContainer, Consumer as InvoiceTaggingConsumer };
