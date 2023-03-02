import React, { useContext, useRef, useEffect } from "react";
import {
  FileUploadWrapper,
  ButtonWrapper,
  ImageUploadIcon,
  BreadcrumbWrapper,
} from "./styled";
import LoaderGIF from "../../../static/img/loader.svg";
import { LoaderContainer, LoaderIcon } from "../styled";
import { OcrExtractionContext } from "../../../container/OcrExtraction";
import { Link } from "react-router-dom";

const Upload = ({ image_url, config_name }) => {
  const { setImageObj, isLoading, setIsLoading, setDefaultConfig } = useContext(
    OcrExtractionContext
  );
  useEffect(() => {
    const urlToObject = async () => {
      const response = await fetch(image_url, {
        cache: "no-store",
        method: "GET",
      }).catch((err) => setIsLoading(false));
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], image_url.split("/").slice(-1), {
        type: blob.type,
      });
      setImageObj(file);
    };
    if (image_url) {
      setIsLoading(true);
      urlToObject();
    }
  }, [image_url]);
  useEffect(() => {
    setDefaultConfig(config_name);
  }, [config_name]);
  const fileUploadRef = useRef();

  return isLoading ? (
    <div>
      <LoaderContainer isfullScreen>
        <LoaderIcon src={LoaderGIF} alt="Mask Loader" />
      </LoaderContainer>
    </div>
  ) : (
    <div
      className="d-flex full-width full-height d-flex-center"
      style={{ height: "100vh" }}
    >
      <BreadcrumbWrapper>
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/tagging">Tagging</Link>
        <span className="separator">/</span>
        <Link to="/tagging/document_processing">Document Processing</Link>
        <span className="separator">/</span>
        <span>Upload image</span>
      </BreadcrumbWrapper>
      <div className="upload">
        <div
          className="form-file-upload"
          onDrop={(event) => {
            event.preventDefault();
            const { files } = event.dataTransfer;
            setImageObj(files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
        >
          <FileUploadWrapper>
            <div
              htmlFor={`file_upload`}
              className="upload-box d-flex d-flex-center flex-column full-height"
            >
              <ImageUploadIcon />
              <p className="font-head-8 text-bold mb-1">Drag and drop file</p>
              <p className="text-light font-body-1">
                (jpeg, jpg, png and pdf files)
              </p>
              <p className="text-light font-body-2">or</p>
              <ButtonWrapper
                onClick={() => {
                  fileUploadRef.current.click();
                }}
                className="ml-2"
              >
                Upload File
              </ButtonWrapper>
            </div>
            <input
              type="file"
              title=" "
              name="File Upload"
              id="file_upload"
              style={{ visibility: "hidden" }}
              label="Upload Image"
              onChange={(event) => {
                const { files } = event.target;
                setImageObj(files[0]);
              }}
              accept="image/*, .pdf"
              ref={fileUploadRef}
            />
          </FileUploadWrapper>
        </div>
      </div>
    </div>
  );
};

export default Upload;
