import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { CarouselItemWrapper } from "../../component";

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
  padding-top: 80px;
  padding-bottom: 20px;
  width: 100%;
`;

const NoItemsMessage = styled.h2`
  color: #064559;
  text-align: center;
  font-family: "SourceSansPro-SemiBold";
  font-weight: bold;
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
  border-bottom: 1px solid lightgray;
  & > img {
    border: 1px lightgray solid;
  }
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
  font-size: 16px;
  font-weight: bold;
  color: #191e50;
`;

const StyledLink = styled.div`
  display: flex;
  background: #2862ff;
  flex: 1;
  padding: 5px 0;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 10px;
  font-family: "SourceSansPro-Regular";
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.2px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const ButtonWrapper = styled.button`
  background: #2862FF;
  color: #fff
  font-family: "SourceSansPro-Regular";
  font-size: 12px;
  width: 70px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  letter-spacing: 1.2px;
  cursor: pointer;
`;

const DeliveryWrapper = styled.div`
  width: 40%;
  margin-left: 15%;
  background: #fff;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "SourceSansPro-Regular";
  font-size: 15px;
  color: #191e50;
`;

const ProductRecommendationWrapper = styled.div`
  width: 70%;
  padding-bottom: 10px;
  margin-left: 15%;
  border-bottom: 1px solid #e2e2e2;
  background-color: #fff;

  ${(props) => css`
    ${CarouselItemWrapper} {
      height: ${props.styleConfig?.image?.height || props.styleConfig?.card?.orientation.horizontal ? "175px" : "320px"}
    }
  `}
`;

const ProductRecommendationTitle = styled.div`
  text-transform: capitalize;
  color: #191e50;
  font-size: 1.25em;
  font-family: "SourceSansPro-SemiBold";
  min-width: 1240px;
  width: 100%;
  z-index: 1;
  margin-top: 10px;
  padding: 15px 0px;
  padding-left: 1rem;
`;

export {
  TitleEl,
  CartItemsWrapper,
  NoItemsMessage,
  ParentWrapper,
  ProductWrapper,
  CardWrapper,
  DescriptionWrapper,
  StyledLink,
  DescriptionChildWrapper,
  ButtonWrapper,
  DeliveryWrapper,
  ProductRecommendationWrapper,
  ProductRecommendationTitle,
};
