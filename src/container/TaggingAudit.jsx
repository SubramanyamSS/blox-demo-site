import React, { createContext, useState, useEffect } from "react";

const TaggingAuditContext = createContext({});
const { Provider, Consumer } = TaggingAuditContext;

const fetchAuditData = (configs, updateAuditData, updateLoading) => {
  const { API_KEY, userName, config } = configs;
  updateLoading(true);
  fetch(`${config.feedbackAuditURL}/?user_id=${userName}`, {
    method: "GET",
    headers: { "x-api-key": API_KEY },
  })
    .then((data) => data.json())
    .then((response) => {
      updateAuditData(response);
      updateLoading(false);
    })
    .catch((err) => {
      updateLoading(false);
      console.log(err);
    });
};

const TaggingAuditContainer = (props) => {
  const { children, reFetch, config, updateLoading } = props;
  const [auditData, updateAuditData] = useState();
  useEffect(() => {
    fetchAuditData(config, updateAuditData, updateLoading);
  }, [reFetch, config]);

  return (
    <Provider value={{ ...auditData, updateAuditData: updateAuditData }}>
      {children}
    </Provider>
  );
};

export {
  TaggingAuditContext,
  TaggingAuditContainer,
  Consumer as TaggingAuditConsumer,
};
