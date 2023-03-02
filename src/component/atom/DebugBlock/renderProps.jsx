import React, { Fragment } from 'react'
import {
    DebugCont,
    TagEl,
    DebugTitle,
    ColorPalatte,
    ColorPalatteContainer
} from './styled'

const RenderTagsItem = props => {
    const {
        title,
        list
    } = props

    return <DebugCont>
        <DebugTitle>{title}</DebugTitle>
        <RenderList list={list} />
    </DebugCont>
}

const RenderList = props => {
    const { list } = props
    
    return list.map((tag, key) => <TagEl key={`tags_${key}`}>{tag}</TagEl>)
}

const RenderObjectAsKey = props => {
    const { title, data } = props
    let dataArr = []
    if(data) {
        Object.keys(data).map((item, key) => {
            dataArr.push(<TagEl key={`tags_${key}`}>{`${item}: ${data[item]}`}</TagEl>)
            return item
        })    
    }

    return <DebugCont>
        {title ? <DebugTitle>{title}</DebugTitle> : null}
        {dataArr}
    </DebugCont>
}

const RenderColorVector = ({ data }) => (
    <Fragment>
        <DebugTitle>col_vect:</DebugTitle>
        <ColorPalatteContainer>
            {data && (data.slice(0, 600)).map(col => (
                <ColorPalatte
                    key={Math.random()}
                    style={{
                        backgroundColor: `rgb(${col[0]}, ${col[1]}, ${col[2]})`
                    }}
                />
            ))}
        </ColorPalatteContainer>
    </Fragment>
);

export {
    RenderObjectAsKey,
    RenderTagsItem,
    RenderColorVector
}
