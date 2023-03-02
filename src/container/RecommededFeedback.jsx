import React, { createContext, useState, useEffect } from "react";
import { getCookie } from "../common";

const RecommendationFeedbackContext = createContext({});
const { Provider, Consumer } = RecommendationFeedbackContext;

/**
 * 
 * @param {Object} configs 
 * @param {Function} updateFeedbackData 
 * @description Fetch feedback content
 */

const fetchFeedbackData = (configs, updateFeedbackData, setAlertMessage) => {
  const { API_KEY, config } = configs;
  if (config.feedbackContentURL) {
    fetch(config.feedbackContentURL, {
      method: "GET",
      headers: { "x-api-key": API_KEY },
    })
      .then((data) => data.json())
      .then((response) => {
        updateFeedbackData(response.data);
        if (response?.status?.toLowerCase() != "success") {
          setAlertMessage({
            message: "Failed to fetch feedback data",
            status: "ERROR"
          })
          setTimeout(() => {
            setAlertMessage({})
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage({
          message: "Failed to fetch feedback data",
          status: "ERROR"
        })
        setTimeout(() => {
          setAlertMessage({})
        }, 1000);
      });
  }
};

/**
 * 
 * @param {Object} configs
 * @param {Function} updateRecProductsFeedback 
 * @param {Array} recProductIds 
 * @param {String} recName 
 * @param {String} sourceProductId 
 * @param {boolean} allowFeedback 
 * @description Fetch feedbacks for all products in a recommendation widget and store them in recProductsFeedback state
 */

const fetchRecProductsFeedback = (configs, updateRecProductsFeedback, recProductIds, recName, sourceProductId, allowFeedback) => {
  const { API_KEY, config } = configs;
  const mad_UUID = getCookie("mad_UUID");
  let user_id = localStorage.getItem("userId");
  if (!user_id) {
    user_id = configs.user_id;
  }
  if (recProductIds && recName && allowFeedback) {
    fetch(config.feedbackGetURL, {
      method: "POST",
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        "source_product_id": sourceProductId,
        "widget_name": recName,
        "reco_products": recProductIds
      })
    })
      .then((data) => data.json())
      .then((response) => {
        let newRecFeedbacks = {};
        newRecFeedbacks[recName] = response.results;
        updateRecProductsFeedback((previousData) => ({
          ...previousData,
          ...newRecFeedbacks
        }));
      })
      .catch((err) => {
        console.log(err);
      });

  }
}

const RecommendationFeedbackContainer = (props) => {
  const { children, reFetch, config, recProductIds, recName, sourceProductId, allowFeedback, setAlertMessage } = props;
  const [feedbackData, updateFeedbackData] = useState();
  const [recProductsFeedback, updateRecProductsFeedback] = useState();
  useEffect(() => {
    if (!recProductIds && !recName) {
      fetchFeedbackData(config, updateFeedbackData, setAlertMessage);
    }
  }, [config]);

  useEffect(() => {
    fetchRecProductsFeedback(config, updateRecProductsFeedback, recProductIds, recName, sourceProductId, allowFeedback);
  }, [reFetch, recProductIds, recName]);

  return (
    <Provider value={{ feedbackData: { ...feedbackData }, recProductsFeedback: {...recProductsFeedback}, updateFeedbackData: updateFeedbackData }}>
      {children}
    </Provider>
  );
};

export {
  RecommendationFeedbackContext,
  RecommendationFeedbackContainer,
  Consumer as RecommendationFeedbackConsumer,
}
