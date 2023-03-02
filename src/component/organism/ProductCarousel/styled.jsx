import Styled, { css } from 'styled-components'
import { DataItemBlock, DataInfoBlock, RecommendationBtn } from '../CardBlock'

const PdtCarouselWrapper = Styled.div`
    ${DataItemBlock} {
        width: 97%;
        border: none;
    }
    ${DataInfoBlock} {
        left: 0px;
    }
    ${RecommendationBtn} {
        top: 86%;
        padding: .5em;
    }
    
    .slick-list{
        margin: 0;
    }

    ${(props) => {
        if (props.isVertical) return false;
        return css`
            .slick-list {
                padding: 1rem;
                padding: 1rem;
                margin-left: -0.5rem;
            }
        `
    }}
`

const PlaceholderCont = Styled.div`
    display: flex;
`

export { PdtCarouselWrapper, PlaceholderCont }