import React, { useState, useEffect, useRef, useContext } from "react";
import { RenderDropDown, RenderMainSection, RenderSearch } from "./renderProps";
import { VueFindWrapper, TitleEl, CategoryWrapper } from "./styled";
import {
  ConfigConsumer,
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
} from "../../container";
import { getCookie } from "../../common";
import "semantic-ui-css/semantic.min.css";

const UpdateCurrentPage = (_update_page_filter) => {
  let redirectionLink = `${window.location.pathname}?filters=`;
  let seperation = "";
  let filterValue = "";

  for (let _each_key in _update_page_filter) {
    if (_update_page_filter[_each_key].length) {
      filterValue += seperation;
      filterValue += `${_each_key}=${_update_page_filter[_each_key].join()}`;
      seperation = ";";
    }
  }
  return redirectionLink + encodeURIComponent(filterValue);
};

const mergeFilterToShow = () => {
  let config = JSON.parse(localStorage.getItem("userConfig"));
  const { vue_find } = config;
  let additionalFilterObj = {};
  if (vue_find.children.category_list.filtersToShow) {
    vue_find.children.category_list.filtersToShow.map((value) => {
      additionalFilterObj[value] = { value: [] };
    });
  }
  return additionalFilterObj;
};

const VueFind = (props) => {
  const { match, history } = props;
  let FILTER_OBJ = {
    ontology: { value: [] },
    brand: { value: [] },
    category: { value: [] },
    color: { value: [] },
    material: { value: [] },
    size: { value: [] },
    custom_product_type: { value: [] },
    ...mergeFilterToShow(),
  };
  const [filterObject, updateFilterObject] = useState(
    JSON.parse(JSON.stringify(FILTER_OBJ))
  );
  const [widgetList, updateWidgetList] = useState([]);
  const [currWidget, updateWidget] = useState({});
  const [pageLink, updatePageLink] = useState("");
  const [urlHash, updateUrlHash] = useState(0);
  const [pageNum, updatePageNum] = useState(1);
  const [initialLoad, updateInitialLoad] = useState(true);
  const [sortFilter, updateSortFilter] = useState({
    type: "custom",
    field: "relevance",
    order: "desc",
  });
  const [loading, updateLoading] = useState(false);

  const popstateListener = () => {
    updateUrlHash(Math.random());
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("popstate", popstateListener);
    return () => window.removeEventListener("popstate", popstateListener);
  }, []);

  useEffect(() => {
    if (widgetList && widgetList.length) {
      let _widget = widgetList[0];
      // if (
      //   filterValue &&
      //   filterValue != "" &&
      //   (_widget["widgetList"].includes("0_enableBundit") ||
      //     _widget["widgetList"].includes("0_disableBundit"))
      // ) {
      //   _widget.postBody = { ..._widget.postBody, ...{ filters: filterValue } };
      // } else {
      //   if (_widget.postBody.filters) {
      //     let new_widget = { ..._widget.postBody };
      //     delete new_widget.filters;
      //     _widget.postBody = { ...new_widget };
      //   }
      // }
      updateWidget(_widget);
      let new_widget_list = widgetList.slice(1);
      updateWidgetList(new_widget_list);
    }
  }, [widgetList]);

  const rendered = useRef(false);
  const currPage =
    match && match.params && match.params.category ? match.params.category : "";
  const [saleProduct, updateSaleProduct] = useState("");
  let APIData = {};
  let params = new URL(document.location).searchParams;
  let search = params.get("q");
  let initSearch = "";
  if (currPage && currPage === "search" && search && search.trim().length) {
    initSearch = search;
  } else {
    initSearch = "";
  }
  const [searchQuery, updateQuery] = useState(initSearch);
  if (searchQuery !== initSearch) {
    updateQuery(initSearch);
    let filter = params.get("filters");
    if (!filter) {
      let _filter_obj = JSON.parse(JSON.stringify(filterObject));
      for (let _each_key in _filter_obj) {
        let _each_obj = _filter_obj[_each_key];
        _each_obj["value"] = [];
        // updateFilterObject({...filterObject, _each_key:_each_obj})
      }
      updateFilterObject(_filter_obj);
    }
  }
  let page = params.get("page_num");
  if (page) {
    if (parseInt(page) !== pageNum) {
      updatePageNum(parseInt(page));
    }
  } else if (pageNum !== 1) {
    updatePageNum(parseInt(1));
  }

  const getAPIData = (config, isVueX) => {
    const { children, mad_UUID, user_id, default_url } = config;
    let API_KEY = config.API_KEY;
    let VUEX_API_KEY = config.API_KEY;

    switch (currPage) {
      case "category":
        const category_list =
          children && children.category_list ? children.category_list : {};
        const widgetPayload = category_list.widgetPayload;
        if (category_list.API_KEY) {
          API_KEY = category_list.API_KEY;
        }
        let clp_url = default_url + "/v2/widgets";
        if (category_list.endPoint && category_list.categoryList) {
          clp_url =
            (category_list.endPoint || "") + (category_list.categoryList || "");
        }
        return {
          url: clp_url,
          vueX: children.category_list.vueX,
          postBody: {
            api_key: API_KEY,
            ...(!category_list.vueX ? { widget_list: [25] } : null),
            mad_uuid: mad_UUID,
            // ...(!category_list.vueX ? {user_id: user_id} : null),
            ...(!category_list.vueX ? { facet_limit: 30 } : null),
            ...(category_list.vueX
              ? { module_name: category_list.module_name }
              : null),
            ...(category_list.vueX
              ? { platform: category_list.platform }
              : null),
            ...(category_list.vueX
              ? { facets: widgetPayload.vueX.facets }
              : {
                  facets: [
                    "category",
                    "brand",
                    "color",
                    "sub_cat",
                    "size",
                    "price",
                    "material",
                    "sub_sub_cat",
                    "sub_sub_sub_cat",
                    "gender",
                  ],
                }),
            ...(category_list.vueX
              ? { fields: widgetPayload.vueX.fields }
              : {
                  fields: [
                    "brand",
                    "title",
                    "image_link",
                    "internal_image_url",
                    "color",
                    "price",
                    "size",
                    "material",
                  ],
                }),
            ...(!category_list.vueX ? { details: true } : null),
            ...(!category_list.vueX ? { hits_per_page: 50 } : null),
            ...(!category_list.vueX ? { facet_filters: {} } : null),
            page_num: pageNum,
            order_by: sortFilter,
            is_from_demo_site: true,
            user_id: user_id,
          },
        };
      case "search":
        const text_search =
          children && children.text_search ? children.text_search : {};
        if (text_search.API_KEY) {
          API_KEY = text_search.API_KEY;
        }
        if (text_search.VUEX_API_KEY) {
          VUEX_API_KEY = text_search.VUEX_API_KEY;
        }
        let text_url = default_url + "/widgets";
        if (text_search.endPoint && text_search.categoryList) {
          text_url =
            (text_search.endPoint || "") + (text_search.categoryList || "");
        }
        if (!isVueX && text_search.vueX && text_search.widgetPayload.vueX) {
          return {
            url: text_url,
            vueX: true,
            postBody: {
              api_key: VUEX_API_KEY,
              mad_uuid: mad_UUID,
              user_id: user_id,
              search_query: searchQuery,
              page_num: pageNum,
              order_by: { ...sortFilter },
              ...text_search.widgetPayload.vueX,
            },
          };
        } else if (isVueX) {
          return {
            vueX: true,
            postBody: {
              num_results: 50,
              page_num: pageNum,
              auto_correct: true,
              search_query: searchQuery,
              module_name: text_search.widgetPayload.vueX.module_name,
              facets: text_search.widgetPayload.vueX.facets,
              user_id: user_id,
              fields: text_search.widgetPayload.vueX.fields,
              order_by: sortFilter,
              mad_uuid: mad_UUID,
              api_key: VUEX_API_KEY,
            },
            url: text_search.endPoint + "/widgets",
          };
        }
        return {
          url: text_url,
          vueX: false,
          postBody: {
            api_key: API_KEY,
            mad_uuid: mad_UUID,
            user_id: user_id,
            facet_limit: 30,
            facets: ["category", "size", "brand", "color"],
            widget_list: [42],
            details: true,
            search_query: searchQuery,
            fields: [
              "title",
              "brand",
              "category",
              "small_image_link",
              "image_link",
              "internal_image_url",
            ],
            order_by: sortFilter,
            num_results: [20],
            page_num: pageNum,
            hits_per_page: 50,
            is_from_demo_site: true,
          },
        };
      default:
        return {};
    }
  };

  const updatePage = (filter, updatedState, isMenuHeader) => {
    let query = searchQuery,
      num = pageNum;

    let _update_page_filter = {};
    for (let _each_key in filterObject) {
      _update_page_filter[_each_key] = filterObject[_each_key]["value"];
    }

    if (filter) {
      let filterValue = filter.toLowerCase();
      if (filterValue === "ontology" || filterValue === "category") {
        _update_page_filter[filterValue] = updatedState;
        if (isMenuHeader) {
          for (let _each_within_key in _update_page_filter) {
            if (filterValue != "ontology" || filterValue != "category") {
              _update_page_filter[_each_within_key] = [];
            }
          }
        }
      } else {
        _update_page_filter[filterValue] = updatedState;
      }

      if (filterValue === "page") {
        num = updatedState;
      } else if (filterValue === "search") {
        query = updatedState;
      }
    }
    let updatedPageLink = UpdateCurrentPage(_update_page_filter);
    if (query !== initSearch) {
      initSearch = query;
      num = 1;
    }
    if (filter != "page") {
      num = 1;
    }
    if (query && query.trim().length) {
      updatedPageLink += `&q=${query}`;
    }
    if (num > 1) {
      updatedPageLink += `&page_num=${num}`;
    }
    updatePageLink(updatedPageLink);
    history.push(updatedPageLink, { updated: true });
  };

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let filter = params.get("filters");
    let search = params.get("q");
    let page = params.get("page_num");
    if (parseInt(page) > 1) {
      updatePageNum(parseInt(page));
    }
    if (currPage !== "search") {
      updateQuery("");
    } else if (search && search.trim().length) {
      updateQuery(search);
    }
    if (filter) {
      let filterArr = filter.split(";");
      let _filter_obj = JSON.parse(JSON.stringify(filterObject));
      if (filterArr.length) {
        filterArr.map((filters) => {
          if (filters) {
            for (let _each_key in _filter_obj) {
              if (filters.startsWith(_each_key)) {
                let _each_obj = _filter_obj[_each_key];
                let changed_filter_val = filters.replace(_each_key + "=", "");
                _each_obj["value"] = changed_filter_val.split(/[,](?!\s)/g);
                let filterArray = _each_obj["value"];
                let parsedFilterArray = filterArray.map((el) =>
                  el.replace(/\//g, ",")
                );
                let parsedFilter = {};
                parsedFilter["value"] = parsedFilterArray;
                updateFilterObject({
                  ..._filter_obj,
                  _each_key: parsedFilter,
                });
              }
            }
          }
          return "";
        });
      } else {
        let _filter_obj = JSON.parse(JSON.stringify(filterObject));
        for (let _each_key in _filter_obj) {
          let _each_obj = _filter_obj[_each_key];
          _each_obj["value"] = [];
          updateFilterObject({
            ..._filter_obj,
            _each_key: _each_obj,
          });
        }
      }
    }
  }, [pageLink, urlHash, initialLoad]);

  return (
    <>
      <VueFindWrapper>
        <CategoryWrapper>
          {currPage === "category" ? null : null}
        </CategoryWrapper>
        <ConfigConsumer>
          {(context) => {
            const { vue_find, API_KEY, url, vue_user, discover } = context;
            const defaultFiltersToShow = [
              "ontology",
              "brand",
              "category",
              "size",
            ];
            if (vue_find.children.category_list.filtersToShow && initialLoad) {
              let additionalFilterObj = {};
              let _filter_obj = JSON.parse(JSON.stringify(filterObject));
              vue_find.children.category_list.filtersToShow.map((value) => {
                additionalFilterObj[value] = { value: [] };
              });
              updateFilterObject({ ..._filter_obj, ...additionalFilterObj });
              updateInitialLoad(false);
            }
            const filtersToShow = vue_find.children.category_list.filtersToShow
              ? vue_find.children.category_list.filtersToShow
              : defaultFiltersToShow;
            let widgetInfo = {};
            const children =
              vue_find && vue_find.children ? vue_find.children : {};
            const mad_UUID = getCookie("mad_UUID");
            let user_id = localStorage.getItem("userId");
            let default_url = url;
            if (context.client_name == "2253_yoox-poc") {
              default_url = "https://eu-robin-poc.madstreetden.com";
            }
            const isVueX = children?.text_search?.vueX || false;
            const sortOptions = vue_find.sort;
            if (!user_id) {
              user_id = context.user_id;
            }
            const config = {
              children,
              API_KEY,
              user_id,
              mad_UUID,
              default_url,
            };
            APIData = getAPIData(config, isVueX);
            if (sortFilter.field === "relevance") {
              let _API_KEY = API_KEY;
              if (vue_user.API_KEY) {
                _API_KEY = vue_user.API_KEY;
              }
              const discover_recommendation =
                discover && discover.recommendation
                  ? discover.recommendation
                  : `${url}/widgets`;
              let widget_arr = [];
              const recommendation =
                vue_user && vue_user.recommendation
                  ? vue_user.recommendation
                  : discover_recommendation;
              if (!rendered.current && _API_KEY && user_id && mad_UUID) {
                rendered.current = true;

                if (
                  context.vue_user &&
                  context.vue_user.userAffinityPage &&
                  context.vue_user.userAffinityUrl &&
                  context.vue_user.userAffinityUrl.length > 0
                ) {
                  widget_arr.push({
                    widgetList: ["user_affinity"],
                    postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}&fields=["brand", "title", "image_link", "color", "autotags_boost","price", "ext_id","ontology","price"]`,
                    recommendationUrl: context.vue_user.userAffinityUrl,
                    vueX: false,
                  });
                }
                widget_arr.push({
                  widgetList: ["absolute_affinity"],
                  postBody: JSON.stringify({
                    api_key: API_KEY,
                    mad_uuid: mad_UUID,
                    user_id: user_id,
                    ...context.vue_user?.absoluteAffinityPayload,
                  }),
                  recommendationUrl:
                    context?.vue_user?.userAbsoluteAffinityUrl ||
                    "https://robin-api-dev.madstreetden.com/dev/es/user_profile/absolute_affinity",
                  vueX: true,
                  contentType: "application/json",
                });
                updateWidgetList(widget_arr);
              }
            }
            return (
              <RecommendedPdtsContainer recommendedWidgetList={currWidget}>
                <RecommendedPdtsConsumer>
                  {(innerContext) => {
                    let ontology = "";
                    let ontologyList = [];
                    let ontologyListSeasonality = [];
                    let userAffinityData = {};
                    let currentUserAffinityData = {};
                    let positive_words = [];
                    let negative_words = [];
                    let mappingLabels = {
                      0: { name: "colour & pattern", color: "red" },
                      1: { name: "colour & shape", color: "blue" },
                      2: { name: "pattern", color: "green" },
                      3: { name: "colour", color: "orange" },
                      4: { name: "pattern & shape", color: "purple" },
                      5: { name: "shape", color: "gray" },
                    };
                    if (context.client_name == "2321_grocery-demo") {
                      mappingLabels = {
                        0: { name: "Generic & Packaging", color: "red" },
                        1: { name: "Generic & Content", color: "blue" },
                        2: { name: "Packaging", color: "green" },
                        3: { name: "Generic", color: "orange" },
                        4: { name: "Packaging & Content", color: "purple" },
                        5: { name: "Content", color: "gray" },
                      };
                    }
                    if (
                      innerContext.user_affinity ||
                      innerContext.absolute_affinity
                    ) {
                      const absolute_affinity = innerContext.absolute_affinity;
                      const seasonality_style =
                        innerContext?.user_affinity?.seasonality_style;
                      const seasonality_brand =
                        innerContext?.user_affinity?.seasonality_brand;
                      const user_profile_style =
                        innerContext?.user_affinity?.user_profile_style;
                      const user_profile_brand =
                        innerContext?.user_affinity?.user_profile_brand;
                      const price_affinity =
                        innerContext?.user_affinity?.price_affinity;

                      if (absolute_affinity) {
                        if (
                          absolute_affinity.positive ||
                          absolute_affinity.negative
                        ) {
                          let positive_absolute_affinity =
                            absolute_affinity.positive;
                          let negative_absolute_affinity =
                            absolute_affinity.negative;
                          for (let each_facet in {
                            ...positive_absolute_affinity,
                            ...negative_absolute_affinity,
                          }) {
                            let new_obj = {
                              key: each_facet,
                              value: each_facet,
                              text: each_facet,
                            };
                            if (positive_absolute_affinity) {
                              positive_words =
                                positive_absolute_affinity[each_facet];
                            }
                            if (negative_absolute_affinity) {
                              negative_words =
                                negative_absolute_affinity[each_facet];
                            }
                            ontologyList.push(new_obj);
                            let new_positive_word = [];
                            let new_negative_word = [];

                            Object.keys(positive_words).map((category) => {
                              Object.keys(positive_words[category]).map(
                                (value) => {
                                  let _obj = {
                                    text: value,
                                    value: positive_words[category][
                                      value
                                    ]?.frequency?.toFixed(2),
                                    type: category,
                                  };
                                  new_positive_word.push(_obj);
                                }
                              );
                            });
                            if (
                              negative_words &&
                              Object.keys(negative_words).length
                            ) {
                              Object.keys(negative_words).map((category) => {
                                Object.keys(negative_words[category]).map(
                                  (value) => {
                                    let _obj = {
                                      text: value,
                                      value: negative_words[category][
                                        value
                                      ]?.frequency?.toFixed(2),
                                      type: category,
                                    };
                                    new_negative_word.push(_obj);
                                  }
                                );
                              });
                            }
                            userAffinityData[each_facet] = {
                              word_cloud: new_positive_word,
                              negative_cloud: new_negative_word,
                              seasonality_style: seasonality_style,
                              seasonality_brand: seasonality_brand,
                              user_profile_style: user_profile_style,
                              user_profile_brand: user_profile_brand,
                              price_affinity: price_affinity,
                              relative_affinity:
                                innerContext?.user_affinity
                                  ?.relative_affinities[
                                  Object.keys(absolute_affinity)[each_facet]
                                ],
                            };
                          }
                        } else {
                          for (let each_facet in Object.keys(
                            absolute_affinity
                          )) {
                            ontologyList.push({
                              key: each_facet,
                              text: Object.keys(absolute_affinity)[each_facet],
                              value: Object.keys(absolute_affinity)[each_facet],
                            });
                            let words = [];
                            let new_word = [];
                            if (absolute_affinity) {
                              words =
                                absolute_affinity[
                                  Object.keys(absolute_affinity)[each_facet]
                                ];
                            }
                            Object.keys(words).map((category) => {
                              Object.keys(words[category]).map((value) => {
                                let _obj = {
                                  text: value,
                                  value: words[category][
                                    value
                                  ]?.frequency?.toFixed(2),
                                  type: category,
                                };
                                new_word.push(_obj);
                              });
                            });
                            userAffinityData[
                              Object.keys(absolute_affinity)[each_facet]
                            ] = {
                              word_cloud: new_word,
                              seasonality_style: seasonality_style,
                              seasonality_brand: seasonality_brand,
                              user_profile_style: user_profile_style,
                              user_profile_brand: user_profile_brand,
                              price_affinity: price_affinity,
                              relative_affinity:
                                innerContext?.user_affinity
                                  ?.relative_affinities[
                                  Object.keys(absolute_affinity)[each_facet]
                                ],
                            };
                          }
                        }
                      }
                      if (ontologyList.length > 0) {
                        ontology = ontologyList[0].value;
                        currentUserAffinityData =
                          userAffinityData[ontologyList[0].value];
                      }
                    }
                    return (
                      <RenderMainSection
                        isVueX={isVueX}
                        ontology={ontology}
                        ontologyList={ontologyList}
                        userAffinityData={userAffinityData}
                        sortFilter={sortFilter}
                        mappingLabels={mappingLabels}
                        currentUserAffinityData={currentUserAffinityData}
                        currPage={currPage}
                        pageNum={pageNum}
                        saleProduct={saleProduct}
                        updateSaleProduct={updateSaleProduct}
                        search={searchQuery}
                        APIData={APIData}
                        updateQuery={updateQuery}
                        updateSortFilter={updateSortFilter}
                        updatePageFilters={updatePage}
                        filterObject={filterObject}
                        updateFilterObject={updateFilterObject}
                        filtersToShow={filtersToShow}
                        loading={loading}
                        updateLoading={updateLoading}
                        sortOptions={sortOptions}
                      />
                    );
                  }}
                </RecommendedPdtsConsumer>
              </RecommendedPdtsContainer>
            );
          }}
        </ConfigConsumer>
      </VueFindWrapper>
    </>
  );
};

export { VueFind };
