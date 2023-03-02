import React from 'react'
import {
    TextElement,
    IconElement
} from './styled'
import { DropDown } from '../../molecule'

const TextWithIconEl = props => {
    const {
        text,
        leftIcon,
        rightIcon,
        isActive,
        isExternal,
        redirectLink,
        externalLink,
        isCurrentPath
    } = props;
    const handleClick = evt => {
        if (isExternal) {
            evt.stopPropagation();
            window.open(externalLink);
        }
    };
    return <>
        {/* {leftIcon ? <IconElement src={leftIcon}/> : null} */}
        <TextElement isCurrentPath={isCurrentPath}  onClick={handleClick}>{text}</TextElement>
        {rightIcon ? <IconElement src={rightIcon} isActive={isActive} /> : null}
    </>
}
const TextIconWrapper = props => {
    const {
        children,
        ...remainingProps
    } = props
    return children ? <DropDown ParentEl={TextWithIconEl} list={children} {...remainingProps} />
    : <TextWithIconEl {...remainingProps} />
}

export {
    TextIconWrapper
}