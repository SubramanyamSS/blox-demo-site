import React, { useContext, useEffect } from "react";
import { ConfiguratorContext } from "../../../../container/Configurator";
import {
  ButtonWrapper,
  InputWrapper,
  WorkspaceWrapper,
  CombinedInputContainer,
  InputContainerWrapper,
  IconButtonWrapper,
  SaveButtonWrapper,
  SaveWrapper,
  PageNumberWrapper,
} from "./styled";
import Select from "react-select";
import Tooltip from "../../components/tootip";
import LoaderGIF from "../../../../static/img/loader.svg";
import { LoaderContainer, LoaderIcon } from "../../styled";

const Workspace = () => {
  const {
    activeIndex,
    configs,
    getConfigs,
    currentConfig,
    setCurrentConfig,
    getImageConfig,
    setConfigLoadState,
    setImageConfig,
    setCreateModalVisibility,
    currentPage,
    saveConfig,
    currentImageConfig,
    setActiveIndex,
    setCurrentImageConfig,
    setConfirmModalVisibility,
    isLoading,
    setIsLoading,
    setDataModalVisibility,
    setDataModalContent,
    setDataContentType
  } = useContext(ConfiguratorContext);

  const IMAGE_CONFIG = {
    1: [
      {
        label: "",
        sections: [],
      },
    ],
  };

  const initialConfigLoad = async (value) => {
    try {
      setIsLoading(true);
      let config = await getImageConfig(value);
      if (!Object.keys(config).length) {
        setConfigLoadState(false);
        config = IMAGE_CONFIG;
      } else {
        setConfigLoadState(true);
      }
      setIsLoading(false);
      setImageConfig({ ...config });
    } catch (err) {
      setIsLoading(false);
      setImageConfig(IMAGE_CONFIG);
    }
  }

  useEffect(() => {
    if (currentConfig != '') {
      initialConfigLoad(currentConfig)  
    }
  }, []);

  return (
    <WorkspaceWrapper className="px-2">
      <div className="d-flex-center my-2 pl-2">
        <div style={{ width: "55%", paddingRight: "5%", height: "20%" }}>
          <Select
            placeholder="Select configuration"
            formatCreateLabel={(ele) => `Add ${ele}`}
            options={configs && getConfigs()}
            value={
              currentConfig && {
                value: currentConfig,
                label: currentConfig,
              }
            }
            isSearchable
            isDisabled={isLoading}
            onChange={async ({ value }) => {
              setCurrentConfig(value);
              try {
                setIsLoading(true);
                let config = await getImageConfig(value);
                if (!Object.keys(config).length) {
                  setConfigLoadState(false);
                  config = IMAGE_CONFIG;
                } else {
                  setConfigLoadState(true);
                }
                setIsLoading(false);
                setImageConfig({ ...config });
              } catch (err) {
                setIsLoading(false);
                setImageConfig(IMAGE_CONFIG);
              }
            }}
            styles={{
              control: (provided, state) => ({
                ...provided,
                background: "#fff",
                borderColor: "#2862FF",
                height: "2.5rem",
                borderRadius: "30px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }),

              valueContainer: (provided, state) => ({
                ...provided,
                height: "2.5rem",
                padding: "0 6px",
              }),

              input: (provided, state) => ({
                ...provided,
                margin: "0px",
              }),
              indicatorSeparator: (state) => ({
                display: "none",
              }),
              indicatorsContainer: (provided, state) => ({
                ...provided,
                height: "2.5rem",
              }),
              singleValue: (provided) => ({
                ...provided,
                height: "20px",
              }),
              placeholder: (provided) => ({
                ...provided,
                height: "20px",
              }),
            }}
          />
        </div>
        <ButtonWrapper
          className="mr-3 px-3"
          style={{
            border: "none",
          }}
          onClick={() => setCreateModalVisibility(true)}
          disabled={isLoading}
        >
          New Config
        </ButtonWrapper>
        <IconButtonWrapper
          onClick={() => setConfirmModalVisibility(true)}
          disabled={!currentConfig || isLoading}
        >
          <i class="trash icon small pl-1"></i>
        </IconButtonWrapper>
      </div>
      {isLoading ? (
        <LoaderContainer>
          <LoaderIcon src={LoaderGIF} alt="Mask Loader" />
        </LoaderContainer>
      ) : (
        <div style={{ marginBottom: "12%" }}>
          {currentConfig && (
            <div className="ml-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="mr-4">Page</div>
                <PageNumberWrapper>{currentPage}</PageNumberWrapper>
              </div>
            </div>
          )}
          {currentConfig ? (
            currentImageConfig.map((config, index) => (
              <CombinedInputContainer
                className={activeIndex === index && "bg-active"}
                onClick={() => setActiveIndex(index)}
              >
                <InputContainerWrapper>
                  <InputWrapper
                    autoComplete="off"
                    type="text"
                    placeholder="Label"
                    className="px-3"
                    value={config.label}
                    onChange={(event) => {
                      const { value } = event.target
                      setCurrentImageConfig((prevState) => {
                        const newState = [...prevState];
                        newState[index] = {
                          ...newState[index],
                          label: value,
                        };
                        return newState;
                      });
                    }}
                  />
                </InputContainerWrapper>
                <InputContainerWrapper>
                  <Tooltip
                    content={config.sections.reduce(
                      (acc, { text }) => `${acc} ${text}`,
                      ""
                    )}
                    onShow={() => (config.sections.length ? true : false)}
                  >
                    <InputWrapper
                      autoComplete="off"
                      type="text"
                      className="px-3"
                      value={config.sections.reduce(
                        (acc, { text }) => `${acc} ${text}`,
                        ""
                      )}
                      placeholder="Content"
                      onFocus={(e) => {
                        if (["table", "key-value", "checkbox", "code"].includes(config?.type)) {
                          setDataModalContent(config?.data || [])
                          setDataContentType(config?.type)
                          setDataModalVisibility(true)
                        }
                      }}
                    />
                  </Tooltip>
                </InputContainerWrapper>
                {activeIndex === index &&
                  (index === currentImageConfig.length - 1 ? (
                    <div className="d-flex align-items-center">
                      <IconButtonWrapper
                        className={
                          index === 0
                            ? "secondary-button input-button button-disabled"
                            : "secondary-button input-button"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          const newConfig = currentImageConfig.filter(
                            (config, configIndex) => index !== configIndex
                          );
                          setCurrentImageConfig(newConfig);
                        }}
                      >
                        <i class="minus icon small pl-1"></i>
                      </IconButtonWrapper>
                      <IconButtonWrapper
                        onClick={() => {
                          setCurrentImageConfig((prevState) => {
                            const newState = [...prevState];
                            newState.push({
                              label: "",
                              sections: [],
                            });
                            return newState;
                          });
                          setConfigLoadState(false);
                        }}
                      >
                        <i class="plus icon small pl-1"></i>
                      </IconButtonWrapper>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <IconButtonWrapper
                        onClick={() => {
                          setDataModalVisibility(true)
                        }}
                        disabled={config?.type !== "table"}
                      >
                        <i class="plus icon small pl-1"></i>
                      </IconButtonWrapper>
                      <IconButtonWrapper
                        onClick={() => {
                          const newConfig = currentImageConfig.filter(
                            (config, configIndex) => index !== configIndex
                          );

                          if (!newConfig.length) {
                            setCurrentImageConfig(IMAGE_CONFIG);
                          } else {
                            setCurrentImageConfig(newConfig);
                          }
                        }}
                      >
                        <i class="minus icon small pl-1"></i>
                      </IconButtonWrapper>
                    </div>
                  ))}
              </CombinedInputContainer>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                height: "60vh",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "30px",
                paddingRight: "30px",
                fontSize: "14px",
                fontFamily: "Poppins_Medium",
              }}
            >
              Please select or create a new configuration
            </div>
          )}
        </div>
      )}
      {currentConfig && (
        <SaveWrapper>
          <SaveButtonWrapper
            onClick={() => saveConfig(currentImageConfig)}
            className="save"
            disabled={isLoading}
          >
            Save Config
          </SaveButtonWrapper>
        </SaveWrapper>
      )}
    </WorkspaceWrapper>
  );
};

export default Workspace;
