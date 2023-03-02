import React, { useState, useEffect, useRef } from "react";
import {
  ProductDetailsWrapper,
  TitleWrapper,
  VueLogoImg,
  FullContainer,
  AffinityContainer,
  UserAffinityTitle,
  AffinityCloseButtonContainer,
  RenderBottomContainer,
  ButtonWrap,
  ImageContainer,
  DataItemImg,
  RedirectLinkMask,
  ImageDivWrapper,
  NavigationWrapper,
  UserAffinityWrapper,
  AlertEl,
} from "./styled";
import {
  RenderRecommendationContainer,
  RenderTopcontainer,
  RenderSpiderContainer,
  RenderStyleItContainer,
  RenderSparkLine,
  RenderWordCloud,
  RenderAffinityContainer,
  RenderCLPMenu,
  RenderMetaData,
} from "./renderProps";
import {
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
  ProductDetailsContainer,
  ProductDetailsConsumer,
  StyleItPdtsContainer,
  ConfigConsumer,
  PlayerConsumer,
  RecommendationFeedbackContainer,
} from "../../container";
import VideoPlayer from "../../component/molecule/VideoPlayer";
import VueCommerceLogo from "../../static/svg/vue-commerce.svg";
import VueStyleLogo from "../../static/svg/vue-style.svg";
import { Button } from "semantic-ui-react";
import { getCookie } from "../../common";
import fallBack from "./productDetailsConfig";
import { BreadcrumbLinks } from "../../component";
import LoaderImg from "../../static/img/placeholder.svg";
import PlayButton from "../../static/img/play-button.png";
// import LoaderImg from "../../../static/img/placeholder.svg";
import "semantic-ui-css/semantic.min.css";

