import React, { useRef, useState, createRef, useEffect } from "react";
import {
  Dropdown,
  Menu,
  Form,
  TextArea,
  Button,
  Icon,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  Input,
  InputEl,
  ProductCarousel,
  Mask,
  Select,
  TextElementBlack,
  DropDown,
} from "../../component";
import {
  IconWrapper,
  RedirectLinkMask,
} from "../../component/organism/CardBlock/styled";
import {
  sendEvents,
  renderCartText,
  addToCartHandler,
  renderWishListIcon,
  addToWishlistHandler,
  renderWishListIconColor,
} from "../../component/organism/CardBlock";
import {
  UserInputWrapper,
  ImageUploadIcon,
  FormWrapper,
  SearchResultWrapper,
  UploadedImgWrapper,
  UploadedProductImage,
  PdtRecommendationTabs,
  PdtRecommendationTabsWrapper,
  TagWrapper,
  SearchTagsWrapper,
  HeaderContent,
  RowElement,
  ColorSwatch,
  ImgWrapper,
  ImgEl,
  SliderCont,
  DebugWrapper,
  MultiImageForm,
  MultiImageTextArea,
  ProductTitleWrapper,
  PropertiesWrapper,
  DescriptionWrapper,
  PdTitleWrapper,
  PdDescWrapper,
  TruncateText,
  DottedLine,
  FeedbackForm,
} from "./styled";
import {
  ConfigConsumer,
  PlayerConsumer,
  HeaderConfigConsumer,
} from "../../container";
import { VueTagCarousel, DefaultValues, Config } from "../../configs";
import LoaderImg from "../../static/img/placeholder.svg";
import ProductTypes from "./ProductTypes";
import { UserProfileWrapper, UserInfoWrapper } from "../UserProfile/styled";
import { RenderMetaData } from "../ProductDetails/renderProps";
import { cloneDeep } from "lodash";

const UploadInputref = createRef();

const tdStyle = {
  whiteSpace: "nowrap",
};

const makeAPIRequests = (
  file,
  updateimageSearchData,
  configProps,
  debugProperties,
  currentforceFacetProperties,
  product_name,
  short_description,
  long_description,
  product_type
) => {
  Promise.all([
    uploadImage(file, configProps, debugProperties),
    getTags(
      file,
      configProps,
      debugProperties,
      currentforceFacetProperties,
      product_name,
      short_description,
      long_description,
      product_type
    ),
    incrementCounter(configProps.vue_tag),
  ])
    .then((response) => {
      if (response && response.length) {
        updateimageSearchData((currResp) => {
          let UploadedResp = { ...currResp };
          if (
            response[1] &&
            response[1].status &&
            response[1].status.toLowerCase() === "success"
          ) {
            UploadedResp.tagsResp = { ...response[1] };
          }
          UploadedResp.tagsResp.loading = false;
          return UploadedResp;
        });
      }
    })
    .catch((err) => {
      updateimageSearchData((currResp) => {
        let UploadedResp = { ...currResp };
        UploadedResp.tagsResp.loading = false;
        return UploadedResp;
      });
    });
  updateimageSearchData((currResp) => {
    let UploadedResp = { ...currResp };
    UploadedResp.tagsResp.loading = true;
    return UploadedResp;
  });
};

const isBBox = () => {
  let qp =
    window.location && window.location.search
      ? window.location.search.replace("?", "")
      : "";
  qp = qp.split("&");
  let bbox = false;
  qp.map((param) => {
    if (param) {
      let paramArr = param.split("=");
      if (paramArr[0] && paramArr[1]) {
        if (paramArr[0] === "bbox" && paramArr[1] === "true") {
          bbox = true;
        }
      }
    }
    return param;
  });
  return bbox;
};

const isDebug = () => {
  let qp =
    window.location && window.location.search
      ? window.location.search.replace("?", "")
      : "";
  qp = qp.split("&");
  let debug = false;
  qp.map((param) => {
    if (param) {
      let paramArr = param.split("=");
      if (paramArr[0] && paramArr[1]) {
        if (paramArr[0] === "force_debug" && paramArr[1] === "true") {
          debug = true;
        }
      }
    }
    return param;
  });
  return debug;
};

const ConstructImageSrc = (file, updateRespObj) => {
  if (file && (file.length || typeof file === "object")) {
    if (typeof file === "string") {
      updateRespObj((currResp) => {
        let UpdatedResp = { ...currResp };
        UpdatedResp.imgSrc = file;
        return UpdatedResp;
      });
    } else if (typeof file === "object" && Array.isArray(file)) {
      let updatedImgSrc = "";
      file.map((fileObj) => {
        if (fileObj && fileObj.type && fileObj.type === "main") {
          updatedImgSrc = fileObj.url;
        }
        return fileObj;
      });
      updateRespObj((currResp) => {
        let UpdatedResp = { ...currResp };
        UpdatedResp.imgSrc = updatedImgSrc;
        return UpdatedResp;
      });
    } else {
      const reader = new FileReader();

      reader.onload = function (e) {
        updateRespObj((currResp) => {
          let UpdatedResp = { ...currResp };
          UpdatedResp.imgSrc =
            e.target && e.target.result ? e.target.result : "";
          return UpdatedResp;
        });
      };

      reader.readAsDataURL(file[0]);
    }
  }
};

