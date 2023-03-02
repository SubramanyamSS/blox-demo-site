import React, { useState, useEffect, useRef } from "react";
import { Item, Button } from "semantic-ui-react";
import {
  DiscoverConsumer,
  ConfigConsumer,
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
  CompleteYourCartContainer,
  CompleteYourCartConsumer,
} from "../../container";
import { getCookie } from "../../common";
import { HeaderVueContent } from "../../configs";
import {
  ListElement,
  CardBlock,
  ProductCarousel,
  ProductCarouselWithTabs,
  Input,
} from "../../component";
import {
  NoItemsMessage,
  ParentWrapper,
  ProductWrapper,
  CardWrapper,
  DescriptionWrapper,
  DescriptionChildWrapper,
  ButtonWrapper,
  DeliveryWrapper,
  StyledLink,
  ProductRecommendationWrapper,
  ProductRecommendationTitle,
} from "./styled";
import { HeaderConfigConsumer } from "../../container";

const buyNow = (context) => {
  let endPoint = `${context.url}/push_events_to_mcpd`
  const apiKey = context.API_KEY;
  const userId = context.user_id;
  const event = "buy";
  const madUUID = getCookie("mad_UUID");
  const productIds = JSON.parse(localStorage.getItem("cart_items"));
  const clientName = context.client_name;
  if (clientName == "2352_shopchannel") {
    endPoint = "https://ap-southeast-1-client-staging.madstreetden.com/push_events_to_mcpd"
  }
  let productsArray = [];
  for (let key in productIds) {
    productsArray.push(key);
  }
  productsArray = JSON.stringify(productsArray);
  const postData = `api_key=${apiKey}&user_id=${userId}&event=${event}&mad_uuid=${madUUID}&product_id=${productsArray}`;
  fetch(
    endPoint,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: postData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      window.location.href = "/order_confirmation";
    })
    .catch((err) => console.log("Buy event error", err));
};

const clear_cart = (update_items_to_display) => {
  localStorage.removeItem("cart_items");
  update_items_to_display([]);
};

const RenderCartItems = (props) => {
  const calculateTotal = (cartProducts) => {
    const productsInCart = Object.keys(cartProducts);
    if (productsInCart.length > 0) {
      return productsInCart.reduce((acc, item) => {
        return acc + cartProducts[item].price;
      }, 0);
    } else {
      return 0;
    }
  };

  const removeProduct = (
    id,
    updateCartPdtCount,
    cartProducts,
    updateCartPdt
  ) => {
    let cartProductsCopy = { ...cartProducts };

    Object.keys(cartProductsCopy).forEach((key) => {
      if (key == id) {
        delete cartProductsCopy[key];
        updateCartPdt({ cartProducts: cartProductsCopy });
      }
    });

    let all_items_in_cart = localStorage.getItem("cart_items");
    if (
      all_items_in_cart != undefined &&
      all_items_in_cart != "" &&
      all_items_in_cart != "{}"
    ) {
      all_items_in_cart = JSON.parse(all_items_in_cart);
      for (let key in all_items_in_cart) {
        if (key == id) {
          delete all_items_in_cart[id];
          localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
          updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
        }
      }
    }
  };

  return (
    <HeaderConfigConsumer>
      {(context) => {
        const cartProducts = context[2].cartProducts;
        const { updateCartPdt } = context[2];
        const { count } = context[0];
        return (
          <div>
            <ParentWrapper>
              <ProductWrapper>
                <h3 style={{ color: "#191e50" }}>{`Your cart (${count})`}</h3>
                {Object.keys(cartProducts).map((key) => (
                  <div>
                    <CardWrapper>
                      <div
                        style={{
                          width: "140px",
                          height: "125px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={cartProducts[key].image_link}
                          style={{
                            height: "auto",
                            maxHeight: "125px",
                            width: "auto",
                            maxWidth: "130px",
                          }}
                        />
                      </div>
                      <DescriptionWrapper>
                        <DescriptionChildWrapper>
                          <div style={{ display: "flex", flex: 2.5 }}>
                            {cartProducts[key].title}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flex: 0.5,
                              justifyContent: "flex-end",
                            }}
                          >
                            {cartProducts[key].price
                              ? `$ ${cartProducts[key].price}`
                              : `$ 0`}
                          </div>
                        </DescriptionChildWrapper>
                        <HeaderConfigConsumer>
                          {(context) => {
                            const { updateCartPdtCount } = context[0];
                            return (
                              <ButtonWrapper
                                onClick={() =>
                                  removeProduct(
                                    key,
                                    updateCartPdtCount,
                                    cartProducts,
                                    updateCartPdt
                                  )
                                }
                              >
                                REMOVE
                              </ButtonWrapper>
                            );
                          }}
                        </HeaderConfigConsumer>
                      </DescriptionWrapper>
                    </CardWrapper>
                  </div>
                ))}
              </ProductWrapper>
              {count > 0 ? (
                <div
                  style={{
                    width: "25%",
                    height: "210px",
                    marginLeft: "5%",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      marginRight: "15%",
                      padding: "20px",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <h3 style={{ color: "#191e50" }}>Total</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "25px",
                        alignItems: "center",
                        color: "#191e50",
                        fontFamily: "SourceSansPro-Regular",
                        fontSize: "14px",
                      }}
                    >
                      <div>Subtotal</div>
                      <div>$ {calculateTotal(cartProducts)}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "30px",
                        alignItems: "center",
                        color: "#191e50",
                        fontFamily: "SourceSansPro-Regular",
                        fontSize: "14px",
                      }}
                    >
                      <div>Delivery</div>
                      <div>Free</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "30px",
                        alignItems: "center",
                        borderTopWidth: "1px",
                        borderTopColor: "black",
                        borderTopStyle: "solid",
                        marginTop: "5px",
                        color: "#191e50",
                        fontFamily: "SourceSansPro-Regular",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      <div>Total (VAT included)</div>
                      <div>$ {calculateTotal(cartProducts)}</div>
                    </div>
                    <ConfigConsumer>
                      {(context) => {
                        return (
                          <StyledLink onClick={() => buyNow(context)}>
                            BUY NOW
                          </StyledLink>
                        );
                      }}
                    </ConfigConsumer>
                  </div>
                </div>
              ) : null}
            </ParentWrapper>
            <DeliveryWrapper>
              <h3>Estimated delivery</h3>
              <p>August 25, 2020 - August 28, 2020</p>
            </DeliveryWrapper>
          </div>
        );
      }}
    </HeaderConfigConsumer>
  );
};

