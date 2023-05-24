export const config = {
  clientId: 'Iip7rqkddgLXWqdoC7bH6NQ1aVFTlVqGHXWaaost7D',
  clientSecret: 'sYgFoO2eq7JwVElX09yjDs4SOonfFiPmudUr8e7ZB5',
  categoryPageSize: 52,
  maxCompareProducts: 4,
  // compareKeys: process.env.REACT_APP_COMPARE_KEYS
  //   ? splitCompareKeys(process.env.REACT_APP_COMPARE_KEYS)
  //   : [],
  // endpointURL: "api.moltin.com",
  endpointURL: 'useast.api.elasticpath.com',
  b2b: process.env.REACT_APP_B2B_ENABLE || false,
  supportedLocales: process.env.REACT_APP_SUPPORTED_LOCALES?.split(',').map(
    (el) => JSON.parse(el)
  ) || [
    {
      key: 'en',
      name: 'english',
    },
  ],
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
  defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || 'USD',
  searchProvider: process.env.REACT_APP_SEARCH_PROVIDER || 'algolia',
  shippingFee: 20,
  freeShipping: 200,
  epContextTag: 'EPCC',
  'X-MOLTIN-SDK-LANGUAGE': 'JS',
  'X-MOLTIN-SDK-VERSION': '0.0.0-semantic-release',
  autoplaySpeed: 5000, // heroBanner auto play speed
}
