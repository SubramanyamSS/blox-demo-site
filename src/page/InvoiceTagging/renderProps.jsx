import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Icon, Modal, Placeholder } from "semantic-ui-react";
import { Mask } from "../../component";
import { isValidHttpUrl } from "../../common";
import Tooltip from "../OcrExtraction/components/tootip";

import {
  InputFieldsWrapper,
  ResultBlocksWrapper,
  TableWrapper,
  BreadcrumbWrapper,
  ResultTabWrapper,
  TextareaWrapper,
  FileUploadWrapper,
  ResultsHeading,
  ResultImageWrapper,
  ResultsWrapper,
  Divider,
  ResponseWrapper,
  InnerTabWrapper,
  LoadingWrapper,
  ErrorWrapper,
  AlertEl,
  PlaceholderWrapper,
  ButtonWrapper,
  OCRButton,
  ViewPdfButton,
  ModalSubHeading
} from "./styled";

const RenderBreadcumbs = (props) => {
  const { data } = props;
  return (
    <BreadcrumbWrapper>
      <div>
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/invoices">Invoices</Link>
        <span className="separator">/</span>
        {data.showInTaggingHomePage ? (
          <>
            <Link to={`/invoices/${data.type}`}>{data.heading}</Link>
            <span className="separator">/</span>
          </>
        ) : (
          <>
            <Link to={`/invoices/invoice-tagging`}>{data.heading}</Link>
            <span className="separator">/</span>
          </>
        )}
        <span>Result</span>
      </div>
    </BreadcrumbWrapper>
  );
};

const InputFields = ({ updatePostData }) => {
  const [imgUrl, setImgUrl] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let postDataObject = {};
    postDataObject.image_url = imgUrl;
    setImgUrl("");
    updatePostData(postDataObject);
  };

  return (
    <InputFieldsWrapper onSubmit={handleFormSubmit}>
      <div>
        <label>Image URL</label>
        <input
          placeholder="Add URL"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
      </div>
      <div>
        <div className="button__wrapper">
          <button disabled={imgUrl == ""}>Extract</button>
        </div>
      </div>
    </InputFieldsWrapper>
  );
};

const Textarea = () => {
  const handleSubmit = () => {
    // handleSubmits(inputRef.current.value);
  };
  return (
    <TextareaWrapper>
      <textarea placeholder="Paste body of text" />
      <button onClick={handleSubmit}>Extract</button>
    </TextareaWrapper>
  );
};

const FileUpload = () => {
  return (
    <FileUploadWrapper>
      <input id="file-upload" type="file" placeholder="Paste body of text" disabled />
    </FileUploadWrapper>
  );
};

const RenderInputFields = ({ activeCategoryData, updatePostData, loading }) => {
  const renderFields = () => {
    switch (activeCategoryData.input_type) {
      case "search":
        return <InputFields updatePostData={updatePostData} />;
      case "file_upload":
        return <FileUpload />;
      case "textarea":
        return <Textarea />;
      default:
        return <InputFields updatePostData={updatePostData} />;
    }
  };
  return (
    <>
      {loading ? (
        <LoadingWrapper>
          <Mask />
        </LoadingWrapper>
      ) : null}
      {renderFields()}
    </>
  );
};

const getIconStyle = (value) => {
  switch (value.toLowerCase()) {
    case 'partial':
      return 'arrow circle down'
    case 'excess':
      return 'arrow circle up'
    case 'match':
    case 'fuzzy':
      return 'check';
    case 'converted':
      return 'exchange'
    case 'no match':
      return 'close';
    default:
      return '';
  }
}

const getIconColor = (value) => {
  switch (value.toLowerCase()) {
    case 'match':
      return 'green';
      break;
    case 'no match':
      return 'red';
    case 'partial':
    case 'fuzzy':
    case 'converted':
      return 'yellow'
    case 'excess':
      return 'orange'
    default:
      return '';
      break;
  }
}

