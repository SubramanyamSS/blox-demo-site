import React, { createContext, useState } from "react";

const HeaderConfigContext = createContext({});
const { Provider, Consumer } = HeaderConfigContext;

const HeaderConfigContainer = (props) => {
  const { children } = props;
  let items_in_cart = localStorage.getItem("cart_items");
  let items_in_wishlist = localStorage.getItem("wishlist_items");
  if (items_in_cart != undefined && items_in_cart != null) {
    items_in_cart = JSON.parse(items_in_cart);
  } else {
    items_in_cart = {};
  }
  if (items_in_wishlist != undefined && items_in_wishlist != null) {
    items_in_wishlist = JSON.parse(items_in_wishlist);
  } else {
    items_in_wishlist = {};
  }
  const cart_count = Object.keys(items_in_cart).length;
  const wishlist_count = Object.keys(items_in_wishlist).length;

  const [CartPdtCount, updateCartPdtCount] = useState({ count: cart_count });
  const [WishlistPdtCount, updateWishlistPdtCount] = useState({
    count: wishlist_count,
  });
  const [CartPdt, updateCartPdt] = useState({ cartProducts: items_in_cart });
  const [WishlistPdt, updateWishlistPdt] = useState({
    wishlistProducts: items_in_wishlist,
  });

  CartPdtCount.updateCartPdtCount = updateCartPdtCount;
  WishlistPdtCount.updateWishlistPdtCount = updateWishlistPdtCount;

  CartPdt.updateCartPdt = updateCartPdt;
  WishlistPdt.updateWishlistPdt = updateWishlistPdt;

  return (
    <Provider value={[CartPdtCount, WishlistPdtCount, CartPdt, WishlistPdt]}>
      {children}
    </Provider>
  );
};

export {
  HeaderConfigContext,
  HeaderConfigContainer,
  Consumer as HeaderConfigConsumer,
};
