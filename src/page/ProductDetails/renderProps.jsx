import React, { useState, useEffect, useRef } from "react";
import {
  ProductDetailsContainer,
  ProductDetailsConsumer,
  RecommendationFeedbackConsumer,
} from "../../container";
import {
  ProductImageEl,
  ProductImageCont,
  LeftContainer,
  RightContainer,
  FullContainer,
  PdtTopWrapper,
  CheckBoxWrapper,
  CheckBoxWrapperRecos,
  OccassionSelectBoxWrapper,
  SparkLineContainer,
  SpiderContainer,
  SparkLineWrapper,
  WordCloudContainer,
  ToggleContainer,
  ButtonContainer,
  ThemeDropdownWrapper,
  AffinityContainer,
  WordCloudWrapper,
  RecosWrapper,
  ProductImageWrapper,
  ModalWrapper,
  StyleItWithWrapper,
  StyleItTitleWrapper,
  StyleItWithButtonWrapper,
  FilterIconContainer,
  BrandPriceContainer,
  MetaDataWrapper,
  TitleContainer,
} from "./styled";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { RecommendedPdtsConsumer, ConfigConsumer } from "../../container";
import {
  ProductCarouselWithTabs,
  SpiderBlock,
  ProductCarousel,
} from "../../component";
import { RenderDropDown } from "../VueFind/renderProps";
import { CLPMenuOverflowWrapper } from "../VueFind/styled";
import { RenderSearchResults } from "../VueTag/renderProps";
import ReactWordcloud from "react-wordcloud";
import { cardStyleConfig } from "../../styleConfig";
import { capitalize } from "../../common";
import {
  Checkbox,
  Select,
  Button,
  Modal,
  Label,
  Icon,
  TextArea,
  Form,
} from "semantic-ui-react";
import { DefaultValues } from "../../configs";
import LoaderImg from "../../static/img/placeholder.svg";
import { CardBlock, ListElement } from "../../component";

const defaultTabsContainer = [
  {
    value: "Similar Recommendations",
    index: "0_disableBundit",
  },
  {
    value: "Personalized Recommendations",
    index: "0_enableBundit",
  },
];

