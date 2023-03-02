const menuConfig = [
  {
    active: true,
    redirectLink: "/discover",
    text: "Experience management",
    title: "Experience management",
    paths: [
      "/discover",
      "/cart",
      "/wishlist",
      "/product-display/",
      "/vuefind/category",
      "/vuefind/search",
      "/user-profile",
    ],
  },
  {
    paths: [
      "/tagging",
      "/tagging/product_tagging",
      "/tagging/document_processing",
      "/tagging/semantic_tagging",
      "/tagging/object_recognition",
    ],
    active: true,
    text: "Tagging",
    redirectLink: "/tagging",
    title: "Tagging",
  },
  {
    paths: [],
    active: true,
    text: "Retail automation",
    redirectLink: "",
    isExternal: true,
    title: "Retail automation",
    externalLink: "https://dress-up.vue.ai/",
  },
  {
    paths: [],
    active: true,
    redirectLink: "",
    isExternal: true,
    text: "Documentation",
    title: "Documentation",
    externalLink: "http://vue.ai/developer/docs",
  },
];

export { menuConfig };
