import React, { createContext, useState, useEffect } from "react";

const PlayerContext = createContext({});
const { Provider, Consumer } = PlayerContext;

const PlayerContainer = (props) => {
  const { children } = props;
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('')
  return (
    <Provider value={{ showVideo: showVideo, setShowVideo: setShowVideo, videoLink: videoLink, setVideoLink: setVideoLink }}>
      {children}
    </Provider>
  );
};

export { PlayerContext, PlayerContainer, Consumer as PlayerConsumer };