const uploadImage = (file, configProps, debugProperties) => {
  const { vue_tag, API_KEY, default_url } = configProps;
  let upload_endpoint = vue_tag["upload_endpoint"]
    ? vue_tag["upload_endpoint"]
    : default_url + "/upload";
  // if(vue_tag.ean){
  //   upload_endpoint = "http://18.141.197.126/barcode_lookup/upload"
  // }
  let formData = new FormData();
  let apikey = API_KEY;
  // if(debugProperties) {
  //     apikey = debugProperties.API_KEY || apikey
  // }
  if (
    upload_endpoint &&
    file &&
    (file.length || (typeof file === "object" && Object.keys(file).length))
  ) {
    if (typeof file === "string") {
      if (file.startsWith("[")) {
        file = JSON.parse(file)[0];
      }
      formData.append("image_url", file);
    } else if (!Array.isArray(file) && file[0]) {
      formData.append("image", file[0]);
    } else if (typeof file === "object") {
      file.map((fileSrc) => {
        if (fileSrc && fileSrc.type === "main" && fileSrc.url) {
          formData.append("image_url", fileSrc.url);
        }
        return fileSrc;
      });
    }
    formData.append("api_key", apikey);

    return fetch(upload_endpoint, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((resp) => {
        if (
          resp &&
          resp.status &&
          resp.status.toLowerCase() === "success" &&
          resp.data &&
          resp.data.mad_id
        ) {
          return resp.data.mad_id;
        }
        console.log("No Mad Id in response");
        return "";
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  }
  return "";
};

const getTags = (
  file,
  configProps,
  debugProperties,
  currentforceFacetProperties,
  product_name,
  short_description,
  long_description,
  product_type
) => {
  const { vue_tag, correlation_key, image_type } = configProps;
  let tag = vue_tag["tag_endpoint"]
    ? vue_tag["tag_endpoint"]
    : DefaultValues["vue_tag_url"];
  if (vue_tag.ean) {
    tag =
      "https://cacofonix-ap-southeast-1-client-staging.madstreetden.com/barcode_lookup";
  }
  let apiKey = vue_tag["API_KEY"]
    ? vue_tag["API_KEY"]
    : DefaultValues["vue_tag_api_key"];
  if (vue_tag.ean) {
    apiKey = configProps.API_KEY;
  }
  let client_id = null;
  let force_facet = "";
  if (debugProperties) {
    apiKey = debugProperties.API_KEY || apiKey;
    if (debugProperties.name) {
      client_id = debugProperties.name;
    }
    if (debugProperties.url) {
      tag = debugProperties.url;
    }
  }
  if (
    currentforceFacetProperties.force_facet &&
    currentforceFacetProperties.force_facet !== "None"
  ) {
    force_facet = currentforceFacetProperties.force_facet;
  }
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
        formObj["correlation_key"] = correlation_key;
        formObj["image_url"] = file;
        formObj["image_type"] = image_type;
        formObj["image"] = file;
        formObj["client_id"] = client_id;
        formObj["product_name"] = product_name;
        formObj["short_description"] = short_description;
        formObj["long_description"] = long_description;
        formObj["product_type"] = product_type;

        if (force_facet) {
          formObj["facet"] = force_facet;
        }

        formData = JSON.stringify(formObj);
      } else if (!Array.isArray(file) && file[0]) {
        formData = new FormData();
        formData.append("api_key", apiKey);
        formData.append("correlation_key", correlation_key);
        formData.append("image_type", image_type);
        formData.append("image", file[0]);
        if (client_id) {
          formData.append("client_id", client_id);
        }
        if (force_facet) {
          formData.append("facet", force_facet);
        }
      }
    } else if (typeof file === "object" && file.length) {
      let formObj = {};
      formObj["api_key"] = apiKey;
      formObj["correlation_key"] = correlation_key;
      formObj["image_url"] = file;
      formObj["client_id"] = client_id;
      if (force_facet) {
        formObj["facet"] = force_facet;
      }
      formData = JSON.stringify(formObj);
    }
    return fetch(tag, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((resp) => resp)
      .catch((err) => console.log(err));
  }
};

const incrementCounter = (vue_tag) => {
  const { counter } = vue_tag;
  if (counter) {
    fetch(
      counter,
      // 'https://demo.vue.ai/incrementcounter/', // uncomment for local testing
      {
        method: "POST",
        body: "type=image_search",
      }
    )
      .then((data) => data.json())
      .then((resp) => {
        if (resp && resp.status && resp.status.toLowerCase() !== "success") {
          console.log("Increment Counter Call failed");
        }
      })
      .catch((err) => console.log(err));
  }
};

const RenderImageSearchInput = (props) => {
  const {
    updateimageSearchData,
    debugProperties,
    forceFacetProperties,
  } = props;
  const currFile = useRef(null);
  const [CurrInputValue, updateInputValue] = useState("");
  const [ProductNameInputValue, updateProductNameInputValue] = useState("");
  const [ShortDecsInputValue, updateShortDescInputValue] = useState("");
  const [LongDecsInputValue, updateLongDescInputValue] = useState("");
  const [ProductTypeInputValue, updateProductTypeInputValue] = useState("");

  let currentDebugProps =
    debugProperties && debugProperties.current ? debugProperties.current : null;
  let currentforceFacetProperties =
    forceFacetProperties && forceFacetProperties.current
      ? forceFacetProperties.current
      : null;

  return (
    <ConfigConsumer>
      {(context) => {
        const { vue_tag, correlation_key, image_type, url } = context;
        let API_KEY = context.API_KEY;
        if (vue_tag.API_KEY) {
          API_KEY = vue_tag.API_KEY;
        }
        let default_url = url;
        if (vue_tag && vue_tag.ean) {
          default_url =
            " https://cacofonix-ap-southeast-1-client-staging.madstreetden.com/barcode_lookup";
        }
        const configProps = {
          vue_tag,
          API_KEY,
          correlation_key,
          image_type,
          default_url,
        };
        // API_KEY = "12b829db941a20ed46cefa011c58c6096a4b811e"
        if (isDebug()) {
          return (
            <UserInputWrapper>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeAPIRequests(
                    CurrInputValue,
                    updateimageSearchData,
                    configProps,
                    currentDebugProps,
                    currentforceFacetProperties,
                    ProductNameInputValue,
                    ShortDecsInputValue,
                    LongDecsInputValue,
                    ProductTypeInputValue
                  );
                  ConstructImageSrc(CurrInputValue, updateimageSearchData);
                }}
              >
                {/* Product type */}
                <Dropdown
                  placeholder="Select Product Type"
                  style={{ width: 500, height: 40, marginBottom: 15 }}
                  selection
                  onChange={(e, data) =>
                    updateProductTypeInputValue(data.value || "")
                  }
                  value={ProductTypeInputValue}
                  options={ProductTypes}
                />

                {/* Product name */}
                <Form.Field>
                  <input
                    style={{ width: 500, height: 40 }}
                    value={ProductNameInputValue}
                    type="text"
                    placeholder="Enter the product name"
                    onChange={(e) => {
                      updateimageSearchData((currSearchData) => {
                        const tempSearchData = { ...currSearchData };
                        tempSearchData.product_name = e.currentTarget.value;
                        return tempSearchData;
                      });
                      updateProductNameInputValue(e.currentTarget.value || "");
                    }}
                  />
                </Form.Field>

                {/* Short description */}
                <Form.Field>
                  <TextArea
                    style={{ width: 500, height: 75 }}
                    value={ShortDecsInputValue}
                    type="text"
                    placeholder="Enter a short description"
                    onChange={(e) => {
                      updateimageSearchData((currSearchData) => {
                        const tempSearchData = { ...currSearchData };
                        tempSearchData.short_description =
                          e.currentTarget.value;
                        return tempSearchData;
                      });
                      updateShortDescInputValue(e.currentTarget.value || "");
                    }}
                  />
                </Form.Field>

                {/* Long description */}
                <Form.Field>
                  <TextArea
                    style={{ width: 500, height: 75 }}
                    value={LongDecsInputValue}
                    type="text"
                    placeholder="Enter a long description"
                    onChange={(e) => {
                      updateimageSearchData((currSearchData) => {
                        const tempSearchData = { ...currSearchData };
                        tempSearchData.long_description = e.currentTarget.value;
                        return tempSearchData;
                      });
                      updateLongDescInputValue(e.currentTarget.value || "");
                    }}
                  />
                </Form.Field>

                {/* Image url */}
                <Form.Field>
                  <input
                    style={{ width: 500, height: 40 }}
                    value={CurrInputValue}
                    type="text"
                    placeholder="Enter the Image URL here"
                    onChange={(e) => {
                      updateimageSearchData((currSearchData) => {
                        const tempSearchData = { ...currSearchData };
                        tempSearchData.file = e.currentTarget.value;
                        return tempSearchData;
                      });
                      updateInputValue(e.currentTarget.value || "");
                    }}
                  />
                </Form.Field>

                <Button.Group widths="2">
                  <Button
                    type="submit"
                    style={{
                      height: 40,
                      marginTop: 15,
                      marginRight: 10,
                      backgroundColor: "#FF7054",
                      color: "#fff",
                    }}
                  >
                    GET TAGS
                  </Button>
                  <Button
                    type="submit"
                    color="grey"
                    style={{ height: 40, marginTop: 15 }}
                    onClick={(e) => UploadInputref.current.click()}
                  >
                    UPLOAD IMAGE
                  </Button>
                </Button.Group>

                <Input
                  accept="image/x-png,image/jpeg"
                  hidden
                  type="file"
                  inputRef={UploadInputref}
                  onChange={(e) => {
                    currFile.current =
                      e.currentTarget && e.currentTarget.files
                        ? e.currentTarget.files
                        : null;
                    updateimageSearchData((currSearchData) => {
                      const tempSearchData = { ...currSearchData };
                      tempSearchData.file = currFile.current;
                      return tempSearchData;
                    });
                    if (currFile.current && currFile.current.length) {
                      makeAPIRequests(
                        currFile.current,
                        updateimageSearchData,
                        configProps,
                        currentDebugProps,
                        currentforceFacetProperties
                      );
                      ConstructImageSrc(
                        currFile.current,
                        updateimageSearchData
                      );
                    } else {
                      console.log("No files selected");
                    }
                  }}
                />
              </Form>
            </UserInputWrapper>
          );
        } else {
          return (
            <UserInputWrapper>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeAPIRequests(
                    CurrInputValue,
                    updateimageSearchData,
                    configProps,
                    currentDebugProps,
                    currentforceFacetProperties,
                    ProductNameInputValue,
                    ShortDecsInputValue,
                    LongDecsInputValue,
                    ProductTypeInputValue
                  );
                  ConstructImageSrc(CurrInputValue, updateimageSearchData);
                }}
              >
                {/* Image url */}
                <Form.Field>
                  <TextArea
                    style={{ width: 500, height: 40 }}
                    value={CurrInputValue}
                    type="text"
                    placeholder="Enter the Image URL here"
                    onChange={(e) => {
                      updateimageSearchData((currSearchData) => {
                        const tempSearchData = { ...currSearchData };
                        tempSearchData.file = e.currentTarget.value;
                        return tempSearchData;
                      });
                      updateInputValue(e.currentTarget.value || "");
                    }}
                  />
                </Form.Field>

                <Button.Group widths="2">
                  <Button
                    type="submit"
                    style={{
                      height: 40,
                      marginTop: 15,
                      marginRight: 10,
                      backgroundColor: "#FF7054",
                      color: "#fff",
                    }}
                  >
                    GET TAGS
                  </Button>
                  <Button
                    type="submit"
                    color="grey"
                    style={{ height: 40, marginTop: 15 }}
                    onClick={(e) => UploadInputref.current.click()}
                  >
                    UPLOAD IMAGE
                  </Button>
                </Button.Group>

                <Input
                  accept="image/x-png,image/jpeg"
                  hidden
                  type="file"
                  inputRef={UploadInputref}
                  onChange={(e) => {
                    currFile.current =
                      e.currentTarget && e.currentTarget.files
                        ? e.currentTarget.files
                        : null;
                    updateimageSearchData((currSearchData) => {
                      const tempSearchData = { ...currSearchData };
                      tempSearchData.file = currFile.current;
                      return tempSearchData;
                    });
                    if (currFile.current && currFile.current.length) {
                      makeAPIRequests(
                        currFile.current,
                        updateimageSearchData,
                        configProps,
                        currentDebugProps,
                        currentforceFacetProperties
                      );
                      ConstructImageSrc(
                        currFile.current,
                        updateimageSearchData
                      );
                    } else {
                      console.log("No files selected");
                    }
                  }}
                />
              </Form>
            </UserInputWrapper>
          );
        }
      }}
    </ConfigConsumer>
  );
};

