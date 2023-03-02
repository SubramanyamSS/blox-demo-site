import React from "react";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";
import { ConfigConsumer } from "../../../container/Config";

const BreadcrumbLinks = (props) => {
  const history = useHistory();
  return (
    <ConfigConsumer>
      {
        context => (
          context.redirect_path && context.redirect_path == "/discover" ? (
            <Breadcrumb className="font-18" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Breadcrumb.Section
                link
                onClick={() => history.push('/discover')}
              >
                Home
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{props.page}</Breadcrumb.Section>
            </Breadcrumb>
          ):null
        )
      }
    </ConfigConsumer>
  );
};

export { BreadcrumbLinks };
