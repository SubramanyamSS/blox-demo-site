import React from "react";
import { Config, DefaultUserUrl } from "../../configs";
import { ErrorEl } from "./styled";
import { getCookie } from "../../common";

const RenderErrorBlock = (props) => {
  const { errorTxt, IconEl } = props;

  return (
    <ErrorEl>
      {IconEl ? <IconEl /> : null}
      {errorTxt}
    </ErrorEl>
  );
};

const makeAjax = (username, password, updateSigninErr) => {
  let signinUrl = DefaultUserUrl
    ? DefaultUserUrl.endPoint + DefaultUserUrl.signin
    : "";
  if (username && password) {
    const postBody = new FormData();
    postBody.append("email", username);
    postBody.append("password", password);
    return fetch(
      signinUrl,
      {
        method: "POST",
        body: postBody,
      }
    )
      .then((data) => data.json())
      .then((resp) => {
        if (resp && resp.status && resp.status.toLowerCase() === "success" && resp.config) {
          const UUID = getCookie("mad_UUID");
          const {
            client_name,
            config,
            user_id,
            api_key,
            pixel_url,
            correlation_key,
            url,
          } = resp;
          let configData = {
            client_name,
            user_id,
            pixel_url,
            correlation_key,
            API_KEY: api_key,
            mad_UUID: UUID,
            url,
          };
          let configJSON = Config;
          if (config && Object.keys(config).length) {
            configJSON = config;
          }
          configData = {
            ...configData,
            ...configJSON,
          };
          return configData;
        } else {
          console.log("failure");
          updateSigninErr(resp.message || "");
          return Promise.resolve(false); // "false" should be returned to satify failure scenario
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  return Promise.resolve({});
};

export { RenderErrorBlock, makeAjax };