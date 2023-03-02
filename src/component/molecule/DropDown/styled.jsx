import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const DropDownWrapper = styled.div`
    position: absolute;
    text-align: left;
    top: 15px;
    right: 0;
    box-shadow: -1px 2px 5px 2px rgba(0,0,0,0.3);
    margin-top: 4px;
    background-color: #fff;
    ${props => css`
        display: ${props.isActive ? 'block' : 'none'};
    `}
`

const DropDownEl = styled.a`
    text-decoration: none;
    display: block;
    white-space: nowrap;
    padding: .5em 2em;
    cursor: pointer;
    min-width: 150px;
    border-left: solid 3px transparent;
    box-sizing: border-box;
    color: #064559;
    font-family: "SourceSansPro-Regular";
    font-size: 1.25em;
    &:hover {
        background-color: rgba(0,0,0,0.05);
        border-left: solid 3px #FF7054;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    white-space: nowrap;
    padding: .5em 2em;
    cursor: pointer;
    min-width: 150px;
    border-left: solid 3px transparent;
    box-sizing: border-box;
    color: #064559;
    font-family: "SourceSansPro-Regular";
    font-size: 1.25em;
    &:hover {
        background-color: rgba(0,0,0,0.05);
        border-left: solid 3px #FF7054;
    }
`

const DropDownParentWrapper = styled.div`
    display: flex;
    margin: auto;
`

export {
    DropDownWrapper,
    DropDownEl,
    DropDownParentWrapper,
    StyledLink
}