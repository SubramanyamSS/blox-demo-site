import React from 'react'
import { SelectEl } from './styled'

const Select = props => {
    const {
        list,
        onChange,
        ...remainingProps
    } = props
    
    return <SelectEl {...remainingProps} onChange={onChange || null}>
        {list.map((item, key) => <option value={item} key={`options_${key}`}>{item}</option>)}
    </SelectEl>
}

export { Select }