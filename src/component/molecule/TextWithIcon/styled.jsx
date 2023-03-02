import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const IconElement = styled.div`
    ${props => css`
        mask-image: url(${props.src});
        ${props.isActive ? css`
            transform: rotate(180deg);
        `: null}
    `}
    width: 8px;
    height: 8px;
    mask-position: center;
    mask-repeat: no-repeat;
    background-color: #9094b7;
    margin-top: 6px;
    &:hover {
        background-color: #191E50;
    }
`

const TextWithIconWrapper = styled.div`
    ${props => css`
        ${props.isSeparator ? 'border-right: 2px solid #fff;padding-right: 1em;margin-right: 2em !important;' : null} 
    `}
    display: flex;
    color: #fff;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    color: #fff;
    margin: auto;
    &:hover {
        color: #fff;
    }
`

const TextElement = styled.div`
    padding: 0em 0.25em;
    font-size: 14px;
    /* font-family: "SourceSansPro-Regular"; */
    font-family: 'Poppins_Medium';
    /* color: #9094b7; */
    color: ${props => props.isCurrentPath ? '#2962ff' : '#333'};

    &:hover {
        /* color: #191E50; */
        color: #2962ff;
    }
`
const TextElementBlack = styled.div`
    padding: 0em 0.25em;
    font-size: 14px;
    font-family: "SourceSansPro-Regular";
    color: #000;
`

export {
    TextWithIconWrapper,
    TextElement,
    IconElement,
    StyledLink,
    TextElementBlack
} 