import HomeDiscover from "./static/svg/home.svg";
import VueFind from "./static/svg/search.svg";
import VueTag from "./static/svg/tag.svg";
import VueModel from "./static/svg/username.svg";
import VueStudio from "./static/svg/play_2.svg";
import VueDocs from "./static/svg/pdp.svg";
import DownArrow from "./static/svg/down.svg";
import VueConfig from "./static/svg/setting.svg";
import CartIcon from "./static/svg/cart.svg";
import CarsIcon from "./static/svg/cars.svg";
import DentalIcon from "./static/svg/dental.svg";
import EmailsIcon from "./static/svg/emails.svg";
import FashionIcon from "./static/svg/fashion.svg";
import IdCardIcon from "./static/svg/idcard.svg";
import InsuranceIcon from "./static/svg/insurance.svg";
import InvoiceIcon from "./static/svg/invoice.svg";
import ProductReviewsIcon from "./static/svg/productreviews.svg";
import VideosIcon from "./static/svg/videos.svg";
import FurnitureIcon from "./static/svg/furniture.svg";
import InsuranceAltIcon from "./static/svg/insurance_alt.svg";

const Config = {
  image_type: 1,
  discover: {
    active: true,
    endPoint: "https://ap-southeast-1-api.madstreetden.com",
    recommendation: "https://ap-southeast-1-api.madstreetden.com/widgets",
    path: "/discover",
  },
  vue_find: {
    active: true,
    children: {
      text_search: {
        active: true,
        endPoint: "https://ap-southeast-1-client-staging.madstreetden.com",
        categoryList: "//v2/widgets",
      },
      category_list: {
        active: true,
        endPoint: "https://ap-southeast-1-client-staging.madstreetden.com",
        categoryList: "//v2/widgets",
        categoryMenu: "/v2/clp_discover",
      },
      image_search: {
        active: true,
        upload_endpoint: "https://ap-southeast-1-api.madstreetden.com/upload",
        tag_endpoint:
          "https://vuetag-staging.madstreetden.com/pocclient/api/v1/tag",
        counter: "/incrementcounter/",
        search_endpoint: "https://ap-southeast-1-api.madstreetden.com/search",
      },
    },
  },
  vue_tag: {
    active: true,
    multiImage: false,
    upload_endpoint: "https://ap-southeast-1-api.madstreetden.com/upload",
    tag_endpoint:
      "https://vuetag-staging.madstreetden.com/pocclient/api/v1/tag",
    counter: "/incrementcounter/",
  },
  vue_model: {
    active: false,
  },
  vue_studio: {
    active: false,
  },
  vue_user: {
    active: true,
    recommendation: "https://ap-southeast-1-api.madstreetden.com/widgets",
  },
  vue_docs: {
    active: true,
    children: {
      docs: {
        active: true,
      },
      catalog: {
        active: true,
      },
    },
  },
  products: {
    active: true,
    children: {
      commerce: {
        active: true,
      },
      mail: {
        active: true,
      },
      studio: {
        active: true,
      },
      tag: {
        active: true,
      },
    },
  },
  config: {
    active: true,
  },
  productDetails: {
    endPoint: "https://ap-southeast-1-api.madstreetden.com",
    productInfo: "/get_product_meta",
    productRecommendation: "/widgets",
    similarRecommendation: "/widgets",
    personalizedRecommendation: "/widgets",
  },
};

const DefaultUserUrl = {
  endPoint: "https://" + window.location.hostname,
  signin: "/api/signin/",
  signout: "/api/signout/",
  update_config: "/api/update_config/",
  curations: "/api/curations/",
  curatedProducts: "/api/curation/",
};
if (
  window.location.hostname != "demo.vue.ai" &&
  window.location.hostname != "yoox-demo.vue.ai" &&
  window.location.hostname != "v2-demo.vue.ai"
) {
  DefaultUserUrl["endPoint"] = "http://" + window.location.hostname + ":8000";
}
DefaultUserUrl["endPoint"] = "https://demo.vue.ai";

const HeaderVueContent = {
  discover: {
    leftIcon: `${HomeDiscover}`,
    text: "Home",
    redirectLink: "/discover",
    title: "Home",
    7: "Recently Viewed Products",
    1: "Inspired by Browsing History",
    11: "Recommended For You",
    3: "Trending",
    27: "Random Products",
  },
  vue_find: {
    leftIcon: `${VueFind}`,
    rightIcon: `${DownArrow}`,
    text: "Vue Find",
    title: "Vue Find",
    children: {
      text_search: {
        title: "Text Search",
        link: "/vuefind/search",
        target: "_self",
      },
      category_list: {
        title: "Category List",
        link: "/vuefind/category",
        target: "_self",
      },
      image_search: {
        title: "Image Search",
        link: "/image-search",
        target: "_self",
      },
    },
  },
  vue_tag: {
    leftIcon: `${VueTag}`,
    text: "Vue Tag",
    redirectLink: "/tagging",
    title: "Vue Tag",
    isSeparator: true,
  },
  vue_model: {
    leftIcon: `${VueModel}`,
    text: "Vue Model",
    redirectLink: "/vuemodel",
    title: "Vue Model",
  },
  vue_studio: {
    leftIcon: `${VueStudio}`,
    text: "Vue Studio",
    redirectLink: "/vuestudio",
    title: "Vue Studio",
  },
  vue_docs: {
    leftIcon: `${VueDocs}`,
    rightIcon: `${DownArrow}`,
    text: "Docs",
    title: "Docs",
    children: {
      docs: {
        title: "API Docs",
        link: "https://docs.vue.ai",
      },
      catalog: {
        title: "Product Catalog",
        link:
          "https://s3.amazonaws.com/msd-frontend/demosite-assets/docs/Product+Catalog+-+Final.pdf",
      },
    },
  },
  products: {
    rightIcon: `${DownArrow}`,
    text: "Products",
    title: "Products",
    children: {
      commerce: {
        title: "Vue Commerce",
        link:
          "https://vue.ai/omnichannel-personalization-fashion-ecommerce-retail/",
      },
      mail: {
        title: "Vue Mail",
        link: "https://vue.ai/solutions/vue-mail.html",
      },
      studio: {
        title: "Vue Studio",
        link: "https://vue.ai/solutions/vue-social.html",
      },
      tag: {
        title: "Vue Tag",
        link: "https://vue.ai/automated-product-tagging/",
      },
    },
  },
  // "config": {
  //     "leftIcon": `${VueConfig}`,
  //     "redirectLink": "/configuration",
  //     "text": "Configuration",
  //     "title": "Configuration",
  //     "isSeparator": true,
  // }
};

