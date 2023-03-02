import styled, {css} from 'styled-components'
import { CarouselItemWrapper, StlyeItBtn } from '../../organism/CardBlock/styled'

const gridWidth = (itemsPerRow) => {
    return (100 / itemsPerRow);
};

const ListWrapper = styled.div`
    line-height: 120%;
    font-size: 0.850em;
    color: #fff;

    ${(props) =>  css`
        display: grid;
        column-gap: 10px;
        row-gap: 10px;
        grid-template-columns: repeat(auto-fill, calc(${props.itemsPerRow ? gridWidth(props.itemsPerRow) : props.horizontal ? "33.3" : "24.5"}% - 10px));
        flex-wrap: ${props.horizontal ? "" : "wrap"};
        margin-top: ${props.horizontal ? "1rem !important" : ""};
        ${CarouselItemWrapper} {
            height: ${props.styleConfig?.image?.height || (props.horizontal ? "175px" : "320px")};
        }

        ${props.isNotFromDiscoverPage && props.horizontal && `
            ${StlyeItBtn} div div span {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        `}
    `}
`

export { ListWrapper }