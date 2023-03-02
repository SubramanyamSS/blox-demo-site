import React, { useState } from 'react'
import { InputEl } from './styled'

const Input = props => {
    const {
        value,
        placeholder,
        onChange,
        inputRef,
        ...remainingProps
    } = props
    const [ defaultValue, setValue ] = useState(value)

    return <InputEl
        value={defaultValue || ''}
        placeholder={placeholder}
        onChange={onChange || (e => {
            const curEl = e.currentTarget
            const value = curEl && curEl.value ? curEl.value : ''
            setValue(value)
        })}
        ref={inputRef || null}
        {...remainingProps}
    />
}

export { Input }