import React from "react";
import { ConfigContext } from "../../container";
import {
  SettingsWrapper,
  TitleEl,
  SubmitBtn,
  BtnWrapper,
  AlertEl,
} from "./styled";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { DefaultUserUrl } from "../../configs";
import { getCookie, setCookie } from "../../common";

let reference = null;

class Settings extends React.Component {
  static contextType = ConfigContext;
  state = {
    alert: "",
  };
  jsonEditor = null;
  componentDidMount = () => {
    if (!this.context?.config?.active) {
      this.props.history.goBack();
    }
    this.jsonEditor = new JSONEditor(
      reference,
      {
        mode: "form",
        mainMenuBar: false,
        navigationBar: false,
        statusBar: false,
      },
      this.context
    );
  };

  render() {
    return (
      this.context?.config?.active ? <>
        <TitleEl>Configuration</TitleEl>
        <AlertEl isActive={this.state.alert !== ""}>
          {this.state.alert || ""}
        </AlertEl>
        <SettingsWrapper ref={(elem) => (reference = elem)}></SettingsWrapper>
        <BtnWrapper>
          <SubmitBtn
            onClick={(e) => {
              const currJsonEditorVal = this.jsonEditor.get();
              const {
                clientName,
                user_id,
                pixel_url,
                correlation_key,
                mad_UUID,
                ...remainingEditorProps
              } = currJsonEditorVal;
              const UUID = getCookie("mad_UUID");
              if (
                mad_UUID &&
                mad_UUID.toString().trim().length &&
                mad_UUID !== UUID
              ) {
                setCookie("mad_UUID", mad_UUID, 365);
              }
              if (
                user_id &&
                user_id.toString().trim().length &&
                user_id !== localStorage.getItem("userId")
              ) {
                localStorage.setItem("userId", user_id);
              }
              const update_config_url =
                DefaultUserUrl.endPoint + DefaultUserUrl.update_config;
              const userName = localStorage.getItem("userName");
              fetch(update_config_url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_name: userName,
                  config: remainingEditorProps,
                }),
              })
                .then((data) => data.json())
                .then((resp) => {
                  if (
                    resp &&
                    resp.status &&
                    resp.status.toLowerCase() === "success"
                  ) {
                    const {
                      client_name,
                      user_id,
                      API_KEY,
                      pixel_url,
                    } = this.context;
                    const updatedConfig = {
                      ...currJsonEditorVal,
                      client_name,
                      user_id,
                      API_KEY,
                      pixel_url,
                    };
                    this.context.updateConfig(updatedConfig);
                    localStorage.setItem(
                      "userConfig",
                      JSON.stringify(updatedConfig)
                    );
                  }
                  this.setState({ alert: resp.message || "" });
                })
                .catch((err) => console.log(err));
            }}
          >
            Apply
          </SubmitBtn>
          <SubmitBtn onClick={(e) => this.jsonEditor.set(this.context)}>
            Reset
          </SubmitBtn>
          <SubmitBtn
            onClick={(e) => {
              const currJsonEditorVal = this.jsonEditor.get();
              const updatedConfig = {
                ...currJsonEditorVal,
              };
              const { user_id, mad_UUID } = currJsonEditorVal;
              const UUID = getCookie("mad_UUID");
              if (
                mad_UUID &&
                mad_UUID.toString().trim().length &&
                mad_UUID !== UUID
              ) {
                setCookie("mad_UUID", mad_UUID, 365);
                localStorage.setItem("mad_UUID", mad_UUID);
              }
              if (
                user_id &&
                user_id.toString().trim().length &&
                user_id !== localStorage.getItem("userId")
              ) {
                localStorage.setItem("userId", user_id);
              }
              this.context.updateConfig(updatedConfig);
              localStorage.setItem("userConfig", JSON.stringify(updatedConfig));
              this.setState({ alert: "Saved in session" });
            }}
          >
            Save in Session
          </SubmitBtn>
        </BtnWrapper>
      </> : null
    );
  }
}

export { Settings };
