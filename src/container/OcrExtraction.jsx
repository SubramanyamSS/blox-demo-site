import React, { createContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

const OCR_DASH_API_URL = "https://aya.madstreetden.com/api";
const OcrExtractionContext = createContext();
const { Provider, Consumer: OcrExtractionConsumer } = OcrExtractionContext;

const OcrExtractionContainer = ({ children }) => {
  const history = useHistory();

  const [imageFeatures, setImageFeatures] = useState({});
  const [imageDimensions, setImageDimension] = useState({
    height: null,
    width: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageObj, setImageObj] = useState(null);
  const [isNotifierVisibile, setIsNotifierVisible] = useState(false);
  const [notifierMeta, setNotifierMeta] = useState({
    type: "",
    message: "",
  });
  const [defaultConfig, setDefaultConfig] = useState('');

  /*
    Name: processImage
    Description: When an image is uplaoded, this sends the image to be and gets the
    image features
  */
  const processImage = async () => {
    const formData = new FormData();
    formData.append("image", imageObj);
    const res = await fetch(`${OCR_DASH_API_URL}/ocr/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const { image_url, image_hash, height, width, ...features } = data;
    setImageFeatures(features);
    setImageDimension({
      height,
      width,
    });

    return image_hash;
  };

  /*
    Name: navigateToCanvas
    Description: This calls the proceeImage and once done, navigates to
    the canvas page
  */
  const navigateToCanvas = async () => {
    if (imageObj) {
      setIsLoading(true);
      try {
        const imageHash = await processImage();
        setIsLoading(false);
        history.push(`/tagging/ocr-extraction/${imageHash}${defaultConfig ? `?config_name=${defaultConfig}`:''}`);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    (async () => await navigateToCanvas())();
  }, [imageObj]);

  return (
    <Provider
      value={{
        apiUrl: OCR_DASH_API_URL,
        imageDimensions,
        imageFeatures,
        isLoading,
        isNotifierVisibile,
        notifierMeta,
        setImageDimension,
        setImageFeatures,
        setImageObj,
        setNotifierMeta,
        setIsNotifierVisible,
        setIsLoading,
        setDefaultConfig,
      }}
    >
      {children}
    </Provider>
  );
};

export { OcrExtractionContainer, OcrExtractionContext, OcrExtractionConsumer };