const UserDataAttrs = {
  recommendationText: "View Recommendations",
  recentlyVisited: "Recently Viewed Products",
  browsingHistory: "Inspired by Browsing History",
  recommendation: "Recommended For You",
  aiStylePicks: "AI Style Pics For You",
  sliderPerGroup: 5,
};

const VueTagCarousel = [
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/947f1c38ea46046240efceff036d2827.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/1540794_246370.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/Fashion_Nova_06-19-17-468_1000x.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/04344706_zi_black.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/trousers_big_1.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/indian-terrain-men-shirts.jpg",
  },
  {
    src: "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/52735334.jpeg",
  },
  {
    src: "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/A1_2.jpg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/goods_67_400711.jpeg",
  },
  {
    src:
      "http://demo-old.vue.ai/vuetag-dev/images/thumbnails/wedp01ke_icy_2.jpg",
  },
];

const DefaultValues = {
  vue_tag_url: "https://vuetag-staging.madstreetden.com/pocclient/api/v1/tag",
  vue_tag_api_key: "b60018ff877789ba0dab3a1ef098d5792533ba45",
};

const segments = {
  list: [
    {
      id: 1,
      name: "Fashion",
    },
    {
      id: 2,
      name: "Home/Furniture",
    },
    {
      id: 3,
      name: "Grocery",
    },
    {
      id: 4,
      name: "Image moderation/Image guidelines",
    },
  ],
  data: {
    fashion: {
      apiKey: "f4950814fc13a24ae12ec35426fb5b2e70a5617e",
      correlationKey: "d1d61d5f28064151b4b00aabe657f625",
      getTag: "https://vuetag.madstreetden.com/api/v1/tag",
      list: [
        {
          id: 1,
          url: "https://cdn.yoox.biz/34/34869997ML_12_F.JPG",
        },
        {
          id: 2,
          url: "https://cdn.yoox.biz/38/38821927KG_12_F.JPG",
        },
        {
          id: 3,
          url: "https://cdn.yoox.biz/42/42740274TH_12_F.JPG",
        },
        {
          id: 4,
          url: "https://cdn.yoox.biz/39/39880786CN_12_F.JPG",
        },
        {
          id: 5,
          url: "https://cdn.yoox.biz/15/15029703HV_12_F.JPG",
        },
        {
          id: 6,
          url: "https://cdn.yoox.biz/38/38792822DJ_12_F.JPG",
        },
        {
          id: 7,
          url: "https://cdn.yoox.biz/14/14036566UH_12_F.JPG",
        },
        {
          id: 8,
          url: "https://cdn.yoox.biz/38/38891891XL_12_F.JPG",
        },
        {
          id: 9,
          url: "https://cdn.yoox.biz/38/38911160VD_12_F.JPG",
        },
        {
          id: 10,
          url: "https://cdn.yoox.biz/34/34763003BH_12_F.JPG",
        },
        {
          id: 11,
          url: "https://cdn.yoox.biz/34/34961994ES_12_F.JPG",
        },
        {
          id: 12,
          url: "https://cdn.yoox.biz/34/34981368XV_12_F.JPG",
        },
      ],
    },
    "home/furniture": {
      list: [
        {
          id: 1,
          url:
            "https://images.hayneedle.com/mgen/master:ACG1622.jpg?is=800%2C800",
        },
        {
          id: 2,
          url:
            "https://images.hayneedle.com/mgen/master:ABBY998.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 3,
          url:
            "https://images.hayneedle.com/mgen/master:ABBY2423.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 4,
          url:
            "https://images.hayneedle.com/mgen/master:ABBI002.jpg?is=800%2C800",
        },
        {
          id: 5,
          url:
            "https://images.hayneedle.com/mgen/options:AA1636_15_BrownAuburnBay.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 6,
          url:
            "https://images.hayneedle.com/mgen/master:ABBY2215.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 7,
          url:
            "https://images.hayneedle.com/mgen/master:AA1325.jpg?is=800%2C800",
        },
        {
          id: 8,
          url:
            "https://images.hayneedle.com/mgen/master:AA1481.jpg?is=800%2C800",
        },
        {
          id: 9,
          url:
            "https://images.hayneedle.com/mgen/master:ABBY2315.jpg?is=800%2C800",
        },
        {
          id: 10,
          url:
            "https://images.hayneedle.com/mgen/options:ABBY2502_15_Black.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 11,
          url:
            "https://images.hayneedle.com/mgen/master:ABBY2461.jpg?is=1600,1600,0xffffff",
        },
        {
          id: 12,
          url:
            "https://images.hayneedle.com/mgen/master:AA1641.jpg?is=1600,1600,0xffffff",
        },
      ],
    },
    grocery: {
      list: [
        {
          id: 1,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jjolt3k0/cookie-biscuit/k/r/y/150-20-20-butter-cookies-parle-original-imaf77zf3y2xsww2.jpeg?q=70",
        },
        {
          id: 2,
          url:
            "https://rukminim1.flixcart.com/image/600/600/kc0u7bk0/cheese/f/m/2/200-cheese-spread-capsicum-processed-cheese-nandini-original-imaft8rbsd7aytdv.jpeg?q=70",
        },
        {
          id: 3,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jwjkh3k0/baking-ingredient/g/z/g/500-custard-powder-custard-powder-weikfield-original-imafh7fhr47wuuur.jpeg?q=70",
        },
        {
          id: 4,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jed4sy80/snack-savourie/d/y/y/185-palak-sticks-pouch-maiyas-original-imaf32a3sxg7xbhz.jpeg?q=70",
        },
        {
          id: 5,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jhgl5e80/milk-drink-mix/4/h/5/400-iq-premium-chocolate-flavour-carton-simmom-original-imaf5h4hkyeuh9y9.jpeg?q=70",
        },
        {
          id: 6,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jqfinww0/nut-dry-fruit/z/b/p/500-na-pouch-oriog-fresh-original-imafcgb5vc59ghzk.jpeg?q=70",
        },
        {
          id: 7,
          url:
            "https://rukminim1.flixcart.com/image/600/600/ka73y4w0/energy-sport-drink-mix/t/f/c/1-instant-energy-glucon-d-original-imafrtp6s2bzfdrq.jpeg?q=70",
        },
        {
          id: 8,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jq4353k0/milk-drink-mix/q/9/e/750-classic-malt-pouch-horlicks-original-imafc7agrpzhscag.jpeg?q=70",
        },
        {
          id: 9,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jpu324w0/tea/v/p/g/120-hot-sip-herbal-infusion-dabur-honitus-leaves-granules-original-imafbqsfzyzh3jhx.jpeg?q=70",
        },
        {
          id: 10,
          url:
            "https://rukminim1.flixcart.com/image/600/600/jnc2bgw0/sauce-ketchup/v/p/q/25-white-pasta-pouch-sauce-weikfield-original-imafaf599qy5ghe5.jpeg?q=70",
        },
        {
          id: 11,
          url:
            "https://rukminim1.flixcart.com/image/600/600/j612c280/cookie-biscuit/u/g/f/300-dark-fantasy-chocofills-cream-biscuit-sunfeast-original-imaewh4hqahpwk5f.jpeg?q=70",
        },
        {
          id: 12,
          url:
            "https://rukminim1.flixcart.com/image/600/600/k3ncakw0/cereal-flake/q/h/g/800-corn-flakes-plus-original-and-healthier-pouch-bagrry-s-original-imafmpzxf6vnyyh5.jpeg?q=70",
        },
      ],
    },
    "image moderation/image guidelines": {
      correlationKey: "d1d61d5f28064151b4b00aabe657f625",
      apiKey: "37b97a3f29d5a173a60e45a4e0411d9dc341f49d",
      putTag: "https://vuetag.madstreetden.com/mercadolibre/api/v1/put_tag",
      getTag: "https://vuetag.madstreetden.com/mercadolibre/api/v1/get_tag",
      list: [
        {
          id: 1,
          url:
            "http://mlb-s2-p.mlstatic.com/900746-MLA43269056850_082020-O.jpg",
        },
        {
          id: 2,
          url:
            "http://mlb-s2-p.mlstatic.com/934017-MLA43238535907_082020-O.jpg",
        },
        {
          id: 3,
          url:
            "http://mlb-s2-p.mlstatic.com/662321-MLA43239357763_082020-O.jpg",
        },
        {
          id: 4,
          url:
            "http://mlb-s2-p.mlstatic.com/716590-MLA43313398984_082020-O.jpg",
        },
        {
          id: 5,
          url:
            "http://mlb-s2-p.mlstatic.com/804619-MLA43271372028_082020-O.jpg",
        },
      ],
    },
  },
};

