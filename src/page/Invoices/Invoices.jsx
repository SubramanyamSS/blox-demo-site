import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { TaggingContentWrapper, LoadingWrapper } from "./styled";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Mask } from "../../component";

import { RenderUseCases, RenderInputField, RenderCatelog, RenderCatalogTable } from "./renderProps";
import {
  ConfigConsumer,
  ConfigContainer,
  InvoiceTaggingContainer,
  InvoiceTaggingConsumer
} from "../../container";
import { Modal } from 'semantic-ui-react';

const Invoices = () => {
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
  const [catalogModal, setCatalogModal] = useState(false);
  const [config, setConfig] = useState({});
  const [loading, setloading] = useState(false);
  
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
          `/invoices/${activeTaggingCategoryData.type}${
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
      {loading ? (
        <LoadingWrapper>
          <Mask />
        </LoadingWrapper>
      ) : null}
      <ConfigContainer>
        <ConfigConsumer>
          {(context) => {            
            const currentCategoryData = context.vue_tag.invoices[activeTaggingCategory - 1];
            config.apiKey = currentCategoryData?.apiKey;
            config.getTag = currentCategoryData?.getTag;
            config.putTag = currentCategoryData?.putTag;
            config.correlationKey = currentCategoryData?.correlationKey;
              config.setloading = setloading;
            context.vue_tag.invoices.map((data) => {
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
                  data={context.vue_tag.invoices}
                  updateActiveTaggingCategory={updateActiveTaggingCategory}
                  activeTaggingCategory={activeTaggingCategory}
                  activeTaggingCategoryData={activeTaggingCategoryData}
                  updateActiveTaggingCategoryData={
                    updateActiveTaggingCategoryData
                  }
                />
                {!!currentCategoryData && (
                  <>
                    {currentCategoryData.input_type != "none" ? <RenderInputField
                      data={currentCategoryData}
                      setpostData={setpostData}
                      updateRedirect={updateRedirect}
                      setCatalogModal={setCatalogModal}
                      category={params.category}
                    /> : null}
                    <Modal
                      onClose={() => setCatalogModal(false)}
                      onOpen={() => setCatalogModal(true)}
                      open={catalogModal}
                      size={'large'}
                      style={{left: 'unset'}}
                    >
                      <Modal.Header>Select a {params.category.split('-')[0].toUpperCase()}</Modal.Header>
                      <Modal.Content >
                        <RenderCatelog
                          data={currentCategoryData}
                          updateRedirect={updateRedirect}
                          setcatelogIndex={setcatelogIndex}
                          setpostData={setpostData}
                          updateRedirectLink={updateRedirectLink}
                        />
                      </Modal.Content>
                    </Modal>
                  </>
                )}
                
                    <InvoiceTaggingContainer
                      config={config}
                      category={params.category}
                    >
                      <InvoiceTaggingConsumer>
                        {(context) => {
                          
                            { return context?.data ? <RenderCatalogTable data={context?.data || []} setcatelogIndex={setcatelogIndex} updateRedirect={updateRedirect} /> : null }
                          
                        }}
                        </InvoiceTaggingConsumer>
                    </InvoiceTaggingContainer>
              </>
            );
          }}
        </ConfigConsumer>
      </ConfigContainer>
    </TaggingContentWrapper>
  );
};

export { Invoices };
