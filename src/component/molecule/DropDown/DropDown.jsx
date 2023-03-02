import React, { useState } from 'react'
import {
    DropDownEl,
    DropDownWrapper,
    DropDownParentWrapper,
    StyledLink
} from './styled'
import { ConfigConsumer } from '../../../container'

const DropDown = props => {
    const {
        ParentEl,
        list,
        parentKey,
        ...remainingProps
    } = props
    const [ isActive, toggleActive ] = useState(false)

    return <>
        <DropDownParentWrapper onClick={e => toggleActive(!isActive)}>
            <ParentEl {...remainingProps} isActive={isActive} />
        </DropDownParentWrapper>
        <ConfigConsumer>
        {context => {
            if(context[parentKey] && context[parentKey].active && context[parentKey].children) {
                const enabledMenu = context[parentKey].children
                return <DropDownWrapper isActive={isActive}>
                {
                    Object.keys(list).map((listItem, key) => {
                        if(listItem && enabledMenu[listItem] && enabledMenu[listItem].active) {
                            const {
                                title,
                                link,
                                target
                            } = list[listItem]

                            let AnchorEl = <DropDownEl
                                href={link}
                                target={target || '_blank'}
                                key={`DropDown_${key}`}
                                onClick={e => toggleActive(!isActive)}
                            >
                                {title}
                            </DropDownEl>
                            if(target && target === '_self') {
                                AnchorEl = <StyledLink
                                    to={link}
                                    target={target}
                                    key={`DropDown_${key}`}
                                    onClick={e => toggleActive(!isActive)}
                                >
                                    {title}
                                </StyledLink>
                            }

                            return link ? AnchorEl
                                : <DropDownEl as='div' key={`DropDown_${key}`}>{title}</DropDownEl>
                        }
                        return null
                    })
                }
                </DropDownWrapper>
            }
            return <></>
        }}
        </ConfigConsumer>
    </>
}

export { DropDown }