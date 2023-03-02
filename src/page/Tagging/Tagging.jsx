import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { TaggingContentWrapper } from "./styled";
import { Redirect, useParams, useHistory } from "react-router-dom";

import { RenderUseCases, RenderInputField, RenderCatelog } from "./renderProps";
import { ConfigConsumer, ConfigContainer } from "../../container";
import { TaggingData } from "../../configs";

const Tagging = () => {
  const [activeTaggingCategory, updateActiveTaggingCategory] = useState();
  const [activeTaggingCategoryData, updateActiveTaggingCategoryData] = useState(
    {}
  );
  const [redirectLink, updateRedirectLink] = useState();
  const [redirect, updateRedirect] = useState(false);
  const [postData, setpostData] = useState({});
  const [catelogIndex, setcatelogIndex] = useState();
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    if (redirect) {
      let queryString = "";
      if (Object.keys(postData).length != 0) {
        queryString = new URLSearchParams(postData);
      }
      if (redirectLink) {
        history.push(
          `${redirectLink}${
            catelogIndex != undefined ? "/" + catelogIndex : ""
          }${queryString != "" ? "?" + queryString : ""}`
        );
      } else {
        history.push(
          `/tagging/${activeTaggingCategoryData.type}${
            catelogIndex != undefined ? "/" + catelogIndex : ""
          }/result${queryString != "" ? "?" + queryString : ""}`
        );
      }
    }
  }, [redirect]);

  useEffect(() => {
    return () => {
      const options = {
        left: 0,
        top: 0,
        behavior: "smooth",
      };
      window.scroll(options);
    };
  });

  return (
    <TaggingContentWrapper>
      <ConfigContainer>
        <ConfigConsumer>
          {(context) => {
            const currentCategoryData =
              context.vue_tag.segments[activeTaggingCategory - 1];
            context.vue_tag.segments.map((data) => {
              if (data.type == params.category) {
                updateActiveTaggingCategory(data.id);
              }
            });
            if (!params.category) {
              updateActiveTaggingCategory(undefined);
            }
            updateActiveTaggingCategoryData(currentCategoryData);
            return (
              <>
                <RenderUseCases
                  data={context.vue_tag.segments}
                  updateActiveTaggingCategory={updateActiveTaggingCategory}
                  activeTaggingCategory={activeTaggingCategory}
                  activeTaggingCategoryData={activeTaggingCategoryData}
                  updateActiveTaggingCategoryData={
                    updateActiveTaggingCategoryData
                  }
                />
                {!!currentCategoryData && (
                  <>
                    <RenderInputField
                      data={currentCategoryData}
                      setpostData={setpostData}
                      updateRedirect={updateRedirect}
                      activeTaggingCategoryData={activeTaggingCategoryData}
                    />
                    <RenderCatelog
                      data={currentCategoryData}
                      updateRedirect={updateRedirect}
                      setcatelogIndex={setcatelogIndex}
                      setpostData={setpostData}
                      updateRedirectLink={updateRedirectLink}
                      activeTaggingCategoryData={activeTaggingCategoryData}
                    />
                  </>
                )}
              </>
            );
          }}
        </ConfigConsumer>
      </ConfigContainer>
    </TaggingContentWrapper>
  );
};

export { Tagging };
