import styled, { css } from 'styled-components'

const TitleEl = styled.div`
    height: 3.5em;
    line-height: 3.5em;
    border-bottom: 1px solid #E2E2E2;
    text-transform: uppercase;
    text-align: center;
    color: #064559;
    font-size: 1.25em;
    font-family: "SourceSansPro-SemiBold";
    position: fixed;
    top: 45px;
    min-width: 1240px;
    width: 100%;
    z-index: 1;
    background-color: #fff;
`

const BtnWrapper = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    justify-content: center;
    padding: 25px 0px;
`

const SubmitBtn = styled.div`
    color: #fff;
    background-color: #FF7054;
    padding: .5em 1em;
    border-radius: 4px;
    white-space: nowrap;
    text-align: center;
    border: solid 1px transparent;
    cursor: pointer;
    margin-right: 15px;
    &:hover {
        background-color: #ed2700;
        color: #fff !important;
    }
`

const SettingsWrapper = styled.div`
    padding-top: 130px;
    margin: auto;
    width: 80%;

    .jsoneditor {
        border: none;
    }
    .jsoneditor-values tr td:nth-child(2),
    .jsoneditor-values tr td:last-child {
        min-width: 250px;
        div {
            color: #064559;
            font-family: "SourceSansPro-Regular";
            font-size: 14px;
            line-height: 30px;
            letter-spacing: 0.7px;
            margin-left: 10px;
            &[contenteditable="true"] {
                width: 100%;
                background-color: #fff;
                border-color: #064559;
                padding: 5px;
            }
            &.jsoneditor-boolean {
                pointer-events: none;
                border: none;
                background: transparent;
            }
        }
    }
    .jsoneditor-values tr td:last-child {
        width: 500px;
    }
    .jsoneditor-values {
        display: flex;
        tr {
            margin-bottom: 10px;
        }
        td {
            line-height: 30px;
            vertical-align: text-top !important;
        }
        button {
            vertical-align: inherit;
        }
    }
    .jsoneditor-values tr {
        display: flex;
        justify-content: start;
    }
    .jsoneditor-values tbody {
        width: 100%;
    }
    .jsoneditor-expandable .jsoneditor-values {
        display: table;
    }
    .jsoneditor-expandable .jsoneditor-values tr td:nth-child(2n) {
        min-width: auto;
    }    
`

const AlertEl = styled.div`
    text-align: center;
    font-family: "SourceSansPro-Regular";
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    color: #db2828;
    padding: 10px 60px;
    width: 450px;
    margin: 20px;
    left: 32%;
    background-color: #fff;
    position: fixed;
    z-index: 1;
    box-sizing: border-box;
    transition: transform .5s;
    box-shadow: 0px 0px 21px -9px #000;
    border-radius: 30px;
    cursor: default;

    ${props => css`
        transform: ${props.isActive ? 'translate(10px, 100px)' : 'translate(10px, -55px)' };
        ${props.isActive ? css`
            & + ${SettingsWrapper} {
                padding-top: 190px;
            }
        ` : null}
    `}
`

export {
    SettingsWrapper,
    TitleEl,
    BtnWrapper,
    SubmitBtn,
    AlertEl
}