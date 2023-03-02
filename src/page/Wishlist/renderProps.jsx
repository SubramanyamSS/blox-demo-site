import React, { useState, useRef } from "react";
import {
  ConfigConsumer,
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
} from "../../container";
import { getCookie } from "../../common";
import { HeaderVueContent } from "../../configs";
import { ProductCarousel, ProductCarouselWithTabs } from "../../component";
import {
  NoItemsMessage,
  ParentWrapper,
  ProductWrapper,
  CardWrapper,
  DescriptionWrapper,
  DescriptionChildWrapper,
  ButtonWrapper,
  ProductRecommendationWrapper,
  ProductRecommendationTitle,
} from "./styled";
import { HeaderConfigConsumer } from "../../container";

const RenderWishlistItems = () => {
  let all_items_in_wishlist = localStorage.getItem("wishlist_items");
  const [is_loading, update_loading] = useState(true);
  const [items_to_display, update_items_to_display] = useState([]);
  let temp_items = [];
  if (
    all_items_in_wishlist != undefined &&
    all_items_in_wishlist != "" &&
    all_items_in_wishlist != "{}" &&
    is_loading
  ) {
    update_loading(false);
    all_items_in_wishlist = JSON.parse(all_items_in_wishlist);
    for (let key in all_items_in_wishlist) {
      let _obj = {};
      _obj["childKey"] = key;
      _obj["title"] = all_items_in_wishlist[key].title;
      _obj["meta"] = all_items_in_wishlist[key].product_id;
      _obj["image"] = all_items_in_wishlist[key].image_link;
      _obj["price"] = all_items_in_wishlist[key].price;
      temp_items.push(_obj);
    }
    update_items_to_display(temp_items);
  }

  const removeProduct = (id, updateWishlistPdtCount) => {
    for (let i = 0; i < items_to_display.length; i++) {
      if (items_to_display[i].childKey == id) {
        items_to_display.splice(i, 1);
        update_items_to_display([...items_to_display]);
      }
    }
    let all_items_in_wishlist = localStorage.getItem("wishlist_items");
    if (
      all_items_in_wishlist != undefined &&
      all_items_in_wishlist != "" &&
      all_items_in_wishlist != "{}"
    ) {
      all_items_in_wishlist = JSON.parse(all_items_in_wishlist);
      for (let key in all_items_in_wishlist) {
        if (key == id) {
          delete all_items_in_wishlist[id];
          localStorage.setItem(
            "wishlist_items",
            JSON.stringify(all_items_in_wishlist)
          );
          updateWishlistPdtCount({
            count: Object.keys(all_items_in_wishlist).length,
          });
        }
      }
    }
  };

  return (
    <>
      {items_to_display.length > 0 ? (
        <div>
          <ParentWrapper>
            <ProductWrapper>
              <h3
                style={{ color: "#191e50" }}
              >{`Your wishlist (${items_to_display.length})`}</h3>
              {items_to_display.map((item) => (
                <div key={item.product_id}>
                  <CardWrapper>
                    <img src={item.image} height="120px" maxWidth="150px" Width="120px" />
                    <DescriptionWrapper>
                      <DescriptionChildWrapper>
                        <div style={{ display: "flex", flex: 2.5 }}>
                          {item.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flex: 0.5,
                            justifyContent: "flex-end",
                          }}
                        >{`$ ${item.price ? item.price : 0}`}</div>
                      </DescriptionChildWrapper>
                      <HeaderConfigConsumer>
                        {(context) => {
                          const { updateWishlistPdtCount } = context[1];
                          return (
                            <ButtonWrapper
                              onClick={() =>
                                removeProduct(
                                  item.childKey,
                                  updateWishlistPdtCount
                                )
                              }
                            >
                              REMOVE
                            </ButtonWrapper>
                          );
                        }}
                      </HeaderConfigConsumer>

                      {/* <ButtonWrapper
                        onClick={() =>
                          addToCartHandler(item, updateAddToCartText)
                        }
                      >
                        {addToCartText}
                      </ButtonWrapper> */}
                    </DescriptionWrapper>
                  </CardWrapper>
                </div>
              ))}
            </ProductWrapper>
          </ParentWrapper>
        </div>
      ) : (
          <NoItemsMessage>Your wishlist is empty</NoItemsMessage>
        )}
    </>
  );
};