const RenderVueTagAPI = (props) => {
  const {
    pdtId,
    debug,
    isTagCallMade,
    updateTagCall,
    updateimageSearchData,
    imageSearchData,
    ontology,
    updateOntology,
    updateMsdOntology,
    client_name,
    vuetag_obj,
  } = props;
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { updateProductRecommendation } = context;
        return (
          <ProductDetailsConsumer>
            {(context) => {
              const UserData = context.length ? context[0] : {};
              updateMsdOntology(UserData.msd_ontology || UserData.ontology);
              if (UserData && UserData.msd_ontology) {
                let construct_ontology = UserData.msd_ontology.split(">");
                if (construct_ontology.length > 1) {
                  updateOntology(
                    construct_ontology[0] + ">" + construct_ontology[1]
                  );
                }
              } else if (UserData && UserData.ontology) {
                let construct_ontology = UserData.ontology.split(">");
                if (construct_ontology.length > 1) {
                  updateOntology(
                    construct_ontology[0] + ">" + construct_ontology[1]
                  );
                }
              }

              if (client_name == "14_namshi") {
                if (UserData && UserData.ontology) {
                  let construct_ontology = UserData.ontology.split(">");
                  if (construct_ontology.length > 1) {
                    updateOntology(
                      construct_ontology[0].toLowerCase() +
                      ">" +
                      construct_ontology[1].toLowerCase()
                    );
                  }
                }
              }

              if (client_name == "2733_smcp-sandro") {
                if (UserData && UserData.ontology) {
                  let construct_ontology = UserData.ontology.split(">");
                  if (construct_ontology.length > 1) {
                    updateOntology(
                      construct_ontology[0].toLowerCase() +
                      ">" +
                      construct_ontology[1].toLowerCase()
                    );
                  }
                }
              }

              if (UserData && UserData.internal_image_url) {
                if (
                  !isTagCallMade ||
                  UserData.internal_image_url != imageSearchData["imgSrc"]
                ) {
                  updateTagCall(true);
                  makeAPIRequests(
                    UserData.internal_image_url,
                    updateimageSearchData,
                    {},
                    vuetag_obj,
                    client_name
                  );
                }
              } else if (UserData && UserData.image_link) {
                if (
                  !isTagCallMade ||
                  UserData.image_link != imageSearchData["imgSrc"]
                ) {
                  updateTagCall(true);
                  makeAPIRequests(
                    UserData.image_link,
                    updateimageSearchData,
                    {},
                    vuetag_obj,
                    client_name
                  );
                }
              }
            }}
          </ProductDetailsConsumer>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const renderProductContainer = (props) => {
  const { pdtId, debug } = props;

  return (
    <ProductDetailsContainer productId={pdtId} force_debug={debug}>
      <ProductDetailsConsumer>
        {(context) => {
          const UserData = context.length ? context[0] : {};
          return <ProductImage {...UserData} />;
        }}
      </ProductDetailsConsumer>
    </ProductDetailsContainer>
  );
};

const ProductImage = (props) => {
  const { image_link, title } = props;
  return (
    <ProductImageCont>
      <ProductImageEl src={image_link || LoaderImg} alt={title} />
    </ProductImageCont>
  );
};

const getTags = (file, configProps, vuetag_obj, client_name) => {
  let tag = vuetag_obj["tag_endpoint"]
    ? vuetag_obj["tag_endpoint"]
    : DefaultValues["vue_tag_url"];
  let apiKey = vuetag_obj["API_KEY"]
    ? vuetag_obj["API_KEY"]
    : DefaultValues["vue_tag_api_key"];
  let client_id = null;
  let force_facet = "";

  if (tag && file) {
    let formData;
    if (
      (typeof file === "string" && file.length) ||
      (!Array.isArray(file) && file[0])
    ) {
      if (typeof file === "string") {
        let formObj = {};
        if (file.startsWith("[")) {
          file = JSON.parse(file);
          formObj["cache_clear"] = "true";
        }

        formObj["api_key"] = apiKey;
        formObj["correlation_key"] = "";
        formObj["image_url"] = file;
        formObj["image_type"] = 1;
        formObj["image"] = file;
        formObj["client_id"] = client_id;

        if (force_facet) {
          formObj["facet"] = force_facet;
        }

        formData = JSON.stringify(formObj);
      }
    }
    // if(!(client_name === '2321_grocery-demo' || client_name === '2293_hayneedle')){
    //   return fetch(tag, {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((data) => data.json())
    //     .then((resp) => resp)
    //     .catch((err) => console.log(err));
    // }
  }
};

const makeAPIRequests = (
  file,
  updateimageSearchData,
  configProps,
  vuetag_obj,
  client_name
) => {
  Promise.all([getTags(file, configProps, vuetag_obj, client_name)])
    .then((response) => {
      if (response && response.length) {
        updateimageSearchData((currResp) => {
          let UploadedResp = { ...currResp };
          if (
            response[0] &&
            response[0].status &&
            response[0].status.toLowerCase() === "success"
          ) {
            UploadedResp.tagsResp = { ...response[0] };
          }
          UploadedResp.tagsResp.loading = false;
          UploadedResp.imgSrc = file;
          return UploadedResp;
        });
      }
    })
    .catch((err) => {
      updateimageSearchData((currResp) => {
        let UploadedResp = { ...currResp };
        UploadedResp.tagsResp.loading = false;
        UploadedResp.imgSrc = file;
        return UploadedResp;
      });
    });
  updateimageSearchData((currResp) => {
    let UploadedResp = { ...currResp };
    UploadedResp.tagsResp.loading = true;
    UploadedResp.imgSrc = file;
    return UploadedResp;
  });
};

const RenderTopcontainer = (props) => {
  const {
    productId,
    debug,
    updateimageSearchData,
    imageSearchData,
    ontology,
    updateOntology,
    updateMsdOntology,
    hideTagResults,
    client_name,
    tagsToShow,
    type,
    imageLink,
    vuetag_obj,
    showMetaData,
    productDetails,
    feedbackSubmit,
    feedbackFields,
    showFeedback,
    feedbacks,
    setFeedbacks
  } = props;
  const { imgSrc, tagsResp } = imageSearchData;
  const [isTagCallMade, updateTagCall] = useState(false);
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const UserData = productDetails.length ? productDetails[0] : {};
        let StyleLookArr = context["8"] || context["4"] || context["9"] || [];
        if (
          context["9"] !== undefined &&
          context["9"] !== null &&
          context["9"].length > 0
        ) {
          let outfit_object = context["9"][0];
          Object.keys(outfit_object).forEach(function (each_value) {
            StyleLookArr = outfit_object[each_value];
          });
        }
        if (
          StyleLookArr &&
          StyleLookArr.length > 0 &&
          !Array.isArray(StyleLookArr[0])
        ) {
          StyleLookArr = [StyleLookArr];
        }
        let defaultLookContainer = [];
        if (
          context["4"] !== undefined &&
          context["4"] !== null &&
          context["4"].length > 0
        ) {
          StyleLookArr.map((styles, key) => {
            defaultLookContainer.push({
              value: "Complete Your Purchase",
              index: key.toString(),
            });
            return styles;
          });
        } else {
          StyleLookArr.map((styles, key) => {
            defaultLookContainer.push({
              value: `Look ${key + 1}`,
              index: key.toString(),
            });
            return styles;
          });
        }
        //makeAPIRequests()
        return (
          <PdtTopWrapper>
            {/* <LeftContainer>
                    {renderProductContainer({ pdtId: productId, debug })}
                </LeftContainer> */}
            <RenderVueTagAPI
              updateimageSearchData={updateimageSearchData}
              imageSearchData={imageSearchData}
              pdtId={productId}
              isTagCallMade={isTagCallMade}
              updateTagCall={updateTagCall}
              debug={debug}
              ontology={ontology}
              updateOntology={updateOntology}
              updateMsdOntology={updateMsdOntology}
              client_name={client_name}
              vuetag_obj={vuetag_obj}
            ></RenderVueTagAPI>
            <FullContainer>
              <RenderSearchResults
                src={imgSrc}
                tagsResp={tagsResp}
                is_from_pdp_page={true}
                showWishlistButton={true}
                showBuyButton={true}
                hideTitle={showMetaData}
                userData={UserData}
                hideTagResults={hideTagResults}
                tagsToShow={tagsToShow}
                type={type}
                productId={productId}
                imageLink={imageLink}
                context={context}
                debug={debug}
                productDetails={productDetails}
                feedbackSubmit={feedbackSubmit}
                feedbackFields={feedbackFields}
                showFeedback={showFeedback}
                feedbacks={feedbacks}
                setFeedbacks={setFeedbacks}
              />
            </FullContainer>
            {/* <ProductCarouselWithTabs
                        tabsContainer={defaultLookContainer}
                        activeIndex='0'
                        recommendedData={StyleLookArr}
                        sliderPerGroup={3}
                        loading={loading}
                    /> */}
          </PdtTopWrapper>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const RenderMetaData = (props) => {
  const {
    showMetaData,
    metaData,
    config,
    productId,
    debug,
    productDetails,
  } = props;
  const UserData = productDetails.length ? productDetails[0] : {};
  return showMetaData && metaData.length ? (
    <>
      <MetaDataWrapper style={{ margin: "20px 0 20px" }}>
        {showMetaData &&
          metaData?.map((item) =>
            UserData[item] !== undefined &&
              UserData[item] !== null &&
              UserData[item] !== "" ? (
              item === "title" || item === "Title" ? (
                <TitleContainer
                  styleConfig={
                    config?.productDetails?.styleConfig?.product_title
                  }
                >
                  {UserData[item]}
                </TitleContainer>
              ) : (
                <BrandPriceContainer
                  styleConfig={config?.productDetails?.styleConfig?.meta}
                >
                  <b>{item}: </b>
                  {UserData[item]}
                </BrandPriceContainer>
              )
            ) : null
          )}
      </MetaDataWrapper>
    </>
  ) : null;
};

const RenderOccassionsDropdown = (props) => {
  const {
    displayOccasion,
    updateDisplayOccasion,
    AllOccasionDetails,
    updateOccasionStyleData,
  } = props;
  const changeOccassion = (event, { value }) => {
    updateDisplayOccasion(value);
    for (let each_occasion in AllOccasionDetails) {
      if (AllOccasionDetails[each_occasion]["value"] == value) {
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
          const { loading } = context;
          const { force_debug } = props;
          return (
            <>
              {AllOccasionDetails && displayOccasion ? (
                <ThemeDropdownWrapper>
                  <Select
                    placeholder="Select occassion"
                    options={AllOccasionDetails}
                    onChange={changeOccassion}
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

const RenderStyleItContainer = (props) => {
  const {
    displayOccasion,
    updateDisplayOccasion,
    OccasionStyleData,
    updateOccasionStyleData,
    AllOccasionDetails,
    updateAllOccasionDetails,
    hasOnlyOccasionName,
    updateHasOnlyOccasionName,
    isModalOpen,
    updateModal,
  } = props;

  const [modelOpen, updateModelState] = useState(true);
  useEffect(() => {
    if (modelOpen) {
      const slider = document
        .getElementById("styleitwith")
        ?.querySelector(".slick-list");
      if (slider) {
        slider.style.margin = "auto";
        slider.style.display = "flex";
        slider.querySelector(".slick-track").style.display = "inline-flex";
      }
    }
  }, [modelOpen, OccasionStyleData]);

  function showModal() {
    updateModelState(true);
  }
  function closeModal() {
    updateModelState(false);
  }
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { loading, productDetails, vue_find } = context;
        const iconStyleConfig = vue_find.styleConfig
          ? vue_find.styleConfig.card
          : undefined;
        const { force_debug } = props;
        let each_occassion = "";
        let defaultLookContainer = [];
        if (context["9"]) {
          let outfit_arr = context["9"];
          for (let each_collection in outfit_arr) {
            defaultLookContainer = [];
            let StyleLookArr = [];
            let outfit_object = outfit_arr[each_collection];
            Object.keys(outfit_object).forEach(function (each_value) {
              StyleLookArr = outfit_object[each_value];
              each_occassion = each_value;
            });
            StyleLookArr.map((styles, key) => {
              defaultLookContainer.push({
                value: `Style ${key + 1}`,
                index: key.toString(),
              });
              return styles;
            });
            if (each_collection == "0" && hasOnlyOccasionName.length == 0) {
              updateDisplayOccasion(each_occassion);
              updateOccasionStyleData(StyleLookArr);
            }
            if (
              each_occassion == "collection_1106" &&
              hasOnlyOccasionName.indexOf(each_occassion) == -1
            ) {
              hasOnlyOccasionName.push(each_occassion);
              AllOccasionDetails.push({
                key: each_occassion,
                value: each_occassion,
                text: "Global_Women_Collection_01",
                StyleLookArr: StyleLookArr,
              });
            } else if (
              each_occassion == "collection_1107" &&
              hasOnlyOccasionName.indexOf(each_occassion) == -1
            ) {
              hasOnlyOccasionName.push(each_occassion);
              AllOccasionDetails.push({
                key: each_occassion,
                value: each_occassion,
                text: "Global_Women_Collection_02",
                StyleLookArr: StyleLookArr,
              });
            } else if (
              each_occassion == "collection_1110" &&
              hasOnlyOccasionName.indexOf(each_occassion) == -1
            ) {
              hasOnlyOccasionName.push(each_occassion);
              AllOccasionDetails.push({
                key: each_occassion,
                value: each_occassion,
                text: "Global_Men_Collection_01",
                StyleLookArr: StyleLookArr,
              });
            } else if (hasOnlyOccasionName.indexOf(each_occassion) == -1) {
              hasOnlyOccasionName.push(each_occassion);
              let occasion_text = each_occassion;
              AllOccasionDetails.push({
                key: each_occassion,
                value: each_occassion,
                text: occasion_text,
                StyleLookArr: StyleLookArr,
              });
            }
          }
        } else if (context["loading"] && hasOnlyOccasionName.length != 0) {
          updateHasOnlyOccasionName([]);
          updateAllOccasionDetails([]);
        }
        return (
          <>
            {/* <CheckBoxWrapper> */}
            {/* <Checkbox toggle label={isChecked ? 'Show Styles' : 'Show Styles'} checked={isChecked} onChange={toggletCheckbox} /> */}
            {/* <ConfigConsumer>
                {(context) => {
                  return context.vuestyleDetails.active == false ? null : (
                    <OccassionSelectBoxWrapper>
                      <Button
                        color="blue"
                        disabled={AllOccasionDetails.length > 0 ? false : true}
                        onClick={showModal}
                        fluid
                      >
                        Style It With
                      </Button>
                    </OccassionSelectBoxWrapper>
                  );
                }}
              </ConfigConsumer> */}
            {/* </CheckBoxWrapper> */}
            {AllOccasionDetails.length > 0 ? (
              <ModalWrapper>
                {/* <Modal dimmer={false} style={{ width: '68%', position: 'absolute', right: '0%', marginRight: '5%' }} size='large' open={isModalOpen} onClose={closeModal}>
                        <Modal.Header>Style It With</Modal.Header>
                                <Modal.Content>
                                    {showModal ? <RenderOccassionsDropdown AllOccasionDetails={AllOccasionDetails} displayOccasion={displayOccasion} updateDisplayOccasion={updateDisplayOccasion} updateOccasionStyleData={updateOccasionStyleData}></RenderOccassionsDropdown> : null}
                                    {showModal ? <ProductCarouselWithTabs
                                        tabsContainer={defaultLookContainer}
                                        activeIndex='0'
                                        recommendedData={OccasionStyleData}
                                        sliderPerGroup={5}
                                        loading={loading} is_style_it={true} /> : null
                                    }
                                </Modal.Content>
                        <Modal.Actions>
                            <Button color={"grey"} onClick={closeModal}>Close</Button>
                        </Modal.Actions>
                    </Modal> */}
                {modelOpen ? (
                  <StyleItWithWrapper open={isModalOpen} onClose={closeModal}>
                    <StyleItTitleWrapper>Style It With</StyleItTitleWrapper>
                    <div id="styleitwith">
                      {showModal ? (
                        <RenderOccassionsDropdown
                          AllOccasionDetails={AllOccasionDetails}
                          displayOccasion={displayOccasion}
                          updateDisplayOccasion={updateDisplayOccasion}
                          updateOccasionStyleData={updateOccasionStyleData}
                        ></RenderOccassionsDropdown>
                      ) : null}
                      {showModal ? (
                        <ProductCarouselWithTabs
                          tabsContainer={defaultLookContainer}
                          activeIndex="0"
                          recommendedData={OccasionStyleData}
                          sliderPerGroup={
                            productDetails?.styleConfig?.card?.cards_per_row ||
                            cardStyleConfig.card?.cards_per_row
                          }
                          showBuyButton={
                            iconStyleConfig
                              ? iconStyleConfig?.showAddToCartButton
                              : cardStyleConfig.card.showAddToCartButton
                          }
                          showWishlistButton={
                            iconStyleConfig
                              ? iconStyleConfig?.showWishListButton
                              : cardStyleConfig.card.showWishListButton
                          }
                          loading={loading}
                          is_style_it={true}
                          metaData={productDetails?.styleConfig?.card?.metaData}
                          showMetaData={
                            productDetails?.styleConfig?.card?.show_meta_data
                          }
                          showFeedbackButton={
                            productDetails?.styleConfig?.card
                              ?.showFeedbackButton
                          }
                          styleConfig={
                            productDetails?.styleConfig || cardStyleConfig
                          }
                        // showBuyButton={false}
                        />
                      ) : null}
                      {/* <StyleItWithButtonWrapper>
                        <Button
                          size={"small"}
                          color={"grey"}
                          onClick={closeModal}
                        >
                          Close
                        </Button>
                      </StyleItWithButtonWrapper> */}
                    </div>
                  </StyleItWithWrapper>
                ) : null}
              </ModalWrapper>
            ) : null}
          </>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const RenderRecommendationContainer = (props) => {
  const {
    isChecked,
    updateCheckbox,
    is_affinity_checked,
    update_affinity_checkbox,
    filterValue,
    updateFilterValue,
    updateWidgetList,
    copyWidgetArr,
    sourceProductId,
    feedbacks,
    setFeedbacks,
    productDetails,
    feedbackFields
  } = props;
  useEffect(() => {
    if (filterValue && filterValue.length > 0) {
      updateWidgetList(copyWidgetArr);
    }
  }, [filterValue]);

  function toggletCheckbox() {
    updateCheckbox(!isChecked);
  }
  function toggleAffinityCheckbox() {
    update_affinity_checkbox(!is_affinity_checked);
  }
  const [filterModelOpen, updatefilterModelOpen] = useState(false);
  const [_localFilterValue, updateLocalFilterValue] = useState(
    '[{"field": "brand", "value": "nike", "type":"contains"}]'
  );
  function showModal() {
    updatefilterModelOpen(true);
  }
  function closeModal() {
    updatefilterModelOpen(false);
  }

  function applyFilter() {
    try {
      updateFilterValue(_localFilterValue);
      closeModal();
    } catch (e) {
      alert("Enter a valid JSON");
    }
  }
  function clearFilter() {
    try {
      updateFilterValue("");
      updateWidgetList(copyWidgetArr);
      closeModal();
    } catch (e) {
      alert("Enter a valid JSON");
    }
  }

  function handleTextAreaChanges(e, val) {
    updateLocalFilterValue(val.value);
  }

  return (
    <>
      <RecommendationFeedbackConsumer>
        {(feedbackData) => {
          return (
            <>
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading, productDetails, vue_find } = context;
                  const { force_debug } = props;
                  const iconStyleConfig = vue_find.styleConfig
                    ? vue_find.styleConfig.card
                    : undefined;
                  const isVueX = productDetails.vueX;
                  return (
                    <div
                      style={{
                        paddingBottom: "25px",
                        width: "100%",
                        margin: "0px 2%",
                        paddingRight: "2%",
                        marginTop: "30px",
                        display:
                          context["0_disableBundit"]?.length > 0 ||
                            context["0_enableBundit"]?.length > 0
                            ? "block"
                            : "none",
                      }}
                    >
                      <RecosWrapper
                        horizontal={
                          productDetails?.styleConfig?.card?.orientation?.horizontal ||
                          cardStyleConfig.card.orientation.horizontal
                        }
                      >
                        <StyleItTitleWrapper>{productDetails?.similarProductTitle ? productDetails?.similarProductTitle : 'Similar Products'}</StyleItTitleWrapper>

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
                                color={isChecked ? "F3F4FA" : "blue"}
                                onClick={toggletCheckbox}
                              >
                                {productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_enableBundit?.title || "Personalised Recommendations"}
                              </Button>
                              <Button
                                color={isChecked ? "blue" : "F3F4FA"}
                                onClick={toggletCheckbox}
                              >
                                {productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.title || "Similar Recommendations"}
                              </Button>
                            </Button.Group>
                            {/* <CheckBoxWrapperRecos>
                              <Checkbox
                                toggle
                                label={"User Affinity"}
                                checked={is_affinity_checked}
                                onChange={toggleAffinityCheckbox}
                              />
                            </CheckBoxWrapperRecos> */}
                          </div>

                          {/* <FilterIconContainer>
                            <Icon name="filter" onClick={showModal}></Icon>
                          </FilterIconContainer> */}
                        </ToggleContainer>

                        {isChecked ? (

                          productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.isSlider || productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.isSlider == undefined ? (
                            <ProductCarousel
                              list={context["0_disableBundit"] || []}
                              sliderPerGroup={
                                productDetails?.styleConfig?.card?.cards_per_row ||
                                cardStyleConfig?.card?.cards_per_row
                              }
                              loading={loading}
                              force_debug={force_debug}
                              showBuyButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showAddToCartButton
                                  : cardStyleConfig.card.showAddToCartButton
                              }
                              showFeedbackAssistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showFeedbackAssistButton
                                  : cardStyleConfig.card.showFeedbackAssistButton
                              }
                              showWishlistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showWishListButton
                                  : cardStyleConfig.card.showWishListButton
                              }
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                              showMetaData={
                                productDetails?.styleConfig?.card?.show_meta_data
                              }
                              showFeedbackButton={
                                productDetails?.styleConfig?.card?.showFeedbackButton
                              }
                              metaData={productDetails?.styleConfig?.card?.metaData}
                              styleConfig={productDetails?.styleConfig || cardStyleConfig}
                              module_name={"Similar Recommendations"}
                              facets={
                                vue_find.children.category_list.widgetPayload.vueX.facets
                              }
                              showRecommendationFeedback={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.enable_feedback || false}
                              feedbackData={feedbackData.feedbackData.widget_0}
                              widgetName="widget_0"
                              moduleName={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.module_name}
                              sourceProductId={sourceProductId}
                              feedbacks={feedbacks}
                              setFeedbacks={setFeedbacks}
                              feedbackFields={feedbackFields}
                            />
                          ) : (
                            <ListElement
                              list={context["0_disableBundit"] || []}
                              ItemEl={CardBlock}
                              sliderPerGroup={
                                productDetails?.styleConfig?.card?.cards_per_row ||
                                cardStyleConfig?.card?.cards_per_row
                              }
                              loading={loading}
                              force_debug={force_debug}
                              showBuyButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showAddToCartButton
                                  : cardStyleConfig.card.showAddToCartButton
                              }
                              showFeedbackAssistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showFeedbackAssistButton
                                  : cardStyleConfig.card.showFeedbackAssistButton
                              }
                              showWishlistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showWishListButton
                                  : cardStyleConfig.card.showWishListButton
                              }
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                              showMetaData={
                                productDetails?.styleConfig?.card?.show_meta_data
                              }
                              showFeedbackButton={
                                productDetails?.styleConfig?.card?.showFeedbackButton
                              }
                              metaData={productDetails?.styleConfig?.card?.metaData}
                              styleConfig={productDetails?.styleConfig || cardStyleConfig}
                              module_name={"Similar Recommendations"}
                              facets={
                                vue_find.children.category_list.widgetPayload.vueX.facets
                              }
                              showRecommendationFeedback={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.enable_feedback || false}
                              feedbackData={feedbackData.feedbackData.widget_0}
                              widgetName="widget_0"
                              moduleName={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.module_name}
                              sourceProductId={sourceProductId}
                              feedbacks={feedbacks}
                              setFeedbacks={setFeedbacks}
                              feedbackFields={feedbackFields}
                            />
                          )
                        ) : (
                          productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_enableBundit?.isSlider || productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_enableBundit?.isSlider == undefined ? (
                            <ProductCarousel
                              list={context["0_enableBundit"] || []}
                              sliderPerGroup={
                                productDetails?.styleConfig?.card?.cards_per_row ||
                                cardStyleConfig.card?.cards_per_row
                              }
                              loading={loading}
                              force_debug={force_debug}
                              showBuyButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showAddToCartButton
                                  : cardStyleConfig.card.showAddToCartButton
                              }
                              showFeedbackAssistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showFeedbackAssistButton
                                  : cardStyleConfig.card.showFeedbackAssistButton
                              }
                              showWishlistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showWishListButton
                                  : cardStyleConfig.card.showWishListButton
                              }
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                              metaData={productDetails?.styleConfig?.card?.metaData}
                              showMetaData={
                                productDetails?.styleConfig?.card?.show_meta_data
                              }
                              showFeedbackButton={
                                productDetails?.styleConfig?.card?.showFeedbackButton
                              }
                              styleConfig={productDetails?.styleConfig || cardStyleConfig}
                              module_name={"Personalised Recommendations"}
                              facets={
                                vue_find.children.category_list.widgetPayload.vueX.facets
                              }
                              showRecommendationFeedback={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_enableBundit?.enable_feedback || false}
                              feedbackData={feedbackData.feedbackData.widget_0}
                              widgetName="widget_0"
                              moduleName={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.module_name}
                              sourceProductId={sourceProductId}
                              feedbacks={feedbacks}
                              setFeedbacks={setFeedbacks}
                              feedbackFields={feedbackFields}
                            />
                          ) : (
                            <ListElement
                              list={context["0_enableBundit"] || []}
                              ItemEl={CardBlock}
                              sliderPerGroup={
                                productDetails?.styleConfig?.card?.cards_per_row ||
                                cardStyleConfig.card?.cards_per_row
                              }
                              loading={loading}
                              force_debug={force_debug}
                              showBuyButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showAddToCartButton
                                  : cardStyleConfig.card.showAddToCartButton
                              }
                              showFeedbackAssistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showFeedbackAssistButton
                                  : cardStyleConfig.card.showFeedbackAssistButton
                              }
                              showWishlistButton={
                                iconStyleConfig
                                  ? iconStyleConfig.showWishListButton
                                  : cardStyleConfig.card.showWishListButton
                              }
                              type={context.config.cardType}
                              imageLink={context.config.imageLink}
                              metaData={productDetails?.styleConfig?.card?.metaData}
                              showMetaData={
                                productDetails?.styleConfig?.card?.show_meta_data
                              }
                              showFeedbackButton={
                                productDetails?.styleConfig?.card?.showFeedbackButton
                              }
                              styleConfig={productDetails?.styleConfig || cardStyleConfig}
                              module_name={"Personalised Recommendations"}
                              facets={
                                vue_find.children.category_list.widgetPayload.vueX.facets
                              }
                              showRecommendationFeedback={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_enableBundit?.enable_feedback || false}
                              feedbackData={feedbackData.feedbackData.widget_0}
                              widgetName="widget_0"
                              moduleName={productDetails?.widgetPayload?.[isVueX ? "vueX" : "vueApp"]?.widget0_disableBundit?.module_name}
                              sourceProductId={sourceProductId}
                              feedbacks={feedbacks}
                              setFeedbacks={setFeedbacks}
                              feedbackFields={feedbackFields}
                            />
                          )
                        )}
                      </RecosWrapper>
                      {filterModelOpen ? (
                        <StyleItWithWrapper
                          style={{}}
                          open={filterModelOpen}
                          onClose={closeModal}
                        >
                          <StyleItTitleWrapper>Filter Values</StyleItTitleWrapper>
                          <div>
                            <Form>
                              <TextArea
                                placeholder={
                                  '[{"field": "brand", "value": "nike", "type":"contains"}]'
                                }
                                value={_localFilterValue}
                                onChange={handleTextAreaChanges}
                                style={{ minHeight: 100 }}
                              />
                            </Form>
                            <StyleItWithButtonWrapper>
                              <Button color={"blue"} onClick={applyFilter}>
                                Apply Filter
                              </Button>
                              <Button color={"blue"} onClick={clearFilter}>
                                Deactivate Filter
                              </Button>
                              <Button color={"grey"} onClick={closeModal}>
                                Close
                              </Button>
                            </StyleItWithButtonWrapper>
                          </div>
                        </StyleItWithWrapper>
                      ) : null}
                    </div>
                  );
                }}
              </RecommendedPdtsConsumer>
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading, productDetails, vue_find } = context;
                  const iconStyleConfig = vue_find.styleConfig
                    ? vue_find.styleConfig.card
                    : undefined;
                  const { force_debug } = props;
                  return context["4"] && context["4"].length > 0 ? (
                    <div style={{ paddingBottom: "25px" }}>
                      <RecosWrapper>
                        <h3 style={{ textAlign: "center", paddingTop: "25px" }}>
                          Cross Product Recommendation (Traffic based)
                        </h3>
                        <ProductCarousel
                          list={context["4"] || []}
                          sliderPerGroup={
                            productDetails?.styleConfig?.card?.cards_per_row ||
                            cardStyleConfig.card?.cards_per_row
                          }
                          loading={loading}
                          force_debug={force_debug}
                          showBuyButton={
                            iconStyleConfig
                              ? iconStyleConfig.showAddToCartButton
                              : cardStyleConfig.card.showAddToCartButton
                          }
                          showWishlistButton={
                            iconStyleConfig
                              ? iconStyleConfig.showWishListButton
                              : cardStyleConfig.card.showWishListButton
                          }
                          type={context.config.cardType}
                          imageLink={context.config.imageLink}
                          metaData={productDetails?.styleConfig?.card?.metaData}
                          showMetaData={
                            productDetails?.styleConfig?.card?.show_meta_data
                          }
                          showFeedbackButton={
                            productDetails?.styleConfig?.card?.showFeedbackButton
                          }
                          styleConfig={productDetails?.styleConfig || cardStyleConfig}
                        />
                      </RecosWrapper>
                    </div>
                  ) : null;
                }}
              </RecommendedPdtsConsumer>
            </>
          )
        }}
      </RecommendationFeedbackConsumer>
    </>
  );
};

