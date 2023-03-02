import React, {
  useState,
  useRef,
  createRef,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { Input, ProductCarousel } from "../../component";
import ReactWordcloud from "react-wordcloud";
import { cardStyleConfig } from "../../styleConfig";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import moment from "moment";

import {
  UserInputCont,
  InputSectionCont,
  ProductRecommendationWrapper,
  PdtRecommendationTabs,
  PdtRecommendationTabsWrapper,
  LoadingPersonalisedResults,
  RecosLoader,
  WordCloudWrapper,
  WordCloudContainer,
  DropDownContainer,
  UserDataAffinityContainer,
  SparkLineContainer,
  AffinityButton,
  SessionContainer,
  Divider,
  ResultsFor,
  SpiderBlockContainer,
  DatePickerPopUp,
  DateFilterButton,
  DataMissingWrapper,
  DatePickerPopUpHeader,
  DatePickerOverlay,
  InputForm,
} from "./styled";
import { UserDataAttrs } from "../../configs";
import {
  RecommendedPdtsContainer,
  RecommendedPdtsConsumer,
  ConfigConsumer,
} from "../../container";
import { LoaderContainer, LoaderIcon } from "../Discover/styled";
import LoaderGIF from "../../static/img/loader.svg";
import { setCookie, getCookie, generate_uuid, capitalize } from "../../common";
import { Dropdown, Table } from "semantic-ui-react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Button, Modal } from "semantic-ui-react";
import { Chart } from "react-charts";
import { fallBack } from "./WidgetConfigs";
import { SpiderBlock } from "../../component/organism/SpiderBlock/";

const UserInputSection = (props) => {
  const { type } = props;
  const [userId, setUserId] = useState();
  const [uuid, setUuid] = useState();
  return (
    <InputSectionCont>
      <InputCont
        submitEvent={() => {
          if (userId && userId.trim().length && uuid && uuid.trim().length) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("mad_UUID", uuid);
            let userConfig = JSON.parse(localStorage.getItem("userConfig"));
            userConfig["user_id"] = userId;
            userConfig["mad_UUID"] = uuid;
            localStorage.setItem("userConfig", JSON.stringify(userConfig));
            window.location.reload();
            setCookie("mad_UUID", uuid, 365);
          }
        }}
        userId={userId}
        madId={uuid}
        setUserId={(userId) => {
          setUserId(userId);
        }}
        setmadId={(madId) => {
          setUuid(madId);
        }}
      />
    </InputSectionCont>
  );
};

const InputCont = (props) => {
  const {
    placeholder,
    submitEvent,
    setUserId,
    setmadId,
    userId,
    madId,
  } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    submitEvent();
  };

  return (
    <InputForm onSubmit={onSubmit}>
      <UserInputCont>
        <input
          type="text"
          placeholder="Enter UserID"
          value={userId}
          onChange={(e) => setUserId(e.currentTarget.value)}
        />
      </UserInputCont>
      <UserInputCont>
        <input
          type="text"
          placeholder="Enter mad_UUID"
          value={madId}
          onChange={(e) => setmadId(e.currentTarget.value)}
        />
      </UserInputCont>
      <input
        type="submit"
        value="Begin"
        disabled={!(madId?.trim() && userId?.trim())}
      />
    </InputForm>
  );
};

