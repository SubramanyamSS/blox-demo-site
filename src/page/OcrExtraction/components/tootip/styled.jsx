import styled from "styled-components";
import Tippy from "@tippyjs/react";

const TooltipWrapper = styled(Tippy)`
  & .tooltip-content {
    & .tippy-content {
      border-radius: 5px;
      padding: 10px 15px;
      font-size: 12px;
      line-height: 18px;
      word-wrap: break-word;
    }

    & .tippy-content,
    & .tippy-arrow {
      background-color: $secondaryNavyBlue;
    }
  }
`;

export { TooltipWrapper };
