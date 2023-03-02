import React from "react";
import ReactPlayer from "react-player";
import { ContainerWrapper, PlayerWrapper, ButtonWrapper } from "./styled";
import { PlayerConsumer } from "../../../container";
import close from "../../../static/svg/close.svg";

const VideoPlayer = () => {
  return (
    <PlayerConsumer>
      {(context) => {
        const { showVideo, setShowVideo, videoLink } = context;

        return showVideo ? (
          <ContainerWrapper showVideo={showVideo}>
            <PlayerWrapper showVideo={showVideo}>
              <ReactPlayer
                controls={true}
                width="100%"
                height="100%"
                url={videoLink}
              />
              <ButtonWrapper
                showVideo={showVideo}
                onClick={() => setShowVideo(false)}
              >
                <img src={close} alt="close" width="20px" height="20px" />
              </ButtonWrapper>
            </PlayerWrapper>
          </ContainerWrapper>
        ) : null;
      }}
    </PlayerConsumer>
  );
};

export { VideoPlayer };
