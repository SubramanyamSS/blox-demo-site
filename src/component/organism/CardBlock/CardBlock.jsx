import React, { useEffect, useState } from "react";
import { Icon, Modal } from "semantic-ui-react";
import LoaderImg from "../../../static/img/placeholder.svg";
import LoaderSvg from "../../../static/img/loader.svg";
import LogoImg from "../../../static/img/logo_without_text.png";
import FeedbackIcon from "../../../static/svg/feedback.svg";
import FeedbackIconSuccess from "../../../static/svg/feedback-success.svg";
import Portal from "../../atom/Portal/Portal";
import { UserDataAttrs } from "../../../configs";
import {
  DataItemImg,
  DataItemBlock as DataItemBlockEl,
  RecommendationBtn,
  DataInfoBlock,
  CarouselItemWrapper,
  TitleBlock,
  ImageContainer,
  WishlistIconContainer,
  RedirectLinkMask,
  CTAContainer,
  CTAWrapper,
  IconWrapper,
  SimilarBtn,
  StlyeItBtn,
  BrandPriceContainer,
  CardTextWrapper,
  MetaDataWrapper,
  FeedbackIconWrapper,
  PopupContent,
  PopupButton,
  AlertEl,
} from "./styled";
import { DebugBlock } from "../../atom";
import { getCookie } from "../../../common";
import Header from "../../../page/Header";
import {
  HeaderConfigConsumer,
  CartContainer,
  PlayerContainer,
  PlayerConsumer,
} from "../../../container";
import { cardStyleConfig } from "../../../styleConfig";
import { Divider } from "../../../page/UserProfile/styled";
import { ActionModal } from "../../../page/OcrExtraction/components/modal";
import { Tooltip } from "../../../page/OcrExtraction/components/tootip";

const DataInfo = (props) => {
  const {
    product_id,
    title,
    ontology,
    price,
    msd_ontology,
    hideProductId,
    hideTitle,
    hideOntology,
    hidePrice,
    hideMSDOntology,
  } = props;
  return (
    <DataInfoBlock>
      {hideProductId ? null : <span>Product ID : {product_id}</span>}
      {hideTitle ? null : <span>Title : {title}</span>}
      {hideOntology ? null : <span>Ontology : {ontology}</span>}
      {hidePrice ? null : <span>Price : {price}</span>}
      {hideMSDOntology ? null : <span>MSD Ontology : {msd_ontology}</span>}
    </DataInfoBlock>
  );
};

const renderButtonStateStyle = (showButton) => {
  if (showButton === false) {
    return { display: "none" };
  }
};

const sendEvents = (productId, event) => {
  const config = localStorage.getItem("userConfig");
  const user = localStorage.getItem("userId");
  if (config != undefined || config != "" || config != "{}") {
    const userConfig = JSON.parse(config);
    let endPoint =
      userConfig.config.pixelUrl || `${userConfig.url}/push_events_to_mcpd`;
    const apiKey = userConfig.API_KEY;
    const userId = user || userConfig.user_id;
    const madUUID = getCookie("mad_UUID");
    let productsArray = new Array(productId);
    productsArray = JSON.stringify(productsArray);
    const postData = `api_key=${apiKey}&user_id=${userId}&event=${event}&mad_uuid=${madUUID}&product_id=${productsArray}`;
    fetch(endPoint, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(`${event} event error`, err));
  }
};