const capitalize = (s) => {
    if ( s === "po" || s === "grn") {
      return s.toUpperCase()
    }
    return s[0].toUpperCase() + s.slice(1);
}

const checkAndAppendTooltip = (value) => {
  if (value === "NA") {
    return <span>{value}&nbsp;<Tooltip content="Not available - Data not extracted as it was not present in the document"><span><Icon name="info circle" /></span></Tooltip></span>
    // return value
  }
  return value
}

const renderValues = (line_item, keyValue, value) => {
  if (value === null) {
    return '-'
  }
  switch (typeof value) {
    case 'object':
      if(Array.isArray(value)) {
        if(["invoice_number", "grn_number", "po_number", "po_matches", "grn_matches", "invoice_matches"].includes(keyValue)) {
          if(value.length) {
            return (<Tooltip content={value.join(", ")}><span>{value.length}</span></Tooltip>)
          } else {
            return <span>-</span>
          }
        }
      } else {
        return (
          <span>
            <span style={{ marginRight: '5px' }}>{value.text}</span>
            <Tooltip content={value['value']}>
              <span>
              <Icon
                name={getIconStyle(value['value'])}
                  color={getIconColor(value['value'])}
                  style={{cursor: 'pointer'}}
              />
              </span>
              </Tooltip>
          </span>
        )
      }
    default:
      let customStyle = {}
      if (keyValue === "id") {
        customStyle["textTransform"] = "lowercase"
      } 
      return <span className={`${keyValue.includes('status')?`status ${getStatusClassName(line_item[keyValue])}`:''}`} style={{ ...customStyle }}>{value}</span>
  }
  // return 'sdasd'
}

const getCurrentLineItemValues = (lineItem, lineItemType, currentCategory) => {
  const LINE_ITEM_FIELD_MAPPING = {
    "invoice": {
      "po": ["idx", "description", "quantity", "rate", "uom", "item_id", "po_status", "po_number"],
      "grn": ["idx", "description", "quantity", "rate", "uom", "item_id", "grn_status", "grn_number"]
    },
    "po": {
      "invoice": ["idx", "description", "quantity", "rate", "uom", "item_id", "invoice_status", "invoice_number"],
      "grn": ["idx", "description", "quantity", "rate", "uom", "item_id", "grn_status", "grn_number"]
    },
    "grn": {
      "invoice": ["idx", "description", "quantity", "rate", "uom", "item_id", "invoice_status", "invoice_number"],
      "po": ["idx", "description", "quantity", "rate", "uom", "item_id", "po_status", "po_number"],
    }
  }

  const currentLineItemValues = Object.keys(lineItem).reduce((acc, key) => {
    if( LINE_ITEM_FIELD_MAPPING[currentCategory][lineItemType].includes(key)) {
      acc[key] = lineItem[key]
    }
    return acc
  }, {})

  return currentLineItemValues
}

const getStatusClassName = (value) => {
  switch (value.toLowerCase()) {
    case 'full': 
      return 'success'
    case 'partial':
      return 'partial'
    case 'escalation':
      return 'exception'
    case 'failed':
      return 'failure'
    case 'probable':
      return 'probable'
  }
}

