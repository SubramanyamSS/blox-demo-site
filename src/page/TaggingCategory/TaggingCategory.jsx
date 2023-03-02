import React, { useState, useMemo } from "react";
import { TaggingCategoryWrapper } from "./styled";
import {
  ConfigContainer,
  ConfigConsumer,
  DetailsContainer,
  DetailsConsumer,
} from "../../container";
import {
  RenderBreadcumbs,
  RenderInputFields,
  RenderResults,
} from "./renderProps";

import { useHistory, useParams, useLocation } from "react-router-dom";

const TaggingCategory = () => {
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const getPostData = (queryObject) => {
    if (queryObject?.title || queryObject?.description) {
      queryObject.extras = {
        title: queryObject.title,
        description: queryObject.description
      }
      delete queryObject.title;
      delete queryObject.description;
    }
    return queryObject;
  }
  const history = useHistory();
  const params = useParams();
  const query = useQuery();
  const [activeCategory, updateActiveCategory] = useState({});
  const [config, setConfig] = useState({});
  const [postData, updatePostData] = useState(getPostData(Object.fromEntries(query)));
  const [loading, setloading] = useState(false);
  return (
    <TaggingCategoryWrapper>
      <ConfigContainer>
        <ConfigConsumer>
          {(context) => {
            context.vue_tag.segments.map((data) => {
              if (data.type == params.category) {
                updateActiveCategory(data);
              }
            });
            config.apiKey = activeCategory.apiKey;
            config.getTag = activeCategory.getTag;
            config.putTag = activeCategory.putTag;
            config.correlationKey = activeCategory.correlationKey;
            config.postData = postData;
            config.setloading = setloading;
            config.version = activeCategory.version;
            const defaultResponse =
              activeCategory.catalog != undefined &&
              params.libIndex &&
              activeCategory.catalog[params.libIndex - 1].response != undefined
                ? activeCategory.catalog[params.libIndex - 1].response
                : {};
            return (
              <>
                <RenderBreadcumbs data={activeCategory} />
                <RenderInputFields
                  activeCategoryData={activeCategory}
                  updatePostData={updatePostData}
                  loading={loading}
                />
                <DetailsContainer
                  config={config}
                  category={params.category}
                  defaultResponse={defaultResponse}
                >
                  <DetailsConsumer>
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
                  </DetailsConsumer>
                </DetailsContainer>
              </>
            );
          }}
        </ConfigConsumer>
      </ConfigContainer>
    </TaggingCategoryWrapper>
  );
};

export { TaggingCategory };
