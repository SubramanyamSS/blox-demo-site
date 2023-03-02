import styled, { css } from 'styled-components'
import { InputEl } from '../../component'
import ErrorElSvg from '../../static/svg/error.svg'

const SigninWrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    min-width: 1024px;
`

const SigninCont = styled.div`
    width: 30%;
    max-width: 600px;
    margin: auto;
    text-align: center;
`

const SigninImgTitleEl = styled.img`
    max-width: 25%;
`

const SigninTitleEl = styled.h3`
    color: rgb(51, 51, 51);
    padding-top: .5em;
    padding-bottom: .5em;
    line-height: 38px;
    font-family: Poppins_Semi_Bold !important;
    font-size: 20px;
    font-weight: 400;
    margin: 0px;
`

const SigninForm = styled.form`
    input {
        padding: 1em 1em 1em 3em;
        margin: 1px;
        width: calc(100% - (1px * 2));
        height: calc(100% - (1px * 2));
        font-size: 16px;
        border: 0;
        outline: none;
        box-sizing: border-box;
        color: rgb(51, 51, 51);
        border: 1px solid rgb(40, 98, 255);
        border-radius: 30px;
        font-family: Open_Sans_Regular !important;

        &[type='submit'] {
            border-radius: 30px;
            width: 100%;
            height: 55px;
            padding: 0;
            margin: 15px auto 0;
            color: #fff;
            background-color: rgb(40, 98, 255);
            text-transform: uppercase;
            font-family: "Poppins_Regular";
            font-size: 14px;
            font-weight: 700;
            line-height: 16.8px;
            cursor: pointer;
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
`

const InputWrapper = styled.div`
    text-align: left;
    padding: 15px 0;
`

const LabelEl = styled.label`
    ${props => css`
        mask-image: url(${props.src});
    `}
    mask-position: center;
    mask-repeat: no-repeat;
    width: 20px;
    height: 20px;
    margin: 19px 16px;
    position: absolute;
    background-color: rgb(40, 98, 255);
`

const ErrorEl = styled.span`
    color: #DB4F4F;
    font-size: 14px;
    line-height: 16.8px;
    font-family: "SourceSansPro-Regular";
    vertical-align: middle;
`

const ErrorIcon = styled.span`
    background-color: #DB4F4F;
    mask-image: url(${ErrorElSvg});
    mask-repeat: no-repeat;
    mask-position: center;
    width: 1em;
    height: 1em;
    display: inline-block;
    margin-right: 5px;
`


const VueTagHyphenBanner = styled.div`
    width : 100%
    height : 75px;
    background-color: #e04528;
    padding: 50px;
`

const VueTagHyphenHeader = styled.h1`
    color : #fff
    margin-top : 1%;
`

const VueTagHyphenContent = styled.h3`
    color : #fff
    margin-top : 1%;
`
const VueTagHyphenMadStreetDenContent = styled.h4`
    color : ${props => props.isHyphen ? "black" : "#fff"}
    margin-top : 1%;
`

const GuidelinesContent = styled.h4`
    color : gray
    padding-left: 26rem;
`

export {
    SigninWrapper,
    SigninCont,
    SigninImgTitleEl,
    SigninTitleEl,
    SigninForm,
    InputWrapper,
    LabelEl,
    ErrorEl,
    ErrorIcon,
    VueTagHyphenBanner,
    VueTagHyphenHeader,
    VueTagHyphenContent,
    VueTagHyphenMadStreetDenContent,
    GuidelinesContent
}