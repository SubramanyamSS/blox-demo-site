import React, {
    useState,
    useEffect,
    createContext
} from 'react'
import { ConfigConsumer } from './Config'
import { getCookie } from '../common'

const DiscoverContext = createContext({})
const { Provider, Consumer } = DiscoverContext

const fetchDiscoverProducts = (discoverProds, updatePdtEvent, Config, currPage, loading) => {
    const DiscoverData = Config.discover || {}
    const vueX = DiscoverData.vueX;
    const endPoint = DiscoverData.endPoint ? DiscoverData.endPoint : Config.url
    let fields = ["id","product_id","category","ontology","link","image_link","small_image_link","internal_image_url"];
    let numResults = 50;
    if(DiscoverData.discoverPayload && DiscoverData.discoverPayload.fields) {
        fields = DiscoverData.discoverPayload.fields;
    }
    if(DiscoverData.discoverPayload && DiscoverData.discoverPayload.num_results) {
        numResults = DiscoverData.discoverPayload.num_results;
    }
    let discoverPageUrl = DiscoverData.path ? DiscoverData.path : ''
    let API_KEY = ''
    if (DiscoverData.API_KEY) {
        API_KEY = Config.API_KEY
    }
    else {
        API_KEY = Config.API_KEY
    }
    const UUID = getCookie('mad_UUID')
    let userId = localStorage.getItem('userId')
    if (!userId) {
        userId = Config.user_id
    }
    let postData = `api_key=${API_KEY}&user_id=${userId}&details=true&num_results=${numResults}&uuid=${UUID}&is_from_demo_site=true&fields=${JSON.stringify(fields)}`

    if (Object.keys(Config).length > 0 && Config.config && Config.config.cardType == "video") {
        discoverPageUrl = '/widgets'
        postData = `widget_list=[12]&page_number=${currPage}&num_results=${numResults}&force="true"&api_key=${API_KEY}&user_id=${userId}&details=true&uuid=${UUID}&is_from_demo_site=true&fields=${JSON.stringify(fields)}`
    }

    if (vueX) {
        const data = {
            "fields": fields,
            "num_results": numResults
        }
        postData = JSON.stringify(data);
    }

    const constructedURL = endPoint + discoverPageUrl
    if (constructedURL && API_KEY && UUID) {
        fetch(
            constructedURL,
            {
                headers: {
                    ...(vueX ? {'Content-type': 'application/json'} : {'Content-type': 'application/x-www-form-urlencoded'}),
                    ...(vueX ? {"x-api-key": API_KEY} : '')
                },
                method: 'POST',
                body: postData
            }
        )
            .then(data => data.json())
            .then(resp => {
                if (resp) {
                    loading.current = false
                    let _data = vueX ? resp.Products : resp.data
                    if (Object.keys(Config).length > 0 && Config.config &&  Config.config.cardType == "video") {
                        _data = resp.data[0]
                    }
                    if (discoverProds && discoverProds.data) {
                        let _existing_data = discoverProds.data
                        _existing_data.push(..._data)
                        _data = _existing_data
                    }
                    resp.data = _data
                    Object.assign(resp, Config)
                    updatePdtEvent(resp)
                }
            })
            .catch(err => {
                console.log(err)
                loading.current = false
            })
    }
}

const DiscoverContainer = props => {
    const {
        children,
        currPage,
        loading
    } = props
    const [discoverProds, updateDiscoverProds] = useState({})
    const [config, updateConfig] = useState({})

    useEffect(() => fetchDiscoverProducts(discoverProds, updateDiscoverProds, config, currPage, loading), [config, currPage])
    return <ConfigConsumer>
        {context => {
            updateConfig(context)
            return <Provider value={discoverProds}>
                {children}
            </Provider>
        }}
    </ConfigConsumer>
}

export {
    DiscoverContainer,
    Consumer as DiscoverConsumer
}