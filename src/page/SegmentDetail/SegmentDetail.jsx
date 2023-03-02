import React, { useState, Fragment } from 'react';
import $ from 'jquery';
import {
  Main,
  Tabs,
  BLink,
  Config,
  Detail,
  Content,
  Wrapper,
  Segment,
  Results,
  Preview,
  Container,
  SliderContainer
} from './styled';
import {
  Grid,
  ConfigModal,
  ImageSlider,
  HierarchyGraph
} from './renderProps';
import { SegmentsConsumer, SegmentsContainer } from "../../container";
import { Button, Form, Breadcrumb, Divider, Image, Tab, Dimmer, Loader, Icon } from 'semantic-ui-react';

const SegmentDetail = props => {
  const segmentName = decodeURIComponent(props.match.params.segmentName);
  const [state, updateState] = useState({
    getTag: '',
    putTag: '',
    apiKey: '',
    records: [],
    formData: {
      url: '',
      title: '',
      description: ''
    },
    treeData: {},
    showGraph: false,
    showConfig: false,
    showLoader: false,
    selectedImage: {},
    correlationKey: '',
    currentSelection: 0
  });

  const extractEndPoints = data => {
    updateState({
      ...state,
      getTag: data.getTag || '',
      putTag: data.putTag || '',
      apiKey: data.apiKey || '',
      correlationKey: data.correlationKey || ''
    });
  };

  const onChangeField = evt => {
    const { formData } = state;
    const { id, value } = evt.target;
    formData[id] = value;
    updateState({ ...state, formData });
  };

  const handleForm = evt => {
    evt.preventDefault();
    const { formData } = state;
    if (formData.url) {
      selectImage(formData);
    }
  };

  const handleFashionResponse = tagDataArr => {
    const tagMapData = {};
    const exclude = ['Base Color', 'Color'];
    const treeData = {name: 'category', id: Math.random(), parent: null, children: []};
    if (tagDataArr && tagDataArr.length) {
      tagDataArr.forEach(tagObj => {
        const tagKey = tagObj && tagObj.productType && tagObj.productType[0] ? tagObj.productType[0] : '';
        if (tagKey && tagObj && tagObj.tags && Object.keys(tagObj.tags).length) {
          let new_tag_obj = {};
          const childrens = [];
          for (let each_prop in tagObj.tags) {
            const temp = [];
            const _temp = {name: each_prop, parent: tagKey, children: [], id: Math.random()};
            tagObj.tags[each_prop].forEach(obj => {
              _temp.children.push({name: obj[0], parent: each_prop, id: Math.random()});
              temp.push({value: obj[0], confidence: obj[1]});
            });
            childrens.push(_temp);
            new_tag_obj[each_prop] = {list: temp, show: exclude.indexOf(each_prop) === -1};
          }
          new_tag_obj['Category'] = {show: true, list: [{value: tagKey, confidence: 1}]};
          tagMapData[tagKey] = new_tag_obj;
          treeData.children.push({ name: tagKey, id: Math.random(), parent: 'category', children: childrens });
        }
      });
    }
    return { tagMapData, treeData };
  };

  const handleFashion = imageUrl => {
    const { getTag, apiKey, correlationKey } = state;
    toggleLoader(true);
    fetch(
      getTag,
      {
        method: 'POST',
        body: JSON.stringify({
          image_type: 1,
          client_id: null,
          image: imageUrl,
          api_key: apiKey,
          image_url: imageUrl,
          correlation_key: correlationKey
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(data => data.json())
    .then(response => {
      toggleLoader(false);
      if (response.status && response.status.toLowerCase() !== 'success') {
        console.error(`Error in getting tag detail. Error: ${response.message}`);
      } else {
        const { records, selectedImage } = state;
        const { tagMapData, treeData } = handleFashionResponse(response.data);
        records.push({
          treeData,
          imgResponse: tagMapData,
          rawResponse: response,
          selectedImage
        });
        state.formData = {
          url: '',
          title: '',
          description: ''
        };
        updateState({ ...state, records });
        $('#content').animate({ scrollTop: document.getElementById('content').scrollHeight }, 1000);
      }
    }).catch(err => {
      toggleLoader(false);
      console.log(err);
    });
  };

  const handleRequest = imageUrl => {
    switch(segmentName.toLowerCase()) {
      case 'fashion':
        handleFashion(imageUrl);
        break;
      case 'grocery':
      case 'home/furniture':
        console.log('No implementation');
        break;
      case 'image moderation/image guidelines':
        handleImageGuideline(imageUrl);
        break;
      default:
        console.info('No matching segments');
    }
  };

  const selectImage = image => {
    state.selectedImage = image;
    updateState({ ...state });
    handleRequest(image.url);
  };

  const toggleLoader = showOrHide => updateState({ ...state, showLoader: showOrHide });

  /**
   * { function_description }
   *
   * @param      {<type>}  image   The image
   * @return     {<type>}  { description_of_the_return_value }
   */
  const handleImageDetail = image => {
    const _tags = {};
    const treeData = {name: 'category', id: Math.random(), parent: null, children: []};
    const { data } = image.output[0];
    if (data && data.length > 0) {
      const { msd_meta_tags } = data[0];
      if (msd_meta_tags) {
        const childrens = [];
        Object.keys(msd_meta_tags).forEach(tag => {
          const _temp = {name: tag, parent: 'category', children: [], id: Math.random()};
          msd_meta_tags[tag].forEach(obj => {
            _temp.children.push({name: obj.value, parent: tag, id: Math.random()});
          });
          _tags[tag] = {show: true, list: msd_meta_tags[tag]};
          childrens.push(_temp);
        });
        treeData.children = childrens;
      }
    }
    return { tagMapData: _tags, treeData };
  };

  /**
   * Gets the image detail.
   *
   * @param      {<type>}  apiEndPoint  The api end point
   * @param      {<type>}  api_key      The api key
   * @param      {<type>}  mad_id       The mad identifier
   */
  const getImageDetail = mad_id => {
    const { getTag, apiKey } = state;
    fetch(
      getTag,
      {
        method: 'POST',
        body: JSON.stringify({
          mad_id,
          api_key: apiKey
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(data => data.json())
    .then(response => {
      toggleLoader(false);
      if (response.status && response.status.toLowerCase() !== 'success') {
        console.error(`Error in getting tag detail. Error: ${response.message}`);
      } else {
        const { records, selectedImage } = state;
        const { tagMapData, treeData } = handleImageDetail(response);
        records.push({
          imgResponse: {category: tagMapData},
          treeData,
          rawResponse: response,
          selectedImage
        });
        state.formData = {
          url: '',
          title: '',
          description: ''
        };
        updateState({ ...state, records });
        $('#content').animate({ scrollTop: document.getElementById('content').scrollHeight }, 1000);
      }
    }).catch(err => {
      toggleLoader(false);
      console.log(err);
    });
  };

  /**
   * Gets the mad identifier.
   *
   * @param      {<type>}  apiEndPoint  The api end point
   * @param      {<type>}  api_key      The api key
   * @param      {<type>}  url          The url
   */
  const getMADId = imageUrl => {
    const { putTag, apiKey, correlationKey } = state;
    fetch(
      putTag,
      {
        method: 'POST',
        body: JSON.stringify({
          api_key: apiKey,
          image_url: imageUrl,
          correlation_key: correlationKey
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(data => data.json())
    .then(response => {
      if (response.status && response.status.toLowerCase() !== 'success') {
        toggleLoader(false);
        console.error(`Error in getting MAD-Id. Error: ${response.message}`);
      } else {
        getImageDetail(response.mad_id);
      }
    })
    .catch(err => {
      console.log(err);
      toggleLoader(false);
    });
  };

  /**
   * Fetches a data.
   *
   * @param      {<type>}  imageUrl  The image url
   */
  const handleImageGuideline = imageUrl => {
    if (imageUrl) {
      let apiKey = '37b97a3f29d5a173a60e45a4e0411d9dc341f49d';
      let endPoint = 'https://vuetag.madstreetden.com/mercadolibre/api/v1/';
      // Basic image URL check
      if (imageUrl.startsWith('https') || imageUrl.startsWith('http')) {
        toggleLoader(true);
        getMADId(imageUrl);
      }
    }
  };

  const constructTables = categories => {
    const resultArray = [];
    Object.keys(categories).forEach(category => (
      resultArray.push({
        menuItem: category,
        render: () => (<Grid imgResponse={categories[category]} />)
      })
    ));
    return resultArray;
  };

  const listenTabChange = (evt, data) => {
    const { selectedImage, imgResponse } = state;
    if (segmentName.toLowerCase() === 'fashion') {
      const categories = Object.keys(imgResponse);
      const title = imgResponse[categories[data.activeIndex]].Title;
      if (title && title.list && title.list.length > 0) {
        selectedImage.title = imgResponse[categories[data.activeIndex]].Title.list[0].value;
      } else {
        selectedImage.title = '';
      }
      const description = imgResponse[categories[data.activeIndex]].Description;
      if (description && description.list && description.list.length > 0) {
        selectedImage.description = imgResponse[categories[data.activeIndex]].Description.list[0].value;
      } else {
        selectedImage.description = '';
      }
    } else {
      selectedImage.title = '';
      selectedImage.description = '';
    }
    updateState({ ...state, selectedImage });
  };

  const closeGraph = () => updateState({ ...state, showGraph: false });

  const showGraph = currentSelection => {
    state.showGraph = true;
    state.currentSelection = currentSelection;
    updateState({ ...state });
  };

  const showConfig = () => updateState({ ...state, showConfig: true });

  const closeConfig = () => updateState({ ...state, showConfig: false });

  const saveConfig = data => {
    updateState({
      ...state,
      showConfig: false,
      getTag: data.getTag || '',
      putTag: data.putTag || '',
      apiKey: data.apiKey || ''
    });
  };

  const getPanes = (data, index) => {
    const { imgResponse, rawResponse } = data;
    return (
      [
        {
          menuItem: 'Attributes',
          render: () => {
            return (
              <Tab.Pane>
                {segmentName.toLowerCase() === 'fashion' ?
                  <Tab panes={constructTables(imgResponse)} /> :
                  <Grid imgResponse={imgResponse.category} />
                }
              </Tab.Pane>
            );
          }
        },
        {
          menuItem: 'API response',
          render: () => <Tab.Pane><pre>{JSON.stringify(rawResponse, null, 2)}</pre></Tab.Pane>
        },
        {
          menuItem: 'Taxonomy',
          render: () => <Tab.Pane><Button onClick={() => showGraph(index)}>Show graph</Button></Tab.Pane>
        }
      ]
    );
  };

  return (
    <SegmentsContainer>
      <SegmentsConsumer>
        {context => {
          const list = context.data[segmentName.toLowerCase()].list || [];
          if (!state.getTag || !state.apiKey) {
            extractEndPoints(context.data[segmentName.toLowerCase()]);
          }
          return (
            <Main>
              <Container>
                <Wrapper>
                  <Content id="content">
                    <Detail>
                      <Segment>
                        <BLink>
                          <Breadcrumb className="font-18">
                            <Breadcrumb.Section
                              link
                              onClick={() => props.history.push('/tagging_v2')}
                            >
                              Segments
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section active>{segmentName}</Breadcrumb.Section>
                          </Breadcrumb>
                        </BLink>
                        <Config>
                          <Icon name='setting' title="API configuration" circular inverted onClick={showConfig} />
                        </Config>
                      </Segment>
                      <SliderContainer>
                        <p className="font-16">
                          Click on one of the images from the library below to see tagged results
                        </p>
                        <ImageSlider slidesToShow={6} images={list} selectImage={selectImage} />
                      </SliderContainer>
                      <div className="form">
                        <p className="font-16">
                          Or, paste image URL here
                        </p>
                        <Form unstackable widths='equal' onSubmit={handleForm}>
                          <Form.Field width='7' inline>
                            <label>Image URL</label>
                            <Form.Input
                              id='url'
                              value={state.formData.url}
                              placeholder='Image URL'
                              onChange={onChangeField}
                            />
                          </Form.Field>
                          <Form.Field width='7' inline>
                            <label>Product Title</label>
                            <Form.Input
                              id='title'
                              value={state.formData.title}
                              placeholder='Product Title'
                              onChange={onChangeField}
                            />
                          </Form.Field>
                          <Form.Field width='7' inline>
                            <label>Product Description</label>
                            <Form.TextArea
                              id='description'
                              value={state.formData.description}
                              onChange={onChangeField}
                              placeholder='Product Description'
                            />
                          </Form.Field>
                          <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                      </div>
                      {state.records.map((obj, index) => (
                        <Fragment key={index}>
                          <Divider />
                          <Results>
                            <Preview>
                              <Image
                                rounded
                                size='medium'
                                src={obj.selectedImage.url}
                                alt='https://vuex.vue.ai/assets/icons/illustration_login.svg'
                              />
                              {obj.selectedImage.title &&
                                <h3>{`Title: ${obj.selectedImage.title || ''}`}</h3>
                              }
                              {obj.selectedImage.description &&
                                <p>{`Description: ${obj.selectedImage.description || ''}`}</p>
                              }
                            </Preview>
                            <Tabs>
                              <Tab panes={getPanes(obj, index)} />
                            </Tabs>
                          </Results>
                        </Fragment>
                      ))}
                    </Detail>
                  </Content>
                </Wrapper>
              </Container>
              <Dimmer
                page
                active={state.showLoader}
              >
                <Loader>Loading</Loader>
              </Dimmer>
              <HierarchyGraph
                showGraph={state.showGraph}
                closeGraph={closeGraph}
                treeData={state.records[state.currentSelection] && state.records[state.currentSelection].treeData || {}}
              />
              {state.showConfig &&
                <ConfigModal
                  showConfig={state.showConfig}
                  saveConfig={saveConfig}
                  closeConfig={closeConfig}
                  segment={segmentName.toLowerCase()}
                  data={{ getTag: state.getTag, apiKey: state.apiKey, putTag: state.putTag }}
                />
              }
            </Main>
          );
        }}
      </SegmentsConsumer>
    </SegmentsContainer>
  );
};

export { SegmentDetail };
