import React from 'react'
import {
    MaskCont,
    Loader
} from './styled'
import LoaderGIF from '../../../static/img/loader.svg'

const Mask = props => {
    return <MaskCont>
        <Loader src={LoaderGIF} alt='' />
    </MaskCont>
}

export { Mask }