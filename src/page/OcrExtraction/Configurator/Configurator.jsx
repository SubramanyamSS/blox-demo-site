import React, { useContext } from "react";
import { ConfiguratorContext } from "../../../container/Configurator";
import Canvas from "./Canvas/Canvas";
import { ConfiguratorWrapper } from "./styled";
import Workspace from "./Workspace";
import { ActionModal } from "../components/modal";
import { InputWrapper } from "./Workspace/styled";
import Notifier from "../components/notifier/Notifier";
import { OcrExtractionContext } from "../../../container/OcrExtraction";
import { useHistory } from "react-router-dom";
import { LoaderContainer, LoaderIcon } from "../styled";
import LoaderGIF from "../../../static/img/loader.svg";
import Table from "./Table";
import Viewer from "./Viewer";

const Configurator = () => {
  const history = useHistory();
  const {
    configName,
    createNewConfig,
    currentConfig,
    deleteConfig,
    isConfirmModalVisible,
    isCreateModalVisible,
    isFetchingImageFeatures,
    setConfirmModalVisibility,
    setConfigName,
    setCreateModalVisibility,
    setDataModalVisibility,
    isDataModalOpen,
    dataModalContent,
    dataContentType,
  } = useContext(ConfiguratorContext);

  const { isNotifierVisibile, notifierMeta, setIsNotifierVisible } = useContext(
    OcrExtractionContext
  );

  const getDataModalContent = (dataType) => {
    if (dataType === "table") {
      return <Table data={dataModalContent} />
    } else if (["key-value", "checkbox", "code"].includes(dataType)) {
      return <Viewer data={dataModalContent} />
    }
  }

  return isFetchingImageFeatures ? (
    <LoaderContainer isfullScreen>
      <LoaderIcon src={LoaderGIF} alt="Mask Loader" />
    </LoaderContainer>
  ) : (
    <ConfiguratorWrapper>
      <div className="configurator">
        <Notifier
          hideNotifier={() => setIsNotifierVisible(false)}
          notification={{ ...notifierMeta }}
          isShowing={isNotifierVisibile}
        />
        <ActionModal
          buttonFailure="Cancel"
          buttonSuccess="Create"
          isClosedOnEsc
          isOpen={isCreateModalVisible}
          onFailure={() => setCreateModalVisibility(false)}
          onSuccess={() => createNewConfig(configName)}
          showCloseIcon
          title="New Configuration"
        >
          <div class="d-flex-center">
            <div class="mr-4">Config Name</div>
            <InputWrapper
              autoComplete="off"
              className="px-4 bdr-rad-8-16"
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="Configuration"
              style={{
                width: "80%",
              }}
              type="text"
              value={configName}
            />
          </div>
        </ActionModal>
        <ActionModal
          buttonFailure="Cancel"
          buttonSuccess="Delete"
          isClosedOnEsc
          isOpen={isConfirmModalVisible}
          mainText={`Do you want to delete configuration ${currentConfig}`}
          onFailure={() => setConfirmModalVisibility(false)}
          onSuccess={deleteConfig}
          showCloseIcon
          title="Delete Configuration"
        />
        <ActionModal
          buttonSuccess="Close"
          isClosedOnEsc
          isOpen={isDataModalOpen}
          onSuccess={() => setDataModalVisibility(false)}
          showCloseIcon
          title="Extracted data"
        >
          {dataModalContent ? getDataModalContent(dataContentType) : "No data detected"}
        </ActionModal>
        <Canvas />
        <Workspace />
      </div>
    </ConfiguratorWrapper>
  );
};

export default Configurator;
