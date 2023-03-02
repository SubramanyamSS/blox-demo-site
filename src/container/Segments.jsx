import React, { createContext, useState }  from 'react';
import { segments } from "../configs";

const SegmentsContext = createContext({});
const { Provider, Consumer } = SegmentsContext;

const SegmentsContainer = props => {
  const { children } = props;
  const [ config, updateConfig ] = useState(segments);
  config.updateConfig = updateConfig;

  return (
    <Provider value={config}>
      {children}
    </Provider>
  );
};

export {
  SegmentsContext,
  SegmentsContainer,
  Consumer as SegmentsConsumer
}