import React, { useState, useRef } from "react";
import {
  TitleWrapper,
  VueLogoEl,
  ImageSearchWrapper,
  VueTagHyphenBanner,
  VueTagHyphenHeader,
  VueTagHyphenContent,
  VueTagHyphenMadStreetDenContent,
  GuidelinesContent,
} from "./styled";
import {
  RenderImageSearchInput,
  RenderSearchResults,
  RenderSlider,
  RenderDebugSection,
  RenderMultiImageFacets,
  RenderForceFacetSection,
} from "./renderProps";
import VueLogoImg from "../../static/svg/AI-powered-product-tagging.svg";
import VueTagHyphen from "../../static/img/HYPHEN_ITALIA.png";
import { ConfigConsumer } from "../../container";

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

const VueTag = (props) => {
  const [imageSearchData, updateimageSearchData] = useState({
    imgSrc: "",
    tagsResp: {},
    file: null,
  });
  const { imgSrc, tagsResp } = imageSearchData;
  if(tagsResp && Object.keys(tagsResp).length > 0){
    if(tagsResp.loading === true && tagsResp.data){
      updateimageSearchData({
        imgSrc: "",
        tagsResp: {},
        file: null,
      })
    }
  }
  const debug = isDebug();
  const debugProperties = useRef({
    API_KEY: "",
    url: "",
    name: "",
  });
  const forceFacetProperties = useRef({
    force_facet: "",
  });

  return (
    <>
      <ConfigConsumer>
        {(context) => {
          const enableMultiImageFacet =
            context && context.vue_tag && context.vue_tag.multiImage
              ? context.vue_tag.multiImage
              : false;
          const force_facet =
            context && context.vue_tag && context.vue_tag.force_facet
              ? context && context.vue_tag && context.vue_tag.force_facet
              : false;
          const is_hyphen_user =
            context && context.client_name === "tag_hyphen" ? true : false;
          const is_bbox =
            context && context.vue_tag && context.vue_tag.isBbox
              ? context.vue_tag.isBbox
              : false;
          const isEan =
          context && context.vue_tag && context.vue_tag.ean
              ? context.vue_tag.ean
              : false;
          return (
            <div style={{ width: "80%", margin: "auto" }}>
              {
                isEan ? (
                  <div>
                    {is_hyphen_user ? (
                      <VueTagHyphenBanner>
                      <VueTagHyphenHeader>Ai Tag Management</VueTagHyphenHeader>
                      <VueTagHyphenContent>
                        Upload image or try out the demo images below.
                      </VueTagHyphenContent>
                      <VueTagHyphenMadStreetDenContent>
                        Powered by Mad Street Den Vue.ai
                      </VueTagHyphenMadStreetDenContent>
                      </VueTagHyphenBanner>
                    ) : null}
                    {enableMultiImageFacet ? (
                <RenderMultiImageFacets
                  debugProperties={debug ? debugProperties : null}
                  updateimageSearchData={updateimageSearchData}
                />
              ) : (
                <>
                  {is_hyphen_user ? (
                    <GuidelinesContent isHyphen={is_hyphen_user}>
                      Click on one of the images above to see the tags created
                      by VueTag
                    </GuidelinesContent>
                  ) : null}
                  {debug ? (
                    <RenderDebugSection debugProperties={debugProperties} />
                  ) : null}
                  <ImageSearchWrapper style={{ marginTop: '150px'}}>
                    <RenderImageSearchInput
                      debugProperties={debug ? debugProperties : null}
                      forceFacetProperties={forceFacetProperties}
                      updateimageSearchData={updateimageSearchData}
                    />
                  </ImageSearchWrapper>
                </>
              )}
              <RenderSearchResults
                src={imgSrc}
                tagsResp={tagsResp}
                is_bbox={is_bbox}
                ean={context.vue_tag.ean}
              />
                  </div>
                ) : (
                  <div>
                     {/* <TitleWrapper>
                        {is_hyphen_user ? <VueLogoEl src={VueTagHyphen} alt='Vue Tag Hyphen' title='Hypehn' /> : <VueLogoEl src={VueLogoImg} alt='Vue Find logo' title='Vue Find' /> }
                    </TitleWrapper> */}
                    {is_hyphen_user ? (
                      <VueTagHyphenBanner>
                      <VueTagHyphenHeader>Ai Tag Management</VueTagHyphenHeader>
                      <VueTagHyphenContent>
                        Upload image or try out the demo images below.
                      </VueTagHyphenContent>
                      <VueTagHyphenMadStreetDenContent>
                        Powered by Mad Street Den Vue.ai
                      </VueTagHyphenMadStreetDenContent>
                      </VueTagHyphenBanner>
                    ) : null}
                    {enableMultiImageFacet ? (
                      <RenderMultiImageFacets
                        debugProperties={debug ? debugProperties : null}
                        updateimageSearchData={updateimageSearchData}
                      />
                    ) : (
                    <>
                      <RenderSlider
                        slider_images={
                        context.vue_tag.imagelinks
                        ? context.vue_tag.imagelinks
                        : null
                      }
                      debugProperties={debug ? debugProperties : null}
                      forceFacetProperties={forceFacetProperties}
                      updateimageSearchData={updateimageSearchData}
                    />
                    {is_hyphen_user ? (
                      <GuidelinesContent isHyphen={is_hyphen_user}>
                        Click on one of the images above to see the tags created
                        by VueTag
                      </GuidelinesContent>
                    ) : null}
                    {debug ? (
                      <RenderDebugSection debugProperties={debugProperties} />
                    ) : null}
                    {force_facet ? (
                      <RenderForceFacetSection
                        forceFacetProperties={forceFacetProperties}
                        debugProperties={debug ? debugProperties : null}
                        updateimageSearchData={updateimageSearchData}
                        imageSearchData={imageSearchData}
                      />
                    ) : null}
                    <ImageSearchWrapper>
                      <RenderImageSearchInput
                        debugProperties={debug ? debugProperties : null}
                        forceFacetProperties={forceFacetProperties}
                        updateimageSearchData={updateimageSearchData}
                      />
                    </ImageSearchWrapper>
                  </>
                )}
                <RenderSearchResults
                  src={imgSrc}
                  tagsResp={tagsResp}
                  is_bbox={is_bbox}
                />
                </div>
                )
              }
              
              
              
            </div>
          );
        }}
      </ConfigConsumer>
    </>
  );
};

export { VueTag };
