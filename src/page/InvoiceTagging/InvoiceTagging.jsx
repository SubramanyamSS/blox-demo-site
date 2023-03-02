import React, { useState, useMemo } from "react";
import { TaggingCategoryWrapper, LoadingWrapper } from "./styled";
import {
  ConfigContainer,
  ConfigConsumer,
  InvoiceTaggingContainer,
  InvoiceTaggingConsumer,
} from "../../container";
import {
  RenderBreadcumbs,
  RenderInputFields,
  RenderResults,
} from "./renderProps";
import { Mask } from '../../component';

import { useHistory, useParams, useLocation } from "react-router-dom";
import { Content } from "../Segments/styled";

const InvoiceTagging = () => {
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const history = useHistory();
  const params = useParams();
  const query = useQuery();
  const [activeCategory, updateActiveCategory] = useState({});
  const [config, setConfig] = useState({});
  const [postData, updatePostData] = useState(Object.fromEntries(query));
  const [loading, setloading] = useState(false);
  return (
    <TaggingCategoryWrapper>
      {loading ? (
        <LoadingWrapper>
          <Mask />
        </LoadingWrapper>
      ) : null}
      <ConfigContainer>
        <ConfigConsumer>
          {(context) => {
            context.vue_tag.invoices.map((data) => {
              if (data.type == params.category) {
                updateActiveCategory(data);
              }
            });
            config.apiKey = activeCategory.apiKey;
            config.getTag = activeCategory.getTag + '/' + params.libIndex;
            config.putTag = activeCategory.putTag;
            config.correlationKey = activeCategory.correlationKey;
            config.postData = postData;
            config.setloading = setloading;
            const defaultResponse = {};
            return (
              <>
                <RenderBreadcumbs data={activeCategory} />
                 <InvoiceTaggingContainer
                  config={config}
                  category={params.category}
                  defaultResponse={defaultResponse}
                >
                  <InvoiceTaggingConsumer>
                    {(context) => {
                      return (
                        <RenderResults
                          result={context}
                          category={params.category}
                          tagType={activeCategory.tagType}
                          activeCategory={activeCategory}
                        />
                      );
                    }}
                  </InvoiceTaggingConsumer>
                </InvoiceTaggingContainer>
              </>
            );
          }}
        </ConfigConsumer>
      </ConfigContainer>
    </TaggingCategoryWrapper>
  );
};

export { InvoiceTagging };