const RenderSearchResults = (props) => {
  const {
    src,
    tagsResp,
    is_bbox,
    is_from_pdp_page,
    showWishlistButton,
    showBuyButton,
    userData,
    internal_image_url,
    hideTagResults,
    tagsToShow,
    type,
    imageLink,
    ean,
    productId,
    hideTitle,
    context,
    debug,
    productDetails,
    feedbackSubmit,
    feedbackFields,
    showFeedback,
    feedbacks,
    setFeedbacks
  } = props;
  // let feedbackFields = [
  //   "Message Topic_",
  //   "Core Message_"
  // ];
  const setInitialFeedback = () => {
    let initialFeedback = {};
    if (feedbackFields && feedbackFields.length > 0) {
      feedbackFields.forEach(field => {
        initialFeedback[field] = productDetails[0] && productDetails[0][field] ? productDetails[0][field] : '';
      })
    }
    return initialFeedback;
  }
  useEffect(() => {
    setFeedbacks(setInitialFeedback())
  }, [productDetails]);
  let display_image = internal_image_url || src;
  console.log("display_image", display_image);
  let tags_with_facet = {};

  if (display_image.startsWith("[")) {
    display_image = JSON.parse(display_image);
    display_image = display_image[0];
  }
  if (type === "video") {
    display_image = LoaderImg;
  }
  if (imageLink === "image_link") {
    display_image = userData ? userData.image_link : "";
  } else if (imageLink === "internal_image_url") {
    display_image = internal_image_url;
  } else if (imageLink === "small_image_link") {
    display_image = userData ? userData.small_image_link : "";
  }
  const canvas = useRef(null);
  const parentRef = useRef(null);

  function Shape(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  let strokeStyleArr = [
    "blue",
    "yellow",
    "green",
    "red",
    "orange",
    "purple",
    "grey",
    "black",
  ];

  function renderRects(activatedTab) {
    if ((isBBox() || is_bbox) && canvas != null && canvas.current != null) {
      const parent_object = parentRef.current;
      const canvas_object = canvas.current;

      const canvas_context = canvas.current.getContext("2d");

      canvas_object.width = parent_object.offsetWidth;
      canvas_object.height = parent_object.offsetHeight;
      var widthratio = 1;
      var heightratio = 1;
      var imageObj1 = new Image();
      imageObj1.src = display_image;
      imageObj1.onload = function () {
        var hRatio = canvas_object.width / imageObj1.width;
        var vRatio = canvas_object.height / imageObj1.height;
        var ratio = Math.min(hRatio, vRatio);
        widthratio = imageObj1.width / canvas_object.width;
        heightratio = imageObj1.height / canvas_object.height;
        canvas_context.drawImage(
          imageObj1,
          0,
          0,
          imageObj1.width,
          imageObj1.height,
          0,
          0,
          imageObj1.width * ratio,
          imageObj1.height * ratio
        );

        //canvas_context.drawImage(imageObj1,0,0, canvas_object.width, canvas_object.height);
        var myRect = [];
        if (activatedTab) {
          let all_pos = tags_with_facet[activatedTab];
          all_pos.map((pos) => {
            for (let i = 0; i < 5; i++) {
              if (i == 3) {
                pos = pos.substring(5);
              }
              pos = atob(pos);
            }
            pos = JSON.parse(pos);

            let x1 = pos[0] * ratio;
            let y1 = pos[1] * ratio;
            let x2 = pos[2] * ratio;
            let y2 = pos[3] * ratio;
            let image_rect_width = x2 - x1;
            let image_rect_height = y2 - y1;
            myRect.push(new Shape(x1, y1, image_rect_width, image_rect_height));
          });
        } else if (tagsResp && tagsResp.data && tagsResp.data.length) {
          tagsResp.data.map((tagObj) => {
            let pos = tagObj["pos"];
            for (let i = 0; i < 5; i++) {
              if (i == 3) {
                pos = pos.substring(5);
              }
              pos = atob(pos);
            }
            pos = JSON.parse(pos);

            let x1 = pos[0] * ratio;
            let y1 = pos[1] * ratio;
            let x2 = pos[2] * ratio;
            let y2 = pos[3] * ratio;
            let image_rect_width = x2 - x1;
            let image_rect_height = y2 - y1;
            myRect.push(new Shape(x1, y1, image_rect_width, image_rect_height));
          });
        }
        for (var i in myRect) {
          let oRec = myRect[i];
          canvas_context.beginPath();
          canvas_context.rect(oRec.x, oRec.y, oRec.w, oRec.h);
          canvas_context.lineWidth = 2;
          canvas_context.strokeStyle = strokeStyleArr[i % 8];
          canvas_context.stroke();
        }
      };
    }
  }

  useEffect(() => {
    if (tagsResp && tagsResp.data) {
      if (ean) {
        Object.keys(tagsResp.data).map((tagObj) => {
          let tagKey =
            tagObj && tagObj.productType && tagObj.productType[0]
              ? tagObj.productType[0]
              : "";
          if (tagKey && tagObj && tagObj.pos) {
            if (tagKey in tags_with_facet) {
              tags_with_facet[tagKey].push(tagObj.pos);
            } else {
              tags_with_facet[tagKey] = [];
              tags_with_facet[tagKey].push(tagObj.pos);
            }
          }
          // else if(tagKey && tagObj && tagObj.msd_tags && Object.keys(tagObj.msd_tags).length) {
          //     tagMapData[tagKey] = tagObj.msd_tags
          // }
          return tagObj;
        });
      } else {
        tagsResp.data.map((tagObj) => {
          let tagKey =
            tagObj && tagObj.productType && tagObj.productType[0]
              ? tagObj.productType[0]
              : "";
          if (tagKey && tagObj && tagObj.pos) {
            if (tagKey in tags_with_facet) {
              tags_with_facet[tagKey].push(tagObj.pos);
            } else {
              tags_with_facet[tagKey] = [];
              tags_with_facet[tagKey].push(tagObj.pos);
            }
          }
          // else if(tagKey && tagObj && tagObj.msd_tags && Object.keys(tagObj.msd_tags).length) {
          //     tagMapData[tagKey] = tagObj.msd_tags
          // }
          return tagObj;
        });
      }
    }
    renderRects();
  });

  const [addToCartText, updateAddToCartText] = useState(
    renderCartText(productId, null, null, { id: null })
  );

  const feedbackSubmitHandler = (e) => {
    e.preventDefault();
    feedbackSubmit(feedbacks, productId);
  }

  return (
    <PlayerConsumer>
      {(videoContext) => {
        const { setShowVideo, setVideoLink } = videoContext;

        return (
          <SearchResultWrapper style={{ top: is_from_pdp_page ? "25%" : "" }}>
            {display_image ? (
              <>
                <UploadedImgWrapper
                  ref={parentRef}
                  onClick={() => {
                    setVideoLink(userData.videoUrl);
                    if (type === "video") {
                      setShowVideo(true);
                    } else {
                      setShowVideo(false);
                    }
                  }}
                >
                  {isBBox() || is_bbox ? (
                    <canvas ref={canvas} />
                  ) : (
                    <>
                      <UploadedProductImage
                        is_from_pdp_page={is_from_pdp_page}
                        src={display_image || LoaderImg}
                        alt={type === "video" ? "Click Me!" : "Product Image"}
                      />
                    </>
                  )}
                </UploadedImgWrapper>
                {showBuyButton ? (
                  <HeaderConfigConsumer>
                    {(context) => {
                      const { updateCartPdtCount } = context[0];
                      const { updateCartPdt, cartProducts } = context[2];
                      const { updateWishlistPdtCount } = context[1];
                      return (
                        <RedirectLinkMask type="pdp">
                          {showWishlistButton && (
                            <IconWrapper
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToWishlistHandler(
                                  display_image,
                                  userData.title,
                                  productId,
                                  false,
                                  userData.price,
                                  updateWishlistPdtCount,
                                  { id: null }
                                );
                              }}
                            >
                              <Icon
                                name={renderWishListIcon(productId)}
                                size="large"
                                color={renderWishListIconColor(productId)}
                                style={{ padding: "2px" }}
                              />
                            </IconWrapper>
                          )}
                          {/* <h1>hello</h1> */}
                          {showBuyButton && (
                            <IconWrapper
                              style={{ top: "30px", cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCartHandler(
                                  display_image,
                                  userData.title,
                                  productId,
                                  null,
                                  userData.price,
                                  updateAddToCartText,
                                  updateCartPdtCount,
                                  null,
                                  updateCartPdt,
                                  { id: null }
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
                        </RedirectLinkMask>
                      );
                    }}
                  </HeaderConfigConsumer>
                ) : null}
                {
                  context?.productDetails?.meta_data_position == "left" ? (
                    <RenderMetaData
                      showMetaData={
                        context?.productDetails
                          ?.show_meta_data
                      }
                      metaData={
                        context?.productDetails?.metaData
                      }
                      config={context}
                      productId={productId}
                      debug={debug}
                      productDetails={productDetails}
                    />
                  ) : null
                }
                {
                  is_from_pdp_page && feedbackFields && feedbackFields.length > 0 && showFeedback ? (
                    <FeedbackForm onSubmit={feedbackSubmitHandler}>
                      {
                        feedbackFields && feedbackFields.length > 0 ? feedbackFields.map(field => (
                          <div className="form-field">
                            <label>{field}</label>
                            <input type="text" value={feedbacks[field]} onChange={(e) => {
                              let feedbackClone = cloneDeep(feedbacks);
                              feedbackClone[field] = e.target.value;
                              setFeedbacks(feedbackClone);
                            }} />
                          </div>
                        )) : null
                      }
                      <button>Submit</button>
                    </FeedbackForm>
                  ) : null
                }
                {ean ? (
                  <ConstructEanResults
                    eanRespData={tagsResp.data}
                    is_from_pdp_page={is_from_pdp_page}
                    renderRects={renderRects}
                    userData={userData}
                    hideTagResults={hideTagResults}
                    tagsToShow={tagsToShow}
                    ean={ean}
                  />
                ) : (
                  <ConstructTagResults
                    tagDataArr={tagsResp.data}
                    isLoading={tagsResp.loading}
                    is_from_pdp_page={is_from_pdp_page}
                    renderRects={renderRects}
                    userData={userData}
                    hideTagResults={hideTagResults}
                    tagsToShow={tagsToShow}
                    ean={ean}
                    hideTitle={hideTitle}
                  />
                )}
                {
                  context?.productDetails?.showUserConfig || context?.productDetails?.showUserConfig == undefined ? (
                    <UserProfileWrapper>
                      <ConfigConsumer>
                        {(context) => {
                          const mad_UUID = localStorage.getItem("mad_UUID");
                          let user_id = localStorage.getItem("userId");
                          if (!user_id) {
                            user_id = context.user_id;
                          }
                          const handleClick = (content) => {
                            navigator.clipboard.writeText(content);
                          };
                          return (
                            <UserInfoWrapper>
                              <tr>
                                <td>MAD UUID</td>
                                <td>{mad_UUID}</td>
                                <td>
                                  <button onClick={() => handleClick(mad_UUID)}>
                                    <Icon name="copy" />
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>User ID</td>
                                <td>{user_id}</td>
                                <td>
                                  <button onClick={() => handleClick(user_id)}>
                                    <Icon name="copy" />
                                  </button>
                                </td>
                              </tr>
                            </UserInfoWrapper>
                          );
                        }}
                      </ConfigConsumer>
                    </UserProfileWrapper>
                  ) : null
                }
              </>
            ) : (
              <>
                <UploadedImgWrapper ref={parentRef}>
                  {isBBox() || is_bbox ? (
                    <canvas ref={canvas} />
                  ) : (
                    <UploadedProductImage
                      is_from_pdp_page={is_from_pdp_page}
                      src={LoaderImg}
                      alt={"No Image"}
                    />
                  )}
                </UploadedImgWrapper>
                <ConstructTagResults
                  tagDataArr={tagsResp.data}
                  isLoading={tagsResp.loading}
                  is_from_pdp_page={is_from_pdp_page}
                  renderRects={renderRects}
                  userData={userData}
                  hideTagResults={hideTagResults}
                  tagsToShow={tagsToShow}
                  ean={ean}
                  hideTitle={hideTitle}
                />
                <UserProfileWrapper>
                  <ConfigConsumer>
                    {(context) => {
                      const mad_UUID = localStorage.getItem("mad_UUID");
                      let user_id = localStorage.getItem("userId");
                      if (!user_id) {
                        user_id = context.user_id;
                      }
                      const handleClick = (content) => {
                        navigator.clipboard.writeText(content);
                      };
                      return (
                        <UserInfoWrapper>
                          <tr>
                            <td>MAD UUID</td>
                            <td>{mad_UUID}</td>
                            <td>
                              <button onClick={() => handleClick(mad_UUID)}>
                                <Icon name="copy" />
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>User ID</td>
                            <td>{user_id}</td>
                            <td>
                              <button onClick={() => handleClick(user_id)}>
                                <Icon name="copy" />
                              </button>
                            </td>
                          </tr>
                        </UserInfoWrapper>
                      );
                    }}
                  </ConfigConsumer>
                </UserProfileWrapper>
              </>
            )}
          </SearchResultWrapper>
        );
      }}
    </PlayerConsumer>
  );
};

const ConstructEanResults = (props) => {
  const {
    eanRespData,
    is_from_pdp_page,
    userData,
    hideTagResults,
    tagsToShow,
    ean,
  } = props;
  const tagMapStrData = {};

  if (eanRespData && Object.keys(eanRespData).length > 0) {
    for (const key in eanRespData) {
      if (
        typeof eanRespData[key] === "string" ||
        eanRespData[key] instanceof String
      ) {
        if (eanRespData[key] === "") {
          tagMapStrData[key] = "NA";
        } else {
          tagMapStrData[key] = eanRespData[key];
        }
      } else if (
        Array.isArray(eanRespData[key]) &&
        (eanRespData[key].length === 0 || eanRespData[key][0] === "")
      ) {
        tagMapStrData[key] = "NA";
      } else if (Array.isArray(eanRespData[key])) {
        tagMapStrData[key] = eanRespData[key];
      }
    }
  }
  return (
    <RenderTabs
      tagMapData={tagMapStrData}
      is_from_pdp_page={is_from_pdp_page}
      renderRects={props.renderRects}
      userData={userData}
      hideTagResults={hideTagResults}
      tagsToShow={tagsToShow}
      ean={ean}
    />
  );
};

const ConstructTagResults = (props) => {
  const {
    tagDataArr,
    isLoading,
    is_from_pdp_page,
    userData,
    hideTagResults,
    tagsToShow,
    ean,
    hideTitle,
  } = props;
  const tagMapData = {};

  if (tagDataArr && tagDataArr.length) {
    tagDataArr.map((tagObj) => {
      let tagKey =
        tagObj && tagObj.productType && tagObj.productType[0]
          ? tagObj.productType[0]
          : "";
      if (tagKey && tagObj && tagObj.tags && Object.keys(tagObj.tags).length) {
        let new_tag_obj = {};
        for (let each_prop in tagObj.tags) {
          if (each_prop != "Base Color") {
            if (
              is_from_pdp_page &&
              each_prop != "Description" &&
              each_prop != "Title" &&
              each_prop != "Color"
            ) {
              new_tag_obj[each_prop] = tagObj.tags[each_prop];
            } else if (!is_from_pdp_page) {
              new_tag_obj[each_prop] = tagObj.tags[each_prop];
            }
          }
        }
        new_tag_obj["Category"] = [[tagKey], [1]];
        tagMapData[tagKey] = new_tag_obj;
      }
      // else if(tagKey && tagObj && tagObj.msd_tags && Object.keys(tagObj.msd_tags).length) {
      //     tagMapData[tagKey] = tagObj.msd_tags
      // }
      return tagObj;
    });
  }
  return isLoading ? (
    <Mask />
  ) : (
    <RenderTabs
      tagMapData={tagMapData}
      is_from_pdp_page={is_from_pdp_page}
      renderRects={props.renderRects}
      userData={userData}
      hideTagResults={hideTagResults}
      tagsToShow={tagsToShow}
      ean={ean}
      hideTitle={hideTitle}
    />
  );
};

const RenderTabs = (props) => {
  const {
    tagMapData,
    is_from_pdp_page,
    userData,
    hideTagResults,
    tagsToShow,
    ean,
    hideTitle,
  } = props;
  let activeText = "";
  if (tagMapData && Object.keys(tagMapData).length) {
    if (ean) {
      activeText = Object.keys(tagMapData);
    } else {
      activeText = Object.keys(tagMapData)[0];
    }
  }
  const [activeTab, updateTab] = useState(activeText);
  if (activeTab === "" && activeText.length) {
    updateTab(activeText);
  }
  return (
    <SearchTagsWrapper is_from_pdp_page={is_from_pdp_page}>
      {ean ? (
        <div>
          {/* {is_from_pdp_page ? null : (
          <PdtRecommendationTabsWrapper>
            {Object.keys(tagMapData).map((tabs, key) => {
              return (
                <PdtRecommendationTabs
                  isActive={tabs === activeTab}
                  key={`RecommendationTabs_${key}`}
                  onClick={(e) => {
                    updateTab(tabs);
                    props.renderRects(tabs);
                  }}
                >
                  {tabs}
                </PdtRecommendationTabs>
              );
            })}
          </PdtRecommendationTabsWrapper>
        )} */}
          <RenderTagInfo
            tagData={tagMapData || {}}
            userData={userData}
            hideTagResults={hideTagResults}
            is_from_pdp_page={is_from_pdp_page}
            tagsToShow={tagsToShow}
            ean={ean}
            hideTitle={hideTitle}
          />
        </div>
      ) : (
        <>
          {is_from_pdp_page ? null : (
            <PdtRecommendationTabsWrapper>
              {Object.keys(tagMapData).map((tabs, key) => {
                return (
                  <PdtRecommendationTabs
                    isActive={tabs === activeTab}
                    key={`RecommendationTabs_${key}`}
                    onClick={(e) => {
                      updateTab(tabs);
                      props.renderRects(tabs);
                    }}
                  >
                    {tabs}
                  </PdtRecommendationTabs>
                );
              })}
            </PdtRecommendationTabsWrapper>
          )}

          <RenderTagInfo
            tagData={tagMapData[activeTab] || {}}
            userData={userData}
            hideTagResults={hideTagResults}
            is_from_pdp_page={is_from_pdp_page}
            tagsToShow={tagsToShow}
            hideTitle={hideTitle}
          />
        </>
      )}
    </SearchTagsWrapper>
  );
};

const RenderTagInfo = (props) => {
  const {
    tagData,
    userData,
    hideTagResults,
    is_from_pdp_page,
    tagsToShow,
    ean,
    hideTitle,
  } = props;
  const [isShowClicked, updateShowClicked] = useState(false);

  let allowed_fields = ["title", "price", "category", "product_id"];
  return (
    <TagWrapper>
      {userData ? (
        <>
          {!hideTitle && (
            <PdTitleWrapper>{userData.title || userData.Title}</PdTitleWrapper>
          )}
          <PdDescWrapper>
            <span>{userData.brand ? userData.brand : ""} </span>{" "}
            <span> {userData.brand && userData.price ? "|" : ""} </span>{" "}
            <span> {userData.price ? `$${userData.price}` : ""} </span>
          </PdDescWrapper>
        </>
      ) : null}
      {/* <ProductTitleWrapper>Product Details</ProductTitleWrapper> */}
      {is_from_pdp_page && hideTagResults && userData.categorical_tags
        ? Object.keys(allowed_fields).map((tags, key) => {
          let tag_key =
            allowed_fields[tags].charAt(0).toUpperCase() +
            allowed_fields[tags].slice(1);
          let tag_value = userData[allowed_fields[tags]];

          return (
            <div>
              {tag_key.toLowerCase() == "color hex" ? (
                <div>
                  <PropertiesWrapper>{`${tag_key}: `}</PropertiesWrapper>
                  <ColorSwatch color={tag_value} />
                </div>
              ) : (
                <div>
                  <PropertiesWrapper>{`${tag_key}: `}</PropertiesWrapper>
                  <DescriptionWrapper>{`${tag_value}`}</DescriptionWrapper>
                </div>
              )}
            </div>
          );
        })
        : null}
      {is_from_pdp_page && hideTagResults && userData.categorical_tags
        ? Object.keys(userData.categorical_tags).map((tags, key) => {
          let tag_key = userData.categorical_tags[tags].split(":")[0];
          let tag_value = userData.categorical_tags[tags].split(":")[1];
          return (
            <div>
              {tag_key.toLowerCase() == "color hex" ? (
                <div>
                  <PropertiesWrapper>{`${tag_key}: `}</PropertiesWrapper>
                  <ColorSwatch color={tag_value} />
                </div>
              ) : (
                <div>
                  <PropertiesWrapper>{`${tag_key}: `}</PropertiesWrapper>
                  <DescriptionWrapper>{`${tag_value}`}</DescriptionWrapper>
                </div>
              )}
            </div>
          );
        })
        : null
      }
      {/* {tagsToShow && Object.keys(tagsToShow).length > 0
        ? Object.keys(tagsToShow).map((tag, key) => {
          return (
            <div>
              <PropertiesWrapper>{`${tagsToShow[tag]}: `}</PropertiesWrapper>
              <DescriptionWrapper>{`${userData[tag]}`}</DescriptionWrapper>
            </div>
          );
        })
        : null} */}
      {!hideTagResults
        ? Object.keys(tagData).map((tags, key) => {
          let restTag;
          if (
            tags.toLowerCase() === "stores" &&
            tagData[tags].length > 1 &&
            Array.isArray(tagData[tags])
          ) {
            restTag = tagData[tags].slice(1);
          }

          return (
            <div>
              {ean ? (
                <div>
                  {tags.toLowerCase() !== "images" ? (
                    <>
                      <PropertiesWrapper
                        style={{
                          textTransform: "uppercase",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >{`${tags}: `}</PropertiesWrapper>
                      {tags.toLowerCase() === "stores" ? (
                        <div>
                          {Array.isArray(tagData[tags]) ? (
                            Object.keys(tagData[tags][0]).map((t) => (
                              <div>
                                <DescriptionWrapper
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                >{`${t}: `}</DescriptionWrapper>
                                <DescriptionWrapper>
                                  {tagData[tags][0][t].length > 0
                                    ? `${tagData[tags][0][t]} `
                                    : "NA"}
                                </DescriptionWrapper>
                              </div>
                            ))
                          ) : (
                            <DescriptionWrapper>{`${tagData[tags]}`}</DescriptionWrapper>
                          )}
                          <DottedLine />
                          {tagData[tags].length > 1 &&
                            Array.isArray(tagData[tags]) ? (
                            isShowClicked ? (
                              <>
                                {restTag.map((tag) => (
                                  <div>
                                    {Object.keys(tag).map((r) => (
                                      <div>
                                        <DescriptionWrapper
                                          style={{
                                            textTransform: "uppercase",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                          }}
                                        >{`${r}: `}</DescriptionWrapper>
                                        <DescriptionWrapper>
                                          {tag[r] && tag[r].length > 0
                                            ? `${tag[r]} `
                                            : "NA"}
                                        </DescriptionWrapper>
                                      </div>
                                    ))}
                                    <DottedLine />
                                  </div>
                                ))}
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    updateShowClicked(!isShowClicked)
                                  }
                                >
                                  <h4
                                    style={{
                                      color: "#FF7054",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    Show Less
                                  </h4>
                                </div>
                              </>
                            ) : (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  updateShowClicked(!isShowClicked)
                                }
                              >
                                <h4
                                  style={{
                                    color: "#FF7054",
                                    marginBottom: "20px",
                                  }}
                                >
                                  Show More
                                </h4>
                              </div>
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      ) : tags.toLowerCase() === "description" ? (
                        <DescriptionWrapper>
                          <TruncateText>{`${tagData[tags]}`}</TruncateText>
                        </DescriptionWrapper>
                      ) : (
                        <DescriptionWrapper>{`${tagData[tags]}`}</DescriptionWrapper>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <>
                  {tags.toLowerCase() == "color hex" ? (
                    <div>
                      <PropertiesWrapper>{`${tags}: `}</PropertiesWrapper>
                      <ColorSwatch color={tagData[tags][0][0]} />
                    </div>
                  ) : (
                    <div>
                      <PropertiesWrapper>{`${tags}: `}</PropertiesWrapper>
                      <DescriptionWrapper>{`${tagData[tags][0][0]}`}</DescriptionWrapper>
                    </div>
                  )}
                </>
              )}
              {/* {tags.toLowerCase() == "color hex" ? (
                <div>
                  <PropertiesWrapper>{`${tags}: `}</PropertiesWrapper>
                  <ColorSwatch color={tagData[tags][0][0]} />
                </div>
              ) : (
                  <div>
                    <PropertiesWrapper>{`${tags}: `}</PropertiesWrapper>
                    <DescriptionWrapper>{`${tagData[tags][0][0]}`}</DescriptionWrapper>
                  </div>
                )} */}
            </div>
          );
        })
        : null}
    </TagWrapper>
  );
};

const SliderItem = (props) => {
  const {
    src,
    updateimageSearchData,
    debugProperties,
    forceFacetProperties,
  } = props;
  const [imgLoadStatus, updateImgLoadStatus] = useState(false);
  const [imgSrc, updateSrc] = useState(src);
  const disable = useRef(false);
  let currentDebugProps =
    debugProperties && debugProperties.current ? debugProperties.current : null;
  let currentforceFacetProperties =
    forceFacetProperties && forceFacetProperties.current
      ? forceFacetProperties.current
      : null;

  return (
    <ConfigConsumer>
      {(context) => {
        const { vue_tag, correlation_key, image_type, url } = context;
        let API_KEY = context.API_KEY;
        let default_url = url;
        if (vue_tag.API_KEY) {
          API_KEY = vue_tag.API_KEY;
        }
        const configProps = {
          vue_tag,
          API_KEY,
          correlation_key,
          image_type,
          default_url,
        };

        return (
          <ImgWrapper disabled={disable.current}>
            <ImgEl
              src={imgLoadStatus ? imgSrc : LoaderImg}
              alt="Slider Image"
              onLoad={(e) => updateImgLoadStatus(true)}
              onError={(e) => {
                disable.current = true;
                updateSrc(LoaderImg);
              }}
              onClick={(e) => {
                updateimageSearchData((currSearchData) => {
                  const tempSearchData = { ...currSearchData };
                  tempSearchData.file = imgSrc;
                  return tempSearchData;
                });
                makeAPIRequests(
                  imgSrc,
                  updateimageSearchData,
                  configProps,
                  currentDebugProps,
                  currentforceFacetProperties
                );
                ConstructImageSrc(imgSrc, updateimageSearchData);
              }}
            />
          </ImgWrapper>
        );
      }}
    </ConfigConsumer>
  );
};

const RenderSlider = (props) => {
  return (
    <SliderCont>
      <ProductCarousel
        list={props.slider_images ? props.slider_images : VueTagCarousel}
        ItemCont={SliderItem}
        sliderPerGroup={5}
        {...props}
      />
    </SliderCont>
  );
};

const RenderDebugSection = (props) => {
  const { debugProperties } = props;
  const { API_KEY, url, name } = debugProperties.current;
  const currState = useRef({
    API_KEY,
    url,
    name,
  });

  return (
    <DebugWrapper
      onSubmit={(e) => {
        e.preventDefault();
        debugProperties.current = { ...currState.current };
      }}
    >
      <Input
        value={API_KEY}
        placeholder="API KEY"
        onInput={(e) => (currState.current.API_KEY = e.currentTarget.value)}
      />
      <Input
        value={url}
        placeholder="URL"
        onInput={(e) => (currState.current.url = e.currentTarget.value)}
      />
      <Input
        value={name}
        placeholder="Name"
        onInput={(e) => (currState.current.name = e.currentTarget.value)}
      />
      <Input type="submit" value="Apply" />
    </DebugWrapper>
  );
};

const RenderForceFacetSection = (props) => {
  const {
    forceFacetProperties,
    debugProperties,
    updateimageSearchData,
    imageSearchData,
  } = props;
  const { force_facet } = forceFacetProperties.current;
  const currState = useRef({
    force_facet,
  });
  return (
    <ConfigConsumer>
      {(context) => {
        const { vue_tag, correlation_key, image_type, url } = context;
        let API_KEY = context.API_KEY;
        let default_url = url;
        if (vue_tag.API_KEY) {
          API_KEY = vue_tag.API_KEY;
        }
        const configProps = {
          vue_tag,
          API_KEY,
          correlation_key,
          image_type,
          default_url,
        };
        return (
          <DebugWrapper>
            <TextElementBlack>Force Facet</TextElementBlack>
            <Select
              list={[
                "None",
                "bag",
                "belt",
                "dress",
                "footwear",
                "glasses",
                "hat",
                "jewelery",
                "lower_lingerie",
                "onepiece",
                "outerwear",
                "pant",
                "shorts",
                "skirt",
                "top",
                "upper_lingerie",
                "watch",
              ]}
              onChange={(e) => {
                currState.current.force_facet = e.currentTarget.value;
                forceFacetProperties.current = { ...currState.current };
                if (imageSearchData.file) {
                  makeAPIRequests(
                    imageSearchData.file,
                    updateimageSearchData,
                    configProps,
                    debugProperties,
                    forceFacetProperties.current
                  );
                  ConstructImageSrc(
                    imageSearchData.file,
                    updateimageSearchData
                  );
                }
              }}
            />
          </DebugWrapper>
        );
      }}
    </ConfigConsumer>
  );
};

const RenderMultiImageFacets = (props) => {
  const {
    updateimageSearchData,
    debugProperties,
    forceFacetProperties,
  } = props;

  const [mainUrl, updateMainURL] = useState("");
  const [garmentUrl, updateGarmentUrl] = useState("");
  const [outfitUrl, updateOutfitUrl] = useState("");
  const [payload, updatePayload] = useState("");
  let currentDebugProps =
    debugProperties && debugProperties.current ? debugProperties.current : null;
  let currentforceFacetProperties =
    forceFacetProperties && forceFacetProperties.current
      ? forceFacetProperties.current
      : null;

  return (
    <ConfigConsumer>
      {(context) => {
        const { vue_tag, correlation_key, image_type, url } = context;
        let API_KEY = context.API_KEY;
        let default_url = url;
        if (vue_tag.API_KEY) {
          API_KEY = vue_tag.API_KEY;
        }
        const configProps = {
          vue_tag,
          API_KEY,
          correlation_key,
          image_type,
          default_url,
        };
        return (
          <MultiImageForm
            onSubmit={(e) => {
              e.preventDefault();
              let payloadValue = payload.trim();
              let dupPayload = payloadValue.length
                ? JSON.parse(payloadValue)
                : {};
              if (
                dupPayload &&
                dupPayload.image_url &&
                dupPayload.image_url.length
              ) {
                dupPayload.image_url.map((image) => {
                  if (image && image.type && image.type === "main") {
                    updateMainURL(image.url);
                  }
                  if (image && image.type && image.type === "outfit") {
                    updateOutfitUrl(image.url);
                  }
                  if (image && image.type && image.type === "garment") {
                    updateGarmentUrl(image.url);
                  }
                  return image;
                });
                let JSONPayload = JSON.parse(payload).image_url;
                updateimageSearchData((currSearchData) => {
                  const tempSearchData = { ...currSearchData };
                  tempSearchData.file = JSONPayload;
                  return tempSearchData;
                });
                if (JSONPayload.length) {
                  makeAPIRequests(
                    JSONPayload,
                    updateimageSearchData,
                    configProps,
                    currentDebugProps,
                    currentforceFacetProperties
                  );
                  ConstructImageSrc(JSONPayload, updateimageSearchData);
                }
              } else {
                if (
                  mainUrl.trim().length &&
                  garmentUrl.trim().length &&
                  outfitUrl.trim().length
                ) {
                  let updatedPayloadObj = {
                    image_url: [
                      {
                        type: "main",
                        url: mainUrl,
                      },
                      {
                        type: "outfit",
                        url: outfitUrl,
                      },
                      {
                        type: "garment",
                        url: garmentUrl,
                      },
                    ],
                  };
                  updatePayload(JSON.stringify(updatedPayloadObj));
                  let JSONPayload = updatedPayloadObj.image_url;
                  updateimageSearchData((currSearchData) => {
                    const tempSearchData = { ...currSearchData };
                    tempSearchData.file = JSONPayload;
                    return tempSearchData;
                  });
                  if (JSONPayload.length) {
                    makeAPIRequests(
                      JSONPayload,
                      updateimageSearchData,
                      configProps,
                      currentDebugProps,
                      currentforceFacetProperties
                    );
                    ConstructImageSrc(JSONPayload, updateimageSearchData);
                  }
                }
              }
            }}
          >
            <InputEl
              value={garmentUrl}
              placeholder="Enter the Garment Image URL here"
              onInput={(e) => {
                let value = e.currentTarget.value;
                updateGarmentUrl(value);
              }}
              onChange={(e) => updateGarmentUrl(e.currentTarget.value)}
            />
            <InputEl
              value={mainUrl}
              placeholder="Enter the Main Image URL here"
              onInput={(e) => {
                let value = e.currentTarget.value;
                updateMainURL(value);
              }}
              onChange={(e) => updateMainURL(e.currentTarget.value)}
            />
            <InputEl
              value={outfitUrl}
              placeholder="Enter the Outfit Image URL here"
              onInput={(e) => {
                let value = e.currentTarget.value;
                updateOutfitUrl(value);
              }}
              onChange={(e) => updateOutfitUrl(e.currentTarget.value)}
            />
            <MultiImageTextArea
              rows="6"
              cols="50"
              value={payload}
              placeholder="Enter your payload here"
              onInput={(e) => updatePayload(e.currentTarget.value)}
              onChange={(e) => updatePayload(e.currentTarget.value)}
            />
            <Input type="submit" value="GET TAGS" />
          </MultiImageForm>
        );
      }}
    </ConfigConsumer>
  );
};

export {
  RenderImageSearchInput,
  RenderSearchResults,
  RenderSlider,
  RenderDebugSection,
  RenderMultiImageFacets,
  RenderForceFacetSection,
};
