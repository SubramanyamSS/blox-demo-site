import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icon, Dropdown } from "semantic-ui-react";
import {
  HeaderWrapper,
  HeaderLogoWrapper,
  HeaderLogo,
  HeaderListWrapper,
  SignoutBtn,
  VueLogoEl,
  VueFindContainer,
  DataImageBlock,
  IconWapper,
  PdtCountWrapper,
  MainMenuContainer,
} from "./styled";
import { VueFindWrapper } from "../VueFind/styled";
import { RenderDropDown, RenderSearch } from "../VueFind/renderProps";
import { HeaderVueContent, DefaultUserUrl } from "../../configs";
import { menuConfig } from './menuConfig';
import LogoImg from "../../static/svg/blox_logo.svg";
import VueTagHyphen from "../../static/img/HYPHEN_ITALIA.png";
import { deleteCookie } from "../../common";
import "semantic-ui-css/semantic.min.css";

import { TextWithIcon } from "../../component";
import { ConfigConsumer, HeaderConfigConsumer } from "../../container";

const redirectToCartPage = () => {
  window.location.href = "/cart";
};

const redirectToWishlistPage = () => {
  window.location.href = "/wishlist";
};

const pageRedirection = (redirectionLink) => {
  window.location.href = `/${redirectionLink}`;
};

const logout = (is_hyphen_user, userSignout) => {
  fetch(userSignout)
    // fetch("https://demo.vue.ai/api/signout/")
    .then((data) => data.json())
    .then((resp) => {
      if (resp && resp.status && resp.status.toLowerCase() === "success") {
        localStorage.removeItem("userConfig");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("cart_items");
        localStorage.removeItem("wishlist_items");
        deleteCookie("mad_UUID");
        if (is_hyphen_user) {
          document.location.href = "/hyphen/signin";
        } else {
          document.location.href = "/signin";
        }
      }
    })
    .catch((err) => console.log(err));
};

/**
 * Handles the logo click event for home page redirection
 *
 * @param      {<type>}  clientName    The client name
 * @param      {string}  isHyphenUser  Indicates if hyphen user
 * @return     {string}  { description_of_the_return_value }
 */
const handleLogoClick = (clientName, isHyphenUser, redirectPath) => {
  let url = redirectPath;
  if (!clientName) {
    url = isHyphenUser ? "/hyphen/signin" : "/signin";
  }
  return url;
};

