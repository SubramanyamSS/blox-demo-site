import React, { lazy, Suspense, useEffect } from "react";
import { Global } from "../../common";
import Header from "../Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  ConfigContainer,
  HeaderConfigContainer,
  PlayerContainer,
} from "../../container";
import { Mask } from "../../component";
import "./App.css";
import OcrExtractionDashboard from "../OcrExtraction";
const VueFind = lazy(() => import("../VueFind"));
const Discover = lazy(() => import("../Discover"));
const ProductDetails = lazy(() => import("../ProductDetails"));
const ImageSearch = lazy(() => import("../ImageSearch"));
const VueTag = lazy(() => import("../VueTag"));
const Settings = lazy(() => import("../Settings"));
const Signin = lazy(() => import("../Signin"));
const UserProfile = lazy(() => import("../UserProfile"));
const AddToCart = lazy(() => import("../AddToCart"));
const Wishlist = lazy(() => import("../Wishlist"));
const Collections = lazy(() => import("../Curations/Collections"));
const ProductList = lazy(() => import("../Curations/ProductList"));
const OrderConfirmation = lazy(() => import("../OrderConfirmation"));
const Segments = lazy(() => import("../Segments"));
const SegmentDetail = lazy(() => import("../SegmentDetail"));
const BloxRedirect = lazy(() => import("../Redirect"));
const Tagging = lazy(() => import("../Tagging"));
const TaggingCategory = lazy(() => import("../TaggingCategory"));
const Invoices = lazy(() => import("../Invoices"));
const InvoiceTagging = lazy(() => import("../InvoiceTagging"));
const OcrExtraction = lazy(() => import("../OcrExtraction"));
const Configurator = lazy(() => import("../OcrExtraction/Configurator"));
const QA = lazy(() => import("../QA"));

const App = (props) => {
  const userAuthConfig = localStorage.getItem("userConfig");
  let AuthJSON =
    userAuthConfig && userAuthConfig.trim().length
      ? JSON.parse(userAuthConfig)
      : {};
  const ScriptLink = document.createElement("script");
  ScriptLink.type = "text/javascript";
  // D3 charts
  const d3ScriptLink = document.createElement("script");
  d3ScriptLink.type = "text/javascript";
  d3ScriptLink.src =
    "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js";
  document.head.append(d3ScriptLink);
  if (AuthJSON && AuthJSON.pixel_url && AuthJSON.pixel_url.trim().length > 5) {
    ScriptLink.src = AuthJSON.pixel_url;
    document.head.append(ScriptLink);
  }
  let is_hyphen_user = false;
  let redirect_path = "/signin";
  if (window.location.href.includes("hyphen")) {
    is_hyphen_user = true;
    redirect_path = "/hyphen/signin";
  }

  return (
    <ConfigContainer>
      <HeaderConfigContainer>
        <PlayerContainer>
          <Global />
          <Router>
            <Header is_hyphen={is_hyphen_user} />
            <Suspense fallback={<Mask />}>
              <Switch>
                <Route
                  exact
                  path="/hyphen/signin"
                  component={() => <Signin is_hyphen_user={true} />}
                />
                <Route
                  exact
                  path="/signin"
                  component={() => <Signin is_hyphen_user={false} />}
                />
                <Route exact path="/redirect" component={BloxRedirect} />

                <Route exact path="/discover" component={Discover} />
                <Route
                  exact
                  path="/product-display"
                  component={ProductDetails}
                />
                <Route exact path="/image-search" component={ImageSearch} />
                <Route exact path="/tagging_v2" component={Segments} />
                <Route exact path="/qa" component={QA} />
                <Route
                  exact
                  path="/tagging/ocr-extraction/:imageHash?"
                  component={OcrExtractionDashboard}
                />
                <Route
                  exact
                  path="/invoices/:category/:libIndex?/result/:imageHash?/:ponumber?"
                  component={InvoiceTagging}
                />
                <Route
                  exact
                  path="/invoices/:category?"
                  component={Invoices}
                />
                <Route
                  path="/tagging/:category/:libIndex?/result"
                  component={TaggingCategory}
                />
                <Route exact path="/tagging/:category?" component={Tagging} />
                <Route
                  exact
                  path="/segments/:segmentName"
                  component={SegmentDetail}
                />
                <Route exact path="/vuefind/:category" component={VueFind} />
                <Route exact path="/configuration" component={Settings} />
                <Route exact path="/user-profile" component={UserProfile} />
                <Route exact path="/cart" component={AddToCart} />
                <Route exact path="/wishlist" component={Wishlist} />
                <Route exact path="/curations" component={Collections} />
                <Route exact path="/curation" component={ProductList} />

                <Route
                  exact
                  path="/order_confirmation"
                  component={OrderConfirmation}
                />
                <Route render={() => <Redirect to="/signin" />} />
              </Switch>
              {(AuthJSON && Object.keys(AuthJSON).length) ||
              window.document.location.pathname ? null : (
                <Redirect to={redirect_path} />
              )}
            </Suspense>
          </Router>
        </PlayerContainer>
      </HeaderConfigContainer>
    </ConfigContainer>
  );
};

export { App };