const sendFeedback = (
  productId,
  status,
  index,
  currPage,
  module_name,
  destination_candidate_attributes,
  updateFeedbackPopupState,
  updateFeedbackLoaderState
) => {
  const config = localStorage.getItem("userConfig");
  const user = localStorage.getItem("userId");
  if (config != undefined || config != "" || config != "{}") {
    updateFeedbackLoaderState("Loading");
    const userConfig = JSON.parse(config);
    let endPoint =
      userConfig.config.feedbackUrl || `${userConfig.url}/quality_feedbacks`;
    const apiKey = userConfig.API_KEY;
    const userId = user || userConfig.user_id;
    const madUUID = getCookie("mad_UUID");
    const postData = JSON.stringify({
      module_name: module_name || "Text Search",
      source_candidate: "",
      source_candidate_attributes: [],
      source_feedback_status: "",
      destination_feedback_status: status,
      destination_candidate: productId,
      destination_candidate_index: index + 1 || 1,
      destination_candidate_page: currPage || 1,
      destination_candidate_score: 0,
      destination_candidate_attributes: destination_candidate_attributes,
      user_id: userId,
      mad_uuid: madUUID,
      destination_results: [],
      ...userConfig?.config?.feedbackPayload,
    });
    fetch(endPoint, {
      headers: {
        "Content-type": "application/json",
        "x-api-key": apiKey,
      },
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateFeedbackLoaderState("Feedback send successfully");
        setTimeout(() => {
          updateFeedbackPopupState(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(`Feedback error`, err);
        updateFeedbackLoaderState("Feedback Error!");
      });
  }
};

const addToCartHandler = (
  image_link,
  title,
  product_id,
  isFromCurationProductList,
  price,
  updateAddToCartText,
  updateCartPdtCount,
  buyButtonStateChange,
  updateCartPdt,
  remainingProps
) => {
  let all_items_in_cart = localStorage.getItem("cart_items");
  product_id = isFromCurationProductList ? remainingProps.id : product_id;
  if (
    all_items_in_cart != undefined &&
    all_items_in_cart != "" &&
    all_items_in_cart != "{}"
  ) {
    all_items_in_cart = JSON.parse(all_items_in_cart);
    if (!(product_id in all_items_in_cart)) {
      all_items_in_cart[product_id] = {
        image_link: image_link,
        title: title,
        product_id: product_id,
        price: price,
      };
      sendEvents(product_id, "addToCart");
      localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
      if (buyButtonStateChange != false) {
        updateAddToCartText("REMOVE FROM CART");
      }
      updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
      updateCartPdt({ cartProducts: all_items_in_cart });
    } else {
      for (let key in all_items_in_cart) {
        if (key == product_id && buyButtonStateChange != false) {
          delete all_items_in_cart[product_id];
          localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
          updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
          updateCartPdt({ cartProducts: all_items_in_cart });
        }
      }
      if (buyButtonStateChange != false) {
        updateAddToCartText("Add to cart");
      }
    }
  } else {
    all_items_in_cart = {};
    all_items_in_cart[product_id] = {
      image_link: image_link,
      title: title,
      product_id: product_id,
      price: price,
    };
    sendEvents(product_id, "addToCart");
    localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
    updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
    updateCartPdt({ cartProducts: all_items_in_cart });
    if (buyButtonStateChange != false) {
      updateAddToCartText("REMOVE FROM CART");
    }
  }
};

const addToWishlistHandler = (
  image_link,
  title,
  product_id,
  isFromCurationProductList,
  price,
  updateWishlistPdtCount,
  remainingProps
) => {
  let all_items_in_wishlist = localStorage.getItem("wishlist_items");
  product_id = isFromCurationProductList ? remainingProps.id : product_id;
  if (
    all_items_in_wishlist != undefined &&
    all_items_in_wishlist != "" &&
    all_items_in_wishlist != "{}"
  ) {
    all_items_in_wishlist = JSON.parse(all_items_in_wishlist);
    if (!(product_id in all_items_in_wishlist)) {
      all_items_in_wishlist[product_id] = {
        image_link: image_link,
        title: title,
        product_id: product_id,
        price: price,
      };
      sendEvents(product_id, "addToWishlist");
      localStorage.setItem(
        "wishlist_items",
        JSON.stringify(all_items_in_wishlist)
      );
      updateWishlistPdtCount({
        count: Object.keys(all_items_in_wishlist).length,
      });
    } else {
      for (let key in all_items_in_wishlist) {
        if (key == product_id) {
          delete all_items_in_wishlist[product_id];
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
  } else {
    all_items_in_wishlist = {};
    all_items_in_wishlist[product_id] = {
      image_link: image_link,
      title: title,
      product_id: product_id,
      price: price,
    };
    sendEvents(product_id, "addToWishlist");
    localStorage.setItem(
      "wishlist_items",
      JSON.stringify(all_items_in_wishlist)
    );
    updateWishlistPdtCount({
      count: Object.keys(all_items_in_wishlist).length,
    });
  }
};

const renderWishListIcon = (product_id) => {
  let all_items_in_wishlist = localStorage.getItem("wishlist_items");
  all_items_in_wishlist = JSON.parse(all_items_in_wishlist);
  if (product_id != undefined && all_items_in_wishlist != null) {
    if (product_id in all_items_in_wishlist) {
      return "heart";
    } else {
      return "heart outline";
    }
  } else {
    return "heart outline";
  }
};

const renderWishListIconColor = (product_id) => {
  let all_items_in_wishlist = localStorage.getItem("wishlist_items");
  all_items_in_wishlist = JSON.parse(all_items_in_wishlist);
  if (product_id != undefined && all_items_in_wishlist != null) {
    if (product_id in all_items_in_wishlist) {
      return "red";
    } else {
      return "grey";
    }
  } else {
    return "grey";
  }
};

const renderCartText = (
  product_id,
  isFromCurationProductList,
  remainingProps
) => {
  let all_items_in_cart = localStorage.getItem("cart_items");
  all_items_in_cart = JSON.parse(all_items_in_cart);
  product_id = isFromCurationProductList ? remainingProps.id : product_id;
  if (product_id != undefined && all_items_in_cart != null) {
    if (product_id in all_items_in_cart) {
      return "Remove from cart";
    } else {
      return "Add to cart";
    }
  } else {
    return "Add to cart";
  }
};

const getBrandAndPrice = (brand, currency, price) => {
  let brandAndPrice = "";
  if (brand) {
    brandAndPrice = `${brand} | `;
  }
  if (price) {
    brandAndPrice += currency ? currency : "$";
    brandAndPrice += price;
  }
  return brandAndPrice;
};

const RenderModal = ({ isModalVisible, setModalVisible, feedbackData, product_id, widgetName, feedbackValue, setFeedbackValue, sourceProductId, userConfig, defaultFeedbackId, setReFetch, setAlertMessage, index, moduleName }) => {
  const [buttonText, setButtonText] = useState("Send");
  const { API_KEY, config } = userConfig;
  const mad_UUID = getCookie("mad_UUID");
  let user_id = localStorage.getItem("userId");
  if (!user_id) {
    user_id = userConfig.user_id;
  }
  const sendFeedback = (feedbackValue, product_id, widgetName, sourceProductId) => {
    const feedbackPayload = {
      "source_product_id": sourceProductId,
      "user_id": user_id,
      "mad_uuid": mad_UUID,
      "widget_name": widgetName,
      "module_name": moduleName,
      "feedbacks": [
        {
          "product_id": product_id,
          "feedback": `${feedbackValue}`,
          "index": `${index}`
        }
      ]
    };
    if (feedbackValue) {
      setButtonText("Submitting");
      fetch(config.feedbackPostURL, {
        method: "POST",
        headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(feedbackPayload)
      })
        .then((data) => data.json())
        .then((response) => {
          setReFetch((prev) => !prev)
          setAlertMessage(response)
          setButtonText("Send")
          setTimeout(() => {
            setAlertMessage({})
            setModalVisible(false);
          }, 1000);
        });
    } else {
      setAlertMessage({
        message: "Select a feedback value",
        status: "ERROR"
      })
      setTimeout(() => {
        setAlertMessage({})
      }, 1000);
    }
  }
  return (
    <Portal>
      <ActionModal
        buttonFailure="Cancel"
        buttonSuccess={defaultFeedbackId && defaultFeedbackId != "undefined" && defaultFeedbackId == feedbackValue ? undefined : buttonText}
        isClosedOnEsc={true}
        isClosedOnOutsideClick={true}
        isOpen={isModalVisible}
        onFailure={() => {
          setModalVisible(false);
          setFeedbackValue();
        }}
        onSuccess={() => sendFeedback(feedbackValue, product_id, widgetName, sourceProductId)}
        onClose={() => {
          setModalVisible(false);
          setFeedbackValue();
        }}
        showCloseIcon={true}
        title="Feedback"
        style={{ top: 0 }}
      >
        <div>
          {
            !feedbackData?.length ? "No Feedback data" : ""
          }
          {
            feedbackData?.map(value => {
              return (
                <div className="d-flex mb-2">
                  <input type="radio" name="match" id={value.name} className="mr-4" data-attr={value.id} data-attrw={defaultFeedbackId} onClick={() => setFeedbackValue(value.id)} checked={value.id == feedbackValue} />
                  <label for={value.name} style={{ cursor: "pointer" }}>{value.name}</label>
                </div>
              )
            })
          }
        </div>
      </ActionModal>
    </Portal>
  )
}

const getFeedbackValue = (feedbacks, id) => {
  let value = "";
  if (feedbacks?.length > 0) {
    feedbacks.forEach(element => {
      if (element.id.toString() == id.toString()) {
        value = element.name;
      }
    });
  }
  return value;
}

const CardBlock = (props) => {
  let {
    image_link,
    internal_image_url,
    index,
    small_image_link,
    title,
    Title,
    product_id,
    debug_info,
    force_debug,
    showBuyButton,
    showSITButton,
    showFeedbackButton,
    showRecommendationFeedback,
    feedbackData,
    widgetName,
    sourceProductId,
    defaultFeedbackId,
    setReFetch,
    module_name,
    buyButtonStateChange,
    showFeedbackAssistButton,
    showWishlistButton,
    showMoreLikeThisButton,
    price,
    Price,
    brand,
    Brand,
    isFromCarouselWithTabs,
    isFromCurations,
    isFromCurationProductList,
    type,
    imageLink,
    videoUrl,
    showStyledProducts,
    showSimilarProducts,
    sliderPerGroup,
    isGroceryUser,
    isFashionUser,
    customOnClick,
    styleConfig,
    metaData,
    showMetaData,
    Currency,
    currPage,
    facets,
    moduleName,
    feedbacks,
    setFeedbacks,
    feedbackFields,
    ...remainingProps
  } = props;
  const [currency, setCurrency] = useState("$");
  const [userConfig, setConfig] = useState({});
  const [feedbackPopupState, updateFeedbackPopupState] = useState(false);
  const [feedbackState, updateFeedbackState] = useState();
  const [feedbackLoaderState, updateFeedbackLoaderState] = useState("Submit");
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState(defaultFeedbackId);
  const [alertMessage, setAlertMessage] = useState({});

  const setInitialFeedback = () => {
    let initialFeedback = {};
    if (feedbackFields && feedbackFields.length > 0) {
      feedbackFields.forEach(field => {
        initialFeedback[field] = remainingProps && remainingProps[field.slice(0, -1)] ? remainingProps[field.slice(0, -1)] : '';
      })
    }
    return initialFeedback;
  }

  useEffect(() => {
    setFeedbackValue(defaultFeedbackId);
  }, [defaultFeedbackId, isModalVisible]);

  useEffect(() => {
    let configs = localStorage.getItem("userConfig");
    let currency =
      configs &&
      JSON.parse(configs).vue_user &&
      JSON.parse(configs).vue_user.currency &&
      JSON.parse(configs).vue_user.currency;
    setConfig(JSON.parse(configs));
    setCurrency(currency);
  }, []);

  let redirectLink = `/product-display/?id=${product_id}`;

  if (isFromCurations) {
    redirectLink = `/curation/?id=${remainingProps.id}`;
  } else if (isFromCurationProductList) {
    redirectLink = `/product-display/?id=${remainingProps.id}`;
  } else {
    redirectLink = `/product-display/?id=${product_id}`;
  }

  // const renderCartText = (product_id, buyButtonStateChange) => {
  //   if (buyButtonStateChange != false) {
  //     let all_items_in_cart = localStorage.getItem("cart_items");
  //     all_items_in_cart = JSON.parse(all_items_in_cart);
  //     if (product_id != undefined && all_items_in_cart != null) {
  //       if (product_id in all_items_in_cart) {
  //         return "Remove from cart";
  //       } else {
  //         return "Add to cart";
  //       }

  if (imageLink === "image_link") {
    image_link = image_link;
  } else if (imageLink === "internal_image_url") {
    image_link = internal_image_url;
  } else if (imageLink === "small_image_link") {
    image_link = small_image_link;
  }

  image_link =
    isFromCurations && remainingProps.moodboards.length
      ? remainingProps.moodboards[0].image_link
      : image_link;

  // const redirectLink = () => {
  //   if (isFromCurations) {
  //     return `/curation/?id=${remainingProps.id}`;
  //   } else if (isFromCurationProductList) {
  //     return `/product-display/?id=${remainingProps.id}`;
  //   } else {
  //     return `/product-display/?id=${product_id}`;
  //   }
  // };
  // const redirectToPdp = (product_id, isFromCurations) => {
  //   if (isFromCurations) {
  //     window.location.href = `/curation/?id=${remainingProps.id}`;
  //   } else if (isFromCurationProductList) {
  //     window.location.href = `/product-display/?id=${remainingProps.id}`;
  //   } else {
  //     window.location.href = `/product-display/?id=${product_id}`;
  //   }
  // };

  const [imgLoadStatus, updateImgLoadStatus] = useState(false);
  const [displayIcons, setDisplayIcons] = useState(false);
  const [addToCartText, updateAddToCartText] = useState(
    renderCartText(
      product_id,
      buyButtonStateChange,
      isFromCurationProductList,
      remainingProps
    )
  );
  return (
    <PlayerConsumer>
      {(videoContext) => {
        const { setShowVideo, setVideoLink } = videoContext;
        return (
          <DataItemBlockEl
            debugMode={debug_info ? true : false}
            isVertical={
              styleConfig?.card?.orientation?.horizontal !== undefined
                ? !styleConfig?.card?.orientation?.horizontal
                : !cardStyleConfig.card.orientation.horizontal
            }
            onMouseEnter={() => {
              setDisplayIcons(true);
            }}
            onMouseLeave={() => {
              setDisplayIcons(false);
            }}
          >
            {
              alertMessage.message != undefined ? (
                <Portal>
                  <AlertEl isActive={alertMessage.message != undefined} type={alertMessage.status}>
                    {alertMessage.message}
                  </AlertEl>
                </Portal>
              ) : null
            }
            {isModalVisible ?
              <RenderModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                feedbackData={feedbackData}
                product_id={product_id}
                widgetName={widgetName}
                feedbackValue={feedbackValue}
                setFeedbackValue={setFeedbackValue}
                sourceProductId={sourceProductId}
                userConfig={userConfig}
                defaultFeedbackId={defaultFeedbackId}
                setReFetch={setReFetch}
                setAlertMessage={setAlertMessage}
                index={index}
                moduleName={moduleName}
              /> : null}
            <CarouselItemWrapper
              styleConfig={styleConfig?.image}
              isVertical={
                styleConfig?.card?.orientation?.horizontal !== undefined
                  ? !styleConfig?.card?.orientation?.horizontal
                  : !cardStyleConfig.card.orientation.horizontal
              }
            >
              {/* <DataImageBlock to={redirectLink}> */}
              {/* <DataImageBlock> */}
              {/* <div
                  style={{
                    width: "100%",
                    height: "90%",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "lightgray",
                    background: "#fff",
                    position: "relative",
                  }}
                > */}
              <ImageContainer sliderPerGroup={sliderPerGroup || 4}>
                <DataItemImg
                  isFromCarouselWithTabs={isFromCarouselWithTabs}
                  src={
                    imgLoadStatus
                      ? type == "video"
                        ? image_link || LoaderImg
                        : image_link || internal_image_url || LoaderImg
                      : LoaderImg
                  }
                  alt={title || "Data Image"}
                  onLoad={(e) => updateImgLoadStatus(true)}
                  onError={(e) => updateImgLoadStatus(true)}
                  style={{}}
                />
                {showFeedbackButton && (
                  <FeedbackIconWrapper
                    isVertical={
                      styleConfig?.card?.orientation?.horizontal !== undefined
                        ? !styleConfig?.card?.orientation?.horizontal
                        : !cardStyleConfig.card.orientation.horizontal
                    }
                  >
                    <Icon
                      name={"thumbs up"}
                      size="large"
                      style={{ padding: "5px", color: "#767676" }}
                      color={"#767676"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (facets && facets.length) {
                          updateFeedbackState("positive");
                          updateFeedbackPopupState(true);
                        }
                      }}
                    />
                    <Icon
                      name={"thumbs down"}
                      size="large"
                      style={{ padding: "5px", color: "#767676" }}
                      color={"#767676"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (facets && facets.length) {
                          updateFeedbackState("negative");
                          updateFeedbackPopupState(true);
                        }
                      }}
                    />
                  </FeedbackIconWrapper>
                )}
              </ImageContainer>
              {showFeedbackButton &&
                userConfig?.config?.feedbackDestinationCandidateAttributes &&
                userConfig?.config?.feedbackDestinationCandidateAttributes
                  .length && (
                  <FeedbackPopup
                    facets={
                      userConfig?.config?.feedbackDestinationCandidateAttributes
                    }
                    feedbackPopupState={feedbackPopupState}
                    updateFeedbackPopupState={updateFeedbackPopupState}
                    feedbackLoaderState={feedbackLoaderState}
                    updateFeedbackLoaderState={updateFeedbackLoaderState}
                    feedbackCall={(destination_candidate_attributes) =>
                      sendFeedback(
                        product_id,
                        feedbackState,
                        index,
                        currPage,
                        module_name,
                        destination_candidate_attributes,
                        updateFeedbackPopupState,
                        updateFeedbackLoaderState
                      )
                    }
                  />
                )}
              {!feedbackPopupState && (showFeedbackAssistButton || showWishlistButton || showBuyButton || showRecommendationFeedback) ? (
                <HeaderConfigConsumer>
                  {(context) => {
                    const { updateCartPdtCount } = context[0];
                    const { updateCartPdt, cartProducts } = context[2];
                    const { updateWishlistPdtCount } = context[1];
                    return (
                      <RedirectLinkMask
                        isFromCarouselWithTabs={isFromCarouselWithTabs}
                        isVertical={
                          styleConfig?.card?.orientation?.horizontal !==
                            undefined
                            ? !styleConfig?.card?.orientation?.horizontal
                            : !cardStyleConfig.card.orientation.horizontal
                        }
                        to={type == "custom" ? undefined : redirectLink}
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoLink(videoUrl);
                          if (type == "video") {
                            setShowVideo(true)
                          } else if (type == "custom") {
                            customOnClick()
                          }
                        }}
                        isDisplayIcons={displayIcons}
                      >
                        {showFeedbackAssistButton && (
                          <IconWrapper
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setFeedbacks(setInitialFeedback())
                            }}
                          >
                            <Icon
                              name={"plus"}
                              size="large"
                              color={
                                isFromCurationProductList
                                  ? renderWishListIconColor(remainingProps.id)
                                  : renderWishListIconColor(product_id)
                              }
                              style={{ padding: "2px" }}
                            />
                          </IconWrapper>
                        )}
                        {showWishlistButton && (
                          <IconWrapper
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToWishlistHandler(
                                image_link,
                                title,
                                product_id,
                                isFromCurationProductList,
                                price,
                                updateWishlistPdtCount,
                                remainingProps
                              );
                            }}
                          >
                            <Icon
                              name={
                                isFromCurationProductList
                                  ? renderWishListIcon(remainingProps.id)
                                  : renderWishListIcon(product_id)
                              }
                              size="large"
                              color={
                                isFromCurationProductList
                                  ? renderWishListIconColor(remainingProps.id)
                                  : renderWishListIconColor(product_id)
                              }
                              style={{ padding: "2px" }}
                            />
                          </IconWrapper>
                        )}
                        {showBuyButton && (
                          <IconWrapper
                            style={{ top: "30px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCartHandler(
                                image_link,
                                title,
                                product_id,
                                isFromCurationProductList,
                                price,
                                updateAddToCartText,
                                updateCartPdtCount,
                                buyButtonStateChange,
                                updateCartPdt,
                                remainingProps
                              );
                            }}
                          >
                            <Icon
                              size="large"
                              style={{ top: "2px", position: "relative" }}
                              color={
                                addToCartText?.toLowerCase() === "add to cart"
                                  ? "grey"
                                  : "red"
                              }
                              name={
                                addToCartText?.toLowerCase() === "add to cart"
                                  ? "add to cart"
                                  : "cart arrow down"
                              }
                            />
                          </IconWrapper>
                        )}
                        {showRecommendationFeedback && (
                          <IconWrapper
                            style={{ top: "65px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalVisible(true)
                            }}
                          >
                            {
                              defaultFeedbackId && defaultFeedbackId != "undefined" ?
                                (
                                  <Tooltip content={getFeedbackValue(feedbackData, defaultFeedbackId)}>
                                    <img src={defaultFeedbackId && defaultFeedbackId != "undefined" ? FeedbackIconSuccess : FeedbackIcon} alt="feeback logo" />
                                  </Tooltip>
                                ) : <img src={defaultFeedbackId && defaultFeedbackId != "undefined" ? FeedbackIconSuccess : FeedbackIcon} alt="feeback logo" />
                            }
                          </IconWrapper>
                        )}
                      </RedirectLinkMask>
                    );
                  }}
                </HeaderConfigConsumer>
              ) : (
                <RedirectLinkMask
                  isVertical={
                    styleConfig?.card?.orientation?.horizontal !== undefined
                      ? !styleConfig?.card?.orientation?.horizontal
                      : !cardStyleConfig.card.orientation.horizontal
                  }
                  isFromCarouselWithTabs={isFromCarouselWithTabs}
                  to={type == "custom" ? undefined : redirectLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoLink(videoUrl);
                    if (type == "video") {
                      setShowVideo(true)
                    } else if (type == "custom") {
                      customOnClick()
                    }
                  }}
                  isDisplayIcons={true}
                />
              )}
            </CarouselItemWrapper>
            <CardTextWrapper
              maxHeight={
                styleConfig?.text_container?.height ||
                cardStyleConfig.image.height
              }
              isVertical={
                styleConfig?.card?.orientation?.horizontal !== undefined &&
                  styleConfig?.card?.orientation?.horizontal !== null
                  ? !styleConfig?.card?.orientation?.horizontal
                  : !cardStyleConfig.card.orientation.horizontal
              }
            >
              {/*
                Title, price, other buttons and stuff
                goes inside this block
              */}
              {title || Title ? (
                type != "custom" ? (
                  <TitleBlock
                    to={redirectLink}
                    styleConfig={styleConfig?.title}
                  >
                    {title || Title}
                  </TitleBlock>
                ) : (
                  <TitleBlock
                    onClick={customOnClick}
                    styleConfig={styleConfig?.title}
                  >
                    {title || Title}
                  </TitleBlock>
                )
              ) : null}
              {price || Price ? (
                <BrandPriceContainer styleConfig={styleConfig?.price}>
                  {getBrandAndPrice(
                    brand || Brand,
                    currency || Currency,
                    price || Price
                  )}
                </BrandPriceContainer>
              ) : null}

              {showMetaData && metaData.length && (
                <>
                  <Divider />
                  <MetaDataWrapper>
                    {showMetaData &&
                      metaData?.map((item) =>
                        props[item] !== undefined &&
                          props[item] !== null &&
                          props[item] !== "" ? (
                          <BrandPriceContainer styleConfig={styleConfig?.price}>
                            <b>{item}: </b>
                            {props[item]}
                          </BrandPriceContainer>
                        ) : null
                      )}
                  </MetaDataWrapper>
                </>
              )}

              {debug_info && force_debug ? (
                <DebugBlock {...debug_info} />
              ) : null}
            </CardTextWrapper>

            {showSimilarProducts || showStyledProducts ? (
              <CTAContainer
                onMouseEnter={() => setDisplayIcons(false)}
                onMouseLeave={() => setDisplayIcons(true)}
              >
                {showSimilarProducts && (
                  <SimilarBtn
                    onClick={() => showSimilarProducts(product_id)}
                    style={renderButtonStateStyle(showMoreLikeThisButton)}
                    styleConfig={styleConfig?.primary_button}
                  >
                    <RecommendationBtn style={{ marginTop: 0 }}>
                      {"More like this"}
                    </RecommendationBtn>
                  </SimilarBtn>
                )}
                {showStyledProducts && !isGroceryUser && (
                  <StlyeItBtn
                    onClick={() =>
                      showSITButton !== false
                        ? showStyledProducts(product_id)
                        : null
                    }
                    style={renderButtonStateStyle(showSITButton)}
                  >
                    <RecommendationBtn style={{ marginTop: 0 }}>
                      <div>
                        <img
                          alt="logo"
                          src={LogoImg}
                          style={{
                            position: isFashionUser ? "" : "relative",
                          }}
                        />
                        <span
                          style={{
                            padding: isFashionUser ? "" : "0",
                            lineHeight: isFashionUser ? "" : "",
                          }}
                        >
                          {isFashionUser
                            ? "style it with"
                            : "complete purchase"}
                        </span>
                      </div>
                    </RecommendationBtn>
                  </StlyeItBtn>
                )}
              </CTAContainer>
            ) : null}
          </DataItemBlockEl>
        );
      }}
    </PlayerConsumer>
  );
};

