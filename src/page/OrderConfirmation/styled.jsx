import styled, { css, keyframes } from "styled-components";

const TitleEl = styled.div`
  height: 3.5em;
  line-height: 3.5em;
  border-bottom: 1px solid #e2e2e2;
  text-transform: uppercase;
  text-align: center;
  color: #064559;
  font-size: 1.25em;
  font-family: "SourceSansPro-SemiBold";
  position: fixed;
  top: 45px;
  min-width: 1240px;
  width: 100%;
  z-index: 1;
  background-color: #fff;
`;

const CartItemsWrapper = styled.div`
  margin-top: 4em;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const NoItemsMessage = styled.div`
  color: #064559;
  font-size: 1.25em;
  text-align: center;
`;

const EmailContainer = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

const ButtonWrapper = styled.div``;

const RenderMailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // margin-top: 50px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;

const MailHeader = styled.h3`
  text-align: left;
`;

const HTMLTemplate = styled.div`
  border: 1px solid black;
  padding: 1rem;
`;

const ParentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ProductWrapper = styled.div`
  width: 40%;
  margin-left: 15%;
  background: #fff;
  padding: 10px 20px;
`;

const CardWrapper = styled.div`
  height: 150px;
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #c0c0c0;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  margin-left: 20px;
`;

const DescriptionChildWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  font-family: "SourceSansPro-Regular";
  font-size: 14px;
  font-weight: bold;
`;

export {
  TitleEl,
  CartItemsWrapper,
  NoItemsMessage,
  EmailContainer,
  RenderMailContainer,
  MailHeader,
  HTMLTemplate,
  ParentWrapper,
  ProductWrapper,
  CardWrapper,
  DescriptionWrapper,
  DescriptionChildWrapper,
};
