import React, { useState } from "react";
import { ConfigConsumer } from "../../container";
import { BreadcrumbLinks } from '../../component';

import { RenderCartItems, ProductRecommendationSection } from "./renderProps";

import { TitleEl, CartItemsWrapper } from "./styled";

const AddToCart = (props) => {
  return (
    <>
      <CartItemsWrapper>
        <div style={{ position: 'relative', margin: '-20px 0 16px', padding: '0 3%' }}>
          <BreadcrumbLinks page={'Cart'} />
        </div>
        <ConfigConsumer>
          {(context) => {
            let user_id = localStorage.getItem("userId");
            if (!user_id) {
              user_id = context.user_id;
            }
          }}
        </ConfigConsumer>
        <RenderCartItems />
        <ProductRecommendationSection />
      </CartItemsWrapper>
    </>
  );
};

export { AddToCart };
