import styled from 'styled-components'

const MaskCont = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Loader = styled.img`
    width: 50px;
    height: 50px;
`

export {
    MaskCont,
    Loader
}