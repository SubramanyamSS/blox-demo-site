import React, { createContext, useState, useEffect } from "react";
import { ConfigConsumer } from "./Config";
import { getCookie } from "../common";

const CompleteYourCartContext = createContext({});
const { Consumer, Provider } = CompleteYourCartContext;

const fetchProductsHistory = (config, updateProducts) => {
  let baseURL = "";
  const apiKey = config.API_KEY;
  const userId = config.user_id;
  const madUUID = getCookie("mad_UUID");
  const clientName = config.client_name;
  const params = `api_key=${apiKey}&user_id=${userId}&mad_uuid=${madUUID}&num_results=10`;

  if(clientName === "2321_grocery-demo") {
    baseURL = "https://us-east-1-client-staging.madstreetden.com"
  } else if (clientName == "2352_shopchannel") {
    baseURL = "https://ap-southeast-1-client-staging.madstreetden.com"
  }

  fetch(
    `${baseURL}/get_cart_details?${params}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      updateProducts(data.data);
    })
    .catch((err) => console.log("err from mcpd GET", err));
};

const CompleteYourCartContainer = (props) => {
  const { children } = props;
  const [config, updateConfig] = useState("");
  const [ProductRecommendations, updateProducts] = useState([]);

  useEffect(() => {
    config && fetchProductsHistory(config, updateProducts);
  }, [config]);

  return (
    <ConfigConsumer>
      {(context) => {
        updateConfig(context);
        return <Provider value={ProductRecommendations}>{children}</Provider>;
      }}
    </ConfigConsumer>
  );
};

export {
  CompleteYourCartContainer,
  CompleteYourCartContainer as default,
  Consumer as CompleteYourCartConsumer,
};
