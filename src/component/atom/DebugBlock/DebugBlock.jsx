import React from 'react'
import {
    RenderObjectAsKey,
    RenderTagsItem,
    RenderColorVector
} from './renderProps'
import {
    DebugTagsWrapper,
    DebugCont,
} from './styled'

const DebugBlock = props => {
    const {
        src_tag,
        norm_scr,
        pid_tag,
        col_vect,
        total_scr,
        comp_score,
        bandit_user_params
    } = props

    return  <DebugTagsWrapper>
        {src_tag ?  <RenderTagsItem title='src_tag:' list={src_tag} /> : null}
        {norm_scr ? <DebugCont>norm_scr: {norm_scr}</DebugCont> : null}
        {pid_tag ?  <RenderTagsItem title='pid_tag:' list={pid_tag} /> : null}
        {total_scr ?  <DebugCont>total_scr: {total_scr}</DebugCont> : null}
        {comp_score ?  <RenderObjectAsKey data={comp_score} /> : null}
        {bandit_user_params ? <RenderObjectAsKey data={bandit_user_params} /> : null}
        {col_vect && <RenderColorVector data={col_vect} />}
    </DebugTagsWrapper>
}

export { DebugBlock }