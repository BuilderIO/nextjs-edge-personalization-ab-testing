export function parseToProductCell(product: any) {
  const newProduct = {
    id: product.objectID,
    name: product.ep_name,
    description: product.ep_description,
    descriptionHtml: product.ep_description,
    sku: product.ep_sku,
    slug: product.ep_slug,
    path: product.ep_path,
    images: [
      {
        url: product.ep_main_image_url,
        alt: product.ep_name,
      },
    ],
    variants: [],
    price: {
      value: product.ep_price?.USD?.float_price,
      retailPrice: product.ep_price?.USD?.float_price,
      currencyCode: 'USD',
    },
    options: [],
    vendor: 'Shopaholic',
  }
  return newProduct
}