const ProductRecommendationSection = (props) => {
  const {
    ontology,
    updateOntology,
    updateUserAffinityData,
    userAffinityData,
    currentUserAffinityData,
    updateCurrentUserAffinityData,
  } = props;
  const changeDateFormat = (num, type) => {
    const date = new Date(num);
    return (
      date
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-") + `${type === "startDate" ? " 00:00:00" : " 23:59:59"}`
    );
  };
  const [activeTab, updateTab] = useState("");
  const [eventActiveTab, updateEventActiveTab] = useState("");
  const [widgetList, updateWidgetList] = useState([]);
  const [currWidget, updateWidget] = useState({});
  const [isModal, updateModal] = useState(false);
  const [userHistoryGrouped, updateUserHistoryGrouped] = useState({});
  const [userHistoryEventsGrouped, updateUserHistoryEventsGrouped] = useState(
    {}
  );
  const userHistoryChanged = useRef(false);
  const [currChartData, updateCurrChartData] = useState([]);
  const [selectedDate, updateSelectedDate] = useState("");
  const [yAxis, updateYAxis] = useState("price");
  const [yAxes, updateYAxes] = useState({ type: "linear", position: "left" });
  const [axesFacets, updateAxesFacets] = useState([
    { key: "price", value: "price", text: "price" },
    { key: "brand", value: "brand", text: "brand" },
    { key: "ontology", value: "ontology", text: "ontology" },
    { key: "year", value: "year", text: "year" },
    {
      key: "odometer_reading",
      value: "odometer_reading",
      text: "odometer_reading",
    },
    { key: "fuel_type", value: "fuel_type", text: "fuel_type" },
  ]);
  const [axesCumulativeFacets, updateAxesCumulativeFacets] = useState([
    { key: "brand", value: "brand", text: "brand" },
    { key: "ontology", value: "ontology", text: "ontology" },
  ]);
  const [cumulatitveFacetsChartData, updateCumulativeFacetChartData] = useState(
    {}
  );
  const [
    currCumulativeFacetsChartData,
    updateCurrCumulativeFacetsChartData,
  ] = useState([]);
  const [cumulativeYAxis, updateCumulativeYAxis] = useState("");
  const [cumulativeYAxisObj, updateCumulativeYAxisObj] = useState({});
  const [sessionId, updateSessionId] = useState();
  const [colors, updateColors] = useState([
    "#2862FF",
    "#FCA413",
    "#05C3A0",
    "#05C3A0",
    "#402578",
    "#ED4963",
    "#FDA013",
    "#BF3CEE",
    "#372168",
    "#0AAFFA",
  ]);
  const [datePickerData, updateDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [datePickerPopupState, updateDatePickerPopupState] = useState(false);
  const [relativeAffinity, updateRelativeAffinity] = useState([]);

  const rendered = useRef(false);
  let recos_section = false;
  let current_tab = "";
  useEffect(() => {
    if (widgetList && widgetList.length) {
      updateWidget(widgetList[0]);
      widgetList.shift();
      updateWidgetList([...widgetList]);
    }
  }, [widgetList]);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const context = JSON.parse(localStorage.getItem("userConfig"));
    const { vue_user, discover } = context;
    let API_KEY = context.API_KEY;
    let url = context.url;
    let user_id = localStorage.getItem("userId");
    if (!user_id) {
      user_id = context.user_id;
    }
    if (vue_user.API_KEY) {
      API_KEY = vue_user.API_KEY;
    }
    const discover_recommendation =
      discover && discover.recommendation
        ? discover.recommendation
        : url + "/widgets";

    const mad_UUID = getCookie("mad_UUID");
    const recommendation =
      vue_user && vue_user.recommendation
        ? vue_user.recommendation
        : discover_recommendation;
    buildWidgetArray(
      context,
      vue_user,
      discover,
      API_KEY,
      user_id,
      mad_UUID,
      recommendation,
      sessionId,
      datePickerData
    );
  }, [sessionId, datePickerData]);

  useEffect(() => {
    if (userHistoryGrouped && Object.keys(userHistoryGrouped).length > 0) {
      updateCurrentChartData();
    }
  }, [selectedDate, yAxis]);

  useEffect(() => {
    updateCumulativeYAxis("ontology");
    updateCumulativeYAxisObj({ type: "ordinal", position: "left" });
    if (
      cumulatitveFacetsChartData &&
      Object.keys(cumulatitveFacetsChartData).length > 0
    ) {
      setCumulativeChartData();
    }
  }, [cumulatitveFacetsChartData]);

  useEffect(() => {
    if (
      cumulatitveFacetsChartData &&
      Object.keys(cumulatitveFacetsChartData).length > 0
    ) {
      setCumulativeChartData();
    }
  }, [cumulativeYAxis]);

  useEffect(() => {
    fetchRelativeAffinity(ontology);
  }, [ontology, ontology !== ""]);

  const onChangeFacet = (value) => {
    updateOntology(value);
    updateCurrentUserAffinityData(userAffinityData[value]);
  };

  const onOntologyChange = (e, { value }) => {
    if (ontology !== value) {
      onChangeFacet(value);
      fetchRelativeAffinity(value);
    }
  };

  function show() {
    updateModal(true);
  }
  function close() {
    updateModal(false);
  }

  const onChangeAxesFacets = (e, { value }) => {
    updateYAxis(value);
    if (value == "price" || value == "discount_price") {
      updateYAxes({ type: "linear", position: "left" });
    } else {
      updateYAxes({ type: "ordinal", position: "left" });
    }
    updateCurrentChartData();
  };

  const onChangeCumulativeAxesFacets = (e, { value }) => {
    updateCumulativeYAxis(value);
    updateCumulativeYAxisObj({ type: "ordinal", position: "left" });
    setCumulativeChartData();
  };

  const setCumulativeChartData = () => {
    let _facets_arr = [];
    let _facets = cumulatitveFacetsChartData[cumulativeYAxis];
    let facet_name_obj = { label: cumulativeYAxis, data: [] };
    Object.keys(_facets).forEach((_facet) => {
      facet_name_obj["data"].push({
        primary: _facet,
        secondary: _facets[_facet],
      });
    });
    _facets_arr.push(facet_name_obj);
    updateCurrCumulativeFacetsChartData(_facets_arr);
  };

  const constructCumulativeFacetsReactChart = () => {
    const series = {
      type: "bar",
    };
    return currCumulativeFacetsChartData.length > 0 &&
      currCumulativeFacetsChartData[0].data.length > 0 ? (
      <div>
        <div>
          <hr />
          <h4 style={{ textAlign: "center", padding: "1rem" }}>
            Facet wise frequency
          </h4>
          <div style={{ margin: "auto", width: "20%" }}>
            <Dropdown
              placeholder="Select Y Axix"
              fluid
              search
              selection
              options={axesCumulativeFacets}
              onChange={onChangeCumulativeAxesFacets}
              defaultValue={cumulativeYAxis}
            />
          </div>
        </div>
        <div
          style={{
            height: "20rem",
            width: "40rem",
            margin: "auto",
            padding: "2rem",
            "margin-bottom": "4rem",
          }}
        >
          <Chart
            data={currCumulativeFacetsChartData}
            axes={[
              { primary: true, type: "ordinal", position: "left" },
              { position: "bottom", type: "linear", stacked: true },
            ]}
            series={series}
            tooltip
          />
        </div>
        <hr />
      </div>
    ) : null;
  };
  const getSeriesStyle = React.useCallback((series) => {
    let colorPalette = series?.originalSeries?.data[0]?.colorPalette;
    return {
      fill: colorPalette ? colorPalette[series.label] : "#2862FF",
    };
  }, []);
  const getDatumStyle = React.useCallback((datum) => {
    let colorPalette = datum?.originalSeries?.data[0]?.colorPalette;
    return {
      color: colorPalette ? colorPalette[datum.primary] : "#2862FF",
    };
  }, []);
  function CustomTooltip({ getStyle, primaryAxis, datum }) {
    let data = {};
    let style = {};
    if (datum) {
      style = getStyle(datum);
      data = datum["originalDatum"]["product_details"];
    }
    return datum ? (
      <div
        style={{
          color: "#000",
          pointerEvents: "none",
          fontFamily: "Poppins_Medium",
          padding: "5px",
        }}
      >
        <h4
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          <p>
            {data["event"]}{" "}
            <span
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "10px",
                backgroundColor: style.fill,
                display: "inline-block",
                verticalAlign: "middle",
              }}
            ></span>
          </p>
        </h4>
        <div
          style={{
            width: "270px",
            // maxHeight: "100px",
            // overflow: "scroll",
          }}
        >
          <div>
            {Object.keys(data).map((item) => (
              <p>
                {item} : {data[item]}
              </p>
            ))}
          </div>
        </div>
      </div>
    ) : null;
  }

  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />;
      },
    }),
    []
  );

  const constructEventsReactChart = () => {
    let events_arr = [];
    const series = {
      type: "bar",
    };
    let events_obj = { label: "cumulative_events", data: [] };
    Object.keys(userHistoryEventsGrouped).forEach((event_name) => {
      events_obj["data"].push({
        primary: event_name,
        secondary: userHistoryEventsGrouped[event_name],
      });
    });
    events_arr.push(events_obj);
    return events_obj["data"].length > 0 ? (
      <div style={{ height: "10rem", width: "20rem", margin: "auto" }}>
        <Chart
          data={events_arr}
          axes={[
            { primary: true, type: "ordinal", position: "left" },
            { position: "bottom", type: "linear", stacked: true },
          ]}
          series={series}
          tooltip
        />{" "}
      </div>
    ) : null;
  };

  const constructReactChart = () => {
    const data = [
      {
        label: "Series 1",
        data: [
          [20, 20000],
          [22, 21000],
          [23, 29000],
          [29, 25000],
          [31, 29000],
        ],
      },
      {
        label: "Series 2",
        data: [
          [22, 21000],
          [23, 23000],
          [24, 29000],
          [27, 16000],
          [29, 29000],
        ],
      },
    ];

    const series = {
      type: "bubble",
      showPoints: false,
    };

    return (
      <>
        {currChartData && currChartData.length > 0 ? (
          <div
            style={{
              height: "300px",
              width: "400px",
            }}
          >
            <p>
              <b>X Axis</b> Time <b>Y Axis</b> {yAxis}{" "}
            </p>
            <div style={{ width: "10rem", marginBottom: "1rem" }}>
              <Dropdown
                placeholder="Select Y Axix"
                fluid
                search
                selection
                options={axesFacets}
                onChange={onChangeAxesFacets}
                defaultValue={yAxis}
              />
            </div>
            <Chart
              data={currChartData}
              axes={[
                { primary: true, type: "ordinal", position: "bottom" },
                yAxes,
              ]}
              series={series}
              tooltip={tooltip}
            />
          </div>
        ) : null}
      </>
    );
  };
  const constructTableHeader = () => {
    let events_types = {
      Date: {},
      "Page View": {},
      "Add To Cart": {},
      "Add To Wishlist": {},
      Buy: {},
      Action: {},
    };
    return (
      <Table.Header>
        <Table.Row>
          {Object.keys(events_types).map((key) => {
            return <Table.HeaderCell>{key}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const updateCurrentChartData = () => {
    let event_data_arr = [];
    let bubble_strength = {};
    let events = userHistoryGrouped[selectedDate];
    Object.keys(events).forEach((event_key) => {
      let event_data_obj = {};
      event_data_obj["label"] = event_key;
      event_data_obj["data"] = [];
      Object.keys(events[event_key]).forEach((_key) => {
        // if(events[event_key][_key][y_axis_chosen] in bubble_strength){
        //     bubble_strength[events[event_key][_key][y_axis_chosen]] = bubble_strength[events[event_key][_key][y_axis_chosen]] + 1
        // } else {
        //     bubble_strength[events[event_key][_key][y_axis_chosen]] = 1
        // }
        event_data_obj["data"].push({
          primary: events[event_key][_key]["time"],
          secondary: events[event_key][_key][yAxis],
          product_details: events[event_key][_key],
        });
      });
      event_data_arr.push(event_data_obj);
    });
    updateCurrChartData(event_data_arr);
  };

  const updateCurrentDate = (event_date) => {
    updateSelectedDate(event_date);
  };

  const constructUserHistoryTable = (userHistoryGrouped) => {
    let events_types = {
      pageView: {},
      addToCart: {},
      addToWishlist: {},
      buy: {},
    };
    if (userHistoryGrouped != null) {
      return (
        <Table.Body>
          {Object.keys(userHistoryGrouped).map((event_date) => {
            return (
              <Table.Row>
                <Table.Cell>{event_date}</Table.Cell>
                {Object.keys(events_types).map((event_name) => {
                  return (
                    <>
                      {event_name in userHistoryGrouped[event_date] ? (
                        <Table.Cell>
                          {userHistoryGrouped[event_date][event_name].length}
                        </Table.Cell>
                      ) : (
                        <Table.Cell>0</Table.Cell>
                      )}
                    </>
                  );
                })}
                <Table.Cell>
                  <Button
                    primary
                    size="mini"
                    onClick={() => updateCurrentDate(event_date)}
                  >
                    View Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      );
    }
  };

  const constructSessionTable = (data, events) => {
    return (
      // <div>UserSession Table</div>
      <div style={{ position: "relative" }}>
        {!Object.keys(data).length && (
          <DataMissingWrapper>No results found</DataMissingWrapper>
        )}
        <Table celled structured size={"small"}>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell rowSpan="2" style={{ width: "40%" }}>
                Sessions
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" style={{ width: "13%" }}>
                Date
              </Table.HeaderCell>
              <Table.HeaderCell
                colSpan={events ? `${events.length}` : "3"}
                // style={{ width: "37%" }}
              >
                Events
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {events ? (
                events.map((value) => (
                  <Table.HeaderCell
                    style={{
                      padding: "5px",
                      maxWidth: "100px",
                      minWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={value}
                  >
                    {value}
                  </Table.HeaderCell>
                ))
              ) : (
                <>
                  <Table.HeaderCell
                    style={{
                      padding: "5px",
                      maxWidth: "100px",
                      minWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Page View
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      padding: "5px",
                      maxWidth: "100px",
                      minWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Add To Cart
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      padding: "5px",
                      maxWidth: "100px",
                      minWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Buy
                  </Table.HeaderCell>
                </>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(data).map((session_id, index) => (
              <Table.Row textAlign="center">
                <Table.Cell
                  style={{
                    width: "40%",
                    backgroundColor:
                      sessionId === session_id ? "#E4E7FF" : "none",
                  }}
                  onClick={() =>
                    updateSessionId(sessionId != session_id ? session_id : "")
                  }
                >
                  {session_id}
                </Table.Cell>
                <Table.Cell style={{ width: "13%" }}>
                  {data[session_id]?.date}
                </Table.Cell>
                {events ? (
                  events.map((value) => (
                    <Table.Cell>{data[session_id][value] || ""}</Table.Cell>
                  ))
                ) : (
                  <>
                    <Table.Cell>{data[session_id]?.pageView || ""}</Table.Cell>
                    <Table.Cell>{data[session_id]?.addToCart || ""}</Table.Cell>
                    <Table.Cell>{data[session_id]?.buy || ""}</Table.Cell>
                  </>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };

  const constructLabel = (label) => {
    switch (label) {
      default:
        return label;
    }
  };

  const constructSessionChart = (data, colorPalette) => {
    const series = {
      type: "bar",
    };
    let constructedData = [
      {
        data: [],
        label: "Price",
      },
    ];

    Object.keys(data).map((value) => {
      let object = {};
      object.primary = constructLabel(value);
      object.secondary = data[value];
      object.colorPalette = colorPalette;
      object.product_details = {
        event: value,
        price: data[value].toFixed(2),
      };
      constructedData[0].data.push(object);
    });

    return (
      <div className="horizontalFlex">
        <div className="sessionChart_wrapper">
          <h4 className="subHeading">Price by Event</h4>
          <div
            style={{
              height: "10rem",
              width: "32rem",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <p
              style={{
                position: "absolute",
                bottom: "-35px",
                left: "50%",
                fontFamily: "Poppins_Medium",
              }}
            >
              Price
            </p>
            <Chart
              data={constructedData}
              axes={[
                { primary: true, type: "ordinal", position: "left" },
                {
                  position: "bottom",
                  type: "linear",
                  stacked: true,
                  format: (num) =>
                    parseInt(num.replace(",", "")) >= 1000
                      ? parseInt(num.replace(",", "")) / 1000 + "K"
                      : num,
                },
              ]}
              series={series}
              tooltip={tooltip}
              getDatumStyle={getDatumStyle}
            />
          </div>
        </div>
      </div>
    );
  };

  const constructPerSessionChart = (data, vue_user, events, colorPalette) => {
    const series = {
      type: "bubble",
    };

    let dummyObject = {};
    events &&
      events.map((value) => {
        dummyObject[value] = {
          data: [],
        };
      });
    Object.keys(data).map((value) => {
      data[value].map((events) => {
        let object = {
          primary:
            events?.metadata[
              vue_user?.perSessionPayload?.group_by || "ontology"
            ],
          secondary: Date.parse(new Date(events?.timestamp)),
          colorPalette: colorPalette,
          radius: Math.min(Math.max(events?.metadata?.price / 40, 5), 30) || 5,
          product_details: {
            ...events?.metadata,
            event: constructLabel(events.event),
            timestamp: events?.timestamp,
          },
        };

        dummyObject[constructLabel(events.event)] &&
          dummyObject[constructLabel(events.event)].data.push(object);
      });
    });
    let constructedData = [];
    Object.keys(dummyObject).map((value) => {
      let object = {
        label: value,
        data: dummyObject[value].data,
      };
      constructedData.push(object);
    });

    return (
      <>
        <h4 className="subHeading">Per session events</h4>
        <div
          className="session_bubble_chart"
          style={{
            height: "540px",
            width: "100%",
            margin: "auto",
            padding: "2rem",
            marginBottom: "5rem",
            position: "relative",
          }}
        >
          {
            !!(constructedData[0]?.data?.length) && <>
              <p
              style={{
                position: "absolute",
                left: "-34px",
                top: "50%",
                transform: "rotate(-90deg)",
                fontFamily: "Poppins_Medium",
              }}
            >
              {vue_user?.perSessionPayload?.group_by.replace("_", " ") ||
                "Ontology"}
            </p>
              <p
                style={{
                  position: "absolute",
                  bottom: "-65px",
                  left: "60%",
                  fontFamily: "Poppins_Medium",
                }}
              >
                Time
              </p>
            </>
          }
          {
            !!(constructedData[0]?.data?.length) ? (<Chart
              data={constructedData}
              axes={[
                { primary: true, type: "ordinal", position: "left" },
                {
                  position: "bottom",
                  type: "linear",
                  stacked: false,
                  format: (num) => {
                    const date = new Date(parseInt(num.replaceAll(",", "")));
                    return moment(date).format("MMM D, h:mm a");
                  },
                },
              ]}
              series={series}
              tooltip={tooltip}
              getSeriesStyle={getSeriesStyle}
            />): (<DataMissingWrapper>No results found</DataMissingWrapper>)
          }
        </div>
      </>
    );
  };

  const buildWidgetArray = (
    context,
    vue_user,
    discover,
    API_KEY,
    user_id,
    mad_UUID,
    recommendation,
    sessionId,
    datePickerData
  ) => {
    let widget_arr = [];
    if (
      context.vue_user &&
      context.vue_user.userAffinityPage &&
      context.vue_user.userAffinityUrl &&
      context.vue_user.userAffinityUrl.length > 0
    ) {
      if (context.vue_user.vueX) {
        widget_arr.push({
          widgetList: ["user_affinity"],
          postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}&fields=["brand", "title", "image_link", "color", "autotags_boost","price", "ext_id","ontology","price"]`,
          recommendationUrl: context.vue_user.userAffinityUrl,
          vueX: true,
        });
      } else {
        widget_arr.push({
          widgetList: ["user_affinity"],
          postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}&fields=["brand", "title", "image_link", "color", "autotags_boost","price", "ext_id","ontology","price"]`,
          recommendationUrl: context.vue_user.userAffinityUrl,
        });
      }
    }

    if (
      context.vue_user &&
      context.vue_user.userAffinityPage &&
      context.vue_user.userHistoryUrl &&
      context.vue_user.userHistoryUrl.length > 0
    ) {
      if (context.vue_user.vueX) {
        widget_arr.push({
          widgetList: ["user_history"],
          postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}&fields=["brand", "title", "image_link", "color", "autotags_boost","price", "ext_id","ontology","price"]`,
          recommendationUrl: context.vue_user.userHistoryUrl,
          vueX: true,
          //postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}`,
          //recommendationUrl: context.vue_user.userHistoryUrl
        });
      } else {
        widget_arr.push({
          widgetList: ["user_history"],
          postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}&fields=["brand", "title", "image_link", "color", "autotags_boost","price", "ext_id","ontology","price"]`,
          recommendationUrl: context.vue_user.userHistoryUrl,
          //postBody: `api_key=${API_KEY}&mad_uuid=${mad_UUID}&user_id=${user_id}`,
          //recommendationUrl: context.vue_user.userHistoryUrl
        });
      }
    }

    // widget_arr.push({
    //   widgetList: ["7", "1", "11", "3"],
    //   postBody: `api_key=${API_KEY}&user_id=${user_id}&is_from_demo_site=true&cp_ensemble=true&details=true&duplicates=true&fields=["id","product_id","category","ontology","link","image_link","internal_image_url","small_image_link","brand"]&mad_uuid=${mad_UUID}&num_results=[50]&require_source=true&widget_list=[7,1,11,3]`,
    //   recommendationUrl: recommendation,
    // });
    widget_arr.push({
      configName: "discover",
      widgetList: ["7", "1", "11", "3"],
      // The post body will be converted to required request payload format in the fetch method
      postBody: {
        api_key: API_KEY,
        user_id: user_id,
        mad_uuid: mad_UUID,
        widget_list: [7, 1, 11, 3],
      },
      recommendationUrl: recommendation,
    });
    widget_arr.push({
      widgetList: ["user_session"],
      postBody: JSON.stringify({
        user_id: user_id,
        mad_uuid: mad_UUID,
        filters: [
          {
            field: "timestamp",
            from_date: changeDateFormat(
              datePickerData[0].startDate,
              "startDate"
            ),
            to_date: changeDateFormat(datePickerData[0].endDate, "endDate"),
          },
        ],
        ...context.vue_user?.userSessionPayload,
      }),
      recommendationUrl: `${context.vue_user.userSessionBaseUrl}/session_events`,
      vueX: true,
      contentType: "application/json",
    });
    widget_arr.push({
      widgetList: ["price_by_event"],
      postBody: JSON.stringify({
        user_id: user_id,
        mad_uuid: mad_UUID,
        session_id: sessionId ? sessionId : "",
        filters: [
          {
            field: "timestamp",
            from_date: changeDateFormat(
              datePickerData[0].startDate,
              "startDate"
            ),
            to_date: changeDateFormat(datePickerData[0].endDate, "endDate"),
          },
        ],
        ...context.vue_user?.priceByEventPayload,
      }),
      recommendationUrl: `${context.vue_user.userSessionBaseUrl}/event_by_price`,
      vueX: true,
      contentType: "application/json",
    });
    widget_arr.push({
      widgetList: ["time_delta"],
      postBody: JSON.stringify({
        user_id: user_id,
        mad_uuid: mad_UUID,
        session_id: sessionId || "",
        filters: [
          {
            field: "timestamp",
            from_date: changeDateFormat(
              datePickerData[0].startDate,
              "startDate"
            ),
            to_date: changeDateFormat(datePickerData[0].endDate, "endDate"),
          },
        ],
      }),
      recommendationUrl: `${context.vue_user.userSessionBaseUrl}/time_delta`,
      vueX: true,
      contentType: "application/json",
    });
    widget_arr.push({
      widgetList: ["per_session"],
      postBody: JSON.stringify({
        user_id: user_id,
        mad_uuid: mad_UUID,
        session_id: sessionId,
        group_by: "ontology",
        filters: [
          {
            field: "timestamp",
            from_date: changeDateFormat(
              datePickerData[0].startDate,
              "startDate"
            ),
            to_date: changeDateFormat(datePickerData[0].endDate, "endDate"),
          },
        ],
        fields: ["price", "brand"],
        ...context.vue_user?.perSessionPayload,
      }),
      recommendationUrl: `${context.vue_user.userSessionBaseUrl}/per_session_events`,
      vueX: true,
      contentType: "application/json",
    });
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
  };

  const fetchRelativeAffinity = (ontology) => {
    const context = JSON.parse(localStorage.getItem("userConfig"));
    const { API_KEY, mad_UUID, user_id, vue_user } = context;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };
    const reqPayLoad = JSON.stringify({
      api_key: API_KEY,
      mad_uuid: mad_UUID,
      user_id: user_id,
      ontology: ontology,
      filters: [
        {
          field: vue_user.fieldToFilterRelativeAffinityInProfilePage,
          type: "exact",
          value: ontology,
        },
      ],
      ...context.vue_user?.relativeAffinityPayload,
    });

    if (ontology !== "") {
      fetch(
        vue_user?.userRelativeAffinityUrl ||
          "https://robin-api-dev.madstreetden.com/dev/es/user_profile/relative_affinity",
        {
          headers,
          method: "POST",
          body: reqPayLoad,
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          if (response.data) {
            updateRelativeAffinity(response.data);
          }
        });
    }
  };

  return (
    <ConfigConsumer>
      {(context) => {
        const { vue_user, discover } = context;
        let API_KEY = context.API_KEY;
        let url = context.url;
        let user_id = localStorage.getItem("userId");
        if (!user_id) {
          user_id = context.user_id;
        }
        if (vue_user.API_KEY) {
          API_KEY = vue_user.API_KEY;
        }
        const discover_recommendation =
          discover && discover.recommendation
            ? discover.recommendation
            : url + "/widgets";

        const mad_UUID = getCookie("mad_UUID");
        const recommendation =
          vue_user && vue_user.recommendation
            ? vue_user.recommendation
            : discover_recommendation;
        if (!rendered.current && API_KEY && user_id && mad_UUID) {
          rendered.current = true;

          buildWidgetArray(
            context,
            vue_user,
            discover,
            API_KEY,
            user_id,
            mad_UUID,
            recommendation,
            sessionId,
            datePickerData
          );
        }

        return (
          <div>
            <RecommendedPdtsContainer
              recommendedWidgetList={currWidget}
              fallBack={fallBack}
            >
              <RecommendedPdtsConsumer>
                {(context) => {
                  const { loading, vue_user } = context;
                  let ontology_list = [];
                  let _userAffinityData = {};
                  let words = [];
                  let positive_words = [];
                  let negative_words = [];
                  if (context["absolute_affinity"]) {
                    if (
                      context["absolute_affinity"].positive ||
                      context["absolute_affinity"].negative
                    ) {
                      let positive_absolute_affinity =
                        context["absolute_affinity"].positive;
                      let negative_absolute_affinity =
                        context["absolute_affinity"].negative;
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
                        ontology_list.push(new_obj);
                        let new_positive_word = [];
                        let new_negative_word = [];

                        Object.keys(positive_words).length &&
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
                          Object.keys(negative_words).length > 0
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
                        _userAffinityData[each_facet] = {
                          word_cloud: new_positive_word,
                          negative_cloud: new_negative_word,
                          relative_affinity:
                            context["user_affinity"]?.relative_affinities[
                              each_facet
                            ],
                        };
                      }
                      if (ontology.length == 0 && ontology_list.length > 0) {
                        updateOntology(ontology_list[0].value);
                        updateUserAffinityData(_userAffinityData);
                        updateCurrentUserAffinityData(
                          _userAffinityData[ontology_list[0].value]
                        );
                      }
                    } else {
                      let absolute_affinity = context["absolute_affinity"];
                      for (let each_facet in absolute_affinity) {
                        let new_obj = {
                          key: each_facet,
                          value: each_facet,
                          text: each_facet,
                        };
                        if (absolute_affinity) {
                          words = absolute_affinity[each_facet];
                        }
                        ontology_list.push(new_obj);
                        let new_word = [];
                        Object.keys(words).map((category) => {
                          Object.keys(words[category]).map((value) => {
                            let _obj = {
                              text: value,
                              value: words[category][value]?.frequency?.toFixed(
                                2
                              ),
                              type: category,
                            };
                            new_word.push(_obj);
                          });
                        });
                        _userAffinityData[each_facet] = {
                          word_cloud: new_word,
                          relative_affinity:
                            context["user_affinity"]?.relative_affinities[
                              each_facet
                            ],
                        };
                      }
                      if (ontology.length == 0 && ontology_list.length > 0) {
                        updateOntology(ontology_list[0].value);
                        updateUserAffinityData(_userAffinityData);
                        updateCurrentUserAffinityData(
                          _userAffinityData[ontology_list[0].value]
                        );
                      }
                    }
                  }
                  if (context["user_history"] || context["user_session"]) {
                    if (context["user_history"]) {
                      if (!eventActiveTab) {
                        if (context["user_history"]["pageView"]) {
                          updateEventActiveTab("pageView");
                        } else if (context["user_history"]["addToCart"]) {
                          updateEventActiveTab("addToCart");
                        } else if (context["user_history"]["buy"]) {
                          updateEventActiveTab("buy");
                        } else if (context["user_history"]["addToWishlist"]) {
                          updateEventActiveTab("addToWishlist");
                        }
                      }
                      if (
                        context["7"]?.length ||
                        context["1"]?.length ||
                        context["3"]?.length ||
                        context["11"]?.length ||
                        context["22"]?.length
                      ) {
                        if (!activeTab) {
                          if (context["7"]?.length) {
                            updateTab("7");
                          } else if (context["1"]?.length) {
                            updateTab("1");
                          } else if (context["3"]?.length) {
                            updateTab("3");
                          } else if (context["11"]?.length) {
                            updateTab("11");
                          } else if (context["20"]?.length) {
                            updateTab("20");
                          }
                        }
                      }

                      let _date_grouped_events_obj = {};
                      let _user_history_events_grouped = {};
                      let _facets_obj = { brand: {}, ontology: {} };
                      let i = 1;
                      let user_history_clone = JSON.parse(
                        JSON.stringify(context["user_history"])
                      );
                      let user_history_array = [];
                      Object.keys(user_history_clone).forEach((event_name) => {
                        if (user_history_clone[event_name].length > 0) {
                          _user_history_events_grouped[event_name] =
                            user_history_clone[event_name].length;
                        }
                        for (let each_event of user_history_clone[event_name]) {
                          each_event["event"] = event_name;
                          each_event["epoch"] = each_event["epoch"] * 1000;
                          let date = new Date(each_event["epoch"]);
                          let formatted_date =
                            ("0" + date.getDate()).slice(-2) +
                            "-" +
                            ("0" + date.getMonth()).slice(-2) +
                            "-" +
                            date.getFullYear();
                          let time =
                            ("0" + date.getHours()).slice(-2) +
                            ":" +
                            ("0" + date.getMinutes()).slice(-2) +
                            ":" +
                            ("0" + date.getSeconds()).slice(-2);
                          each_event["time"] = time;
                          each_event["date"] = formatted_date;
                          if (
                            "ontology" in each_event &&
                            Array.isArray(each_event["ontology"]) &&
                            each_event["ontology"].length > 0
                          ) {
                            each_event["ontology"] = each_event["ontology"][0];
                          }

                          Object.keys(_facets_obj).forEach((facet_name) => {
                            if (
                              each_event[facet_name] in _facets_obj[facet_name]
                            ) {
                              _facets_obj[facet_name][
                                each_event[facet_name]
                              ] += 1;
                            } else {
                              _facets_obj[facet_name][
                                each_event[facet_name]
                              ] = 1;
                            }
                          });

                          user_history_array.push(each_event);
                        }
                      });

                      user_history_array.sort(function(a, b) {
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(a.epoch) - new Date(b.epoch);
                      });

                      for (let each_user_history of user_history_array) {
                        if (
                          each_user_history["date"] in
                            _date_grouped_events_obj &&
                          _date_grouped_events_obj[each_user_history["date"]]
                        ) {
                          if (
                            each_user_history["event"] in
                            _date_grouped_events_obj[each_user_history["date"]]
                          ) {
                            _date_grouped_events_obj[each_user_history["date"]][
                              each_user_history["event"]
                            ].push(each_user_history);
                          } else {
                            _date_grouped_events_obj[each_user_history["date"]][
                              each_user_history["event"]
                            ] = [each_user_history];
                          }
                        } else {
                          _date_grouped_events_obj[
                            each_user_history["date"]
                          ] = {};
                          _date_grouped_events_obj[each_user_history["date"]][
                            each_user_history["event"]
                          ] = [each_user_history];
                        }
                      }

                      if (!userHistoryChanged.current) {
                        userHistoryChanged.current = true;
                        updateUserHistoryGrouped(_date_grouped_events_obj);
                        updateUserHistoryEventsGrouped(
                          _user_history_events_grouped
                        );
                        updateCumulativeFacetChartData(_facets_obj);
                      }
                    }
                    let clientName = localStorage.getItem("userConfig");
                    clientName = JSON.parse(clientName).client_name;
                    let mappingLabels = {
                      0: "colour & pattern",
                      1: "colour & shape",
                      2: "pattern",
                      3: "colour",
                      4: "pattern & shape",
                      5: "shape",
                    };

                    if (clientName == "2321_grocery-demo") {
                      mappingLabels = {
                        0: "Generic & Packaging",
                        1: "Generic & Content",
                        2: "Packaging",
                        3: "Generic",
                        4: "Packaging & Content",
                        5: "Content",
                      };
                    }

                    const callbacks = {
                      getWordTooltip: (word) =>
                        `${word.text}\nCategory: ${word.type}\nValue: ${word.value}`,
                    };
                    let events = [];
                    let colorPalette = {};
                    if (
                      context["user_session"] &&
                      context["price_by_event"] &&
                      context["time_delta"]
                    ) {
                      events = Object.keys(context["price_by_event"]);
                      events.map((value, index) => {
                        colorPalette[value] = colors[index];
                      });
                    }
                    return (
                      <>
                        {context["user_session"] && context["time_delta"] && (
                          <>
                            <LoadingPersonalisedResults
                              style={{
                                marginBottom: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>Customer Journey</span>
                              <div style={{ position: "relative" }}>
                                <DateFilterButton
                                  onClick={() => {
                                    updateDatePickerPopupState(
                                      !datePickerPopupState
                                    );
                                  }}
                                >
                                  From{" "}
                                  {changeDateFormat(
                                    datePickerData[0].startDate,
                                    "startDate"
                                  )}{" "}
                                  To{" "}
                                  {changeDateFormat(
                                    datePickerData[0].endDate,
                                    "endDate"
                                  )}
                                </DateFilterButton>
                                <DatePickerPopUpContent
                                  datePickerPopupState={datePickerPopupState}
                                  updateDatePickerData={updateDatePicker}
                                  datePickerDefaultData={datePickerData}
                                  updateDatePickerPopupState={
                                    updateDatePickerPopupState
                                  }
                                />
                              </div>
                            </LoadingPersonalisedResults>
                            {sessionId && (
                              <ResultsFor>
                                Showing results for session Id&nbsp;
                                <span>{sessionId}</span>
                                <button onClick={() => updateSessionId("")}>
                                  Show All Sessions
                                </button>
                              </ResultsFor>
                            )}

                            <SessionContainer>
                              <div className="horizontalFlex">
                                {context["user_session"] &&
                                  constructSessionTable(
                                    context["user_session"],
                                    events
                                  )}
                                <div className="verticalFlex">
                                  {context["price_by_event"] &&
                                    constructSessionChart(
                                      context["price_by_event"],
                                      colorPalette
                                    )}
                                  {context["time_delta"] && (
                                    <div className="horizontalFlex">
                                      <div
                                        className="sessionChart_wrapper"
                                        style={{ position: "relative" }}
                                      >
                                        <h4 className="subHeading">
                                          Time Delta
                                        </h4>
                                        <p className="time_delta">
                                          {context["time_delta"] === "None"
                                            ? ""
                                            : context["time_delta"]}
                                        </p>
                                      </div>
                                      {!!Object.keys(colorPalette).length && (
                                        <div className="sessionChart_wrapper">
                                          <h4 className="subHeading">
                                            User Events
                                          </h4>
                                          <table
                                            style={{ borderSpacing: "5px" }}
                                          >
                                            {Object.keys(colorPalette).map(
                                              (value) => (
                                                <tr>
                                                  <td>{value}</td>
                                                  <td
                                                    style={{
                                                      width: "20px",
                                                      height: "20px",
                                                      marginLeft: "10px",
                                                      backgroundColor:
                                                        colorPalette[value],
                                                      display: "inline-block",
                                                      verticalAlign: "middle",
                                                    }}
                                                  ></td>
                                                </tr>
                                              )
                                            )}
                                          </table>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {!!(context["per_session"]) &&
                                constructPerSessionChart(
                                  context["per_session"],
                                  vue_user,
                                  events,
                                  colorPalette
                                )}
                            </SessionContainer>
                          </>
                        )}

                        {/* Divider */}
                        {context["user_session"] &&
                        context["price_by_event"] &&
                        context["time_delta"] &&
                        userHistoryGrouped &&
                        Object.keys(userHistoryGrouped).length > 0 ? (
                          <Divider />
                        ) : null}

                        {!!(context["user_history"]) && (
                          <>
                            {context["user_history"] &&
                              userHistoryGrouped &&
                              Object.keys(userHistoryGrouped).length > 0 && (
                                <LoadingPersonalisedResults>
                                  User History
                                </LoadingPersonalisedResults>
                              )}
                            {constructEventsReactChart()}
                            {constructCumulativeFacetsReactChart()}
                            {userHistoryGrouped &&
                            Object.keys(userHistoryGrouped).length > 0 ? (
                              <div
                                style={{
                                  margin: "auto",
                                  width: "50%",
                                  padding: "2rem 2rem",
                                  marginBottom: "4rem",
                                }}
                              >
                                <h4 style={{ textAlign: "center" }}>
                                  Day wise events
                                </h4>
                                <Table celled size={"small"}>
                                  {constructTableHeader()}
                                  {constructUserHistoryTable(
                                    userHistoryGrouped
                                  )}
                                </Table>
                                {constructReactChart()}
                              </div>
                            ) : null}

                            {!!(context["user_history"][eventActiveTab]) && (
                              <ProductRecommendationWrapper>
                                <PdtRecommendationTabsWrapper>
                                  {constructEventPdtTabs(
                                    context["user_history"],
                                    eventActiveTab,
                                    updateEventActiveTab
                                  )}
                                </PdtRecommendationTabsWrapper>
                                <ProductCarousel
                                  list={
                                    context["user_history"][eventActiveTab] ||
                                    []
                                  }
                                  hideMSDOntology={true}
                                  sliderPerGroup={
                                    vue_user.styleConfig?.card?.cards_per_row ||
                                    cardStyleConfig.card.cards_per_row
                                  }
                                  styleConfig={
                                    vue_user.styleConfig || cardStyleConfig
                                  }
                                  metaData={
                                    vue_user?.styleConfig?.card?.metaData
                                  }
                                  showMetaData={
                                    vue_user?.styleConfig?.card?.show_meta_data
                                  }
                                />
                              </ProductRecommendationWrapper>
                            )}

                            {!!(context["1"] ||
                              context["3"] ||
                              context["7"] ||
                              context["11"] ||
                              context["20"]) && (
                              <ProductRecommendationWrapper
                                styleConfig={
                                  vue_user.styleConfig || cardStyleConfig
                                }
                                isHorizontal={
                                  vue_user?.styleConfig?.card?.orientation
                                    ?.horizontal ||
                                  cardStyleConfig.card.orientation.horizontal
                                }
                              >
                                <PdtRecommendationTabsWrapper>
                                  {constructPdtTabs(
                                    context,
                                    activeTab,
                                    updateTab
                                  )}
                                </PdtRecommendationTabsWrapper>
                                <ProductCarousel
                                  list={context[activeTab] || []}
                                  hideMSDOntology={true}
                                  sliderPerGroup={
                                    vue_user.styleConfig?.card?.cards_per_row ||
                                    cardStyleConfig.card.cards_per_row
                                  }
                                  metaData={
                                    vue_user?.styleConfig?.card?.metaData
                                  }
                                  showMetaData={
                                    vue_user?.styleConfig?.card?.show_meta_data
                                  }
                                  styleConfig={
                                    vue_user.styleConfig || cardStyleConfig
                                  }
                                />
                              </ProductRecommendationWrapper>
                            )}

                            {/* Divider */}
                            {!!(context["1"] ||
                              context["3"] ||
                              context["7"] ||
                              context["11"] ||
                              context["20"]) &&
                            ontology_list?.length ? (
                              <Divider />
                            ) : null}
                          </>
                        )}

                        {!!(ontology_list?.length) && (
                          <DropDownContainer>
                            <LoadingPersonalisedResults>
                              User Affinitiy
                            </LoadingPersonalisedResults>
                            <div
                              style={{
                                width: "300px",
                                marginLeft: "30px",
                                marginTop: "20px",
                              }}
                            >
                              <Dropdown
                                placeholder="Select Facet"
                                fluid
                                search
                                selection
                                options={ontology_list}
                                onChange={onOntologyChange}
                                defaultValue={
                                  ontology_list[0] && ontology_list[0].value
                                    ? ontology_list[0].value
                                    : ""
                                }
                              />
                            </div>
                          </DropDownContainer>
                        )}
                        {currentUserAffinityData &&
                        currentUserAffinityData["word_cloud"] ? (
                          <UserDataAffinityContainer>
                            <SpiderBlockContainer>
                              <h4>Relative Affinity</h4>
                              <SpiderBlock
                                recommendedData={context}
                                clientName={context?.client_name}
                                relative_affinity={
                                  relativeAffinity || context?.relative_affinity
                                }
                              />
                            </SpiderBlockContainer>

                            <WordCloudContainer
                              type={
                                currentUserAffinityData["negative_cloud"]
                                  ? "positive"
                                  : ""
                              }
                            >
                              <h4>
                                {capitalize(
                                  currentUserAffinityData["negative_cloud"]
                                    ? "positive"
                                    : ""
                                )}{" "}
                                Absolute Affinity
                              </h4>
                              <ReactWordcloud
                                words={currentUserAffinityData["word_cloud"]}
                                options={{
                                  fontFamily: "Poppins_Semi_Bold",
                                  rotationAngles: [0, 90],
                                  fontSizes: [20, 30],
                                }}
                                callbacks={callbacks}
                              />
                            </WordCloudContainer>

                            {!!(
                              currentUserAffinityData["negative_cloud"] &&
                              currentUserAffinityData["negative_cloud"].length
                            ) && (
                              <WordCloudContainer type="negative">
                                <h4>Negative Absolute Affinity</h4>
                                <ReactWordcloud
                                  words={
                                    currentUserAffinityData["negative_cloud"]
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
                            {currentUserAffinityData["relative_affinity"] ? (
                              <>
                                <SparkLineContainer>
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][0]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="red" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][0].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[0]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][1]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="blue" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][1].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[1]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][2]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="green" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][2].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[2]}</p>
                                  ) : null}
                                </SparkLineContainer>
                                <SparkLineContainer>
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][3]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="orange" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][3].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[3]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][4]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="purple" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][4].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[4]} </p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][5]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="gray" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][5].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[5]}</p>
                                  ) : null}
                                </SparkLineContainer>{" "}
                              </>
                            ) : null}
                          </UserDataAffinityContainer>
                        ) : null}
                      </>
                    );
                  }
                  if (
                    context["7"]?.length ||
                    context["1"]?.length ||
                    context["3"]?.length ||
                    context["11"]?.length ||
                    context["20"]?.length
                  ) {
                    if (!activeTab) {
                      if (context["7"]?.length) {
                        updateTab("7");
                      } else if (context["1"]?.length) {
                        updateTab("1");
                      } else if (context["3"]?.length) {
                        updateTab("3");
                      } else if (context["11"]?.length) {
                        updateTab("11");
                      } else if (context["20"]?.length) {
                        updateTab("20");
                      }
                    }

                    let clientName = localStorage.getItem("userConfig");
                    clientName = JSON.parse(clientName).client_name;

                    let mappingLabels = {
                      0: "colour & pattern",
                      1: "colour & shape",
                      2: "pattern",
                      3: "colour",
                      4: "pattern & shape",
                      5: "shape",
                    };

                    if (clientName == "2321_grocery-demo") {
                      mappingLabels = {
                        0: "Generic & Packaging",
                        1: "Generic & Content",
                        2: "Packaging",
                        3: "Generic",
                        4: "Packaging & Content",
                        5: "Content",
                      };
                    }
                    return (
                      <>
                        {/* <AffinityButton><Button color='blue' onClick={show}>Show Affinity</Button></AffinityButton>
                                    <Modal size='large' open={isModal} onClose={close}>
                                        <Modal.Header>User Affinity Data</Modal.Header>
                                        <Modal.Content>
                                            
                                        </Modal.Content>
                                    </Modal> */}
                        <ProductRecommendationWrapper>
                          <PdtRecommendationTabsWrapper>
                            {constructPdtTabs(context, activeTab, updateTab)}
                          </PdtRecommendationTabsWrapper>
                          <ProductCarousel
                            list={context[activeTab] || []}
                            hideMSDOntology={true}
                            sliderPerGroup={
                              vue_user.styleConfig?.card?.cards_per_row ||
                              cardStyleConfig.card.cards_per_row
                            }
                            metaData={vue_user?.styleConfig?.card?.metaData}
                            showMetaData={
                              vue_user?.styleConfig?.card?.show_meta_data
                            }
                            styleConfig={
                              vue_user.styleConfig || cardStyleConfig
                            }
                          />
                        </ProductRecommendationWrapper>
                        {!!(ontology_list?.length) && (
                          <DropDownContainer>
                            <LoadingPersonalisedResults>
                              User Affinitiy
                            </LoadingPersonalisedResults>
                            <Dropdown
                              placeholder="Select Facet"
                              fluid
                              search
                              selection
                              options={ontology_list}
                              onChange={onOntologyChange}
                              defaultValue={ontology}
                            />
                          </DropDownContainer>
                        )}
                        {currentUserAffinityData &&
                        currentUserAffinityData["word_cloud"] ? (
                          <UserDataAffinityContainer>
                            <SpiderBlockContainer>
                              <SpiderBlock
                                recommendedData={context}
                                clientName={context?.client_name}
                                relative_affinity={
                                  relativeAffinity || context?.relative_affinity
                                }
                              />
                            </SpiderBlockContainer>

                            <WordCloudContainer>
                              <ReactWordcloud
                                words={currentUserAffinityData["word_cloud"]}
                              />
                            </WordCloudContainer>
                            {currentUserAffinityData["relative_affinity"] ? (
                              <>
                                <SparkLineContainer>
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][0]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="red" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][0].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[0]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][1]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="blue" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][1].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[1]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][2]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="green" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][2].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[2]}</p>
                                  ) : null}
                                </SparkLineContainer>
                                <SparkLineContainer>
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][3]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="orange" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][3].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[3]}</p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][4]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="purple" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][4].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[4]} </p>
                                  ) : null}
                                  <Sparklines
                                    data={
                                      currentUserAffinityData[
                                        "relative_affinity"
                                      ][5]
                                    }
                                    height={60}
                                    width={180}
                                  >
                                    <SparklinesLine color="gray" />
                                  </Sparklines>
                                  {currentUserAffinityData[
                                    "relative_affinity"
                                  ][5].length > 1 ? (
                                    <p> &nbsp; {mappingLabels[5]}</p>
                                  ) : null}
                                </SparkLineContainer>{" "}
                              </>
                            ) : null}
                          </UserDataAffinityContainer>
                        ) : null}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {loading ? (
                          <LoaderContainer>
                            <LoaderIcon src={LoaderGIF} alt="Mask Loader" />
                          </LoaderContainer>
                        ) : null}
                      </>
                    );
                  }
                }}
              </RecommendedPdtsConsumer>
            </RecommendedPdtsContainer>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

const constructEventPdtTabs = (context, activeTab, updateTab) => {
  const pdtTabs = [];

  if (context["pageView"] && context["pageView"].length > 0) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "pageView"}
        onClick={(e) => updateTab("pageView")}
        key="tab_pageView"
      >
        Page View
      </PdtRecommendationTabs>
    );
  }
  if (context["buy"] && context["buy"].length > 0) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "buy"}
        onClick={(e) => updateTab("buy")}
        key="tab_buy"
      >
        Buy
      </PdtRecommendationTabs>
    );
  }
  if (context["addToCart"] && context["addToCart"].length > 0) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "addToCart"}
        onClick={(e) => updateTab("addToCart")}
        key="tab_addToCart"
      >
        Add To Cart
      </PdtRecommendationTabs>
    );
  }
  if (context["addToWishlist"] && context["addToWishlist"].length > 0) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "addToWishlist"}
        onClick={(e) => updateTab("addToWishlist")}
        key="tab_addToWishlist"
      >
        Add To Wishlist
      </PdtRecommendationTabs>
    );
  }
  return pdtTabs;
};

const constructPdtTabs = (context, activeTab, updateTab) => {
  const {
    recentlyVisited,
    recommendation,
    browsingHistory,
    aiStylePicks,
  } = UserDataAttrs;
  const pdtTabs = [];

  if (context["7"]?.length) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "7"}
        onClick={(e) => updateTab("7")}
        key="tab_visited"
      >
        {recentlyVisited}
      </PdtRecommendationTabs>
    );
  }
  if (context["1"]?.length) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "1"}
        onClick={(e) => updateTab("1")}
        key="tab_history"
      >
        {browsingHistory}
      </PdtRecommendationTabs>
    );
  }
  if (context["11"]?.length) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "11"}
        onClick={(e) => updateTab("11")}
        key="tab_recommended"
      >
        {recommendation}
      </PdtRecommendationTabs>
    );
  }
  if (context["3"]?.length) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "3"}
        onClick={(e) => updateTab("3")}
        key="tab_trending"
      >
        Trending
      </PdtRecommendationTabs>
    );
  }
  if (context["20"]?.length) {
    pdtTabs.push(
      <PdtRecommendationTabs
        isActive={activeTab === "20"}
        onClick={(e) => updateTab("20")}
        key="tab_aiStylePicks"
      >
        {aiStylePicks}
      </PdtRecommendationTabs>
    );
  }
  return pdtTabs;
};

const DatePickerPopUpContent = ({
  datePickerPopupState,
  datePickerDefaultData,
  updateDatePickerData,
  updateDatePickerPopupState,
}) => {
  const [datePickerData, updateDatePicker] = useState(datePickerDefaultData);
  return (
    <>
      <DatePickerOverlay
        datePickerPopupState={datePickerPopupState}
        onClick={() => updateDatePickerPopupState(false)}
      />
      <DatePickerPopUp datePickerPopupState={datePickerPopupState}>
        <DatePickerPopUpHeader>
          <h3>Date Filter</h3>
          <button
            className="applyBtn"
            onClick={() => {
              updateDatePickerData(datePickerData);
              updateDatePickerPopupState(false);
            }}
          >
            Apply
          </button>
        </DatePickerPopUpHeader>
        <DateRangePicker
          onChange={(item) => {
            updateDatePicker([item.selection]);
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={datePickerData}
          direction="horizontal"
          preventSnapRefocus={true}
        />
      </DatePickerPopUp>
    </>
  );
};

const ConstructOntologyDropdown = (props) => {
  const { ontology, updateOntology } = props;
  return (
    <RecommendedPdtsConsumer>
      {(context) => {
        const { loading } = context;
        let ontology_list = [];
        if (context["user_affinity"] && ontology.length > 0) {
          let absolute_affinity =
            context["user_affinity"]["absolute_affinities"];
          for (let each_facet in absolute_affinity) {
            let new_obj = {
              key: each_facet,
              value: each_facet,
              flag: each_facet,
              text: each_facet,
            };
            ontology_list.push(new_obj);
          }
          if (ontology_list && ontology_list.length > 0) {
            //updateOntology(ontology_list[0])
          }
        }
        return (
          <>
            <Dropdown
              placeholder="Select Facet"
              fluid
              search
              selection
              options={ontology_list}
            />
          </>
        );
      }}
    </RecommendedPdtsConsumer>
  );
};

export {
  UserInputSection,
  ProductRecommendationSection,
  ConstructOntologyDropdown,
};
