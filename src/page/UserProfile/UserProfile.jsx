import React, { useState } from "react";
import {
  UserInputSection,
  ProductRecommendationSection,
  ConstructOntologyDropdown,
} from "./renderProps";
import { BreadcrumbLinks, TableauEmbedCode } from "../../component";
import { TitleEl, UserProfileWrapper, UserInfoWrapper } from "./styled";
import { ConfigConsumer } from "../../container";
import { getCookie } from "../../common";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const UserProfile = (props) => {
  const [ontology, updateOntology] = useState("");
  const [userAffinityData, updateUserAffinityData] = useState({});
  const [currentUserAffinityData, updateCurrentUserAffinityData] = useState({});
  return (
    <div
      style={{ paddingBottom: "20px", maxWidth: "100vw", overflow: "hidden" }}
    >
      {/* <TitleEl>USER PROFILE</TitleEl> */}
      <div
        style={{
          position: "fixed",
          padding: "12px 3%",
          top: "50px",
          width: "100%",
          background: "#fff",
          zIndex: "999",
        }}
      >
        <BreadcrumbLinks page={"User profile"} />
      </div>
      <UserProfileWrapper>
        <UserInputSection />
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
      {userAffinityData && (
        <ProductRecommendationSection
          ontology={ontology}
          updateOntology={updateOntology}
          updateUserAffinityData={updateUserAffinityData}
          userAffinityData={userAffinityData}
          currentUserAffinityData={currentUserAffinityData}
          updateCurrentUserAffinityData={updateCurrentUserAffinityData}
        />
      )}
      <ConfigConsumer>
        {(context) => {
          return (
            context.vue_user.showTableauDashboard ? <TableauEmbedCode /> : null
          )
        }}
      </ConfigConsumer>
    </div>
  );
};

export { UserProfile };
