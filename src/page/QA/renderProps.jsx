import React, { useEffect, useState } from "react";
import { TaggingAuditContainer, TaggingAuditConsumer } from "../../container";
import {
  TaggingAuditContentWrapper,
  TaggingAuditContentImage,
  TaggingAuditForm,
  TaggingAuditOptions,
  TaggingAuditOption,
  TaggingAuditButton,
  TaggingAuditFormHeading,
  TaggingAuditHeading,
  ErrorMessage,
  ErrorWrapper,
  ImageMetaData,
  LoadingWrapper,
  AlertEl,
  ImageIconWrapper,
  ZoomButton,
  ZoomContainer,
  ZoomTools,
} from "./styled";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Icon, Modal } from "semantic-ui-react";
import LoaderSvg from "../../static/img/loader.svg";
import { Mask } from "../../component";

const TaggingAudit = ({ config }) => {
  const [reFetch, updateReFetch] = useState(false);
  const [loading, updateLoading] = useState(true);
  return (
    <TaggingAuditContainer
      config={config}
      reFetch={reFetch}
      updateLoading={updateLoading}
    >
      <TaggingAuditHeading>Audit</TaggingAuditHeading>
      <TaggingAuditConsumer>
        {(context) => {
          return context && context.data && Object.keys(context.data).length ? (
            <TaggingAuditContent
              context={context}
              userConfig={config}
              updateReFetch={updateReFetch}
              reFetch={reFetch}
              updateLoading={updateLoading}
            />
          ) : (
            <>
              {loading ? (
                <LoadingWrapper>
                  <Mask />
                </LoadingWrapper>
              ) : (
                <TaggingAuditContentIssue context={context} />
              )}
            </>
          );
        }}
      </TaggingAuditConsumer>
    </TaggingAuditContainer>
  );
};

const TaggingAuditContent = ({
  context,
  userConfig,
  updateReFetch,
  reFetch,
  updateLoading,
}) => {
  const { data, updateAuditData } = context;
  const { API_KEY, userName, config } = userConfig;
  const [selectedFeedback, updateSelectedFeedback] = useState();
  const [errorMessage, updateErrorMessage] = useState("");
  const [loaderState, updateLoaderState] = useState("Submit Feedback");
  const [imagePopupState, updateImagePopupState] = useState(false);
  const [alertMessage, updateAlertMessage] = useState("");
  return (
    <>
      <AlertEl isActive={alertMessage != ""}>{alertMessage}</AlertEl>
      <TaggingAuditContentWrapper>
        <TaggingAuditContentImage>
          <img src={data?.box_url} alt={data?.scratch_id} />
          <ImageIconWrapper onClick={() => updateImagePopupState(true)}>
            <Icon
              size="large"
              style={{ top: "2px", position: "relative" }}
              color="white"
              name="zoom-in"
            />
          </ImageIconWrapper>
          {data?.predicted_karatage && (
            <ImageMetaData>
              <span>Predicted Karatage:</span> {data?.predicted_karatage}
            </ImageMetaData>
          )}
          {data?.created_date && (
            <ImageMetaData>
              <span>Created Date:</span> {data?.created_date}
            </ImageMetaData>
          )}
          <Modal
            size="small"
            dimmer="inverted"
            open={imagePopupState}
            onClose={() => updateImagePopupState(false)}
            onOpen={() => updateImagePopupState(true)}
          >
            <TransformWrapper>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <ZoomContainer>
                  <ZoomTools className="tools">
                    <ZoomButton onClick={() => zoomIn()}>
                      <Icon
                        size="large"
                        style={{ top: "2px", position: "relative" }}
                        name="zoom-in"
                      />
                    </ZoomButton>

                    <ZoomButton onClick={() => zoomOut()}>
                      <Icon
                        size="large"
                        style={{ top: "2px", position: "relative" }}
                        name="zoom-out"
                      />
                    </ZoomButton>
                    <ZoomButton onClick={() => resetTransform()}>
                      <Icon
                        size="large"
                        style={{ top: "2px", position: "relative" }}
                        name="repeat"
                      />
                    </ZoomButton>
                  </ZoomTools>
                  <Modal.Content image>
                    <React.Fragment>
                      <TransformComponent>
                        <img
                          src={data?.box_url}
                          alt={data?.scratch_id}
                          style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "88vh",
                          }}
                        />
                      </TransformComponent>
                    </React.Fragment>
                  </Modal.Content>
                </ZoomContainer>
              )}
            </TransformWrapper>
          </Modal>
        </TaggingAuditContentImage>
        <TaggingAuditForm
          onSubmit={(e) => {
            updateLoaderState("Loading");
            e.preventDefault();
            if (!selectedFeedback) {
              updateErrorMessage("Please select a feedback");
              updateLoaderState("Submit Feedback");
              return;
            } else {
              updateErrorMessage("");
            }
            fetch(`${config.feedbackAuditURL}/${data?.scratch_id}/feedback/`, {
              method: "POST",
              body: `feedback=${selectedFeedback}&user_id=${userName}`,
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "x-api-key": API_KEY,
              },
            })
              .then((data) => data.json())
              .then((response) => {
                // updateAuditData(response);
                updateLoading(true);
                updateAlertMessage("Submitted feedback successfully");
                updateLoaderState("Submit Feedback");
                setTimeout(() => {
                  updateAuditData();
                  updateSelectedFeedback();
                  updateAlertMessage("");
                  updateReFetch(!reFetch);
                }, 1000);
              })
              .catch((err) => {});
          }}
        >
          <TaggingAuditFormHeading>Feedback Options:</TaggingAuditFormHeading>

          <TaggingAuditOptions>
            {data?.feedback_options.map((option) => {
              return (
                <TaggingAuditOption key={option.id}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={option.value === selectedFeedback}
                    name="feedback_options"
                    id={option.value}
                    onChange={(e) => updateSelectedFeedback(e.target.value)}
                  />
                  <label htmlFor={option.value}>{option.value}</label>
                </TaggingAuditOption>
              );
            })}
          </TaggingAuditOptions>
          {errorMessage && errorMessage != "" && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
          <TaggingAuditButton loaderState={loaderState === "Loading"}>
            {loaderState === "Loading" ? <img src={LoaderSvg} /> : loaderState}
          </TaggingAuditButton>
        </TaggingAuditForm>
      </TaggingAuditContentWrapper>
    </>
  );
};

const TaggingAuditContentIssue = ({ context }) => {
  return (
    <div>
      <ErrorWrapper>
        <Icon name="exclamation circle" size="huge" />
        <span>Failed to fetch data</span>
      </ErrorWrapper>
      {context?.message &&
        context?.status &&
        context?.status.toLowerCase() != ("success" || "ok") && (
          <ErrorMessage>{context?.message}</ErrorMessage>
        )}
    </div>
  );
};

export { TaggingAudit };
