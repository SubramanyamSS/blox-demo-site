import styled from 'styled-components'
import { InputEl, SelectEl, RecommendationWithTabsWrapper, DataInfoBlock, DataItemImg } from '../../component'
import UploadIcon from '../../static/svg/upload.svg'
import { DebugTagsWrapper } from '../../component'

const TitleWrapper = styled.div`
    height: 3.5em;
    line-height: 3.5em;
    border-bottom: 1px solid #E2E2E2;
    position: fixed;
    top: 50px;
    min-width: 1240px;
    width: 100%;
    z-index: 1;
    background-color: #fff;
    text-align: center;
`

const VueLogoEl= styled.img`
    width: 10%;
    margin-right: 1em;
    vertical-align: middle;
`

const ImageSearchWrapper = styled.div`
    width: 85%;
    margin: auto;
    margin-top: 107px;
`

const FormWrapper = styled.form`
    display: flex;
    width: 100%;
`

const UserInputWrapper = styled.div`
    display: flex;
    width: 75%;
    padding: 1em 0em;
    margin: auto;
    ${InputEl} {
        padding: .75em .75em;
        margin: 1px;
        width: calc(100% - (1px * 2));
        height: calc(100% - (1px * 2));
        font-size: 14px;
        color: #064559;
        border: 0;
        border-radius: .15em;
        outline: none;
        &[type='text'] {
            width: 37.5%;
            border: 1px solid #b9b9b9;
            height: auto;
        }
        &[type='submit'] {
            width: 12.5%;
            background-color: #FF7054;
            color: #fff;
            margin-left: 4px;
            cursor: pointer;
        }
    }
    ${SelectEl} {
        height: 2rem;
        color: #a6a6a6;
        margin-left: 1em;
        margin-top: .4em;
        text-transform: capitalize;
        cursor: pointer;
    }
`

const ImageUploadIcon = styled.div`
    mask-image: url(${UploadIcon});
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: lightslategray;
    width: 6.25%;
    margin: .6em 1em;
    cursor: pointer;
`

const SearchResultWrapper = styled.div`
    display: flex;
    ${RecommendationWithTabsWrapper} {
        width: 68.75%;
        margin: 10px;
        height: auto;
        .slick-next {
            right: 11px;
        }
        .slick-prev {
            left: 22px;
            z-index: 1;
        }

        ${DataItemImg}{
            height: 250px;
        }
        
        ${DataInfoBlock} {
            max-width: 80%;
            max-height: 50%;
        }
    }
    ${DebugTagsWrapper} {
        padding: 15px;
    }
`

const UploadedProductImage = styled.img`
    max-width: 100%;
    max-height: 400px;
`

const UploadedImgWrapper = styled.div`
    padding: 10px;
    width: 25%;
    height: auto;
    text-align: center;
`

export {
    TitleWrapper,
    VueLogoEl,
    ImageSearchWrapper,
    UserInputWrapper,
    ImageUploadIcon,
    UploadedProductImage,
    UploadedImgWrapper,
    SearchResultWrapper,
    FormWrapper
}