const ProductRecommendationSection = (props) => {
  const RecommendedWidgetsList = useRef({});
  const AIStylePicksList = useRef({});

  return (
    <ConfigConsumer>
      {(context) => {
        const { user_id, discover } = context;
        let API_KEY = context.API_KEY;
        let aiStyleEnabled = false;
        if (discover && discover.aiStyleEnabled) {
          aiStyleEnabled = true;
        }
        let url = context.url;
        if (discover.API_KEY) {
          API_KEY = discover.API_KEY;
        }
        let userId = localStorage.getItem("userId");
        if (!userId) {
          userId = user_id;
        }
        let carouselTobeRendered = [1];
        let aiStylePickToBeRendered = [20];
        const mad_UUID = getCookie("mad_UUID");
        const recommendation =
          discover && discover.recommendation
            ? discover.recommendation
            : url + "/widgets";
        if (API_KEY && userId && mad_UUID && recommendation) {
          RecommendedWidgetsList.current = {
            widgetList: ["7", "1", "11", "3"],
            postBody: `api_key=${API_KEY}&user_id=${userId}&cp_ensemble=true&details=true&duplicates=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link"]&mad_uuid=${mad_UUID}&num_results=[50]&require_source=true&widget_list=[7,1,11,3]`,
            recommendationUrl: recommendation,
          };
          if (aiStyleEnabled) {
            AIStylePicksList.current = {
              widgetList: ["20"],
              postBody: `api_key=${API_KEY}&user_id=${userId}&cp_ensemble=true&details=true&duplicates=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link"]&mad_uuid=${mad_UUID}&num_results=[5]&require_source=true&widget_list=[20]`,
              recommendationUrl: recommendation,
            };
          } else {
            AIStylePicksList.current = {};
          }
        } else {
          RecommendedWidgetsList.current = {};
          AIStylePicksList.current = {};
        }
        return (
          <div>
            <RecommendedPdtsContainer
              recommendedWidgetList={RecommendedWidgetsList.current}
            >
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading } = context;
                  const CarouselTitle =
                    HeaderVueContent && HeaderVueContent.discover
                      ? HeaderVueContent.discover
                      : {};
                  return carouselTobeRendered.map((listKey, key) => {
                    return !loading &&
                      context[listKey] &&
                      context[listKey].length ? (
                        <ProductRecommendationWrapper
                          key={`Home Carousel ${key}`}
                        >
                          <ProductRecommendationTitle>
                            {CarouselTitle[listKey]}
                          </ProductRecommendationTitle>
                          <ProductCarousel
                            isFromCarouselWithTabs={true}
                            list={context[listKey] || []}
                            hideMSDOntology={true}
                            sliderPerGroup={4}
                            loading={loading}
                            showBuyButton={false}
                            showWishlistButton={false}
                            type={context.config.cardType}
                            imageLink={context.config.imageLink}
                          />
                        </ProductRecommendationWrapper>
                      ) : (
                        <ProductRecommendationWrapper
                          key={`Home Carousel ${key}`}
                        >
                          <ProductCarousel
                            isFromCarouselWithTabs={true}
                            loading={loading}
                            sliderPerGroup={4}
                            type={context.config.cardType}
                            imageLink={context.config.imageLink}
                          />
                        </ProductRecommendationWrapper>
                      );
                  });
                }}
              </RecommendedPdtsConsumer>
            </RecommendedPdtsContainer>
            <RecommendedPdtsContainer
              recommendedWidgetList={AIStylePicksList.current}
            >
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading } = context;
                  const CarouselTitle = "AI Style Picks For You";
                  return aiStylePickToBeRendered.map((listKey, key) => {
                    if ("20" in context) {
                      const StyleLookArr = JSON.parse(
                        JSON.stringify(context[listKey])
                      );
                      let defaultLookContainer = [];
                      StyleLookArr.map((styles, key) => {
                        defaultLookContainer.push({
                          value: `Style-${key + 1}`,
                          index: key.toString(),
                        });
                        return styles;
                      });
                      return !loading &&
                        context[listKey] &&
                        context[listKey].length ? (
                          <ProductRecommendationWrapper
                            key={`Home Carousel ${key}`}
                          >
                            <ProductRecommendationTitle>
                              {CarouselTitle}
                            </ProductRecommendationTitle>
                            <ProductCarouselWithTabs
                              isFromCarouselWithTabs={true}
                              tabsContainer={defaultLookContainer}
                              activeIndex="0"
                              recommendedData={StyleLookArr}
                              sliderPerGroup={3}
                              loading={loading}
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                            />
                          </ProductRecommendationWrapper>
                        ) : (
                          <ProductRecommendationWrapper
                            key={`Home Carousel ${key}`}
                          >
                            <ProductCarousel
                              isFromCarouselWithTabs={true}
                              loading={loading}
                              sliderPerGroup={5}
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                            />
                          </ProductRecommendationWrapper>
                        );
                    }
                  });
                }}
              </RecommendedPdtsConsumer>
            </RecommendedPdtsContainer>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export { RenderWishlistItems, ProductRecommendationSection };
