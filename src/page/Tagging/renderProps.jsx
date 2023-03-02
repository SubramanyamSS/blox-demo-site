import React, { useState, useRef, useEffect } from "react";

import {
  SegmentsContainer,
  SegmentsConsumer,
  DetailsContainer,
  ConfigConsumer,
} from "../../container";

import { Icon } from "semantic-ui-react";
import ReactPlayer from "react-player";

import { Input, CardBlock } from "../../component";
import {
  UseCaseWrapper,
  UseCaseContent,
  SearchBoxWrapper,
  TextareaWrapper,
  FileUploadWrapper,
  CatalogWrapper,
  CatalogContentWrapper,
  ContentBoxWrapper,
  ContentPopup,
  InputFieldsWrapper,
} from "./styled";

const UseCase = (props) => {
  const {
    data,
    useCaseData,
    triggerUI,
    updateCard,
    selected,
    activeTaggingCategoryData,
    updateActiveTaggingCategoryData,
  } = props;
  const iconName = "Cart";
  return (
    <UseCaseContent
      onClick={() => {
        if (useCaseData.externalLink) {
          window.open(useCaseData.externalLink);
        } else {
          window.open(
            `/tagging/${props.data[useCaseData.id - 1].type}`,
            "_self"
          );
          // window.open(`/${props.activeTaggingCategoryData.type}`);
          // selected = useCaseData.id;
          // updateActiveTaggingCategoryData(useCaseData.id);
          // triggerUI(Math.random());
          // updateCard(useCaseData.id);
          // updateActiveTaggingCategoryData(data[useCaseData.id - 1]);
        }
      }}
      className={useCaseData.id === selected || useCaseData.id === activeTaggingCategoryData?.parentId ? "highlight" : ""}
    >
      <h3 style={{ color: useCaseData.id === selected || useCaseData.id === activeTaggingCategoryData?.parentId ? "#2962ff" : "" }}>
        {useCaseData.heading}
      </h3>
      {Array.isArray(useCaseData.description) ? (
        <div className="description">
          {useCaseData.description.map((desc, index) =>
            desc.redirectLink ? (
              <a
                key={desc.id}
                className={`description__item ${
                  !desc.active ? "description__item_disabled" : ""
                }`}
                href={desc.redirectLink}
              >
                <div className="description__icon">
                  <img src={desc.icon} />
                </div>
                <div className="description__content">
                  <p>{desc.description}</p>
                </div>
              </a>
            ) : (
              <div
                key={desc.id}
                className={`description__item ${
                  !desc.active ? "description__item_disabled" : ""
                }`}
                href={desc.redirectLink}
              >
                <div className="description__icon">
                  <img src={desc.icon} />
                </div>
                <div className="description__content">
                  <p>{desc.description}</p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div>{useCaseData.description}</div>
      )}
    </UseCaseContent>
  );
};

const RenderUseCases = (props) => {
  const [uiState, triggerUI] = useState(1);
  const { updateActiveTaggingCategory, data } = props;
  return (
    <UseCaseWrapper>
      {data.map((useCase) =>
        useCase.showInTaggingHomePage ? (
          <UseCase
            data={data}
            key={useCase.id}
            useCaseData={useCase}
            triggerUI={triggerUI}
            updateCard={updateActiveTaggingCategory}
            selected={props.activeTaggingCategory}
            activeTaggingCategoryData={props.activeTaggingCategoryData}
            updateActiveTaggingCategoryData={
              props.updateActiveTaggingCategoryData
            }
          />
        ) : null
      )}
    </UseCaseWrapper>
  );
};

const SearchBox = ({ handleSubmits, inputFieldRef, allowOptions, options, activeTaggingCategoryData }) => {
  const handleSubmit = () => {
    if (inputValue != "") {
      if (activeTaggingCategoryData.type == 'video_tagging' || activeTaggingCategoryData.type == 'image_tagging') { 
        handleSubmits({ input_url: inputValue });
      } else {
        handleSubmits({ image_url: inputValue });
      }
    }
  };
  const [inputValue, setinputValue] = useState("");
  const onChange = (e) => {
    setinputValue(e.currentTarget.value);
  };
  const subCategoryChange = (e) => {
    window.open(e.target.value,"_self");
  }
  return (
    <SearchBoxWrapper ref={inputFieldRef} allowOptions={allowOptions}>
      {
        allowOptions ? 
          <select name="sub_category" id="sub_category" onChange={subCategoryChange}>
            {
              options.map(option => (
                <option key={option.id} value={option.url} selected={option.active}>{option.name}</option>
              ))
            }
          </select> 
          : null
      }
      <input
        type="text"
        id="TextSearch"
        autoComplete="off"
        placeholder="Paste Product URL"
        value={inputValue}
        onChange={onChange}
      />
      <button onClick={handleSubmit} disabled={inputValue === ""}>
        Extract
      </button>
    </SearchBoxWrapper>
  );
};

const InputFieldsWithTitleDesc = ({ handleSubmits, inputFieldRef }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let postDataObject = {};
    postDataObject.image_url = imgUrl;
    if (productTitle != "" || productDesc != "") {
      postDataObject.title = productTitle;
      postDataObject.description = productDesc;
    }
    setImgUrl("");
    setProductTitle("");
    setProductDesc("");
    handleSubmits(postDataObject);
    // postDataObjectExtras.category = '';
  };

  return (
    <InputFieldsWrapper onSubmit={handleFormSubmit} ref={inputFieldRef}>
      <div className="field__wrapper">
        <label>Image URL</label>
        <input
          placeholder="Add URL"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
      </div>
      <div className="field__wrapper">
        <label>Product Title</label>
        <input
          placeholder="Add Product Title"
          value={productTitle}
          onChange={(event) => setProductTitle(event.target.value)}
        />
      </div>
      <div className="field__wrapper">
        <label>Product Description</label>
        <textarea
          placeholder="Add Product Description"
          value={productDesc}
          onChange={(event) => setProductDesc(event.target.value)}
        />
      </div>
      <div className="field__wrapper">
        <div className="button__wrapper">
          <button
            disabled={imgUrl == "" && productTitle == "" && productDesc == ""}
          >
            Extract
          </button>
        </div>
      </div>
    </InputFieldsWrapper>
  );
};

const Textarea = ({ handleSubmits, inputFieldRef }) => {
  const inputRef = useRef()
  const handleSubmit = () => {
    handleSubmits({ text: inputRef.current.value });
  };
  return (
    <TextareaWrapper ref={inputFieldRef}>
      <textarea placeholder="Paste body of text" ref={inputRef}  />
      <button onClick={handleSubmit}>Extract</button>
    </TextareaWrapper>
  );
};

const FileUpload = ({ inputFieldRef }) => {
  return (
    <FileUploadWrapper ref={inputFieldRef}>
      <input id="file-upload" type="file" placeholder="Paste body of text" />
    </FileUploadWrapper>
  );
};

const RenderInputField = (props) => {
  const { data, setpostData, updateRedirect, activeTaggingCategoryData } = props;
  const inputFieldRef = useRef();
  useEffect(() => {
    const options = {
      left: 0,
      behavior: "smooth",
    };
    options.top = findPosition(inputFieldRef.current) - 100;
    window.scroll(options);
    // inputFieldRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }, [data]);

  const findPosition = (obj) => {
    var currenttop = 0;
    if (obj.offsetParent) {
      do {
        currenttop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return [currenttop];
    }
  };
  const handleSubmit = (value) => {
    // updateSearchString(value);
    setpostData(value);
    updateRedirect(true);
  };
  const renderField = () => {
    switch (data.input_type) {
      case "search":
        return (
          <SearchBox
            handleSubmits={handleSubmit}
            inputFieldRef={inputFieldRef}
            allowOptions={data.options && data.options.length > 0}
            options={data.options}
            activeTaggingCategoryData={activeTaggingCategoryData}
          />
        );
      case "input_with_title_desc":
        return <InputFieldsWithTitleDesc handleSubmits={handleSubmit} inputFieldRef={inputFieldRef} />
      case "file_upload":
        return <FileUpload inputFieldRef={inputFieldRef} />;
      case "textarea":
        return <Textarea handleSubmits={handleSubmit} inputFieldRef={inputFieldRef} />;
      default:
        return (
          <SearchBox
            handleSubmits={handleSubmit}
            inputFieldRef={inputFieldRef}
            allowOptions={data.options && data.options.length > 0}
            options={data.options}
            activeTaggingCategoryData={activeTaggingCategoryData}
          />
        );
    }
  };
  return <div>{renderField()}</div>;
};

const ContentBlock = (props) => {
  const { content, updateExpandedContent, togglePopup, customOnClick } = props;
  const contentExpand = () => {
    updateExpandedContent(content);
    togglePopup(true);
  };
  const onClickEvent = (e) => {
    e.stopPropagation();
    customOnClick();
  };
  return (
    <ContentBoxWrapper>
      <p onClick={onClickEvent}>{content}</p>
      <button onClick={contentExpand}>
        <Icon name="magnify" style={{ color: "#2862FF" }} />
      </button>
    </ContentBoxWrapper>
  );
};

const RenderCatelog = (props) => {
  const {
    data,
    updateRedirect,
    setcatelogIndex,
    setpostData,
    updateRedirectLink,
    activeTaggingCategoryData,
  } = props;
  const [currentExpandedContent, updateExpandedContent] = useState("");
  const [showPopup, togglePopup] = useState(false);
  return (
    <ConfigConsumer>
      {(configContext) => (
        <CatalogWrapper>
          <CatalogContentWrapper
            styleConfig={configContext?.config?.styleConfig}
            columnWidth={activeTaggingCategoryData?.type == 'video_tagging' ? '50%' : '25%'}
          >
            {data && data.catalog && data.catalog.map((list, key) => {
              const onClick = () => {
                if (list.redirectLink) {
                  updateRedirectLink(list.redirectLink);
                }
                if (list.response) {
                  setcatelogIndex(key + 1);
                } else {
                  let params = {};
                  if (list?.url) {
                    if (activeTaggingCategoryData.type == 'video_tagging' || activeTaggingCategoryData.type == 'image_tagging') {
                      params.input_url = list?.url;
                    } else if (activeTaggingCategoryData.type == 'text_tagging') {
                      params.text = list?.url;
                    } else {
                      params.image_url = list?.url;
                    }
                  }
                  if (list?.ocrConfigName) {
                    params.config_name = list?.ocrConfigName;
                  }
                  setpostData(params);
                }
                updateRedirect(true);
              };
              if (list.type && list.type == "text") {
                return (
                  <ContentBlock
                    key={key}
                    content={list.url}
                    updateExpandedContent={updateExpandedContent}
                    togglePopup={togglePopup}
                    customOnClick={onClick}
                  />
                );
              } else if (list.type && list.type == "video") {
                return (
                  <div onClick={onClick} style={{cursor: "pointer"}}>
                    <ReactPlayer
                      url={list.url}
                      controls={false}
                    />
                  </div>
                );
              } else {
                return (
                  <CardBlock
                    key={key}
                    showBuyButton={false}
                    showWishlistButton={false}
                    image_link={list.url}
                    title={list.title}
                    type="custom"
                    customOnClick={onClick}
                    styleConfig={configContext?.config?.styleConfig}
                  />
                );
              }
            })}
          </CatalogContentWrapper>
          <ContentPopup status={showPopup}>
            <button onClick={() => togglePopup(false)}>X</button>
            <p>{currentExpandedContent}</p>
          </ContentPopup>
        </CatalogWrapper>
      )}
    </ConfigConsumer>
  );
};

export { RenderUseCases, RenderInputField, RenderCatelog };
