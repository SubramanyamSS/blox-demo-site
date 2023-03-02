import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { ListElement, CardBlock } from "../../../component";
import { ConfigConsumer } from "../../../container";
import { Config, DefaultUserUrl } from "../../../configs";
import { CurationContentBlock, CollectionTitle } from "./styled";

const ProductList = () => {
  const [curatedProducts, updateCuratedProducts] = useState([]);
  const [config, updateConfig] = useState({});
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    if (!Object.keys(config).length) return;
    let loc = document.location.href;
    let curationId = loc.split("id=")[1];
    const accountKey = "0ebb6bcd-d8c2-4176-bb62-c42ee7d534af";
    let baseURL = DefaultUserUrl
      ? DefaultUserUrl.endPoint + DefaultUserUrl.curatedProducts
      : "";
    let endPoint = `${baseURL}${curationId}`;
    updateLoading(true);
    fetch(endPoint, {
      headers: {
        "Content-type": "application/json",
        "msd-account-key": accountKey,
      },
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        updateCuratedProducts(res.data);
        updateLoading(false);
      })
      .catch((err) => {
        updateLoading(false);
      });
  }, [config]);

  return (
    <CurationContentBlock>
      <ConfigConsumer>
        {(context) => {
          updateConfig(context);
          const { config } = context;
          return (
            <>
              <CollectionTitle>
                {curatedProducts.length
                  ? curatedProducts[0].collection_title
                  : null}
              </CollectionTitle>
              {curatedProducts.length && !loading ? (
                curatedProducts.map((item) => (
                  <ListElement
                    list={item.products || []}
                    ItemEl={CardBlock}
                    hidePrice={true}
                    hideMSDOntology={true}
                    showBuyButton={true}
                    showWishlistButton={true}
                    isFromCurationProductList={true}
                    isFromCuration={false}
                    config={context}
                    styleConfig={config?.styleConfig}
                    itemsPerRow={config?.styleConfig.card?.cards_per_row}
                  />
                ))
              ) : (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                )}
            </>
          );
        }}
      </ConfigConsumer>
    </CurationContentBlock>
  );
};

export { ProductList };
