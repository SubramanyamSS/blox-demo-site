import React, { useState } from "react";
import { Item, Button, Input, Icon, TextArea } from "semantic-ui-react";
import {
  NoItemsMessage,
  EmailContainer,
  RenderMailContainer,
  MailHeader,
  HTMLTemplate,
  ParentWrapper,
  ProductWrapper,
  DescriptionWrapper,
  DescriptionChildWrapper,
  CardWrapper,
} from "./styled";
import { DefaultUserUrl } from "../../configs";
import { Checkbox } from "semantic-ui-react";

const RenderOrderItems = (props) => {
  let items_in_the_cart = localStorage.getItem("cart_items");
  const [is_loading, update_loading] = useState(true);
  const [items_to_display, update_items_to_display] = useState([]);
  const { html_string, email_preview, update_email_preview, active } = props;
  const [email_id, update_email_id] = useState("");
  const [email_data, update_email_data] = useState(html_string);

  function handleEmailIdChange(e, val) {
    update_email_id(val.value);
  }

  function handleEmailDataChange(e, val) {
    update_email_data(val.value);
  }

  function makeApiRequest() {
    const send_mail_url = DefaultUserUrl.endPoint + "/api/send_email/";
    fetch(send_mail_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: email_id,
        email_data: email_data,
      }),
    })
      .then((data) => data.json())
      .then((resp) => {
        if (resp && resp.status && resp.status.toLowerCase() === "success") {
          alert("Email Sent Successfully");
        }
      })
      .catch((err) => console.log(err));
  }

  let temp_items = [];
  if (
    items_in_the_cart != undefined &&
    items_in_the_cart != "" &&
    items_in_the_cart != "{}" &&
    is_loading
  ) {
    update_loading(false);
    items_in_the_cart = JSON.parse(items_in_the_cart);
    for (let key in items_in_the_cart) {
      console.log(key);
      let _obj = {};
      _obj["childKey"] = key;
      _obj["title"] = items_in_the_cart[key].title;
      _obj["meta"] = items_in_the_cart[key].product_id;
      _obj["image"] = items_in_the_cart[key].image_link;
      _obj["price"] = items_in_the_cart[key].price;
      temp_items.push(_obj);
    }
    update_items_to_display(temp_items);
    console.log("temp_items", temp_items);
  }

  const continueShoppingHandler = () => {
    localStorage.removeItem("cart_items");
    window.location.href = "/discover";
  };

  return (
    <>
      {items_to_display.length > 0 ? (
        <div>
          <ParentWrapper>
            <ProductWrapper>
              <h3>{`Your have ordered ${items_to_display.length} item(s)`}</h3>
              {items_to_display.map((item) => (
                <div>
                  <CardWrapper>
                    <div style={{ borderWidth: "1px" }}>
                      <img src={item.image} height="120px" />
                    </div>
                    <DescriptionWrapper>
                      <DescriptionChildWrapper>
                        <div>{item.title}</div>
                        <div>{item.price ? `$ ${item.price}` : `$ 0`}</div>
                      </DescriptionChildWrapper>
                    </DescriptionWrapper>
                  </CardWrapper>
                </div>
              ))}
              <button
                onClick={continueShoppingHandler}
                style={{
                  width: "100%",
                  background: "#2185d0",
                  color: "#fff",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "SourceSansPro-SemiBold",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "20px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Continue shopping
              </button>
            </ProductWrapper>
            <div
              style={{
                background: "#fff",
                width: "25%",
                height: "210px",
                marginRight: "15%",
                marginLeft: "5%",
                padding: "20px",
              }}
            >
              <RenderMailContainer>
                <Input
                  iconPosition="left"
                  placeholder="Email"
                  onChange={handleEmailIdChange}
                  style={{ minWidth: 200 }}
                >
                  <Icon name="at" />
                  <input />
                </Input>
                <Button
                  style={{ marginTop: "1rem" }}
                  color={"blue"}
                  disabled={!active}
                  onClick={makeApiRequest}
                >
                  Send Mail
                </Button>
                {active ? (
                  <Checkbox
                    style={{ marginTop: "1rem" }}
                    toggle
                    checked={email_preview}
                    label="Email Preview"
                    onChange={() => update_email_preview(!email_preview)}
                  />
                ) : null}
              </RenderMailContainer>
            </div>
          </ParentWrapper>
        </div>
      ) : (
        <NoItemsMessage>Your cart is empty</NoItemsMessage>
      )}
    </>
  );
};

const RenderMailBox = (props) => {
  const { html_string, email_preview } = props;

  return (
    <>
      <RenderMailContainer>
        {email_preview ? (
          <>
            {" "}
            <MailHeader>Email Preview</MailHeader>{" "}
            <HTMLTemplate>
              <div dangerouslySetInnerHTML={{ __html: html_string }}></div>
            </HTMLTemplate>{" "}
          </>
        ) : null}
      </RenderMailContainer>
    </>
  );
};
export { RenderMailBox, RenderOrderItems };
