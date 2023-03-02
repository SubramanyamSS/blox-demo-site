import React, { createContext, useState } from "react";
import { TaggingData, InvoicesData } from "../configs";

const ConfigContext = createContext({});
const { Provider, Consumer } = ConfigContext;

const ConfigContainer = (props) => {
  const { children } = props;
  const AuthConfig = localStorage.getItem("userConfig");
  const JSONAuthConfig =
    AuthConfig && AuthConfig.trim().length ? JSON.parse(AuthConfig) : {};

  /*
    checking if the tagging config is already configured for the user, else we are populating
    it with a fallback config
  */
  if (Object.keys(JSONAuthConfig).length > 0 && !JSONAuthConfig?.vue_tag?.segments) {
    JSONAuthConfig.vue_tag.segments = TaggingData;
  }
  if (Object.keys(JSONAuthConfig).length > 0 && !JSONAuthConfig?.vue_tag?.invoices) {
    JSONAuthConfig.vue_tag.invoices = InvoicesData;
  }

  const [Config, updateConfig] = useState(
    Object.keys(JSONAuthConfig).length ? JSONAuthConfig : {}
  );
  Config.updateConfig = updateConfig;

  return <Provider value={Config}>{children}</Provider>;
};

export { ConfigContext, ConfigContainer, Consumer as ConfigConsumer };
