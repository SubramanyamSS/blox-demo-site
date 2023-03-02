import React, { useState } from "react";
import {
  SigninWrapper,
  SigninCont,
  SigninImgTitleEl,
  SigninTitleEl,
  SigninForm,
  InputWrapper,
  LabelEl,
  ErrorIcon,
  VueTagHyphenBanner,
  VueTagHyphenHeader,
  VueTagHyphenContent,
  VueTagHyphenMadStreetDenContent,
  GuidelinesContent,
} from "./styled";
import LogoEl from "../../static/svg/blox_logo.svg";
import UserSvg from "../../static/svg/user.svg";
import passwordSvg from "../../static/svg/password.svg";
import { Input } from "../../component";
import { RenderErrorBlock, makeAjax as makeLoginApi } from "./renderProps";
import { ConfigConsumer } from "../../container";
import { Redirect } from "react-router-dom";
import { getCookie, generate_uuid, setCookie } from "../../common";

const Signin = (props) => {
  const [userNameEr, updateUsernameEr] = useState(false);
  const [passwordEr, updatePasswordEr] = useState(false);
  const [signinErr, updateSigninErr] = useState("");
  const { is_hyphen_user } = props;
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  return (
    <ConfigConsumer>
      {(context) => {
        const { updateConfig } = context;
        let redirectPath = "/discover";
        if (context && context.redirect_path) {
          redirectPath = context.redirect_path;
        }
        let userAuthConfig = localStorage.getItem("userConfig");
        let AuthJSON =
          userAuthConfig && userAuthConfig.trim().length
            ? JSON.parse(userAuthConfig.trim())
            : {};
        return AuthJSON && Object.keys(AuthJSON).length ? (
          <Redirect to={redirectPath} />
        ) : (
          <>
            {is_hyphen_user ? (
              <VueTagHyphenBanner>
                <VueTagHyphenHeader>Ai Tag Management</VueTagHyphenHeader>
                <VueTagHyphenMadStreetDenContent>
                  Powered by Mad Street Den Vue.ai
                </VueTagHyphenMadStreetDenContent>
              </VueTagHyphenBanner>
            ) : null}
            <SigninWrapper>
              <SigninCont>
                {!is_hyphen_user ? (
                  <>
                    <SigninImgTitleEl
                      src={LogoEl}
                      alt="Vue.ai Logo"
                      title="Vue.ai Logo"
                    />
                    <SigninTitleEl>Login to your account</SigninTitleEl>{" "}
                  </>
                ) : null}
                <RenderErrorBlock errorTxt={signinErr} />
                <SigninForm
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let makeAjax = true;
                    if (
                      userName === "" ||
                      (userName && !userName.trim().length)
                    ) {
                      updateUsernameEr(true);
                      makeAjax = false;
                    } else {
                      updateUsernameEr(false);
                    }
                    if (
                      password === "" ||
                      (password && !password.trim().length)
                    ) {
                      updatePasswordEr(true);
                      makeAjax = false;
                    } else {
                      updatePasswordEr(false);
                    }
                    if (makeAjax) {
                      let auth = await makeLoginApi(
                        userName,
                        password,
                        updateSigninErr
                      );
                      if (auth) {
                        if (Object.keys(auth).length > 0) {
                          auth.user_id = generate_uuid("user_");
                        }
                        auth.userName = userName;
                        localStorage.setItem("userName", userName);
                        const UUID = getCookie("mad_UUID");
                        if (!UUID && UUID == '') {
                          const uuid = generate_uuid("demosite_")
                          if (auth.mad_UUID == '') {
                            auth.mad_UUID = uuid
                          }
                          localStorage.setItem("mad_UUID", uuid);
                          setCookie(
                            "mad_UUID",
                            uuid,
                            365
                          );
                        }
                        localStorage.setItem(
                          "userConfig",
                          JSON.stringify(auth)
                        );
                        updateConfig && updateConfig(auth);
                      }
                    }
                  }}
                >
                  <InputWrapper>
                    <LabelEl src={UserSvg} />
                    <input id="id_username" placeholder="User Name" value={userName} onChange={(e)=>setuserName(e.currentTarget.value)} />
                    {userNameEr ? (
                      <RenderErrorBlock
                        errorTxt="Enter UserName"
                        IconEl={ErrorIcon}
                      />
                    ) : null}
                  </InputWrapper>
                  <InputWrapper>
                    <LabelEl src={passwordSvg} />
                    <input
                      id="id_password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e)=>setpassword(e.currentTarget.value)}
                    />
                    {passwordEr ? (
                      <RenderErrorBlock
                        errorTxt="Enter Password"
                        IconEl={ErrorIcon}
                      />
                    ) : null}
                  </InputWrapper>
                  <Input id="id_submit" type="submit" value="Sign In" disabled={userName==''||password==''} />
                </SigninForm>
              </SigninCont>
            </SigninWrapper>
          </>
        );
      }}
    </ConfigConsumer>
  );
};

export { Signin };
