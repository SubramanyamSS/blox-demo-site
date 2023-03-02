import styled from 'styled-components'

const DebugTagsWrapper = styled.div`
    cursor: default;
    text-align: left;
    font-family: "SourceSansPro-Regular";
    color: #064559;
    font-size: 14px;
    line-height: 14px;
    padding: 5px;
`

const DebugCont = styled.div`
    padding: 10px 0px;
`

const TagEl = styled.div`
`

const DebugTitle = styled.div`
    padding-bottom: 5px;
`

const ColorPalatteContainer = styled.div`
    display: flex;
`;

const ColorPalatte = styled.div`
    width: 3px;
    height: 50px;
`;

export {
    DebugTagsWrapper,
    DebugCont,
    DebugTitle,
    TagEl,
    ColorPalatte,
    ColorPalatteContainer
}