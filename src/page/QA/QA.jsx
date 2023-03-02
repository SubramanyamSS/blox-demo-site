import React from "react";
import { QAContentWrapper } from "./styled";
import { ConfigContainer, ConfigConsumer } from "../../container";
import { TaggingAudit } from "./renderProps";
import { BreadcrumbLinks } from "../../component";

const QA = () => {
  const renderQABlock = (audit_type, config) => {
    switch (audit_type) {
      case "tagging_audit":
        return <TaggingAudit config={config} />;
        break;
      default:
        return null;
    }
  };
  return (
    <ConfigContainer>
      <ConfigConsumer>
        {(context) => (
          <>
            <QAContentWrapper
              BreadcrumbLinksLoaded={
                context.redirect_path && context.redirect_path == "/discover"
              }
            >
              {context.redirect_path && context.redirect_path == "/discover" && (
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
                  <BreadcrumbLinks page={"QA"} />
                </div>
              )}
              {renderQABlock("tagging_audit", context)}
            </QAContentWrapper>
          </>
        )}
      </ConfigConsumer>
    </ConfigContainer>
  );
};

export { QA };