const ProductRecommendationSection = (props) => {
  const RecommendedWidgetsList = useRef({});
  const AIStylePicksList = useRef({});

  return (
    <ConfigConsumer>
      {(context) => {
        const { user_id, discover, config } = context;
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
        let clientName = localStorage.getItem("userConfig");
        clientName = JSON.parse(clientName).client_name;
        return (
          <div>
            {clientName == "2321_grocery-demo" || clientName == "2352_shopchannel" ? (
              <CompleteYourCartContainer>
                <CompleteYourCartConsumer>
                  {(context) => {
                    return context && context.length ? (
                      <ProductRecommendationWrapper>
                        <ProductRecommendationTitle>
                          Previously Bought Products
                        </ProductRecommendationTitle>
                        <ProductCarousel
                          isFromCarouselWithTabs={true}
                          list={context || []}
                          hideMSDOntology={true}
                          sliderPerGroup={config?.styleConfig?.card?.cards_per_row}
                          buyButtonStateChange={false}
                          // loading={loading}
                          showBuyButton={true}
                          showWishlistButton={false}
                          styleConfig={config?.styleConfig}
                        />
                      </ProductRecommendationWrapper>
                    ) : null;
                  }}
                </CompleteYourCartConsumer>
              </CompleteYourCartContainer>
            ) : null}

            <RecommendedPdtsContainer
              recommendedWidgetList={RecommendedWidgetsList.current}
            >
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading, config } = context;
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
                        styleConfig={config?.styleConfig}
                      >
                        <ProductRecommendationTitle>
                          {CarouselTitle[listKey]}
                        </ProductRecommendationTitle>
                        <ProductCarousel
                          isFromCarouselWithTabs={true}
                          list={context[listKey] || []}
                          hideMSDOntology={true}
                          sliderPerGroup={config?.styleConfig?.card?.cards_per_row}
                          loading={loading}
                          buyButtonStateChange={false}
                          showBuyButton={true}
                          showWishlistButton={false}
                          styleConfig={config?.styleConfig}
                        />
                      </ProductRecommendationWrapper>
                    ) : (
                      <ProductRecommendationWrapper
                        key={`Home Carousel ${key}`}
                      >
                        <ProductCarousel
                          isFromCarouselWithTabs={true}
                          loading={loading}
                          sliderPerGroup={config?.styleConfig?.card?.cards_per_row}
                          styleConfig={config?.styleConfig}
                        />
                      </ProductRecommendationWrapper>
                    );
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

export { RenderCartItems, ProductRecommendationSection };
