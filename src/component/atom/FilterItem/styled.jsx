import style from 'styled-components';
import closeIcon from '../../../static/svg/close-circle.svg';

const FilterItemEl = style.div`
    display: inline-flex;
    max-width: 96%;
    min-width: 20%;
    width: auto;
    height: 36px;
    margin: 0 5px 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: #E9EFFA;
    align-items: center;
    position: relative;
`

const FilterItemTitle = style.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    // max-width: calc(100% - 25px);
    margin-right: 25px;
`

const FilterItemCloseIconWrap = style.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    max-height: 100%;
    height: 100%;
    cursor: pointer;
`

const CloseIcon = style.img`
    outline: none;
    margin-left: 0.5rem;
    background-image: url(${closeIcon});
    background-size: 16px;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;
`

export {
    FilterItemEl,
    FilterItemTitle,
    FilterItemCloseIconWrap,
    CloseIcon
}
