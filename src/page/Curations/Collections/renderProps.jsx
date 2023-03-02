import React from "react";
import { ListElement, CardBlock } from "../../../component";
import { Dimmer, Loader } from "semantic-ui-react";
import { CurationConsumer } from "../../../container";

const CurationItemBlock = (props) => {
  return (
    <CurationConsumer>
      {(context) => {
        const { collections, loading, config } = context;
        if (loading == true) {
          return (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          );
        } else {
          return (
            <ListElement
              list={collections || []}
              ItemEl={CardBlock}
              hidePrice={true}
              hideMSDOntology={true}
              showBuyButton={false}
              showWishlistButton={false}
              isFromCurations={true}
              config={config || {}}
              styleConfig={config?.styleConfig}
              itemsPerRow={config?.styleConfig.card?.cards_per_row}
            />
          );
        }
      }}
    </CurationConsumer>
  );
};

export { CurationItemBlock };