// const ShowAffinity = props => {
//     const {
//         is_affinity_checked,
//         update_affinity_checkbox
//     } = props

//     function toggleAffinityCheckbox() {
//         update_affinity_checkbox(!is_affinity_checked)
//     }

//     // return <CheckBoxWrapperRecos>
//     //      <Bu toggle label={is_affinity_checked ? 'Close User Affinity' : 'Show User Affintiy'} checked={is_affinity_checked} onChange={toggleAffinityCheckbox} />
//     // </CheckBoxWrapperRecos>
//     return <ButtonContainer><Button onClick={toggleAffinityCheckbox}>User Affinity</Button></ButtonContainer>
// }

const RenderSpiderContainer = (props) => {
  const { is_affinity_checked } = props;
  let clientName = localStorage.getItem("userConfig");
  clientName = JSON.parse(clientName).client_name;
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { loading, relative_affinity } = context;
        return (
          <>
            {is_affinity_checked &&
              relative_affinity &&
              Object.keys(relative_affinity).length > 0 ? (
              <>
                <SpiderContainer>
                  <h4>Relative Affinity</h4>
                  {!loading ? (
                    <SpiderBlock
                      recommendedData={context}
                      clientName={clientName}
                      relative_affinity={relative_affinity}
                    />
                  ) : null}
                </SpiderContainer>
              </>
            ) : null}
          </>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const RenderSparkLine = (props) => {
  const {
    sparkLineArr,
    updateSparkLineArr,
    is_affinity_checked,
    ontology,
  } = props;
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { loading } = context;

        let relative_affinity = {};
        let new_relative_arr = [];
        if (context["user_affinity"] && sparkLineArr.length == 0) {
          let relative_affinities =
            context["user_affinity"]["relative_affinities"];
          let absolute_affinities =
            context["user_affinity"]["absolute_affinities"];
          if (
            relative_affinities &&
            absolute_affinities &&
            ontology &&
            ontology.length > 0
          ) {
            if (
              absolute_affinities[ontology] &&
              absolute_affinities[ontology].length > 0
            ) {
              relative_affinity = relative_affinities[ontology];
            }
          }

          for (let each_value in relative_affinity) {
            let new_array_with_values = [];
            for (let each_datapoint_value in relative_affinity[each_value]) {
              new_array_with_values.push(
                relative_affinity[each_value][each_datapoint_value] * 10
              );
            }
            new_relative_arr.push(new_array_with_values);
          }
          //updateSparkLineArr(new_relative_arr)
        }

        return (
          <ConfigConsumer>
            {(context) => {
              return is_affinity_checked &&
                new_relative_arr.length > 0 &&
                new_relative_arr[0] &&
                new_relative_arr[0].length > 1 ? (
                <>
                  {" "}
                  <SparkLineWrapper>
                    <SparkLineContainer>
                      <Sparklines
                        data={new_relative_arr[0]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="red" />
                      </Sparklines>
                      {new_relative_arr[0].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Generic & Packaging`
                            : context.client_name == "2314_mercadolibre"
                              ? `attr_type`
                              : `Colour & Pattern`}
                        </p>
                      ) : null}
                      <Sparklines
                        data={new_relative_arr[1]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="blue" />
                      </Sparklines>
                      {new_relative_arr[1].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Generic & Content`
                            : context.client_name == "2314_mercadolibre"
                              ? `attr_condition`
                              : `Colour & Shape`}
                        </p>
                      ) : null}
                      <Sparklines
                        data={new_relative_arr[2]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="green" />
                      </Sparklines>
                      {new_relative_arr[2].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Packaging`
                            : context.client_name == "2314_mercadolibre"
                              ? `attr_weight & attr_material`
                              : `Pattern`}
                        </p>
                      ) : null}
                    </SparkLineContainer>
                  </SparkLineWrapper>
                  <SparkLineWrapper>
                    <SparkLineContainer>
                      <Sparklines
                        data={new_relative_arr[3]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="orange" />
                      </Sparklines>
                      {new_relative_arr[3].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Generic`
                            : context.client_name == "2314_mercadolibre"
                              ? `attr_seaters_number`
                              : `Color`}
                        </p>
                      ) : null}
                      <Sparklines
                        data={new_relative_arr[4]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="purple" />
                      </Sparklines>
                      {new_relative_arr[4].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Packaging & Content`
                            : context.client_name == "2314_mercadolibre"
                              ? `attr_type & attr_style`
                              : `Pattern & Shape`}
                        </p>
                      ) : null}
                      <Sparklines
                        data={new_relative_arr[5]}
                        height={80}
                        width={180}
                      >
                        <SparklinesLine color="gray" />
                      </Sparklines>
                      {new_relative_arr[5].length > 1 ? (
                        <p>
                          {context.client_name == "2321_grocery-demo"
                            ? `Content`
                            : context.client_name == "2314_mercadolibre"
                              ? `balanced`
                              : `Shape`}
                        </p>
                      ) : null}
                    </SparkLineContainer>
                  </SparkLineWrapper>{" "}
                </>
              ) : null;
            }}
          </ConfigConsumer>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const RenderWordCloud = (props) => {
  const { is_affinity_checked, ontology, msdontology, type } = props;
  let words = [];
  let new_word = [];
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { loading, absolute_affinity } = context;
        let isPositiveOrNegative = false;
        let absolute_affinity_value = {};
        if (absolute_affinity && absolute_affinity[type]) {
          isPositiveOrNegative = true;
        }
        if (context["user_affinity"] || absolute_affinity) {
          if (absolute_affinity) {
            if (type === "positive") {
              absolute_affinity_value = absolute_affinity[type]
                ? absolute_affinity[type]
                : absolute_affinity;
            } else {
              absolute_affinity_value = absolute_affinity[type];
            }
            if (absolute_affinity_value) {
              words =
                msdontology && absolute_affinity_value[msdontology]
                  ? absolute_affinity_value[msdontology]
                  : absolute_affinity_value;
            }
          }
          if (words && Object.keys(words).length > 0) {
            Object.keys(words).map((category) => {
              Object.keys(words[category]).map((value) => {
                let _obj = {
                  text: value,
                  value: words[category][value]?.frequency?.toFixed(2),
                };
                new_word.push(_obj);
              });
            });
          }
        } else if (context["user_affinity"] && ontology.length > 0) {
          let absolute_affinity =
            context["user_affinity"]["absolute_affinities"];
          if (absolute_affinity) {
            words = absolute_affinity[ontology];
          }
          for (let each_word in words) {
            let _obj = {
              text: words[each_word]["text"],
              value: words[each_word]["value"],
            };
            new_word.push(_obj);
          }
        }

        return (
          <>
            {is_affinity_checked && new_word && new_word.length ? (
              <WordCloudWrapper type={isPositiveOrNegative ? type : ""}>
                <h4>{capitalize(type)} Absolute Affinity</h4>
                <WordCloudContainer>
                  {!loading ? (
                    <ReactWordcloud
                      words={new_word}
                      options={{
                        fontFamily: "Poppins_Semi_Bold",
                        rotationAngles: [0, 90],
                        fontSizes: [20, 22],
                      }}
                    />
                  ) : null}
                </WordCloudContainer>
              </WordCloudWrapper>
            ) : null}
          </>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

const RenderCLPMenu = () => {
  const [categoryDropdownState, updateCategoryDropdownState] = useState(false);
  const clpMenus = useRef(null);
  return (
    <CLPMenuOverflowWrapper categoryDropdownState={categoryDropdownState}>
      <RenderDropDown
        clpMenus={clpMenus}
        is_from_discover_page={true}
        updateCategoryDropdownState={updateCategoryDropdownState}
      />
    </CLPMenuOverflowWrapper>
  );
};

export {
  renderProductContainer,
  RenderTopcontainer,
  RenderRecommendationContainer,
  RenderSpiderContainer,
  RenderVueTagAPI,
  RenderStyleItContainer,
  RenderSparkLine,
  RenderWordCloud,
  RenderCLPMenu,
  RenderMetaData,
};
