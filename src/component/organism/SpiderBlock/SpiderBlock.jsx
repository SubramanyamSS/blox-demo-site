import React, { useState } from "react";
import { RenderSpiderWrapper } from "./renderProps";
import { RecommendationSpiderWrapper } from "./styled";

const SpiderBlock = (props) => {
  const { recommendedData, clientName, relative_affinity } = props;
  let spiderData = "";
  let spiderCaption = "";
  let bandit_data = {};
  if (relative_affinity && Object.keys(relative_affinity).length) {
    spiderData = {};
    spiderCaption = {};
    let relative_affinity_keys = Object.keys(relative_affinity);
    relative_affinity_keys.map((value, index) => {
      spiderData[index] = relative_affinity[value];
      spiderCaption[index] = value;
    })
  } else {
    bandit_data = props["recommendedData"]["0_enableBundit"];
    if (bandit_data) {
      if (
        bandit_data[0]["debug_info"] &&
        bandit_data[0]["debug_info"]["probability"]
      ) {
        spiderData = bandit_data[0]["debug_info"]["probability"];
        if (clientName == "2321_grocery-demo") {
          spiderCaption = {
            // columns
            0: "Generic & Packaging",
            1: "Generic & Content",
            2: "Packaging",
            3: "Generic",
            4: "Packaging & Content",
            5: "Content",
          };
        } else if (clientName == "2314_mercadolibre") {
          spiderCaption = {
            // columns
            0: "attr_type",
            1: "attr_condition",
            2: "attr_weight & attr_material",
            3: "attr_seaters_number",
            4: "attr_type & attr_style",
            5: "balanced"
          };
        } else {
          spiderCaption = {
            // columns
            0: "Colour & Pattern",
            1: "Colour & Shape",
            2: "Pattern",
            3: "Colour",
            4: "Pattern & Shape",
            5: "Shape",
          };
        }
      }
    }
  }

  return bandit_data &&
    spiderData &&
    Object.keys(spiderData).length > 0 ? (
    <RecommendationSpiderWrapper>
      <RenderSpiderWrapper
        spiderCaption={spiderCaption}
        spiderData={spiderData}
      />
    </RecommendationSpiderWrapper>
  ) : null;
};

export { SpiderBlock };
