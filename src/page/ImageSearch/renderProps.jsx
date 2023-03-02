import React, {
    createRef,
    useRef,
    useState
} from 'react'
import {
    UserInputWrapper,
    ImageUploadIcon,
    UploadedProductImage,
    SearchResultWrapper,
    UploadedImgWrapper,
    FormWrapper
} from './styled'
import { Input, Select, ProductCarouselWithTabs } from '../../component'
import {
    RecommendationSearchContainer,
    RecommendationSearchConsumer,
    ConfigConsumer
} from '../../container'

import { DefaultValues } from '../../configs'

const UploadInputref = createRef()

const uploadImage = (file, image_search, API_KEY, default_url) => {
    let upload_endpoint = image_search['upload_endpoint'] ? image_search['upload_endpoint'] : (default_url + "/upload")
    let formData = new FormData()

    if(upload_endpoint && file.length) {
        if(typeof(file) === 'string') {
            formData.append('image_url', file)
        }
        else {
            formData.append('image', file[0])
        }    
        formData.append('api_key', API_KEY)

        return fetch(
            upload_endpoint,
            {
                method: 'POST',
                body: formData
            }
        )
        .then(data => data.json())
        .then(resp => {
            if(resp && resp.status && resp.status.toLowerCase() === 'success' && resp.data && resp.data.mad_id) {
                return resp.data.mad_id
            }
            console.log('No Mad Id in response')
            return ''
        })
        .catch(err => {
            console.log(err)
            return ''
        })
    }
    return ''
}

const getTags = (file, requiredProps) => {
    const {
        image_search,
        image_type,
        correlation_key,
    } = requiredProps
    let tag = DefaultValues['vue_tag_url']
    let api_key = DefaultValues['vue_tag_api_key']
    if(image_search['tag_endpoint']){
        tag = image_search['tag_endpoint']
    }
    if(image_search['API_KEY']){
        api_key = image_search['API_KEY']
    }
    
    if(tag && file && file.length) {
        let formData = new FormData()
        formData.append('api_key', api_key)
        formData.append('correlation_key', correlation_key)
        formData.append('image_type', image_type)
        if(typeof(file) === 'string') {
            formData.append('image', file)
            formData.append('image_url', file)
        }
        else {
            formData.append('image', file[0])
        }

        return fetch(
            tag,
            {
                method: 'POST',
                body: formData
            }
        )
        .then(data => data.json())
        .then(resp => resp)
        .catch(err => console.log(err))
    }
}

const incrementCounter = (image_search) => {
    const { counter } = image_search
    if(counter) {
        fetch(
            counter,
            {
                method: 'POST',
                body: 'type=image_search'
            }
        )
        .then(data => data.json())
        .then(resp => {
            if(resp && resp.status && resp.status.toLowerCase() !== 'success') {
                console.log('Increment Counter Call failed')
            }
        })
        .catch(err => console.log(err))
    }
}

const makeAPIRequests = (file, updateimageSearchData, requiredProps) => {
    const {
        image_search,
        API_KEY,
        default_url
    } = requiredProps
    Promise.all([
        uploadImage(file, image_search, API_KEY, default_url),
        getTags(file, requiredProps),
        //incrementCounter(image_search)
    ])
    .then(response => {
        if(response && response.length) {
            updateimageSearchData(currResp => {
                let UploadedResp = { ...currResp }
                if(response[0]) {
                    UploadedResp.madId = response[0]
                }
                if(response[1] && response[1].status && response[1].status.toLowerCase() === 'success') {
                    UploadedResp.tagsResp = { ...response[1] }
                }
                return UploadedResp
            })
        }
    })
    .catch(err => console.log(err))
}

const ConstructImageSrc = (file, updateRespObj) => {
    if(file && file.length) {
        if(typeof(file) === 'string') {
            updateRespObj(currResp => {
                let UpdatedResp = {...currResp}
                UpdatedResp.imgSrc = file
                return UpdatedResp
            })                
        }
        else {
            const reader = new FileReader();

            reader.onload = function (e) {
                updateRespObj(currResp => {
                    let UpdatedResp = {...currResp}
                    UpdatedResp.imgSrc = e.target && e.target.result ? e.target.result : ''
                    return UpdatedResp
                })
            }

            reader.readAsDataURL(file[0]);
        }
    }
}

