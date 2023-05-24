import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Configure,
  useHits,
} from 'react-instantsearch-hooks-web'
import 'instantsearch.css/themes/satellite.css'
import { ProductCard } from '@components/product'
import { parseToProductCell } from './helpers'

const searchClient = algoliasearch(
  '3D5DQ7NIQP',
  '476e5cbce98781b0ed3a8168558bc013'
)

interface Props {
  title?: string
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        flex: 1,
      }}
    >
      {props.renderer(hits)}
    </div>
  )
}

export const AlgoliaSearchGrid = (props: Props) => {
  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName="Retail_Catalog_ea08671f"
      >
        {/* <SearchBox /> */}
        <Configure hitsPerPage={20} page={0} />
        <div
          style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}
        >
          <CustomHits
            {...props}
            renderer={(hits: any) => {
              // console.log('hits ', hits)
              // todo: you can randomize the hits to make it cooler
              return (
                <div>
                  {hits.map((product: any) => (
                    <div key={product.objectID} style={{ width: 500 }}>
                      <ProductCard product={parseToProductCell(product)} />
                    </div>
                  ))}
                </div>
              )
            }}
          />
        </div>
      </InstantSearch>
    </div>
  )
}

export default AlgoliaSearchGrid
