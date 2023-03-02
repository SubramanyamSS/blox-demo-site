import React, { useState } from "react";
import { ConfigConsumer } from "../../container";
import { BreadcrumbLinks } from '../../component';

import {
  RenderWishlistItems,
  ProductRecommendationSection,
} from "./renderProps";

import { TitleEl, CartItemsWrapper } from "./styled";

const Wishlist = (props) => {
  return (
    <>
      <CartItemsWrapper>
        <div style={{ position: 'relative', margin: '-20px 0 16px', padding: '0 3%' }}>
          <BreadcrumbLinks page={'Wishlist'} />
        </div>
        <ConfigConsumer>
          {(context) => {
            let user_id = localStorage.getItem("userId");
            if (!user_id) {
              user_id = context.user_id;
            }
          }}
        </ConfigConsumer>
        <RenderWishlistItems />
        <ProductRecommendationSection />
      </CartItemsWrapper>
    </>
  );
};

export { Wishlist };
