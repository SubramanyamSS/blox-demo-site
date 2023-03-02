import React from "react";
import { PdtRecommendationTabs, PdtRecommendationTabsWrapper } from "./styled";

const RenderTabsWrapper = (props) => {
  const { tabsContainer, activeTab, updateTab, is_style_it } = props;

  return (
    <PdtRecommendationTabsWrapper is_style_it={is_style_it}>
      {tabsContainer.map((tabs, key) => {
        return (
          <PdtRecommendationTabs
            isActive={tabs.index === activeTab}
            key={`RecommendationTabs_${key}`}
            onClick={(e) => updateTab(tabs.index)}
          >
            {tabs.value}
          </PdtRecommendationTabs>
        );
      })}
    </PdtRecommendationTabsWrapper>
  );
};

export { RenderTabsWrapper };
