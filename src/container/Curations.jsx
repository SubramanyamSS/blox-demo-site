import React, { useState, useEffect, createContext } from "react";
import { Config, DefaultUserUrl } from "../configs";
import { ConfigConsumer } from "./Config";

const CurationContext = createContext({});
const { Provider, Consumer } = CurationContext;

const fetchCurationThemes = (updateCurationThemes, config, updateLoading) => {
  let status = "publish";
  if (
    config.vuestyleDetails.curation_tool &&
    config.vuestyleDetails.curation_tool.collection_status
  ) {
    status = config.vuestyleDetails.curation_tool.collection_status;
  }
  const accountKey = "0ebb6bcd-d8c2-4176-bb62-c42ee7d534af";
  let baseURL = DefaultUserUrl
    ? DefaultUserUrl.endPoint + DefaultUserUrl.curations
    : "";
  let endPoint = `${baseURL}?status=${status}`;
  updateLoading(true);
  fetch(endPoint, {
    headers: {
      "Content-type": "application/json",
      "msd-account-key": accountKey,
      "msd-api-key": config.api_key,
    },
    method: "GET",
  })
    .then((data) => data.json())
    .then((resp) => {
      updateCurationThemes(resp.data.collections);
      updateLoading(false);
    })
    .catch((err) => {
      console.log("error- ", err);
      updateLoading(false);
    });
};

const CurationContainer = (props) => {
  const { children } = props;
  const [curationThemes, updateCurationThemes] = useState([]);
  const [config, updateConfig] = useState({});
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(config).length > 0)
      fetchCurationThemes(updateCurationThemes, config, updateLoading);
  }, [config]);

  return (
    <ConfigConsumer>
      {(context) => {
        updateConfig(context);
        return (
          <Provider value={{ collections: curationThemes, loading, config }}>
            {children}
          </Provider>
        );
      }}
    </ConfigConsumer>
  );
};

export { Consumer as CurationConsumer, CurationContainer };