const TaggingData = [
  {
    id: 1,
    type: "product_tagging",
    heading: "Product Tagging",
    apiKey: "f4950814fc13a24ae12ec35426fb5b2e70a5617e",
    getTag: "https://v2-demo.vue.ai/api/v2/tag/",
    correlationKey: "d1d61d5f28064151b4b00aabe657f625",
    showInTaggingHomePage: true,
    tagType: "tags",
    description: [
      {
        id: 1,
        icon: "/static/media/cart.f69b4b76.svg",
        description: "All retail products",
        active: true,
      },
      {
        id: 2,
        icon: "/static/media/fashion.748c5b13.svg",
        description: "Fashion, grocery, beauty, home",
        active: true,
      },
      {
        id: 3,
        icon: "/static/media/insurance.a542af05.svg",
        description: "Image guidelines",
        redirectLink: "/tagging/image_guidelines",
        active: true,
      },
    ],
    input_type: "search",
    catalog_title: "Or, click on one of the products below",
    catalog: [
      {
        id: 1,
        url:
          "https://images-cdn.vuetag.ai/2253_yoox-poc/2253_yoox-poc_13082103ER.jpg",
        title: "Stella Mccartney Women Casual trouser Deep jade 14 UK",
        brand: "Stella Mccartney",
        price: "279",
        response: {
          status: "SUCCESS",
          correlation_key: "d1d61d5f28064151b4b00aabe657f625",
          image_type: {},
          meta: {
            processing_time: 4.520137548446655,
            total_time: 4.564769506454468,
            image_download_time: 0.1060028076171875,
            mapping_versions: {
              client_tags:
                "prod/ST_mapping_333/EvR1fGP6XSf.3dyb85k_DRbhFzUp7XE.",
            },
          },
          image_url:
            "https://images-cdn.vuetag.ai/2253_yoox-poc/2253_yoox-poc_13082103ER.jpg",
          mad_id: "b9ee14dc-6752-599b-b7ed-51d72879c994",
          message: "Image Tagged Successfully",
          data: [
            {
              category: "pant",
              tags: {
                "Base Color": [["Blue", 0.9960384463999448]],
                Description: [
                  [
                    "This is a versatile piece that looks good all day long. It comes with a slimming fit.",
                    1,
                  ],
                ],
                Fit: [["Slim", 1]],
                "Color Hex": [["#2D5C8B", 0.9960384463999448]],
                Color: [["steelblue", 0.9960384463999448]],
                "Style & Occasion": [
                  ["All Day Wear", 1],
                  ["Classic", 0.658],
                ],
                Title: [["Slim Casual Trousers", 1]],
                Length: [["Ankle Length", 1]],
                Type: [["Casual Trouser", 1]],
                "Secondary Pattern": [["Texture", 1]],
                "Primary Pattern": [["Plain", 1]],
              },
              msd_tags: {
                PantsStyleL1: [["casual_trouser", 1]],
                "Base Color": [["Blue", 0.9960384463999448]],
                PantsStyleL2: [["_NEGATIVE", 0.96]],
                GarmentType: [["model", 1]],
                "Color Hex": [["#2D5C8B", 0.9960384463999448]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.9]],
                PatternLowerL1: [["Plain", 1]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["officewear", 0.89],
                  ["classic", 0.658],
                ],
                PantLength: [["ankle", 1]],
                PlainLowerL2: [["Texture", 0.51]],
                DenimWash: [["Dark Rinse", 1]],
                ImageType: [["Front View", 0.98]],
                PantFit: [["slim", 1]],
              },
              pos:
                "Vkd4c1NWWnNTbGROTTBKSFdsWlZNVlpIVVhsYVJUVm9Za1phTmxVeFZsTlRhekIzVGxaU2EwMXRVbEJWYTFaR1RWWmtSMUpVYkZGVlZEQTU=",
              object_id:
                "332_twoface_b9ee14dc-6752-599b-b7ed-51d72879c994_MTI1XzI1XzI3NV80MDlwYW50",
              location: [0, 0, 10, 10],
              productType: ["Pants", 0.83],
            },
            {
              category: "top",
              tags: {
                Color: [["black", 1]],
                Pattern: [["Solid", 0.66]],
                "Color Hex": [["#0A0A0A", 1]],
                "Base Color": [["Black", 1]],
                "Sleeve Length": [["Short Sleeve", 0.51]],
              },
              msd_tags: {
                PantsStyleL1: [["casual_trouser", 1]],
                "Base Color": [["Black", 1]],
                PantsStyleL2: [["_NEGATIVE", 0.96]],
                OuterwearCategory: [["shrugs", 0.27]],
                "Color Hex": [["#0A0A0A", 1]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.9]],
                PatternLowerL1: [["Plain", 1]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["officewear", 0.89],
                  ["classic", 0.658],
                ],
                PantLength: [["ankle", 1]],
                PatternUW: [["solid", 0.66]],
                SleeveLength: [["short", 0.51]],
                PlainLowerL2: [["Texture", 0.51]],
                DenimWash: [["Dark Rinse", 1]],
                PantFit: [["slim", 1]],
                OuterwearPatternL1: [["plain", 0.99]],
                ImageType: [["Front View", 0.98]],
                GarmentType: [["model", 1]],
              },
              pos:
                "VkZWd1ZWUnNXbGROTTBKSFdsWlZNVTVYVVhsYVJUVlNUVEpTZFZaR1pIZFhhekZXWlVWU1VsWkZTazlWYlhCQ1QxRTlQUT09",
              object_id:
                "332_twoface_b9ee14dc-6752-599b-b7ed-51d72879c994_MTI3XzBfMjY1XzQwdG9w",
              location: [0, 0, 10, 10],
              productType: ["Tops", 0.16],
            },
            {
              category: "footwear",
              tags: {
                "Base Color": [["Black", 0.992]],
                Description: [
                  [
                    "This modish pair of open-toed sandals makes styling your look so easy. Keep it cool and stylish by pairing this one with a spaghetti strap bodycon dress and a sling bag.",
                    1,
                  ],
                ],
                Title: [["Open Toe Sandals", 1]],
                Color: [
                  ["wheat", 0.533297984960875],
                  ["black", 0.3750057066446621],
                ],
                "Color Hex": [
                  ["#E2BDA5", 0.533297984960875],
                  ["#0D0A02", 0.3750057066446621],
                ],
                "Toe Type": [["Open Toe", 1]],
                Type: [["Sandals", 0.97]],
              },
              msd_tags: {
                PantsStyleL1: [["casual_trouser", 1]],
                "Base Color": [
                  ["Neutral", 0.533297984960875],
                  ["Black", 0.3750057066446621],
                ],
                PantsStyleL2: [["_NEGATIVE", 0.96]],
                GarmentType: [["model", 1]],
                "Color Hex": [
                  ["#E2BDA5", 0.533297984960875],
                  ["#0D0A02", 0.3750057066446621],
                ],
                FootwearType: [["sandals", 0.97]],
                ToeStyle: [["round", 0.59]],
                BootHeight: [["thigh_high", 0.51]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.9]],
                PatternLowerL1: [["Plain", 1]],
                FootwearColor: [["Black", 0.992]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["officewear", 0.89],
                  ["classic", 0.658],
                ],
                PantLength: [["ankle", 1]],
                HeelType: [["not_visible", 1]],
                ToeType: [["open", 1]],
                PlainLowerL2: [["Texture", 0.51]],
                DenimWash: [["Dark Rinse", 1]],
                HeelHeight: [["not_visible", 1]],
                ImageType: [["Front View", 0.98]],
                PantFit: [["slim", 1]],
              },
              pos:
                "VTJ0U1IxRnJiRmROTTBKTFdsVlZNVlpIVVhsYVJUbFRVbFpXTTFaRlZrOVJiVlpXVGxoR1ZsZEZOVXRWYTFwR1RVWlJkMWRZWkZGVlZEQTU=",
              object_id:
                "332_twoface_b9ee14dc-6752-599b-b7ed-51d72879c994_MjE1XzQxNF8yNjRfNDg4Zm9vdHdlYXI=",
              location: [0, 0, 10, 10],
              productType: ["Footwear", 0.72],
            },
            {
              category: "footwear",
              tags: {
                "Base Color": [["Black", 0.988]],
                Description: [
                  [
                    "This trendy pair of open-toed sandals makes styling your look so easy. Wear it with a pencil skirt and a plain shirt for a classy formal look.",
                    1,
                  ],
                ],
                Title: [["Open Toe Sandals", 1]],
                Color: [
                  ["wheat", 0.686970910520398],
                  ["black", 0.22954475327275994],
                ],
                "Color Hex": [
                  ["#D5AD8B", 0.686970910520398],
                  ["#1A1915", 0.22954475327275994],
                ],
                "Toe Type": [["Open Toe", 1]],
                Type: [["Sandals", 1]],
              },
              msd_tags: {
                PantsStyleL1: [["casual_trouser", 1]],
                "Base Color": [
                  ["Neutral", 0.686970910520398],
                  ["Black", 0.22954475327275994],
                ],
                PantsStyleL2: [["_NEGATIVE", 0.96]],
                GarmentType: [["model", 1]],
                "Color Hex": [
                  ["#D5AD8B", 0.686970910520398],
                  ["#1A1915", 0.22954475327275994],
                ],
                FootwearType: [["sandals", 1]],
                ToeStyle: [["round", 0.82]],
                BootHeight: [["mid_calf", 1]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.9]],
                PatternLowerL1: [["Plain", 1]],
                FootwearColor: [["Black", 0.988]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["officewear", 0.89],
                  ["classic", 0.658],
                ],
                PantLength: [["ankle", 1]],
                HeelType: [["not_visible", 1]],
                ToeType: [["open", 1]],
                PlainLowerL2: [["Texture", 0.51]],
                DenimWash: [["Dark Rinse", 1]],
                HeelHeight: [["not_visible", 1]],
                ImageType: [["Front View", 0.98]],
                PantFit: [["slim", 1]],
              },
              pos:
                "VmpBNVZsVnNSbGROTTBKSFZGUkJlRkpIVVhsYVJUbFRVbFpaTUZaRlZrOVJiVlpXVFZaV1ZGZEZOVXRWYTFwR1pXeFJkMWRZWkZGVlZEQTU=",
              object_id:
                "332_twoface_b9ee14dc-6752-599b-b7ed-51d72879c994_MTcwXzQxMV8yMTJfNDc4Zm9vdHdlYXI=",
              location: [0, 0, 10, 10],
              productType: ["Footwear", 0.66],
            },
          ],
        },
      },
      {
        id: 2,
        url:
          "https://images-cdn.vuetag.ai/2253_yoox-poc/2253_yoox-poc_13167305ED.jpg",
        title: "Under Armour Man Casual trouser Black XL INT",
        brand: "Under Armour",
        price: "92",
        response: {
          status: "SUCCESS",
          correlation_key: "d1d61d5f28064151b4b00aabe657f625",
          image_type: {},
          meta: {
            processing_time: 8.153779983520508,
            total_time: 8.18004846572876,
            image_download_time: 0.09922051429748535,
            mapping_versions: {
              client_tags:
                "prod/ST_mapping_333/EvR1fGP6XSf.3dyb85k_DRbhFzUp7XE.",
            },
          },
          image_url:
            "https://images-cdn.vuetag.ai/2253_yoox-poc/2253_yoox-poc_13167305ED.jpg",
          mad_id: "d8f1b64e-a81e-5c4a-a995-2eddb92067fa",
          message: "Image Tagged Successfully",
          data: [
            {
              category: "pant",
              tags: {
                "Base Color": [["Black", 0.9948698504173301]],
                Description: [
                  [
                    "This one certainly adds a lot of style to your casual wardrobe. It flaunts a skinny pattern. Style it with a tube top and a pair of running shoes to get your casual style game on point.",
                    1,
                  ],
                ],
                Fit: [["Skinny", 1]],
                "Color Hex": [["#2E3137", 0.9948698504173301]],
                Color: [["sgigray32", 0.9948698504173301]],
                "Style & Occasion": [
                  ["Casual", 0.72],
                  ["All Day Wear", 0.72],
                ],
                Title: [["Skinny Sweatpants", 1]],
                Length: [["Ankle Length", 1]],
                Type: [["Sweatpants", 0.72]],
                "Secondary Pattern": [["Texture", 1]],
                "Primary Pattern": [["Plain", 1]],
              },
              msd_tags: {
                PantsStyleL1: [["sweatpants", 0.72]],
                "Base Color": [["Black", 0.9948698504173301]],
                PantsStyleL2: [["_NEGATIVE", 1]],
                GarmentType: [["model", 1]],
                "Color Hex": [["#2E3137", 0.9948698504173301]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.82]],
                PatternLowerL1: [["Plain", 1]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["casual", 1],
                ],
                PantLength: [["ankle", 1]],
                PlainLowerL2: [["Texture", 0.59]],
                DenimWash: [["Black / Grey Rinse", 1]],
                ImageType: [["Front View", 0.91]],
                PantFit: [["skinny", 1]],
              },
              pos:
                "VmtWNFVGSldUbGROTTBKSFdsVlZlRlpIVVhsYVJUVlhVbGQ0TmxVeFZsTlRhekZ5VGxSV2EwMXRVbEJWYTFWNFRsWmtSMUpVYkZGVlZEQTU=",
              object_id:
                "332_twoface_d8f1b64e-a81e-5c4a-a995-2eddb92067fa_MTExXzEyXzI2N180MzJwYW50",
              location: [0, 0, 10, 10],
              productType: ["Pants", 0.77],
            },
            {
              category: "footwear",
              tags: {
                "Base Color": [["Black", 0.772]],
                "Toe Style": [["Round", 1]],
                Description: [
                  [
                    "This trendy pair of round-toed sneakers is sure to get you noticed anywhere. This looks good with a pair of ripped jeans and a crop top.",
                    1,
                  ],
                ],
                "Color Hex": [["#303135", 0.9472816291490832]],
                "Heel Height": [["Flat", 1]],
                Title: [["Black Sneakers", 1]],
                "Design Details": [["Laces", 1]],
                Color: [["sgigray32", 0.9472816291490832]],
                "Toe Type": [["Closed Toe", 1]],
                Type: [["Sneakers", 0.49]],
              },
              msd_tags: {
                "Color Hex": [["#303135", 0.9472816291490832]],
                FootwearColor: [["Black", 0.772]],
                StyleOccasionWomenBottomWear: [
                  ["alldaywear", 1],
                  ["casual", 1],
                ],
                DenimWash: [["Black / Grey Rinse", 1]],
                HeelHeight: [["flat", 1]],
                PantFit: [["skinny", 1]],
                GarmentType: [["model", 1]],
                ToeType: [["closed", 1]],
                "Base Color": [["Black", 0.9472816291490832]],
                FootwearType: [["sneakers", 0.49]],
                ToeStyle: [["pointed", 0.64]],
                PatternLowerL1: [["Plain", 1]],
                PantLength: [["ankle", 1]],
                HeelType: [["not_visible", 0.89]],
                PlainLowerL2: [["Texture", 0.59]],
                ImageType: [["Front View", 0.91]],
                PantsStyleL1: [["sweatpants", 0.72]],
                PantsStyleL2: [["_NEGATIVE", 1]],
                DesignDetailsFW: [["laces", 1]],
                BootHeight: [["ankle_high", 1]],
                PatternLW: [["solid", 1]],
                DenimLegStyle: [["skinny", 0.82]],
              },
              pos:
                "VmpCT1IxTkZhRmROTTBKSFZGZHplRkpIVVhsYVJUbFRVbFpXTlZaRlZrOVJiVlpXVGxWV1ZWZEZOVXRWYTFwR1RVWlJkMWRZWkZGVlZEQTU=",
              object_id:
                "332_twoface_d8f1b64e-a81e-5c4a-a995-2eddb92067fa_MTYwXzQxNl8yNDNfNDg4Zm9vdHdlYXI=",
              location: [0, 0, 10, 10],
              productType: ["Footwear", 0.63],
            },
          ],
        },
      },
      {
        id: 3,
        url: "https://cdn.yoox.biz/42/42740274TH_12_F.JPG",
        title: "Emporio Armani Women 3/4-Length Trousers Grey 32 Jeans",
        brand: "",
        price: "",
      },
      {
        id: 4,
        url: "https://cdn.yoox.biz/39/39880786CN_12_F.JPG",
        title: "Valentino Women Jumper Black M INT",
        brand: "",
        price: "",
      },
      {
        id: 5,
        url: "https://cdn.yoox.biz/15/15029703HV_12_F.JPG",
        title:
          "Philosophy Di Lorenzo Serafini Women Knee-Length Dress Yellow 12 UK",
        brand: "",
        price: "",
      },
      {
        id: 6,
        url: "https://cdn.yoox.biz/38/38792822DJ_12_F.JPG",
        title: "8 By Yoox Women Blouse Khaki 12 UK",
        brand: "",
        price: "",
      },
    ],
  },
  {
    id: 2,
    type: "document_processing",
    heading: "Document Processing",
    apiKey: "f4950814fc13a24ae12ec35426fb5b2e70a5617e-ocr",
    getTag: "https://v2-demo.vue.ai/api/v2/tag/",
    correlationKey: "d1d61d5f28064151b4b00aabe657f625",
    showInTaggingHomePage: true,
    description: [
      {
        id: 1,
        icon: "/static/media/invoice.13ea36d2.svg",
        description: "Invoices",
        active: true,
      },
      {
        id: 2,
        icon: "/static/media/idcard.b09f84ca.svg",
        description: "Identity cards",
        active: true,
      },
      {
        id: 3,
        icon: "/static/media/insurance.a542af05.svg",
        description: "OCR Extraction Dashboard",
        redirectLink: "/tagging/ocr-extraction",
        active: true,
      },
    ],
    input_type: "search",
    catalog_title: "Or, click on one of the documents below",
    catalog: [
      {
        id: 1,
        url:
          "https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/ocr_extraction/invoice-1.png",
        title: "",
        brand: "",
        price: "",
        redirectLink: "/tagging/ocr-extraction",
      },
      {
        id: 2,
        url:
          "https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/ocr_extraction/invoice-2.png",
        title: "",
        brand: "",
        price: "",
        redirectLink: "/tagging/ocr-extraction",
      },
      {
        id: 3,
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Deutscher_Personalausweis_%282021_Version%29.jpg/170px-Deutscher_Personalausweis_%282021_Version%29.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 4,
        url:
          "https://upload.wikimedia.org/wikipedia/commons/3/3f/New_Finnish_ID_card_%28front_side%29.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 5,
        url:
          "https://www.practiceofthepractice.com/wp-content/uploads/2016/09/Screen-Shot-2016-09-25-at-9.36.35-PM.png",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 6,
        url:
          "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
        title: "",
        brand: "",
        price: "",
      },
    ],
  },
  {
    id: 3,
    type: "semantic_tagging",
    heading: "Semantic Tagging",
    showInTaggingHomePage: true,
    description: [
      {
        id: 1,
        icon: "/static/media/emails.44d4386b.svg",
        description: "Emails",
        active: true,
      },
      {
        id: 2,
        icon: "/static/media/productreviews.a721740e.svg",
        description: "User/Product reviews",
        active: true,
      },
    ],
    input_type: "textarea",
    catalog_title: "Or, click on one of the paragraphs below",
    catalog: [
      {
        id: 1,
        url:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel pellentesque quam. Proin sit amet tortor eget ligula pretium vehicula. Pellentesque in nisl lectus. In ut luctus nunc. Praesent et fringilla dui. Praesent sem mauris, malesuada sed metus et, venenatis tempus massa. Suspendisse ligula nisi, auctor et quam in, pulvinar fermentum velit. Mauris egestas condimentum mi eu feugiat. Vestibulum pulvinar arcu felis, non aliquam diam iaculis quis. Praesent imperdiet nisi metus, sit amet sodales elit aliquet nec. In pretium enim ex, facilisis placerat nisi molestie convallis. Integer a magna vitae felis molestie lobortis sed at ante. Praesent feugiat turpis id malesuada iaculis.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
      {
        id: 2,
        url:
          "Etiam id purus facilisis, rhoncus nisi luctus, gravida lacus. Ut vel arcu ac arcu convallis porta. Aliquam in sagittis leo. Sed efficitur maximus sodales. Fusce tempor augue sit amet sodales ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam interdum metus vulputate, pretium justo vitae, pulvinar justo. Ut lacinia tempor metus, quis elementum eros porttitor ut. Aliquam pulvinar lacus vel libero lacinia, vel ornare ante venenatis. Duis elit leo, euismod vel luctus non, malesuada vel lectus. Quisque eget dolor fringilla nulla rhoncus dignissim at nec lacus. In rutrum, augue id tincidunt scelerisque, justo mauris ultrices massa, vitae bibendum lorem ipsum a enim. Mauris massa mi, efficitur id ullamcorper ut, fringilla vel tellus. Nullam nec justo vel quam vestibulum tempor. Fusce congue lectus vel pellentesque placerat. Nunc aliquet ac libero sed mattis.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
      {
        id: 3,
        url:
          "Fusce placerat velit id erat sagittis, gravida pulvinar augue molestie. Nullam fringilla ex id metus suscipit pulvinar in sit amet odio. Morbi id placerat lectus. Morbi at nisl urna. In bibendum eget sapien in rutrum. In mollis metus erat, vitae dapibus lacus ullamcorper id. Morbi egestas turpis ut dolor accumsan, ut pulvinar enim pretium. Maecenas semper massa tincidunt lorem volutpat, sed porta elit imperdiet.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
      {
        id: 4,
        url:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed dapibus quam aliquam, condimentum justo at, maximus ligula. Vivamus maximus hendrerit erat sed finibus. In et risus sed mi semper convallis eu nec eros. Duis fringilla, odio ut vestibulum suscipit, odio purus mollis risus, at commodo est dui non risus. Praesent imperdiet sollicitudin eros. Cras convallis orci neque, tincidunt malesuada ligula pharetra sit amet. Suspendisse potenti. Pellentesque pretium facilisis enim, quis euismod sem volutpat id. Fusce ullamcorper risus id ante semper, nec suscipit odio bibendum.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
      {
        id: 5,
        url:
          "Nunc sed felis ut velit tempor blandit vel id nisl. Nullam venenatis ligula orci, in egestas erat suscipit quis. Sed quis mollis urna, non vestibulum lacus. Fusce sit amet turpis nunc. Etiam vel dapibus mauris. Etiam lacinia ultrices justo, sit amet dapibus dolor sollicitudin vehicula. Vestibulum placerat libero eu turpis dictum tincidunt vitae sit amet magna. Phasellus vulputate tortor id condimentum finibus. Ut congue porta magna, a tincidunt dolor aliquet ut. Etiam vitae arcu sem. Quisque dapibus maximus nisi ac maximus. Morbi non sem interdum odio fringilla dapibus interdum quis magna. Quisque est sem, commodo eget ex eu, volutpat euismod elit. Fusce scelerisque nunc nec neque convallis, at finibus erat blandit. Aliquam pellentesque vulputate suscipit.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
      {
        id: 6,
        url:
          "Nunc sed felis ut velit tempor blandit vel id nisl. Nullam venenatis ligula orci, in egestas erat suscipit quis. Sed quis mollis urna, non vestibulum lacus. Fusce sit amet turpis nunc. Etiam vel dapibus mauris. Etiam lacinia ultrices justo, sit amet dapibus dolor sollicitudin vehicula. Vestibulum placerat libero eu turpis dictum tincidunt vitae sit amet magna. Phasellus vulputate tortor id condimentum finibus. Ut congue porta magna, a tincidunt dolor aliquet ut. Etiam vitae arcu sem. Quisque dapibus maximus nisi ac maximus. Morbi non sem interdum odio fringilla dapibus interdum quis magna. Quisque est sem, commodo eget ex eu, volutpat euismod elit. Fusce scelerisque nunc nec neque convallis, at finibus erat blandit. Aliquam pellentesque vulputate suscipit.",
        title: "",
        brand: "",
        price: "",
        type: "text",
      },
    ],
  },
  {
    id: 4,
    type: "object_recognition",
    heading: "Object Recognition",
    apiKey: "dae31d28be3091c652543de80d9d80ff51b91676",
    getTag: "https://v2-demo.vue.ai/api/v2/tag/",
    correlationKey: "d1d61d5f28064151b4b00aabe657f625",
    showInTaggingHomePage: true,
    tagType: "msd_tags",
    description: [
      {
        id: 1,
        icon: "/static/media/dental.305a7cdd.svg",
        description: "Dental images",
        active: true,
      },
      {
        id: 2,
        icon: "/static/media/cars.97a429b8.svg",
        description: "Cars",
        active: false,
      },
      {
        id: 3,
        icon: "/static/media/videos.16187251.svg",
        description: "Videos",
        active: false,
      },
    ],
    input_type: "search",
    catalog_title: "Or, click on one of the products below",
    catalog: [
      {
        id: 1,
        url:
          "https://www.scopeorthodontics.com.au/Media%20Library/TrophyCase/Peter/Peter-After-URA-Left.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 2,
        url:
          "https://www.preferreddentalcaresanrafael.com/wp-content/uploads/2020/03/Crooked-teeth-causes%D8%8C-how-to-fix-and-straight-crooked-tooth-min.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 3,
        url:
          "https://cdn.cnn.com/cnnnext/dam/assets/200323120059-teeth-mouth-stock-exlarge-169.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 4,
        url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJeHpqSYh_9VmgVKPiHzv1WXBvCt0uxjeaw&usqp=CAU",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 5,
        url:
          "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/una-mala-mordida-se-asocia-con-peor-control-de-la-postura-y-el-equilibrio/5783643-7-esl-MX/A-bad-bite-is-associated-with-worse-postural-and-balance-control.jpg",
        title: "",
        brand: "",
        price: "",
      },
      {
        id: 6,
        url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3EqmpXC1B6K2dQZUr2uWLe_kiHYKCoxp3bQ&usqp=CAU",
        title: "",
        brand: "",
        price: "",
      },
    ],
  },
  {
    id: 5,
    type: "image_guidelines",
    heading: "Image Guidelines",
    apiKey: "37b97a3f29d5a173a60e45a4e0411d9dc341f49d",
    getTag: "https://v2-demo.vue.ai/api/v2/get_tag/",
    putTag: "https://v2-demo.vue.ai/api/v2/put_tag/",
    correlationKey: "d1d61d5f28064151b4b00aabe657f625",
    showInTaggingHomePage: false,
    tagType: "msd_tags",
  },
];

const InvoicesData = [
  {
    "id":1,
    "type":"invoice-tagging",
    "heading":"Invoice",
    "apiKey":"dae31d28be3091c652543de80d9d80ff51b91676",
    "getTag":"http://65.2.116.41:8000/api/v1/invoices",
    "correlationKey":"d1d61d5f28064151b4b00aabe657f625",
    "showInTaggingHomePage":true,
    "tagType":"msd_tags",
    "tagsToHide":[
      "Bite"
    ],
    "input_type":"file_upload",
    "catalog_title":"Or, click on one of the products below",
    "catalog":[
      {
        "id":1,
        "url":"https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/infosys_invoices/Scenario+1.pdf",
        "po_number":"2012069455",
        "title":"",
        "brand":"",
        "price":"",
        "type":"pdf"
      },
      {
        "id":2,
        "url":"https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/infosys_invoices/Scenario+2.pdf",
        "po_number":"2010637904",
        "title":"",
        "brand":"",
        "price":"",
        "type":"pdf"
      },
      {
        "id":3,
        "url":"https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/infosys_invoices/Scenario+3.pdf",
        "po_number":"2012019817",
        "title":"",
        "brand":"",
        "price":"",
        "type":"pdf"
      },
      {
        "id":4,
        "url":"https://blox-demosite-frontend.s3.amazonaws.com/assets/tagging/infosys_invoices/Scenario+4.pdf",
        "po_number":"8000215856",
        "title":"",
        "brand":"",
        "price":"",
        "type":"pdf"
      }
    ]
  },
  {
    "id":2,
    "type":"po-tagging",
    "heading":"PO",
    "apiKey":"dae31d28be3091c652543de80d9d80ff51b91676",
    "getTag":"http://65.2.116.41:8000/api/v1/purchase-orders",
    "correlationKey":"d1d61d5f28064151b4b00aabe657f625",
    "showInTaggingHomePage":true,
    "tagType":"msd_tags",
    "tagsToHide":[
      "Bite"
    ],
    "input_type": "file_upload",
    "catalog_title":"Or, click on one of the products below"
  },
  {
    "id":3,
    "type":"grn-tagging",
    "heading":"GRN",
    "apiKey":"dae31d28be3091c652543de80d9d80ff51b91676",
    "getTag":"http://65.2.116.41:8000/api/v1/grn",
    "correlationKey":"d1d61d5f28064151b4b00aabe657f625",
    "showInTaggingHomePage":true,
    "tagType":"msd_tags",
    "tagsToHide":[
      "Bite"
    ],
    "input_type": "file_upload",
    "catalog_title":"Or, click on one of the products below",
  }
];

export {
  Config,
  segments,
  HeaderVueContent,
  TaggingData,
  UserDataAttrs,
  VueTagCarousel,
  DefaultUserUrl,
  DefaultValues,
  InvoicesData,
};
