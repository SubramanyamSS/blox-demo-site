import React, { useState, useEffect, createContext } from "react";
import { ConfigConsumer } from "./Config";

const CategoryListContext = createContext({});
const { Provider, Consumer } = CategoryListContext;

const fetchCategoryListProducts = (updatePdtEvent, Config) => {
  const categoryListData =
    Config.vue_find &&
      Config.vue_find.children &&
      Config.vue_find.children.category_list
      ? Config.vue_find.children.category_list
      : {};
  const { endPoint, categoryMenu, vueX } = categoryListData;
  let API_KEY = "";
  let default_url = Config.url;
  let category_endpoint = "/v2/clp_discover";
  if (Config) {
    if (Config.client_name == "2253_yoox-poc") {
      default_url = "https://eu-robin-poc.madstreetden.com";
    }
    if (Config.vue_find && Config.vue_find.API_KEY) {
      API_KEY = Config.vue_find.API_KEY;
    } else if (Config.API_KEY) {
      API_KEY = Config.API_KEY;
    }
  }
  if (endPoint) {
    default_url = endPoint;
  }
  if (categoryMenu) {
    category_endpoint = categoryMenu;
  }
  if (default_url) {
    default_url = default_url + category_endpoint;
  }
  const postData = {
    api_key: API_KEY,
    is_from_demo_site: true,
  };

  if (default_url) {
    fetch(default_url, {
      headers: {
        'Content-type': 'application/json',
        ...(vueX ? {'x-api-key': API_KEY} : null)
      },
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((data) => data.json())
      .then((resp) => {
        if (
          resp &&
          resp.status &&
          resp.status.toLowerCase() === "success" &&
          resp.data
        ) {
          updatePdtEvent(resp.data);
        }
      })
      .catch((err) => console.log("error from view find", err));
  }
};

const CategoryListContainer = (props) => {
  const { children } = props;
  const [CategoryListProds, updateCategoryListProds] = useState({});
  const [config, updateConfig] = useState({});

  useEffect(() => fetchCategoryListProducts(updateCategoryListProds, config), [
    config,
  ]);

  return (
    <ConfigConsumer>
      {(context) => {
        updateConfig(context);
        return <Provider value={CategoryListProds}>{children}</Provider>;
      }}
    </ConfigConsumer>
  );
};

export { CategoryListContainer, Consumer as CategoryListConsumer };
