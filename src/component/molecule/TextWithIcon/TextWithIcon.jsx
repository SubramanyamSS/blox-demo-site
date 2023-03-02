import React from 'react'
import { TextWithIconWrapper, StyledLink } from './styled'
import { TextIconWrapper } from './renderProps'

const TextWithIcon = props => {
    const {
        title,
        redirectLink,
        isSeparator,
        isCurrentPath,
        externalLink,
        ...remainingProps
    } = props;

    return <>
        {
            redirectLink ?
                <TextWithIconWrapper
                    title={title || ''}
                    isSeparator={isSeparator || false}
                >
                    <StyledLink to={redirectLink}>
                        <TextIconWrapper {...remainingProps} isCurrentPath={isCurrentPath} />
                    </StyledLink>
                </TextWithIconWrapper> :
                <TextWithIconWrapper
                    title={title || ''}
                >
                    <TextIconWrapper {...remainingProps} externalLink={externalLink} />
                </TextWithIconWrapper>
        }
    </>
}

export { TextWithIcon }