import React, { useState, useEffect, createRef, Fragment, useRef } from "react";
import { Dropdown, Menu, Checkbox, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ReactWordcloud from "react-wordcloud";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Icon, Modal, List, Popup } from "semantic-ui-react";
import { UserProfileWrapper, UserInfoWrapper } from "../UserProfile/styled";
import { BreadcrumbLinks } from "../../component";
import {
  CategoryPdtsContainer,
  CategoryPdtsConsumer,
  CategoryListContainer,
  CategoryListConsumer,
  ConfigConsumer,
  RecommendedPdtsConsumer,
  RecommendedPdtsContainer,
} from "../../container";
import {
  MainContainer,
  FilterContainer,
  PdtContainer,
  CardWrapper,
  PdtInfoBlock,
  CustomFilterCont,
  FilterCategoryCont,
  FilterCategoryEl,
  FilterCategoryTitle,
  FilterCategoryTitleWrapper,
  FilterCategoryListWrapper,
  OntologyCont,
  ClearBtnCont,
  PdtImg,
  TextSearchWrapper,
  SearchInputCont,
  SearchLabelTxt,
  RenderSubFilterCont,
  RecommendationBtn,
  RedirectionWrapper,
  ProductDetailsWrapper,
  RelevanceFilter,
  RangeContainer,
  SliderContainer,
  CheckBoxContainer,
  DropDownContainer,
  WordCloudContainer,
  UserDataAffinityContainer,
  SparkLineContainer,
  RedirectLinkMask,
  DebugInfoWrapper,
  GraphHeading,
  SelectArrow,
  CLPMenuWrapper,
  SearchIconWrapper,
  SuggestionWrapper,
  ResultsFor,
  ClearSearch,
  CLPMenuOverflowWrapper,
} from "./styled";
import { getCookie } from "../../common";
import { DiscoverItemBlock } from "../Discover/renderProps";
import {
  ListElement,
  Input,
  Select,
  Mask,
  CardBlock,
  FilterItem,
} from "../../component";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import { HeaderConfigConsumer } from "../../container";
import { Chart } from "react-charts";
import LoaderImg from "../../static/img/placeholder.svg";
import LogoImg from "../../static/img/down-arrow.png";
import { filter, cloneDeep } from "lodash";

const relevanceFilterOptions = [
  {
    id: "boost_by_brands",
    name: "Brand affinity",
  },
  {
    name: "Seasonality",
    id: "boost_by_seasonality",
  },
  {
    name: "User history",
    id: "boost_by_history",
  },
  {
    id: "boost_by_price",
    name: "Price affinity",
  },
];

const relevanceRanges = [
  {
    id: "brand",
    name: "Brand",
  },
  {
    id: "seasonality",
    name: "Seasonality",
  },
  {
    id: "history",
    name: "User history",
  },
  {
    id: "price",
    name: "Price",
  },
];

const RenderDropDown = (props) => {
  const {
    ontology,
    clpMenus,
    updateOntology,
    updatePageFilters,
    ...updateFilterProps
  } = props;
  return (
    <>
      <CategoryListContainer>
        <Menu compact>
          <RenderMenuList
            clpMenus={clpMenus}
            updateOntology={updateOntology}
            updatePageFilters={updatePageFilters}
            {...updateFilterProps}
          />
        </Menu>
      </CategoryListContainer>
      {/*
        <OntologyCont>
          {ontology && ontology.length > 0 ? ontology[0] : ""}
        </OntologyCont>
      */}
    </>
  );
};

const construct_sort_order = (clp_data, data_arr) => {
  if (clp_data && Object.keys(clp_data).length > 0) {
    let sort_arr = [];
    for (let each_item in clp_data) {
      sort_arr.push(each_item);
    }
    sort_arr.sort();
    for (let each_sorted_item in sort_arr) {
      if (Object.keys(sort_arr[each_sorted_item]).length > 0) {
        let new_obj = {
          key: sort_arr[each_sorted_item].replace(/,/g, "/"),
          children: [],
        };
        data_arr.push(new_obj);
        construct_sort_order(
          clp_data[sort_arr[each_sorted_item]],
          new_obj["children"]
        );
      }
    }
  }
};

