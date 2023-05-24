import { ProductCard } from '@components/product'
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite.css'
import {
  Configure,
  InstantSearch,
  useHits,
} from 'react-instantsearch-hooks-web'

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

const searchClient = algoliasearch(
  '3D5DQ7NIQP',
  '476e5cbce98781b0ed3a8168558bc013'
)

interface Props {
  title?: string
  type: 'grid' | 'row'
  cellWidth: number
  variant: 'default' | 'slim' | 'simple'

  Collection: {
    options: {
      collection: string
    }
  }
}

function CustomHits(props: any) {
  const { hits, results, sendEvent } = useHits(props)
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: props.type === 'row' ? undefined : 'wrap',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        flex: 1,
        overflow: props.type === 'row' ? 'auto' : undefined,
        flexShrink: 1,
        maxWidth: '100%',
      }}
    >
      {props.renderer(hits)}
    </div>
  )
}

export const AlgoliaSearchGrid = (props: Props) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <InstantSearch
        searchClient={searchClient}
        indexName="Retail_Catalog_ea08671f"
      >
        {/* <SearchBox /> */}
        <Configure hitsPerPage={20} page={0} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: '10',
            maxWidth: '100%',
          }}
        >
          <CustomHits
            {...props}
            renderer={(hits: any) => {
              // console.log('hits ', hits)
              // todo: you can randomize the hits to make it cooler
              return (
                <>
                  {hits.map((product: any) => (
                    <div
                      key={product.objectID}
                      style={{ width: props.cellWidth || 500, flexShrink: 0 }}
                    >
                      <ProductCard
                        variant={props.variant}
                        product={parseToProductCell(product)}
                      />
                    </div>
                  ))}
                </>
              )
            }}
          />
        </div>
      </InstantSearch>
    </div>
  )
}

export default AlgoliaSearchGrid