const ProductDetails = (props) => {
  const render = useRef(false);
  const [widgetList, updateWidgetList] = useState([]);
  const [currWidget, updateWidget] = useState({});
  const [ontology, updateOntology] = useState("");
  const [msdontology, updateMsdOntology] = useState("");
  const [copyWidgetArr, updateCopyWidgetArr] = useState([]);

  const [displayOccasion, updateDisplayOccasion] = useState("");
  const [OccasionStyleData, updateOccasionStyleData] = useState([]);
  const [AllOccasionDetails, updateAllOccasionDetails] = useState([]);
  const [hasOnlyOccasionName, updateHasOnlyOccasionName] = useState([]);
  const [isModalOpen, updateModal] = useState(false);
  const [sparkLineArr, updateSparkLineArr] = useState([]);
  const [is_affinity_checked, update_affinity_checkbox] = useState(true);
  const [isChecked, updateCheckbox] = useState(false);
  const [filterValue, updateFilterValue] = useState("");
  const [alertMessage, setAlertMessage] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  const [imageSearchData, updateimageSearchData] = useState({
    imgSrc: "",
    tagsResp: {},
    file: null,
  });
  const productId = useRef("");
  const [imgLoadStatus, updateImgLoadStatus] = useState(false);

  let debug = false;
  let qp =
    window.location && window.location.search
      ? window.location.search.replace("?", "")
      : "";
  qp = decodeURIComponent(qp);
  qp = qp.split("&");
  qp.map((param) => {
    if (param) {
      let paramArr = param.split("=");
      if (paramArr[0] && paramArr[1]) {
        if (
          paramArr[0] === "id" &&
          paramArr[1] &&
          paramArr[1] !== productId.current
        ) {
          productId.current = paramArr[1];
          render.current = false;
        } else if (paramArr[0] === "force_debug") {
          debug = paramArr[1] === "true";
        }
      }
    }
    return param;
  });

  let redirectLink = `/product-display/?id=${productId.current}`;

  // if (isFromCurations) {
  //   redirectLink = `/curation/?id=${remainingProps.id}`;
  // } else if (isFromCurationProductList) {
  //   redirectLink = `/product-display/?id=${remainingProps.id}`;
  // } else {
  //   redirectLink = `/product-display/?id=${product_id}`;
  // }

  useEffect(() => {
    if (widgetList && widgetList.length) {
      let _widget = widgetList[0];
      if (
        filterValue &&
        filterValue != "" &&
        (_widget["widgetList"].includes("0_enableBundit") ||
          _widget["widgetList"].includes("0_disableBundit"))
      ) {
        _widget.postBody = { ..._widget.postBody, ...{ filters: filterValue } };
      } else {
        if (_widget.postBody.filters) {
          let new_widget = { ..._widget.postBody };
          delete new_widget.filters;
          _widget.postBody = { ...new_widget };
        }
      }
      updateWidget(_widget);
      let new_widget_list = widgetList.slice(1);
      updateWidgetList(new_widget_list);
    }
  }, [widgetList]);

  return (
    <>
      {/* <TitleWrapper>
            <VueLogoImg src={VueCommerceLogo} alt='Vue Commerce Logo' title='Vue Commerce' />
            <VueLogoImg src={VueStyleLogo} alt='Vue Style Logo' title='Vue Style' />
        </TitleWrapper> */}
      <ConfigConsumer>
        {(context) => {
          const { productDetails } = context;
          let API_KEY = context.API_KEY;
          if (productDetails.vueX) {
            if (productDetails.VUEX_API_KEY) {
              API_KEY = productDetails.VUEX_API_KEY;
            }
          } else {
            if (productDetails.API_KEY) {
              API_KEY = productDetails.API_KEY;
            }
          }
          const {
            endPoint,
            productRecommendation,
            similarRecommendation,
            personalizedRecommendation,
            hideTagResults,
          } = productDetails;
          const vuetag_obj = context.vue_tag;
          let baseEndPoint = context.url;
          if (endPoint) {
            baseEndPoint = endPoint;
          }

          const mad_UUID = getCookie("mad_UUID");
          let user_id = localStorage.getItem("userId");
          if (!user_id) {
            user_id = context.user_id;
          }
          if (
            !render.current &&
            user_id &&
            API_KEY &&
            mad_UUID &&
            baseEndPoint &&
            productRecommendation &&
            similarRecommendation &&
            personalizedRecommendation
          ) {
            if (hasOnlyOccasionName && hasOnlyOccasionName.length) {
              updateDisplayOccasion("");
              updateOccasionStyleData([]);
              updateAllOccasionDetails([]);
              updateHasOnlyOccasionName([]);
              updateModal(false);
              updateSparkLineArr([]);
              updateCheckbox(false);
            }
            window.scrollTo(0, 0);
            render.current = true;
            let widget_arr = [];
            if (
              context.vue_user &&
              context.vue_user.userAffinityPage &&
              context.vue_user.userAffinityUrl.length > 0
            ) {
              widget_arr.push({
                widgetList: ["user_affinity"],
                postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}`,
                recommendationUrl: context.vue_user.userAffinityUrl,
              });
            }

            let vuestyleDetails = context.vuestyleDetails;
            let occasion_list = [];
            if (vuestyleDetails && vuestyleDetails.occasion_list) {
              occasion_list = vuestyleDetails.occasion_list.replace(/'/g, "");
            }
            let vuestyle_endpoint = baseEndPoint;
            if (vuestyleDetails && vuestyleDetails.vuestyle_endpoint) {
              vuestyle_endpoint = vuestyleDetails.vuestyle_endpoint;
            }
            let vuestyle_num_results = 4;
            if (vuestyleDetails && vuestyleDetails.num_results) {
              vuestyle_num_results = vuestyleDetails.num_results;
            }
            let products_per_outfit = 3;
            if (vuestyleDetails && vuestyleDetails.products_per_outfit) {
              products_per_outfit = vuestyleDetails.products_per_outfit;
            }

            let manually_curated = '"false"';

            if (context.client_name == "2253_yoox-poc") {
              occasion_list =
                '["collection_1106","collection_1107","collection_1110"]';
            } else if (context.client_name == "2239_rtd6") {
              occasion_list = '["collection_1227"]';
              manually_curated = '"true"';
              products_per_outfit = 5;
            }
            // else if(context.client_name == '14_namshi'){
            //   occasion_list = '["Casual", "Brunch" , "Work Out", "Office", "Party", "Holiday"]'
            //   vuestyle_endpoint = 'https://ap-southeast-1-vuestyle-staging.madstreetden.com'
            // }
            // else if(context.client_name == '2251_flava-topfloor'){
            //   occasion_list = '["collection_1215", "collection_1231", "collection_1261"]'
            //   vuestyle_endpoint = 'https://ap-southeast-1-vuestyle-staging.madstreetden.com'
            // }
            // else if (context.client_name == "2293_hayneedle") {
            //   occasion_list =
            //     '["Furniture"]';
            //   vuestyle_endpoint =
            //     // "https://us-east-1-new-algo-vuestyle.madstreetden.com";
            //     "https://us-east-1-api.madstreetden.com/v3";
            //   products_per_outfit = 5;
            //   vuestyle_num_results = 5;
            // }
            const config = context.productDetails || {};
            const isVueX = config.vueX || false;
            const widgetPayload =
              (config.widgetPayload &&
                config.widgetPayload[isVueX ? "vueX" : "vueApp"]) ||
              fallBack;
            if (occasion_list.length > 0 && vuestyleDetails.active) {
              if (isVueX) {
                widget_arr.push({
                  configName: "productDetails",
                  widgetList: ["9"],
                  // The post body will be converted to required request payload format in the fetch method
                  postBody: {
                    user_id,
                    api_key: API_KEY,
                    widget_list: [9],
                    mad_uuid: mad_UUID,
                    product_id: productId.current,
                    occasions_list: occasion_list,
                  },
                  recommendationUrl: `${widgetPayload.robinUrl ||
                    vuestyle_endpoint}${isVueX ? "/widgets" : "/vuestyle/widgets"
                    }`,
                });
              } else {
                widget_arr.push({
                  configName: "productDetails",
                  widgetList: ["9"],
                  // The post body will be converted to required request payload format in the fetch method
                  postBody: {
                    user_id,
                    api_key: API_KEY,
                    widget_list: [9],
                    mad_uuid: mad_UUID,
                    product_id: productId.current,
                    num_results: vuestyle_num_results,
                    occasions: occasion_list,
                    products_per_outfit: products_per_outfit,
                  },
                  recommendationUrl: `${widgetPayload.robinUrl ||
                    vuestyle_endpoint}${isVueX ? "/widgets" : "/vuestyle/widgets"
                    }`,
                });
              }
            }

            if (context.client_name == "2253_yoox-poc") {
              widget_arr.push({
                widgetList: ["user_affinity"],
                postBody: `api_key=${API_KEY}&client_id="2253"&client_name="yoox-poc"&mad_uuid=${mad_UUID}&user_id=${user_id}`,
                recommendationUrl:
                  "https://eu-robin-poc.madstreetden.com/v2/user_affinity",
              });
            }
            // else {
            //   widget_arr.push({
            //     widgetList: ["8"],
            //     postBody: `api_key=${API_KEY}&cp_ensemble=true&details=true&duplicates=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link","msd_ontology"]&mad_uuid=${mad_UUID}&user_id=${user_id}&num_results=[15]&require_source=true&widget_list=[8]&product_id=${productId.current}&brand_filter=false&cp_random=true&user_boost_params=&is_from_demo_site=true&force_debug=true`,
            //     recommendationUrl: baseEndPoint + productRecommendation,
            //   });
            // }

            widget_arr.push({
              configName: "productDetails",
              widgetList: ["0_disableBundit"],
              // The post body will be converted to required request payload format in the fetch method
              postBody: {
                user_id,
                api_key: API_KEY,
                widget_list: [0],
                mad_uuid: mad_UUID,
                product_id: productId.current,
              },
              recommendationUrl: `${widgetPayload.robinUrl || baseEndPoint}${isVueX ? "/widgets" : similarRecommendation
                }`,
            });
            widget_arr.push({
              configName: "productDetails",
              widgetList: ["0_enableBundit"],
              // The post body will be converted to required request payload format in the fetch method
              postBody: {
                user_id,
                api_key: API_KEY,
                widget_list: [0],
                mad_uuid: mad_UUID,
                product_id: productId.current,
              },
              recommendationUrl: `${widgetPayload.robinUrl || baseEndPoint}${isVueX ? "/widgets" : personalizedRecommendation
                }`,
            });
            widget_arr.push({
              configName: "productDetails",
              widgetList: ["4"],
              // The post body will be converted to required request payload format in the fetch method
              postBody: {
                user_id,
                api_key: API_KEY,
                widget_list: [4],
                mad_uuid: mad_UUID,
                product_id: productId.current,
              },
              recommendationUrl: `${widgetPayload.robinUrl || baseEndPoint}${isVueX ? "/widgets" : personalizedRecommendation
                }`,
            });
            updateWidgetList(widget_arr);
            updateCopyWidgetArr(widget_arr);
          }
          const feedbackSubmit = (feedbackPayload, product_id) => {
            fetch(productDetails.feedbackPostURL, {
              method: "POST",
              headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
              body: JSON.stringify({
                "product_id": product_id,
                "data": feedbackPayload
              })
            })
              .then((data) => data.json())
              .then((resp) => {
                if (resp && resp.status && resp.status.toLowerCase() === "success" || "ok") {
                  setAlertMessage({
                    message: 'Feedback submitted successfully!',
                    status: 'SUCCESS'
                  })
                  window.location.reload();
                } else {
                  setAlertMessage({
                    message: 'Feedback failed!',
                    status: 'ERROR'
                  })
                }
                setTimeout(() =>
                  setAlertMessage({})
                  , 1000);
              })
              .catch((err) => {
                setAlertMessage({
                  message: 'Feedback failed!',
                  status: 'ERROR'
                })
                setTimeout(() => {
                  setAlertMessage({})

                }, 1000);
              });;
          }
          let type = "video";
          let image_link = PlayButton;
          let title = "Video";
          let videoUrl = "https://www.youtube.com/watch?v=tbodhmmqa-g";
          let internal_image_url;
          return (
            <PlayerConsumer>
              {(videoContext) => {
                const { setShowVideo, setVideoLink } = videoContext;
                //  debugger
                return (
                  <RecommendationFeedbackContainer config={context} setAlertMessage={setAlertMessage}>
                    <AlertEl isActive={alertMessage.message != undefined} type={alertMessage.status}>
                      {alertMessage.message}
                    </AlertEl>
                    <RecommendedPdtsContainer
                      recommendedWidgetList={currWidget}
                      fallBack={fallBack}
                      appConfig={context}
                      force_debug={debug}
                    >
                      <RecommendedPdtsConsumer>
                        {(context) => {
                          const {
                            updateProductRecommendation,
                            relative_affinity,
                            absolute_affinity,
                          } = context;
                          return (
                            <ProductDetailsContainer
                              productId={productId.current}
                              force_debug={debug}
                              updateProductRecommendation={
                                updateProductRecommendation
                              }
                            >
                              <ProductDetailsConsumer>
                                {(innercontext) => {
                                  return (
                                    <>
                                      <VideoPlayer />
                                      <ProductDetailsWrapper>
                                        <NavigationWrapper>
                                          <BreadcrumbLinks
                                            page={"Product display"}
                                          />
                                          <RenderCLPMenu />
                                        </NavigationWrapper>
                                        <RenderTopcontainer
                                          updateimageSearchData={
                                            updateimageSearchData
                                          }
                                          imageSearchData={imageSearchData}
                                          productId={productId.current}
                                          debug={debug}
                                          ontology={ontology}
                                          updateOntology={updateOntology}
                                          updateMsdOntology={updateMsdOntology}
                                          hideTagResults={hideTagResults}
                                          client_name={context.client_name}
                                          tagsToShow={
                                            context.productDetails.tagsToShow
                                          }
                                          type={context.config.cardType}
                                          imageLink={context.config.imageLink}
                                          vuetag_obj={vuetag_obj}
                                          showMetaData={
                                            context?.productDetails
                                              ?.show_meta_data
                                          }
                                          productDetails={innercontext}
                                          context={context}
                                          feedbackSubmit={feedbackSubmit}
                                          feedbackFields={context.productDetails.feedbackFields}
                                          showFeedback={context.productDetails.showFeedback}
                                          feedbacks={feedbacks}
                                          setFeedbacks={setFeedbacks}
                                        />
                                        <div
                                          style={{
                                            width: "75%",
                                            marginRight: "1em",
                                          }}
                                        >
                                          {
                                            context?.productDetails?.meta_data_position != "left" || context?.productDetails?.meta_data_position == undefined ? (
                                              <RenderMetaData
                                                showMetaData={
                                                  context?.productDetails
                                                    ?.show_meta_data
                                                }
                                                metaData={
                                                  context?.productDetails?.metaData
                                                }
                                                config={context}
                                                productId={productId.current}
                                                debug={debug}
                                                productDetails={innercontext}
                                              />
                                            ) : null
                                          }

                                          <RenderRecommendationContainer
                                            isChecked={isChecked}
                                            updateCheckbox={updateCheckbox}
                                            is_affinity_checked={
                                              is_affinity_checked
                                            }
                                            update_affinity_checkbox={
                                              update_affinity_checkbox
                                            }
                                            force_debug={debug}
                                            filterValue={filterValue}
                                            updateFilterValue={updateFilterValue}
                                            updateWidgetList={updateWidgetList}
                                            copyWidgetArr={copyWidgetArr}
                                            sourceProductId={productId.current}
                                            feedbacks={feedbacks}
                                            setFeedbacks={setFeedbacks}
                                            productDetails={innercontext}
                                            feedbackFields={context.productDetails.feedbackFields}
                                          />
                                          <RenderStyleItContainer
                                            displayOccasion={displayOccasion}
                                            updateDisplayOccasion={
                                              updateDisplayOccasion
                                            }
                                            OccasionStyleData={OccasionStyleData}
                                            updateOccasionStyleData={
                                              updateOccasionStyleData
                                            }
                                            AllOccasionDetails={
                                              AllOccasionDetails
                                            }
                                            updateAllOccasionDetails={
                                              updateAllOccasionDetails
                                            }
                                            hasOnlyOccasionName={
                                              hasOnlyOccasionName
                                            }
                                            updateHasOnlyOccasionName={
                                              updateHasOnlyOccasionName
                                            }
                                            isModalOpen={isModalOpen}
                                            updateModal={updateModal}
                                            sourceProductId={productId.current}
                                          ></RenderStyleItContainer>
                                          {is_affinity_checked > 0 && (context?.productDetails?.showUserAffinity || context?.productDetails?.showUserAffinity == undefined) &&
                                            (relative_affinity ||
                                              absolute_affinity) ? (
                                            <AffinityContainer>
                                              <UserAffinityTitle>
                                                User Affinity
                                              </UserAffinityTitle>
                                              <UserAffinityWrapper>
                                                <RenderSpiderContainer
                                                  is_affinity_checked={
                                                    is_affinity_checked
                                                  }
                                                />
                                                {ontology && (
                                                  <RenderSparkLine
                                                    is_affinity_checked={
                                                      is_affinity_checked
                                                    }
                                                    sparkLineArr={sparkLineArr}
                                                    updateSparkLineArr={
                                                      updateSparkLineArr
                                                    }
                                                    ontology={ontology}
                                                  />
                                                )}
                                                <RenderWordCloud
                                                  is_affinity_checked={
                                                    is_affinity_checked
                                                  }
                                                  ontology={ontology}
                                                  msdontology={msdontology}
                                                  type={"positive"}
                                                ></RenderWordCloud>
                                              </UserAffinityWrapper>

                                              {/* <AffinityCloseButtonContainer>
                        <Button
                          onClick={() =>
                            update_affinity_checkbox(!is_affinity_checked)
                          }
                        >
                          Close
                        </Button>
                      </AffinityCloseButtonContainer> */}
                                            </AffinityContainer>
                                          ) : null}
                                        </div>
                                        {/* <RenderBottomContainer>
                      <ButtonWrap>
                        <Button 
                          color="blue" 
                          onClick={()=> {window.location.href = "https://vue.ai/developer/docs/customer-journey-management/templates#customize-using-code";}}
                          style={{ flex: 1, margin: '10px', borderRadius: '50px', background: '#2962ff', textTransform: 'uppercase' }}
                        >
                          Custom Templates 
                        </Button>
                        <Button 
                          color="blue" 
                          onClick={()=> {window.location.href = "https://vue.ai/developer/docs/customer-journey-management/experiences#add-business-rules";}}
                          style={{ flex: 1, margin: '10px', borderRadius: '50px', background: '#2962ff', textTransform: 'uppercase' }}
                        >
                          Business Rules 
                        </Button>
                        <Button 
                          color="blue" 
                          onClick={()=> {window.location.href = "https://vue.ai/developer/docs/customer-journey-management/strategies#customizing-strategies";}}
                          style={{ flex: 1, margin: '10px', borderRadius: '50px', background: '#2962ff', textTransform: 'uppercase' }}
                        >
                          Custom Strategy
                        </Button>
                      </ButtonWrap>
                      <div style={{ display: 'flex' }}>
                      <ImageDivWrapper>
                        <ImageContainer>
                          <DataItemImg
                            src={
                                  imgLoadStatus
                                  ? type == "video" ? (image_link || LoaderImg) : (image_link || internal_image_url || LoaderImg)
                                  : LoaderImg
                                }
                            alt={title || "Data Image"}
                            onLoad={(e) => updateImgLoadStatus(true)}
                            onError={(e) => updateImgLoadStatus(true)}
                            style={{}}
                            onClick={() => {
                              setVideoLink(videoUrl)
                              type == "video" ? setShowVideo(true) : (window.location.href = redirectLink)
                            }}
                            // onMouseOver={ e => (e.currentTarget.src = "https://www.seekpng.com/png/detail/12-128400_open-small-play-button-icon.png")}
                            // onMouseLeave={ e => (e.currentTarget.src = image_link)}
                          />
                        </ImageContainer>
                      </ImageDivWrapper>
                      <ImageDivWrapper>
                        <ImageContainer>
                          <DataItemImg
                            src={
                              imgLoadStatus
                                  ? type == "video" ? (image_link || LoaderImg) : (image_link || internal_image_url || LoaderImg)
                                  : LoaderImg
                            }
                            alt={title || "Data Image"}
                            onLoad={(e) => updateImgLoadStatus(true)}
                            onError={(e) => updateImgLoadStatus(true)}
                            style={{}}
                            onClick={() => {
                              setVideoLink(videoUrl)
                              type == "video" ? setShowVideo(true) : (window.location.href = redirectLink)
                            }}
                          />
                        </ImageContainer>
                      </ImageDivWrapper>
                      </div>        
                      <div style={{ display: 'flex' }}>
                      <ImageDivWrapper style={{ width: '50%' }}>
                        <ImageContainer>
                          <DataItemImg
                            src={
                              imgLoadStatus
                                  ? type == "video" ? (image_link || LoaderImg) : (image_link || internal_image_url || LoaderImg)
                                  : LoaderImg
                                }
                            alt={title || "Data Image"}
                            onLoad={(e) => updateImgLoadStatus(true)}
                            onError={(e) => updateImgLoadStatus(true)}
                            style={{}}
                            onClick={() => {
                              setVideoLink(videoUrl)
                              type == "video" ? setShowVideo(true) : (window.location.href = redirectLink)
                            }}
                          />
                        </ImageContainer>
                      </ImageDivWrapper>
                      <div style={{ width: '50%' }}/>
                      </div>          */}
                                        {/* {showWishlistButton ? (
                  <HeaderConfigConsumer>
                    {(context) => {
                      const { updateWishlistPdtCount } = context[1];
                      return (
                        <RedirectLinkMask
                          isFromCarouselWithTabs={isFromCarouselWithTabs}
                          // to={redirectLink}
                          onClick={() => {
                            setVideoLink(videoUrl)
                            type == "video" ? setShowVideo(true) : (window.location.href = redirectLink)
                          }}
                        >
                          <div
                            style={{
                              height: "30px",
                              width: "30px",
                              zIndex: 1000,
                              position: "absolute",
                              top: "0px",
                              right: "0px",
                            }}
                            onClick={(e) => {
                              addToWishlistHandler(
                                image_link,
                                title,
                                product_id,
                                isFromCurationProductList,
                                price,
                                updateWishlistPdtCount,
                                remainingProps
                              );
                              e.stopPropagation();
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
                              style={{ padding: "4px" }}
                            />
                          </div>
                        </RedirectLinkMask>
                      );
                    }}
                  </HeaderConfigConsumer>
                ) : ( */}
                                        {/* <div style={{ position: 'relative' }}>
                    <RedirectLinkMask
                  //   isFromCarouselWithTabs={isFromCarouselWithTabs}
                      onClick={() => {
                        setVideoLink(videoUrl)
                        type == "video" ? setShowVideo(true) : (window.location.href = redirectLink)
                      }}
                    />
                    </div> */}
                                        {/* )
                  } */}

                                        {/* </RenderBottomContainer> */}
                                      </ProductDetailsWrapper>
                                    </>
                                  );
                                }}
                              </ProductDetailsConsumer>
                            </ProductDetailsContainer>
                          );
                        }}
                      </RecommendedPdtsConsumer>
                    </RecommendedPdtsContainer>
                  </RecommendationFeedbackContainer>
                );
              }}
            </PlayerConsumer>
          );
        }}
      </ConfigConsumer>
    </>
  );
};

export { ProductDetails };