const Header = (props) => {
  let location = useLocation();
  const [currentPath, updateCurrentPath] = useState("/discover");
  const { is_hyphen } = props;
  useEffect(() => {
    updateCurrentPath(location.pathname);
  }, [location]);

  return (
    <ConfigConsumer>
      {(context) => {
        const userAuth = context;
        const client = context.userName || context.client_name;
        const userSignout = DefaultUserUrl
          ? DefaultUserUrl.endPoint + DefaultUserUrl.signout
          : "";
        const is_hyphen_user =
          context && context.client_name === "tag_hyphen" ? true : is_hyphen;
        let headerMenuConfig = context?.config?.header_menu || menuConfig;
        const HeaderList = Object.keys(headerMenuConfig).map(
          (HeaderItem, key) => {
            if (
              headerMenuConfig[HeaderItem] &&
              headerMenuConfig[HeaderItem].active
            ) {
              return (
                <TextWithIcon
                  parentKey={HeaderItem}
                  key={`Header_Menu_${key}`}
                  {...headerMenuConfig[HeaderItem]}
                  isCurrentPath={
                    headerMenuConfig[HeaderItem].paths.indexOf(currentPath) !==
                    -1
                  }
                />
              );
            }
            return null;
          }
        );

        const productList = () => {
          const products = context.products.products.children;
          let productArray = [];
          for (let key in products) {
            productArray.push(products[key]);
          }
          return productArray;
        };

        const settingList = () => {
          const settings = {
            profile: {
              value: "user-profile",
              text: "Profile",
              title: "Profile",
              key: "user-profile",
            },
            logout: {
              value: "logout",
              text: "Log out",
              title: "Log out",
              key: "logout",
            },
          };
          if (context.config && context.config.active) {
            settings.config = {
              value: "configuration",
              text: "Configuration",
              title: "Configuration",
              key: "configuration",
            };
          }
          let settingsArray = [];
          let logout = null;
          for (let key in settings) {
            if (settings[key]?.key === "logout") logout = settings?.logout;
            else settingsArray.push(settings[key]);
          }
          settingsArray.push(logout);
          return settingsArray;
        };

        let client_display_name = "Hi, " + client;
        const redirectPath = context.redirect_path
          ? context.redirect_path
          : "/discover";
        return (
          <>
            <HeaderWrapper isHyphen={is_hyphen_user}>
              <HeaderLogoWrapper>
                <DataImageBlock
                  to={handleLogoClick(client, is_hyphen_user, redirectPath)}
                >
                  <HeaderLogo src={LogoImg} alt="vue.ai" title="vue.ai" />
                </DataImageBlock>
              </HeaderLogoWrapper>
              {userAuth && client && (
                <MainMenuContainer>{HeaderList}</MainMenuContainer>
              )}
              <HeaderListWrapper>
                {is_hyphen_user ? (
                  <VueLogoEl
                    src={VueTagHyphen}
                    alt="Vue Tag Hyphen"
                    title="Hypehn"
                  />
                ) : null}
                {userAuth && client ? (
                  <>
                    <Dropdown
                      simple
                      item
                      text={client_display_name}
                      options={settingList()}
                      onChange={(e, data) => {
                        data.value != "logout"
                          ? pageRedirection(data.value)
                          : logout(is_hyphen_user, userSignout);
                      }}
                    />
                    <IconWapper onClick={redirectToWishlistPage}>
                      <Icon
                        name="heart"
                        size="large"
                        onClick={redirectToWishlistPage}
                        color="grey"
                        style={{ marginRight: "10px" }}
                      />
                      <HeaderConfigConsumer>
                        {(context) => {
                          const { count } = context[1];
                          return count > 0 ? (
                            <PdtCountWrapper>
                              <div>{count}</div>
                            </PdtCountWrapper>
                          ) : null;
                        }}
                      </HeaderConfigConsumer>
                    </IconWapper>
                    <IconWapper onClick={redirectToCartPage}>
                      <Icon
                        name="shopping cart"
                        size="large"
                        onClick={redirectToCartPage}
                        color="grey"
                      />
                      <HeaderConfigConsumer>
                        {(context) => {
                          const { count } = context[0];
                          return count > 0 ? (
                            <PdtCountWrapper>
                              <div>{count}</div>
                            </PdtCountWrapper>
                          ) : null;
                        }}
                      </HeaderConfigConsumer>
                    </IconWapper>
                    {/* <IconWapper isLogoutButton={true}>
                      <SignoutBtn
                        isHyphen={is_hyphen_user}
                        onClick={(e) => {
                          // fetch(userSignout)
                          fetch("https://demo.vue.ai/api/signout/")
                            .then((data) => data.json())
                            .then((resp) => {
                              if (
                                resp &&
                                resp.status &&
                                resp.status.toLowerCase() === "success"
                              ) {
                                localStorage.removeItem("userConfig");
                                localStorage.removeItem("userName");
                                localStorage.removeItem("userId");
                                localStorage.removeItem("cart_items");
                                localStorage.removeItem("wishlist_items");
                                //deleteCookie("mad_UUID")
                                if (is_hyphen_user) {
                                  document.location.href = "/hyphen/signin";
                                } else {
                                  document.location.href = "/signin";
                                }
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Sign Out
                      </SignoutBtn>
                    </IconWapper> */}
                  </>
                ) : null}
              </HeaderListWrapper>
            </HeaderWrapper>
          </>
        );
      }}
    </ConfigConsumer>
  );
};

export { Header };
