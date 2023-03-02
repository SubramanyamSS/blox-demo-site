import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { cardStyleConfig } from "../../../styleConfig";
import { CardBlock } from "../../";
import { PdtCarouselWrapper, PlaceholderCont, SlideWrapper } from "./styled";
import { RecommendationFeedbackContainer, RecommendationFeedbackConsumer, ConfigConsumer } from "../../../container";

const RenderPlaceholderData = (props) => {
  const { sliderPerGroup } = props;
  let PlaceholderArr = [];
  for (let i = 0; i < sliderPerGroup; i++) {
    PlaceholderArr.push(<CardBlock key={`placeholder ${i}`} />);
  }
  return PlaceholderArr;
};

const ProductCarousel = (props) => {
  const {
    list,
    sliderPerGroup,
    ItemCont,
    loading,
    showBuyButton,
    buyButtonStateChange,
    showWishlistButton,
    isFromCarouselWithTabs,
    type,
    initialSlide,
    isFashionUser,
    isGroceryUser,
    showStyledProducts,
    showSimilarProducts,
    styleConfig,
    key,
    facets,
    widgetName,
    showRecommendationFeedback,
    sourceProductId,
    ...remainingProps
  } = props;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: sliderPerGroup
      ? sliderPerGroup
      : styleConfig?.card?.orientation?.horizontal ||
        cardStyleConfig.card.orientation.horizontal
      ? 3
      : 4,
    slidesToScroll: sliderPerGroup
      ? sliderPerGroup
      : styleConfig?.card?.orientation?.horizontal ||
        cardStyleConfig.card.orientation.horizontal
      ? 3
      : 4,
    initialSlide: initialSlide || 0,
  };

  const [uiKey, triggerUI] = useState(Math.random());
  const [reFetch, setReFetch] = useState(false);
  const slickElWidth = document.getElementsByClassName("slick-track")[0]
    ?.offsetWidth;
  let slickItemWidth = null;

  useEffect(() => {
    triggerUI(Math.random());
  }, [props]);

  const [productIds, setProductsIds] = useState([]);

  useEffect(() => {
    let productIds = [];
    if (list?.length > 0) {
      list.forEach(product => {
        productIds.push(product?.product_id);
      });
    }
    setProductsIds(productIds);
  }, [list]);

  return (
    <ConfigConsumer>
      {(configContext) => (
        <RecommendationFeedbackContainer reFetch={reFetch} config={configContext} recProductIds={productIds} recName={widgetName} sourceProductId={sourceProductId} allowFeedback={showRecommendationFeedback}>
          <RecommendationFeedbackConsumer>
            {(context) => (
              <PdtCarouselWrapper
                key={uiKey}
                isVertical={
                  styleConfig?.card?.orientation?.horizontal !== undefined
                    ? !styleConfig?.card?.orientation?.horizontal
                    : !cardStyleConfig.card.orientation.horizontal
                }
              >
                {loading ? (
                  <PlaceholderCont>
                    <RenderPlaceholderData
                      sliderPerGroup={
                        sliderPerGroup
                          ? sliderPerGroup
                          : styleConfig?.card?.orientation?.horizontal ||
                            cardStyleConfig.card.orientation.horizontal
                            ? 3
                            : 4
                      }
                    />
                  </PlaceholderCont>
                ) : (
                  <Slider {...settings}>
                    {list &&
                      list.map((Item, key) =>
                        ItemCont ? (
                          <ItemCont
                            {...remainingProps}
                            {...Item}
                            key={`recommendedPdts_${key}`}
                          />
                        ) : (
                          <CardBlock
                            sliderPerGroup={
                              sliderPerGroup
                                ? sliderPerGroup
                                : styleConfig?.card?.orientation?.horizontal ||
                                  cardStyleConfig.card.orientation.horizontal
                                  ? 3
                                  : 4
                            }
                            widgetName={widgetName}
                            showRecommendationFeedback={showRecommendationFeedback}
                            sourceProductId={sourceProductId}
                            setReFetch={setReFetch}
                            isFromCarouselWithTabs={isFromCarouselWithTabs}
                            showBuyButton={showBuyButton}
                            buyButtonStateChange={buyButtonStateChange}
                            showWishlistButton={showWishlistButton}
                            {...remainingProps}
                            {...Item}
                            key={`recommendedPdts_${key}`}
                            index={key}
                            type={type}
                            isFashionUser={isFashionUser}
                            isGroceryUser={isGroceryUser}
                            showStyledProducts={showStyledProducts}
                            showSimilarProducts={showSimilarProducts}
                            styleConfig={styleConfig || cardStyleConfig}
                            style={{ color: "red" }}
                            facets={facets}
                            defaultFeedbackId={context?.recProductsFeedback?.[widgetName]?.[Item.product_id]}
                          />
                        )
                      )}
                  </Slider>
                )}
              </PdtCarouselWrapper>
            )}
          </RecommendationFeedbackConsumer>
        </RecommendationFeedbackContainer>
      )}
    </ConfigConsumer>
  );
};

export { ProductCarousel };
