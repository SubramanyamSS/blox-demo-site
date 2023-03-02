import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Icon } from "semantic-ui-react";
import { Mask } from "../../component";
import { BreadcrumbLinks } from "../../component";
import { capitalize } from "../../common";
import ReactPlayer from "react-player";

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
  VideoTagsWrapper,
  ReactVideoWrapper,
  VideoTags,
  ContentBoxWrapper,
} from "./styled";

const RenderBreadcumbs = (props) => {
  const { data } = props;
  return (
    <BreadcrumbWrapper>
      <div>
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/tagging">Tagging</Link>
        <span className="separator">/</span>
        <Link to={`/tagging/${data.type}`}>{data.heading}</Link>
        <span className="separator">/</span>
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

const InputFieldsWithTitleDesc = ({ updatePostData }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let postDataObject = {};
    postDataObject.image_url = imgUrl;
    let postDataObjectExtras = {};
    if (productTitle != "" || productDesc != "") {
      postDataObjectExtras.title = productTitle;
      postDataObjectExtras.description = productDesc;
      postDataObject.extras = postDataObjectExtras;
    }
    setImgUrl("");
    setProductTitle("");
    setProductDesc("");
    updatePostData(postDataObject);
    // postDataObjectExtras.category = '';
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
        <label>Product Title</label>
        <input
          placeholder="Add Product Title"
          value={productTitle}
          onChange={(event) => setProductTitle(event.target.value)}
        />
      </div>
      <div>
        <label>Product Description</label>
        <textarea
          placeholder="Add Product Description"
          value={productDesc}
          onChange={(event) => setProductDesc(event.target.value)}
        />
      </div>
      <div>
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
      <input id="file-upload" type="file" placeholder="Paste body of text" />
    </FileUploadWrapper>
  );
};

const RenderInputFields = ({ activeCategoryData, updatePostData, loading }) => {
  const renderFields = () => {
    switch (activeCategoryData.input_type) {
      case "search":
        return <InputFields updatePostData={updatePostData} />;
      case "input_with_title_desc":
        return <InputFieldsWithTitleDesc updatePostData={updatePostData} />
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

const Table = ({ data, tagsToHide, version }) => {
  const keys = Object.keys(data);
  const sortByHigherConfidence = (a, b) => {
    if (data[a][0]?.[1] != undefined && data[b][0]?.[1] != undefined) {
      return data[b][0][1] - data[a][0][1];
    } else {
      return data[b][0]?.confidence - data[a][0]?.confidence;
    }
  };
  const removeEmptyKeys = (a) => version === "v2" ? a : data[a].length;
  const filterTheTags = (a) => {
    if (!tagsToHide.includes(a)) {
      return a;
    }
  };
  const concatTagValues = (tags,keyToGet) => {
    let value = "";
    if (tags == undefined || tags?.length == 0) {
      return '';
    }
    tags.forEach((tag,index) => {
      value += tag[keyToGet];
      if (index != tags?.length -1 && tags?.length > 1) {
        value += ', ';
      }
    });
    return value;
  }
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Fields</th>
          <th>Value</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {keys
          .filter(removeEmptyKeys)
          .filter(filterTheTags)
          .sort(sortByHigherConfidence)
          .map((key, index) => {
            let prediction = "";
            let confidence = "";
            let field = "";
            switch (version) {
              case "v1":
                prediction = data[key][0]?.[0] ? concatTagValues(data[key], 0) : concatTagValues(data[key], 'value');
                confidence = data[key][0]?.[1] ? concatTagValues(data[key], 1) : concatTagValues(data[key], 'confidence');
                field = key;
                break;
              case "v2":
                prediction = data[key][0]?.[0] ? concatTagValues(data[key], 0) : concatTagValues(data[key]?.result, 'prediction');
                confidence = data[key][0]?.[1] ? concatTagValues(data[key], 1) : concatTagValues(data[key]?.result, 'confidence');
                field = data[key]?.name ? data[key]?.name?.replace("_"," ") : key;
                break;
              default:
                prediction = data[key][0]?.[0] ? concatTagValues(data[key], 0) : concatTagValues(data[key], 'value');
                confidence = data[key][0]?.[1] ? concatTagValues(data[key], 1) : concatTagValues(data[key], 'confidence');
                field = key;
                break;
            }
            return <tr key={index}>
              <td>{field}</td>
              <td>{prediction}</td>
              <td>{confidence.split(', ').map(value => Math.round(value * 10000) / 100 + "%").join(', ')}</td>
            </tr>
          })}
      </tbody>
    </TableWrapper>
  );
};

const renderTagCategory = (tagCategory) => {
  if (tagCategory.productType) {
    return tagCategory.productType[0];
  } else if (tagCategory.category) {
    return tagCategory.category;
  } else {
    return null;
  }
};

const RenderTables = ({ data, tagType, tagsToHide, version }) => {
  const panes = [];
  if (data.length > 0) {
    data.map((tagCategory) => {
      const dataObject = {};
      dataObject.menuItem = renderTagCategory(tagCategory);
      dataObject.render = () => (
        <Tab.Pane attached={false}>
          <Table data={tagCategory[tagType]} tagsToHide={tagsToHide} version={version} />
        </Tab.Pane>
      );
      panes.push(dataObject);
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
  const [videoPlayerState, setVideoPlayerState] = useState();
  const handleClick = (content) => {
    navigator.clipboard.writeText(content);
    setButtonIcon("check");
    setTimeout(() => {
      setButtonIcon("copy");
    }, 3000);
  };
  const tags = result?.data || result?.results?.data;
  const tagsToHide = activeCategory?.tagsToHide || [];
  const apiResponse = result;
  // video tagging specific values
  const videoTags = result?.results?.tags;
  const frameBasedTags = result?.results?.frame_details;
  const videoUrl = result?.results?.url;
  let panes = [];
  switch (category) {
    case "dental":
    case "product_tagging":
    case "image_guidelines":
      panes = [
        {
          menuItem: "Product attributes",
          render: () => (
            <Tab.Pane attached={false}>
              {tags.length > 0 ? (
                <RenderTables
                  data={tags}
                  tagType={tagType}
                  tagsToHide={tagsToHide}
                  version={activeCategory?.version}
                />
              ) : (
                <Table data={tags[0][tagType]} tagsToHide={tagsToHide} version={activeCategory?.version} />
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
  
    case "furniture":
    case "car_dent":
    case "object_recognition":
    case "phone_screen":
      panes = [
        {
          menuItem: "Product attributes",
          render: () => (
            <Tab.Pane attached={false}>
              <Table data={result.output} tagsToHide={tagsToHide} version={activeCategory?.version} />
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
    case "text_tagging":
      panes = [
        {
          menuItem: "Recognized text",
          render: () => (
            <Tab.Pane attached={false}>
              <ResponseWrapper>
                <textarea
                  readOnly
                  rows={tags?.[0]?.line_data?.length || 5}
                  value={tags?.[0].text}
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
    
    case "video_tagging":
      panes = [
        {
          menuItem: "Tags",
          render: () => (
            <Tab.Pane attached={false}>
              <VideoTagsWrapper>
                {
                  videoTags.map((value, index) => (
                    <VideoTags highlight={frameBasedTags?.[videoPlayerState]?.[index]?.is_above_threshold}>{capitalize(value?.replaceAll('_', ' '))}</VideoTags>
                  ))
                }
                {/* <textarea
                  readOnly
                  rows={videoTags.length}
                  value={videoTags}
                /> */}
              </VideoTagsWrapper>
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
    case "image_tagging":
      panes = [
        {
          menuItem: "Tags",
          render: () => (
            <Tab.Pane attached={false}>
              <VideoTagsWrapper>
                {
                  videoTags.map((value, index) => (
                    <VideoTags>{capitalize(value?.tag?.replaceAll('_', ' '))}</VideoTags>
                  ))
                }
                {/* <textarea
                  readOnly
                  rows={videoTags.length}
                  value={videoTags}
                /> */}
              </VideoTagsWrapper>
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

  const handleProgress = (state) => {
    const formattedString = `0:00:${Math.round(state.playedSeconds).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
    // console.log("player state", formattedString);
    setVideoPlayerState(formattedString);
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
      window.scroll(options);
    }
  }, [lastBlockElem]);

  return (
    <ResultBlocksWrapper ref={lastBlockElem}>
      
      {
        category == 'video_tagging' ? (
          <ReactVideoWrapper>
            <ReactPlayer
              url={videoUrl}
              onProgress={handleProgress}
              controls={true}
            />
          </ReactVideoWrapper>
        ) : category == 'text_tagging' ? (
          <ContentBoxWrapper>
            <textarea readOnly rows="10">
              {result.results.text}
            </textarea>
          </ContentBoxWrapper>
        ): (
            <ResultImageWrapper>
              <img src = {result.image_url || videoUrl} />
            </ResultImageWrapper>
          )
        }
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
      {results.value.length > 0 > 0 ? (
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