const sendEvents = (productId, event) => {
  const config = localStorage.getItem("userConfig");
  const user = localStorage.getItem("userId");
  if (config != undefined || config != "" || config != "{}") {
    const userConfig = JSON.parse(config);
    let endPoint = "https://robin-api-dev.madstreetden.com/push_events_to_mcpd";
    const apiKey = userConfig.API_KEY;
    const userId = user || userConfig.user_id;
    const madUUID = getCookie("mad_UUID");
    let productsArray = new Array(productId);
    productsArray = JSON.stringify(productsArray);
    const postData = `api_key=${apiKey}&user_id=${userId}&event=${event}&mad_uuid=${madUUID}&product_id=${productsArray}`;
    fetch(endPoint, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Buy event error", err));
  }
};

const RenderMenuList = (props) => {
  const {
    updateOntology,
    updatePageFilters,
    clpMenus,
    ...updateFilterProps
  } = props;

  return (
    <CategoryListConsumer>
      {(context) => {
        const clp_data = context;
        let data_arr = [];
        construct_sort_order(clp_data, data_arr);
        clpMenus.current = data_arr;
        return (
          <RenderMenu
            list={data_arr}
            ontology=""
            updateOntology={updateOntology}
            updatePageFilters={updatePageFilters}
            {...updateFilterProps}
          />
        );
      }}
    </CategoryListConsumer>
  );
};

const camelize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const RenderMenu = (props) => {
  const history = useHistory();
  const {
    list,
    ontology,
    updateOntology,
    updatePageFilters,
    isSubMenu,
    ...updateFilterProps
  } = props;
  const {
    is_from_discover_page,
    updateCategoryDropdownState,
  } = updateFilterProps;
  const MenuClick = (e) => {
    const curEl = e.currentTarget;
    if (is_from_discover_page) {
      e.stopPropagation();
      history.push(
        "/vuefind/category?filters=ontology=" +
          encodeURIComponent([curEl.getAttribute("data_ontology")])
      );
      //updatePageFilters('ontology', [curEl.getAttribute('data_ontology')], true)
      window.location.reload();
    }
    e.stopPropagation();
  };
  if (list.length) {
    return list.map((listMenu, key) => {
      if (listMenu && listMenu.children.length) {
        return (
          <Dropdown
            text={camelize(listMenu.key)}
            simple
            className="link item"
            key={`DropDownMenu_${key}`}
            data_ontology={`${ontology ? ontology + ">" : ontology}${
              listMenu.key
            }`}
            onClick={MenuClick}
            onMouseEnter={() =>
              !isSubMenu ? updateCategoryDropdownState(true) : null
            }
            onMouseLeave={() =>
              !isSubMenu ? updateCategoryDropdownState(false) : null
            }
          >
            <Dropdown.Menu>
              <RenderMenu
                list={listMenu.children}
                ontology={`${ontology ? ontology + ">" : ontology}${
                  listMenu.key
                }`}
                updateOntology={updateOntology}
                updatePageFilters={updatePageFilters}
                isSubMenu={true}
                {...updateFilterProps}
              />
            </Dropdown.Menu>
          </Dropdown>
        );
      } else {
        return (
          <RenderItem
            item={camelize(listMenu.key)}
            key={`DropDownMenu_${key}`}
            data_ontology={`${ontology ? ontology + ">" : ontology}${
              listMenu.key
            }`}
            updateOntology={updateOntology}
            updatePageFilters={updatePageFilters}
            clickHandler={MenuClick}
          />
        );
      }
    });
  } else {
    return <></>;
  }
};

const RenderItem = (props) => {
  const { item, data_ontology, clickHandler } = props;
  return (
    <Dropdown.Item data_ontology={data_ontology} onClick={clickHandler || null}>
      {item}
    </Dropdown.Item>
  );
};

const RenderMainSection = (props) => {
  const {
    search,
    APIData,
    pageNum,
    currPage,
    sortFilter,
    saleProduct,
    updateSortFilter,
    filterObject,
    mappingLabels,
    ontologyList,
    ontology,
    userAffinityData,
    currentUserAffinityData,
    updateFilterObject,
    filtersToShow,
    loading,
    updateLoading,
    isVueX,
    ...updateFilterProps
  } = props;
  const selectedFilter = sortFilter.field || "";
  const { updatePageFilters } = updateFilterProps;
  delete filterObject["_each_key"];
  const { postBody } = APIData;
  const history = useHistory();

  const clpMenus = useRef(null);
  const [relevanceFilters, toggleRelevanceFilters] = useState([]);
  const [ranges, updateRanges] = useState({
    brand: 0,
    seasonality: 0,
    history: 0,
    price: 0,
  });
  const [categoryDropdownState, updateCategoryDropdownState] = useState(false);
  const appendData = () => {
    if (selectedFilter && selectedFilter.toLowerCase() === "relevance") {
      postBody.update_personalisation_config = {
        boost_by_history: relevanceFilters.indexOf("boost_by_history") > -1,
        boost_by_price: relevanceFilters.indexOf("boost_by_price") > -1,
        boost_by_brands: relevanceFilters.indexOf("boost_by_brands") > -1,
        boost_by_seasonality:
          relevanceFilters.indexOf("boost_by_seasonality") > -1,
        boost_weights: {
          brands: ranges.brand / 10 || 0,
          seasonality: ranges.seasonality / 10 || 0,
          user_history: ranges.history / 10 || 0,
          price: ranges.price / 10 || 0,
        },
      };
    }
  };

  const triggerPageRefresh = () =>
    history.push(`${history.location.pathname}${history.location.search}`);

  const updateRange = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value;
    updateRanges({ ...ranges, [field]: parseInt(value, 10) });
    triggerPageRefresh();
  };

  const updateRangesAndRefresh = (values) => {
    updateRanges({ ...values });
    triggerPageRefresh();
  };

  const toggleOption = (evt, _updateRanges, _ranges) => {
    const id = evt.target.id;
    const position = relevanceFilters.indexOf(id);
    if (position === -1) {
      relevanceFilters.push(id);
      const rangeId =
        id.split("boost_by_")[1] === "brands"
          ? "brand"
          : id.split("boost_by_")[1];
      _updateRanges({
        ..._ranges,
        [rangeId]: 10,
      });
      updateRanges({
        ..._ranges,
        [rangeId]: 10,
      });
    } else {
      relevanceFilters.splice(position, 1);
      const rangeId =
        id.split("boost_by_")[1] === "brands"
          ? "brand"
          : id.split("boost_by_")[1];
      _updateRanges({
        ..._ranges,
        [rangeId]: 0,
      });
      updateRanges({
        ..._ranges,
        [rangeId]: 0,
      });
    }
    toggleRelevanceFilters([...relevanceFilters]);
    triggerPageRefresh();
  };

  if (currPage == "category") {
    appendData();
    if (!postBody.facet_filters) {
      postBody.facet_filters = {};
    }

    if (saleProduct) {
      postBody.sale_products = saleProduct;
    }
    let _filter_obj = JSON.parse(JSON.stringify(filterObject));
    for (let _each_key in _filter_obj) {
      if (
        _filter_obj[_each_key] &&
        _filter_obj[_each_key]["value"] &&
        _filter_obj[_each_key]["value"].length > 0
      ) {
        if (_each_key == "ontology") {
          let new_ontology_arr = [];
          let ontology_arr = _filter_obj[_each_key]["value"];
          if (ontology_arr.length == 1) {
            new_ontology_arr.push(ontology_arr[0].replace(/\//g, ","));
          } else {
            for (let i = 0; i < ontology_arr.length; i++) {
              let is_found = false;
              for (let j = 0; j < ontology_arr.length; j++) {
                if (i != j && ontology_arr[j].startsWith(ontology_arr[i])) {
                  is_found = true;
                }
              }
              if (!is_found) {
                new_ontology_arr.push(ontology_arr[i].replace(/\//g, ","));
              }
            }
          }
          postBody.facet_filters[_each_key] = ontology_arr;
        } else {
          const filterArray = filterObject[_each_key]["value"];
          const parsedFilterArray = cloneDeep(filterArray);
          postBody.facet_filters[_each_key] = parsedFilterArray;
        }
      }
    }
  } else if (currPage == "search") {
    appendData();
    if (!postBody.filters) {
      postBody.filters = [];
    }
    let _filter_obj = JSON.parse(JSON.stringify(filterObject));
    for (let _each_key in _filter_obj) {
      if (
        _filter_obj[_each_key] &&
        _filter_obj[_each_key]["value"].length > 0
      ) {
        let filter_obj = {
          field: _each_key,
          type: "contains",
          value: _filter_obj[_each_key]["value"],
        };
        postBody.filters.push(filter_obj);
      }
    }
  }
  return (
    <CategoryPdtsContainer
      currPage={currPage}
      APIData={
        (filterObject && Object.keys(filterObject).length > 0) ||
        (search && search.trim().length)
          ? APIData
          : null
      }
      updateLoading={updateLoading}
    >
      <CategoryPdtsConsumer>
        {(context) => {
          const {
            data,
            num_of_pages,
            total_results,
            page_size,
            ...remainingContext
          } = context;
          return (
            <>
              <div
                style={{
                  padding: "0 3%",
                  borderBottom: "1px solid #eee",
                  position: "sticky",
                  top: "50px",
                  width: "100%",
                  background: "#fff",
                  zIndex: "100",
                }}
              >
                <BreadcrumbLinks page={"CLP"} />
              </div>
              <CLPMenuWrapper>
                <CLPMenuOverflowWrapper
                  categoryDropdownState={categoryDropdownState}
                >
                  <RenderDropDown
                    clpMenus={clpMenus}
                    is_from_discover_page={true}
                    updateCategoryDropdownState={updateCategoryDropdownState}
                  />
                </CLPMenuOverflowWrapper>
                <RenderSearch
                  is_from_discover_page={true}
                  isVueX={isVueX || false}
                />
              </CLPMenuWrapper>
              <MainContainer>
                <RenderFilters
                  currPage={currPage}
                  filterData={remainingContext}
                  renderFilters={true}
                  updateSortFilter={updateSortFilter}
                  filterObject={filterObject}
                  updateFilterObject={updateFilterObject}
                  filtersToShow={filtersToShow}
                  {...updateFilterProps}
                />
                <RenderPdts
                  list={data || []}
                  ranges={ranges}
                  search={context?.autocorrected_query || search}
                  clpMenus={clpMenus}
                  ontology={ontology}
                  updateRange={updateRange}
                  toggleOption={toggleOption}
                  updateRangesAndRefresh={updateRangesAndRefresh}
                  mappingLabels={mappingLabels}
                  ontologyList={ontologyList}
                  userAffinityData={userAffinityData}
                  currentUserAffinityData={currentUserAffinityData}
                  relevanceFilters={relevanceFilters}
                  selectedFilter={selectedFilter}
                  num_of_pages={
                    num_of_pages || Math.ceil(total_results / (page_size || 30))
                  }
                  currentPage={pageNum}
                  updatePageFilters={updatePageFilters}
                  loading={loading}
                  facets={APIData.postBody.facets}
                />
              </MainContainer>
            </>
          );
        }}
      </CategoryPdtsConsumer>
    </CategoryPdtsContainer>
  );
};

const updateFilters = (e, update, title, subFilter, updatePageFilters) => {
  const currEl = e.currentTarget;
  if (currEl && currEl.getAttribute && currEl.getAttribute("data-value")) {
    update((currState) => {
      let tempState = { ...currState };
      tempState = tempState[title];
      const filterValue = currEl.getAttribute("data-value");
      if (subFilter) {
        let key = "";
        let tempFilterArr = filter.split(">");
        if (tempFilterArr.length > 2) {
          key = tempFilterArr.slice(0, 2).join(">");
        }
        const filterIndex = tempState["value"].indexOf(key);
        if (filterIndex >= 0) {
          tempState["value"].splice(filterIndex, 1);
        }
      }
      const filterIndex = tempState["value"].indexOf(filterValue);
      if (filterIndex >= 0) {
        tempState["value"].splice(filterIndex, 1);
      } else {
        tempState["value"].push(filterValue);
      }
      updatePageFilters(title, tempState["value"]);
      currEl.checked = false;
      return { ...currState };
    });
  }
};

const RenderFilters = (props) => {
  const {
    filterData,
    renderFilters,
    updatePageFilters,
    currPage,
    updateSortFilter,
    updateSaleProduct,
    filterObject,
    updateFilterObject,
    filtersToShow,
    sortOptions,
  } = props;
  let isOntologyEnabled = Object.keys(filterObject).some(
    (el) => el == "ontology"
  );
  let filterFacets = {};
  let filterDataObj = {};
  for (let _each_key in filterObject) {
    filterDataObj[_each_key] = {};
  }
  if (currPage) {
    if (currPage === "category" || currPage == "search") {
      filterFacets = filterData.facets;
      if (filterFacets) {
        for (let _each_key in filterDataObj) {
          filterDataObj[_each_key] = filterFacets[_each_key] || {};
        }
      }
      filterDataObj.ontology = {};
      if (isOntologyEnabled && filterData && filterData.ontology_hierarchy) {
        if (
          filterData.ontology_hierarchy.sub_sub_sub_cat &&
          Object.keys(filterData.ontology_hierarchy.sub_sub_sub_cat).length > 0
        ) {
          filterDataObj.ontology =
            filterData.ontology_hierarchy.sub_sub_sub_cat;
        } else if (
          filterData.ontology_hierarchy.sub_sub_cat &&
          Object.keys(filterData.ontology_hierarchy.sub_sub_cat).length > 0
        ) {
          filterDataObj.ontology = filterData.ontology_hierarchy.sub_sub_cat;
        } else if (
          filterData.ontology_hierarchy.sub_cat &&
          Object.keys(filterData.ontology_hierarchy.sub_cat).length > 0
        ) {
          filterDataObj.ontology = filterData.ontology_hierarchy.sub_cat;
        } else if (
          filterData.ontology_hierarchy.category &&
          Object.keys(filterData.ontology_hierarchy.category).length > 0
        ) {
          filterDataObj.ontology = filterData.ontology_hierarchy.category;
        } else if (
          filterData.ontology_hierarchy.gender &&
          Object.keys(filterData.ontology_hierarchy.gender).length > 0
        ) {
          filterDataObj.ontology = filterData.ontology_hierarchy.gender;
        }
      }
    }
  }

  const renderFilterItemLabel = (filterCategory) => {
    let filterCat = filterObject[filterCategory]["value"];
    filterCat = filterCat.filter((item) => !item.includes("ontology"));

    return (
      <>
        {filterCat &&
          filterCat?.map((item) => (
            // <div>
            //   {item + ` `}
            //   <span
            //     data-value={item}
            //     onClick={(e) => updateFilters(e, updateFilterObject, filterCategory, false, updatePageFilters)}
            //   >
            //     x
            //   </span>
            // </div>

            <FilterItem
              value={item}
              // updateFilters={updateFilters}
              // update={updateFilterObject}
              // title={filterCategory}
              // subFilter={false}
              // updatePageFilters={updatePageFilters}
              onClick={(e) =>
                updateFilters(
                  e,
                  updateFilterObject,
                  filterCategory,
                  false,
                  updatePageFilters
                )
              }
            ></FilterItem>
          ))}
      </>
    );
  };

  const selectedFilters = () => {
    return Object.keys(filterObject)
      .filter((x, i) => {
        // Filtering through selected filters and neglecting empty arrays
        if (filterObject[x]?.value?.length && i) {
          return true;
        }
        return false;
      })
      .map((filterCategory) => {
        return renderFilterItemLabel(filterCategory);
      });
  };

  return (
    <FilterContainer>
      <UserProfileWrapper>
        <ConfigConsumer>
          {(context) => {
            const mad_UUID = localStorage.getItem("mad_UUID");
            let user_id = localStorage.getItem("userId");
            if (!user_id) {
              user_id = context.user_id;
            }
            const handleClick = (content) => {
              navigator.clipboard.writeText(content);
            };
            return (
              <UserInfoWrapper>
                <tr>
                  <td>MAD UUID</td>
                  <td>{mad_UUID}</td>
                  <td>
                    <button onClick={() => handleClick(mad_UUID)}>
                      <Icon name="copy" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>{user_id}</td>
                  <td>
                    <button onClick={() => handleClick(user_id)}>
                      <Icon name="copy" />
                    </button>
                  </td>
                </tr>
              </UserInfoWrapper>
            );
          }}
        </ConfigConsumer>
      </UserProfileWrapper>
      {renderFilters ? (
        <>
          <RenderCustomFilter
            updateSortFilter={updateSortFilter}
            updateSaleProduct={updateSaleProduct}
            sortOptions={sortOptions}
          />
          {/* <div class="d-flex flex-wrap font-body-1 flex-fill">
            <div class="audience-filter-item">
              <div class="ellipsis flex-fill">Browsers without any Vue.ai exposure</div>
              <div class="w-40 d-flex justify-content-between sub-section" style={{flex: '0 0 45%'}}>
                <img role="presentation" tabindex="-1" src="/assets/icons/close.svg" alt=" " class="cursor-pointer ml-auto" />         
              </div>
            </div>
          </div> */}
          {selectedFilters()}

          {Object.keys(filterDataObj).map((obj, i) => {
            const shouldDisplayFilter = filtersToShow.some(
              (filter) => filter == obj
            );
            return shouldDisplayFilter &&
              filterDataObj[obj] &&
              Object.keys(filterDataObj[obj]).length ? (
              <RenderFilterList
                title={obj}
                currentFilters={
                  filterObject[obj] ? filterObject[obj]["value"] : []
                }
                value={filterDataObj[obj]}
                update={updateFilterObject}
                updatePageFilters={updatePageFilters}
                currPage={currPage}
              />
            ) : null;
          })}
        </>
      ) : null}
    </FilterContainer>
  );
};

const RenderCustomFilter = (props) => {
  const { updateSortFilter, updateSaleProduct, sortOptions } = props;
  const SortOptionArr =
    sortOptions && sortOptions.length > 0
      ? sortOptions
      : [
          {
            label: "Relevance",
            value: { type: "custom", field: "relevance", order: "desc" },
          },
          {
            label: "Trending",
            value: { type: "custom", field: "trending", order: "desc" },
          },
          {
            label: "Price: Low to High",
            value: { type: "custom", field: "price", order: "asc" },
          },
          {
            label: "Price: High to Low",
            value: { type: "custom", field: "price", order: "desc" },
          },
        ];
  let sortOptionsLabel = SortOptionArr.map((object) => object.label);
  const SaleOptionArr = ["Sale - not applicable", "Sale - Yes", "Sale - No"];
  const onSortChange = (value) => {
    updateSortFilter(updateCurrentSort(value, SortOptionArr));
  };
  return (
    <CustomFilterCont>
      <SelectArrow src={LogoImg} width="16" height="16" />
      <Select
        list={sortOptionsLabel}
        onChange={(e) => onSortChange(e.currentTarget.value)}
      />
    </CustomFilterCont>
  );
};

const updateCurrentSort = (sortValue, SortOptionArr) => {
  return SortOptionArr.filter((item) => item.label === sortValue).map(
    (item) => item.value
  )[0];
};

const RenderFilterList = (props) => {
  const {
    title,
    value,
    update,
    updatePageFilters,
    currentFilters,
    currPage,
  } = props;

  return (
    <FilterCategoryCont>
      <FilterCategoryTitleWrapper>
        <FilterCategoryTitle>{title}</FilterCategoryTitle>
        {/* <ClearBtnCont onClick={e => {
                update([])
                updatePageFilters(title, [])
            }}>Clear</ClearBtnCont> */}
      </FilterCategoryTitleWrapper>
      <FilterCategoryListWrapper>
        {value
          ? Object.keys(value).map((filter, key) => {
              let checked = false;
              if (value[filter].count) {
                return (
                  <React.Fragment key={`Category_${key}`}>
                    <RenderFilterItem
                      key={`filters_${key}`}
                      index={key}
                      title={title}
                      checked={true}
                      filter={filter}
                      update={update}
                      updatePageFilters={updatePageFilters}
                      count={value[filter].count || 0}
                    />
                    <RenderSubFilterCont>
                      {value[filter].list &&
                        Object.keys(value[filter].list).map(
                          (subFilters, key) => {
                            let currFilter = `${filter}>${subFilters}`;
                            let checked = false;
                            if (currentFilters.indexOf(currFilter) >= 0) {
                              checked = true;
                            }
                            return (
                              <RenderFilterItem
                                subFilter={true}
                                key={`subfilters_${key}`}
                                index={key}
                                title={title}
                                checked={checked}
                                filter={currFilter}
                                value={subFilters}
                                update={update}
                                updatePageFilters={updatePageFilters}
                                count={value[filter].list[subFilters] || 0}
                              />
                            );
                          }
                        )}
                    </RenderSubFilterCont>
                  </React.Fragment>
                );
              } else {
                if (currentFilters.indexOf(filter) >= 0) {
                  checked = true;
                }
                return (
                  <RenderFilterItem
                    key={`filters_${key}`}
                    index={key}
                    title={title}
                    checked={checked}
                    filter={filter}
                    update={update}
                    updatePageFilters={updatePageFilters}
                    count={value[filter] || 0}
                    currPage={currPage}
                  />
                );
              }
            })
          : null}
      </FilterCategoryListWrapper>
    </FilterCategoryCont>
  );
};

const RenderFilterItem = (props) => {
  const {
    index,
    title,
    filter,
    value,
    checked,
    update,
    updatePageFilters,
    count,
    subFilter,
    currPage,
  } = props;
  // let filter_arr = filter.split('>')
  let offset_string = "";
  // if((filter_arr.length - 1) > 0){
  //     offset_string = '-\t\t'.repeat(filter_arr.length)
  // }
  let is_search_page = currPage == "search";
  let count_value = count || 0;
  return (
    <FilterCategoryEl>
      <div
        style={{
          width: "25px",
          height: "100%",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <Input
          type="checkbox"
          id={`id_${title}_${index}`}
          data-value={filter}
          checked={checked}
          onChange={(e) =>
            updateFilters(e, update, title, subFilter, updatePageFilters)
          }
        />
      </div>
      <div style={{ width: "none" }}>
        <label htmlFor={`id_${title}_${index}`}>
          {(value || offset_string + filter)}
          {count_value ? " (" + count_value + ")" : null}
        </label>
      </div>
    </FilterCategoryEl>
  );
};

const RenderPdts = (props) => {
  const {
    list,
    search,
    currentPage,
    updatePageFilters,
    num_of_pages,
    selectedFilter,
    relevanceFilters,
    toggleOption,
    ranges,
    ontology,
    updateRange,
    updateRangesAndRefresh,
    mappingLabels,
    ontologyList,
    userAffinityData,
    currentUserAffinityData,
    clpMenus,
    loading,
    facets,
  } = props;

  const [showUserAffinity, toggleUserAffinity] = useState(false);
  const [_ranges, _updateRanges] = useState(ranges);
  const [currentOntology, updateOntology] = useState(ontology || "");
  const [_userAffinityData, updateUserAffinityData] = useState(
    userAffinityData || {}
  );
  const [_currentUserAffinityData, updateCurrentUserAffinityData] = useState(
    currentUserAffinityData || {}
  );

  const onChangeFacet = (e, { value }) => {
    updateOntology(value);
    setTimeout(() => {
      let el =
        _currentUserAffinityData?.price_affinity &&
        _currentUserAffinityData?.price_affinity[currentOntology] &&
        _currentUserAffinityData?.price_affinity[currentOntology].findIndex(
          (el) => el.indexLabel == "user"
        );
      changeBarColorFlag(el, "rgb(74, 181, 235)");
    }, 0);
    updateCurrentUserAffinityData(userAffinityData[value]);
  };
  const relativeAffinity = _currentUserAffinityData
    ? _currentUserAffinityData.relative_affinity || ""
    : "";

  const changeBarColorFlag = (index, color) => {
    const element =
      document.getElementsByClassName("series bar")[0]?.children &&
      document.getElementsByClassName("series bar")[0]?.children[index];
    if (element) {
      element.style.fill = color;
    }
  };

  const customSlideHandler = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value;
    _updateRanges({ ..._ranges, [field]: parseInt(value, 10) });
  };

  const passValues = () => {
    updateRangesAndRefresh(_ranges);
  };

  if (loading) {
    window.scrollTo(0, 0);
  }

  const callbacks = {
    getWordTooltip: (word) =>
      `${word.text}\nCategory: ${word.type}\nValue: ${word.value}`,
  };

  return (
    <>
      {loading ? (
        <Mask />
      ) : (
        <PdtContainer renderProduct={list.length > 0}>
          <ConfigConsumer>
            {(context) => {
              const { vue_find } = context;
              const relevanceFilterChildren =
                vue_find?.children?.category_list?.relevance_filter;
              const clientName = context.client_name;
              const isSpecificUser = clientName === "2964_rtr-eu";
              if (isSpecificUser) {
                relevanceFilterOptions.forEach((filter) => {
                  filter.disable =
                    filter.id === "boost_by_brands" ||
                    filter.id === "boost_by_seasonality" ||
                    filter.id === "boost_by_price";
                });
                relevanceRanges.forEach((range) => {
                  range.disable =
                    range.id === "brand" ||
                    range.id === "seasonality" ||
                    range.id === "price";
                });
              }
              const isRelevanceFilterEnabled =
                context.vue_find.children.category_list?.relevance_filter
                  ?.active;
              return (
                <div>
                  {search && (
                    <ResultsFor>
                      Showing results for&nbsp;
                      <span>{search}</span>
                      <Popup
                        trigger={
                          <ClearSearch
                            onClick={() => {
                              const url = clpMenus?.current[0]?.key
                                ? `/vuefind/category?filters=ontology=${clpMenus?.current[0]?.key}`
                                : `/vuefind/search`;
                              window.location.href = url;
                            }}
                          >
                            Clear search
                          </ClearSearch>
                        }
                        content="Clear search"
                      />
                    </ResultsFor>
                  )}
                  {isRelevanceFilterEnabled &&
                    selectedFilter &&
                    selectedFilter.toLowerCase() === "relevance" && (
                      <RelevanceFilter>
                        <SliderContainer style={{ width: "197px" }}>
                          <Label>
                            User affinity
                            <Label.Detail>
                              <Checkbox
                                toggle
                                checked={showUserAffinity}
                                onChange={() =>
                                  toggleUserAffinity(!showUserAffinity)
                                }
                              />
                            </Label.Detail>
                          </Label>
                        </SliderContainer>
                        {showUserAffinity && (
                          <Fragment>
                            <SliderContainer>
                              <DropDownContainer>
                                <Dropdown
                                  fluid
                                  search
                                  selection
                                  options={ontologyList}
                                  onChange={onChangeFacet}
                                  placeholder="Select Facet"
                                  defaultValue={currentOntology}
                                />
                              </DropDownContainer>
                            </SliderContainer>
                            {_currentUserAffinityData &&
                              _currentUserAffinityData.word_cloud && (
                                <Fragment>
                                  {/* {(_currentUserAffinityData.user_profile_style ||
                                    _currentUserAffinityData.user_profile_brand) && (
                                    <UserDataAffinityContainer>
                                      {_currentUserAffinityData.user_profile_style && (
                                        <WordCloudContainer>
                                          <GraphHeading>
                                            User Profile Style
                                          </GraphHeading>
                                          <ReactWordcloud
                                            words={
                                              _currentUserAffinityData
                                                .user_profile_style?.[
                                                currentOntology
                                              ]
                                            }
                                            options={{
                                              fontFamily: "Poppins_Semi_Bold",
                                              rotationAngles: [0, 90],
                                              fontSizes: [20, 30],
                                            }}
                                          />
                                        </WordCloudContainer>
                                      )}
                                      {_currentUserAffinityData.user_profile_brand && (
                                        <WordCloudContainer>
                                          <GraphHeading>
                                            User Profile Brand
                                          </GraphHeading>
                                          <ReactWordcloud
                                            words={
                                              _currentUserAffinityData
                                                .user_profile_brand?.[
                                                currentOntology
                                              ]
                                            }
                                            options={{
                                              fontFamily: "Poppins_Semi_Bold",
                                              rotationAngles: [0, 90],
                                              fontSizes: [20, 30],
                                            }}
                                          />
                                        </WordCloudContainer>
                                      )}
                                    </UserDataAffinityContainer>
                                  )}
                                  {(_currentUserAffinityData.seasonality_style ||
                                    _currentUserAffinityData.seasonality_brand) && (
                                    <UserDataAffinityContainer>
                                      {_currentUserAffinityData.seasonality_style && (
                                        <WordCloudContainer>
                                          <GraphHeading>
                                            Seasonality Style
                                          </GraphHeading>
                                          <ReactWordcloud
                                            words={
                                              _currentUserAffinityData
                                                .seasonality_style?.[
                                                currentOntology
                                              ]
                                            }
                                            options={{
                                              fontFamily: "Poppins_Semi_Bold",
                                              rotationAngles: [0, 90],
                                              fontSizes: [20, 30],
                                            }}
                                          />
                                        </WordCloudContainer>
                                      )}
                                      {_currentUserAffinityData.seasonality_brand && (
                                        <WordCloudContainer>
                                          <GraphHeading>
                                            Seasonality Brand
                                          </GraphHeading>
                                          <ReactWordcloud
                                            words={
                                              _currentUserAffinityData
                                                .seasonality_brand?.[
                                                currentOntology
                                              ]
                                            }
                                            options={{
                                              fontFamily: "Poppins_Semi_Bold",
                                              rotationAngles: [0, 90],
                                              fontSizes: [20, 30],
                                            }}
                                          />
                                        </WordCloudContainer>
                                      )}
                                    </UserDataAffinityContainer>
                                  )} */}
                                  <UserDataAffinityContainer>
                                    {_currentUserAffinityData.word_cloud && (
                                      <WordCloudContainer type="positive">
                                        <GraphHeading>
                                          {_currentUserAffinityData.negative_cloud
                                            ? "Positive Absolute Affinity"
                                            : "Absolute Affinity"}
                                        </GraphHeading>
                                        <ReactWordcloud
                                          words={
                                            _currentUserAffinityData.word_cloud
                                          }
                                          options={{
                                            fontFamily: "Poppins_Semi_Bold",
                                            rotationAngles: [0, 90],
                                            fontSizes: [20, 30],
                                          }}
                                          callbacks={callbacks}
                                        />
                                      </WordCloudContainer>
                                    )}
                                    {!!(
                                      _currentUserAffinityData.negative_cloud &&
                                      _currentUserAffinityData.negative_cloud
                                        .length
                                    ) && (
                                      <WordCloudContainer
                                        style={{ margin: "0 auto" }}
                                        type="negative"
                                      >
                                        <GraphHeading>
                                          Negative Absolute Affinity
                                        </GraphHeading>
                                        <ReactWordcloud
                                          words={
                                            _currentUserAffinityData.negative_cloud
                                          }
                                          options={{
                                            fontFamily: "Poppins_Semi_Bold",
                                            rotationAngles: [0, 90],
                                            fontSizes: [20, 30],
                                          }}
                                          callbacks={callbacks}
                                        />
                                      </WordCloudContainer>
                                    )}
                                  </UserDataAffinityContainer>
                                  {/* <UserDataAffinityContainer>
                              <WordCloudContainer>
                                <GraphHeading>Absolute Affinity</GraphHeading>
                                <ReactWordcloud
                                  words={_currentUserAffinityData.word_cloud[currentOntology]}
                                />
                              </WordCloudContainer>
                              {relativeAffinity &&
                                <Fragment>
                                  <SparkLineContainer>
                                    {mappingLabels && [0, 1, 2].map(index => (
                                      <Fragment>
                                        <Sparklines
                                          height={60}
                                          width={180}
                                          data={relativeAffinity[index]}
                                        >
                                          <SparklinesLine color={mappingLabels[index].color} />
                                        </Sparklines>
                                        {(relativeAffinity[index].length > 1) &&
                                          <p>&nbsp;{mappingLabels[index].name}</p>
                                        }
                                      </Fragment>
                                    ))}
                                  </SparkLineContainer>
                                  <SparkLineContainer>
                                    {mappingLabels && [3, 4, 5].map(index => (
                                      <Fragment>
                                        <Sparklines
                                          height={60}
                                          width={180}
                                          data={relativeAffinity[index]}
                                        >
                                          <SparklinesLine color={mappingLabels[index].color} />
                                        </Sparklines>
                                        {(relativeAffinity[index].length > 1) &&
                                          <p>&nbsp;{mappingLabels[index].name}</p>
                                        }
                                      </Fragment>
                                    ))}
                                  </SparkLineContainer>{' '}
                                </Fragment>
                              }
                          </UserDataAffinityContainer> */}
                                  <div
                                    style={{
                                      height: "20rem",
                                      width: "40rem",
                                      margin: "auto",
                                      paddingLeft: "50px",
                                      paddingBottom: "50px",
                                      position: "relative",
                                      marginBottom: "80px",
                                      display: "none",
                                    }}
                                  >
                                    <GraphHeading>Price Affinity</GraphHeading>
                                    <p
                                      style={{
                                        position: "absolute",
                                        left: "-40px",
                                        top: "50%",
                                        transform: "rotate(-90deg)",
                                      }}
                                    >
                                      Number of Products
                                    </p>
                                    <p
                                      style={{
                                        position: "absolute",
                                        bottom: "-70px",
                                        left: "50%",
                                      }}
                                    >
                                      Price
                                    </p>
                                    <Chart
                                      data={[
                                        {
                                          label: "price",
                                          data:
                                            _currentUserAffinityData.price_affinity &&
                                            _currentUserAffinityData
                                              .price_affinity[currentOntology]
                                              ? _currentUserAffinityData
                                                  .price_affinity[
                                                  currentOntology
                                                ]
                                              : [
                                                  {
                                                    y: 41,
                                                    x: 100,
                                                    indexLabel: "user",
                                                  },
                                                  { y: 33, x: 220 },
                                                  { y: 87, x: 180 },
                                                ],
                                        },
                                      ]}
                                      axes={[
                                        {
                                          primary: true,
                                          type: "ordinal",
                                          position: "bottom",
                                        },
                                        {
                                          position: "left",
                                          type: "linear",
                                          stacked: false,
                                        },
                                      ]}
                                      series={{ type: "bar" }}
                                    />
                                  </div>
                                  <div style={{ display: "none" }}>
                                    {setTimeout(() => {
                                      let el =
                                        _currentUserAffinityData.price_affinity &&
                                        _currentUserAffinityData.price_affinity[
                                          currentOntology
                                        ] &&
                                        _currentUserAffinityData.price_affinity[
                                          currentOntology
                                        ].findIndex(
                                          (el) => el.indexLabel == "user"
                                        );
                                      changeBarColorFlag(el, "rgb(25,30,80)");
                                    }, 2000)}
                                  </div>
                                </Fragment>
                              )}
                          </Fragment>
                        )}
                        <CheckBoxContainer>
                          {relevanceFilterOptions.map(
                            ({ id, name, disable }) => (
                              <Checkbox
                                id={id}
                                key={id}
                                label={name}
                                disabled={
                                  disable ||
                                  !relevanceFilterChildren[id]?.active
                                }
                                onChange={(e) =>
                                  toggleOption(e, _updateRanges, _ranges)
                                }
                                style={{
                                  fontFamily: "Open_Sans_Regular",
                                }}
                                checked={relevanceFilters.indexOf(id) > -1}
                              />
                            )
                          )}
                        </CheckBoxContainer>
                        <SliderContainer>
                          {relevanceRanges.map((range) => (
                            <RangeContainer
                              key={range.id}
                              style={{
                                opacity: !relevanceFilterChildren[range?.id]
                                  ?.active
                                  ? "0.5"
                                  : "",
                              }}
                            >
                              <Label>
                                {range.name}
                                <Label.Detail>
                                  <input
                                    min="1"
                                    max="10"
                                    step="1"
                                    type="range"
                                    id={range.id}
                                    onMouseUp={passValues}
                                    disabled={
                                      range?.disable ||
                                      !relevanceFilterChildren[range?.id]
                                        ?.active
                                    }
                                    value={_ranges[range.id]}
                                    onChange={customSlideHandler}
                                  />
                                </Label.Detail>
                              </Label>
                            </RangeContainer>
                          ))}
                        </SliderContainer>
                      </RelevanceFilter>
                    )}
                </div>
              );
            }}
          </ConfigConsumer>
          <DiscoverItemBlock
            isFromDiscoverPage={false}
            data={list || []}
            config={{}}
            currPage={currentPage}
            facets={facets}
          />
          {list.length > 0 ? (
            <Pagination
              className="ant-pagination"
              total={num_of_pages * 50}
              pageSize={50}
              current={currentPage}
              onChange={(current, pageSize) => {
                updatePageFilters("page", current);
              }}
            />
          ) : null}
        </PdtContainer>
      )}
    </>
  );
};

const RenderCard = (props) => {
  const {
    title,
    price,
    image_link,
    internal_image_url,
    product_id,
    brand,
    debug_info,
  } = props;

  const [currency, setCurrency] = useState("$");
  useEffect(() => {
    let configs = localStorage.getItem("userConfig");
    let currency =
      configs &&
      JSON.parse(configs).vue_user &&
      JSON.parse(configs).vue_user.currency &&
      JSON.parse(configs).vue_user.currency;
    setCurrency(currency);
  }, []);

  const renderCartText = (product_id) => {
    let all_items_in_cart = localStorage.getItem("cart_items");
    all_items_in_cart = JSON.parse(all_items_in_cart);
    if (product_id != undefined && all_items_in_cart != null) {
      if (product_id in all_items_in_cart) {
        return "REMOVE FROM CART";
      } else {
        return "Add to cart";
      }
    } else {
      return "Add to cart";
    }
  };

  const [imgLoadStatus, updateImgLoadStatus] = useState(false);
  const [addToCartText, updateAddToCartText] = useState(
    renderCartText(product_id)
  );

  const addToCartHandler = (
    image_link,
    title,
    product_id,
    price,
    updateAddToCartText,
    updateCartPdtCount
  ) => {
    let all_items_in_cart = localStorage.getItem("cart_items");
    if (
      all_items_in_cart != undefined &&
      all_items_in_cart != "" &&
      all_items_in_cart != "{}"
    ) {
      all_items_in_cart = JSON.parse(all_items_in_cart);
      if (!(product_id in all_items_in_cart)) {
        all_items_in_cart[product_id] = {
          image_link: image_link,
          title: title,
          product_id: product_id,
          price: price,
        };
        sendEvents(product_id, "addToCart");
        localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
        updateAddToCartText("REMOVE FROM CART");
        updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
      } else {
        for (let key in all_items_in_cart) {
          if (key == product_id) {
            delete all_items_in_cart[product_id];
            localStorage.setItem(
              "cart_items",
              JSON.stringify(all_items_in_cart)
            );
            updateCartPdtCount({
              count: Object.keys(all_items_in_cart).length,
            });
          }
        }
        updateAddToCartText("Add to cart");
      }
    } else {
      all_items_in_cart = {};
      all_items_in_cart[product_id] = {
        image_link: image_link,
        title: title,
        product_id: product_id,
        price: price,
      };
      localStorage.setItem("cart_items", JSON.stringify(all_items_in_cart));
      updateCartPdtCount({ count: Object.keys(all_items_in_cart).length });
      updateAddToCartText("Added");
    }
  };

  const renderDebugDetails = () => {
    if (debug_info) {
      return Object.keys(debug_info).map((key) => (
        <DebugInfoWrapper
          style={{ color: "#fff" }}
        >{`${key} : ${debug_info[key]}`}</DebugInfoWrapper>
      ));
    }
    return "";
  };

  return (
    <CardWrapper>
      <RedirectionWrapper
        to={`/product-display?id=${product_id}`}
        isFromImageContainer={true}
      >
        <PdtImg
          src={imgLoadStatus ? internal_image_url || image_link : LoaderImg}
          alt={title || "Data Image"}
          onLoad={(e) => updateImgLoadStatus(true)}
        />
        <RedirectLinkMask isFromCarouselWithTabs={false}>
          <div
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1000,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderDebugDetails()}
          </div>
        </RedirectLinkMask>
      </RedirectionWrapper>
      <HeaderConfigConsumer>
        {(context) => {
          const { updateCartPdtCount } = context[0];
          return (
            <RecommendationBtn
              onClick={() =>
                addToCartHandler(
                  image_link,
                  title,
                  product_id,
                  price,
                  updateAddToCartText,
                  updateCartPdtCount
                )
              }
            >
              {addToCartText}
            </RecommendationBtn>
          );
        }}
      </HeaderConfigConsumer>

      <RedirectionWrapper to={`/product-display?id=${product_id}`}>
        <PdtInfoBlock>
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {title}
          </div>
        </PdtInfoBlock>
      </RedirectionWrapper>
      <ProductDetailsWrapper>{`Brand: ${brand}`}</ProductDetailsWrapper>
      <ProductDetailsWrapper>{`Price: ${
        currency ? currency : "$"
      }${price}`}</ProductDetailsWrapper>
    </CardWrapper>
  );
};

const RenderSearch = (props) => {
  const history = useHistory();
  const [showModal, toggleModal] = useState(false);
  const [suggestions, updateSuggestions] = useState([]);
  const [focusSearch, updateFocusSearch] = useState(false);
  const textRef = useRef();
  const {
    searchQuery,
    is_from_discover_page,
    updatePageFilters,
    isVueX,
  } = props;

  const openModal = (evt) => {
    evt.stopPropagation();
    updateSuggestions([]);
    toggleModal(true);
    if (textRef.current) textRef.current.focus();
    console.log("textRef open modal", textRef);
    updateFocusSearch(true);
  };

  const closeModal = () => {
    updateSuggestions([]);
    toggleModal(false);
    if (textRef.current) textRef.current.focus();
    console.log("textRef close modal", textRef);
    updateFocusSearch(false);
  };

  const handleSubmit = () => {
    let value = document.getElementById("TextSearch").value;
    closeModal();
    if (value && value.trim().length) {
      if (is_from_discover_page) {
        history.push("/vuefind/search?filters=&q=" + encodeURIComponent(value));
      } else {
        updatePageFilters("search", value);
      }
    }
  };

  const fetchSuggestions = (evt, context) => {
    let query = evt.target.value;
    let url =
      context?.vue_find?.children?.auto_suggest?.endPoint ||
      "https://eu-central-1-vuex-es.madstreetden.com/auto_suggest";
    let api_key =
      context?.vue_find?.children?.auto_suggest?.API_KEY ||
      "1302f5d8eb8172169cbe58c7fc2f0f0b729abba6";
    query = query.trim() || "";
    fetch(url, {
      headers: {
        "Content-type": "application/json",
        "x-api-key": api_key,
      },
      method: "POST",
      body: JSON.stringify({
        query,
        num_results: 10,
        catalog_id: 208,
        auto_correct: true,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const list = result?.data?.Products || [];
        const formatted = [];
        if (list.length > 0) {
          list.forEach((item) => {
            let htmlStr = item;
            const index = item.toLowerCase().indexOf(query);
            if (index > -1) {
              const subs = item.substring(index, query.length);
              htmlStr = htmlStr.replace(
                subs,
                `<span style="color: blue;">${subs}</span>`
              );
            }
            formatted.push({ text: item, htmlStr });
          });
        }
        updateSuggestions(formatted);
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    if (textRef.current) textRef.current.focus();
  }, [focusSearch]);

  return (
    <>
      <SearchIconWrapper onClick={openModal}>
        Search&nbsp;
        <Icon name="search" />
      </SearchIconWrapper>
      <Modal
        basic
        size="small"
        centered={false}
        open={showModal}
        dimmer={"inverted"}
        onClose={closeModal}
      >
        <Modal.Content>
          <TextSearchWrapper
            autoComplete="off"
            is_from_discover_page={is_from_discover_page}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ConfigConsumer>
              {(context) => (
                <SearchInputCont>
                  <Input
                    type="text"
                    id="TextSearch"
                    autocomplete="off"
                    placeholder="Search"
                    value={searchQuery}
                    inputRef={textRef}
                    onKeyUp={(evt) => {
                      if (isVueX) {
                        fetchSuggestions(evt, context);
                      }
                    }}
                  />
                  <Icon name="search" onClick={handleSubmit} />
                </SearchInputCont>
              )}
            </ConfigConsumer>
          </TextSearchWrapper>
          {isVueX && suggestions.length > 0 && (
            <SuggestionWrapper>
              <List divided verticalAlign="middle">
                {suggestions.map((suggestion, index) => {
                  return (
                    <List.Item key={`${suggestion}-${index}`}>
                      <List.Content
                        onClick={() => {
                          document.getElementById("TextSearch").value =
                            suggestion.text;
                          handleSubmit();
                          closeModal();
                        }}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: suggestion.htmlStr,
                          }}
                        />
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </SuggestionWrapper>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export { RenderDropDown, RenderMainSection, RenderSearch };
