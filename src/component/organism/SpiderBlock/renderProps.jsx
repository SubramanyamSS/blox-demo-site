import React from "react";
import { SpiderWrapper } from "./styled";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

const RenderSpiderWrapper = (props) => {
  const { spiderData, spiderCaption } = props;
  let spiderCustomData = [{ data: spiderData, meta: { color: "#2862ff" } }];
  let spiderCustomCaption = [{ data: spiderCaption }];
  let options = {
    wrapCaptionAt: 20
  }
  return (
    <SpiderWrapper>
      <RadarChart captions={spiderCaption} data={spiderCustomData} options={options} />
    </SpiderWrapper>
  );
};

export { RenderSpiderWrapper };
