import React from "react";
import { ListWrapper } from "./styled.jsx";
import { cardStyleConfig } from "../../../styleConfig.js";

const ListElement = (props) => {
  const {
    list,
    ItemEl,
    showBuyButton,
    showWishlistButton,
    isFromCurations,
    isFromCurationProductList,
    config,
    showStyledProducts,
    showSimilarProducts,
    isGroceryUser,
    isFashionUser,
    styleConfig,
    itemsPerRow,
    isNotFromDiscoverPage,
    metaData,
    showMetaData,
    showSITButton,
    showMoreLikeThisButton,
    ...remainingProps
  } = props;
  return (
    <ListWrapper
      styleConfig={styleConfig || cardStyleConfig}
      itemsPerRow={itemsPerRow || cardStyleConfig.card.cards_per_row}
      horizontal={
        styleConfig?.card?.orientation?.horizontal ||
        cardStyleConfig.card.orientation.horizontal
      }
      isNotFromDiscoverPage={isNotFromDiscoverPage}
    >
      {list.map((item, index) => {
        return (
          <ItemEl
            showBuyButton={showBuyButton}
            showWishlistButton={showWishlistButton}
            isFromCurations={isFromCurations}
            isFromCurationProductList={isFromCurationProductList}
            showStyledProducts={showStyledProducts}
            showSimilarProducts={showSimilarProducts}
            showSITButton={showSITButton}
            showMoreLikeThisButton={showMoreLikeThisButton}
            {...item}
            {...remainingProps}
            key={`list_${index}`}
            index={index}
            isFashionUser={isFashionUser}
            isGroceryUser={isGroceryUser}
            type={config ? config.cardType : ""}
            imageLink={config ? config.imageLink : ""}
            styleConfig={styleConfig || cardStyleConfig}
            metaData={metaData}
            showMetaData={showMetaData}
          />
        );
      })}
    </ListWrapper>
  );
};

export { ListElement };
