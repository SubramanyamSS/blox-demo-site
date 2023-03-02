import React, { useEffect, useState, useRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { DiscoverContentBlock, LoaderContainer, LoaderIcon } from "./styled";
import { DiscoverContainer } from "../../container";
import { DiscoverItemBlock, ProductRecommendationSection } from "./renderProps";
import LoaderGIF from "../../static/img/loader.svg";

const Discover = (props) => {
  const page = useRef(1);
  const loading = useRef(false);
  const [currPage, updateCurrPage] = useState(1);

  const fetchData = () => {
    /**
     *  A "0.5" value added to cover up the loader's height,
     *  as the scroll doesn't reach the very bottom of the screen
     *  and the check for whether scroll has reached the bottom of page fails.
     */
    let window_height = window.innerHeight + window.scrollY + 10;
    if (!loading.current && window_height >= document.body.offsetHeight) {
      loading.current = true;
      updateCurrPage(page.current + 1);
      page.current += 1;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fetchData);
    return () => window.removeEventListener("scroll", fetchData);
  });

  return (
    <DiscoverContentBlock>
      <DiscoverContainer currPage={currPage} loading={loading} id="scroll-area">
        <ProductRecommendationSection />
        <DiscoverItemBlock isFromDiscoverPage={true} currPage={currPage} />
        {loading && (
          <LoaderContainer>
            <LoaderIcon src={LoaderGIF} alt="Mask Loader" />
          </LoaderContainer>
        )}
      </DiscoverContainer>
    </DiscoverContentBlock>
  );
};

export { Discover };
