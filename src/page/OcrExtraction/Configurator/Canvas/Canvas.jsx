import React, { useContext, useRef, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { ConfiguratorContext } from "../../../../container/Configurator";
import { OcrExtractionContext } from "../../../../container/OcrExtraction";
import { CanvasWrapper, BreadcrumbWrapper, CanvasControls } from "./styled";

const Canvas = () => {
  const {
    activeIndex,
    canvasHeight,
    canvasWidth,
    currentImageConfig,
    getConfiguredRects,
    getDistance,
    handleWheel,
    handleZoom,
    imageObj,
    isConfigLoaded,
    stageScale,
    scaleX,
    scaleY,
    setCanvasHeight,
    setCanvasWidth,
    setImageLoadState,
    stageX,
    stageY,
  } = useContext(ConfiguratorContext);

  const { imageDimensions } = useContext(OcrExtractionContext)

  const canvasRef = useRef();
  const stageRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasHeight(canvasRef.current.clientHeight);
      setCanvasWidth(canvasRef.current.clientWidth);

      // setCanvasHeight(1000);
      // setCanvasWidth(500);
    }
  }, [canvasRef]);

  imageObj.onload = () => {
    setImageLoadState(true);
  };

  return (
    <CanvasWrapper className="canvas" ref={canvasRef}>
      <BreadcrumbWrapper>
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/tagging">Tagging</Link>
        <span className="separator">/</span>
        <Link to="/tagging/document_processing">Document Processing</Link>
        <span className="separator">/</span>
        <Link to="/tagging/ocr-extraction">Upload image</Link>
        <span className="separator">/</span>
        <span>Configurator</span>
      </BreadcrumbWrapper>
      <Stage
        width={canvasWidth}
        height={imageDimensions.height > canvasHeight ? imageDimensions.height :  canvasHeight}
        x={stageX}
        y={stageY}
        scaleX={stageScale}
        scaleY={stageScale}
        onWheel={(e) => handleWheel(e,stageRef)}
        draggable
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={imageDimensions.width * scaleX}
            height={imageDimensions.height * scaleY}
            fillPatternImage={imageObj}
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
            fillPatternRepeat="no-repeat"
          />
          {isConfigLoaded
            ? currentImageConfig.map(({ sections }, index) => {
                return sections.map(({ coords, strokeColor = "green" }) => {
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
                        // strokeWidth={index === activeIndex ? 3 : 1}
                        strokeWidth={1 / stageScale}
                      />
                    );
                  }
                });
              })
            : getConfiguredRects()}
        </Layer>
      </Stage>
      <CanvasControls>
        <button onClick={(e) => handleZoom(e,stageRef)} data-zoom-type="minus"><Icon color='white' name='minus' /></button>
        <button onClick={(e) => handleZoom(e,stageRef)} data-zoom-type="plus"><Icon color='white' name='plus' /></button>
      </CanvasControls>
    </CanvasWrapper>
  );
};

export default Canvas;
