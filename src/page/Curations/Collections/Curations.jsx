import React from "react";
import { CurationContainer, ConfigConsumer } from "../../../container";
import { CurationItemBlock } from "./renderProps";
import { CurationContentBlock } from "./styled";

const Curations = () => {
  return (
    <CurationContentBlock>
      <CurationContainer>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "24px",
            fontFamily: "SourceSansPro-SemiBold",
            color: "#191e50",
          }}
        >
          Collections
        </div>
        <CurationItemBlock />
      </CurationContainer>
    </CurationContentBlock>
  );
};

export { Curations };