const RenderImageSearchInput = props => {
    const {
        updateimageSearchData
    } = props
    const currFile = useRef(null)
    const [ CurrInputValue, updateInputValue ] = useState('')

    return <UserInputWrapper>
        <ConfigConsumer>
            {context => {
                const {
                    vue_find,
                    image_type,
                    correlation_key,
                    url
                } = context
                let API_KEY = context.API_KEY
                let default_url = url
                const image_search = vue_find && vue_find.children && vue_find.children.image_search ? vue_find.children.image_search : {}
                if(image_search && image_search.API_KEY) {
                    API_KEY = image_search.API_KEY
                }
                const requiredProps = {
                    image_search,
                    API_KEY,
                    image_type,
                    correlation_key,
                    default_url
                }
                return  <FormWrapper onSubmit={e => {
                    e.preventDefault()
                    makeAPIRequests(CurrInputValue, updateimageSearchData, requiredProps)
                    ConstructImageSrc(CurrInputValue, updateimageSearchData)
                }}>
                    <Input
                        value={CurrInputValue}
                        type='text'
                        placeholder='Enter the Image URL here'
                        onInput={e => updateInputValue(e.currentTarget.value || '')}
                    />
                    <Input type='submit' value='SEARCH' />
                    <Input
                        accept="image/x-png,image/jpeg" 
                        hidden
                        type='file'
                        inputRef={UploadInputref}
                        onChange={e => {
                            currFile.current = e.currentTarget && e.currentTarget.files ? e.currentTarget.files : null
                            if(currFile.current && currFile.current.length) {
                                makeAPIRequests(currFile.current, updateimageSearchData, requiredProps)
                                ConstructImageSrc(currFile.current, updateimageSearchData)
                            }
                            else {
                                console.log('No files selected')
                            }
                        }}
                    />
                    <ImageUploadIcon onClick={e => {
                        UploadInputref.current.click()
                    }}/>
                    <Select list={['men', 'women']} onChange={e => {
                        updateimageSearchData(currState => {
                            let updatedState = { ...currState }
                            updatedState.gender = e.currentTarget && e.currentTarget.value ? e.currentTarget.value : 'men'
                            return updatedState
                        })
                    }}/>
                </FormWrapper>        
            }}
        </ConfigConsumer>
    </UserInputWrapper>
}

const constructTabs = labelsArr => {
    let TabsData = []
    if(labelsArr && labelsArr.length) {
        TabsData = labelsArr.map((label, key) => {
            const labelArr = label.split('>')
            const labelArrLen = labelArr.length
            return {
                value: labelArr[labelArrLen - 1],
                index: key.toString()
            }
        })
    }
    return TabsData
}

const RenderSearchResults = props => {
    const {
        madId,
        gender,
        src,
        internal_image_url,
        debug
    } = props

    return <RecommendationSearchContainer madId={madId} gender={gender} debug={debug}>
        <SearchResultWrapper>
            {(internal_image_url || src) ? 
                <UploadedImgWrapper>
                    <UploadedProductImage src={internal_image_url || src} alt='Uploaded Product Image' />
                </UploadedImgWrapper>
            : null}
            <RecommendationSearchConsumer>
                {context => {
                    let RecommendedSearchMap = {}
                    context && context.data && context.data.map((item, key) => {
                        RecommendedSearchMap[key] = [ ...item ]
                        return item
                    })
                    const tabsData = constructTabs(context.labels || [])
                    return <ProductCarouselWithTabs
                        tabsContainer={tabsData}
                        activeIndex='0'
                        recommendedData={RecommendedSearchMap}
                        sliderPerGroup={4}
                        hidePrice={true}
                        hideMSDOntology={true}
                        force_debug={debug}
                    />
                }}
            </RecommendationSearchConsumer>
        </SearchResultWrapper>
    </RecommendationSearchContainer>
}

export {
    RenderImageSearchInput,
    RenderSearchResults
}