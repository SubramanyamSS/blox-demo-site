import React from "react";
import { ConfiguratorContainer } from "../../container/Configurator";
import { OcrExtractionContainer } from "../../container/OcrExtraction";
import Configurator from "./Configurator";
import Upload from "./Upload";

const OcrExtractionDashboard = (history) => {
  const { match, location } = history;
  let params = new URLSearchParams(location.search);
  return (
    <OcrExtractionContainer>
      {match.params.imageHash ? (
        <ConfiguratorContainer imageHash={match.params.imageHash} currentConfigName={params.get("config_name")}>
          <Configurator />
        </ConfiguratorContainer>
      ) : (
        <Upload image_url={params.get("image_url")} config_name={params.get("config_name")} />
      )}
    </OcrExtractionContainer>
  );
};

export default OcrExtractionDashboard;