const FeedbackPopup = ({
  facets,
  feedbackPopupState,
  updateFeedbackPopupState,
  feedbackLoaderState,
  updateFeedbackLoaderState,
  feedbackCall,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(facets.length).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  const feedbackSubmit = () => {
    let destination_candidate_attributes = [];
    facets.map((value, index) => {
      if (checkedState[index]) {
        destination_candidate_attributes.push(value);
      }
    });
    feedbackCall(destination_candidate_attributes);
  };
  useEffect(() => {
    setCheckedState(new Array(facets.length).fill(false));
    updateFeedbackLoaderState("Submit");
  }, [feedbackPopupState]);
  return (
    <Modal
      size="mini"
      dimmer="inverted"
      open={feedbackPopupState}
      onClose={() => updateFeedbackPopupState(false)}
      onOpen={() => updateFeedbackPopupState(true)}
    >
      <Modal.Header style={{ fontFamily: "Poppins_Regular" }}>
        Select Attributes
      </Modal.Header>
      <Modal.Content image>
        <PopupContent onClick={(e) => e.stopPropagation()}>
          {facets.map((value, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={value}
                  value={value}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{value}</label>
              </li>
            );
          })}
        </PopupContent>
      </Modal.Content>
      <Modal.Actions>
        <PopupButton
          onClick={feedbackSubmit}
          loaderState={feedbackLoaderState === "Loading"}
          disabled={!checkedState.includes(true)}
        >
          {feedbackLoaderState === "Loading" ? (
            <img src={LoaderSvg} />
          ) : (
            feedbackLoaderState
          )}
        </PopupButton>
      </Modal.Actions>
    </Modal>
  );
};

export {
  CardBlock,
  sendEvents,
  renderCartText,
  addToCartHandler,
  renderWishListIcon,
  addToWishlistHandler,
  renderWishListIconColor,
};
