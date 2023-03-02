import React, { useState, useRef, useEffect, Fragment } from "react";

import {
  SegmentsContainer,
  SegmentsConsumer,
  DetailsContainer,
  ConfigConsumer,
} from "../../container";

import { Icon } from "semantic-ui-react";

import { Input, CardBlock } from "../../component";
import {
  AlertEl,
  UseCaseWrapper,
  UseCaseContent,
  SearchBoxWrapper,
  TextareaWrapper,
  FileUploadWrapper,
  CatalogWrapper,
  CatalogContentWrapper,
  ContentBoxWrapper,
  ContentPopup,
  IframeWrapper,
  FormInputWrapper,
  TableWrapper
} from "./styled";

const UseCase = (props) => {
  const {
    data,
    useCaseData,
    triggerUI,
    updateCard,
    selected,
    updateActiveTaggingCategoryData,
  } = props;
  const iconName = "Cart";
  return (
    <UseCaseContent
      onClick={() => {
        if (!!!useCaseData.disabled) {
          if (useCaseData.externalLink) {
            window.open(useCaseData.externalLink);
          } else {
            window.open(
              `/invoices/${props.data[useCaseData.id - 1].type}`,
              "_self"
            );
            // window.open(`/${props.activeTaggingCategoryData.type}`);
            // selected = useCaseData.id;
            // updateActiveTaggingCategoryData(useCaseData.id);
            // triggerUI(Math.random());
            // updateCard(useCaseData.id);
            // updateActiveTaggingCategoryData(data[useCaseData.id - 1]);
          }
        }
      }}
      className={`${useCaseData.id === selected ? "highlight" : ""} ${!!(useCaseData.disabled) && useCaseData.disabled != "" ? "disabled" : ""}`}
    >
      <h3 style={{ color: useCaseData.id === selected ? "#2962ff" : "", marginBottom: useCaseData.description ? '30px' : '0px' }}>
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

const SearchBox = ({ handleSubmits, inputFieldRef }) => {
  const handleSubmit = () => {
    if (inputValue != "") {
      handleSubmits({ image_url: inputValue });
    }
  };
  const [inputValue, setinputValue] = useState("");
  const onChange = (e) => {
    setinputValue(e.currentTarget.value);
  };
  return (
    <SearchBoxWrapper ref={inputFieldRef}>
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

const Textarea = ({ inputFieldRef }) => {
  const handleSubmit = () => {
    // handleSubmits(inputRef.current.value);
  };
  return (
    <TextareaWrapper ref={inputFieldRef}>
      <textarea placeholder="Paste body of text" />
      <button onClick={handleSubmit}>Extract</button>
    </TextareaWrapper>
  );
};

const handleFileUpload = async ({target}, url, setAlertState, setAlertDetails) => {
  const formData = new FormData();
  formData.append("invoice-details", target.files[0]);

  try {
    const res = await fetch(`${url}/upload`, {
      method: "POST",
      body: formData,
    })
  
    if(res.status == 200) {
      setAlertDetails({
        type: "success",
        message: "Invoice details added successfully"
      })
    } else {
      throw Error
    }
  } catch(e) {
    setAlertDetails({
      type: "FAILURE",
      message: "Failed to add invoice details"
    })
  } finally {
    target.value = null
    setAlertState(true)
    setTimeout(() => {
      setAlertState(false)
    }, 2000)
  }

}

const FileUpload = ({ inputFieldRef, catalog, setCatalogModal, getTag, version, category }) => {
  const [alertState, setAlertState] = useState(false)
  const [alertDetails, setAlertDetails] = useState({
    type: "",
    message:""
  })

  return (
    <FormInputWrapper>
      <AlertEl isActive={alertState} type={alertDetails["type"]}>
        {alertDetails["message"]}
      </AlertEl>
      <FileUploadWrapper ref={inputFieldRef}>
        <input id="file-upload" type="file" placeholder="Paste body of text" onChange={(e) => handleFileUpload(e, getTag, setAlertState, setAlertDetails)} accept=".csv" disabled={version == "v1" || category !== "invoice-tagging"}/>
      </FileUploadWrapper>
      {version == "v1" && catalog && catalog.length > 0 ? <>
        <span className="separator">or</span> 
        <button onClick={() => setCatalogModal(true)}>Select</button>
      </>:null}
    </FormInputWrapper>
  );
};

const RenderInputField = (props) => {
  const { data, setpostData, updateRedirect, setCatalogModal, category } = props;
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
          />
        );
      case "file_upload":
        return <FileUpload inputFieldRef={inputFieldRef} catalog={data.catalog} getTag={data.getTag} setCatalogModal={setCatalogModal} version={data?.version || "v1"} category={category} />;
      case "textarea":
        return <Textarea inputFieldRef={inputFieldRef} />;
      case "none":
        break;
      default:
        return (
          <SearchBox
            handleSubmits={handleSubmit}
            inputFieldRef={inputFieldRef}
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
  } = props;
  const [currentExpandedContent, updateExpandedContent] = useState("");
  const [showPopup, togglePopup] = useState(false);
  return (
    <ConfigConsumer>
      {(configContext) => (
        <CatalogWrapper>
          <CatalogContentWrapper
            styleConfig={configContext?.config?.styleConfig}
          >
            {data && data.catalog && data.catalog.map((list, key) => {
              const onClick = () => {
                if (list.redirectLink) {
                  updateRedirectLink(list.redirectLink);
                }
                if (list.response) {
                  setcatelogIndex(key + 1);
                } else {
                  setcatelogIndex(key+1);
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
              } else if (list.type && list.type == "pdf") {
                return (<IframeWrapper>
                  <div className="overlay" onClick={onClick}></div>
                  <iframe title="PDF" src={list.url+'#toolbar=0'} frameborder="0"></iframe>
                  </IframeWrapper>)
               }
              else {
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

const RenderCatalogTable = (props) => {
  const { data , setcatelogIndex, updateRedirect} = props;
  const fieldToHide = [
    'seller_address',
    'bill_to_address',
    'ship_to_address',
    'seller_name',
    'po_header_id'
  ]
  const filterTheTags = (a) => {
    if (!fieldToHide.includes(a)) {
      return a;
    }
  };
  return (
    <TableWrapper>
      <thead>
        <tr>
          {Object.keys(data[0]).filter(filterTheTags).map(value => (
            <th>{value.replaceAll('_',' ').toUpperCase()}</th>
          ))
          }
        </tr>
      </thead>
      <tbody>
        {data.map(catalog => (
          <tr onClick={() => {
            setcatelogIndex(catalog.id);
            updateRedirect(true);
          }}>
            {
              Object.keys(catalog).filter(filterTheTags).map(value => (
                <td>{catalog[value]}</td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  )
}

export { RenderUseCases, RenderInputField, RenderCatelog, RenderCatalogTable };
