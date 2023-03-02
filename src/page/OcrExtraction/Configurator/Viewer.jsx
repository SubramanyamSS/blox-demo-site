import React from "react";
import { TextArea } from "semantic-ui-react";

const Viewer = (props) => {
    const { data } = props;
    return (
      <TextArea rows={10} cols={70}>
        { JSON.stringify(data, undefined, 4) }
      </TextArea>
    )
}

export default Viewer