import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { Rect } from "react-konva";
import { OcrExtractionContext } from "./OcrExtraction";

const ConfiguratorContext = createContext();
const { Provider, Consumer: ConfiguratorConsumer } = ConfiguratorContext;

const ConfiguratorContainer = ({ imageHash, currentConfigName, children }) => {
  const IMAGE_CONFIG = {
    1: [
      {
        label: "",
        sections: [],
      },
    ],
  };

  const {
    apiUrl: OCR_DASH_API_URL,
    imageDimensions,
    imageFeatures,
    setImageDimension,
    setImageFeatures,
    setNotifierMeta,
    setIsNotifierVisible,
  } = useContext(OcrExtractionContext);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(1);
  const [configName, setConfigName] = useState("");
  const [configs, setConfigs] = useState([]);
  const [currentConfig, setCurrentConfig] = useState(currentConfigName || '');
  const [currentImageConfig, setCurrentImageConfig] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageConfig, setImageConfig] = useState(IMAGE_CONFIG);
  const [isConfigLoaded, setConfigLoadState] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);
  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [isFetchingImageFeatures, setIsFetchingImageFeatures] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setImageLoadState] = useState(false);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(1);
  const [stageY, setStageY] = useState(1);

  const [isDataModalOpen, setDataModalVisibility] = useState(false)
  const [dataModalContent, setDataModalContent] = useState([])
  const [dataContentType, setDataContentType] = useState(null)

  const imageObj = new Image();
  let pageConfigLength = useRef(1);

  imageObj.src = `https://aya-healthcare.s3.ap-southeast-1.amazonaws.com/upload_data/${imageHash}`;

  useEffect(() => {
    const getImageFeatures = async () => {
      try {
        setIsFetchingImageFeatures(true);
        const res = await fetch(`${OCR_DASH_API_URL}/ocr/${imageHash}`);
        const data = await res.json();

        const { image_url, image_hash, height, width, ...features } = data;
        setImageFeatures(features);
        setImageDimension({
          height,
          width,
        });
        setIsFetchingImageFeatures(false);
      } catch (err) {
        setIsFetchingImageFeatures(false);
        setIsNotifierVisible(true);
        setNotifierMeta({
          type: "error",
          message: "Unable to featch image features currently",
        });
      }
    };

    if (!Object.keys(imageFeatures).length) {
      (async () => await getImageFeatures())();
    }
  }, []);

  /*
    This useEffect is used to set the current image-config, whenever the
    page number changes. This will be used largely when support for multi page 
    document is implemented
  */
  useEffect(() => {
    setCurrentImageConfig(imageConfig[currentPage]);
  }, [currentPage, imageConfig]);

  /*
    This keeps track of the current active index in the workspace,
    when a new input row is added or deleted
  */
  useEffect(() => {
    if (
      currentImageConfig.length > pageConfigLength.current ||
      activeIndex === currentImageConfig.length
    ) {
      setActiveIndex(currentImageConfig.length - 1);
    }
    pageConfigLength.current = currentImageConfig.length;
  }, [currentImageConfig]);

  /*
    This useEffect fetchs the config names and this will be populated,
    in the select configurations dropdown
  */
  useEffect(() => {
    const getConfigs = async () => {
      const res = await fetch(`${OCR_DASH_API_URL}/config-lookup/`);

      const { data } = await res.json();

      setConfigs(data);
    };

    (async () => await getConfigs())();
  }, []);

  /*
    This useEffect is updates the scaleX and scaleY which are used to
    scale the canvas based on the canvas height and width
  */
  useEffect(() => {
    setScaleX(0.9);
    setScaleY(0.9);
  }, [canvasWidth, canvasHeight, imageDimensions]);

  /*
    Name: setFeautureStrokeColor
    Description: Sets the stroke color for the newly selected boxes in the canvas
  */
  const setFeautureStrokeColor = (key, index, strokeColor) => {
    let imageFeature = imageFeatures[key];
    imageFeature[index] = {
      ...imageFeature[index],
      strokeColor,
    };

    const updatedImageFeatures = {
      ...imageFeatures,
      [key]: imageFeature,
    };

    setImageFeatures(updatedImageFeatures);
  };

  /*
    Name: getImageConfig
    Description: Get the image config when the user selects a config from the dropdown
  */
  const getImageConfig = async (name) => {
    const url = new URL(`${OCR_DASH_API_URL}/get-config/${name}`);
    const params = {
      image: imageHash,
    };

    url.search = new URLSearchParams(params).toString();

    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  };

  /*
    Name: createNewConfig
    Description: Makes an api call to create a new config
  */
  const createNewConfig = async (name) => {
    const res = await fetch(`${OCR_DASH_API_URL}/config/`, {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
    });

    const { message } = await res.json();

    setIsNotifierVisible(true);
    setNotifierMeta({
      type: res.status === 200 ? "success" : "error",
      message,
    });

    if (res.status == 200) {
      setCreateModalVisibility(false);
      setCurrentConfig(configName);
      setImageConfig(IMAGE_CONFIG);
      setConfigName("");
      setConfigs([...configs, name]);
    }
  };

  /*
    Name: getConfiguredRects
    Description: Highlights the already selected boxes on the canvas
  */
  const getConfiguredRects = () => {
    const configuredRects =
      currentImageConfig &&
      currentImageConfig.map(({ sections }, index) => {
        return sections.map((feature) => {
          const { coords, strokeColor = "green" } = feature;
          if (coords) {
            const startPos = coords[0];
            const width = getDistance(coords[0], coords[1]);
            const height = getDistance(coords[0], coords[3]);
            return (
              <Rect
                x={(startPos[0] * scaleX) - 2} //innerWidth / image width
                y={(startPos[1] * scaleY) - 2} //innerHeight / image height
                width={(width * scaleX) + 4}
                height={(height * scaleY) + 4}
                stroke={index === activeIndex ? "blue" : strokeColor}
                // strokeWidth={3}
                strokeWidth={1 / stageScale}
                onClick={({ evt }) => {
                  if (evt.shiftKey) {
                    setCurrentImageConfig((prevState) => {
                      const newState = [...prevState];

                      newState[activeIndex] = {
                        ...newState[activeIndex],
                        sections: [...newState[activeIndex].sections, feature],
                      };

                      return newState;
                    });
                  } else {
                    setCurrentImageConfig((prevState) => {
                      const newState = [...prevState];

                      newState[activeIndex] = {
                        ...newState[activeIndex],
                        sections: [feature],
                      };
                      return newState;
                    });
                  }
                }}
              />
            );
          }
        });
      });

    const allRects = Object.keys(imageFeatures).map((key) => {
      return imageFeatures[key].map((feature, index) => {
        const { coords, strokeColor = "#00292e" } = feature;
        const startPos = coords[0];
        const width = getDistance(coords[0], coords[1]);
        const height = getDistance(coords[0], coords[3]);
        return (
          <Rect
            x={(startPos[0] * scaleX) - 2} //innerWidth / image width
            y={(startPos[1] * scaleY) - 2} //innerHeight / image height
            width={(width * scaleX) + 4}
            height={(height * scaleY) + 4}
            stroke={strokeColor}
            strokeWidth={1 / stageScale}
            onMouseEnter={() => setFeautureStrokeColor(key, index, "#ffff00")}
            onMouseLeave={() => setFeautureStrokeColor(key, index, "#00292e")}
            onClick={({ evt }) => {
              if (evt.shiftKey) {
                setCurrentImageConfig((prevState) => {
                  const newState = [...prevState];

                  newState[activeIndex] = {
                    ...newState[activeIndex],
                    sections: [...newState[activeIndex].sections, feature],
                  };

                  return newState;
                });
              } else {
                setCurrentImageConfig((prevState) => {
                  const newState = [...prevState];

                  newState[activeIndex] = {
                    ...newState[activeIndex],
                    sections: [feature],
                  };
                  return newState;
                });
              }
            }}
          />
        );
      });
    });

    return [...allRects, ...configuredRects];
  };

  /*
    Name: getDistance
    Description: Returns the distance between two points
  */
  const getDistance = ([x1, y1], [x2, y2]) => {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
  };

  /*
    Name: handleWheel
    Description: Performs the zoom in and zoom out functionalities on the canvas on pinch/scroll
  */
  const handleWheel = (event, stageRef) => {
    const scaleBy = 1.01;
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
      if (newScale > 0.5) {
        stage.scale({ x: newScale, y: newScale });
        stage.batchDraw();
      }
    }
  };

  const handleZoom = (event, stageRef) => {
    const scaleBy = 1.3;
    const zoomType = event.target.dataset.zoomType ? event.target.dataset.zoomType : event.target.parentNode.dataset.zoomType;
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = zoomType === 'minus' ? oldScale / scaleBy : oldScale * scaleBy;
      if (newScale >= 0.5) { 
        stage.scale({ x: newScale, y: newScale });
        stage.batchDraw();
      } else {
        stage.scale({ x: 0.5, y: 0.5 });
        stage.batchDraw();
        const newPos = {
          x: 0,
          y: 0,
        }
        stage.position(newPos);
      }
      if (newScale === 1) { 
        const newPos = {
          x: 0,
          y: 0,
        }
        stage.position(newPos);
      } 
    }
  };

  /*
    Name: saveConfig
    Description: Saves the config
  */
  const saveConfig = async (config) => {
    try {
      const newConfig = { ...imageConfig };
      newConfig[currentPage] = config;

      const url = new URL(`${OCR_DASH_API_URL}/save-config/${currentConfig}`);
      const params = {
        image: imageHash,
      };

      url.search = new URLSearchParams(params).toString();

      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          config: newConfig,
        }),
      });

      if (!configs.includes(currentConfig)) {
        setConfigs([...configs, currentConfig]);
      }
      const data = await res.json();

      setIsLoading(false);
      setIsNotifierVisible(true);
      setNotifierMeta({
        type: "success",
        message: "Configuration saved successfully",
      });
    } catch (err) {
      setIsLoading(false);
      setIsNotifierVisible(true);
      setNotifierMeta({
        type: "error",
        message: "Something went wrong",
      });
    }
  };

  /*
    Name: deleteConfig
    Description: Deletes a config
  */
  const deleteConfig = async () => {
    const res = await fetch(`${OCR_DASH_API_URL}/config/${currentConfig}`, {
      method: "DELETE",
    });

    const { message } = await res.json();

    if (res.status === 200) {
      setCurrentConfig("");
      setImageConfig(IMAGE_CONFIG);
      setConfirmModalVisibility(false);

      const updatedConfigs = configs.filter(
        (config) => config !== currentConfig
      );
      setConfigs([...updatedConfigs]);
    }

    setIsNotifierVisible(true);
    setNotifierMeta({
      type: res.status === 200 ? "success" : "error",
      message,
    });
  };

  /*
    Name: getConfigs
    Description: Returns config names in a format required by the Select component
  */
  const getConfigs = () => {
    return configs.map((config) => ({
      label: config,
      value: config,
    }));
  };

  return (
    <Provider
      value={{
        activeIndex,
        canvasHeight,
        canvasWidth,
        configName,
        configs,
        createNewConfig,
        currentConfig,
        currentImageConfig,
        currentPage,
        deleteConfig,
        getConfigs,
        getConfiguredRects,
        getDistance,
        getImageConfig,
        handleWheel,
        handleZoom,
        imageHash,
        imageObj,
        isConfigLoaded,
        isConfirmModalVisible,
        isCreateModalVisible,
        isFetchingImageFeatures,
        isLoading,
        saveConfig,
        scaleX,
        scaleY,
        setActiveIndex,
        setCanvasHeight,
        setCanvasWidth,
        setConfigLoadState,
        setConfirmModalVisibility,
        setConfigName,
        setCreateModalVisibility,
        setCurrentConfig,
        setCurrentImageConfig,
        setImageConfig,
        setImageLoadState,
        setIsLoading,
        stageScale,
        stageX,
        stageY,

        setDataModalVisibility,
        isDataModalOpen,
        setDataModalContent,
        dataModalContent,
        setDataContentType,
        dataContentType
      }}
    >
      {children}
    </Provider>
  );
};

export { ConfiguratorContainer, ConfiguratorConsumer, ConfiguratorContext };
