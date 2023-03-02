import React, { useState } from 'react'
import { FilterItemEl, FilterItemTitle, FilterItemCloseIconWrap, CloseIcon } from './styled'
 
const FilterItem = props => {
    const {
        value,
        onClick
        // updateFilters,
        // update,
        // title,
        // subFilter,
        // updatePageFilters,
    } = props

    return <FilterItemEl>
        <FilterItemTitle>{value}</FilterItemTitle>
        <FilterItemCloseIconWrap 
            data-value={value}
            onClick={onClick}>
                <CloseIcon />
        </FilterItemCloseIconWrap>
    </FilterItemEl>
}

export { FilterItem }