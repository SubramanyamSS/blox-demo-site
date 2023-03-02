import React, { useState } from 'react'
import {
    TitleWrapper,
    VueLogoEl,
    ImageSearchWrapper
} from './styled'
import VueLogoImg from '../../static/svg/vue-find.svg'
import {
    RenderImageSearchInput,
    RenderSearchResults
} from './renderProps'

const isDebug = () => {
    let qp = window.location && window.location.search ? window.location.search.replace('?', '') : ''
    qp = qp.split('&')
    let debug = false
    qp.map(param => {
        if(param) {
            let paramArr = param.split('=')
            if(paramArr[0] && paramArr[1]) {
                if(paramArr[0] === 'force_debug' && paramArr[1] === 'true') {
                    debug = true
                }
            }
        }
        return param
    })
    return debug
}

const ImageSearch = props => {
    const [ imageSearchData, updateimageSearchData ] = useState({
        madId: '',
        gender: 'men',
        imgSrc: '',
        tagsResp: {}
    })
    const {
        gender,
        madId,
        imgSrc
    } = imageSearchData
    const debug = isDebug()

    return <>
        <TitleWrapper>
            <VueLogoEl src={VueLogoImg} alt='Vue Find logo' title='Vue Find' />
        </TitleWrapper>
        <ImageSearchWrapper>
            <RenderImageSearchInput updateimageSearchData={updateimageSearchData} />
        </ImageSearchWrapper>
        <RenderSearchResults
            gender={gender}
            madId={madId}
            src={imgSrc}
            debug={debug}
        />
    </>
}

export { ImageSearch }