const Table = ({ data, tagsToHide, tagCategory, setModalState, setModalContent, setModalHeader, setCurrentLineItem, setCurrentLineItemType, activeCategory }) => {
  const keys = Object.keys(data);
  const filterTheTags = (a) => {
    if (!a.includes('lineitem')) {
      return a;
    }
  };
  let keysToShow = [];
  if (data.length) {
    keysToShow = Object.keys(data[0]);
    keysToShow = keysToShow.filter(filterTheTags);
  }
  return (
    <>
      {data.length > 1 || tagCategory.includes('line_items') ? < TableWrapper >
        <thead>
          <tr>
            {keysToShow.map((value) => (
            
              <th>{renderTagCategory(value)}</th>
            ))}
        </tr>
        </thead>
        <tbody>
          {
            data.map(line_item => (
              <tr>
                {
                  keysToShow.map((value) => {
                    let enableOnClick = false;
                    let modalValue = [];
                    if ((value.includes('number') && line_item[value.split('_')[0] + '_lineitem'] && line_item[value]) || (value.includes('matches'))) {
                      if (setCurrentLineItem) {
                        enableOnClick = true;
                      }
                      modalValue = line_item[value.split('_')[0] + '_lineitem'];
                    }
                    return (
                      <td
                        className={`font-light ${enableOnClick ? 'clickable' : ''}`}
                        onClick={() => {
                          if (enableOnClick) {
                            setModalState(true);
                            setModalHeader((activeCategory?.version ? activeCategory?.version == "v1" : true) ? renderTagCategory(value).toUpperCase() +' '+ line_item[value] : `Matching ${capitalize(renderTagCategory(value).split(" ")[0])}`)
                            setModalContent(modalValue);
                            
                            if(activeCategory?.version ? activeCategory?.version == "v2" : false) {
                              setCurrentLineItem([{
                                ...getCurrentLineItemValues(line_item, renderTagCategory(value).split(" ")[0], activeCategory.heading.toLowerCase())
                              }])
                              setCurrentLineItemType(renderTagCategory(value))
                            }
                          }
                        }}
                      >{renderValues(line_item,value,line_item[value])}</td>
                    )
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </TableWrapper>: <TableWrapper>
        <thead>
          <tr>
            <th>Fields</th>
            <th>Value</th>
          
          </tr>
        </thead>
        <tbody>
          {keys
            // .filter(removeEmptyKeys)
            // .filter(filterTheTags)
            // .sort(sortByHigherConfidence)
            .map((key, index) => (
              <tr key={index}>
                <td>{renderTagCategory(key)}</td>
                <td>{checkAndAppendTooltip(data[key])}</td>
              </tr>
            ))}
        </tbody>
      </TableWrapper>}
    </>
  );
};

const renderTagCategory = (tagCategory) => {
  return tagCategory.replaceAll('_',' ')
};

const RenderTables = ({ data, tagType, tagsToHide, setModalState, setModalContent, setModalHeader, setCurrentLineItem, setCurrentLineItemType, activeCategory }) => {
  const panes = [];
  if (data && Object.keys(data).length > 0) {
    Object.keys(data).map((tagCategory) => {
      const dataObject = {};
      dataObject.menuItem = renderTagCategory(tagCategory);
      dataObject.render = () => (
        <Tab.Pane attached={false}>
          {data[tagCategory] ? <Table data={data[tagCategory]} tagsToHide={tagsToHide} tagCategory={tagCategory} setModalState={setModalState} setModalContent={setModalContent} setModalHeader={setModalHeader} setCurrentLineItem={setCurrentLineItem} setCurrentLineItemType={setCurrentLineItemType} activeCategory={activeCategory} /> : (<ErrorWrapper>
            <Icon name="exclamation circle" size="huge" />
            <span>Not able to load data</span>
          </ErrorWrapper>)}
        </Tab.Pane>
      );
      if (tagCategory != 'meta') {
        
        panes.push(dataObject);
      }
    });
  }
  return (
    <InnerTabWrapper>
      <Tab panes={panes} />
    </InnerTabWrapper>
  );
};

const ResultBlocks = (props) => {
  const { result, category, tagType, lastBlock, activeCategory } = props;
  const [buttonIcon, setButtonIcon] = useState("copy");
  const [modalState, setModalState] = useState(false);
  const [modalHeader, setModalHeader] = useState();
  const [modalContent, setModalContent] = useState();

  const [currentLineItem, setCurrentLineItem] = useState()
  const [currentLineItemType, setCurrentLineItemType] = useState("")


  const handleClick = (content) => {
    navigator.clipboard.writeText(content);
    setButtonIcon("check");
    setTimeout(() => {
      setButtonIcon("copy");
    }, 3000);
  };

  const tags = result.data;
  const tagsToHide = activeCategory?.tagsToHide || [];
  const apiResponse = result;
  let panes = [];
  switch (category) {
    case "grn-tagging":
    case "po-tagging":
    case 'invoice-tagging':
      panes = [
        {
          menuItem: `${activeCategory.heading} Attributes`,
          render: () => (
            <Tab.Pane attached={false}>
              {Object.keys(tags).length > 0 ? (
                <RenderTables
                  data={tags}
                  tagType={tagType}
                  tagsToHide={tagsToHide}
                  setModalState={setModalState}
                  setModalContent={setModalContent}
                  setModalHeader={setModalHeader}
                  setCurrentLineItem={setCurrentLineItem}
                  setCurrentLineItemType={setCurrentLineItemType}
                  activeCategory={activeCategory}
                />
              ) : (
                <Table data={tags[0][tagType]} tagsToHide={tagsToHide} />
              )}
            </Tab.Pane>
          ),
        },
        {
          menuItem: "API Response",
          render: () => (
            <Tab.Pane attached={false}>
              <ResponseWrapper>
                <textarea
                  readOnly
                  rows={
                    JSON.stringify(apiResponse, null, "\n").match(/([\s]+)/g)
                      .length / 2
                  }
                  value={JSON.stringify(apiResponse, null, 2)}
                />
                <button
                  onClick={() =>
                    handleClick(JSON.stringify(apiResponse, null, 2))
                  }
                >
                  <Icon name={buttonIcon} />
                </button>
              </ResponseWrapper>
            </Tab.Pane>
          ),
        },
        // {
        //   menuItem: 'Taxonomy',
        //   render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
        // },
      ];
      break;

    case "document_processing":
      panes = [
        {
          menuItem: "Recognized text",
          render: () => (
            <Tab.Pane attached={false}>
              <ResponseWrapper>
                <textarea
                  readOnly
                  rows={tags[0].line_data.length}
                  value={tags[0].text}
                />
                <button onClick={() => handleClick(tags[0].text)}>
                  <Icon name={buttonIcon} />
                </button>
              </ResponseWrapper>
            </Tab.Pane>
          ),
        },
        {
          menuItem: "API Response",
          render: () => (
            <Tab.Pane attached={false}>
              <ResponseWrapper>
                <textarea
                  readOnly
                  rows={
                    JSON.stringify(apiResponse, null, "\n").match(/([\s]+)/g)
                      .length / 2
                  }
                  value={JSON.stringify(apiResponse, null, 2)}
                />
                <button
                  onClick={() =>
                    handleClick(JSON.stringify(apiResponse, null, 2))
                  }
                >
                  <Icon name={buttonIcon} />
                </button>
              </ResponseWrapper>
            </Tab.Pane>
          ),
        },
      ];
      break;
    default:
      break;
  }

  const lastBlockElem = useRef();

  useEffect(() => {
    if (lastBlock) {
      const options = {
        left: 0,
        behavior: "smooth",
      };
      const findPosition = (obj) => {
        var currenttop = 0;
        if (obj.offsetParent) {
          do {
            currenttop += obj.offsetTop - 60;
          } while ((obj = obj.offsetParent));
          return [currenttop];
        }
      };
      options.top = findPosition(lastBlockElem.current);
      // window.scroll(options);
    }
  }, [lastBlockElem]);

  return (
    <ResultBlocksWrapper ref={lastBlockElem}>
      {result.data.meta ? (
        <ResultImageWrapper>
          {/* <img src={result.image_url} /> */}
          {isValidHttpUrl(result.data.meta) ? (
            <div>
              <iframe
                title="PDF"
                src={result.data.meta + "#toolbar=0"}
                frameborder="0"
              ></iframe>
              <ButtonWrapper>
                <OCRButton
                  to={`/tagging/ocr-extraction?image_url=${encodeURI(
                    result.data.meta
                  )}${
                    activeCategory.ocrConfigName
                      ? `&config_name=${activeCategory.ocrConfigName}`
                      : ""
                  }`}
                  target="_blank"
                >
                  Open in OCR Dashboard
                </OCRButton>
                <ViewPdfButton
                  to={{ pathname: result.data.meta }}
                  target="_blank"
                >
                  View PDF
                </ViewPdfButton>
              </ButtonWrapper>
            </div>
          ) : (
            <PlaceholderWrapper>
              <div className="heading">
                {activeCategory.heading + " Number"}
              </div>
              <div>{result.data.meta}</div>
            </PlaceholderWrapper>
          )}
        </ResultImageWrapper>
      ) : null}
      <ResultTabWrapper>
        {result.responseSuccess || result.responseSuccess == undefined ? (
          <Tab menu={{ secondary: true }} panes={panes} />
        ) : (
          <ErrorWrapper>
            <Icon name="exclamation circle" size="huge" />
            <span>Not able to load data</span>
          </ErrorWrapper>
        )}
      </ResultTabWrapper>
      <Modal
        onClose={() => {
          setModalState(false);
          if (activeCategory?.version ? activeCategory?.version === "v2": false) {
            setCurrentLineItem([]);
          }
        }}
        onOpen={() => setModalState(true)}
        open={modalState}
        size={"large"}
      >
        <Modal.Header>
          {
            (activeCategory?.version ? activeCategory?.version == "v2": false) ? (
              modalHeader === "Matching Invoice"
            ? `${modalHeader}s`
            : `${modalHeader}'s`
             ) : (
              modalHeader
             )
            }
        </Modal.Header>
        <Modal.Content>
          {/* conditional */}
          {/* TODO: Optimize this */}
          {(activeCategory?.version ? activeCategory?.version == "v2" &&  Array.isArray(modalContent) : false) && (
            <>
              <ModalSubHeading>{`${activeCategory.heading} Line item`}</ModalSubHeading>
              <br />
              {currentLineItem && (
                <Table data={currentLineItem} tagCategory={"line_items"} />
              )}
              <br />
              <ModalSubHeading>
                {modalHeader &&
                  `${capitalize(modalHeader.split(" ")[1])} Line items`}
              </ModalSubHeading>
              <br />
            </>
          )}
          {/* conditional */}
          {modalContent ? (
            // TODO: Change this to version based
            (Array.isArray(modalContent) ? (
              <Table data={modalContent} tagCategory={"line_items"} />
            ) : (
              Object.keys(modalContent).map((key) => (
                <>
                  <ModalSubHeading>{`${capitalize(key.split("_")[0])} Line item`}</ModalSubHeading>
                  <Table data={modalContent[key]} tagCategory={"line_items"} />
                  <br />
                </>
              ))
            )) 
          ) : null}
        </Modal.Content>
      </Modal>
    </ResultBlocksWrapper>
  );
};

const RenderResults = (props) => {
  const { result, category, tagType, activeCategory } = props;
  const [results, updateResults] = useState({
    value: [],
    setValue: (oldValue, newValue) => {
      updateResults({ ...oldValue, value: [...oldValue.value, newValue] });
    },
  });
  const [alertState, updateAlertState] = useState(false);
  useEffect(() => {
    if (result.message && result.status) {
      updateAlertState(true);
      setTimeout(() => {
        updateAlertState(false);
      }, 2000);
    }
    if (Object.keys(result).length) {
      results.setValue(results, result);
    }
  }, [result]);
  return (
    <>
      <AlertEl isActive={alertState} type={result.status}>
        {result.message}
      </AlertEl>
      {results.value.length > 0 ? (
        <div>
          <Divider />
          <ResultsWrapper>
            <ResultsHeading>Results</ResultsHeading>
            {results.value.map((result, index) => (
              <ResultBlocks
                result={result}
                key={index}
                category={category}
                tagType={tagType}
                lastBlock={index === results.value.length - 1}
                activeCategory={activeCategory}
              />
            ))}
          </ResultsWrapper>
        </div>
      ) : null}
    </>
  );
};

export { RenderBreadcumbs, RenderInputFields, RenderResults };
