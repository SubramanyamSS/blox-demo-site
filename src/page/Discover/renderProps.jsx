import React, { useRef, useState, useEffect } from "react";
import { Icon, Modal, Button, Select, Loader } from "semantic-ui-react";
import {
  DiscoverConsumer,
  ConfigConsumer,
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
  PlayerConsumer,
  CategoryListConsumer,
  CategoryListContainer,
} from "../../container";
import {
  ListElement,
  CardBlock,
  ProductCarousel,
  ProductCarouselWithTabs,
} from "../../component";
import {
  UseCase,
  ErrorMsg,
  RecosWrapper,
  UseCaseWrapper,
  ToggleContainer,
  UseCaseContainer,
  ThemeDropdownWrapper,
  ProductRecommendationWrapper,
  ProductRecommendationTitle,
} from "./styled";
import VideoPlayer from "../../component/molecule/VideoPlayer";
import { getCookie } from "../../common";
import { HeaderVueContent } from "../../configs";
import { fallBack } from "./DiscoverConfigs";
import productDetailsConfig from "../ProductDetails/productDetailsConfig";
import { cardStyleConfig } from "../../styleConfig";
// import { } from "../VueFind/renderProps";
import useCases from "./usecases";

const RenderProductDetailsModal = (props) => {
  const [isChecked, updateCheckbox] = useState(false);
  const toggleCheckbox = () => updateCheckbox(!isChecked);

  return (
    <>
      <RecommendedPdtsConsumer>
        {(context) => {
          const { loading } = context;
          return (
            <RecosWrapper>
              {loading ? (
                <Loader active inline="centered" size="big" />
              ) : (
                <>
                  <ToggleContainer>
                    <div
                      style={{
                        display: "flex",
                        width: "95%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button.Group>
                        <Button
                          onClick={toggleCheckbox}
                          color={isChecked ? null : "blue"}
                        >
                          Personalised Recommendations
                        </Button>
                        <Button
                          onClick={toggleCheckbox}
                          color={isChecked ? "blue" : null}
                        >
                          Similar Recommendations
                        </Button>
                      </Button.Group>
                    </div>
                  </ToggleContainer>
                  {isChecked ? (
                    <DiscoverConsumer>
                      {(discoverContext) => {
                        const styleConfig =
                          discoverContext?.discover?.styleConfig ||
                          cardStyleConfig;
                        return (
                          <ProductCarousel
                            list={context["0_disableBundit"] || []}
                            sliderPerGroup={styleConfig.card?.cards_per_row}
                            loading={loading}
                            initialSlide={0}
                            force_debug={false}
                            showBuyButton={true}
                            showWishlistButton={true}
                            isFashionUser={props.isFashionUser}
                            isGroceryUser={props.isGroceryUser}
                            type={context.config.cardType}
                            imageLink={context.config.imageLink}
                            styleConfig={styleConfig}
                          />
                        );
                      }}
                    </DiscoverConsumer>
                  ) : (
                    <DiscoverConsumer>
                      {(discoverContext) => {
                        const styleConfig =
                          discoverContext?.discover?.styleConfig ||
                          cardStyleConfig;
                        return (
                          <ProductCarousel
                            list={context["0_enableBundit"] || []}
                            sliderPerGroup={styleConfig.card?.cards_per_row}
                            loading={loading}
                            initialSlide={0}
                            force_debug={false}
                            showBuyButton={true}
                            showWishlistButton={true}
                            isFashionUser={props.isFashionUser}
                            isGroceryUser={props.isGroceryUser}
                            type={context.config.cardType}
                            imageLink={context.config.imageLink}
                            styleConfig={styleConfig}
                          />
                        );
                      }}
                    </DiscoverConsumer>
                  )}
                </>
              )}
            </RecosWrapper>
          );
        }}
      </RecommendedPdtsConsumer>
    </>
  );
};

const RenderOccassionsDropdown = (props) => {
  const {
    displayOccasion,
    AllOccasionDetails,
    updateDisplayOccasion,
    updateOccasionStyleData,
  } = props;
  const changeOccassion = (event, { value }) => {
    updateDisplayOccasion(value);
    for (let each_occasion in AllOccasionDetails) {
      if (AllOccasionDetails[each_occasion]["value"] === value) {
        updateOccasionStyleData(
          AllOccasionDetails[each_occasion]["StyleLookArr"]
        );
      }
    }
  };
  return (
    <>
      <RecommendedPdtsConsumer>
        {(context) => {
          return (
            <>
              {AllOccasionDetails && displayOccasion ? (
                <ThemeDropdownWrapper>
                  <Select
                    onChange={changeOccassion}
                    options={AllOccasionDetails}
                    placeholder="Select occassion"
                    defaultValue={displayOccasion}
                  />
                </ThemeDropdownWrapper>
              ) : null}
            </>
          );
        }}
      </RecommendedPdtsConsumer>
    </>
  );
};

const RenderStyleItWithModal = (props) => {
  const renderer = useRef(false);
  const [displayOccasion, updateDisplayOccasion] = useState("");
  const [OccasionStyleData, updateOccasionStyleData] = useState([]);
  const [AllOccasionDetails, updateAllOccasionDetails] = useState([]);
  const [hasOnlyOccasionName, updateHasOnlyOccasionName] = useState([]);

  if (!renderer.current) {
    const slider = document
      .getElementById("styleitwith")
      ?.querySelector(".slick-list");
    if (slider) {
      slider.style.margin = "auto";
      slider.style.display = "flex";
      slider.querySelector(".slick-track").style.display = "inline-flex";
      renderer.current = true;
    }
  }

  const getLoaderOrMessage = (loading) => {
    let el = null;
    if (loading && !AllOccasionDetails.length) {
      el = <Loader active inline="centered" size="big" />;
    } else if (!loading && !AllOccasionDetails.length) {
      el = (
        <>
          <ErrorMsg>
            <Icon name="info circle" /> No Results Available
          </ErrorMsg>
        </>
      );
    }
    return el;
  };

  return (
    <>
      <RecommendedPdtsConsumer>
        {(context) => {
          const { loading, discover } = context;
          let each_occassion = "";
          let defaultLookContainer = [];
          if (context["9"]) {
            let outfit_arr = context["9"];
            for (let each_collection in outfit_arr) {
              defaultLookContainer = [];
              let StyleLookArr = [];
              let outfit_object = outfit_arr[each_collection];
              Object.keys(outfit_object).forEach((each_value) => {
                each_occassion = each_value;
                StyleLookArr = outfit_object[each_value];
              });
              StyleLookArr.map((styles, key) => {
                defaultLookContainer.push({
                  value: `Style ${key + 1}`,
                  index: key.toString(),
                });
                return styles;
              });
              if (each_collection === "0" && hasOnlyOccasionName.length === 0) {
                updateDisplayOccasion(each_occassion);
                updateOccasionStyleData(StyleLookArr);
              }
              if (
                each_occassion === "collection_1106" &&
                hasOnlyOccasionName.indexOf(each_occassion) === -1
              ) {
                hasOnlyOccasionName.push(each_occassion);
                AllOccasionDetails.push({
                  key: each_occassion,
                  value: each_occassion,
                  StyleLookArr: StyleLookArr,
                  text: "Global_Women_Collection_01",
                });
              } else if (
                each_occassion === "collection_1107" &&
                hasOnlyOccasionName.indexOf(each_occassion) === -1
              ) {
                hasOnlyOccasionName.push(each_occassion);
                AllOccasionDetails.push({
                  key: each_occassion,
                  value: each_occassion,
                  StyleLookArr: StyleLookArr,
                  text: "Global_Women_Collection_02",
                });
              } else if (
                each_occassion === "collection_1110" &&
                hasOnlyOccasionName.indexOf(each_occassion) === -1
              ) {
                hasOnlyOccasionName.push(each_occassion);
                AllOccasionDetails.push({
                  key: each_occassion,
                  value: each_occassion,
                  text: "Global_Men_Collection_01",
                  StyleLookArr: StyleLookArr,
                });
              } else if (hasOnlyOccasionName.indexOf(each_occassion) === -1) {
                hasOnlyOccasionName.push(each_occassion);
                let occasion_text = each_occassion;
                AllOccasionDetails.push({
                  text: occasion_text,
                  key: each_occassion,
                  value: each_occassion,
                  StyleLookArr: StyleLookArr,
                });
              }
            }
          } else if (loading && hasOnlyOccasionName.length !== 0) {
            updateHasOnlyOccasionName([]);
            updateAllOccasionDetails([]);
          }
          return (
            <RecosWrapper>
              {loading || !AllOccasionDetails.length ? (
                getLoaderOrMessage(loading)
              ) : (
                <>
                  <RenderOccassionsDropdown
                    displayOccasion={displayOccasion}
                    AllOccasionDetails={AllOccasionDetails}
                    updateDisplayOccasion={updateDisplayOccasion}
                    updateOccasionStyleData={updateOccasionStyleData}
                  />
                  <ProductCarouselWithTabs
                    activeIndex="0"
                    loading={loading}
                    sliderPerGroup={4}
                    is_style_it={true}
                    showBuyButton={true}
                    // showBuyButton={false}
                    isFashionUser={props.isFashionUser}
                    isGroceryUser={props.isGroceryUser}
                    showWishlistButton={true}
                    recommendedData={OccasionStyleData}
                    tabsContainer={defaultLookContainer}
                    styleConfig={discover?.styleConfig}
                  />
                </>
              )}
            </RecosWrapper>
          );
        }}
      </RecommendedPdtsConsumer>
    </>
  );
};

const DiscoverItemBlock = (props) => {
  let isFashionUser = true;
  let isGroceryUser = false;
  let widgetRender = useRef(false);
  const [currWidget, updateWidget] = useState({});
  const [widgetList, updateWidgetList] = useState([]);
  const [styledProducts, toggleStyledProducts] = useState(null);
  const [similarProducts, toggleSimilarProducts] = useState(null);

  const closeModal = () => {
    toggleStyledProducts(null);
    toggleSimilarProducts(null);
    widgetRender.current = false;
  };

  useEffect(() => {
    if (widgetList && widgetList.length) {
      let _widget = widgetList[0];
      _widget.postBody = { ..._widget.postBody };
      updateWidget(_widget);
      let new_widget_list = widgetList.slice(1);
      updateWidgetList(new_widget_list);
    }
  }, [widgetList]);

  return (
    <ConfigConsumer>
      {(context) => {
        isFashionUser = context?.client_name === "2253_yoox-poc";
        isGroceryUser = context?.client_name === "2321_grocery-demo";
        const vuefindConfig = context?.vue_find;
        if (
          (similarProducts || styledProducts) &&
          !widgetRender.current &&
          widgetList.length === 0
        ) {
          let widget_arr = [];
          let API_KEY = context.API_KEY;
          const { productDetails, user_id } = context;
          if (productDetails.vueX && productDetails.VUEX_API_KEY) {
            API_KEY = productDetails.VUEX_API_KEY;
          } else if (productDetails.API_KEY) {
            API_KEY = productDetails.API_KEY;
          }
          const mad_UUID = getCookie("mad_UUID");
          let userId = localStorage.getItem("userId");
          if (!userId) {
            userId = user_id;
          }
          const endPoint = productDetails.endPoint;
          let baseEndPoint = context.url;
          if (endPoint) {
            baseEndPoint = endPoint;
          }
          const baseParams = {
            user_id: userId,
            api_key: API_KEY,
            mad_uuid: mad_UUID,
          };
          const config = productDetails || {};
          const isVueX = config.vueX || false;
          const widgetPayload =
            (config.widgetPayload &&
              config.widgetPayload[isVueX ? "vueX" : "vueApp"]) ||
            productDetailsConfig;
          if (similarProducts) {
            const {
              similarRecommendation,
              personalizedRecommendation,
            } = productDetails;
            widget_arr = [
              {
                configName: "discover",
                widgetList: ["0_disableBundit"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [0],
                  product_id: similarProducts,
                },
                recommendationUrl: `${widgetPayload.robinUrl || baseEndPoint}${isVueX ? "/widgets" : similarRecommendation
                  }`,
              },
              {
                configName: "discover",
                widgetList: ["0_enableBundit"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [0],
                  product_id: similarProducts,
                },
                recommendationUrl: `${widgetPayload.robinUrl || baseEndPoint}${isVueX ? "/widgets" : personalizedRecommendation
                  }`,
              },
            ];
          } else if (styledProducts) {
            let occasion_list = [];
            let products_per_outfit = 3;
            let vuestyle_num_results = 4;
            let vuestyle_endpoint = baseEndPoint;
            const { vuestyleDetails } = context;
            if (vuestyleDetails) {
              if (vuestyleDetails.occasion_list) {
                occasion_list = vuestyleDetails.occasion_list.replace(/'/g, "");
              }
              if (vuestyleDetails.vuestyle_endpoint) {
                vuestyle_endpoint = vuestyleDetails.vuestyle_endpoint;
              }
              if (vuestyleDetails.num_results) {
                vuestyle_num_results = vuestyleDetails.num_results;
              }
              if (vuestyleDetails.products_per_outfit) {
                products_per_outfit = vuestyleDetails.products_per_outfit;
              }
            }
            if (context.client_name === "2253_yoox-poc") {
              occasion_list =
                '["collection_1106","collection_1107","collection_1110"]';
            } else if (context.client_name === "2239_rtd6") {
              occasion_list = '["collection_1227"]';
              products_per_outfit = 5;
            }
            const base = {
              configName: "discover",
              widgetList: ["9"],
              // The post body will be converted to required request payload format in the fetch method
              postBody: {
                ...baseParams,
                widget_list: [9],
                product_id: styledProducts,
              },
              recommendationUrl: `${widgetPayload.robinUrl ||
                vuestyle_endpoint}${isVueX ? "/widgets" : "/vuestyle/widgets"}`,
            };
            if (isVueX) {
              widget_arr.push({
                ...base,
                postBody: { ...base.postBody, occasions_list: occasion_list },
              });
            } else {
              widget_arr.push({
                ...base,
                postBody: {
                  ...base.postBody,
                  occasions: occasion_list,
                  num_results: vuestyle_num_results,
                  products_per_outfit: products_per_outfit,
                },
              });
            }
          }
          widgetRender.current = true;
          updateWidgetList(widget_arr);
        }

        return (
          <>
            {props.isFromDiscoverPage && (
              <DiscoverConsumer>
                {(discoverContext) => {
                  const styleConfig =
                    discoverContext?.discover?.styleConfig || cardStyleConfig;
                  const styleForIcons = discoverContext?.vue_find?.styleConfig
                    ?.card
                    ? discoverContext.vue_find.styleConfig.card
                    : undefined;

                  return (
                    <ListElement
                      list={discoverContext.data || []}
                      ItemEl={CardBlock}
                      currPage={props.currPage}
                      hidePrice={true}
                      hideMSDOntology={true}
                      showBuyButton={
                        styleForIcons
                          ? styleForIcons.showAddToCartButton
                          : cardStyleConfig.card.showAddToCartButton
                      }
                      showWishlistButton={
                        styleForIcons
                          ? styleForIcons.showWishListButton
                          : cardStyleConfig.card.showWishListButton
                      }
                      showSITButton={styleConfig?.card?.showSITButton != undefined ? styleConfig?.card?.showSITButton : true}
                      showMoreLikeThisButton={styleConfig?.card?.showMoreLikeThisButton != undefined ? styleConfig?.card?.showMoreLikeThisButton : true}
                      isFashionUser={isFashionUser}
                      isGroceryUser={isGroceryUser}
                      config={discoverContext.config}
                      metaData={
                        styleConfig?.card?.metaData
                      }
                      showMetaData={
                        styleConfig?.card?.show_meta_data
                      }
                      showStyledProducts={toggleStyledProducts}
                      showSimilarProducts={toggleSimilarProducts}
                      styleConfig={styleConfig}
                      itemsPerRow={styleConfig.card?.cards_per_row}
                      isNotFromDiscoverPage={!props.isFromDiscoverPage}
                      facets={props.facets}
                    />
                  );
                }}
              </DiscoverConsumer>
            )}

            {/* CLP rendering block*/}
            {!props.isFromDiscoverPage && (
              <ListElement
                list={props.data || []}
                ItemEl={CardBlock}
                currPage={props.currPage}
                hidePrice={true}
                hideMSDOntology={true}
                showBuyButton={
                  vuefindConfig?.styleConfig
                    ? vuefindConfig?.styleConfig?.card?.showAddToCartButton
                    : cardStyleConfig.card.showAddToCartButton
                }
                showWishlistButton={
                  vuefindConfig?.styleConfig
                    ? vuefindConfig?.styleConfig?.card?.showWishListButton
                    : cardStyleConfig.card.showWishListButton
                }
                showSITButton={vuefindConfig?.styleConfig?.card?.showSITButton}
                showFeedbackButton={
                  vuefindConfig?.styleConfig?.card?.showFeedbackButton
                }
                showMoreLikeThisButton={
                  vuefindConfig?.styleConfig?.card?.showMoreLikeThisButton
                }
                config={props.config}
                isFashionUser={isFashionUser}
                isGroceryUser={isGroceryUser}
                showStyledProducts={toggleStyledProducts}
                showSimilarProducts={toggleSimilarProducts}
                styleConfig={vuefindConfig?.styleConfig || cardStyleConfig}
                itemsPerRow={
                  vuefindConfig?.styleConfig?.card?.cards_per_row ||
                  cardStyleConfig.card?.cards_per_row
                }
                isNotFromDiscoverPage={!props.isFromDiscoverPage}
                metaData={
                  vuefindConfig?.styleConfig?.card?.metaData ||
                  cardStyleConfig.card.metaData
                }
                showMetaData={
                  vuefindConfig?.styleConfig?.card?.show_meta_data !==
                    undefined ||
                    vuefindConfig?.styleConfig?.card?.show_meta_data !== null
                    ? vuefindConfig?.styleConfig?.card?.show_meta_data
                    : cardStyleConfig.styleConfig.card.show_meta_data
                }
                facets={props.facets}
              />
            )}

            {similarProducts && (
              <RecommendedPdtsContainer
                fallBack={productDetailsConfig}
                recommendedWidgetList={currWidget}
              >
                <Modal
                  closeIcon
                  size="large"
                  centered={false}
                  onClose={closeModal}
                  closeOnDimmerClick={false}
                  open={similarProducts !== null}
                >
                  <Modal.Header>More Like This</Modal.Header>
                  <Modal.Content
                    style={{ width: "96%", margin: "auto", minHeight: "300px" }}
                  >
                    <RenderProductDetailsModal
                      isFashionUser={isFashionUser}
                      isGroceryUser={isGroceryUser}
                    />
                  </Modal.Content>
                </Modal>
              </RecommendedPdtsContainer>
            )}
            {styledProducts && (
              <RecommendedPdtsContainer
                fallBack={productDetailsConfig}
                recommendedWidgetList={currWidget}
              >
                <Modal
                  closeIcon
                  size="large"
                  id="styleitwith"
                  centered={false}
                  onClose={closeModal}
                  closeOnDimmerClick={false}
                  open={styledProducts !== null}
                >
                  <Modal.Header>
                    {isFashionUser ? "Style It With" : "Complete Your Purchase"}
                  </Modal.Header>
                  <Modal.Content
                    style={{ width: "96%", margin: "auto", minHeight: "300px" }}
                  >
                    <RenderStyleItWithModal
                      isFashionUser={isFashionUser}
                      isGroceryUser={isGroceryUser}
                    />
                  </Modal.Content>
                </Modal>
              </RecommendedPdtsContainer>
            )}
          </>
        );
      }}
    </ConfigConsumer>
  );
};

const RedirectToCLP = () => {
  const rendered = useRef(false);
  return (
    <CategoryListContainer>
      <CategoryListConsumer>
        {(context) => {
          const menuItems = context;
          if (!rendered.current && menuItems && Object.keys(menuItems).length) {
            rendered.current = true;
            window.location.href = `vuefind/category?filters=ontology=${Object.keys(menuItems)[0]
              }`;
          }
          return <></>;
        }}
      </CategoryListConsumer>
    </CategoryListContainer>
  );
};

const RenderUseCases = () => {
  let selected = useRef(1);
  const [uiState, triggerUI] = useState(1);
  const [currentCard, updateCard] = useState(1);
  return (
    <>
      {selected.current === 4 && <RedirectToCLP />}
      <UseCaseContainer>
        <ConfigConsumer>
          {(context) => {
            const useCaseConfig = context?.discover?.use_cases;
            return (
              <>
                {useCases.map((useCase) =>
                  (useCaseConfig !== undefined && useCaseConfig !== null ? (
                    useCaseConfig[useCase.id]
                  ) : (
                    useCase.active
                  )) ? (
                    <UseCaseWrapper key={useCase.id}>
                      <UseCase
                        onMouseEnter={() => {
                          updateCard(useCase.id);
                        }}
                        onMouseLeave={() => {
                          if (currentCard !== selected.current) {
                            updateCard(selected.current);
                          }
                        }}
                        onClick={() => {
                          if (useCase.externalLink) {
                            window.open(useCase.externalLink);
                          } else {
                            selected.current = useCase.id;
                            triggerUI(Math.random());
                            updateCard(useCase.id);
                          }
                        }}
                        className={
                          useCase.id === selected.current ? "highlight" : ""
                        }
                      >
                        <i
                          style={{
                            color:
                              useCase.id === selected.current ? "#2962ff" : "",
                          }}
                          className={`icon icon-${useCase.icon}`}
                        />
                        <h3
                          style={{
                            color:
                              useCase.id === selected.current ? "#2962ff" : "",
                          }}
                        >
                          {useCase.header}
                        </h3>
                        <p>{useCase.description}</p>
                      </UseCase>
                    </UseCaseWrapper>
                  ) : null
                )}
              </>
            );
          }}
        </ConfigConsumer>
      </UseCaseContainer>
    </>
  );
};

const ProductRecommendationSection = (props) => {
  let isFashionUser = true;
  let isGroceryUser = false;
  const render = useRef(false);
  const widgetRender = useRef(false);
  const AIStylePicksList = useRef({});
  const RecommendedWidgetsList = useRef({});
  const [currWidget, updateWidget] = useState({});
  const [widgetList, updateWidgetList] = useState([]);
  const [styledProducts, toggleStyledProducts] = useState(null);
  const [similarProducts, toggleSimilarProducts] = useState(null);

  const closeModal = () => {
    toggleStyledProducts(null);
    toggleSimilarProducts(null);
    widgetRender.current = false;
  };

  useEffect(() => {
    if (widgetList && widgetList.length) {
      let _widget = widgetList[0];
      _widget.postBody = { ..._widget.postBody };
      updateWidget(_widget);
      let new_widget_list = widgetList.slice(1);
      updateWidgetList(new_widget_list);
    }
  }, [widgetList]);

  return (
    <ConfigConsumer>
      {(context) => {
        const { user_id, discover, config, client_name } = context;
        isFashionUser = client_name === "2253_yoox-poc";
        isGroceryUser = client_name === "2321_grocery-demo";
        let API_KEY = context.API_KEY;
        let aiStyleEnabled = false;
        if (discover && discover.aiStyleEnabled) {
          aiStyleEnabled = true;
        }
        let url = context.url;
        if (discover?.API_KEY) {
          API_KEY = discover.API_KEY;
        }
        let userId = localStorage.getItem("userId");
        if (!userId) {
          userId = user_id;
        }
        let carouselTobeRendered = [7, 1, 11, 3, 27];
        let aiStylePickToBeRendered = [20];
        const mad_UUID = getCookie("mad_UUID");
        const recommendation =
          discover && discover.recommendation
            ? discover.recommendation
            : url + "/widgets";
        if (!render.current) {
          render.current = true;
          if (API_KEY && userId && mad_UUID && recommendation) {
            const config = context.discover || {};
            const isVueX = config.vueX || false;
            let baseEndPoint = context.url;
            const widgetPayload =
              (config.widgetPayload &&
                config.widgetPayload[isVueX ? "vueX" : "vueApp"]) ||
              fallBack;
            RecommendedWidgetsList.current = {
              configName: "discover",
              widgetList: ["7", "1", "11", "3", "13"],
              // The post body will be converted to required request payload format in the fetch method
              postBody: {
                api_key: API_KEY,
                user_id: userId,
                mad_uuid: mad_UUID,
                widget_list: [7, 1, 11, 3, 13],
              },
              recommendationUrl: `${widgetPayload.robinUrl || url}/widgets`,
            };
            if (aiStyleEnabled) {
              AIStylePicksList.current = {
                widgetList: ["20"],
                postBody: `api_key=${API_KEY}&user_id=${userId}&cp_ensemble=true&details=true&duplicates=true&is_from_demo_site=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link","brand"]&mad_uuid=${mad_UUID}&num_results=[5]&require_source=true&widget_list=[20]`,
                recommendationUrl: recommendation,
              };
            } else {
              AIStylePicksList.current = {};
            }
          } else {
            RecommendedWidgetsList.current = {};
            AIStylePicksList.current = {};
          }
        }
        if (
          (similarProducts || styledProducts) &&
          !widgetRender.current &&
          widgetList.length === 0
        ) {
          let widget_arr = [];
          const { productDetails } = context;
          const _config = productDetails || {};
          const _isVueX = _config.vueX || false;
          const _widgetPayload =
            (_config.widgetPayload &&
              _config.widgetPayload[_isVueX ? "vueX" : "vueApp"]) ||
            productDetailsConfig;
          const {
            similarRecommendation,
            personalizedRecommendation,
            endPoint,
          } = productDetails;
          if (productDetails.vueX && productDetails.VUEX_API_KEY) {
            API_KEY = productDetails.VUEX_API_KEY;
          } else if (productDetails.API_KEY) {
            API_KEY = productDetails.API_KEY;
          }
          let _baseEndPoint = context.url;
          if (endPoint) {
            _baseEndPoint = endPoint;
          }
          const baseParams = {
            user_id: userId,
            api_key: API_KEY,
            mad_uuid: mad_UUID,
          };
          if (similarProducts) {
            widget_arr = [
              {
                configName: "productDetails",
                widgetList: ["0_disableBundit"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [0],
                  product_id: similarProducts,
                },
                recommendationUrl: `${_widgetPayload.robinUrl ||
                  _baseEndPoint}${_isVueX ? "/widgets" : similarRecommendation
                  }`,
              },
              {
                configName: "productDetails",
                widgetList: ["0_enableBundit"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [0],
                  product_id: similarProducts,
                },
                recommendationUrl: `${_widgetPayload.robinUrl ||
                  _baseEndPoint}${_isVueX ? "/widgets" : personalizedRecommendation
                  }`,
              },
            ];
          } else if (styledProducts) {
            let occasion_list = [];
            let products_per_outfit = 3;
            let vuestyle_num_results = 4;
            let vuestyle_endpoint = _baseEndPoint;
            const { vuestyleDetails } = context;
            if (vuestyleDetails) {
              if (vuestyleDetails.occasion_list) {
                occasion_list = vuestyleDetails.occasion_list.replace(/'/g, "");
              }
              if (vuestyleDetails.vuestyle_endpoint) {
                vuestyle_endpoint = vuestyleDetails.vuestyle_endpoint;
              }
              if (vuestyleDetails.num_results) {
                vuestyle_num_results = vuestyleDetails.num_results;
              }
              if (vuestyleDetails.products_per_outfit) {
                products_per_outfit = vuestyleDetails.products_per_outfit;
              }
              if (context.client_name === "2253_yoox-poc") {
                occasion_list =
                  '["collection_1106","collection_1107","collection_1110"]';
              } else if (context.client_name === "2239_rtd6") {
                occasion_list = '["collection_1227"]';
                products_per_outfit = 5;
              }
            }
            if (_isVueX) {
              widget_arr.push({
                configName: "productDetails",
                widgetList: ["9"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [9],
                  product_id: styledProducts,
                  occasions_list: occasion_list,
                },
                recommendationUrl: `${_widgetPayload.robinUrl ||
                  vuestyle_endpoint}${_isVueX ? "/widgets" : "/vuestyle/widgets"
                  }`,
              });
            } else {
              widget_arr.push({
                configName: "productDetails",
                widgetList: ["9"],
                // The post body will be converted to required request payload format in the fetch method
                postBody: {
                  ...baseParams,
                  widget_list: [9],
                  occasions: occasion_list,
                  product_id: styledProducts,
                  num_results: vuestyle_num_results,
                  products_per_outfit: products_per_outfit,
                },
                recommendationUrl: `${_widgetPayload.robinUrl ||
                  vuestyle_endpoint}${_isVueX ? "/widgets" : "/vuestyle/widgets"
                  }`,
              });
            }
          }
          widgetRender.current = true;
          updateWidgetList(widget_arr);
        }
        return (
          <PlayerConsumer>
            {(playercontext) => {
              return (
                <div>
                  {
                    discover?.renderUseCases || discover.renderUseCases == undefined ? (
                      <RenderUseCases />
                    ) : null
                  }
                  <VideoPlayer />
                  <RecommendedPdtsContainer
                    fallBack={fallBack}
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
                              <DiscoverConsumer>
                                {(discoverContext) => {
                                  const styleConfig =
                                    discoverContext?.discover?.styleConfig ||
                                    cardStyleConfig;
                                  return (
                                    <ProductCarousel
                                      list={context[listKey] || []}
                                      hideMSDOntology={true}
                                      sliderPerGroup={
                                        styleConfig.card?.cards_per_row
                                      }
                                      loading={loading}
                                      showBuyButton={true}
                                      isGroceryUser={isGroceryUser}
                                      isFashionUser={isFashionUser}
                                      showWishlistButton={true}
                                      type={config.cardType}
                                      imageLink={config.imageLink}
                                      showStyledProducts={toggleStyledProducts}
                                      showSimilarProducts={
                                        toggleSimilarProducts
                                      }
                                      styleConfig={styleConfig}
                                    />
                                  );
                                }}
                              </DiscoverConsumer>
                            </ProductRecommendationWrapper>
                          ) : (
                            <ProductRecommendationWrapper
                              key={`Home Carousel ${key}`}
                            >
                              <DiscoverConsumer>
                                {(discoverContext) => {
                                  const styleConfig =
                                    discoverContext?.discover?.styleConfig ||
                                    cardStyleConfig;
                                  return (
                                    <ProductCarousel
                                      loading={loading}
                                      sliderPerGroup={
                                        styleConfig.card?.cards_per_row
                                      }
                                      showBuyButton={true}
                                      showWishlistButton={true}
                                      type={config.cardType}
                                      isFashionUser={isFashionUser}
                                      isGroceryUser={isGroceryUser}
                                      imageLink={config.imageLink}
                                      showStyledProducts={toggleStyledProducts}
                                      showSimilarProducts={
                                        toggleSimilarProducts
                                      }
                                      styleConfig={styleConfig}
                                    />
                                  );
                                }}
                              </DiscoverConsumer>
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
                        const { loading, discover } = context;
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
                                  tabsContainer={defaultLookContainer}
                                  activeIndex="0"
                                  recommendedData={StyleLookArr}
                                  sliderPerGroup={4}
                                  loading={loading}
                                  showBuyButton={true}
                                  isFashionUser={isFashionUser}
                                  isGroceryUser={isGroceryUser}
                                  showWishlistButton={true}
                                  showStyledProducts={toggleStyledProducts}
                                  showSimilarProducts={toggleSimilarProducts}
                                  styleConfig={discover?.styleConfig}
                                />
                              </ProductRecommendationWrapper>
                            ) : (
                              <ProductRecommendationWrapper
                                key={`Home Carousel ${key}`}
                              >
                                <DiscoverConsumer>
                                  {(discoverContext) => {
                                    const styleConfig =
                                      discoverContext?.discover?.styleConfig ||
                                      cardStyleConfig;
                                    return (
                                      <ProductCarousel
                                        loading={loading}
                                        sliderPerGroup={
                                          styleConfig.card?.cards_per_row
                                        }
                                        showBuyButton={true}
                                        showWishlistButton={true}
                                        type={config.cardType}
                                        isFashionUser={isFashionUser}
                                        isGroceryUser={isGroceryUser}
                                        imageLink={config.imageLink}
                                        showStyledProducts={
                                          toggleStyledProducts
                                        }
                                        showSimilarProducts={
                                          toggleSimilarProducts
                                        }
                                        styleConfig={styleConfig}
                                        key={key}
                                      />
                                    );
                                  }}
                                </DiscoverConsumer>
                              </ProductRecommendationWrapper>
                            );
                          }
                        });
                      }}
                    </RecommendedPdtsConsumer>
                  </RecommendedPdtsContainer>
                  {similarProducts && (
                    <RecommendedPdtsContainer
                      fallBack={productDetailsConfig}
                      recommendedWidgetList={currWidget}
                    >
                      <Modal
                        closeIcon
                        size="large"
                        centered={false}
                        onClose={closeModal}
                        closeOnDimmerClick={false}
                        open={similarProducts !== null}
                      >
                        <Modal.Header>More Like This</Modal.Header>
                        <Modal.Content
                          style={{
                            width: "96%",
                            margin: "auto",
                            minHeight: "300px",
                          }}
                        >
                          <RenderProductDetailsModal
                            isFashionUser={isFashionUser}
                            isGroceryUser={isGroceryUser}
                          />
                        </Modal.Content>
                      </Modal>
                    </RecommendedPdtsContainer>
                  )}
                  {styledProducts && (
                    <RecommendedPdtsContainer
                      fallBack={productDetailsConfig}
                      recommendedWidgetList={currWidget}
                    >
                      <Modal
                        closeIcon
                        size="large"
                        id="styleitwith"
                        centered={false}
                        onClose={closeModal}
                        closeOnDimmerClick={false}
                        open={styledProducts !== null}
                      >
                        <Modal.Header>
                          {isFashionUser
                            ? "Style It With"
                            : "Complete Your Purchase"}
                        </Modal.Header>
                        <Modal.Content
                          style={{
                            width: "96%",
                            margin: "auto",
                            minHeight: "300px",
                          }}
                        >
                          <RenderStyleItWithModal
                            isFashionUser={isFashionUser}
                            isGroceryUser={isGroceryUser}
                          />
                        </Modal.Content>
                      </Modal>
                    </RecommendedPdtsContainer>
                  )}
                </div>
              );
            }}
          </PlayerConsumer>
        );
      }}
    </ConfigConsumer>
  );
};

export { DiscoverItemBlock, ProductRecommendationSection };
