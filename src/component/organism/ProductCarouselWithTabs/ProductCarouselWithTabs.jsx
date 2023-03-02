import React, { useState } from "react";
import ProductCarousel from "../ProductCarousel";
import { RenderTabsWrapper } from "./renderProps";
import { RecommendationWithTabsWrapper } from "./styled";
import { Button } from "semantic-ui-react";
import { cardStyleConfig } from "../../../styleConfig";

const getSliderLimit = (limit, list) => limit < list.length ? limit : (list.length || limit);

const ProductCarouselWithTabs = (props) => {
  const {
    activeIndex,
    recommendedData,
    sliderPerGroup,
    is_style_it,
    debug,
    initialSlide,
    showBuyButton,
    showWishlistButton,
    showStyledProducts,
    showSimilarProducts,
    styleConfig,
    ...remainingProps
  } = props;

  let { tabsContainer } = props;
  if (is_style_it) {
    tabsContainer = [];
    recommendedData.map((styles, key) => {
      tabsContainer.push({
        value: `Style ${key + 1}`,
        index: key.toString(),
      });
    });
  }
  let defaultTabIndex = "";
  if (activeIndex) {
    defaultTabIndex = activeIndex;
  } else if (tabsContainer && tabsContainer.length > 1) {
    defaultTabIndex = tabsContainer[0];
  }

  const [activeTab, updateTab] = useState(defaultTabIndex);
  return (
    <RecommendationWithTabsWrapper is_style_it={is_style_it}>
      <RenderTabsWrapper
        {...remainingProps}
        tabsContainer={tabsContainer}
        activeTab={activeTab}
        updateTab={updateTab}
        is_style_it={is_style_it}
      />
      <ProductCarousel
        isFromCarouselWithTabs={true}
        showBuyButton={showBuyButton}
        initialSlide={initialSlide || 0}
        showWishlistButton={showWishlistButton}
        list={recommendedData[activeTab] || []}
        showStyledProducts={showStyledProducts}
        showSimilarProducts={showSimilarProducts}
        sliderPerGroup={sliderPerGroup || cardStyleConfig.card.cards_per_row}
        styleConfig={styleConfig || cardStyleConfig}
        {...remainingProps}
      />
      {/* {debug ? <> 
            <Button 
                type='submit' 
                style={{ height: 40, marginTop: 15, marginRight: 10, float:'right', backgroundColor: '#FF7054', color: '#fff'  }}> 
                Boost Configurations
            </Button>
            </> : null} */}
    </RecommendationWithTabsWrapper>
  );
};

ProductCarouselWithTabs.defaultProps = {
  recommendedData: {},
};

export { ProductCarouselWithTabs };
